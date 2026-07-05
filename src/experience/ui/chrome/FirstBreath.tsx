import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { TIMING } from "../../config/motion";
import { useJourney } from "../../lib/journey/journeyStore";
import { useMode } from "../../lib/a11y/modeStore";

const BREATHED_KEY = "lumen-breathed";

/**
 * The First Breath (Moment 1): the loader is the overture — no spinner
 * exists anywhere. The veil condenses from blur; as it lifts, a share of
 * the mote field behind it is holding the wordmark (channel
 * "breath.assemble") and releases it back into the current. Returning
 * visitors in the same session condense in under a second (guard rail).
 */
export function FirstBreath() {
  const [phase, setPhase] = useState<"veil" | "condense" | "gone">("veil");

  useEffect(() => {
    let repeat = false;
    try {
      repeat = sessionStorage.getItem(BREATHED_KEY) === "1";
    } catch {
      repeat = false;
    }
    const maxWait = repeat ? TIMING.breathRepeatMs : TIMING.breathFullMs;
    const start = performance.now();
    let assembleTl: gsap.core.Timeline | null = null;
    let doneTimer = 0;

    let raf = 0;
    const check = () => {
      const ready = useJourney.getState().worldReady || useMode.getState().mode === "still";
      const waited = performance.now() - start;
      if ((ready && waited > (repeat ? 220 : 1100)) || waited > maxWait) {
        setPhase("condense");
        try {
          sessionStorage.setItem(BREATHED_KEY, "1");
        } catch {
          /* session-only nicety */
        }
        // the field assembles the wordmark behind the lifting veil, holds a
        // heartbeat, and releases (first arrival only)
        if (!repeat && useJourney.getState().worldReady) {
          const proxy = { v: 0 };
          assembleTl = gsap
            .timeline()
            .to(proxy, {
              v: 1,
              duration: 0.8,
              ease: "expo.out",
              onUpdate: () => useJourney.getState().setChannel("breath.assemble", proxy.v),
            })
            .to(proxy, {
              v: 0,
              duration: 1.25,
              ease: "power2.inOut",
              delay: 0.75,
              onUpdate: () => useJourney.getState().setChannel("breath.assemble", proxy.v),
            });
        }
        doneTimer = window.setTimeout(() => setPhase("gone"), repeat ? 320 : 900);
        return;
      }
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(doneTimer);
      assembleTl?.kill();
    };
    // polls live store state — runs exactly once so the overture can't restart
  }, []);

  return (
    <AnimatePresence>
      {phase !== "gone" && (
        <motion.div
          className="lx-breath"
          role="status"
          aria-label="Omni Target is opening"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        >
          <motion.div
            className="lx-breath-word"
            initial={{ filter: "blur(14px)", opacity: 0.35, letterSpacing: "0.34em" }}
            animate={
              phase === "condense"
                ? { filter: "blur(0px)", opacity: 1, letterSpacing: "0.22em" }
                : { filter: "blur(9px)", opacity: 0.7, letterSpacing: "0.28em" }
            }
            transition={{ duration: phase === "condense" ? 0.55 : 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            OMNI TARGET
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
