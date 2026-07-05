import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createMoteMaterial } from "./moteMaterial";
import { useJourney, channel } from "../../lib/journey/journeyStore";
import { useTier } from "../../lib/tiers/tierStore";

/**
 * The First Breath's wordmark: sample "OMNI TARGET" pixels into world-space
 * points on a plane the opening camera faces (Moment 1). Client-only.
 */
function sampleWordmark(max: number): Array<[number, number, number]> {
  const c = document.createElement("canvas");
  c.width = 560;
  c.height = 72;
  const ctx = c.getContext("2d");
  if (!ctx) return [];
  ctx.fillStyle = "#000";
  ctx.font = "900 52px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("OMNI TARGET", c.width / 2, c.height / 2);
  const img = ctx.getImageData(0, 0, c.width, c.height).data;
  const pts: Array<[number, number, number]> = [];
  for (let y = 0; y < c.height; y += 2) {
    for (let x = 0; x < c.width; x += 2) {
      if (img[(y * c.width + x) * 4 + 3] > 140) {
        // map canvas → world plane at z≈2 in front of the opening camera
        const wx = (x / c.width - 0.5) * 6.2;
        const wy = (0.5 - y / c.height) * 0.8 + 1.72;
        pts.push([wx, wy, 2]);
      }
    }
  }
  // deterministic shuffle so density stays even when truncated
  for (let i = pts.length - 1; i > 0; i--) {
    const j = (i * 16807 + 11) % (i + 1);
    const t = pts[i];
    pts[i] = pts[j];
    pts[j] = t;
  }
  return pts.slice(0, max);
}

/** homes distributed along the whole spine, denser near the open chambers */
function buildGeometry(count: number): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count * 4);
  const target = new Float32Array(count * 4);
  const rand = mulberry(20260704);
  const wordmark = sampleWordmark(Math.min(1500, Math.floor(count * 0.08)));
  let assigned = 0;
  for (let i = 0; i < count; i++) {
    const t = rand();
    // z spans the journey: +18 (before the threshold) … −470 (past the lens)
    const z = 18 - t * 488;
    pos[i * 3] = (rand() + rand() - 1) * 17;
    pos[i * 3 + 1] = (rand() + rand() - 1) * 7 + 1.2;
    pos[i * 3 + 2] = z + (rand() - 0.5) * 8;
    seed[i * 4] = rand();
    seed[i * 4 + 1] = rand();
    seed[i * 4 + 2] = rand();
    seed[i * 4 + 3] = rand();
    // threshold-region motes may take a wordmark point for the First Breath
    if (assigned < wordmark.length && pos[i * 3 + 2] > -44) {
      const [wx, wy, wz] = wordmark[assigned++];
      target[i * 4] = wx;
      target[i * 4 + 1] = wy;
      target[i * 4 + 2] = wz;
      target[i * 4 + 3] = 1;
    }
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 4));
  geo.setAttribute("aTarget", new THREE.BufferAttribute(target, 4));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -226), 300);
  return geo;
}

function mulberry(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function MoteField() {
  const gl = useThree((s) => s.gl);
  const moteCount = useTier((s) => s.profile.moteCount);

  const geometry = useMemo(() => buildGeometry(moteCount), [moteCount]);
  const material = useMemo(() => createMoteMaterial(gl.getPixelRatio()), [gl]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, dt) => {
    const clamped = Math.min(dt, 1 / 20);
    const u = material.uniforms;
    u.uTime.value += clamped;
    u.uGrade.value = useJourney.getState().grade;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uAssemble.value = channel("breath.assemble");
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
