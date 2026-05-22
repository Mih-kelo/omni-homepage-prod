import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — omni target" },
      { name: "description", content: "How omni target collects, uses, and protects your Shopify store data." },
      { property: "og:title", content: "Privacy Policy — omni target" },
      { property: "og:description", content: "How omni target collects, uses, and protects your Shopify store data." },
    ],
  }),
  component: PrivacyPage,
});


function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: May 13, 2026</p>

          <div className="prose prose-invert mt-10 space-y-8 text-foreground/90">
            <Section title="What we collect">
              <p>
                When you connect your Shopify store, omni target reads product, order, customer, and
                collection data through Shopify's official API. We also collect basic account
                information (email, store URL) and product usage events.
              </p>
            </Section>

            <Section title="How we use it">
              <p>
                Your store data is used solely to generate Meta Ads briefs for your account. We do not
                sell, rent, or share your data with third parties for marketing purposes.
              </p>
            </Section>

            <Section title="Where it's stored">
              <p>
                Data is stored on encrypted infrastructure in the EU. Access is restricted to
                authorised engineers and only used for support, debugging, and product improvement.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                You can export or delete your data at any time from your account settings. Disconnecting
                your Shopify store revokes our access immediately.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions? Email <a href="mailto:hello@omnitarget.co" className="text-primary underline-offset-4 hover:underline">hello@omnitarget.co</a>.
              </p>
            </Section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 leading-relaxed text-foreground/80">{children}</div>
    </section>
  );
}
