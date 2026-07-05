import { ChamberSection } from "../ui/placards/ChamberSection";
import { WallText } from "../ui/placards/WallText";
import { Reveal } from "../ui/placards/Reveal";
import { COPY } from "../config/copy";

/**
 * Chamber 1 — the Listening. Wonder. The store connects: one thread,
 * read-only; the intelligence engine reads it; the brief is returned.
 * All three steps (01–03), verbatim — "from store to brief in three steps."
 */
export function Listening() {
  return (
    <ChamberSection id="listening" justify="stretch">
      <div className="lx-bleed lx-split">
        <div style={{ display: "grid", gap: 24 }}>
          <Reveal>
            <span className="lx-mono">{COPY.howItWorks.eyebrow}</span>
          </Reveal>
          <WallText
            lines={[
              { text: COPY.howItWorks.titleA },
              { text: COPY.howItWorks.titleB, accent: true },
            ]}
          />
        </div>
        <div style={{ display: "grid", gap: 24, maxWidth: 540 }}>
          {COPY.howItWorks.steps.map((s, i) => (
            <Reveal key={s.n} delay={0.15 + i * 0.12}>
              <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 20 }}>
                <span className="lx-numeral" style={{ fontSize: 52, color: "var(--lx-accent)" }}>
                  {s.n}
                </span>
                <div>
                  <h3 style={{ font: "600 18px/1.3 var(--lx-grotesk)", margin: "0 0 8px" }}>
                    {s.t}
                  </h3>
                  <p className="lx-lede" style={{ fontSize: 15 }}>
                    {s.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </ChamberSection>
  );
}
