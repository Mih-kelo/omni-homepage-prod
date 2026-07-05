import { ChamberSection } from "../ui/placards/ChamberSection";
import { WallText } from "../ui/placards/WallText";
import { Reveal } from "../ui/placards/Reveal";
import { COPY } from "../config/copy";

/**
 * Chamber 4 — the Composition Hall. Understanding. The brief assembles
 * piece by visible piece; step 03 + "what you get" + the brief rows,
 * all verbatim. Full-width editorial split: the argument on the left,
 * the artifact on the right. Text always wins (no rings behind it).
 */
export function Composition() {
  const step = COPY.howItWorks.steps[2];
  return (
    <ChamberSection id="composition" justify="stretch">
      <div className="lx-bleed lx-split lx-split-top">
        <div style={{ display: "grid", gap: 26, alignContent: "center", height: "100%" }}>
          <div>
            <Reveal>
              <span className="lx-mono">{COPY.whatYouGet.eyebrow}</span>
            </Reveal>
            <WallText
              lines={[
                { text: COPY.whatYouGet.titleA },
                { text: COPY.whatYouGet.titleB, accent: true },
              ]}
            />
            <Reveal delay={0.2}>
              <p className="lx-lede" style={{ marginTop: 14 }}>
                {COPY.whatYouGet.body}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ul className="lx-checks">
              {COPY.whatYouGet.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div style={{ display: "grid", gap: 26, alignContent: "center", height: "100%" }}>
          <Reveal delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 18 }}>
              <span className="lx-numeral" style={{ fontSize: 48, color: "var(--lx-accent)" }}>
                {step.n}
              </span>
              <div>
                <h3 style={{ font: "600 18px/1.3 var(--lx-grotesk)", margin: "0 0 8px" }}>
                  {step.t}
                </h3>
                <p className="lx-lede" style={{ fontSize: 15 }}>
                  {step.d}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="lx-card">
              <span className="lx-mono">{COPY.brief.window}</span>
              <dl style={{ margin: "12px 0 0" }}>
                {COPY.brief.rows.map((r) => (
                  <div className="lx-row" key={r.k}>
                    <dt style={r.highlight ? { color: "var(--lx-accent)" } : undefined}>{r.k}</dt>
                    <dd style={r.highlight ? { color: "var(--lx-accent)" } : undefined}>{r.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="lx-mono" style={{ margin: "14px 0 0" }}>
                $ {COPY.brief.generated} ▍
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </ChamberSection>
  );
}
