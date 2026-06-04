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
