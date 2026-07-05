import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { poseAt } from "./spine";
import { useJourney } from "../lib/journey/journeyStore";
import { usePresence } from "../lib/presence/presenceStore";
import { damp } from "../lib/journey/math";
import { TIMING } from "../config/motion";

/**
 * The camera is the narrator (Direction §7). It follows the spine with
 * mass — a damped follow ≈1s behind the finger — and carries the cursor's
 * lens as a small, spring-damped parallax. It never snaps.
 */
export function CameraRig() {
  const camera = useThree((s) => s.camera);
  const smoothed = useRef(0);
  const lensX = useRef(0);
  const lensY = useRef(0);
  const pos = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    const clamped = Math.min(dt, 1 / 20);
    const j = useJourney.getState();
    smoothed.current = damp(smoothed.current, j.rawProgress, TIMING.cameraFollowLambda, clamped);
    j.setSmoothed(smoothed.current);

    poseAt(smoothed.current, pos.current, look.current);

    const p = usePresence.getState();
    const targetX = p.pointerActive && !p.isTouch ? p.nx * TIMING.lensWorldOffset : 0;
    const targetY = p.pointerActive && !p.isTouch ? p.ny * TIMING.lensWorldOffset * 0.55 : 0;
    lensX.current = damp(lensX.current, targetX, 2.4, clamped);
    lensY.current = damp(lensY.current, targetY, 2.4, clamped);

    camera.position.set(
      pos.current.x + lensX.current,
      pos.current.y + lensY.current,
      pos.current.z,
    );
    camera.lookAt(look.current);
  });

  return null;
}
