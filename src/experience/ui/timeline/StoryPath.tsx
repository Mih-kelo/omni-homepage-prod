import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useJourney } from "../../lib/journey/journeyStore";
import { CHAMBERS } from "../../config/journey";
import "./timeline.css";

/**
 * The story path — the signature of the page. One continuous brush stroke
 * drawn in real time by the visitor's own scroll: nothing exists ahead of
 * the pen, the tip inks forward as they travel and erases from the tip
 * when they scroll back. The path weaves through each section's open
 * whitespace — every curve intentional, editorial, never chaotic.
 *
 * Geometry is measured from the real DOM (on ScrollTrigger refresh and
 * debounced resize); drawing is a single rAF loop reading the store
 * transiently — zero React re-renders. The store's smoothedProgress lags
 * the finger slightly, and that lag is the organic pen feel.
 * Decorative: aria-hidden, pointer-events none, content stacks above.
 */

interface Pt {
  x: number;
  y: number;
}

/** weave anchor per chamber: x as a fraction of track width (desktop),
 *  y as a fraction of the section's height — each sits in that section's
 *  open whitespace, eyeballed from the alternating split layouts */
const WEAVE: Record<string, { x: number; y: number }> = {
  threshold: { x: 0.74, y: 0.58 }, // hero copy left — the light lives right
  listening: { x: 0.2, y: 0.66 }, // headline upper-left, open lower-left
  paradox: { x: 0.5, y: 0.55 }, // between the two products, through "vs"
  core: { x: 0.5, y: 0.5 }, // straight through the darkness
  composition: { x: 0.16, y: 0.55 }, // under the left column's margin
  range: { x: 0.62, y: 0.5 }, // the open middle between verdict and numbers
  observatory: { x: 0.22, y: 0.5 }, // content centered — open left
  invitation: { x: 0.5, y: 0.55 }, // ends at the CTA
};

/** at rest, only the very beginning of the stroke exists (px of path) */
const MIN_TICK = 48;
/** skip repaints below this progress delta (≈ a few px of stroke) */
const EPS = 0.0004;

/** Catmull-Rom through the anchors → gentle cubic Béziers.
 *  Returns the segment strings so partial lengths can be measured. */
function catmullRom(pts: Pt[]): { move: string; segs: string[] } {
  const p = [pts[0], ...pts, pts[pts.length - 1]];
  const move = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  const segs: string[] = [];
  for (let i = 1; i < p.length - 2; i++) {
    const c1x = p[i].x + (p[i + 1].x - p[i - 1].x) / 6;
    const c1y = p[i].y + (p[i + 1].y - p[i - 1].y) / 6;
    const c2x = p[i + 1].x - (p[i + 2].x - p[i].x) / 6;
    const c2y = p[i + 1].y - (p[i + 2].y - p[i].y) / 6;
    segs.push(
      `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ` +
        `${p[i + 1].x.toFixed(1)} ${p[i + 1].y.toFixed(1)}`,
    );
  }
  return { move, segs };
}

