import { BriefTerminal } from "./BriefTerminal";
import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden border-b border-border">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-100" />
      <div aria-hidden className="hero-glow" />

      <nav className="relative z-10 mx-auto flex max-w-[1280px] items-center justify-between px-6 py-6 lg:px-12">
        <Logo size={30} />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
          v1.0 · private beta
        </span>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 pb-24 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-12 lg:pt-20">
        <div className="rise-in">
          <span
            className="inline-block rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{
              background: "rgba(109,40,217,0.12)",
              borderColor: "rgba(109,40,217,0.35)",
              color: "var(--primary-light)",
            }}
          >
            Shopify store intelligence
          </span>

          <h1
            className="mt-8 font-serif font-black text-white"
            style={{
              fontSize: "clamp(42px, 7.2vw, 84px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            Know exactly what to run on Meta.
            <br />
            <span className="text-[var(--primary-mid)]">Before you spend.</span>
          </h1>

          <p className="mt-7 max-w-[480px] text-[18px] leading-[1.55] text-white/[0.48]">
            Omni Target reads your Shopify store and generates a complete,
            data-backed Meta Ads brief. Audiences, hero products, budget —
            derived from your real store data. Not guesswork.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-7">
            <a href="#open" className="cta-premium group">
              <span className="cta-premium-inner">
                <span className="cta-premium-label">Open Omni Target</span>
                <span aria-hidden className="cta-premium-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h11M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </a>
            <a
              href="#how"
              className="text-[15px] text-white/60 transition-colors hover:text-white"
            >
              See how it works →
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <BriefTerminal />
        </div>
      </div>
    </section>
  );
}
