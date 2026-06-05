const tags = [
  "Fashion & lifestyle",
  "Shopify-native",
  "$5k–$100k/mo revenue",
  "DTC operators",
  "Brand-led teams",
];

export function WhoItsFor() {
  return (
    <section className="bg-[var(--paper)] text-[#08080f]">
      <div className="mx-auto max-w-[980px] px-6 py-28 text-center lg:py-36">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-black/40">
          Who it's for
        </div>
        <h2
          className="font-serif font-black"
          style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
          }}
        >
          Built for a specific kind
          <br />
          of <span className="text-[var(--primary)]">brand operator.</span>
        </h2>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {tags.map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              <span className="rounded-full border border-black/15 bg-white/40 px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-black/75">
                {t}
              </span>
              {i < tags.length - 1 && <span className="text-black/25">·</span>}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-[620px] text-[14px] leading-[1.6] text-black/50">
          Not for you if you sell B2B, run on a non-Shopify stack, or want a tool that pushes a Buy
          Now button on its own.
        </p>
      </div>
    </section>
  );
}
