const steps = [
  {
    n: "01",
    t: "Connect Shopify",
    d: "One-click OAuth. Read-only access to orders, products, customers, and collections.",
  },
  {
    n: "02",
    t: "Intelligence engine reads your store",
    d: "Identifies gateway products dynamically, calculates first-time buyer ratios, maps repeat purchase patterns — all relative to your store's own baseline.",
  },
  {
    n: "03",
    t: "Get your complete Meta brief",
    d: "Gateway product, audience profile, creative format prescription, behavior-derived hooks, correct optimization event, and dynamic budget — exported as a branded PDF.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-[var(--paper)] text-[#08080f]">
      <div className="mx-auto max-w-[1280px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="mb-16 flex items-end justify-between gap-8">
          <h2
            className="font-serif font-black"
            style={{ fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
          >
            From store to brief
            <br />
            <span className="text-[var(--primary)]">in three steps.</span>
          </h2>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-black/40 md:block">
            How it works
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`md:px-10 ${i > 0 ? "md:border-l md:border-black/10" : ""} ${i === 0 ? "md:pl-0" : ""}`}
            >
              <div
                className="font-serif font-black text-[var(--primary)]"
                style={{ fontSize: 76, lineHeight: 1 }}
              >
                {s.n}
              </div>
              <h3 className="mt-6 text-[20px] font-semibold">{s.t}</h3>
              <p className="mt-3 max-w-[320px] text-[15px] leading-[1.6] text-black/55">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
