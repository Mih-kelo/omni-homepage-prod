# Omni-target Landing Site

A three-page marketing site with a confident, direct tone, styled after Linear/Raycast (deep near-black surface, violet accents, restrained motion, sharp typography).

## Pages

- `/` — Home (Hero, How it works, What you get, Who it's for, Pricing, Footer)
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service

All three share a header (logo + nav: How it works, Pricing, Privacy, Terms + "Open app" CTA) and footer (small print + Privacy/Terms links + CTA).

Every CTA links to `https://app.omnitarget.co` (external, opens in new tab).

## Design system

Update `src/styles.css` tokens (oklch):
- `--background`: near-black `#09090f`
- `--foreground`: soft white
- `--card` / `--popover`: subtly lifted surface (`#0f0f17`-ish)
- `--primary`: violet `#6366f1` range, `--primary-foreground`: white
- `--muted-foreground`: cool gray for body copy
- `--border`: low-contrast violet-tinged hairline
- Add `--gradient-primary` (violet → indigo) and `--shadow-glow` (soft violet bloom) for the hero accent and pricing-highlight card
- Force dark theme by default (apply `.dark` on `<html>` in `__root.tsx`, or set the `:root` values to the dark palette)
- Typography: Inter (system stack fallback), tight tracking on headings, generous line-height on body
- Sharp-ish radius (`--radius: 0.5rem`), thin 1px borders, no gradients on buttons except primary CTA

No stock photos. Visual interest from: subtle grid/dot background in hero, gradient orb glow behind headline, monospaced step numbers, hairline-bordered cards.

## Home sections

1. **Hero** — Eyebrow ("Shopify store intelligence"), H1 ("Know exactly what to run on Meta. Before you spend."), subhead (one sentence on reading store data → Meta Ads brief), primary CTA "Open Omni-target" → app.omnitarget.co, secondary text link "See how it works" → `#how`. Soft violet glow behind.
2. **How it works** (`#how`) — 3 numbered steps in a row: Connect Shopify → We read your store → Get a Meta Ads brief.
3. **What you get** — A mocked "brief" panel: audience targeting, creative angles, product picks, copy hooks, budget split. Rendered as a styled card with mono labels, not a real screenshot.
4. **Who it's for** — Short statement + 3-4 bullet chips (Fashion & lifestyle, Shopify-native, $10k–$500k/mo, DTC operators). Includes a "not for you if…" line for honesty/tone.
5. **Pricing** (`#pricing`) — 3 tiers in cards (e.g. Starter / Growth / Scale). Middle tier highlighted with violet border + glow. Each: price, one-line who-it's-for, 4–5 bullets, CTA → app.omnitarget.co. Final pricing copy will use sensible placeholders the user can edit.
6. **Footer** — Wordmark, short tagline, columns for Product (Open app, Pricing) and Legal (Privacy, Terms). Copyright line.

## Privacy & Terms pages

Standard long-form legal content as readable prose with semantic headings, scoped to the product description (Shopify data ingestion, Meta Ads brief generation, no ad spend on user's behalf, contact email placeholder). Each page has its own `head()` with unique title/description and renders inside the shared header/footer shell.

## SEO / metadata

Per-route `head()` in each route file:
- `/`: title "Omni-target — Shopify store intelligence for Meta Ads", matching description, og:title/og:description.
- `/privacy`: "Privacy Policy — Omni-target".
- `/terms`: "Terms of Service — Omni-target".

Single H1 per page, semantic sections, descriptive link text, viewport meta inherited from root.

## Technical notes

- TanStack Start file-based routes: create `src/routes/privacy.tsx` and `src/routes/terms.tsx`; replace the placeholder in `src/routes/index.tsx`.
- Add a shared `<SiteHeader />` and `<SiteFooter />` in `src/components/` and use them in each route (or wrap them in `__root.tsx` around `<Outlet />` — preferred so nav state is consistent).
- Use lucide-react icons sparingly (ArrowRight on CTA, Check on pricing bullets, small step glyphs).
- All colors via semantic tokens — no hardcoded hex in components.
- External CTA: `<a href="https://app.omnitarget.co" target="_blank" rel="noopener noreferrer">` (not `<Link>`).
- Dark theme only — set `<html class="dark">` in `__root.tsx` shell.
- No backend, no Lovable Cloud needed for this scope.

## Out of scope

- Auth, dashboards, real Shopify connection (those live in app.omnitarget.co).
- Blog, changelog, docs.
- Cookie banner / analytics (can be added later).
