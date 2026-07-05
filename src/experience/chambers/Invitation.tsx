import { ChamberSection } from "../ui/placards/ChamberSection";
import { WallText } from "../ui/placards/WallText";
import { Reveal } from "../ui/placards/Reveal";
import { PlateDrawer } from "../ui/pricing/PlateDrawer";
import { APP_URL, COPY } from "../config/copy";

/**
 * Chamber 7 — the Invitation. Desire → action. The purest white; the
 * pricing plates rest like film stock in an archive drawer; one action.
 * All offer copy verbatim.
 */
export function Invitation() {
  return (
    <ChamberSection id="invitation" justify="center">
      <div
        style={{
          display: "grid",
          gap: 30,
          justifyItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Reveal>
          <span className="lx-mono">{COPY.pricing.eyebrow}</span>
        </Reveal>
        <WallText
          lines={[{ text: COPY.pricing.titleA }, { text: COPY.pricing.titleB, accent: true }]}
        />
        <PlateDrawer />
        <Reveal delay={0.2}>
          <p className="lx-billing">{COPY.pricing.billing}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <a className="lx-cta-major" href={APP_URL} data-lens-cta>
            {COPY.hero.ctaPrimary}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </ChamberSection>
  );
}
