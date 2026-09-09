import { ChamberSection } from "../ui/placards/ChamberSection";
import { WallText } from "../ui/placards/WallText";
import { Reveal } from "../ui/placards/Reveal";
import { COPY, type ParadoxCard } from "../config/copy";

function ProductCard({ data, gold, delay }: { data: ParadoxCard; gold?: boolean; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article
        className="lx-card"
        style={{
          border: gold ? "1px solid rgba(234, 179, 8, 0.25)" : "1px solid rgba(99, 102, 241, 0.25)",
          boxShadow: gold
            ? "0 10px 30px -10px rgba(234, 179, 8, 0.08)"
            : "0 10px 30px -10px rgba(99, 102, 241, 0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span
            className="lx-mono"
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: gold ? "#f59e0b" : "#6366f1",
            }}
          >
            {gold ? "🔴 " : "🟢 "} {data.label}
          </span>
        </div>
        <h3 className="lx-card-title" style={{ fontSize: 20, margin: "6px 0 16px" }}>
          {data.name}
        </h3>
        <dl style={{ margin: 0 }}>
          {data.rows.map(([k, v]) => (
            <div className="lx-row" key={k}>
              <dt>{k}</dt>
              <dd
                style={{
                  fontWeight: 600,
                  color:
                    k.includes("conversion") || k.includes("fit") || k.includes("ROAS") || k.includes("return")
                      ? gold
                        ? "#ef4444"
                        : "#10b981"
                      : undefined,
                }}
              >
                {v}
              </dd>
            </div>
          ))}
        </dl>
        <div
          className={gold ? "lx-verdict gold" : "lx-verdict"}
          style={{ marginTop: 18, lineHeight: 1.45, fontSize: 13 }}
        >
          <i aria-hidden="true" />
          <span>{data.verdict}</span>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Chamber 2 — the Paradox Gallery. Insight before awe: the spotlight
 * swings from the gilded bestseller to the quiet gateway product.
 * All data verbatim; gold appears here and nowhere else.
 */
export function Paradox() {
  return (
    <ChamberSection id="paradox" justify="stretch">
      <div className="lx-bleed" style={{ display: "grid", gap: "clamp(28px, 4vw, 52px)" }}>
        <div style={{ textAlign: "center", display: "grid", justifyItems: "center" }}>
          <Reveal>
            <span className="lx-mono lx-mono-accent">{COPY.paradox.eyebrow}</span>
          </Reveal>
          <WallText
            className="lx-paradox-wall"
            lines={[{ text: COPY.paradox.titleA }, { text: COPY.paradox.titleB, accent: true }]}
          />
        </div>
        {/* the two products spread to the edges — the comparison spans the room */}
        <div className="lx-versus">
          <ProductCard data={COPY.paradox.bestseller} gold delay={0.1} />
          <span className="lx-versus-mark" aria-hidden="true">
            vs
          </span>
          <ProductCard data={COPY.paradox.gateway} delay={0.28} />
        </div>
        <Reveal delay={0.4}>
          <p className="lx-curator" style={{ maxWidth: "none", textAlign: "center" }}>
            {COPY.paradox.closing}
          </p>
        </Reveal>
      </div>
    </ChamberSection>
  );
}
