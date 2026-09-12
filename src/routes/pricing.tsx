import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlateDrawer } from "../experience/ui/pricing/PlateDrawer";
import { Colophon } from "../experience/ui/chrome/Colophon";
import { Logo } from "../components/landing/Logo";
import { APP_URL, SHOPIFY_APP_URL } from "../experience/config/copy";
import { WallText } from "../experience/ui/placards/WallText";
import { Reveal } from "../experience/ui/placards/Reveal";
import { ShopifyIcon } from "../components/landing/ShopifyIcon";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

const COMPARISON_ROWS = [
  {
    feature: "Ad Briefs Included",
    free: "1 Brief",
    starter: "3 Briefs",
    growth: "10 Briefs",
    scale: "30 Briefs",
  },
  {
    feature: "Gateway SKU Identification",
    free: "✓",
    starter: "✓",
    growth: "✓",
    scale: "✓",
  },
  {
    feature: "Stranger Cohort Isolation (72%+)",
    free: "✓",
    starter: "✓",
    growth: "✓",
    scale: "✓",
  },
  {
    feature: "Ready-to-Film Video Hooks",
    free: "3 Hooks",
    starter: "3 per SKU",
    growth: "3 per SKU",
    scale: "3 per SKU",
  },
  {
    feature: "Ready-to-Run Primary Ad Copy",
    free: "✓",
    starter: "✓",
    growth: "✓",
    scale: "✓",
  },
  {
    feature: "Calibrated Meta Daily Budget",
    free: "✓",
    starter: "✓",
    growth: "✓",
    scale: "✓",
  },
  {
    feature: "Inventory & Margin Guardrails",
    free: "✓",
    starter: "✓",
    growth: "✓",
    scale: "✓",
  },
  {
    feature: "Credit Validity Period",
    free: "Lifetime",
    starter: "12 Months",
    growth: "12 Months",
    scale: "12 Months",
  },
  {
    feature: "Shopify Billing Protection",
    free: "Zero Card Needed",
    starter: "Native Shopify API",
    growth: "Native Shopify API",
    scale: "Native Shopify API",
  },
];

const PRICING_FAQS = [
  {
    q: "How does billing work?",
    a: "All purchases are processed natively through Shopify's secure Billing API. Charges appear directly on your normal Shopify invoice. We never ask for, see, or store your credit card or payment details.",
  },
  {
    q: "Do purchased credits expire?",
    a: "Every paid credit pack remains valid for a full 12 months from the date of purchase. You can use them whenever you drop a new collection, add inventory, or need fresh ad angles.",
  },
  {
    q: "Are there any long-term contracts or lock-ins?",
    a: "None. Omni Target operates on flexible credit packs. Buy briefs as you need them—each pack delivers complete pre-spend ad intelligence with full flexibility and zero forced commitments.",
  },
  {
    q: "What if my store has fewer than 50 orders?",
    a: "To provide statistically reliable recommendations, our algorithm requires a minimum sample of 50 orders. If your store has fewer, the app will flag a Low Confidence notice and recommend accumulating more organic volume before launching paid ad spend.",
  },
  {
    q: "Can I buy more credits anytime?",
    a: "Yes. Once you install the app, you can top up with a 3, 10, or 30-brief pack anytime directly inside your merchant dashboard with a single click.",
  },
  {
    q: "Does Omni Target modify my Shopify theme or code?",
    a: "Never. Omni Target uses strictly read-only API permissions (`read_orders`, `read_products`). We do not inject scripts, edit theme files, or modify inventory.",
  },
];