export function StoryPath() {
  const svgRef = useRef<SVGSVGElement>(null);
  const strokeRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const nodeRefs = useRef<Array<SVGCircleElement | null>>([]);

  useEffect(() => {
    const svg = svgRef.current;
    const stroke = strokeRef.current;
    const tip = tipRef.current;
    if (!svg || !stroke || !tip) return;

    let total = 0;
    let nodeLens: number[] = [];
    const states = new Array<string>(CHAMBERS.length).fill("");
    let lastP = -1;

    const apply = (force = false) => {
      if (total <= 0) return;
      const j = useJourney.getState();
      const p = j.smoothedProgress;
      if (!force && Math.abs(p - lastP) < EPS) return;
      lastP = p;

      // the pen: drawn length follows progress; a small tick always exists
      const len = Math.min(total, Math.max(MIN_TICK, p * total));
      stroke.style.strokeDashoffset = String(total - len);
      const pt = stroke.getPointAtLength(len);
      tip.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);

      // nodes ink in as the tip passes; the nearest one breathes
      for (let i = 0; i < CHAMBERS.length; i++) {
        const st = len >= nodeLens[i] - 0.5 ? (i === j.chamberIndex ? "active" : "past") : "future";
        if (st !== states[i]) {
          states[i] = st;
          const el = nodeRefs.current[i];
          if (el) el.dataset.state = st;
        }
      }
    };

    const measure = () => {
      const track = document.querySelector<HTMLElement>(".lumen-track");
      if (!track) return;
      const trackRect = track.getBoundingClientRect();
      const w = track.clientWidth;
      const h = Math.max(1, Math.round(trackRect.height));

      // ancestor-agnostic placement: zero out, then offset by the delta
      svg.style.top = "0px";
      svg.style.left = "0px";
      const svgRect = svg.getBoundingClientRect();
      svg.style.top = `${trackRect.top - svgRect.top}px`;
      svg.style.left = `${trackRect.left - svgRect.left}px`;
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

      // anchors from the real sections; mobile narrows the weave so the
      // stroke never fights single-column content
      const mobile = window.matchMedia("(max-width: 900px)").matches;
      const anchors: Pt[] = [];
      let lastHeight = 0;
      for (const c of CHAMBERS) {
        const el = document.getElementById(`chamber-${c.id}`);
        if (!el) return; // DOM not ready — keep previous geometry
        const r = el.getBoundingClientRect();
        const wv = WEAVE[c.id];
        const xf = mobile ? 0.5 + (wv.x - 0.5) * 0.55 : wv.x;
        anchors.push({ x: xf * w, y: r.top - trackRect.top + r.height * wv.y });
        lastHeight = r.height;
      }
      const start: Pt = {
        x: anchors[0].x,
        y: Math.min(window.innerHeight * 0.14, anchors[0].y * 0.35),
      };
      const end: Pt = { x: 0.5 * w, y: h - lastHeight * 0.12 };
      const { move, segs } = catmullRom([start, ...anchors, end]);

      stroke.setAttribute("d", move + " " + segs.join(" "));
      total = stroke.getTotalLength();
      stroke.style.strokeDasharray = String(total);

      // cumulative path length at each anchor (anchor k ends segment k)
      const meas = document.createElementNS("http://www.w3.org/2000/svg", "path");
      nodeLens = anchors.map((_, k) => {
        meas.setAttribute("d", move + " " + segs.slice(0, k + 1).join(" "));
        return meas.getTotalLength();
      });

      // publish node-arrival fractions — the writing engine scrubs text
      // against these so the thread and the words share one truth
      useJourney.getState().setNodeFracs(nodeLens.map((l) => l / total));

      for (let i = 0; i < anchors.length; i++) {
        const el = nodeRefs.current[i];
        if (el) {
          el.setAttribute("cx", anchors[i].x.toFixed(1));
          el.setAttribute("cy", anchors[i].y.toFixed(1));
        }
      }

      apply(true);
    };

    let raf = 0;
    const tick = () => {
      apply();
      raf = requestAnimationFrame(tick);
    };

    measure();
    raf = requestAnimationFrame(tick);

    // re-measure whenever layout truth changes
    ScrollTrigger.addEventListener("refresh", measure);
    let resizeT = 0;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.removeEventListener("refresh", measure);
    };
  }, []);

  return (
    <svg ref={svgRef} className="lx-storypath" aria-hidden="true" focusable="false">
      <path ref={strokeRef} className="lx-storypath-stroke" />
      {CHAMBERS.map((c, i) => (
        <circle
          key={c.id}
          className="lx-storypath-node"
          data-state="future"
          r="3.5"
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        />
      ))}
      <circle ref={tipRef} className="lx-storypath-tip" r="3" />
    </svg>
  );
}
