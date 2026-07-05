import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SPRING } from "../../config/motion";
import { APP_URL, COPY } from "../../config/copy";
import { CHAMBERS } from "../../config/journey";
import { useJourney } from "../../lib/journey/journeyStore";
import { useMode } from "../../lib/a11y/modeStore";
import { usePresence } from "../../lib/presence/presenceStore";
import { startSoundscape, stopSoundscape } from "../../lib/audio/soundscape";

/**
 * The instrument panel (Direction §3, Chamber 0): the only persistent
 * interface. Materializes on first presence; carries the wordmark, the
 * journey thread, the chamber index, the Still toggle and the one action.
 * There is no menu — the journey is the menu.
 */
export function InstrumentPanel() {
  const [visible, setVisible] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const still = useMode((s) => s.stillPreferred);
  const setStill = useMode((s) => s.setStill);

  const toggleSound = () => {
    if (sound) {
      stopSoundscape();
      setSound(false);
    } else if (startSoundscape()) {
      setSound(true);
    }
  };

  useEffect(() => {
    // materializes on first cursor presence; a timer covers touch visitors
    const un = usePresence.subscribe((s) => {
      if (s.pointerActive) setVisible(true);
    });
    const t = window.setTimeout(() => setVisible(true), 3600);
    return () => {
      un();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {indexOpen && <ChamberIndex onNavigate={() => setIndexOpen(false)} />}
      </AnimatePresence>
      <motion.nav
        className="lx-panel"
        aria-label="Instrument panel"
        initial={{ opacity: 0, y: 24, x: "-50%" }}
        animate={visible ? { opacity: 1, y: 0, x: "-50%" } : { opacity: 0, y: 24, x: "-50%" }}
        transition={SPRING.soft}
      >
        <a
          href="#chamber-threshold"
          className="lx-panel-word"
          aria-label="Omni Target — to the threshold"
        >
          OMNI TARGET
        </a>
        <JourneyThread />
        <button
          type="button"
          aria-expanded={indexOpen}
          aria-controls="lumen-chamber-index"
          onClick={() => setIndexOpen((v) => !v)}
        >
          Index
        </button>
        <button
          type="button"
          aria-pressed={sound}
          onClick={toggleSound}
          title="Generative ambience — off by default"
        >
          Sound
        </button>
        <button
          type="button"
          aria-pressed={still}
          onClick={() => setStill(!still)}
          title="Reduced-motion edition"
        >
          Still
        </button>
        <a className="lx-cta" href={APP_URL}>
          {COPY.hero.ctaPrimary}
        </a>
      </motion.nav>
    </>
  );
}

/** hairline of light marking position along the journey — no numbers, no % */
function JourneyThread() {
  const fill = useRef<HTMLElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (fill.current) {
        fill.current.style.transform = `scaleX(${useJourney.getState().smoothedProgress})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <span className="lx-thread" aria-hidden="true">
      <i ref={fill} />
    </span>
  );
}

function ChamberIndex({ onNavigate }: { onNavigate: () => void }) {
  const current = useJourney((s) => s.chamberIndex);
  return (
    <motion.div
      id="lumen-chamber-index"
      className="lx-index"
      role="navigation"
      aria-label="Chambers"
      initial={{ opacity: 0, y: 14, x: "-50%", scale: 0.98 }}
      animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
      exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.98 }}
      transition={SPRING.quick}
    >
      {CHAMBERS.map((c) => (
        <a
          key={c.id}
          href={`#chamber-${c.id}`}
          aria-current={current === c.index}
          onClick={onNavigate}
        >
          <span>{c.title}</span>
          <span>{String(c.index).padStart(2, "0")}</span>
        </a>
      ))}
    </motion.div>
  );
}
