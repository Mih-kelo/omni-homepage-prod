import { create } from "zustand";
import type { ExperienceMode } from "../../types";
import { useTier } from "../tiers/tierStore";

/**
 * Experience mode: SSR renders "boot" (the full DOM narrative, no canvas);
 * the client resolves to cinematic — the one edition. The tier probe runs
 * here so the world mounts only where WebGL actually exists; without it
 * the cinematic DOM (thread, writing, chrome) simply runs canvas-free.
 */
interface ModeState {
  mode: ExperienceMode;
  resolve: () => void;
}

export const useMode = create<ModeState>((set) => ({
  mode: "boot",
  resolve: () => {
    useTier.getState().probe();
    set({ mode: "cinematic" });
  },
}));
