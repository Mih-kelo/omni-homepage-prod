import { ChamberSection } from "../ui/placards/ChamberSection";
import { Reveal } from "../ui/placards/Reveal";
import { COPY } from "../config/copy";

/**
 * Chamber 5 — the Range. Confidence. The beam aims, then fires; results
 * are inscriptions, not widgets. The figures are the gateway product's
 * own cold-traffic record (2.4x ROAS · 64% first-time buyers), each with
 * a quiet caption saying what the number means and why it matters before
 * a dollar is spent.
 */
export function Range() {
  const gateway = COPY.paradox.gateway;
  const roas = gateway.rows.find(([k]) => k === COPY.range.roas.label)?.[1] ?? "2.4x";
  const ftb = gateway.rows.find(([k]) => k === COPY.range.firstTime.label)?.[1] ?? "64%";
  return (
    <ChamberSection id="range" justify="stretch">
      <div
        className="lx-bleed lx-split"
        style={{ gridTemplateColumns: "0.8fr 1.2fr", alignItems: "center" }}
      >
        <div style={{ display: "grid", gap: 16 }}>
          <Reveal>
            <span className="lx-mono lx-mono-accent">{COPY.range.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="lx-verdict">
              <i aria-hidden="true" />
              <span>
                {gateway.label} · {gateway.verdict}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="lx-lede">{COPY.range.context}</p>
          </Reveal>
        </div>
        <div style={{ display: "grid", gap: 34, textAlign: "right", justifyItems: "end" }}>
          <Reveal delay={0.1}>
            <div className="lx-bignum" style={{ color: "var(--lx-accent)" }}>
              {roas}
            </div>
            <span className="lx-mono">{COPY.range.roas.label}</span>
            <p className="lx-bignote">{COPY.range.roas.note}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="lx-bignum">{ftb}</div>
            <span className="lx-mono">{COPY.range.firstTime.label}</span>
            <p className="lx-bignote">{COPY.range.firstTime.note}</p>
          </Reveal>
        </div>
      </div>
    </ChamberSection>
  );
}
