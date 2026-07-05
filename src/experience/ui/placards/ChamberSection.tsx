import type { CSSProperties, ReactNode } from "react";
import type { ChamberId } from "../../types";
import { CHAMBERS, CHAMBER_INDEX_BY_ID } from "../../config/journey";

/**
 * A chamber of the instrument: a normal-flow section with a full-viewport
 * stage for its placards — the page scrolls continuously, never pausing.
 * The Core alone keeps a modest pinned dwell (its light→dark→light
 * transformation is the one moment that earns a hold). Real DOM in
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
  const stageStyle: CSSProperties = {
    justifyItems: justify,
    alignItems: align,
  };
  const pinned = id === "core";
  return (
    <section
      id={`chamber-${id}`}
      data-chamber={id}
      className={pinned ? "lumen-chamber lumen-chamber-pin" : "lumen-chamber"}
      aria-label={`${def.title} — ${def.emotion}`}
    >
      <div className="lumen-stage" data-stage={id} style={stageStyle}>
        {children}
      </div>
    </section>
  );
}
