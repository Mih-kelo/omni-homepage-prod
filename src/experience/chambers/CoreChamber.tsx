import { ChamberSection } from "../ui/placards/ChamberSection";
import { Reveal } from "../ui/placards/Reveal";
import { COPY } from "../config/copy";

/**
 * Chamber 3 — the Core. Awe. Darkness needs almost no copy: one placard
 * on the way in (step 02, verbatim), then the machine performs.
 * Ink and paper follow the grade automatically.
 */
export function CoreChamber() {
  const step = COPY.howItWorks.steps[1];
  return (
    <ChamberSection id="core" justify="center" align="start">
      <div
        style={{ paddingTop: "12vh", maxWidth: 560, textAlign: "center", justifySelf: "center" }}
      >
        <Reveal>
          <span className="lx-numeral" style={{ fontSize: 40, color: "var(--lx-accent)" }}>
            {step.n}
          </span>
          <h2 className="lx-wall lx-wall-sm" style={{ margin: "10px auto 12px", maxWidth: "18ch" }}>
            {step.t}
          </h2>
          <p className="lx-lede" style={{ margin: "0 auto", fontSize: 14.5 }}>
            {step.d}
          </p>
        </Reveal>
      </div>
    </ChamberSection>
  );
}
