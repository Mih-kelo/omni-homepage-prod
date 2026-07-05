import type { GradeKeyframe } from "../../types";
import { useJourney } from "./journeyStore";

/**
 * Journey math over MEASURED chamber bands. The store's `bands` hold each
 * chamber's cumulative end as a fraction of the scrollable track, measured
 * from the real DOM by JourneyScroll on every ScrollTrigger refresh — so
 * chamber mapping and the grade curve stay true under natural (unpinned)
 * section heights, any viewport, any font-load reflow.
 */

/** chamber index + local progress (0..1 within the chamber) at a journey progress */
export function chamberAt(progress: number): { index: number; local: number } {
  const bands = useJourney.getState().bands;
  const p = Math.min(0.999999, Math.max(0, progress));
  let start = 0;
  for (let i = 0; i < bands.length; i++) {
    const end = bands[i];
    if (p < end) return { index: i, local: (p - start) / (end - start || 1) };
    start = end;
  }
  return { index: bands.length - 1, local: 1 };
}

/**
 * Grade curve (0 light → 1 dark) re-anchored to the measured bands so the
 * story holds at any layout: light until late Paradox, dim into the Core,
 * hold dark, a sharp-but-continuous return to white ~80% through the Core
 * ("through the glass"), light across Composition/Range, dark again over
 * the Observatory, dawn back before the Invitation. Always in-travel.
 */
export function gradeKeysFromBands(bands: number[]): GradeKeyframe[] {
  const at = (i: number, local: number) => {
    const start = i === 0 ? 0 : bands[i - 1];
    return start + (bands[i] - start) * local;
  };
  return [
    [0, 0],
    [at(2, 0.78), 0], // late Paradox — the aperture begins to dim
    [at(3, 0.2), 1], // inside the Core's darkness
    [at(3, 0.62), 1], // hold through the descent
    [at(3, 0.82), 0], // through the glass — brightest white on the far side
    [at(5, 0.85), 0], // late Range — the ceiling opens
    [at(6, 0.3), 1], // the Observatory vault
    [at(6, 0.78), 1],
    [at(7, 0.22), 0], // descent — light rises like dawn
    [1, 0],
  ];
}

/** keyframes cached per bands identity — bands only change on refresh */
let keyedBands: number[] | null = null;
let gradeKeys: GradeKeyframe[] = [];

/** piecewise-linear grade (0 light → 1 dark) at a journey progress */
export function gradeAt(progress: number): number {
  const bands = useJourney.getState().bands;
  if (bands !== keyedBands) {
    keyedBands = bands;
    gradeKeys = gradeKeysFromBands(bands);
  }
  const kf = gradeKeys;
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
