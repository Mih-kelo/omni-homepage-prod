import { useEffect, useRef } from "react";
import { usePresence } from "../../lib/presence/presenceStore";
import "./hero-intelligence.css";

/**
 * HeroIntelligence — the Threshold's living lattice (hero right column).
 *
 * A constellation of nodes joined by hairline edges: a calm physical system
 * that leans away from the cursor and settles back home — the impression of
 * a store's intelligence quietly at work. Canvas 2D, one rAF, static
 * topology (k-nearest over home positions, so structure reads as designed);
 * pauses off-screen and on hidden tabs; renders one still frame under
 * prefers-reduced-motion. Decorative only: aria-hidden, no pointer capture —
 * the cursor is read from the shared presence store, never trapped.
 */

/* ---- palette: the hero sits at grade 0 (light), so ink is constant ---- */
const GRAPHITE = [23, 23, 28] as const; // --lx-graphite
const ACCENT = [79, 70, 229] as const; // between #3730a3 and #6366f1
const HUB_FILL = "rgb(55, 48, 163)"; // #3730a3

/* ---- physics (the anti-gravity feel) ---- */
const STIFFNESS = 18; // s^-2 — spring toward target
const DAMPING = 7.8; // ζ ≈ 0.92 of critical: settles in ~1s, one soft breath
const CURSOR_RADIUS = 150; // px of cursor influence
const CURSOR_PUSH = 24; // px max lean away from the cursor
const RIPPLE_SPEED = 380; // px/s wavefront (tap on touch)
const RIPPLE_SIGMA = 46; // px gaussian width of the wavefront
const RIPPLE_PUSH = 16; // px
const RIPPLE_LIFE = 1.3; // s

/* ---- rendering budgets ---- */
const WARM_STEPS = 12;
const NODE_ALPHA = 0.5;
const HUB_ALPHA = 0.55;
const EDGE_ALPHA = 0.11;
const EDGE_WARM_ALPHA = 0.3; // added at full cursor warmth (≤ ~0.41 total)
const PULSE_ALPHA = 0.5;

/** graphite → indigo ramp, cached so no per-frame string allocation */
const RAMP: string[] = Array.from({ length: WARM_STEPS + 1 }, (_, i) => {
  const t = i / WARM_STEPS;
  const r = Math.round(GRAPHITE[0] + (ACCENT[0] - GRAPHITE[0]) * t);
  const g = Math.round(GRAPHITE[1] + (ACCENT[1] - GRAPHITE[1]) * t);
  const b = Math.round(GRAPHITE[2] + (ACCENT[2] - GRAPHITE[2]) * t);
  return `rgb(${r}, ${g}, ${b})`;
});

/** deterministic rng — the constellation is designed, not random soup */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Lattice {
  n: number;
  /** home positions (layout) */
  hx: Float32Array;
  hy: Float32Array;
  /** live positions + velocities */
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  /** smoothed cursor warmth per node, 0..1 */
  warm: Float32Array;
  /** idle breath: per-node amplitude, angular speeds, phases */
  amp: Float32Array;
  wx: Float32Array;
  wy: Float32Array;
  phx: Float32Array;
  phy: Float32Array;
  hub: Uint8Array;
  /** static topology: edge endpoints + rest lengths */
  ea: Uint16Array;
  eb: Uint16Array;
  rest: Float32Array;
  adj: number[][];
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/** jittered golden-angle spiral fit to the column, k-nearest topology */
function buildLattice(w: number, h: number): Lattice {
  const rand = mulberry32(0x10e5eed);
  const small = w < 520;
  const n = small ? 40 : 64;
  const hubCount = small ? 4 : 6;

  const hx = new Float32Array(n);
  const hy = new Float32Array(n);
  const pad = 16;
  const cx = w / 2;
  const cy = h / 2;
  const rx = w / 2 - pad;
  const ry = h / 2 - pad;

  const amp = new Float32Array(n);
  const wx = new Float32Array(n);
  const wy = new Float32Array(n);
  const phx = new Float32Array(n);
  const phy = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const rf = Math.min(1, Math.sqrt((i + 0.6) / n) + (rand() - 0.5) * 0.14);
    const a = i * GOLDEN + (rand() - 0.5) * 0.24;
    hx[i] = cx + Math.cos(a) * rx * rf;
    hy[i] = cy + Math.sin(a) * ry * rf;
    /* slow idle breath: 2–4px over 6–10s periods */
    amp[i] = 2 + rand() * 2;
    wx[i] = (Math.PI * 2) / (6 + rand() * 4);
    wy[i] = (Math.PI * 2) / (6 + rand() * 4);
    phx[i] = rand() * Math.PI * 2;
    phy[i] = rand() * Math.PI * 2;
  }

  const hub = new Uint8Array(n);
  let placed = 0;
  while (placed < hubCount) {
    const i = Math.floor(rand() * n);
    if (!hub[i]) {
      hub[i] = 1;
      placed++;
    }
  }

  /* static topology: k-nearest (k = 2–3) with a max-length cap */
  const cap = 2.3 * Math.sqrt((w * h) / n);
  const seen = new Set<number>();
  const eaArr: number[] = [];
  const ebArr: number[] = [];
  const restArr: number[] = [];
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    const near: Array<[number, number]> = [];
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      near.push([Math.hypot(hx[i] - hx[j], hy[i] - hy[j]), j]);
    }
    near.sort((p, q) => p[0] - q[0]);
    const k = hub[i] ? 3 : 2 + (i % 2);
    for (let m = 0; m < k && m < near.length; m++) {
      const [d, j] = near[m];
      if (d > cap) break;
      const key = i < j ? i * 4096 + j : j * 4096 + i;
      if (seen.has(key)) continue;
      seen.add(key);
      eaArr.push(i);
      ebArr.push(j);
      restArr.push(d);
      adj[i].push(j);
      adj[j].push(i);
    }
  }

  const x = Float32Array.from(hx);
  const y = Float32Array.from(hy);
  return {
    n,
    hx,
    hy,
    x,
    y,
    vx: new Float32Array(n),
    vy: new Float32Array(n),
    warm: new Float32Array(n),
    amp,
    wx,
    wy,
    phx,
    phy,
    hub,
    ea: Uint16Array.from(eaArr),
    eb: Uint16Array.from(ebArr),
    rest: Float32Array.from(restArr),
    adj,
  };
}

