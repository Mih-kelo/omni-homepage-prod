import { useEffect } from "react";
import { usePresence } from "./presenceStore";
import { useJourney } from "../journey/journeyStore";
import { TIMING } from "../../config/motion";

/**
 * Client-side presence sensors: pointer, touch, reduced-motion, idle clock.
 * The idle clock drives the Idle Murmur (Direction Moment 14): after
 * idleDreamMs the active chamber "dreams"; dreams repeat while idle.
 */
export function PresenceTracker() {
  useEffect(() => {
    const p = usePresence.getState();
    p.setFlags({
      isTouch: window.matchMedia("(pointer: coarse)").matches,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    let lastX = -9999;
    let lastY = -9999;
    let lastT = performance.now();
    let throttleT = 0;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      // throttle to ~90Hz — pointer events can fire far faster than we render
      if (now - throttleT < 11) return;
      throttleT = now;
      const dt = Math.max(1, now - lastT);
      const dist = lastX < -999 ? 0 : Math.hypot(e.clientX - lastX, e.clientY - lastY);
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      const speed = usePresence.getState().pointerSpeed * 0.8 + (dist / dt) * 0.2;
      usePresence
        .getState()
        .setPointer(
          e.clientX,
          e.clientY,
          (e.clientX / window.innerWidth) * 2 - 1,
          -((e.clientY / window.innerHeight) * 2 - 1),
          speed,
        );
    };
    const onLeave = () => usePresence.getState().setPointerActive(false);
    const onInput = () => usePresence.getState().markInput();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onInput, { passive: true });
    window.addEventListener("scroll", onInput, { passive: true });
    window.addEventListener("keydown", onInput);
    document.documentElement.addEventListener("pointerleave", onLeave);

    /* idle clock + dream dispatch */
    let raf = 0;
    let lastDreamAt = 0;
    const tick = () => {
      const s = usePresence.getState();
      const idle = performance.now() - (s.lastInputAt || performance.now());
      s.setIdleMs(idle);
      if (idle > TIMING.idleDreamMs) {
        const since = performance.now() - lastDreamAt;
        if (since > TIMING.idleDreamMs) {
          lastDreamAt = performance.now();
          const j = useJourney.getState();
          j.dispatchDream(j.chamberIndex);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onInput);
      window.removeEventListener("scroll", onInput);
      window.removeEventListener("keydown", onInput);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
