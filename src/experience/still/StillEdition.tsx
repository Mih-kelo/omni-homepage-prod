import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { APP_URL, COPY } from "../config/copy";
import { useMode } from "../lib/a11y/modeStore";

/**
 * The Still Edition (Direction §10): the designed reduced-motion sibling —
 * the machine photographed rather than filmed. Full information parity
 * with the cinematic journey; crossfades only, no canvas, no GSAP.
 * All copy verbatim from the production landing components.
 */
export function StillEdition() {
  const setStill = useMode((s) => s.setStill);
  // offer a way into the cinematic journey — but never override a visitor
  // whose OS asks for reduced motion (their preference wins)
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div style={{ background: "var(--lx-bg)", color: "var(--lx-ink)" }}>
      <main style={{ maxWidth: 980, margin: "0 auto", padding: "clamp(24px, 6vw, 72px)" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span className="lx-panel-word">OMNI TARGET</span>
          <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
            {!reduced && (
              <button
                type="button"
                className="lx-panel-link"
                onClick={() => setStill(false)}
                style={{
                  fontFamily: "var(--lx-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--lx-accent)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Enter the cinematic experience
              </button>
            )}
            <span className="lx-mono">{COPY.beta}</span>
          </div>
        </header>

        <section style={{ padding: "12vh 0 8vh" }} aria-label="The Threshold">
          <span className="lx-badge">{COPY.badge}</span>
          <h1 className="lx-wall" style={{ marginTop: 22 }}>
            {COPY.hero.titleA} <span style={{ color: "var(--lx-accent)" }}>{COPY.hero.titleB}</span>
          </h1>
          <p className="lx-lede" style={{ marginTop: 20 }}>
            {COPY.hero.body}
          </p>
          <div
            style={{
              display: "flex",
              gap: 22,
              alignItems: "center",
              marginTop: 30,
              flexWrap: "wrap",
            }}
          >
            <a className="lx-cta-major" href={APP_URL}>
              {COPY.hero.ctaPrimary} <span aria-hidden="true">→</span>
            </a>
            <a className="lx-cta-ghost" href="#still-how">
              {COPY.hero.ctaSecondary}
            </a>
          </div>
        </section>

        <section
          id="still-how"
          style={{ padding: "7vh 0", borderTop: "1px solid var(--lx-hairline)" }}
          aria-label="How it works"
        >
          <span className="lx-mono">{COPY.howItWorks.eyebrow}</span>
          <h2 className="lx-wall lx-wall-sm" style={{ margin: "14px 0 30px" }}>
            {COPY.howItWorks.titleA}{" "}
            <span style={{ color: "var(--lx-accent)" }}>{COPY.howItWorks.titleB}</span>
          </h2>
          <div style={{ display: "grid", gap: 28 }}>
            {COPY.howItWorks.steps.map((s) => (
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 18 }}>
                <span className="lx-numeral" style={{ fontSize: 46, color: "var(--lx-accent)" }}>
                  {s.n}
                </span>
                <div>
                  <h3 style={{ font: "600 18px/1.3 var(--lx-grotesk)", margin: "0 0 6px" }}>
                    {s.t}
                  </h3>
                  <p className="lx-lede" style={{ fontSize: 15 }}>
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{ padding: "7vh 0", borderTop: "1px solid var(--lx-hairline)" }}
          aria-label="The cold traffic paradox"
        >
          <span className="lx-mono lx-mono-accent">{COPY.paradox.eyebrow}</span>
          <h2 className="lx-wall lx-wall-sm" style={{ margin: "14px 0 30px" }}>
            {COPY.paradox.titleA}{" "}
            <span style={{ color: "var(--lx-accent)" }}>{COPY.paradox.titleB}</span>
          </h2>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "stretch" }}>
            {[COPY.paradox.bestseller, COPY.paradox.gateway].map((card, i) => (
              <article className="lx-card" key={card.label} style={{ flex: "1 1 280px" }}>
                <span className="lx-mono" style={i === 0 ? { color: "var(--lx-gold)" } : undefined}>
                  {card.label}
                </span>
                <h3 className="lx-card-title">{card.name}</h3>
                <dl style={{ margin: 0 }}>
                  {card.rows.map(([k, v]) => (
                    <div className="lx-row" key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className={i === 0 ? "lx-verdict gold" : "lx-verdict"}>
                  <i aria-hidden="true" />
                  <span>{card.verdict}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="lx-curator" style={{ marginTop: 26 }}>
            {COPY.paradox.closing}
          </p>
        </section>

        <section
          style={{ padding: "7vh 0", borderTop: "1px solid var(--lx-hairline)" }}
          aria-label="What you get"
        >
          <span className="lx-mono">{COPY.whatYouGet.eyebrow}</span>
          <h2 className="lx-wall lx-wall-sm" style={{ margin: "14px 0 16px" }}>
            {COPY.whatYouGet.titleA}{" "}
            <span style={{ color: "var(--lx-accent)" }}>{COPY.whatYouGet.titleB}</span>
          </h2>
          <p className="lx-lede">{COPY.whatYouGet.body}</p>
          <ul className="lx-checks" style={{ marginTop: 20 }}>
            {COPY.whatYouGet.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
          <div className="lx-card" style={{ marginTop: 30, maxWidth: 520 }}>
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
              $ {COPY.brief.generated}
            </p>
          </div>
        </section>

        <section
          style={{
            padding: "7vh 0",
            borderTop: "1px solid var(--lx-hairline)",
            textAlign: "center",
          }}
          aria-label="Who it's for"
        >
          <span className="lx-mono">{COPY.whoItsFor.eyebrow}</span>
          <h2 className="lx-wall lx-wall-sm" style={{ margin: "14px auto 26px", maxWidth: "22ch" }}>
            {COPY.whoItsFor.titleA}{" "}
            <span style={{ color: "var(--lx-accent)" }}>{COPY.whoItsFor.titleB}</span>
          </h2>
          <div className="lx-tags" style={{ justifyContent: "center" }}>
            {COPY.whoItsFor.tags.map((t) => (
              <span className="lx-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <p
            className="lx-lede"
            style={{ margin: "26px auto 0", fontSize: 13.5, color: "var(--lx-ink-faint)" }}
          >
            {COPY.whoItsFor.disclaimer}
          </p>
        </section>

        <section
          style={{ padding: "7vh 0", borderTop: "1px solid var(--lx-hairline)" }}
          aria-label="Pricing"
        >
          <span className="lx-mono">{COPY.pricing.eyebrow}</span>
          <h2 className="lx-wall lx-wall-sm" style={{ margin: "14px 0 30px" }}>
            {COPY.pricing.titleA}{" "}
            <span style={{ color: "var(--lx-accent)" }}>{COPY.pricing.titleB}</span>
          </h2>
          <div className="lx-plates">
            {COPY.pricing.plans.map((p) => (
              <div key={p.name} className="lx-plate" data-featured={p.featured}>
                {p.featured && <span className="lx-plate-flag">{COPY.pricing.recommended}</span>}
                <span className="lx-plate-name">{p.name}</span>
                <div>
                  <span className="lx-plate-price">{p.price}</span>{" "}
                  {p.period && <span className="lx-plate-period">{p.period}</span>}
                </div>
                <p className="lx-plate-desc">{p.desc}</p>
                {p.features.length > 0 && (
                  <ul className="lx-plate-features">
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
                <div className="lx-plate-cta">
                  <a href={APP_URL}>{p.cta}</a>
                </div>
              </div>
            ))}
          </div>
          <p className="lx-billing" style={{ marginTop: 22 }}>
            {COPY.pricing.billing}
          </p>
        </section>

        <footer style={{ borderTop: "1px solid var(--lx-hairline)", padding: "30px 0 60px" }}>
          <div className="lx-colophon-row">
            <span className="lx-panel-word">OMNI TARGET</span>
            <nav style={{ display: "flex", gap: 18 }} aria-label="Legal">
              <Link to="/privacy" className="lx-mono">
                {COPY.footer.privacy}
              </Link>
              <Link to="/terms" className="lx-mono">
                {COPY.footer.terms}
              </Link>
            </nav>
            <span className="lx-mono" style={{ marginLeft: "auto" }}>
              {COPY.footer.tagline}
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
