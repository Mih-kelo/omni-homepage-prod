import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createAmbientMaterial } from "./ambientMaterial";
import { useJourney } from "../../lib/journey/journeyStore";
import { useTier } from "../../lib/tiers/tierStore";

/**
 * The ambient layer — tiny intelligence nodes and a few far, soft drift
 * lights, spread along the camera's travel depth (spine ≈ 0 → −450) and
 * offset laterally so nothing sits in the viewer's line of sight. Exists
 * purely so the world never feels lifeless; it must never draw the eye.
 * One Points draw call; counts are trivial on every tier.
 */

/** counts per device tier — [tier 0, tier 1, tier 2] */
const NODE_COUNTS = [16, 22, 28] as const;
const LIGHT_COUNTS = [3, 4, 5] as const;

function mulberry(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGeometry(nodes: number, lights: number): THREE.BufferGeometry {
  const count = nodes + lights;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count * 4);
  const kind = new Float32Array(count);
  const rand = mulberry(9021);
  for (let i = 0; i < count; i++) {
    const isLight = i >= nodes;
    const n = isLight ? i - nodes : i;
    // stratified along the journey's depth so every chamber keeps a pulse
    const t = (n + 0.2 + rand() * 0.6) / (isLight ? lights : nodes);
    const side = n % 2 === 0 ? 1 : -1;
    if (isLight) {
      // far from the camera path laterally; out-of-focus distant rooms
      pos[i * 3] = side * (8 + rand() * 8);
      pos[i * 3 + 1] = -2 + rand() * 9;
      pos[i * 3 + 2] = -30 - t * 390 + (rand() - 0.5) * 24;
    } else {
      pos[i * 3] = side * (4.5 + rand() * 8.5);
      pos[i * 3 + 1] = -2.2 + rand() * 8.4;
      pos[i * 3 + 2] = -14 - t * 430 + (rand() - 0.5) * 12;
    }
    seed[i * 4] = rand();
    seed[i * 4 + 1] = rand();
    seed[i * 4 + 2] = rand();
    seed[i * 4 + 3] = rand();
    kind[i] = isLight ? 1 : 0;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 4));
  geo.setAttribute("aKind", new THREE.BufferAttribute(kind, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -226), 300);
  return geo;
}

export function NodeField() {
  const gl = useThree((s) => s.gl);
  const tier = useTier((s) => s.profile.tier);

  const geometry = useMemo(() => buildGeometry(NODE_COUNTS[tier], LIGHT_COUNTS[tier]), [tier]);
  const material = useMemo(() => createAmbientMaterial(gl.getPixelRatio()), [gl]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, dt) => {
    const clamped = Math.min(dt, 1 / 20);
    const u = material.uniforms;
    u.uTime.value += clamped;
    u.uGrade.value = useJourney.getState().grade;
    u.uPixelRatio.value = gl.getPixelRatio();
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
