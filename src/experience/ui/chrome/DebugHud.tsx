import { useEffect, useRef, useState } from "react";
import { useJourney } from "../../lib/journey/journeyStore";
import { useTier } from "../../lib/tiers/tierStore";

/** dev-only readout, visible with ?hud=1 — never part of the experience */
export function DebugHud() {
  const [enabled, setEnabled] = useState(false);
  const el = useRef<HTMLPreElement>(null);

  useEffect(() => {
    setEnabled(new URLSearchParams(window.location.search).get("hud") === "1");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let frames = 0;
    let fps = 0;
    let last = performance.now();
    const tick = () => {
      frames++;
      const now = performance.now();
      if (now - last >= 500) {
        fps = Math.round((frames * 1000) / (now - last));
        frames = 0;
        last = now;
      }
      const j = useJourney.getState();
      const t = useTier.getState().profile;
      if (el.current) {
        el.current.textContent =
          `fps ${fps}  tier ${t.tier}  motes ${t.moteCount}\n` +
          `chamber ${j.chamberIndex}  local ${j.chamberLocal.toFixed(2)}\n` +
          `progress ${j.rawProgress.toFixed(3)}  grade ${j.grade.toFixed(2)}\n` +
          `vel ${Math.round(j.velocity)}  channels ${Object.keys(j.channels).length}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled) return null;
  return <pre className="lx-hud" ref={el} aria-hidden="true" />;
}
