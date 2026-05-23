const plans = [
  {
    name: "Signal",
    price: "$29",
    period: "/ month",
    desc: "One Shopify store. A monthly brief refresh. For founders running ads themselves.",
    cta: "Start with Signal",
    featured: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/ month",
    desc: "Weekly briefs, gateway tracking, and creative angle library. For brands scaling past $50k/mo.",
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Studio",
    price: "$199",
    period: "/ month",
    desc: "Multi-store, agency seats, and white-label briefs. For media buyers managing fashion clients.",
    cta: "Talk to us",
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
            Simple pricing
          </div>
          <h2
            className="font-serif font-black"
            style={{ fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
          >
            Priced by depth,
            <br />
            <span className="text-[var(--primary-mid)]">not by seats.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl border p-8 transition-transform ${
                p.featured
                  ? "md:-translate-y-2"
                  : ""
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
              <p className="mt-6 text-[14px] leading-[1.6] text-white/55">
                {p.desc}
              </p>
              <a
                href="#open"
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
      </div>
    </section>
  );
}
