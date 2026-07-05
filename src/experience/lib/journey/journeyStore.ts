import { create } from "zustand";

/**
 * The journey store — the conductor's shared state (Direction §7).
 * GSAP writes; the world reads transiently in useFrame. `channels` are
 * named scalar signals (namespaced "chamber.signal") that decouple GSAP
 * timelines from R3F: timelines write, world groups read.
 */
export interface JourneyState {
  rawProgress: number;
  /** written by CameraRig after damping — the world's sense of "now" */
  smoothedProgress: number;
  /** scroll velocity, ScrollTrigger units (px/s), signed */
  velocity: number;
  chamberIndex: number;
  chamberLocal: number;
  /** 0 light → 1 dark passage */
  grade: number;
  worldReady: boolean;
  channels: Record<string, number>;
  /** session memory (Direction §5): spent once, in the Observatory */
  memory: {
    hoveredSlides: Set<string>;
    swayedBloom: boolean;
    dwellMs: number[];
  };
  dream: { tick: number; chamberIndex: number };
  setScroll: (
    raw: number,
    velocity: number,
    chamberIndex: number,
    chamberLocal: number,
    grade: number,
  ) => void;
  setSmoothed: (p: number) => void;
  setWorldReady: (ready: boolean) => void;
  setChannel: (key: string, value: number) => void;
  rememberSlide: (id: string) => void;
  rememberSway: () => void;
  addDwell: (chamberIndex: number, ms: number) => void;
  dispatchDream: (chamberIndex: number) => void;
}

export const useJourney = create<JourneyState>((set, get) => ({
  rawProgress: 0,
  smoothedProgress: 0,
  velocity: 0,
  chamberIndex: 0,
  chamberLocal: 0,
  grade: 0,
  worldReady: false,
  channels: {},
  memory: {
    hoveredSlides: new Set<string>(),
    swayedBloom: false,
    dwellMs: [0, 0, 0, 0, 0, 0, 0, 0],
  },
  dream: { tick: 0, chamberIndex: 0 },
  setScroll: (rawProgress, velocity, chamberIndex, chamberLocal, grade) =>
    set({ rawProgress, velocity, chamberIndex, chamberLocal, grade }),
  setSmoothed: (smoothedProgress) => set({ smoothedProgress }),
  setWorldReady: (worldReady) => set({ worldReady }),
  setChannel: (key, value) => {
    // hot path: mutate in place, no new object per frame — readers poll via getState()
    get().channels[key] = value;
  },
  rememberSlide: (id) => {
    get().memory.hoveredSlides.add(id);
  },
  rememberSway: () => {
    get().memory.swayedBloom = true;
  },
  addDwell: (i, ms) => {
    const m = get().memory.dwellMs;
    m[i] = (m[i] ?? 0) + ms;
  },
  dispatchDream: (chamberIndex) =>
    set((s) => ({ dream: { tick: s.dream.tick + 1, chamberIndex } })),
}));

/** read a channel without subscribing (world hot path) */
export function channel(key: string): number {
  return useJourney.getState().channels[key] ?? 0;
}
