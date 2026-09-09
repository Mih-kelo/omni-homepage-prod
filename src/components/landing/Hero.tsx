import { BriefTerminal } from "./BriefTerminal";
import { ShopifyIcon } from "./ShopifyIcon";
import { LogoBar } from "./LogoBar";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40">
      <div aria-hidden className="bg-radial-hero absolute inset-0 opacity-80" />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-12">
        <div>
          <span
            className="inline-block rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{
              background: "rgba(109,40,217,0.12)",
              borderColor: "rgba(109,40,217,0.35)",
              color: "var(--primary-light)",
            }}
          >
            Pre-Spend Intelligence for Shopify · Free 60s AI Audit
          </span>

          <h1
            className="mt-8 font-serif font-black text-white"
            style={{
              fontSize: "clamp(38px, 6.4vw, 76px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
            }}
          >
            Know what converts before you
            <br />
            <span className="text-[var(--primary-mid)]">spend $1 on Meta.</span>
          </h1>

          <p className="mt-7 max-w-[520px] text-[17px] leading-[1.6] text-white/[0.60]">
            Omni Target turns your real Shopify sales data into a launch-ready Meta Ads brief in 3 minutes —
            pinpointing your #1 gateway product, 3 custom video hooks, exact campaign settings, and a calibrated testing budget.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a href="https://app.omnitarget.co/login" className="cta-premium group">
              <span className="cta-premium-inner">
                <span className="cta-premium-label">Scan Your Store Free</span>
                <span aria-hidden className="cta-premium-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11M7.5 2.5L12 7l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </a>
            <a href="#how" className="text-[14px] text-white/60 transition-colors hover:text-white">
              See how it works →
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[12.5px] font-medium text-white/70">
            <ShopifyIcon size={16} style={{ color: "#95BF47" }} />
            <span>Official Shopify App · 1 Free Brief on Install</span>
            <span className="text-white/25">·</span>
            <a
              href="https://apps.shopify.com/omni-target"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary-light)] underline hover:text-white"
            >
              Install from App Store ↗
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <BriefTerminal />
        </div>
      </div>
      <LogoBar className="mt-12 px-6 max-w-[1280px] mx-auto" />
    </section>
  );
}
