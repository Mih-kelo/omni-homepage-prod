import * as THREE from "three";
import { CHAMBERS } from "../config/journey";
import { chamberAt } from "../lib/journey/math";

/**
 * The spine — one continuous camera path threading every chamber's control
 * points (Direction §2: one unbroken move). Progress→pose mapping is
 * per-chamber: chamber i's scroll share maps onto its own segment of the
 * spline, so pacing is authored by control-point spacing.
 */

function buildCurve(points: { x: number; y: number; z: number }[]): THREE.CatmullRomCurve3 {
  return new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(p.x, p.y, p.z)),
    false,
    "centripetal",
  );
}

interface Rail {
  curve: THREE.CatmullRomCurve3;
  /** parameter u at each chamber's entry point (plus trailing 1) */
  entries: number[];
}

function buildRail(
  select: (c: (typeof CHAMBERS)[number]) => { x: number; y: number; z: number }[],
): Rail {
  const all: { x: number; y: number; z: number }[] = [];
  const entryIndex: number[] = [];
  for (const c of CHAMBERS) {
    entryIndex.push(all.length);
    all.push(...select(c));
  }
  const n = all.length - 1;
  return { curve: buildCurve(all), entries: [...entryIndex.map((i) => i / n), 1] };
}

const cameraRail = buildRail((c) => c.cameraPoints);
const lookRail = buildRail((c) => c.lookPoints);

function sample(rail: Rail, progress: number, out: THREE.Vector3): THREE.Vector3 {
  const { index, local } = chamberAt(progress);
  const u0 = rail.entries[index];
  const u1 = rail.entries[index + 1];
  return rail.curve.getPoint(u0 + (u1 - u0) * local, out);
}

export function poseAt(progress: number, outPos: THREE.Vector3, outLook: THREE.Vector3): void {
  sample(cameraRail, progress, outPos);
  sample(lookRail, progress, outLook);
}

/** evenly-spaced points along the camera rail (for connective structure) */
export function spineSamples(count: number): THREE.Vector3[] {
  return cameraRail.curve.getSpacedPoints(count);
}
