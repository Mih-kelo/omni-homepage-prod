import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — omni target" },
      { name: "description", content: "The terms that govern your use of omni target." },
      { property: "og:title", content: "Terms of Service — omni target" },
      { property: "og:description", content: "The terms that govern your use of omni target." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: May 13, 2026</p>

          <div className="mt-10 space-y-8 text-foreground/90">
            <Section title="The service">
              <p>
                omni target reads data from your connected Shopify store and produces Meta Ads briefs.
                We do not place ads, charge media spend, or operate your ad accounts on your behalf.
              </p>
            </Section>

            <Section title="Your account">
              <p>
                You're responsible for keeping your login credentials safe and for the activity that
                happens under your account. You must own — or be authorised to manage — any store you
                connect.
              </p>
            </Section>

            <Section title="Acceptable use">
              <p>
                Don't use omni target to violate Shopify's or Meta's terms, infringe third-party
                rights, or attempt to reverse-engineer our service. We may suspend accounts that abuse
                the platform.
              </p>
            </Section>

            <Section title="Billing">
              <p>
                Subscriptions are billed monthly in advance. Cancel anytime — your plan stays active
                until the end of the billing period. Refunds are handled case by case.
              </p>
            </Section>

            <Section title="No guarantees">
              <p>
                Briefs are recommendations based on your store data. Ad performance depends on factors
                outside our control. We don't guarantee specific revenue or ROAS outcomes.
              </p>
            </Section>

            <Section title="Changes">
              <p>
                We may update these terms as the product evolves. Material changes will be announced
                via email at least 14 days before they take effect.
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
