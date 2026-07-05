import { useEffect, useRef } from "react";
import { usePresence } from "../lib/presence/presenceStore";

/**
 * The Threshold's diegetic microlabels (Direction §3, Chamber 0): drift
 * near a mote and a small mono label resolves — the field is made of real
 * commerce events. DOM-side, cursor-proximity driven, decorative.
 */
const LABELS: Array<{ text: string; x: number; y: number }> = [
  { text: "order · 02:14", x: 0.66, y: 0.28 },
  { text: "product view · ninth visit", x: 0.8, y: 0.52 },
  { text: "returning customer", x: 0.62, y: 0.74 },
];

const RADIUS = 150;

export function ThresholdLabels() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = wrap.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const p = usePresence.getState();
        const children = el.children;
        for (let i = 0; i < children.length; i++) {
          const label = children[i] as HTMLElement;
          const lx = rect.left + rect.width * LABELS[i].x;
          const ly = rect.top + rect.height * LABELS[i].y;
          const d = Math.hypot(p.px - lx, p.py - ly);
          const near = p.pointerActive ? Math.max(0, 1 - d / RADIUS) : 0;
          label.style.opacity = (near * 0.9).toFixed(3);
          label.style.letterSpacing = `${0.18 + near * 0.06}em`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {LABELS.map((l) => (
        <span
          key={l.text}
          className="lx-mono"
          style={{
            position: "absolute",
            left: `${l.x * 100}%`,
            top: `${l.y * 100}%`,
            opacity: 0,
            transition: "opacity 120ms linear",
            whiteSpace: "nowrap",
          }}
        >
          {l.text}
        </span>
      ))}
    </div>
  );
}
