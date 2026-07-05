import { create } from "zustand";

/**
 * Presence — one model of the visitor, feeding every layer at once
 * (Direction §5). World reads transiently in useFrame via getState();
 * UI subscribes to coarse fields only.
 */
export interface PresenceState {
  /** pointer in px and in NDC (−1..1, y up) */
  px: number;
  py: number;
  nx: number;
  ny: number;
  pointerActive: boolean;
  /** px/ms, smoothed */
  pointerSpeed: number;
  /** ms since last input (scroll counts as input) */
  idleMs: number;
  isTouch: boolean;
  reducedMotion: boolean;
  lastInputAt: number;
  markInput: () => void;
  setPointer: (px: number, py: number, nx: number, ny: number, speed: number) => void;
  setPointerActive: (active: boolean) => void;
  setIdleMs: (ms: number) => void;
  setFlags: (f: Partial<Pick<PresenceState, "isTouch" | "reducedMotion">>) => void;
}

export const usePresence = create<PresenceState>((set) => ({
  px: -9999,
  py: -9999,
  nx: 0,
  ny: 0,
  pointerActive: false,
  pointerSpeed: 0,
  idleMs: 0,
  isTouch: false,
  reducedMotion: false,
  lastInputAt: 0,
  markInput: () => set({ lastInputAt: performance.now(), idleMs: 0 }),
  setPointer: (px, py, nx, ny, pointerSpeed) =>
    set({
      px,
      py,
      nx,
      ny,
      pointerSpeed,
      pointerActive: true,
      lastInputAt: performance.now(),
      idleMs: 0,
    }),
  setPointerActive: (pointerActive) => set({ pointerActive }),
  setIdleMs: (idleMs) => set({ idleMs }),
  setFlags: (f) => set(f),
}));
