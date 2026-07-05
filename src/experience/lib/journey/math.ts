import { BOUNDARIES, GRADE_KEYFRAMES } from "../../config/journey";

/** chamber index + local progress (0..1 within the chamber) at a journey progress */
export function chamberAt(progress: number): { index: number; local: number } {
  const p = Math.min(0.999999, Math.max(0, progress));
  let start = 0;
  for (let i = 0; i < BOUNDARIES.length; i++) {
    const end = BOUNDARIES[i];
    if (p < end) return { index: i, local: (p - start) / (end - start) };
    start = end;
  }
  return { index: BOUNDARIES.length - 1, local: 1 };
}

/** piecewise-linear grade (0 light → 1 dark) at a journey progress */
export function gradeAt(progress: number): number {
  const kf = GRADE_KEYFRAMES;
  if (progress <= kf[0][0]) return kf[0][1];
  for (let i = 1; i < kf.length; i++) {
    if (progress <= kf[i][0]) {
      const [p0, v0] = kf[i - 1];
      const [p1, v1] = kf[i];
      const t = (progress - p0) / (p1 - p0 || 1);
      return v0 + (v1 - v0) * t;
    }
  }
  return kf[kf.length - 1][1];
}

/** frame-rate independent damping (critically-damped-ish exponential follow) */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
