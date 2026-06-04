# Omni Target — Landing Page Build Plan

A single-page, editorial dark landing page built to the exact spec provided. No invented sections, no generic SaaS tropes.

## Structure

Single route at `/` (`src/routes/index.tsx`) replacing the placeholder. Sections composed as small components under `src/components/landing/`:

```
src/components/landing/
  Background.tsx        // line grid + top-right radial glow
  Hero.tsx              // Section 1
  BriefTerminal.tsx     // mockup terminal (right side of hero)
  HowItWorks.tsx        // Section 2 (light)
  ColdTrafficParadox.tsx// Section 3 (dark, two cards + VS)
  WhatYouGet.tsx        // Section 4 (dark, checklist)
  WhoItsFor.tsx         // Section 5 (light, pills)
  Pricing.tsx           // Section 6 (dark, 3 cards)
  Footer.tsx            // Section 7
```

## Design tokens (`src/styles.css`)

Replace the default theme with the spec colors, converted to `oklch` and registered both as CSS vars and in `@theme inline` so Tailwind utilities work:

- `--background` `#08080f`
- `--foreground` `#ffffff`
- `--muted-foreground` `rgba(255,255,255,0.48)`
- `--border` `rgba(255,255,255,0.07)`
- `--primary` `#6d28d9`, `--primary-mid` `#8b5cf6`, `--primary-light` `#c4b5fd`
- `--gold` `#c9913a`, `--gold-light` `#f0c674`
- `--paper` `#f4f2ed`
- `--terminal-bg` `#0c0c18`

Backgrounds:

- Body line grid: `linear-gradient(rgba(109,40,217,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,0.05) 1px, transparent 1px)` at `56px 56px`.
- Hero radial glow: absolutely positioned div, top-right, `radial-gradient(circle, rgba(109,40,217,0.22), transparent 70%)`, ~900px, blurred.

## Typography

Load via Google Fonts `<link>` in `__root.tsx` head:

- Playfair Display 700/900 (headlines)
- Epilogue 400/500/600 (body/UI)
- JetBrains Mono 400/500 (mono labels, terminal)

Expose as Tailwind families through `@theme inline`:

- `--font-serif: 'Playfair Display', serif`
- `--font-sans: 'Epilogue', system-ui, sans-serif`
- `--font-mono: 'JetBrains Mono', monospace`

Apply Epilogue as the default body font.

## Section-by-section commitments

**Hero** — full viewport, left-aligned, two-column grid on `lg`. Mono pill badge ("SHOPIFY STORE INTELLIGENCE"). Playfair headline 84px desktop (clamps down on mobile) with "Before you spend." on its own line in `--primary-mid`. Subhead Epilogue 18px, max-width 480px, 48% white. Primary button solid `#6d28d9`, secondary text link "See how it works →" at 60% opacity. Right column: `BriefTerminal`.

**BriefTerminal** — `#0c0c18` card, `rgba(109,40,217,0.20)` border, 16px radius. Header row with red/yellow/green dots + filename `brief.omnitarget`. Body is a monospace key/value list:

```
store     →  maison-rive.com
gateway   →  Silk Camisole — Ivory
format    →  UGC carousel, 4 frames
hook_1    →  "The one piece that quietly outsells everything."
optimize  →  Purchases · 7d click
budget    →  $42 / day · scale at ROAS 1.8
```

Gateway row highlighted with `#f0c674` text and a thin gold left border. Keys at 28% white, values at 82%.

**How it works** — `#f4f2ed` section, foreground `#08080f`. Three columns, each: big Playfair number in `--primary` (~72px), Epilogue 600 title, grey description. Thin vertical dividers between columns on desktop.

**Cold Traffic Paradox** — dark. Centered Playfair headline. Two cards on a grid with a centered "VS" mono badge in the gap. Left card: muted `#0c0c18`, 3px left border in muted red `#a14545`, "ORGANIC BESTSELLER" mono label, product name, "First-time buyers: 12%", verdict tag "RETENTION PIECE". Right card: subtle purple tint (`rgba(109,40,217,0.08)` bg), 3px left border `--primary`, "GATEWAY PRODUCT", product name, "First-time buyers: 64%", verdict tag "ACQUISITION ENGINE". Below: one-line italic gold insight.

**What you get** — dark. Two-column wrapper: short Playfair eyebrow on left, vertical checklist on right. Each item: 18px purple check glyph + Epilogue 17px white text + thin divider line below. Exactly the 5 items listed.

**Who it's for** — `#f4f2ed`, centered. Small mono eyebrow "WHO IT'S FOR". Playfair headline. Pill tags rendered as bordered chips with `·` separators between them as styled inline-flex. Sub copy in grey beneath.

**Pricing** — dark, three cards. Cards are flat with `--border` outlines, 16px radius, generous padding. Growth (middle) gets `--primary` border + slight `translateY(-8px)` + small mono tag "RECOMMENDED" inside the card (no banner). Price uses Playfair in `--primary-mid`. CTA buttons match hero styling (primary on Growth, outlined ghost on the others).

**Footer** — single thin border-top in `--border`. Three-column flex: wordmark left (Playfair "Omni Target"), `Privacy · Terms` center in Epilogue 14px 48% white, right-aligned mono small text exactly as specified.

## Animation / interaction

Restraint only. No scroll libraries. CSS only:

- Hero content: opacity/translate-y fade-in on mount via a small `motion-safe` keyframe.
- Buttons: 150ms background transition.
- Terminal gateway row: subtle 2s pulse on the gold accent border.

## Things explicitly omitted (per spec)

No testimonials, no logo bar, no feature-icon grid, no gradient text, no glassmorphism, no hero photo/video, no scroll-triggered reveals beyond the initial hero fade, no "MOST POPULAR" banner.

## Technical notes

- All colors written as CSS variables in `src/styles.css`; components use Tailwind semantic classes (`bg-background`, `text-foreground`, `border-border`) or `text-[var(--primary-mid)]` for the bespoke purples/gold. No raw hex in component files.
- Fonts loaded via `<link rel="preconnect">` + stylesheet entries added to the `links` array in `__root.tsx`'s `head()`.
- SEO: update root `head()` with title "Omni Target — Pre-spend Shopify intelligence for fashion brands", matching meta description, og tags. Single `<h1>` on hero.
- Responsive: hero stacks at `<lg`, headline clamps `clamp(44px, 8vw, 84px)`, terminal stays readable at small sizes with horizontal scroll if needed.
- Accessibility: buttons get accessible names, decorative grid/glow marked `aria-hidden`, color contrast verified for the 48% white body text on `#08080f`.
