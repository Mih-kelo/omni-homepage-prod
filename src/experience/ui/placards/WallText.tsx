import { motion } from "framer-motion";
import { MASKLINE } from "../../config/motion";

export interface WallLine {
  text: string;
  accent?: boolean;
}

/**
 * Wall text — the narrator's voice. Lines enter as staggered mask-lifts
 * timed to arrival (Direction §7, Framer's placard choreography), and
 * settle; they never bounce.
 */
export function WallText({
  lines,
  small = false,
  as: Tag = "h2",
}: {
  lines: WallLine[];
  small?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag className={small ? "lx-wall lx-wall-sm" : "lx-wall"}>
      {lines.map((line, i) => (
        <span className="lx-maskline" key={i}>
          <motion.span
            initial={MASKLINE.hidden}
            whileInView={MASKLINE.shown}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: MASKLINE.duration,
              ease: MASKLINE.ease,
              delay: i * MASKLINE.stagger,
            }}
            style={line.accent ? { color: "var(--lx-accent)" } : undefined}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
