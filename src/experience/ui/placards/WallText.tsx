import { Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MASKLINE } from "../../config/motion";
import { useMode } from "../../lib/a11y/modeStore";
import { chamberOf, registerWriting } from "../../lib/journey/writing";

export interface WallLine {
  text: string;
  accent?: boolean;
}

interface WallTextProps {
  lines: WallLine[];
  small?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
}

/**
 * Wall text — the narrator's voice. In the cinematic edition the thread
 * writes each headline onto the wall: characters ink in sync with the
 * story path's approach to the section's node and un-write when the pen
 * erases back (lib/journey/writing.ts). Everywhere else (boot/SSR, still
 * preference) lines keep the original staggered mask-lift, which also
 * serves reduced-motion via the CSS override on .lx-char.
 */
export function WallText(props: WallTextProps) {
  const mode = useMode((s) => s.mode);
  return mode === "cinematic" ? <WrittenWall {...props} /> : <MaskWall {...props} />;
}

/** the thread writes: per-character, scrubbed by the story path */
function WrittenWall({ lines, small = false, as: Tag = "h2" }: WallTextProps) {
  const T = Tag as "h2";
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>(".lx-char"));
    let lastN = -1;
    return registerWriting(chamberOf(root), (w) => {
      const n = Math.round(w * chars.length);
      if (n === lastN) return;
      if (n > lastN) {
        for (let i = Math.max(lastN, 0); i < n; i++) chars[i].dataset.on = "1";
      } else {
        for (let i = n; i < lastN; i++) delete chars[i].dataset.on;
      }
      lastN = n;
    });
  }, []);

  return (
    <T
      ref={rootRef}
      className={small ? "lx-wall lx-wall-sm" : "lx-wall"}
      aria-label={lines.map((l) => l.text).join(" ")}
    >
      {lines.map((line, li) => (
        <span
          key={li}
          className="lx-wline"
          aria-hidden="true"
          style={line.accent ? { color: "var(--lx-accent)" } : undefined}
        >
          {line.text.split(" ").map((word, wi, arr) => (
            <Fragment key={wi}>
              <span className="lx-word">
                {Array.from(word).map((ch, ci) => (
                  <span key={ci} className="lx-char">
                    {ch}
                  </span>
                ))}
              </span>
              {wi < arr.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ))}
    </T>
  );
}

/** staggered mask-lift — the boot/SSR and still-preference voice */
function MaskWall({ lines, small = false, as: Tag = "h2" }: WallTextProps) {
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
