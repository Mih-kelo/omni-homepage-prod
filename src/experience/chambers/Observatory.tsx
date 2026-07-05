import { ChamberSection } from "../ui/placards/ChamberSection";
import { WallText } from "../ui/placards/WallText";
import { Reveal } from "../ui/placards/Reveal";
import { COPY } from "../config/copy";

/**
 * Chamber 6 — the Observatory. Trust. The whole instrument at once,
 * and who it serves — including who it does not (verbatim).
 */
export function Observatory() {
  return (
    <ChamberSection id="observatory" justify="center">
      <div
        style={{
          display: "grid",
          gap: 32,
          justifyItems: "center",
          textAlign: "center",
          maxWidth: 1000,
        }}
      >
        <Reveal>
          <span className="lx-mono">{COPY.whoItsFor.eyebrow}</span>
        </Reveal>
        <WallText
          small
          lines={[{ text: COPY.whoItsFor.titleA }, { text: COPY.whoItsFor.titleB, accent: true }]}
        />
        <Reveal delay={0.18}>
          <div className="lx-tags" style={{ justifyContent: "center" }}>
            {COPY.whoItsFor.tags.map((t) => (
              <span className="lx-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="lx-lede" style={{ fontSize: 13.5, color: "var(--lx-ink-faint)" }}>
            {COPY.whoItsFor.disclaimer}
          </p>
        </Reveal>
      </div>
    </ChamberSection>
  );
}
