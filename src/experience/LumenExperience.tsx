import { Suspense, lazy, useEffect, useRef } from "react";
import { ClientOnly } from "./lib/client";
import { useMode } from "./lib/a11y/modeStore";
import { useTier } from "./lib/tiers/tierStore";
import { PresenceTracker } from "./lib/presence/PresenceTracker";
import { JourneyScroll } from "./lib/journey/JourneyScroll";
import { StoryPath } from "./ui/timeline/StoryPath";
import { FirstBreath } from "./ui/chrome/FirstBreath";
import { Colophon } from "./ui/chrome/Colophon";
import { DebugHud } from "./ui/chrome/DebugHud";
import { TopBar } from "./ui/nav/TopBar";
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
  const resolve = useMode((s) => s.resolve);
  const webglOk = useTier((s) => s.webglOk);

  useEffect(() => {
    resolve();
  }, [resolve]);

  // Zero-dependency desktop mousewheel smooth scroll engine
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isMoving = false;
    const ease = 0.085;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      e.preventDefault();

      targetY += e.deltaY;
      targetY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));

      if (!isMoving) {
        isMoving = true;
        animate();
      }
    };

    const animate = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.5) {
        currentY += diff * ease;
        window.scrollTo(0, currentY);
        requestAnimationFrame(animate);
      } else {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isMoving = false;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    const onScroll = () => {
      if (!isMoving) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="lumen" ref={rootRef}>
      <FirstBreath />
      <ClientOnly>
        <PresenceTracker />
        {webglOk === true && (
          <Suspense fallback={null}>
            <WorldCanvas />
          </Suspense>
        )}
        <JourneyScroll rootRef={rootRef} trackRef={trackRef} />
        <StoryPath />
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
      <TopBar />
      <DebugHud />
    </div>
  );
}
