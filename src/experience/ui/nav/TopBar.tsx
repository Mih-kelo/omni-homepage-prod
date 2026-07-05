import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SPRING } from "../../config/motion";
import { APP_URL, COPY } from "../../config/copy";
import { useJourney } from "../../lib/journey/journeyStore";
import "./nav.css";

/**
 * The top bar — the instrument panel's twin at the top of the viewport.
 * Fixed, centered, same width and glass as the bottom bar so the two read
 * as one system. Carries the wordmark, a section index, and the one action.
 * Visible from mount (unlike the panel, it does not wait for presence).
 */

/** the eight chambers, labelled with verbatim COPY eyebrows where they exist */
const SECTIONS: ReadonlyArray<{ id: string; label: string }> = [
  { id: "threshold", label: "Overview" },
  { id: "listening", label: COPY.howItWorks.eyebrow },
  { id: "paradox", label: COPY.paradox.eyebrow },
  { id: "core", label: "The Core" },
  { id: "composition", label: COPY.whatYouGet.eyebrow },
  { id: "range", label: COPY.whoItsFor.eyebrow },
  { id: "observatory", label: "The Observatory" },
  { id: "invitation", label: COPY.pricing.eyebrow },
];

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function TopBar() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  // dismiss on pointer-down outside the bar + popover
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // focus moves into the index when it unfolds
  useEffect(() => {
    if (open) indexRef.current?.querySelector("a")?.focus();
  }, [open]);

  // phones: two fixed bars would sandwich the viewport — the bar retires
  // while scrolling down and returns on any scroll up (never mid-index)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    let lastY = window.scrollY;
    let hidden = false;
    const setHidden = (v: boolean) => {
      hidden = v;
      const el = rootRef.current;
      if (!el) return;
      if (v) el.setAttribute("data-hidden", "");
      else el.removeAttribute("data-hidden");
    };
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (!mq.matches || open) {
        if (hidden) setHidden(false);
        return;
      }
      if (!hidden && dy > 3 && y > 180) setHidden(true);
      else if (hidden && (dy < -3 || y <= 180)) setHidden(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      setHidden(false);
    };
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.stopPropagation();
      close(true);
    }
  };

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    close(true);
    document.getElementById(`chamber-${id}`)?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  const toTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <motion.div
      ref={rootRef}
      className="lx-topbar-root"
      initial={{ opacity: 0, y: -18, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ ...SPRING.soft, delay: 0.3 }}
      onKeyDown={onKeyDown}
    >
      <nav className="lx-topbar" aria-label="Primary">
        <a
          href="#chamber-threshold"
          className="lx-topbar-word"
          aria-label="Omni Target — back to the top"
          onClick={toTop}
        >
          OMNI TARGET
        </a>
        <div className="lx-topbar-actions">
          <button
            ref={triggerRef}
            type="button"
            className="lx-topbar-trigger"
            aria-expanded={open}
            aria-controls="lumen-section-index"
            aria-haspopup="true"
            onClick={() => setOpen((v) => !v)}
          >
            Index
            <span className="lx-topbar-caret" aria-hidden="true" />
          </button>
          <a className="lx-cta" href={APP_URL}>
            {COPY.hero.ctaPrimary}
          </a>
        </div>
      </nav>
      <AnimatePresence>{open && <SectionIndex ref={indexRef} onGo={goTo} />}</AnimatePresence>
    </motion.div>
  );
}

function SectionIndex({
  ref,
  onGo,
}: {
  ref: React.Ref<HTMLDivElement>;
  onGo: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const current = useJourney((s) => s.chamberIndex);
  return (
    <motion.div
      ref={ref}
      id="lumen-section-index"
      className="lx-topbar-index"
      role="navigation"
      aria-label="Sections"
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={SPRING.quick}
    >
      {SECTIONS.map((s, i) => (
        <a
          key={s.id}
          href={`#chamber-${s.id}`}
          aria-current={current === i || undefined}
          onClick={(e) => onGo(e, s.id)}
        >
          <span>{s.label}</span>
          <span>{String(i + 1).padStart(2, "0")}</span>
        </a>
      ))}
    </motion.div>
  );
}
