const items = [
  "Audiences that match your actual buyer profile",
  "Creative angles ranked by likelihood to convert",
  "Gateway product identified from your real store data",
  "Behavior-derived hooks — no reviews needed",
  "Budget split calibrated to your store's order volume",
];

export function WhatYouGet() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 py-28 lg:grid-cols-[0.85fr_1fr] lg:px-12 lg:py-36">
        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--primary-light)]">
            What you get
          </div>
          <h2
            className="font-serif font-black"
            style={{
              fontSize: "clamp(34px, 4.4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
            }}
          >
            A complete brief.
            <br />
            <span className="text-[var(--primary-mid)]">Nothing missing.</span>
          </h2>
          <p className="mt-6 max-w-[380px] text-[16px] leading-[1.6] text-white/[0.48]">
            Everything a media buyer needs on day one — derived from your store, not from a
            template.
          </p>
        </div>

        <ul className="divide-y divide-white/5 border-y border-white/5">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-5 py-5">
              <span
                aria-hidden
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: "rgba(109,40,217,0.15)",
                  border: "1px solid rgba(109,40,217,0.4)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6.5L4.8 9L10 3.5"
                    stroke="var(--primary-light)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[17px] leading-[1.55] text-white/90">{it}</span>
              <span className="ml-auto hidden font-mono text-[11px] text-white/25 md:inline">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
