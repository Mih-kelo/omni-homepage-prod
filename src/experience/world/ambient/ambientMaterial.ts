import * as THREE from "three";
import { PALETTE } from "../../config/palette";

/**
 * The ambient layer's single draw call: sparse "intelligence nodes"
 * (aKind 0) and a handful of large, out-of-focus drift lights (aKind 1)
 * share one Points geometry; aKind selects size, falloff and alpha in
 * the shader. Pure atmosphere (Direction §6): whisper-faint, laterally
 * offset from the camera path, never a focal point, no glow, no bloom.
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute vec4 aSeed;
  attribute float aKind;      // 0 = intelligence node, 1 = drift light
  varying float vAlpha;
  varying float vKind;

  const float TAU = 6.28318530718;
  const float PI = 3.14159265359;

  void main() {
    vKind = aKind;
    vec3 p = position;

    // extremely restrained environmental drift — slower than the star field
    float t = uTime * (0.018 + aSeed.x * 0.022);
    float amp = mix(0.4, 1.4, aKind);
    p.x += sin(t + aSeed.y * TAU) * amp;
    p.y += cos(t * 0.7 + aSeed.z * TAU) * amp * 0.8;
    p.z += sin(t * 0.5 + aSeed.w * TAU) * amp * 0.6;

    // "considering" — nodes only: one soft ~2s swell per 12–21s cycle,
    // phases staggered so roughly one node is thinking at a time
    float cycle = 12.0 + aSeed.x * 9.0;
    float ph = mod(uTime + aSeed.z * cycle, cycle);
    float pulse = sin(clamp(ph * 0.5, 0.0, 1.0) * PI) * (1.0 - aKind);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;

    // nodes: barely larger than the stars (≤ ~3.8px);
    // lights: big constant-size out-of-focus discs (30–56px logical)
    float nodeSize = uPixelRatio * (2.3 + aSeed.y * 0.8) * (60.0 / max(dist, 1.0)) * (1.0 + 0.30 * pulse);
    float lightSize = uPixelRatio * (30.0 + aSeed.y * 26.0);
    gl_PointSize = clamp(mix(nodeSize, lightSize, aKind), 0.0, mix(3.8, 118.0, aKind));
    gl_Position = projectionMatrix * mv;

    // node alpha: faint, distance-faded, +30% while considering
    float nodeAlpha = (0.10 + aSeed.w * 0.07)
      * smoothstep(190.0, 70.0, dist)
      * smoothstep(2.5, 9.0, dist)
      * (1.0 + 0.30 * pulse);
    // light alpha: a whisper, present only within its stretch of the journey
    float lightAlpha = (0.030 + aSeed.w * 0.028)
      * smoothstep(220.0, 130.0, dist)
      * smoothstep(5.0, 12.0, dist);
    vAlpha = mix(nodeAlpha, lightAlpha, aKind);
  }
`;

const fragment = /* glsl */ `
  uniform float uGrade;
  uniform vec3 uNodeInk;
  uniform vec3 uNodeGlow;
  uniform vec3 uLightInk;
  uniform vec3 uLightGlow;
  varying float vAlpha;
  varying float vKind;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    // nodes: soft-edged disc; lights: gaussian out-of-focus falloff,
    // fully gone by the rim so the quad edge never shows
    float node = smoothstep(0.5, 0.14, d);
    float light = exp(-d * d * 10.0) * smoothstep(0.5, 0.26, d);
    float shape = mix(node, light, vKind);

    vec3 col = mix(mix(uNodeInk, uNodeGlow, uGrade), mix(uLightInk, uLightGlow, uGrade), vKind);

    // nodes sit slightly quieter on the light ground; the drift lights only
    // truly wake as the room deepens into a dark passage
    float gradeW = mix(mix(0.8, 1.0, uGrade), 0.35 + 0.65 * uGrade, vKind);
    float alpha = shape * vAlpha * gradeW;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

export function createAmbientMaterial(pixelRatio: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uGrade: { value: 0 },
      uNodeInk: { value: new THREE.Color(PALETTE.indigo) },
      uNodeGlow: { value: new THREE.Color(PALETTE.indigoLight) },
      uLightInk: { value: new THREE.Color(PALETTE.indigo) },
      uLightGlow: { value: new THREE.Color(PALETTE.passageAccent) },
    },
  });
}
