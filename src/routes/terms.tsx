import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "../components/landing/Footer";
import { Logo } from "../components/landing/Logo";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <header className="absolute left-0 right-0 top-0 z-50 px-6 py-6 lg:px-12">
        <Link to="/">
          <Logo
            size={28}
            wordmarkClassName="font-serif text-xl font-bold tracking-tight text-white"
          />
        </Link>
      </header>
      <main className="relative mx-auto max-w-4xl px-6 py-32 sm:py-40">
        <div className="hero-glow"></div>

        <h1 className="mb-4 font-serif text-4xl text-white sm:text-5xl">Terms of Service</h1>
        <p className="mb-12 font-mono text-sm text-white/50">Last updated: May 26, 2026</p>

        <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white/90 prose-a:text-[var(--primary-light)] max-w-none space-y-8 font-sans leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white/90">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Omni Target platform (accessible at app.omnitarget.co) and our website, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the website or use any of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">2. Description of Service</h2>
            <p>
              Omni Target is an AI-powered pre-spend intelligence platform for e-commerce brands. By connecting your Shopify store, Omni Target analyzes store and order data to generate Campaign Briefs &mdash; including gateway product identification, audience targeting recommendations (interests and behaviors), and ad budget guidance for paid social advertising. Omni Target does not deploy, or execute advertising campaigns on any third-party platform (including Meta, Google, or others). All ad deployment, and performance outcomes remain solely the responsibility of the user.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">3. Account Registration</h2>
            <p>
              To use our platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate. You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">4. Use of AI Features and Content</h2>
            <p>
              Our platform utilizes artificial intelligence to generate Campaign Briefs, including targeting recommendations and budget guidance. While we strive for accuracy, you acknowledge that AI-generated output may be incomplete, inaccurate, or unsuitable for your specific use case. Omni Target does not guarantee the accuracy of any targeting recommendation, budget calculation, or gateway product classification, and makes no representation as to the advertising performance or business outcomes resulting from their use. You are solely responsible for reviewing, validating, and deciding whether to act on any Campaign Brief output before using it to build or launch advertising campaigns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">5. User Data and Intellectual Property</h2>
            <p>
              You retain all rights to the data, business assets, and parameters you upload to Omni Target. By using our service, you grant us a worldwide, non-exclusive license to use, host, and process this data for the purpose of providing the service to you, and to use such data in aggregated and/or de-identified form to develop, train, and improve our models and services across our customer base. We will not sell your identifiable data to third parties. Omni Target retains all intellectual property rights to the platform, software, and underlying AI models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">6. Fees and Payments</h2>
            <p>
              Access to certain features of Omni Target requires payment. By choosing a paid plan, you agree to pay all applicable fees in accordance with the pricing and billing terms presented to you at the time of purchase. Subscriptions automatically renew for successive periods equal to the initial term unless canceled at least 7 days prior to the renewal date. You may cancel at any time. Except where required by law, fees are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, in no event shall Omni Target, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service or any AI-generated content. Omni Target&apos;s total aggregate liability arising out of or relating to these Terms or the service shall not exceed the amount you paid to Omni Target in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">8. Disclaimer of Warranties</h2>
            <p>
              The service is provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any kind, whether express or implied, including without limitation implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the service will be uninterrupted, error-free, or that any Campaign Brief output will achieve any particular result.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Omni Target, its directors, employees, and partners from any claims, damages, losses, or expenses (including reasonable legal fees) arising out of your use of the service, your violation of these Terms, or your violation of any third-party rights or platform policies (including advertising platform terms).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">10. Modifications to the Service</h2>
            <p>
              We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice, provided that for paid subscribers we will provide reasonable notice of any modification that materially reduces core functionality. We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the service, except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">11. Term and Termination</h2>
            <p>
              These Terms remain in effect until terminated by either party. We may suspend or terminate your account for breach of these Terms. Upon termination, your right to use the service ceases immediately; Sections 5 (as to already-processed aggregated data), 7, 8, 9, and 12 survive termination. You may request deletion of your data upon termination, subject to our data retention obligations under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white/90">13. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at{" "}
              <a href="mailto:support@omnitarget.co" className="underline hover:text-white">
                support@omnitarget.co
              </a>
              .
            </p>
          </section>
      </main>
      <Footer />
    </div>
  );
}
