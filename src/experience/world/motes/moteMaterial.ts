import * as THREE from "three";
import { PALETTE } from "../../config/palette";

/**
 * One mote system for the whole journey (Direction §7): a single Points
 * draw call. Refined to distant stars — tiny, sharp, neutral, barely
 * animated, no glow. The only motion beyond a whisper of drift is the
 * First Breath's one-time wordmark assembly. Everything else was removed
 * so nothing in the field competes with the content or the timeline.
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uBreathe;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uAssemble;   // First Breath: motes assemble the wordmark, then release
  attribute vec4 aSeed;
  attribute vec4 aTarget;    // xyz wordmark point, w = participates (0/1)
  varying float vAlpha;

  const float TAU = 6.28318530718;

  void main() {
    vec3 p = position;
    float t = uTime * (0.05 + aSeed.x * 0.06); // very slow

    // barely-there drift — a whisper, so the field never reads as static
    p.x += sin(t + aSeed.y * TAU) * 0.20;
    p.y += cos(t * 0.8 + aSeed.z * TAU) * 0.16;
    p.z += sin(t * 0.6 + aSeed.w * TAU) * 0.18;

    // the six-second breathe (tiny)
    float br = 1.0 + 0.03 * uBreathe * sin(uTime * TAU / 6.0 + aSeed.y * 3.0);

    // the First Breath (Moment 1): a share of the field condenses into the
    // wordmark for a heartbeat, then is released back into the current
    float grip = uAssemble * aTarget.w;
    p = mix(p, aTarget.xyz, grip);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;
    // tiny sharp points — distant stars, never glowing circles
    gl_PointSize = clamp(uSize * uPixelRatio * br * (0.5 + aSeed.z * 0.6) * (55.0 / max(dist, 1.0)), 0.0, 2.6);
    gl_Position = projectionMatrix * mv;

    // faint: low base alpha, fading with distance, never looming in the face
    vAlpha = (0.05 + aSeed.w * 0.12) * smoothstep(170.0, 60.0, dist);
    vAlpha *= smoothstep(0.6, 3.0, dist);
    vAlpha = mix(vAlpha, 0.72, grip); // assembled motes briefly read as ink
  }
`;

const fragment = /* glsl */ `
  uniform float uGrade;
  uniform vec3 uInk;
  uniform vec3 uPassageLight;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    // crisp small point with only a hair of edge softening — a star, not a blob
    float disc = smoothstep(0.5, 0.32, d);
    // neutral graphite in the light world; faint indigo-light in the dark passages
    vec3 col = mix(uInk, uPassageLight, uGrade);
    float alpha = disc * vAlpha * mix(0.6, 0.9, uGrade);
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

export function createMoteMaterial(pixelRatio: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uBreathe: { value: 1 },
      uAssemble: { value: 0 },
      uSize: { value: 0.9 },
      uPixelRatio: { value: pixelRatio },
      uGrade: { value: 0 },
      uInk: { value: new THREE.Color(PALETTE.graphite).multiplyScalar(2.3) },
      uPassageLight: { value: new THREE.Color(PALETTE.passageAccent) },
    },
  });
}
