import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { MASKLINE } from "../../config/motion";

/**
 * Placard-level entrance: a soft rise with the shared ease vocabulary —
 * never a bare fade. Used for lede text, cards, plates and rows so every
 * placard arrives the same way the type does.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
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
