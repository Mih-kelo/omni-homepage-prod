/** Shared contracts for the LUMEN experience. Frozen â€” workers code against these. */

export type ChamberId =
  | "threshold"
  | "listening"
  | "paradox"
  | "core"
  | "composition"
  | "range"
  | "observatory"
  | "invitation";

export interface Vec3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface ChamberDef {
  id: ChamberId;
  index: number;
  title: string;
  emotion: string;
  /** share of total scroll length, in percent (sums to 100) */
  share: number;
  /** center of this chamber along the world spine (negative z = deeper) */
  spineZ: number;
  /** camera control points, world space (the global spline threads these) */
  cameraPoints: Vec3Tuple[];
  /** look-at control points, world space */
  lookPoints: Vec3Tuple[];
}

/** piecewise-linear grade keyframes: [journeyProgress 0..1, grade 0..1] */
export type GradeKeyframe = readonly [number, number];

export type ExperienceMode = "boot" | "cinematic";

export type Tier = 0 | 1 | 2;

export interface TierProfile {
  tier: Tier;
  dprMax: number;
  moteCount: number;
  post: "none" | "bloom" | "full";
  transmission: "physical" | "low" | "full";
}
