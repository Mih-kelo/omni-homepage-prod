const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "1 campaign credit on install, no card required",
    features: [],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Starter Pack",
    price: "$39",
    period: "one-time",
    desc: "Perfect for testing your first collection and identifying initial winners.",
    features: [
      "5 Campaign Briefs",
      "Store Intelligence Insights",
      "Creative Angle Blueprints",
      "Valid for 12 months",
    ],
    cta: "Get Starter",
    featured: false,
  },
  {
    name: "Growth Pack",
    price: "$99",
    period: "one-time",
    desc: "For growing brands scaling multiple styles and running weekly tests.",
    features: [
      "15 Campaign Briefs",
      "Everything in Starter Pack",
      "Ideal for testing 3+ products",
      "Save 15% per brief ($6.60 / brief)",
    ],
    cta: "Get Growth Pack",
    featured: true,
  },
  {
    name: "Scale Pack",
    price: "$179",
    period: "one-time",
    desc: "High volume for massive collection drops and rapid creative testing.",
    features: [
      "30 Campaign Briefs",
      "Everything in Growth Pack",
      "Ideal for full catalog coverage",
      "Best Value ($5.96 / brief)",
    ],
    cta: "Get Scale Pack",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-background">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1280px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="mb-16 max-w-[700px]">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--primary-light)]">
            Simple Pricing
          </div>
          <h2
            className="font-serif font-black"
            style={{
              fontSize: "clamp(34px, 4.4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
            }}
          >
            Flexible credit packs.
            <br />
            <span className="text-[var(--primary-mid)]">No recurring subscriptions.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl p-8 transition-transform ${
                p.featured ? "lg:-translate-y-2 border" : "border"
              }`}
              style={{
                borderColor: p.featured ? "var(--primary)" : "var(--border)",
                background: p.featured ? "rgba(109,40,217,0.06)" : "transparent",
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-medium text-white">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-md border border-[var(--primary)]/40 bg-[var(--primary)]/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--primary-light)]">
                    Recommended
                  </span>
                )}
              </div>
              <div className="mt-8 flex items-baseline gap-2">
                <span
                  className="font-serif font-black text-[var(--primary-mid)]"
                  style={{ fontSize: 56, lineHeight: 1 }}
                >
                  {p.price}
                </span>
                <span className="font-mono text-[12px] text-white/40">{p.period}</span>
              </div>
              <p className="mt-6 text-[14px] leading-[1.6] text-white/55">{p.desc}</p>
              {p.features && p.features.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {p.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-white/70">
                      <svg
                        className="mt-0.5 shrink-0 text-[var(--primary)]"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              <a
                href="https://app.omnitarget.co/"
                className={`mt-10 inline-flex items-center justify-center rounded-lg px-5 py-3 text-[15px] font-medium transition-colors ${
                  p.featured
                    ? "bg-[var(--primary)] text-white hover:bg-[#7c33ee]"
                    : "border border-white/15 text-white hover:bg-white/5"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-5 py-2.5 text-[13px] text-white/60">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--primary-light)]"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>
              All charges are billed safely in USD via the official Shopify Billing API. Credits are subject to a 12-month dormancy policy.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
