import { ChamberSection } from "../ui/placards/ChamberSection";
import { WallText } from "../ui/placards/WallText";
import { Reveal } from "../ui/placards/Reveal";
import { ThresholdLabels } from "./ThresholdLabels";
import { APP_URL, COPY } from "../config/copy";

/** Chamber 0 — the Threshold. Curiosity. The hero copy, staged in the field. */
export function Threshold() {
  return (
    <ChamberSection id="threshold" justify="stretch">
      <ThresholdLabels />
      <div className="lx-bleed lx-split lx-split-top" style={{ alignItems: "center" }}>
        <div style={{ display: "grid", gap: 28 }}>
          <Reveal>
            <div className="lx-eyebrow-row">
              <span className="lx-badge">{COPY.badge}</span>
              <span className="lx-mono">{COPY.beta}</span>
            </div>
          </Reveal>
          <WallText
            as="h1"
            lines={[{ text: COPY.hero.titleA }, { text: COPY.hero.titleB, accent: true }]}
          />
          <Reveal delay={0.25}>
            <p className="lx-lede">{COPY.hero.body}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
              <a className="lx-cta-major" href={APP_URL}>
                {COPY.hero.ctaPrimary}
                <span aria-hidden="true">→</span>
              </a>
              <a className="lx-cta-ghost" href="#chamber-listening">
                {COPY.hero.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>
        {/* right column intentionally open — the world's light lives here */}
        <div aria-hidden="true" />
      </div>
    </ChamberSection>
  );
}
