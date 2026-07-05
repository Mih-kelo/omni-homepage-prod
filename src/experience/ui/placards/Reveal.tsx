import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import type { ReactNode } from "react";
import { MASKLINE } from "../../config/motion";
import { useMode } from "../../lib/a11y/modeStore";
import { chamberOf, registerWriting } from "../../lib/journey/writing";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Placard-level entrance: a soft rise with the shared ease vocabulary —
 * never a bare fade. In the cinematic edition the rise is conducted by the
 * thread: a block enters once it is in view AND the section's writing has
 * passed halfway, so cards, plates and rows arrive with the words the pen
 * is putting down. Blocks rise once; only the headlines un-write.
 */
export function Reveal(props: RevealProps) {
  const mode = useMode((s) => s.mode);
  return mode === "cinematic" ? <ConductedReveal {...props} /> : <ViewReveal {...props} />;
}

function ConductedReveal({ children, delay = 0, y = 26, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [threadNear, setThreadNear] = useState(false);

  useEffect(() => {
    let fired = false;
    const un = registerWriting(chamberOf(ref.current), (w) => {
      if (!fired && w >= 0.5) {
        fired = true;
        setThreadNear(true);
        un();
      }
    });
    return un;
  }, []);

  // safety: once visible, never wait on a stalled thread for long —
  // content must not park hidden (deep links, measurement failures)
  useEffect(() => {
    if (!inView || threadNear) return;
    const t = window.setTimeout(() => setThreadNear(true), 1600);
    return () => window.clearTimeout(t);
  }, [inView, threadNear]);

  useEffect(() => {
    if (inView && threadNear) {
      void controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: MASKLINE.duration, ease: MASKLINE.ease, delay },
      });
    }
  }, [inView, threadNear, controls, delay]);

  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y }} animate={controls}>
      {children}
    </motion.div>
  );
}

/** boot/SSR and still-preference path — the original in-view rise */
function ViewReveal({ children, delay = 0, y = 26, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: MASKLINE.duration, ease: MASKLINE.ease, delay }}
    >
      {children}
    </motion.div>
  );
}
