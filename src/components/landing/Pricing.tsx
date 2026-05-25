const plans = [
  {
    name: "Single Brief",
    price: "$19",
    period: "",
    desc: "Pay as you go · zero commitment. Full intelligence brief for one product.",
    cta: "Generate Brief",
    featured: false,
  },
  {
    name: "Starter Bundle",
    price: "$49",
    period: "",
    desc: "3 briefs · saves $8. Test multiple products or hooks without a subscription.",
    cta: "Get Starter Bundle",
    featured: true,
  },
  {
    name: "Growth Bundle",
    price: "$99",
    period: "",
    desc: "7 briefs · saves $34. For brands running multiple tests and scaling.",
    cta: "Get Growth Bundle",
    featured: false,
  },
  {
    name: "Scale Subscription",
    price: "$79",
    period: "/ month",
    desc: "Unlimited briefs · unlocks after 1st use. Full access for high-volume stores.",
    cta: "Subscribe Now",
    featured: false,
    dashed: true,
  },
];

export function Pricing() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-background">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1280px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="mb-16 max-w-[700px]">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--primary-light)]">
            Business Model
          </div>
          <h2
            className="font-serif font-black"
            style={{ fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
          >
            Credit-first acquisition.
            <br />
            <span className="text-[var(--primary-mid)]">Earned subscriptions.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl p-8 transition-transform ${
                p.featured
                  ? "lg:-translate-y-2 border"
                  : p.dashed ? "border border-dashed opacity-85" : "border"
              }`}
              style={{
                borderColor: p.featured ? "var(--primary)" : "var(--border)",
                background: p.featured ? "rgba(109,40,217,0.06)" : p.dashed ? "rgba(109,40,217,0.03)" : "transparent",
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

        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-5 py-2.5 text-[13px] text-white/60">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-light)]">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>
              Need more? Add extra briefs to any plan for <strong className="font-medium text-white">$9 / credit</strong>.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

