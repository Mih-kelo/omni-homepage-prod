import { createFileRoute, Link } from '@tanstack/react-router';
import { Footer } from '../components/landing/Footer';
import { Logo } from '../components/landing/Logo';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <header className="absolute left-0 right-0 top-0 z-50 px-6 py-6 lg:px-12">
        <Link to="/">
          <Logo size={28} wordmarkClassName="font-serif text-xl font-bold tracking-tight text-white" />
        </Link>
      </header>
      <main className="relative mx-auto max-w-4xl px-6 py-32 sm:py-40">
        <div className="hero-glow"></div>
        
        <h1 className="mb-4 font-serif text-4xl text-white sm:text-5xl">Privacy Policy</h1>
        <p className="mb-12 font-mono text-sm text-white/50">Last updated: May 26, 2026</p>

        <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white/90 prose-a:text-[var(--primary-light)] max-w-none space-y-8 font-sans leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white/90">1. Introduction</h2>
            <p>
              Welcome to Omni Target. We respect your privacy and are committed to protecting the data of our merchants. This Privacy Policy explains how Omni Target (&quot;we&quot;, &quot;our&quot;, or &quot;the App&quot;) collects, uses, and discloses information when you install and use our application within your Shopify store environment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">2. Information We Collect via Shopify API</h2>
            <p>
              When you install the App, we automatically access certain types of information from your Shopify store via Shopify's OAuth framework to provide our intelligence services:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
              <li><strong>Store Data:</strong> Merchant name, store email, shop currency, and store domain.</li>
              <li><strong>Store Performance Intelligence:</strong> Historical sales performance patterns, product metadata, and inventory analytics required to generate strategic creative marketing briefs.</li>
              <li><strong>Contact Information:</strong> Information provided during account setup or support communications (e.g., email address).</li>
            </ul>
            <p className="mt-4">
              We do not collect, store, or process personal identifiable customer data (PII) beyond the aggregated backend metrics required for store analysis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">3. How We Use Your Information</h2>
            <p>We process your store data strictly for the following purposes:</p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
              <li>To operate, maintain, and render the analytics dashboard inside the Omni Target platform.</li>
              <li>To generate structured, data-backed ad brief and marketing recommendations for your brand.</li>
              <li>To improve our internal data analysis models using anonymized, aggregated store data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">4. Data Retention and Shopify Mandatory Webhooks</h2>
            <p>
              We retain your store data only for as long as you keep the Omni Target App installed.
            </p>
            <p className="mt-4">
              The App strictly complies with Shopify’s Mandatory Privacy Webhooks. In accordance with global data protection laws (including GDPR and CCPA), when Shopify issues a data erasure request, we respond automatically within mandatory timelines:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
              <li><strong>Customer Data Erasure (customers/redact):</strong> We do not store individual customer profiles; however, any corresponding cached log identifiers are completely purged.</li>
              <li><strong>Shop Data Erasure (shop/redact):</strong> Within 48 hours of uninstalling the App, all stored performance data associated with your store is permanently deleted from our databases.</li>
              <li><strong>Customer Data Requests (customers/data_request):</strong> We cooperate fully with Shopify to provide any analytical data points if requested by a merchant.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">5. Security and Third Parties</h2>
            <p>
              We secure your store intelligence using industry-standard encryption protocols. We do not sell your data. Data is shared only with secure cloud infrastructure providers (e.g., hosting) necessary to run the App, all bound by strict data processing confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">6. Contact Us</h2>
            <p>
              For any privacy or data access questions, contact us at <a href="mailto:support@omnitarget.co" className="underline hover:text-white">support@omnitarget.co</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
