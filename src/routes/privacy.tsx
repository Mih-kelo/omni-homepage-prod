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
        <p className="mb-12 font-mono text-sm text-white/50">Last updated: May 23, 2026</p>

        <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white/90 prose-a:text-[var(--primary-light)] max-w-none space-y-8 font-sans leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to Omni Target. We respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              (omnitarget.co) and use our AI Campaign Launcher platform (app.omnitarget.co).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you register for an account, create campaigns, 
              upload business assets, or communicate with us. This may include:
            </p>
            <ul className="list-disc pl-6 text-white/70">
              <li><strong>Contact Information:</strong> Name, email address, company name, and billing details.</li>
              <li><strong>Campaign Data:</strong> Ad creatives, marketing copy, target audience parameters, and performance metrics generated or provided within app.omnitarget.co.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our platform, IP addresses, and device information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 text-white/70">
              <li>To provide, operate, and maintain the Omni Target platform.</li>
              <li>To train and improve our AI models (only using anonymized or aggregated data, unless explicitly opted-in).</li>
              <li>To process transactions and manage your billing through secure third-party payment processors (e.g., Stripe).</li>
              <li>To communicate with you regarding updates, support, and marketing (you can opt-out at any time).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Data Sharing and Third Parties</h2>
            <p>
              We do not sell your personal data. We may share your information with trusted third-party service providers 
              who assist us in operating our platform (such as cloud hosting, payment processing, and AI infrastructure). 
              These providers are bound by strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Security of Your Data</h2>
            <p>
              We implement industry-standard security measures, including encryption and secure server hosting, to protect your data. 
              However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or delete your personal data. 
              You can manage your account settings directly within app.omnitarget.co or contact us for assistance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at support@omnitarget.co.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