function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="lumen min-h-screen selection:bg-primary/30 selection:text-primary-foreground">
      {/* Top Header */}
      <header
        className="fixed left-0 right-0 top-0 z-50 px-4 py-3.5 sm:px-6 lg:px-12 backdrop-blur-md flex items-center justify-between"
        style={{
          backgroundColor: "color-mix(in srgb, var(--lx-bg) 85%, transparent)",
          borderBottom: "1px solid var(--lx-hairline)",
        }}
      >
        <Link to="/" className="flex items-center gap-2">
          <Logo
            size={28}
            wordmarkClassName="font-serif text-lg sm:text-xl font-bold tracking-tight text-[var(--lx-ink)]"
          />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-xs sm:text-sm font-medium transition-colors"
            style={{ color: "var(--lx-ink-soft)" }}
          >
            ← Back to Homepage
          </Link>
          <a
            href={APP_URL}
            className="lx-cta text-xs sm:text-sm py-1.5 px-3.5"
          >
            Scan Free
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative mx-auto max-w-6xl px-4 pt-28 sm:pt-36 pb-20 sm:pb-32 space-y-16 sm:space-y-24">
        <div className="lx-spotlight" style={{ opacity: 0.55 }} />

        {/* Hero Section — Styled matching homepage Chamber 0 / Chamber 7 */}
        <section className="text-center space-y-5 max-w-5xl mx-auto flex flex-col items-center">
          <Reveal forceView>
            <span className="lx-badge">Transparent Pre-Spend Pricing</span>
          </Reveal>

          <WallText
            as="h1"
            className="lx-hero-wall"
            forceMask
            style={{ maxWidth: 1100 }}
            lines={[
              { text: "Get your first brief free." },
              { text: "Upgrade when you're ready.", accent: true },
            ]}
          />

          <Reveal forceView delay={0.12}>
            <p className="lx-lede mx-auto" style={{ maxWidth: "52ch", marginInline: "auto" }}>
              Simple, transparent credit packs. Buy launch-ready ad briefs on demand with complete flexibility. Billed safely through your official Shopify store invoice.
            </p>
          </Reveal>

          {/* Official Shopify Trust Pill */}
          <Reveal forceView delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 text-xs pt-2">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full shadow-xs"
                style={{
                  background: "color-mix(in srgb, var(--lx-ink) 4%, transparent)",
                  border: "1px solid var(--lx-hairline)",
                  color: "var(--lx-ink-soft)",
                }}
              >
                <ShopifyIcon size={15} style={{ color: "#95BF47" }} className="shrink-0" />
                <span className="font-semibold" style={{ color: "var(--lx-ink)" }}>
                  Official Shopify App
                </span>
                <span className="opacity-30">·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  1 Free Brief on Install
                </span>
              </div>
              <a
                href={SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] hover:underline font-medium inline-flex items-center gap-1"
                style={{ color: "var(--lx-accent)" }}
              >
                Install on App Store
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
        </section>

        {/* Interactive Pricing Drawer */}
        <section className="w-full">
          <PlateDrawer />
        </section>

        {/* Official Shopify Partner Guarantee Callout */}
        <div
          className="rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xs"
          style={{
            border: "1px solid color-mix(in srgb, #10b981 30%, var(--lx-hairline))",
            background: "color-mix(in srgb, #10b981 6%, var(--lx-bg))",
          }}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-emerald-900 dark:text-emerald-300">
              <span aria-hidden="true">🛡️</span> Official Shopify App Partner Guarantee
            </div>
            <p
              className="text-xs sm:text-[13px] m-0"
              style={{ color: "var(--lx-ink-soft)" }}
            >
              1-click install with strictly read-only API access (<code className="font-mono text-[11px] px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">read_orders</code>, <code className="font-mono text-[11px] px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">read_products</code>). All purchases backed by Shopify's native Billing API security.
            </p>
          </div>
          <a
            href={SHOPIFY_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-semibold transition-all inline-flex items-center gap-1.5 shadow-xs"
          >
            Shopify App Store ↗
          </a>
        </div>

        {/* Feature Comparison Matrix */}
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto flex flex-col items-center">
            <Reveal forceView>
              <span className="lx-mono lx-mono-accent">Full Comparison</span>
            </Reveal>
            <WallText
              as="h2"
              className="lx-wall-sm"
              forceMask
              style={{ maxWidth: "min(100%, 36ch)" }}
              lines={[
                { text: "Compare credit packs." },
                { text: "All features, side by side.", accent: true },
              ]}
            />
            <Reveal forceView delay={0.12}>
              <p className="lx-lede mx-auto" style={{ maxWidth: "52ch", marginInline: "auto" }}>
                Every pack includes the complete pre-spend intelligence engine, stranger cohort isolation, and native Shopify billing protection.
              </p>
            </Reveal>
          </div>

          <div
            className="overflow-x-auto rounded-2xl shadow-xs"
            style={{
              border: "1px solid var(--lx-hairline)",
              background: "color-mix(in srgb, var(--lx-bg) 95%, transparent)",
            }}
          >
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--lx-hairline)",
                    background: "color-mix(in srgb, var(--lx-ink) 3%, transparent)",
                  }}
                >
                  <th
                    className="p-3.5 sm:p-4 font-semibold"
                    style={{ color: "var(--lx-ink)", fontFamily: "var(--lx-grotesk)" }}
                  >
                    Feature & Scope
                  </th>
                  <th
                    className="p-3.5 sm:p-4 font-medium text-center"
                    style={{ color: "var(--lx-ink-soft)", fontFamily: "var(--lx-mono)", fontSize: 12 }}
                  >
                    Free
                  </th>
                  <th
                    className="p-3.5 sm:p-4 font-medium text-center"
                    style={{ color: "var(--lx-ink-soft)", fontFamily: "var(--lx-mono)", fontSize: 12 }}
                  >
                    Starter ($9)
                  </th>
                  <th
                    className="p-3.5 sm:p-4 font-semibold text-center"
                    style={{
                      color: "var(--lx-accent)",
                      background: "color-mix(in srgb, var(--lx-accent) 8%, transparent)",
                      fontFamily: "var(--lx-mono)",
                      fontSize: 12,
                    }}
                  >
                    Growth ($25)
                  </th>
                  <th
                    className="p-3.5 sm:p-4 font-medium text-center"
                    style={{ color: "var(--lx-ink-soft)", fontFamily: "var(--lx-mono)", fontSize: 12 }}
                  >
                    Scale ($59)
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "var(--lx-grotesk)" }}>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i < COMPARISON_ROWS.length - 1 ? "1px solid var(--lx-hairline)" : "none",
                    }}
                  >
                    <td
                      className="p-3.5 sm:p-4 font-medium"
                      style={{ color: "var(--lx-ink)" }}
                    >
                      {row.feature}
                    </td>
                    <td
                      className="p-3.5 sm:p-4 text-center"
                      style={{ color: "var(--lx-ink-soft)", fontFamily: "var(--lx-mono)" }}
                    >
                      {row.free}
                    </td>
                    <td
                      className="p-3.5 sm:p-4 text-center"
                      style={{ color: "var(--lx-ink-soft)", fontFamily: "var(--lx-mono)" }}
                    >
                      {row.starter}
                    </td>
                    <td
                      className="p-3.5 sm:p-4 text-center font-bold"
                      style={{
                        color: "var(--lx-accent)",
                        background: "color-mix(in srgb, var(--lx-accent) 4%, transparent)",
                        fontFamily: "var(--lx-mono)",
                      }}
                    >
                      {row.growth}
                    </td>
                    <td
                      className="p-3.5 sm:p-4 text-center"
                      style={{ color: "var(--lx-ink-soft)", fontFamily: "var(--lx-mono)" }}
                    >
                      {row.scale}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing & Billing FAQs */}
        <section className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-3 flex flex-col items-center">
            <Reveal forceView>
              <span className="lx-mono lx-mono-accent">Common Inquiries</span>
            </Reveal>
            <WallText
              as="h2"
              className="lx-wall-sm"
              forceMask
              style={{ maxWidth: "min(100%, 36ch)" }}
              lines={[
                { text: "Frequently asked questions." },
                { text: "Clear answers before you start.", accent: true },
              ]}
            />
            <Reveal forceView delay={0.12}>
              <p className="lx-lede mx-auto" style={{ maxWidth: "48ch", marginInline: "auto" }}>
                Everything you need to know about billing, credit validity, and store data safety.
              </p>
            </Reveal>
          </div>

          <div className="space-y-3">
            {PRICING_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden transition-colors"
                  style={{
                    border: "1px solid var(--lx-hairline)",
                    background: "color-mix(in srgb, var(--lx-bg) 94%, transparent)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-serif text-sm sm:text-base font-medium flex items-center justify-between gap-4 cursor-pointer"
                    style={{ color: "var(--lx-ink)" }}
                  >
                    <span>{faq.q}</span>
                    <span
                      className="font-mono text-lg shrink-0 transition-transform"
                      style={{ color: "var(--lx-ink-faint)" }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      className="px-4 pb-4 text-xs sm:text-sm leading-relaxed"
                      style={{
                        borderTop: "1px solid var(--lx-hairline)",
                        paddingTop: "12px",
                        color: "var(--lx-ink-soft)",
                        fontFamily: "var(--lx-grotesk)",
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Callout Banner — Styled matching Lumen Placard Card */}
        <section
          className="rounded-2xl p-8 sm:p-12 text-center space-y-5 shadow-xs flex flex-col items-center"
          style={{
            border: "1px solid var(--lx-hairline)",
            background: "radial-gradient(ellipse 90% 90% at 50% 50%, color-mix(in srgb, var(--lx-accent) 7%, var(--lx-bg)), var(--lx-bg))",
          }}
        >
          <Reveal forceView>
            <span className="lx-mono lx-mono-accent">Instant Launch</span>
          </Reveal>
          <WallText
            as="h2"
            className="lx-wall-sm"
            forceMask
            lines={[
              { text: "Know what converts" },
              { text: "before you spend on Meta.", accent: true },
            ]}
          />
          <Reveal forceView delay={0.12}>
            <p className="lx-lede mx-auto" style={{ maxWidth: "48ch", marginInline: "auto" }}>
              Install the free app, get your first brief in 60 seconds, and launch with calibrated data.
            </p>
          </Reveal>
          <Reveal forceView delay={0.2}>
            <div className="pt-2">
              <a className="lx-cta-major inline-flex items-center gap-2 py-3 px-6 text-sm" href={APP_URL}>
                Scan Your Store Free
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <Colophon />
    </div>
  );
}
