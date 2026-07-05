import type { ChamberDef } from "../types";

/**
 * The journey — Direction §3. Eight chambers of one instrument along a
 * world-space spine (−Z is deeper). Sections flow at natural height; the
 * real scroll bands are MEASURED from the DOM (lib/journey), so `share`
 * only seeds the pre-measure fallback. Each chamber's first cameraPoint
 * is its entry pose; the global spline threads every point in order
 * (see world/spine.ts).
 */

const v = (x: number, y: number, z: number) => ({ x, y, z });

export const CHAMBERS: ChamberDef[] = [
  {
    id: "threshold",
    index: 0,
    title: "The Threshold",
    emotion: "Curiosity",
    share: 7,
    spineZ: 0,
    cameraPoints: [v(0, 1.8, 9), v(0, 1.6, -16)],
    lookPoints: [v(0, 1.5, -14), v(0, 1.3, -44)],
  },
  {
    id: "listening",
    index: 1,
    title: "The Listening",
    emotion: "Wonder",
    share: 12,
    spineZ: -60,
    cameraPoints: [v(2.2, 1.7, -40), v(-1.9, 1.5, -66)],
    lookPoints: [v(-0.5, 1.3, -62), v(0.6, 1.1, -92)],
  },
  {
    id: "paradox",
    index: 2,
    title: "The Paradox Gallery",
    emotion: "Insight",
    share: 13,
    spineZ: -120,
    cameraPoints: [v(1.6, 1.8, -96), v(-2.4, 1.9, -124)],
    lookPoints: [v(-1.2, 1.2, -118), v(1.4, 1.1, -140)],
  },
  {
    id: "core",
    index: 3,
    title: "The Core",
    emotion: "Awe",
    share: 15,
    spineZ: -186,
    cameraPoints: [v(0, 0.6, -152), v(0, -1.4, -172), v(0, -2, -186), v(0, -0.8, -200)],
    lookPoints: [v(0, -1.6, -178), v(0, -2, -186), v(0, -1.6, -196), v(0, 0.6, -216)],
  },
  {
    id: "composition",
    index: 4,
    title: "The Composition Hall",
    emotion: "Understanding",
    share: 18,
    spineZ: -250,
    cameraPoints: [v(0, 1.4, -218), v(2, 1.6, -240), v(-2, 1.5, -264)],
    lookPoints: [v(0.8, 1.2, -238), v(-0.6, 1.3, -258), v(0.4, 1.2, -280)],
  },
  {
    id: "range",
    index: 5,
    title: "The Range",
    emotion: "Confidence",
    share: 12,
    spineZ: -320,
    cameraPoints: [v(0, 1.8, -288), v(0, 2.1, -312)],
    lookPoints: [v(0, 1.6, -320), v(0, 1.4, -368)],
  },
  {
    id: "observatory",
    index: 6,
    title: "The Observatory",
    emotion: "Trust",
    share: 8,
    spineZ: -380,
    cameraPoints: [v(0, 6.5, -346), v(0, 16, -372)],
    lookPoints: [v(0, 2, -366), v(0, -2.5, -381)],
  },
  {
    id: "invitation",
    index: 7,
    title: "The Invitation",
    emotion: "Desire",
    share: 15,
    spineZ: -440,
    cameraPoints: [v(0, 2.4, -408), v(0, 1.6, -434), v(0, 1.55, -437)],
    lookPoints: [v(0, 1.6, -430), v(0, 1.45, -452), v(0, 1.45, -452)],
  },
];

/**
 * Cumulative progress boundary at the END of each chamber, from shares —
 * ONLY the pre-measure fallback for the journey store's `bands`; the real
 * bands are measured from the DOM by JourneyScroll on every refresh.
 */
export const BOUNDARIES: number[] = (() => {
  const total = CHAMBERS.reduce((s, c) => s + c.share, 0);
  let acc = 0;
  return CHAMBERS.map((c) => (acc += c.share / total));
})();

export const CHAMBER_INDEX_BY_ID = Object.fromEntries(
  CHAMBERS.map((c) => [c.id, c.index]),
) as Record<ChamberDef["id"], number>;

/** the Lens — the one saturated object of the Invitation (Moment 13) */
export const LENS_POSITION = { x: 0, y: 1.5, z: -448 } as const;

/** the Core's center — chamber 3's camera path passes through it (Moment 7) */
export const CORE_POSITION = { x: 0, y: -2, z: -186 } as const;
