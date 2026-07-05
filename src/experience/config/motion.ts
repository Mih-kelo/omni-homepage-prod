/**
 * The motion vocabulary — Direction §7.
 * World: long exponential arrivals, sine breathing, nothing bouncy.
 * UI: springs, soft and quick, hand-finished.
 * All timing/easing constants live here; nothing hardcodes feel elsewhere.
 */

/** GSAP ease names (world + scrubbed choreography) */
export const EASE = {
  arrival: "expo.out",
  departure: "power2.in",
  travel: "power1.inOut",
  breathe: "sine.inOut",
  sweep: "power3.inOut",
} as const;

/** Framer springs (UI layer only — springs never drive the world) */
export const SPRING = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 1 } as const,
  quick: { type: "spring", stiffness: 300, damping: 26, mass: 0.8 } as const,
  detent: { type: "spring", stiffness: 520, damping: 32, mass: 0.6 } as const,
};

/** wall-text mask-lift (Framer variants) — em-relative + opacity so it can
 *  never park invisible, and revealed once so scroll can't re-hide it */
export const MASKLINE = {
  hidden: { y: "0.9em", opacity: 0 },
  shown: { y: "0em", opacity: 1 },
  stagger: 0.09,
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export const TIMING = {
  /** the world breathes on a six-second period */
  breathePeriodSec: 6,
  /** camera mass — approximate seconds of scrub lag (critically damped) */
  cameraFollowLambda: 3.2,
  /** cursor lens influence cap: ≤3% of element size / subtle world offset */
  lensMaxNdc: 0.03,
  lensWorldOffset: 0.55,
  /** Idle Murmur thresholds (Direction Moment 14) */
  idleDreamMs: 20_000,
  deepIdleMs: 120_000,
  /** pulse-back on CTA press must finish under 2s (Moment 13 guard) */
  pulseBackMs: 1_600,
  /** first breath: repeat visits condense in under a second (Moment 1 guard) */
  breathFullMs: 2_600,
  breathRepeatMs: 600,
} as const;
