/**
 * The complete text content of the experience — carried VERBATIM from the
 * production landing components (Hero, HowItWorks, ColdTrafficParadox,
 * WhatYouGet, WhoItsFor, Pricing, BriefTerminal, Footer). Per direction,
 * the existing app copy is the single source of truth for words; the
 * chambers stage this copy cinematically. No new narrative copy is invented.
 */

export const APP_URL = "https://app.omnitarget.co/signup";
export const SHOPIFY_APP_URL = "https://apps.shopify.com/omni-target";

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
  badge: "Pre-Spend Intelligence · Identify Your Gateway Product",

  hero: {
    titleA: "Stop wasting money on Meta",
    titleB: "ads that don't get sales.",
    body: "",
    ctaPrimary: "Scan Your Store Free",
    ctaSecondary: "See how it works →",
    ctaNote: "Official Shopify App · 30-Sec Read-Only Scan · 1 Free Brief on Install",
    shopifyBadge: "Install on Shopify App Store",
  },

  howItWorks: {
    eyebrow: "How it works",
    titleA: "From store data to launch-ready ad",
    titleB: "in three simple steps.",
    steps: [
      {
        n: "01",
        t: "Install the free app",
        d: "Takes 30 seconds. 1 click on Shopify. 100% safe and read-only.",
      },
      {
        n: "02",
        t: "See what strangers actually buy",
        d: "We scan your past orders to find the 1 item brand-new customers buy on their first visit.",
      },
      {
        n: "03",
        t: "Copy-paste your ad and launch",
        d: "Get your gateway product, 3 scroll-stopping video hooks, and exact daily budget. Ready to run.",
      },
    ],
  },

  paradox: {
    eyebrow: "The #1 Mistake",
    titleA: "What repeat customers buy",
    titleB: "isn't what strangers buy.",
    bestseller: {
      label: "Store Bestseller",
      name: "Heavyweight Fleece Hoodie",
      rows: [
        ["Who buys it", "88% Repeat Customers"],
        ["Stranger conversion", "Low (High drop-off)"],
        ["Acquisition fit", "Poor (Loses ad spend)"],
      ] as const,
      verdict: "❌ Strangers on Meta won't buy this on first click",
    },
    gateway: {
      label: "Gateway Product",
      name: "Everyday Cotton Tee",
      rows: [
        ["Who buys it", "72% First-Time Buyers"],
        ["Stranger conversion", "High (Instant trust)"],
        ["Acquisition fit", "Maximum (Profitable cold traffic)"],
      ] as const,
      verdict: "✅ The 1 item strangers trust enough to buy immediately",
    },
    closing:
      "Meta finds the audience. Omni Target finds the one gateway product they'll actually buy.",
  },

  range: {
    eyebrow: "Proof before spend",
    context:
      "Average performance benchmark when cold Meta traffic is directed to an algorithmic gateway product rather than guessing on an organic bestseller.",
    roas: {
      label: "Cold-traffic ROAS",
      note: "Every $1 of cold-traffic spend returned $2.40 — from audiences who had never met the brand.",
    },
    firstTime: {
      label: "First-time buyers",
      note: "Nearly three of every four orders came from brand-new customers, not returning ones.",
    },
  },

  whatYouGet: {
    eyebrow: "The Ad Plan",
    titleA: "Everything you need to launch.",
    titleB: "Nothing to guess.",
    body: "No staring at a blank screen wondering what to write, no stressing over what to film, and no hours of spreadsheet digging. You get the 1 product new buyers actually want, high-converting ad copy, 3 video hook scripts ready to shoot, and your exact daily budget.",
    items: [
      "The 1 gateway product strangers actually buy",
      "Ready-to-run ad copy & headline",
      "3 scroll-stopping video hooks",
    ],
    adPreview: {
      brand: "Omni Dev",
      handle: "omni-dev.myshopify.com",
      productName: "Everyday Cotton Tee",
      primaryText:
        "Some tees just sit on you. This one moves with you, hugging every curve without clinging or creasing. Get your hands on the stretchy, second-skin cotton before it's everywhere.",
      headline: "The Cotton Everyone Will Be Talking About",
      linkDescription:
        "Fine stitching detail runs along the sleeves and hem for a finished, tailored edge.",
      cta: "Shop Now",
    },
    hooks: [
      {
        num: "1",
        label: "The Problem",
        hook: "Tees that ride up? Not this one.",
        cue: "Split screen: baggy shapeless tee vs fitted cotton jersey tee that stays put.",
        script:
          "Tired of t-shirts that bunch up the second you move? This one is cut to move with you, not against you.",
      },
      {
        num: "2",
        label: "Craft & Quality",
        hook: "The cotton everyone's obsessed with.",
        cue: "Macro close-up on stitching detail, slow-motion stretch showing fabric snap back.",
        script:
          "It's just cotton, until you feel this one — stretchy, lightweight, and soft enough to explain the 5-star reviews.",
      },
      {
        num: "3",
        label: "Fit & Style",
        hook: "The tee that fits like it was made for you.",
        cue: "Natural daylight walking shot showing off the body-hugging silhouette.",
        script:
          "This isn't just a basic tee — it's the one that makes you look twice in the mirror before you even leave the house.",
      },
    ],
    settings: {
      budget: "Calculated for You",
      target: "New Customers Only",
      goal: "Sales (Website Purchases)",
      firstTimePct: "72%",
    },
  },

  brief: {
    window: "brief.omnitarget",
    rows: [
      { k: "store", v: "Pilot Brand (NDA)" },
      { k: "gateway", v: "Product B", highlight: true },
      { k: "format", v: "Manual Sales (AI Guided)" },
      { k: "hook 01", v: '"The one piece that quietly outsells everything."' },
      { k: "optimize", v: "Add to Cart · 7d click" },
      { k: "budget", v: "$42 / day · scale at ROAS 1.8" },
    ] as ReadonlyArray<BriefRow>,
    generated: "generated in 4.2s",
  },

  whoItsFor: {
    eyebrow: "Who it's for",
    titleA: "Built for modern Shopify brands",
    titleB: "and growth teams.",
    tags: [
      "DTC Store Owners",
      "Growth Teams & Agencies",
      "Stores with Multiple Products",
      "Spending $500–$25k/mo on Meta",
      "Tired of Guessing What Converts",
    ],
    disclaimer:
      "For store owners tired of burning budget on products that don't convert, and growth teams who want to deliver high-converting Meta briefs without 20 hours of spreadsheet digging.",
  },

  pricing: {
    eyebrow: "Start Free",
    titleA: "Get your first brief free.",
    titleB: "Upgrade only when you're ready.",
    plans: [
      {
        name: "Free Plan",
        slug: "free",
        count: 1,
        price: "Free",
        usdPrice: 0,
        period: "",
        desc: "",
        features: [
          "1 free ad brief on install",
          "Identify your #1 gateway product",
          "3 ready-to-use ad angles & hooks",
          "Step-by-step Meta setup guide",
        ],
        cta: "Start Free",
        featured: false,
      },
      {
        name: "Starter Pack",
        slug: "starter",
        count: 3,
        price: "$9",
        usdPrice: 9,
        period: "one-time charge",
        desc: "",
        features: [
          "3 ad briefs ($3.00 each)",
          "Test your top 3 gateway products",
          "3 custom video hooks per item",
          "Credits valid for 12 months",
        ],
        cta: "Get Starter",
        featured: false,
      },
      {
        name: "Growth Pack",
        slug: "growth",
        count: 10,
        price: "$25",
        usdPrice: 25,
        period: "one-time charge",
        desc: "",
        features: [
          "10 ad briefs ($2.50 each)",
          "Perfect for new collection drops",
          "Save 17% vs Starter Pack",
          "Everything in Starter Pack",
        ],
        cta: "Get Growth Pack",
        featured: true,
      },
      {
        name: "Scale Pack",
        slug: "scale",
        count: 30,
        price: "$59",
        usdPrice: 59,
        period: "one-time charge",
        desc: "",
        features: [
          "30 ad briefs ($1.97 each)",
          "Cover your entire store catalog",
          "Best value (save 34%)",
          "Everything in Growth Pack",
        ],
        cta: "Get Scale Pack",
        featured: false,
      },
    ],
    recommended: "Most Popular",
    note: "1 credit = 1 complete Meta ad brief. Buy once, use anytime. Credits are valid for 12 months and nothing bills automatically.",
    billing: "Billed safely through your official Shopify store account. Credits are valid for 12 months.",
  },

  footer: {
    tagline: "Pre-spend intelligence for Shopify merchants on Meta.",
    privacy: "Privacy",
    terms: "Terms",
    shopifyApp: "Shopify App Store",
  },
} as const;
