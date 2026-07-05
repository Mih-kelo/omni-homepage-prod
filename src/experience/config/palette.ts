/** LUMEN palette — Direction §6. One saturated voice; gold appears once. */

export const PALETTE = {
  atelier: "#fafaf8",
  paper: "#f4f2ed",
  graphite: "#17171c",
  indigo: "#3730a3",
  indigoDeep: "#312e81",
  indigoLight: "#6366f1",
  passage: "#0b0b1a",
  passageInk: "#eae8e1",
  /** interactive accent when the world is inside a dark passage */
  passageAccent: "#9b9eff",
  /** the seductive wrong answer — bestseller halo only */
  gold: "#f0c674",
} as const;

/** hex + alpha → rgba() string */
export function rgbaFromHex(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** ink/hairline alphas used when the conductor blends DOM colors by grade */
export const INK_ALPHA = { soft: 0.72, faint: 0.46, hairline: 0.14 } as const;

/** hex → [r,g,b] 0..255 */
export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Linear hex lerp for the conductor's DOM grade blend. Linear (not gamma)
 * mixing is deliberate here: the white→near-black passage transition must
 * actually reach a deep, dark ground — gamma mixing brightens the midtones
 * into grey, which is exactly the "too light" dark passage we want to avoid.
 */
export function mixHex(a: string, b: string, t: number): string {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const c = A.map((av, i) => Math.round(av * (1 - t) + B[i] * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
