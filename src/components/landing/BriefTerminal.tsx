const rows = [
  { k: "store", v: "maison-rive.com" },
  { k: "gateway", v: "Silk Camisole — Ivory", highlight: true },
  { k: "format", v: "UGC carousel, 4 frames" },
  { k: "hook_1", v: "\"The one piece that quietly outsells everything.\"" },
  { k: "optimize", v: "Purchases · 7d click" },
  { k: "budget", v: "$42 / day · scale at ROAS 1.8" },
];

export function BriefTerminal() {
  return (
    <div
      className="relative w-full max-w-[560px] rounded-2xl border bg-[var(--terminal-bg)] shadow-[0_30px_80px_-20px_rgba(109,40,217,0.35)]"
      style={{ borderColor: "rgba(109,40,217,0.20)" }}
    >
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[11px] tracking-wider text-white/40">
          brief.omnitarget
        </span>
        <span className="font-mono text-[11px] text-white/30">●</span>
      </div>

      <div className="space-y-1 px-5 py-6 font-mono text-[13px] leading-7">
        {rows.map((r) => (
          <div
            key={r.k}
            className={`grid grid-cols-[110px_1fr] items-start gap-3 rounded-md px-2 py-1 ${
              r.highlight ? "gold-pulse bg-[rgba(240,198,116,0.04)]" : ""
            }`}
          >
            <span
              className={
                r.highlight
                  ? "text-[var(--gold-light)]"
                  : "text-white/[0.28]"
              }
            >
              {r.k}
            </span>
            <span
              className={
                r.highlight
                  ? "text-[var(--gold-light)]"
                  : "text-white/[0.82]"
              }
            >
              <span className="text-white/30">→ </span>
              {r.v}
            </span>
          </div>
        ))}
        <div className="pt-3 text-white/30">
          <span className="text-[var(--primary-mid)]">$</span> generated in 4.2s ▍
        </div>
      </div>
    </div>
  );
}
