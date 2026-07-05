import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useJourney } from "./journeyStore";
import { chamberAt, gradeAt, clamp01 } from "./math";
import { CHAMBERS } from "../../config/journey";
import { PALETTE, INK_ALPHA, mixHex, rgbaFromHex } from "../../config/palette";

/**
 * The master conductor (Direction §7): one ScrollTrigger across the whole
 * track writes journey progress/velocity/chamber/grade into the store, and
 * mirrors the grade onto the `.lumen` root as pre-blended CSS colors so the
 * placard layer follows the same lighting as the world — the seam that
 * must never show. Scroll is never hijacked.
 */
export function JourneyScroll({
  rootRef,
  trackRef,
}: {
  rootRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLElement | null>;
}) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    let lastGrade = -1;
    const applyGrade = (grade: number) => {
      if (Math.abs(grade - lastGrade) < 0.004) return;
      lastGrade = grade;
      const bg = mixHex(PALETTE.atelier, PALETTE.passage, grade);
      const ink = mixHex(PALETTE.graphite, PALETTE.passageInk, grade);
      const accent = mixHex(PALETTE.indigo, PALETTE.passageAccent, grade);
      const s = root.style;
      s.setProperty("--lumen-grade", grade.toFixed(4));
      s.setProperty("--lx-bg", bg);
      s.setProperty("--lx-ink", ink);
      s.setProperty("--lx-accent", accent);
      const inkHex = grade < 0.5 ? PALETTE.graphite : PALETTE.passageInk;
      s.setProperty("--lx-ink-soft", rgbaFromHex(inkHex, INK_ALPHA.soft));
      s.setProperty("--lx-ink-faint", rgbaFromHex(inkHex, INK_ALPHA.faint));
      s.setProperty("--lx-hairline", rgbaFromHex(inkHex, INK_ALPHA.hairline));
    };

    // MEASURED bands: each chamber's end as a fraction of the scrollable
    // track — a chamber is "current" while it crosses the viewport centre.
    // Sections flow at natural height now, so shares can't predict this;
    // we read the real DOM on every refresh (resize, font load, reflow).
    const measureBands = (self: ScrollTrigger) => {
      const span = Math.max(1, self.end - self.start);
      const mid = window.innerHeight / 2;
      const scrollY = window.scrollY;
      const bands: number[] = [];
      let prev = 0;
      for (let i = 0; i < CHAMBERS.length; i++) {
        const el = document.getElementById(`chamber-${CHAMBERS[i].id}`);
        if (!el) return; // DOM not ready — keep current bands
        const bottom = el.getBoundingClientRect().bottom + scrollY;
        const p = i === CHAMBERS.length - 1 ? 1 : clamp01((bottom - mid - self.start) / span);
        prev = Math.min(1, Math.max(p, prev + 0.001));
        bands.push(prev);
      }
      bands[bands.length - 1] = 1;
      useJourney.getState().setBands(bands);
    };

    const write = (self: ScrollTrigger) => {
      const p = self.progress;
      const { index, local } = chamberAt(p);
      const grade = gradeAt(p);
      useJourney.getState().setScroll(p, self.getVelocity(), index, local, grade);
      applyGrade(grade);
    };

    const master = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onRefresh: (self) => {
        measureBands(self);
        write(self);
      },
      onUpdate: write,
    });

    measureBands(master);

    // dwell bookkeeping for the Observatory's memory traces
    const dwell = window.setInterval(() => {
      const j = useJourney.getState();
      j.addDwell(j.chamberIndex, 1000);
    }, 1000);

    applyGrade(0);
    master.update();

    // ScrollTrigger measures the sticky track once; anything that shifts
    // layout afterwards (fonts, the First Breath overlay lifting, image
    // decode) can leave those measurements stale, which desyncs the grade
    // and camera from the real scroll position. Refresh once things settle.
    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 400);
    const t2 = window.setTimeout(refresh, 1600);
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => undefined);

    return () => {
      window.clearInterval(dwell);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      master.kill();
    };
  }, [rootRef, trackRef]);

  return null;
}
