import { ChamberSection } from "../ui/placards/ChamberSection";
import { WallText } from "../ui/placards/WallText";
import { Reveal } from "../ui/placards/Reveal";
import { COPY, type ParadoxCard } from "../config/copy";

function ProductCard({ data, gold, delay }: { data: ParadoxCard; gold?: boolean; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="lx-card">
        <span className="lx-mono" style={gold ? { color: "var(--lx-gold)" } : undefined}>
          {data.label}
        </span>
        <h3 className="lx-card-title">{data.name}</h3>
        <dl style={{ margin: 0 }}>
          {data.rows.map(([k, v]) => (
            <div className="lx-row" key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className={gold ? "lx-verdict gold" : "lx-verdict"}>
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
        <div>
          <Reveal>
            <span className="lx-mono lx-mono-accent">{COPY.paradox.eyebrow}</span>
          </Reveal>
          <WallText
            lines={[{ text: COPY.paradox.titleA }, { text: COPY.paradox.titleB, accent: true }]}
          />
        </div>
        {/* the two products spread to the edges — the comparison spans the room */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "clamp(20px, 5vw, 80px)",
            alignItems: "center",
          }}
        >
          <ProductCard data={COPY.paradox.bestseller} gold delay={0.1} />
          <span
            aria-hidden="true"
            style={{ font: "500 24px var(--lx-serif)", color: "var(--lx-ink-faint)" }}
          >
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
