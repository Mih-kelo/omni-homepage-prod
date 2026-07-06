import { ChamberSection } from "../ui/placards/ChamberSection";
import { WallText } from "../ui/placards/WallText";
import { Reveal } from "../ui/placards/Reveal";
import { PlateDrawer } from "../ui/pricing/PlateDrawer";
import { APP_URL, COPY } from "../config/copy";

/**
 * Chamber 7 — the Invitation. Desire → action. The purest white; four
 * pricing plates as the climax of the journey, one action beneath them,
 * the billing terms as a quiet footnote. All offer copy verbatim.
 */
export function Invitation() {
  return (
    <ChamberSection id="invitation" justify="center">
      <div
        style={{
          display: "grid",
          gap: "clamp(20px, 3vh, 32px)",
          justifyItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Reveal>
          <span className="lx-mono lx-mono-accent">{COPY.pricing.eyebrow}</span>
        </Reveal>
        <WallText
          lines={[{ text: COPY.pricing.titleA }, { text: COPY.pricing.titleB, accent: true }]}
        />
        <Reveal delay={0.12}>
          <p className="lx-lede">{COPY.pricing.note}</p>
        </Reveal>
        <PlateDrawer />
        <Reveal delay={0.2}>
          <a className="lx-cta-major" href={APP_URL} data-lens-cta>
            {COPY.hero.ctaPrimary}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="lx-billing">{COPY.pricing.billing}</p>
        </Reveal>
      </div>
    </ChamberSection>
  );
}
