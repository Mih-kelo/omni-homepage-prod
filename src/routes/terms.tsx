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
        <p className="mb-12 font-mono text-sm text-white/50">Last updated: May 23, 2026</p>

        <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white/90 prose-a:text-[var(--primary-light)] max-w-none space-y-8 font-sans leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Omni Target platform (accessible at app.omnitarget.co) and
              our website, you agree to be bound by these Terms of Service. If you do not agree to
              all the terms and conditions, then you may not access the website or use any of our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Description of Service</h2>
            <p>
              Omni Target is an AI-powered Campaign Launcher designed for B2B applications. We
              provide tools to generate, manage, and deploy marketing campaigns and ad creatives
              using advanced artificial intelligence models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Account Registration</h2>
            <p>
              To use our platform, you must register for an account. You agree to provide accurate,
              current, and complete information during the registration process and to update such
              information to keep it accurate. You are responsible for safeguarding your password
              and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Use of AI Features and Content</h2>
            <p>
              Our platform utilizes artificial intelligence to generate content. While we strive for
              high quality, you acknowledge that AI-generated content may occasionally be inaccurate
              or inappropriate for your specific use case. You are solely responsible for reviewing
              and approving all content, campaigns, and ad creatives before deploying them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. User Data and Intellectual Property</h2>
            <p>
              You retain all rights to the data, business assets, and parameters you upload to Omni
              Target. By using our service, you grant us a worldwide, non-exclusive license to use,
              host, and process this data solely for the purpose of providing the service to you.
              Omni Target retains all intellectual property rights to the platform, software, and
              underlying AI models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Fees and Payments</h2>
            <p>
              Access to certain features of Omni Target requires payment. By choosing a paid plan,
              you agree to pay all applicable fees in accordance with the pricing and billing terms
              presented to you at the time of purchase. Subscriptions will automatically renew
              unless canceled prior to the renewal date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
            <p>
              In no event shall Omni Target, its directors, employees, or partners be liable for any
              indirect, incidental, special, consequential, or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses,
              resulting from your use of the service or any AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. Modifications to the Service</h2>
            <p>
              We reserve the right to modify or discontinue, temporarily or permanently, the service
              (or any part thereof) with or without notice. We shall not be liable to you or to any
              third party for any modification, price change, suspension, or discontinuance of the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">9. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at support@omnitarget.co.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
