import { createFileRoute, Link } from "@tanstack/react-router";
import { Colophon } from "../experience/ui/chrome/Colophon";
import { Logo } from "../components/landing/Logo";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="lumen min-h-screen selection:bg-primary/30 selection:text-primary-foreground">
      <header className="absolute left-0 right-0 top-0 z-50 px-4 py-6 sm:px-6 lg:px-12">
        <Link to="/">
          <Logo
            size={28}
            wordmarkClassName="font-serif text-xl font-bold tracking-tight text-[var(--lx-ink)]"
          />
        </Link>
      </header>
      <main className="relative mx-auto max-w-4xl px-4 py-32 sm:px-6 sm:py-40">
        <div className="lx-spotlight" style={{ opacity: 0.65 }} />

        <h1 className="mb-4 font-serif text-3xl text-[var(--lx-ink)] sm:text-5xl">Privacy Policy</h1>
        <p className="mb-12 font-mono text-sm text-[var(--lx-ink-faint)]">Last updated: July 6, 2026</p>

        <div className="prose break-words prose-p:text-[var(--lx-ink-soft)] prose-headings:text-[var(--lx-ink)] prose-a:text-[var(--lx-accent)] max-w-none space-y-8 font-sans leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-[var(--lx-ink)]">1. Introduction</h2>
            <p>
              Omni Target (&quot;we,&quot; &quot;our,&quot; or &quot;the App&quot;) provides AI-powered pre-spend intelligence to e-commerce merchants using Shopify. This Privacy Policy explains what data we access, how we store and use it, and your rights regarding that data when you install and use the App within your Shopify store environment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--lx-ink)]">
              2. Information We Collect via Shopify API
            </h2>
            <p>
              When you install the App and connect your store, we access the following via Shopify&apos;s OAuth framework:
            </p>
            <ul className="list-disc pl-4 sm:pl-6 text-[var(--lx-ink-soft)] space-y-4 mt-4">
              <li>
                <strong>Store and Account Data:</strong> Store name, store email, domain, currency, and Shopify access/refresh tokens required to maintain the connection.
              </li>
              <li>
                <strong>Order and Product Data:</strong> A snapshot of your store&apos;s order history, product catalog, and sales performance data, including order sequencing information (e.g., which products were purchased by first-time buyers), used to compute gateway product classifications and generate Campaign Briefs. This snapshot may include data associated with individual customer orders as recorded in your Shopify store.
              </li>
              <li>
                <strong>Contact Information:</strong> Information you provide during account setup or support communications.
              </li>
              <li>
                <strong>Advertising Platform Data:</strong> If you connect a Meta Ads account, we access your ad account ID, pixel ID, business ID, and associated access tokens to support campaign brief generation and, where applicable, performance tracking.
              </li>
            </ul>
            <p className="mt-4">
              We do not use individually-identifiable customer data from your store to build customer profiles, and we do not sell customer or store data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--lx-ink)]">3. How We Use Your Information</h2>
            <p>We process store and order data to:</p>
            <ul className="list-disc pl-4 sm:pl-6 text-[var(--lx-ink-soft)] space-y-2 mt-4">
              <li>
                Generate Campaign Briefs, including gateway product identification, targeting recommendations, and ad budget guidance.
              </li>
              <li>
                Operate and maintain your account dashboard.
              </li>
              <li>
                Improve our internal models using aggregated and/or de-identified data across our merchant base.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--lx-ink)]">4. Data Storage and Retention</h2>
            <p>
              Your store snapshot, including order and product data, is stored in our systems and refreshed each time your store reconnects or resyncs. This snapshot is retained — and is retrievable by us — from the time of connection until it is overwritten by a subsequent sync or deleted upon uninstallation. It is not deleted immediately after each computation. If your store remains connected without resyncing, the most recent snapshot remains stored on our systems for that period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--lx-ink)]">
              5. Shopify Mandatory Webhooks and Data Erasure
            </h2>
            <p>We comply with Shopify&apos;s Mandatory Privacy Webhooks:</p>
            <ul className="list-disc pl-4 sm:pl-6 text-[var(--lx-ink-soft)] space-y-4 mt-4">
              <li>
                <strong>Shop Data Erasure (shop/redact):</strong> Upon uninstallation, your store snapshot and associated account data are deleted from our production database within 48 hours of receiving the webhook.
              </li>
              <li>
                <strong>Customer Data Erasure (customers/redact):</strong> Any customer-linked order data contained within your store snapshot is deleted as part of the same erasure process described above. We do not maintain separate individual customer profiles outside this snapshot.
              </li>
              <li>
                <strong>Customer Data Requests (customers/data_request):</strong> We will inform Shopify and cooperate with any merchant request regarding whether customer-linked order data was processed in generating your Campaign Briefs.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--lx-ink)]">6. Third-Party Sharing</h2>
            <p>We do not sell your data. We share data only with:</p>
            <ul className="list-disc pl-4 sm:pl-6 text-[var(--lx-ink-soft)] space-y-2 mt-4">
              <li>
                Infrastructure providers (database hosting, cloud compute) necessary to operate the App, bound by confidentiality and data processing agreements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--lx-ink)]">7. Security</h2>
            <p>
              We apply access controls and encryption provided by our infrastructure providers to protect stored data, including store access tokens.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--lx-ink)]">8. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you (or your customers, via you as data controller) may have rights to access, correct, or request deletion of data processed by the App. Requests can be made via Shopify&apos;s data request mechanisms or by contacting us directly at{" "}
              <a href="mailto:support@omnitarget.co" className="underline hover:text-[var(--lx-accent)]">
                support@omnitarget.co
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--lx-ink)]">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be communicated via email/in-app notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--lx-ink)]">10. Contact Us</h2>
            <p>
              For privacy or data access questions, contact us at{" "}
              <a href="mailto:support@omnitarget.co" className="underline hover:text-[var(--lx-accent)]">
                support@omnitarget.co
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Colophon />
    </div>
  );
}
