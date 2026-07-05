import { create } from "zustand";
import type { ExperienceMode } from "../../types";
import { useTier } from "../tiers/tierStore";

/**
 * Experience mode resolution (Direction §10):
 * still = prefers-reduced-motion OR no WebGL OR the visible "Still" toggle.
 * SSR renders "boot" (cinematic DOM, no canvas); the client resolves
 * before the First Breath completes.
 */
const STILL_KEY = "lumen-still";

interface ModeState {
  mode: ExperienceMode;
  stillPreferred: boolean;
  resolve: () => void;
  setStill: (still: boolean) => void;
}

export const useMode = create<ModeState>((set, get) => ({
  mode: "boot",
  stillPreferred: false,
  resolve: () => {
    useTier.getState().probe();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const webglOk = useTier.getState().webglOk === true;
    let saved = false;
    try {
      saved = localStorage.getItem(STILL_KEY) === "1";
    } catch {
      saved = false;
    }
    const still = reduced || !webglOk || saved;
    set({ mode: still ? "still" : "cinematic", stillPreferred: saved });
  },
  setStill: (still) => {
    try {
      localStorage.setItem(STILL_KEY, still ? "1" : "0");
    } catch {
      /* private mode — session-only */
    }
    set({
      stillPreferred: still,
      mode: still ? "still" : get().mode === "still" ? "cinematic" : get().mode,
    });
    if (still) set({ mode: "still" });
  },
}));