export function HeroIntelligence() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lattice: Lattice | null = null;
    let vw = 0;
    let vh = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let inView = false;
    let simT = 0;
    let last = 0;

    /* the pulse: a "thought" travelling 2–4 edges every few seconds */
    const rand = mulberry32(0xa11ce);
    let pulsePath: number[] = [];
    let pulseStart = 0;
    let pulseDur = 1;
    let nextPulseAt = 2.2;

    /* tap ripples (touch carries no cursor — a gentle wavefront instead) */
    const ripples: Array<{ x: number; y: number; born: number }> = [];

    const fit = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 60 || h < 60) {
        lattice = null;
        return;
      }
      vw = w;
      vh = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      lattice = buildLattice(w, h);
      pulsePath = [];
      nextPulseAt = simT + 1.5;
    };

    const startPulse = () => {
      const L = lattice;
      if (!L) return;
      let cur = Math.floor(rand() * L.n);
      for (let g = 0; g < 50 && L.adj[cur].length === 0; g++) cur = Math.floor(rand() * L.n);
      if (L.adj[cur].length === 0) {
        nextPulseAt = simT + 3;
        return;
      }
      const segs = 2 + Math.floor(rand() * 3); // 2–4 edges
      const path = [cur];
      let prev = -1;
      for (let s = 0; s < segs; s++) {
        const options = L.adj[cur].filter((j) => j !== prev);
        const pool = options.length > 0 ? options : L.adj[cur];
        const pick = pool[Math.floor(rand() * pool.length)];
        path.push(pick);
        prev = cur;
        cur = pick;
      }
      pulsePath = path;
      pulseStart = simT;
      pulseDur = 0.55 * (path.length - 1) + 0.35;
      nextPulseAt = simT + pulseDur + 2.6 + rand() * 2;
    };

    const simulate = (dt: number) => {
      const L = lattice;
      if (!L) return;
      const rect = canvas.getBoundingClientRect();
      const p = usePresence.getState();
      const hasCursor = p.pointerActive && !p.isTouch;
      const mx = p.px - rect.left;
      const my = p.py - rect.top;

      for (let r = ripples.length - 1; r >= 0; r--) {
        if (simT - ripples[r].born > RIPPLE_LIFE) ripples.splice(r, 1);
      }

      for (let i = 0; i < L.n; i++) {
        /* target = home + idle breath (+ cursor lean + ripple front) */
        let tx = L.hx[i] + Math.sin(simT * L.wx[i] + L.phx[i]) * L.amp[i];
        let ty = L.hy[i] + Math.cos(simT * L.wy[i] + L.phy[i]) * L.amp[i];
        let warmTarget = 0;

        if (hasCursor) {
          const dx = L.hx[i] - mx;
          const dy = L.hy[i] - my;
          const d = Math.hypot(dx, dy);
          if (d < CURSOR_RADIUS) {
            const q = 1 - d / CURSOR_RADIUS;
            const f = q * q * (3 - 2 * q); // smoothstep falloff
            warmTarget = f;
            if (d > 0.001) {
              tx += (dx / d) * (CURSOR_PUSH * f);
              ty += (dy / d) * (CURSOR_PUSH * f);
            }
          }
        }

        for (const rp of ripples) {
          const age = simT - rp.born;
          const dx = L.hx[i] - rp.x;
          const dy = L.hy[i] - rp.y;
          const d = Math.hypot(dx, dy);
          const front = d - RIPPLE_SPEED * age;
          const g = Math.exp(-(front * front) / (2 * RIPPLE_SIGMA * RIPPLE_SIGMA));
          const fade = 1 - age / RIPPLE_LIFE;
          const push = RIPPLE_PUSH * g * fade * fade;
          if (d > 0.001 && push > 0.05) {
            tx += (dx / d) * push;
            ty += (dy / d) * push;
            warmTarget = Math.max(warmTarget, g * fade * 0.8);
          }
        }

        /* warmth eases in quickly, lingers on the way out */
        const rate = warmTarget > L.warm[i] ? 12 : 3.5;
        L.warm[i] += (warmTarget - L.warm[i]) * Math.min(1, rate * dt);

        /* near-critically-damped spring toward the target */
        const ax = -STIFFNESS * (L.x[i] - tx) - DAMPING * L.vx[i];
        const ay = -STIFFNESS * (L.y[i] - ty) - DAMPING * L.vy[i];
        L.vx[i] += ax * dt;
        L.vy[i] += ay * dt;
        L.x[i] += L.vx[i] * dt;
        L.y[i] += L.vy[i] * dt;
      }
    };

    const draw = () => {
      const L = lattice;
      if (!L) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);

      /* edges — hairlines; stretched edges fade rather than snap */
      ctx.lineWidth = 1;
      for (let e = 0; e < L.ea.length; e++) {
        const a = L.ea[e];
        const b = L.eb[e];
        const x1 = L.x[a];
        const y1 = L.y[a];
        const x2 = L.x[b];
        const y2 = L.y[b];
        const len = Math.hypot(x2 - x1, y2 - y1);
        const stretch = Math.max(0, len / L.rest[e] - 1);
        const lenFade = Math.max(0.15, 1 - stretch * 1.6);
        const warm = (L.warm[a] + L.warm[b]) * 0.5;
        ctx.globalAlpha = (EDGE_ALPHA + warm * EDGE_WARM_ALPHA) * lenFade;
        ctx.strokeStyle = RAMP[Math.round(warm * WARM_STEPS)];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      /* the pulse — a small bright thought easing along a path */
      if (pulsePath.length >= 2) {
        const prog = (simT - pulseStart) / pulseDur;
        if (prog >= 1) {
          pulsePath = [];
        } else {
          const eased = prog < 0.5 ? 4 * prog * prog * prog : 1 - Math.pow(-2 * prog + 2, 3) / 2;
          const fseg = eased * (pulsePath.length - 1);
          const s = Math.min(pulsePath.length - 2, Math.floor(fseg));
          const f = fseg - s;
          const a = pulsePath[s];
          const b = pulsePath[s + 1];
          ctx.globalAlpha = PULSE_ALPHA * Math.sin(Math.PI * prog);
          ctx.fillStyle = RAMP[WARM_STEPS];
          ctx.beginPath();
          ctx.arc(
            L.x[a] + (L.x[b] - L.x[a]) * f,
            L.y[a] + (L.y[b] - L.y[a]) * f,
            2.1,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      } else if (simT >= nextPulseAt) {
        startPulse();
      }

      /* nodes — graphite discs; hubs slightly larger, indigo */
      for (let i = 0; i < L.n; i++) {
        const warm = L.warm[i];
        if (L.hub[i]) {
          ctx.globalAlpha = HUB_ALPHA + warm * 0.2;
          ctx.fillStyle = HUB_FILL;
          ctx.beginPath();
          ctx.arc(L.x[i], L.y[i], 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalAlpha = NODE_ALPHA + warm * 0.22;
          ctx.fillStyle = RAMP[Math.round(warm * WARM_STEPS)];
          ctx.beginPath();
          ctx.arc(L.x[i], L.y[i], 1.9 + warm * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (!lattice) return;
      const dt = Math.min(0.033, Math.max(0.001, (now - last) / 1000));
      last = now;
      simT += dt;
      simulate(dt);
      draw();
    };

    const setRunning = (want: boolean) => {
      if (want && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(step);
      } else if (!want && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    const sync = () => setRunning(inView && !document.hidden && !reduced && lattice !== null);

    /* first layout + entrance */
    fit();
    wrap.classList.add("is-live");
    if (reduced) draw(); // one designed still frame; no loop, no pulses

    const io = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? false;
      sync();
    });
    io.observe(wrap);
    const onVis = () => sync();
    document.addEventListener("visibilitychange", onVis);

    const onDown = (e: PointerEvent) => {
      if (!lattice || reduced) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < -20 || y < -20 || x > rect.width + 20 || y > rect.height + 20) return;
      ripples.push({ x, y, born: simT });
    };
    window.addEventListener("pointerdown", onDown, { passive: true });

    let resizeTimer = 0;
    let first = true;
    const ro = new ResizeObserver(() => {
      if (first) {
        first = false; // initial observation — layout already fitted above
        return;
      }
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        fit();
        if (reduced) draw();
        sync();
      }, 160);
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointerdown", onDown);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  /* SSR renders the bare container; the sim mounts client-side only */
  return (
    <div ref={wrapRef} className="lx-hero-viz" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
