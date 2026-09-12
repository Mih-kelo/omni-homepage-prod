import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SPRING } from "../../config/motion";
import { APP_URL, COPY } from "../../config/copy";
import { useJourney } from "../../lib/journey/journeyStore";
import { BrandMark } from "../chrome/BrandMark";
import "./nav.css";

/**
 * The top bar — the instrument panel's twin at the top of the viewport.
 * Fixed, centered, same width and glass as the bottom bar so the two read
 * as one system. Carries the wordmark, a section index, and the one action.
 * Visible from mount (unlike the panel, it does not wait for presence).
 */

/** the chambers, labelled with verbatim COPY eyebrows and human-readable URL hashes */
export const SECTIONS: ReadonlyArray<{ id: string; label: string; hash: string }> = [
  { id: "threshold", label: "Overview", hash: "overview" },
  { id: "paradox", label: COPY.paradox.eyebrow, hash: "problem" },
  { id: "listening", label: COPY.howItWorks.eyebrow, hash: "how-it-works" },
  { id: "composition", label: COPY.whatYouGet.eyebrow, hash: "sample-brief" },
  { id: "observatory", label: COPY.whoItsFor.eyebrow, hash: "proof" },
  { id: "invitation", label: COPY.pricing.eyebrow, hash: "pricing" },
];

export function resolveTargetElement(hashOrId: string): HTMLElement | null {
  if (!hashOrId) return null;
  const clean = hashOrId.replace(/^#/, "").replace(/^chamber-/, "").toLowerCase();

  const map: Record<string, string> = {
    pricing: "chamber-invitation",
    invitation: "chamber-invitation",
    "how-it-works": "chamber-listening",
    how: "chamber-listening",
    listening: "chamber-listening",
    composition: "chamber-composition",
    "what-you-get": "chamber-composition",
    "sample-brief": "chamber-composition",
    brief: "chamber-composition",
    observatory: "chamber-observatory",
    proof: "chamber-observatory",
    "who-its-for": "chamber-observatory",
    paradox: "chamber-paradox",
    problem: "chamber-paradox",
    overview: "chamber-threshold",
    threshold: "chamber-threshold",
  };

  const targetId = map[clean] || `chamber-${clean}`;
  return document.getElementById(targetId) || document.getElementById(clean);
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollToSection(hashOrId: string, smooth = true): boolean {
  if (typeof window === "undefined") return false;
  if (!hashOrId || hashOrId === "#" || hashOrId === "#overview" || hashOrId === "overview") {
    window.scrollTo({ top: 0, behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto" });
    return true;
  }
  const el = resolveTargetElement(hashOrId);
  if (el) {
    el.scrollIntoView({
      behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto",
      block: "start",
    });
    return true;
  }
  return false;
}

export function TopBar() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const isNavigatingRef = useRef(false);

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

  // Deep link support on initial page load / refresh
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawHash = window.location.hash;
    if (!rawHash || rawHash === "#" || rawHash === "#overview") return;

    // Retry at staggered intervals so fonts, GSAP, and layout have settled
    const t1 = setTimeout(() => scrollToSection(rawHash, false), 80);
    const t2 = setTimeout(() => scrollToSection(rawHash, true), 350);
    const t3 = setTimeout(() => scrollToSection(rawHash, true), 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Browser Back / Forward buttons & direct hashchange support
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onPop = () => {
      if (isNavigatingRef.current) return;
      const hash = window.location.hash;
      if (!hash || hash === "#" || hash === "#overview") {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      } else {
        scrollToSection(hash, true);
      }
    };

    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  // Scroll-spy: keep URL hash synchronized with currently visible section
  useEffect(() => {
    if (typeof window === "undefined") return;

    const unsub = useJourney.subscribe((state) => {
      if (isNavigatingRef.current) return;
      const idx = state.chamberIndex;
      const sec = SECTIONS[idx];
      if (!sec) return;

      const targetHash = idx === 0 ? "" : `#${sec.hash}`;
      const currentHash = window.location.hash;

      if (targetHash === "") {
        if (currentHash !== "" && currentHash !== "#") {
          window.history.replaceState(null, "", window.location.pathname);
        }
      } else if (currentHash !== targetHash) {
        // Only replace if not an alias already pointing to this section
        const currentTarget = resolveTargetElement(currentHash);
        const newTarget = resolveTargetElement(targetHash);
        if (currentTarget !== newTarget) {
          window.history.replaceState(null, "", targetHash);
        }
      }
    });

    return () => unsub();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.stopPropagation();
      close(true);
    }
  };

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, hashName: string) => {
    e.preventDefault();
    close(true);
    isNavigatingRef.current = true;
    scrollToSection(hashName, true);
    try {
      window.history.pushState(null, "", `#${hashName}`);
    } catch (_) {}
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 800);
  };

  const toTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    isNavigatingRef.current = true;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    try {
      window.history.pushState(null, "", window.location.pathname);
    } catch (_) {}
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 800);
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
          href="#overview"
          className="lx-topbar-word"
          aria-label="Omni Target — back to the top"
          onClick={toTop}
        >
          <BrandMark />
          <span>OMNI TARGET</span>
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
            <span className="hidden sm:inline">{COPY.hero.ctaPrimary}</span>
            <span className="sm:hidden">Scan Free</span>
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
  onGo: (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => void;
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
          href={`#${s.hash}`}
          aria-current={current === i || undefined}
          onClick={(e) => onGo(e, s.hash)}
        >
          <span>{s.label}</span>
          <span>{String(i + 1).padStart(2, "0")}</span>
        </a>
      ))}
    </motion.div>
  );
}
