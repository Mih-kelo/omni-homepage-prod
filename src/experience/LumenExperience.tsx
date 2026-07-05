import { Suspense, lazy, useEffect, useRef } from "react";
import { ClientOnly } from "./lib/client";
import { useMode } from "./lib/a11y/modeStore";
import { PresenceTracker } from "./lib/presence/PresenceTracker";
import { JourneyScroll } from "./lib/journey/JourneyScroll";
import { StoryTimeline } from "./ui/timeline/StoryTimeline";
import { FirstBreath } from "./ui/chrome/FirstBreath";
import { Colophon } from "./ui/chrome/Colophon";
import { DebugHud } from "./ui/chrome/DebugHud";
import { InstrumentPanel } from "./ui/panel/InstrumentPanel";
import { StillEdition } from "./still/StillEdition";
import { Threshold } from "./chambers/Threshold";
import { Listening } from "./chambers/Listening";
import { Paradox } from "./chambers/Paradox";
import { CoreChamber } from "./chambers/CoreChamber";
import { Composition } from "./chambers/Composition";
import { Range } from "./chambers/Range";
import { Observatory } from "./chambers/Observatory";
import { Invitation } from "./chambers/Invitation";

/** the world never touches the server bundle — three loads behind the breath */
const WorldCanvas = lazy(() => import("./world/WorldCanvas"));

/**
 * LUMEN — one continuous experience (Direction §1–§3).
 * SSR renders the full placard narrative (boot mode, no canvas); the
 * client resolves cinematic vs. still before the First Breath completes.
 */
export function LumenExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const mode = useMode((s) => s.mode);
  const resolve = useMode((s) => s.resolve);

  useEffect(() => {
    resolve();
  }, [resolve]);

  if (mode === "still") {
    return (
      <div className="lumen">
        <StillEdition />
      </div>
    );
  }

  return (
    <div className="lumen" ref={rootRef}>
      <FirstBreath />
      <ClientOnly>
        <PresenceTracker />
        {mode === "cinematic" && (
          <Suspense fallback={null}>
            <WorldCanvas />
          </Suspense>
        )}
        <JourneyScroll rootRef={rootRef} trackRef={trackRef} />
        {mode === "cinematic" && <StoryTimeline />}
      </ClientOnly>
      <main className="lumen-track" ref={trackRef}>
        <Threshold />
        <Listening />
        <Paradox />
        <CoreChamber />
        <Composition />
        <Range />
        <Observatory />
        <Invitation />
      </main>
      <Colophon />
      <InstrumentPanel />
      <DebugHud />
    </div>
  );
}
