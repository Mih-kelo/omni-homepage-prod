import { useState } from "react";
import { ChamberSection } from "../ui/placards/ChamberSection";
import { WallText } from "../ui/placards/WallText";
import { Reveal } from "../ui/placards/Reveal";
import { BrandMark } from "../ui/chrome/BrandMark";
import { APP_URL, COPY } from "../config/copy";
import adCreativeTee from "@/assets/ad-creative-tee.jpg";

/**
 * Chamber 4 — The Ad Plan.
 * Shows the authentic deliverables founders and growth teams receive:
 * - High-converting Meta feed ad mockup (copy, creative, headline, CTA)
 * - 3 high-converting video hook scripts ready to run
 * - Exact starting budget and campaign settings
 */
export function Composition() {
  const [activeTab, setActiveTab] = useState<"ad" | "hooks">("ad");

  return (
    <ChamberSection id="composition" justify="stretch">
      <div className="lx-bleed lx-split lx-split-top">
        <div style={{ display: "grid", gap: 24, alignContent: "center", height: "100%", maxWidth: 520 }}>
          <div>
            <Reveal>
              <span className="lx-mono">{COPY.whatYouGet.eyebrow}</span>
            </Reveal>
            <WallText
              className="lx-composition-wall"
              lines={[
                { text: COPY.whatYouGet.titleA },
                { text: COPY.whatYouGet.titleB, accent: true },
              ]}
            />
          </div>

          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span
                style={{
                  font: "500 13px/1.4 var(--lx-grotesk)",
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid var(--lx-hairline)",
                  background: "color-mix(in srgb, var(--lx-card-hi) 60%, var(--lx-bg))",
                  color: "var(--lx-ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <span>📦</span> The 1 Gateway Product Strangers Actually Buy
              </span>
              <span
                style={{
                  font: "500 13px/1.4 var(--lx-grotesk)",
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid var(--lx-hairline)",
                  background: "color-mix(in srgb, var(--lx-card-hi) 60%, var(--lx-bg))",
                  color: "var(--lx-ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <span>✍️</span> Ready-to-Run Ad Copy & Headline
              </span>
              <span
                style={{
                  font: "500 13px/1.4 var(--lx-grotesk)",
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid var(--lx-hairline)",
                  background: "color-mix(in srgb, var(--lx-card-hi) 60%, var(--lx-bg))",
                  color: "var(--lx-ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <span>🎬</span> 3 Scroll-Stopping Video Hooks
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="space-y-2">
              <a
                href={APP_URL}
                className="lx-cta-major"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  fontSize: 14,
                }}
              >
                Get Your Free Ad Plan
                <span aria-hidden="true">→</span>
              </a>
              <div className="text-[11.5px] text-slate-500 dark:text-slate-400 font-mono">
                No credit card required · Ready in 60 seconds
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ display: "grid", gap: 16, alignContent: "center", height: "100%", width: "100%", minWidth: 0 }}>
          <Reveal delay={0.2} className="w-full min-w-0 flex justify-center">
            {/* The Deliverable Container */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#12131d] text-slate-900 dark:text-slate-100 p-3.5 sm:p-6 shadow-2xl text-left font-sans w-full max-w-lg mx-auto space-y-4 min-w-0">
              {/* Header with Switcher */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <BrandMark size={22} className="rounded-md shrink-0" />
                  <span className="font-extrabold text-[13px] sm:text-[15px] text-slate-900 dark:text-white tracking-tight truncate">
                    Your Meta Ad Brief
                  </span>
                </div>

                {/* Clean 2-tab view switch */}
                <div className="inline-flex p-0.5 sm:p-1 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-[10.5px] sm:text-[11px] font-medium shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab("ad")}
                    className={`px-2 sm:px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === "ad"
                        ? "bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-xs font-semibold"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    📱 Feed Ad
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("hooks")}
                    className={`px-2 sm:px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === "hooks"
                        ? "bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-xs font-semibold"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    🎬 3 Video Hooks
                  </button>
                </div>
              </div>

              {/* TAB 1: FEED AD MOCKUP */}
              {activeTab === "ad" && (
                <div className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-[#fbfcfd] dark:bg-white/[0.02] p-3 sm:p-4 space-y-3 min-w-0">
                  {/* Meta Ad Post Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900 dark:bg-indigo-600 text-white font-bold text-[11px] sm:text-[12px] flex items-center justify-center shadow-xs shrink-0">
                        OM
                      </div>
                      <div>
                        <div className="font-bold text-[12.5px] sm:text-[13px] text-slate-900 dark:text-white leading-snug">
                          {COPY.whatYouGet.adPreview.brand}
                        </div>
                        <div className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-sans">
                          Sponsored · <span>🌐</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-slate-400 font-bold text-sm tracking-widest select-none">···</span>
                  </div>

                  {/* Primary Ad Copy Hook */}
                  <p className="text-[12px] sm:text-[13px] leading-relaxed text-slate-800 dark:text-slate-200">
                    {COPY.whatYouGet.adPreview.primaryText}
                  </p>

                  {/* Creative Product Image: full square aspect ratio with object-top framing */}
                  <div className="rounded-lg overflow-hidden border border-slate-200/60 dark:border-white/10 bg-slate-100 dark:bg-black/30 relative w-full aspect-square max-h-[340px]">
                    <img
                      src={adCreativeTee}
                      alt="Gateway Product - Everyday Cotton Tee"
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-white font-mono text-[9px] uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
                      <span>📦</span> #1 Gateway Product
                    </div>
                  </div>

                  {/* Link Destination Bar */}
                  <div className="flex items-center justify-between gap-2 p-2 sm:p-2.5 rounded-lg bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-xs min-w-0 w-full">
                    <div className="min-w-0 flex-1 pr-1">
                      <div className="text-[8.5px] sm:text-[9px] font-mono text-slate-400 uppercase tracking-wider truncate">
                        {COPY.whatYouGet.adPreview.handle}
                      </div>
                      <div className="text-[11.5px] sm:text-[12.5px] font-bold text-slate-900 dark:text-white truncate">
                        {COPY.whatYouGet.adPreview.headline}
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                        {COPY.whatYouGet.adPreview.linkDescription}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 px-2.5 sm:px-3 py-1.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10.5px] sm:text-[11px] font-bold shadow-xs select-none"
                    >
                      {COPY.whatYouGet.adPreview.cta}
                    </button>
                  </div>

                  {/* Engagement Bar */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span>👍❤️</span> 2.4k Likes
                    </span>
                    <span>184 Comments · 92 Shares</span>
                  </div>
                </div>
              )}

              {/* TAB 2: 3 VIDEO HOOKS */}
              {activeTab === "hooks" && (
                <div className="space-y-2.5 min-w-0">
                  <div className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
                    3 High-Converting Video Angles
                  </div>
                  {COPY.whatYouGet.hooks.map((h) => (
                    <div
                      key={h.num}
                      className="p-3 rounded-xl border border-slate-200/80 dark:border-white/10 bg-[#fbfcfd] dark:bg-white/[0.02] space-y-2 min-w-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono text-[9px] sm:text-[9.5px] font-bold uppercase">
                          Angle {h.num} · {h.label}
                        </span>
                        <span className="text-[9px] sm:text-[9.5px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          Ready to film
                        </span>
                      </div>

                      <div className="text-[11.5px] sm:text-[12px] rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 p-2 text-amber-900 dark:text-amber-200 font-semibold">
                        "{h.hook}"
                      </div>

                      <div className="text-[10.5px] sm:text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">📹 What to film:</strong> {h.cue}
                        </div>
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">🗣️ What to say:</strong> "{h.script}"
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Founder-Friendly Launch Strip */}
              <div className="rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 p-2 sm:p-2.5 text-[10.5px] sm:text-[11px] grid grid-cols-3 gap-1.5 sm:gap-2 text-center min-w-0">
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[8.5px] font-mono uppercase text-slate-400 block truncate">Daily Budget</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-[10px] sm:text-[11px] truncate">Calculated for You</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[8.5px] font-mono uppercase text-slate-400 block truncate">Audience</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-[10px] sm:text-[11px] truncate">New Customers</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] sm:text-[8.5px] font-mono uppercase text-slate-400 block truncate">Speed</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-[10px] sm:text-[11px] truncate">Ready in 60s</span>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </ChamberSection>
  );
}
