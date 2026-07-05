import { ChamberSection } from "../ui/placards/ChamberSection";
import { Reveal } from "../ui/placards/Reveal";
import { COPY } from "../config/copy";

/**
 * Chamber 5 — the Range. Confidence. The beam aims, then fires; results
 * are inscriptions, not widgets. The figures are the gateway product's
 * own metrics, verbatim (2.4x cold-traffic ROAS · 64% first-time buyers).
 */
export function Range() {
  const gateway = COPY.paradox.gateway;
  const roas = gateway.rows.find(([k]) => k === "Cold-traffic ROAS")?.[1] ?? "2.4x";
  const ftb = gateway.rows.find(([k]) => k === "First-time buyers")?.[1] ?? "64%";
  return (
    <ChamberSection id="range" justify="stretch">
      <div
        className="lx-bleed lx-split"
        style={{ gridTemplateColumns: "0.8fr 1.2fr", alignItems: "center" }}
      >
        <div style={{ display: "grid", gap: 16 }}>
          <Reveal>
            <span className="lx-mono lx-mono-accent">{gateway.label}</span>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="lx-verdict">
              <i aria-hidden="true" />
              <span>{gateway.verdict}</span>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="lx-mono">
              {COPY.brief.rows[0].k} → {COPY.brief.rows[0].v}
            </p>
          </Reveal>
        </div>
        <div style={{ display: "grid", gap: 30, textAlign: "right", justifyItems: "end" }}>
          <Reveal delay={0.1}>
            <div className="lx-bignum" style={{ color: "var(--lx-accent)" }}>
              {roas}
            </div>
            <span className="lx-mono">cold_traffic_ROAS</span>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="lx-bignum">{ftb}</div>
            <span className="lx-mono">first_time_buyers</span>
          </Reveal>
        </div>
      </div>
    </ChamberSection>
  );
}
