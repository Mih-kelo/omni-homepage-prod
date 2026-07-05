import { useJourney } from "./journeyStore";
import { CHAMBER_INDEX_BY_ID } from "../../config/journey";
import type { ChamberId } from "../../types";

/**
 * The writing engine — the thread writes the story. Text scrubs against
 * the same node-arrival fractions the story path draws with
 * (journeyStore.nodeFracs), so the words and the stroke share one source
 * of truth: a section begins writing shortly after the pen leaves the
 * previous node and finishes exactly as the tip arrives at its own node.
 * Writing happens once per page load (a monotonic high-water mark), so
 * scrolling back never un-writes. One rAF for the whole page, listeners called
 * only when their value changes — zero React re-renders.
 *
 * Chamber 0 is the exception: the hero writes itself in over ~1.2s as the
 * First Breath lifts (time-driven), so it is readable immediately.
 */

type WriteFn = (w: number) => void;

interface Registration {
  chamber: number;
  fn: WriteFn;
  last: number;
  /** monotonic high-water mark — once written, a line stays written */
  peak: number;
}

/** writing begins the moment the pen leaves the previous node… */
const START = 0;
/** …and finishes by the middle of the approach, so the words are fully
 *  written while the section is still comfortably on screen */
const COMPLETE = 0.45;
const HERO_DELAY_MS = 250;
const HERO_WRITE_MS = 1200;
/** if the world never reports ready (no WebGL etc.), write the hero anyway */
const HERO_FALLBACK_MS = 2800;

const regs = new Set<Registration>();
let raf = 0;
let engineT0 = 0;
let heroT0: number | null = null;

function heroProgress(now: number): number {
  if (heroT0 === null) {
    if (useJourney.getState().worldReady || now - engineT0 > HERO_FALLBACK_MS) heroT0 = now;
    else return 0;
  }
  const t = (now - heroT0 - HERO_DELAY_MS) / HERO_WRITE_MS;
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(1 - t, 3); // ease-out — a hand finishing its line
}

function writeProgress(chamber: number, now: number): number {
  if (chamber === 0) return heroProgress(now);
  const j = useJourney.getState();
  const fr = j.nodeFracs;
  // path not measured yet — err toward visible, never park text hidden
  if (!fr || fr.length <= chamber) return 1;
  const span = fr[chamber] - fr[chamber - 1];
  const start = fr[chamber - 1] + span * START;
  const end = fr[chamber - 1] + span * COMPLETE;
  const w = (j.smoothedProgress - start) / Math.max(end - start, 1e-4);
  return w <= 0 ? 0 : w >= 1 ? 1 : w;
}

function tick(now: number) {
  for (const r of regs) {
    if (r.last === 1) continue; // written once per page load — it stays
    const w = writeProgress(r.chamber, now);
    if (w > r.peak) r.peak = w;
    if (r.peak !== r.last) {
      r.last = r.peak;
      r.fn(r.peak);
    }
  }
  raf = regs.size > 0 ? requestAnimationFrame(tick) : 0;
}

/** register a writing target; `fn` receives 0..1; returns unregister */
export function registerWriting(chamber: number, fn: WriteFn): () => void {
  const r: Registration = { chamber, fn, last: -1, peak: 0 };
  if (regs.size === 0) engineT0 = performance.now();
  regs.add(r);
  if (!raf) raf = requestAnimationFrame(tick);
  return () => {
    regs.delete(r);
    if (regs.size === 0 && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

/** which chamber an element belongs to (via its ChamberSection ancestor) */
export function chamberOf(el: Element | null): number {
  const id = el?.closest<HTMLElement>("[data-chamber]")?.dataset.chamber;
  return id ? (CHAMBER_INDEX_BY_ID[id as ChamberId] ?? 0) : 0;
}
