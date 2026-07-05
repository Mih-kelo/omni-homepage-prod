import { useEffect, useRef } from "react";
import { useJourney } from "../../lib/journey/journeyStore";
import { BOUNDARIES } from "../../config/journey";

/**
 * The story timeline — the signature visual identity of the experience.
 * A single continuous vertical pathway down the left edge that connects
 * every section into one journey: it grows as the visitor scrolls, each
 * section is a milestone node, the active node breathes, visited nodes
 * stay connected and future nodes remain softly faded, and an occasional
 * light travels the illuminated portion. Deliberately quiet and neutral —
 * premium restraint (Apple / Linear / Vercel), only a subtle indigo for
 * progress. Decorative to assistive tech; the placard layer is the story.
 */

/** each node sits at the centre of its section's scroll band */
const NODES = BOUNDARIES.map((end, i) => {
  const start = i === 0 ? 0 : BOUNDARIES[i - 1];
  return { frac: (start + end) / 2 };
});

export function StoryTimeline() {
  const fillRef = useRef<HTMLSpanElement>(null);
  const sparkRef = useRef<HTMLSpanElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    let raf = 0;
    let sparkPhase = 0.4;
    let t0 = performance.now();
    const states = new Array<string>(NODES.length).fill("");

    const tick = (now: number) => {
      const dt = Math.min((now - t0) / 1000, 0.1);
      t0 = now;
      const j = useJourney.getState();
      const progress = j.smoothedProgress;
      const active = j.chamberIndex;

      // the path illuminates as the visitor progresses (compositor-only)
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`;

      // an occasional light travels down the illuminated portion, then rests
      sparkPhase = (sparkPhase + dt * 0.085) % 1.75;
      if (sparkRef.current) {
        const s = sparkRef.current;
        if (sparkPhase < 1 && sparkPhase <= progress + 0.01) {
          const edge = Math.min(sparkPhase, 1 - sparkPhase);
          s.style.top = `${sparkPhase * 100}%`;
          s.style.opacity = String(Math.min(1, edge * 7) * 0.9);
        } else {
          s.style.opacity = "0";
        }
      }

      // node states: active breathes, past stays connected, future stays faint
      for (let i = 0; i < NODES.length; i++) {
        const st =
          i === active ? "active" : progress >= NODES[i].frac || i < active ? "past" : "future";
        if (st !== states[i]) {
          states[i] = st;
          const el = nodeRefs.current[i];
          if (el) el.dataset.state = st;
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="lx-timeline" aria-hidden="true">
      <div className="lx-timeline-rail">
        <span className="lx-timeline-fill" ref={fillRef} />
        <span className="lx-timeline-spark" ref={sparkRef} />
        {NODES.map((n, i) => (
          <span
            key={i}
            className="lx-timeline-node"
            data-state="future"
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            style={{ top: `${n.frac * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
