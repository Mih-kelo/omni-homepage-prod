import { Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { MoteField } from "./motes/MoteField";
import { NodeField } from "./ambient/NodeField";
import { useTier } from "../lib/tiers/tierStore";
import { useJourney } from "../lib/journey/journeyStore";

/**
 * The world — one persistent scene for the whole journey (Direction §7).
 * Refined to near-emptiness: the ambient elements are the faint star-field
 * (with a slow twinkle), a sparse layer of tiny intelligence nodes and far
 * drift lights (NodeField), and the graded atmosphere. All decorative
 * set-pieces have been removed so the storytelling belongs to the content
 * and the vertical timeline; the world is only quiet depth behind them.
 * Fixed, full-viewport, decorative to assistive tech; client-only.
 */
export default function WorldCanvas() {
  const profile = useTier((s) => s.profile);
  const demote = useTier((s) => s.demote);

  return (
    <div className="lumen-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, profile.dprMax]}
        camera={{ fov: 42, near: 0.1, far: 320, position: [0, 1.8, 9] }}
        gl={{
          antialias: profile.tier > 0,
          // transparent canvas: the true warm-white (and dark-passage) ground
          // comes from the DOM's graded --lx-bg behind it, so ACES tone-mapping
          // only ever touches 3D objects — never flattens the backdrop to grey.
          // premultipliedAlpha stays at its default (true): three's normal
          // blending already writes premultiplied rgb (color×alpha) into the
          // buffer, and declaring the canvas non-premultiplied made the
          // compositor multiply by alpha a second time — bright-on-dark pixels
          // scaled by alpha², which erased the whole field in the dark passages
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
        }}
      >
        <PerformanceMonitor onDecline={demote} flipflops={2}>
          <Suspense fallback={null}>
            <CameraRig />
            <MoteField />
            <NodeField />
            <ReadySignal />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}

/** flips worldReady after the first rendered frames — gates the First Breath */
function ReadySignal() {
  useEffect(() => () => useJourney.getState().setWorldReady(false), []);
  useFrame((state) => {
    if (state.clock.elapsedTime > 0.15 && !useJourney.getState().worldReady) {
      useJourney.getState().setWorldReady(true);
    }
  });
  return null;
}
