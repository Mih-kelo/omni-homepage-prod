/**
 * The complete text content of the experience — carried VERBATIM from the
 * production landing components (Hero, HowItWorks, ColdTrafficParadox,
 * WhatYouGet, WhoItsFor, Pricing, BriefTerminal, Footer). Per direction,
 * the existing app copy is the single source of truth for words; the
 * chambers stage this copy cinematically. No new narrative copy is invented.
 */

export const APP_URL = "https://app.omnitarget.co/";

export interface ParadoxCard {
  label: string;
  name: string;
  rows: ReadonlyArray<readonly [string, string]>;
  verdict: string;
}

export interface BriefRow {
  k: string;
  v: string;
  highlight?: boolean;
}

export const COPY = {
  badge: "Shopify store intelligence",
  beta: "v1.0 · private beta",

  hero: {
    titleA: "Pre-Spend Intelligence for Shopify",
    titleB: "Fashion Brands.",
    body: "Shopify knows what sells. Meta knows who buys. They don't talk pre-spend. Omni Target bridges that gap — turning real store data into a ready-to-launch Meta Ads brief in three minutes.",
    ctaPrimary: "Open Omni Target",
    ctaSecondary: "See how it works →",
  },

  howItWorks: {
    eyebrow: "How it works",
    titleA: "From store to brief",
    titleB: "in three steps.",
    steps: [
      {
        n: "01",
        t: "Connect Shopify",
        d: "One-click OAuth. Read-only access to orders, products, customers, and collections.",
      },
      {
        n: "02",
        t: "Intelligence engine reads your store",
        d: "Identifies gateway products dynamically, calculates first-time buyer ratios, maps repeat purchase patterns — all relative to your store's own baseline.",
      },
      {
        n: "03",
        t: "Get your complete Meta brief",
        d: "Gateway product, audience profile, creative format prescription, behavior-derived hooks, correct optimization event, and dynamic budget — exported as a branded PDF.",
      },
    ],
  },

  paradox: {
    eyebrow: "The cold traffic paradox",
    titleA: "Your bestseller is not",
    titleB: "your gateway product.",
    bestseller: {
      label: "Organic bestseller",
      name: "Product A",
      rows: [
        ["First-time buyers", "12%"],
        ["Average order value", "$640"],
        ["Cold-traffic ROAS", "0.6x"],
      ] as const,
      verdict: "Retention piece",
    },
    gateway: {
      label: "Gateway product",
      name: "Product B",
      rows: [
        ["First-time buyers", "64%"],
        ["Average order value", "$110"],
        ["Cold-traffic ROAS", "2.4x"],
      ] as const,
      verdict: "Acquisition engine.",
    },
    closing:
      "The product that converts your existing audience is rarely the one that earns you a new one.",
  },

  whatYouGet: {
    eyebrow: "What you get",
    titleA: "A complete brief.",
    titleB: "Nothing missing.",
    body: "Everything a media buyer needs on day one — derived from your store, not from a template.",
    items: [
      "Audiences that match your actual buyer profile",
      "Creative angles ranked by likelihood to convert",
      "Gateway product identified from your real store data",
      "Behavior-derived hooks — no reviews needed",
      "Budget split calibrated to your store's order volume",
    ],
  },

  brief: {
    window: "brief.omnitarget",
    rows: [
      { k: "store", v: "Pilot Brand (NDA)" },
      { k: "gateway", v: "Product B", highlight: true },
      { k: "format", v: "UGC carousel, 4 frames" },
      { k: "hook 01", v: '"The one piece that quietly outsells everything."' },
      { k: "optimize", v: "Purchases · 7d click" },
      { k: "budget", v: "$42 / day · scale at ROAS 1.8" },
    ] as ReadonlyArray<BriefRow>,
    generated: "generated in 4.2s",
  },

  whoItsFor: {
    eyebrow: "Who it's for",
    titleA: "Built for a specific kind",
    titleB: "of brand operator.",
    tags: [
      "Fashion & lifestyle",
      "Shopify-native",
      "$5k–$100k/mo revenue",
      "DTC operators",
      "Brand-led teams",
    ],
    disclaimer:
      "Not for you if you sell B2B, run on a non-Shopify stack, or want a tool that pushes a Buy Now button on its own.",
  },

  pricing: {
    eyebrow: "Simple Pricing",
    titleA: "Flexible credit packs.",
    titleB: "No recurring subscriptions.",
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "",
        desc: "1 campaign credit on install, no card required",
        features: [] as string[],
        cta: "Start Free",
        featured: false,
      },
      {
        name: "Starter Pack",
        price: "$39",
        period: "one-time",
        desc: "Perfect for testing your first collection and identifying initial winners.",
        features: [
          "5 Campaign Briefs",
          "Store Intelligence Insights",
          "Creative Angle Blueprints",
          "Valid for 12 months",
        ],
        cta: "Get Starter",
        featured: false,
      },
      {
        name: "Growth Pack",
        price: "$99",
        period: "one-time",
        desc: "For growing brands scaling multiple styles and running weekly tests.",
        features: [
          "15 Campaign Briefs",
          "Everything in Starter Pack",
          "Ideal for testing 3+ products",
          "Save 15% per brief ($6.60 / brief)",
        ],
        cta: "Get Growth Pack",
        featured: true,
      },
      {
        name: "Scale Pack",
        price: "$179",
        period: "one-time",
        desc: "High volume for massive collection drops and rapid creative testing.",
        features: [
          "30 Campaign Briefs",
          "Everything in Growth Pack",
          "Ideal for full catalog coverage",
          "Best Value ($5.96 / brief)",
        ],
        cta: "Get Scale Pack",
        featured: false,
      },
    ],
    recommended: "Recommended",
    billing:
      "All charges are billed safely in USD via the official Shopify Billing API. Credits are subject to a 12-month dormancy policy.",
  },

  footer: {
    tagline: "Built for fashion brands who are serious about Meta.",
    privacy: "Privacy",
    terms: "Terms",
  },
} as const;
