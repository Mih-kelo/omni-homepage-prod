import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ColdTrafficParadox } from "@/components/landing/ColdTrafficParadox";
import { WhatYouGet } from "@/components/landing/WhatYouGet";
import { WhoItsFor } from "@/components/landing/WhoItsFor";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Omni Target — Pre-spend Shopify intelligence for fashion brands" },
      {
        name: "description",
        content:
          "Omni Target reads your Shopify store and generates a complete, data-backed Meta Ads brief. Audiences, hero products, budget — derived from your real store data.",
      },
      { property: "og:title", content: "Omni Target — Pre-spend Shopify intelligence" },
      {
        property: "og:description",
        content:
          "Know exactly what to run on Meta. Before you spend. A Shopify-native intelligence tool for fashion brands.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <HowItWorks />
      <ColdTrafficParadox />
      <WhatYouGet />
      <WhoItsFor />
      <Pricing />
      <Footer />
    </main>
  );
}
