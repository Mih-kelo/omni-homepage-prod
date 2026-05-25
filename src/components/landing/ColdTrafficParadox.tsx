export function ColdTrafficParadox() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-background">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div className="relative mx-auto max-w-[1280px] px-6 py-28 lg:px-12 lg:py-36">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--primary-light)]">
          The cold traffic paradox
        </div>
        <h2
          className="max-w-[900px] font-serif font-black"
          style={{ fontSize: "clamp(34px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
        >
          Your bestseller is not
          <br />
          your <span className="text-[var(--primary-mid)]">gateway product.</span>
        </h2>

        <div className="relative mt-16 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-10">
          {/* Bestseller */}
          <article
            className="rounded-2xl border border-white/5 bg-[#0c0c18] p-8"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              Organic bestseller
            </div>
            <div className="mt-6 font-serif text-[28px] leading-tight text-white">
              Product A
            </div>
            <dl className="mt-8 space-y-3 font-mono text-[13px]">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <dt className="text-white/40">first_time_buyers</dt>
                <dd className="text-white/80">12%</dd>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <dt className="text-white/40">avg_order_value</dt>
                <dd className="text-white/80">$640</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/40">cold_traffic_ROAS</dt>
                <dd className="text-white/80">0.6x</dd>
              </div>
            </dl>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-3.5 w-[2px] rounded-full bg-[#e08a8a] shadow-[0_0_8px_rgba(224,138,138,0.6)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#e08a8a]">
                Retention piece
              </span>
            </div>
          </article>

          {/* VS */}
          <div className="flex items-center justify-center">
            <div className="font-serif text-[28px] italic text-white/30 md:text-[20px]">
              vs
            </div>
          </div>

          {/* Gateway */}
          <article
            className="rounded-2xl border p-8"
            style={{
              background: "rgba(109,40,217,0.08)",
              borderColor: "rgba(109,40,217,0.25)",
            }}
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--primary-light)]">
              Gateway product
            </div>
            <div className="mt-6 font-serif text-[28px] leading-tight text-white">
              Product B
            </div>
            <dl className="mt-8 space-y-3 font-mono text-[13px]">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <dt className="text-white/40">first_time_buyers</dt>
                <dd className="text-white/90">64%</dd>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <dt className="text-white/40">avg_order_value</dt>
                <dd className="text-white/90">$110</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/40">cold_traffic_ROAS</dt>
                <dd className="text-white/90">2.4x</dd>
              </div>
            </dl>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-3.5 w-[2px] rounded-full bg-[var(--primary-light)] shadow-[0_0_8px_var(--primary)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--primary-light)]">
                Acquisition engine.
              </span>
            </div>
          </article>
        </div>

        <p className="mt-12 max-w-[780px] font-serif text-[20px] italic leading-relaxed text-[var(--gold-light)]">
          The product that converts your existing audience is rarely the one that
          earns you a new one.
        </p>
      </div>
    </section>
  );
}
