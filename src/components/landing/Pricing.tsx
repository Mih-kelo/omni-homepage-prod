const plans = [
  {
    name: "Free Plan",
    price: "Free",
    period: "",
    desc: "",
    features: [
      "1 free ad brief on install",
      "Find your top-converting product",
      "3 ready-to-use ad angles & hooks",
      "Step-by-step Meta setup guide",
    ],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Starter Pack",
    price: "$9",
    period: "one-time charge",
    desc: "",
    features: [
      "3 full ad briefs",
      "Test your top 3 products",
      "3 custom video hooks per item",
      "Credits valid for 12 months",
    ],
    cta: "Get Starter",
    featured: false,
  },
  {
    name: "Growth Pack",
    price: "$25",
    period: "one-time charge",
    desc: "",
    features: [
      "10 full ad briefs",
      "Save 17% on credits",
      "Perfect for new collection drops",
      "Everything in Starter Pack",
    ],
    cta: "Get Growth Pack",
    featured: true,
  },
  {
    name: "Scale Pack",
    price: "$59",
    period: "one-time charge",
    desc: "",
    features: [
      "30 full ad briefs",
      "Save 34% on credits (Best value)",
      "Cover your entire store catalog",
      "Everything in Growth Pack",
    ],
    cta: "Get Scale Pack",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-background">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-12 lg:py-36">
        <div className="mb-16 max-w-175">
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
            <span className="text-primary-mid">Launch-ready ad briefs on demand.</span>
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
                  <span className="rounded-md border border-(--primary)/40 bg-(--primary)/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-light">
                    Recommended
                  </span>
                )}
              </div>
              <div className="mt-8 flex items-baseline gap-2">
                <span
                  className="font-serif font-black text-primary-mid"
                  style={{ fontSize: 56, lineHeight: 1 }}
                >
                  {p.price}
                </span>
                <span className="font-mono text-[12px] text-white/40">{p.period}</span>
              </div>
              {p.desc ? (
                <p className="mt-6 text-[14px] leading-[1.6] text-white/55">{p.desc}</p>
              ) : null}
              {p.features && p.features.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-[14px] font-semibold text-white">Features</h4>
                  <ul className="mt-3 space-y-3">
                    {p.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] text-white/70">
                        <svg
                          className="mt-0.5 shrink-0 text-primary"
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
                </div>
              )}
              <a
                href="https://app.omnitarget.co/signup"
                className={`mt-10 inline-flex items-center justify-center rounded-lg px-5 py-3 text-[15px] font-medium transition-colors ${
                  p.featured
                    ? "bg-primary text-white hover:bg-[#7c33ee]"
                    : "border border-white/15 text-white hover:bg-white/5"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/2 px-5 py-2.5 text-[13px] text-white/60">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-light"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>All charges are billed in USD.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
