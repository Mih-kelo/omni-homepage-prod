import type { CSSProperties, ReactNode } from "react";
import type { ChamberId } from "../../types";
import { CHAMBERS, CHAMBER_INDEX_BY_ID } from "../../config/journey";
import { TRACK_VH } from "../../config/motion";

/**
 * A chamber of the instrument: a scroll segment sized to its share of the
 * journey, with a sticky full-viewport stage for its placards. Real DOM in
 * document order — the narrative reads top-to-bottom for assistive tech.
 */
export function ChamberSection({
  id,
  children,
  justify = "start",
  align = "center",
}: {
  id: ChamberId;
  children: ReactNode;
  /** horizontal placement of the placard block on the stage */
  justify?: "start" | "center" | "end" | "stretch";
  align?: "start" | "center" | "end" | "stretch";
}) {
  const def = CHAMBERS[CHAMBER_INDEX_BY_ID[id]];
  const heightVh = (def.share / 100) * TRACK_VH;
  const stageStyle: CSSProperties = {
    justifyItems: justify,
    alignItems: align,
  };
  return (
    <section
      id={`chamber-${id}`}
      data-chamber={id}
      className="lumen-chamber"
      style={{ height: `${heightVh}vh` }}
      aria-label={`${def.title} — ${def.emotion}`}
    >
      <div className="lumen-stage" data-stage={id} style={stageStyle}>
        {children}
      </div>
    </section>
  );
}
