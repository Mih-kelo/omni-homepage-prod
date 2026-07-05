import { create } from "zustand";
import type { Tier, TierProfile } from "../../types";

/**
 * Device tiers (Direction §11): the world scales, never breaks.
 * Tier 2: full editorial set. Tier 1: bloom only, fewer motes.
 * Tier 0: grade-only, lean field. Runtime demotion via PerformanceMonitor.
 */
export const TIER_PROFILES: Record<Tier, TierProfile> = {
  // distant stars, very sparse — just enough to keep the page from feeling
  // static; the vertical timeline carries the story, not the field
  0: { tier: 0, dprMax: 1.25, moteCount: 420, post: "none", transmission: "physical" },
  1: { tier: 1, dprMax: 1.5, moteCount: 720, post: "none", transmission: "low" },
  2: { tier: 2, dprMax: 2, moteCount: 1_100, post: "none", transmission: "full" },
};

interface TierState {
  profile: TierProfile;
  webglOk: boolean | null;
  probe: () => void;
  demote: () => void;
  setWebglOk: (ok: boolean) => void;
}

function detectTier(): Tier {
  if (typeof window === "undefined") return 1;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const mem = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  let score = 0;
  if (mem >= 8) score += 2;
  else if (mem >= 4) score += 1;
  if (cores >= 8) score += 2;
  else if (cores >= 4) score += 1;
  if (coarse) score -= 2;
  if (score >= 3) return 2;
  if (score >= 1) return 1;
  return 0;
}

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

export const useTier = create<TierState>((set, get) => ({
  profile: TIER_PROFILES[1],
  webglOk: null,
  probe: () => {
    const ok = webglAvailable();
    set({ webglOk: ok, profile: TIER_PROFILES[detectTier()] });
  },
  demote: () => {
    const t = get().profile.tier;
    if (t > 0) set({ profile: TIER_PROFILES[(t - 1) as Tier] });
  },
  setWebglOk: (webglOk) => set({ webglOk }),
}));
