# LUMEN — Engineering Plan

Implementation blueprint for `docs/CREATIVE_DIRECTION.md` (immutable spec — referred to below as "the Direction").
This document is the contract for all workstreams. If code and this plan disagree with the Direction, the Direction wins.

## 0 · Ground rules

- **Fidelity:** every chamber, all 14 signature moments, the copy deck verbatim, light-first with dark confined to chambers 3 and 6, one continuous journey, cursor presence, idle murmur, Still Edition, tiers, a11y. No ambition reductions.
- **Stack:** React 19 + TanStack Start (SSR, Vercel) + Tailwind 4 (existing) · **three + @react-three/fiber v9 + drei** (the world) · **gsap 3.13 + ScrollTrigger** (the conductor) · **framer-motion 12** (the visitor's hands) · **zustand** (shared presence/journey state).
- **No monoliths:** one responsibility per file; world isolated from UI; animation config centralized.
- Existing site components in `src/components/landing/` become unused (route swaps to the new experience) but are left in place. `/privacy` and `/terms` keep the old dark tokens — new tokens are scoped under `.lumen`.

## 1 · Top-level architecture

Three layers, one place (Direction §7):

1. **The world** — one persistent R3F `<Canvas>`, `position: fixed`, full viewport, `aria-hidden`. One scene graph for the whole journey: chambers are **groups laid out along a world-space spine** (−Z axis); the camera dollies through them. Client-only via `React.lazy` + `ClientOnly` (SSR never evaluates three).
2. **The placard layer** — real DOM in document order inside a tall scroll track. Each chamber is a `<section>` sized to its scroll share, with a `position: sticky` full-viewport stage holding its placards. SEO/SSR-friendly, screen-reader-readable, anchor-navigable.
3. **The conductor** — GSAP. One master ScrollTrigger over the whole track writes `rawProgress` to the journey store. Per-chamber ScrollTriggers (bound to the chamber sections) scrub **set-piece timelines** which write named scalar **channels** (`setChannel("core.assembly", v)`) into the journey store. The world reads channels in `useFrame`; it never imports GSAP.

**The cinematic lag (Direction §7 "scrub smoothing ≈ 1s"):** scroll is never hijacked. ScrollTriggers use plain scrub; the **world side** applies a critically-damped follow toward `rawProgress` (`smoothedProgress`) in the render loop. Placards stay crisp under the finger; the world has mass.

**Shared grade:** journey config defines a light↔dark grade curve over progress (dark only across chambers 3 and 6, entered/exited gradually — "no cuts"). A rAF writer mirrors grade + chamber CSS custom properties onto the `.lumen` root so DOM ink/paper follow the same lighting as the scene (Direction: "the seam that must never show").

**Experience modes**, resolved client-side before the First Breath completes:
- `cinematic` — WebGL available, no reduced-motion preference, Still toggle off.
- `still` — the Still Edition (Direction §10): designed static editorial sibling. Triggers: `prefers-reduced-motion`, WebGL unavailable/failed, or the visible "Still" toggle. Shares the copy/content config; separate layout; full information parity including pricing and CTA.
SSR renders the cinematic DOM (all copy is real DOM → SEO) plus the First Breath overlay; no canvas on the server.

## 2 · Folder structure & ownership

```
src/experience/
  types.ts                     # shared types (frozen contract)
  LumenExperience.tsx          # mode resolution + composition        [core]
  config/
    palette.ts   motion.ts   journey.ts   copy.ts                    [core, frozen]
  lib/
    client.tsx                 # ClientOnly, isClient                 [core]
    presence/                  # pointer/idle/velocity store + tracker[core]
    journey/                   # journeyStore, JourneyScroll, math    [core]
    journey/timelines/         # per-chamber GSAP set-piece builders  [workers]
    tiers/                     # device tier probe + store            [core]
    audio/                     # generative sound layer, off by default [polish]
  world/                       # R3F ONLY — never imports ui/ or gsap
    WorldCanvas.tsx  CameraRig.tsx  Atmosphere.tsx  spine.ts          [core]
    registry.ts                # dream() registry for Idle Murmur     [core]
    motes/                     # MoteField points shader (one system) [core]
    post/                      # tier-gated effects composer          [core]
    streams/  shoal/           # Thread, tributaries, garment shoal   [W1]
    gallery/  range/           # pedestals+spotlight, beam+ledger     [W2]
    core/     observatory/     # the Core, ThroughGlass, miniature    [W3]
    composition/               # bloom, canvas, hooks, channel, brief [W4]
    invitation/                # the Lens, gravity well, pulse-back   [W5]
  ui/                          # DOM ONLY — framer-motion lives here
    placards/                  # ChamberSection, WallText, MonoTag, PaperPlacard, CuratorLine [core]
    panel/                     # InstrumentPanel, JourneyThread, ChamberIndex, toggles        [core]
    chrome/                    # FirstBreath, Colophon, DebugHud                              [core]
    pricing/                   # PlateDrawer, Plate (glass plates)                            [W5]
  chambers/                    # eight thin DOM compositions (placards + copy)                [core]
  still/                       # Still Edition                                                [W6]
```

`[core]` = built first, inline (the spine; frozen contracts for workers). `[W1–W6]` = parallel workers, exclusive directories. Workers **never** edit core files, `package.json`, `styles.css`, or another worker's directory; integration fixes happen after merge, centrally.

## 3 · Frozen contracts (what workers code against)

- **`config/journey.ts`** — `CHAMBERS[8]`: id, title, emotion, scroll `share` (7/12/13/15/18/12/8/15 %), spine position (z), camera control points + look-at targets, grade keyframes, dwell windows. Total track ≈ 1400vh. Spine spacing ≈ 60 units; chamber 3's path passes **through** the Core.
- **`lib/journey/journeyStore.ts`** (zustand, transient reads in `useFrame` via `getState`):
  `rawProgress, velocity, chamberIndex, chamberLocal, grade, channels: Record<string, number>, setChannel(k, v), memory { hoveredSlides:Set<string>, swayedBloom:boolean, dwellMs:number[] }, dream:{ tick:number, chamberIndex:number }`.
- **`lib/presence/presenceStore.ts`**: `pointer {x,y} (px + NDC), pointerActive, velocity, idleMs, isTouch, reducedMotion`.
- **`lib/tiers/tierStore.ts`**: `tier: 0|1|2`, `dpr`, `moteCount (8k/25k/60k)`, `post: "none"|"bloom"|"full"`, `transmission: "physical"|"low"|"full"`, runtime demotion via drei `PerformanceMonitor`.
- **`world/registry.ts`**: `registerDream(chamberIndex, fn)` — Idle Murmur dispatch (Moment 14).
- **Channels namespace convention:** `"listening.thread"`, `"gallery.spotlight"`, `"core.assembly"`, `"core.throughGlass"`, `"composition.bloom" | ".canvas" | ".hook" | ".liquid" | ".binding"`, `"range.charge" | ".fire" | ".ledger"`, `"observatory.overview"`, `"invitation.gravity" | ".pulseBack"`. Writers: GSAP timelines (scroll) and interaction handlers. Readers: world groups.
- **`config/motion.ts`** — the ease vocabulary (Direction §7): world eases `expo-long` arrivals / `sine` breathing (GSAP strings), UI springs `soft`, `quick`, `detent` (Framer), durations, the 6s breathe period, 3 % lens displacement cap, 20 s idle threshold.
- **`config/copy.ts`** — the 12-line deck + microcopy, verbatim from Direction §8. No new narrative lines, ever.

## 4 · Worker briefs (Wave B — parallel, exclusive dirs)

Every worker: read `docs/CREATIVE_DIRECTION.md` (their chambers + §4 moment cards + §6/§7), then implement world groups + a `lib/journey/timelines/<name>.ts` returning `{ build(sectionEl): ScrollTrigger-bound timeline }` that writes channels. Small files, shader-driven where counts are high, tier-aware via tierStore, all motion through config/motion.ts eases.

- **W1 · The Listening** — Thread reach + 4 tributaries (curve ribbons w/ flowing instanced light), garment Shoal (instanced glass slides, flocking, hover part/approach via raycast + `memory.hoveredSlides`), baseline hairline. Moments 3–4 incl. guard rails.
- **W2 · Gallery & Range** — pedestals, gold halo (the only gold), spotlight swing (Moment 5, light sweep + mote crowd swap via channels), Range beam deliberation/fire/impact + Ledger engraving (Moments 10, wall-etch shader/reveal). Aim always precedes fire at any scroll speed.
- **W3 · Core & Observatory** — the Core (transmission glass, breathing vertex displacement, interior veins), Assembly procession (Moment 6), ThroughGlass full-screen refraction pass (Moment 7, once, chromatic aberration only here), Observatory miniature organism + session traces from `memory` (Moment 12), distant constellations.
- **W4 · Composition Hall** — five beats: Audience Bloom (Moment 8, elliptical hand-placed rings), Living Canvas (Moment 9, frames assemble + fan of ranked variants), hook light-stylus write, liquid indigo channel + dial, the Binding (Moment 11 — the Brief binds, matte, never glowing).
- **W5 · Invitation & pricing** — the Lens (indigo transmission disc + caustic), Gravity Well drift (Moment 13, `invitation.gravity` feeds MoteField `uGather`), pulse-back on press (<2 s, then navigate), glass plate pricing drawer (DOM, framer, brief silhouette on hover), colophon drifting mote.
- **W6 · Still Edition** — the full designed sibling per Direction §10: editorial plates per chamber, identical copy deck, crossfades only, full parity (pricing, CTA, placards). No canvas, no GSAP.

## 5 · Core systems detail (Wave A, inline)

- **MoteField** — `THREE.Points`, one draw call, custom ShaderMaterial: per-point seed attributes; vertex shader computes drift (layered pseudo-curl), 6 s global breathe, cursor lensing (`uCursor`, capped), gravity gather (`uGather`), chamber params (density/warmth/current) interpolated from the active chamber; fragment: soft disc, warm/indigo tint by grade. Counts by tier.
- **CameraRig** — CatmullRom spline through chamber control points; `smoothedProgress` → arc position; look-at interpolation; cursor lens offset (small, spring-damped); never snaps.
- **Atmosphere** — fog + background + tone-mapping exposure + key/fill lights all driven by `grade`; the two dark passages are deep indigo `#0B0B1A`, never black.
- **Post** — tier-gated: none / bloom / bloom+DOF; ChromaticAberration mounted only while `core.throughGlass > 0`.
- **JourneyScroll** — registers master ScrollTrigger + CSS-var mirror (`--lumen-grade`, ink/paper interpolation) + velocity tracking + dwell bookkeeping.
- **FirstBreath (Moment 1)** — SSR-rendered overlay; client waits for fonts + first canvas frame; motes condense from blur; wordmark assembles from motes (text-sampled targets) ~1 s then disperses; session-repeat visitors bypass in <1 s (sessionStorage flag). No spinner anywhere.
- **InstrumentPanel** — frosted strip: wordmark, JourneyThread progress hairline, ChamberIndex (Framer shared-layout unfold; anchor jumps double as keyboard/a11y landmarks), Sound toggle (off by default), Still toggle, "Open the instrument" → https://app.omnitarget.co/.
- **DebugHud** — `?hud=1` only: fps, tier, chamber, progress, active channels. Never visible by default.

## 6 · Accessibility & performance budgets

- `prefers-reduced-motion` → Still Edition (full parity), also a visible toggle. WebGL failure → Still Edition. JS on the server → semantic DOM either way.
- Keyboard: native scroll; ChamberIndex = landmark jump nav; all interactive elements real buttons/links; `:focus-visible` rendered as light (indigo outline, ≥3:1). Canvas `aria-hidden`; decorative motion never conveys sole meaning — placards carry the narrative textually.
- Contrast: graphite on atelier white ≥ 12:1; indigo `#3730A3` on white ≥ 8:1; passage ink `#EAE8E1` on `#0B0B1A` ≥ 12:1.
- Budgets: 60 fps target tier-2 hardware; DPR clamps [1–1.25]/[1–1.5]/[1–2]; instancing everywhere counts exceed ~50; zero per-frame React state in the hot path (stores read transiently); post effects tier-gated; `PerformanceMonitor` demotes tier live; textures generated procedurally (no heavy downloads); lazy chunks: world code split behind First Breath.
- Verification gates per phase: `npm run build` (SSR + client) green, `npx tsc --noEmit` green, eslint clean on new dirs, dev-server boot, HUD fps sanity, reduced-motion smoke (still mode), keyboard walk of panel + pricing + CTA.

## 7 · Phase mapping (user's 10-phase program)

| User phase | Where it lands |
|---|---|
| 1 Analysis & plan | This document |
| 2 Architecture & folders | Wave A scaffold (`experience/` tree, contracts, stores, config) |
| 3 Core page structure | Track + chamber sections + placards + panel + typography/tokens |
| 4 R3F | Wave A world spine + Wave B workers W1–W5 |
| 5 GSAP | JourneyScroll master + per-chamber timelines (Wave B) |
| 6 Framer Motion | Placard/ panel/ pricing micro-interactions (Wave A + W5) |
| 7 Cursor engine | presence store + MoteField/CameraRig lensing + magnetic UI (Wave A + C) |
| 8 Responsive | Wave D: portrait camera framing, touch attend-gestures, chamber length retune |
| 9 Performance | tiers (Wave A) + Wave D audit: chunks, draw calls, memory, scheduling |
| 10 Accessibility | modes (Wave A) + W6 Still Edition + Wave D audit |

Execution order: **Wave A** (core spine, inline) → **Wave B** (6 parallel workers) → **Wave C** (integration: wiring channels, Idle Murmur dreams, memory traces, First Breath wordmark, grade tuning) → **Wave D** (responsive/perf/a11y polish + final engineering review against Direction checklists).

## 8 · Dependencies to add

`three`, `@types/three` (dev), `@react-three/fiber@^9`, `@react-three/drei@^10`, `@react-three/postprocessing`, `postprocessing`, `gsap@^3.13`, `framer-motion@^12`, `zustand@^5`. Fonts: extend the existing Google Fonts link with Playfair Display italics (the machine writes in italic). New npm script: `typecheck`.
