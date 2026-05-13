import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Plug, Sparkles, Target } from "lucide-react";

const APP_URL = "https://app.omnitarget.co";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omni-target — Know what to run on Meta. Before you spend." },
      { name: "description", content: "Omni-target reads your Shopify store and gives you a Meta Ads brief: audiences, creative angles, products, and budget split. Built for fashion and lifestyle brands." },
      { property: "og:title", content: "Omni-target — Shopify store intelligence for Meta Ads" },
      { property: "og:description", content: "Like having a media buyer who knows your store inside out." },
    ],
  }),
  component: Home,
});

function CTA({ children = "Open Omni-target" }: { children?: React.ReactNode }) {
  return (
    <a
      href={APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-11 items-center gap-2 rounded-md bg-[image:var(--gradient-primary)] px-5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </a>
  );
}

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[600px]"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at top, black 30%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-20 text-center md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Shopify store intelligence
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Know exactly what to run on Meta.{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              Before you spend.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            Omni-target reads your Shopify store and tells you exactly what to put in Meta Ads
            Manager to get sales. Like having a media buyer who knows your store inside out.
          </p>
          <div className="mt-9 flex items-center justify-center gap-4">
            <CTA />
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground">
              See how it works →
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              Three steps from Shopify connect to a brief you can paste into Meta.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { n: "01", icon: Plug, title: "Connect Shopify", body: "One-click install. Read-only access to products, orders, customers, and collections." },
              { n: "02", icon: Sparkles, title: "We read your store", body: "We analyse your bestsellers, repeat buyers, price points, and seasonality patterns." },
              { n: "03", icon: Target, title: "Get a Meta brief", body: "Audiences, creative angles, hero products, hooks, and budget split — ready to launch." },
            ].map(({ n, icon: Icon, title, body }) => (
              <div key={n} className="group relative rounded-xl border border-border/60 bg-card/40 p-6 transition hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{n}</span>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="mt-6 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="border-t border-border/60 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What you get</h2>
            <p className="mt-3 text-muted-foreground">
              A complete Meta Ads brief, written for your store. No fluff, no generic playbooks —
              specific targeting and creative direction grounded in your real data.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Audiences that match your actual buyer profile",
                "Creative angles ranked by likelihood to convert",
                "Hero products to feature this week",
                "Copy hooks pulled from your reviews and product data",
                "Budget split across prospecting and retargeting",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mock brief panel */}
          <div className="rounded-xl border border-border/60 bg-card/60 p-1 shadow-[var(--shadow-elegant)]">
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">brief.md</span>
            </div>
            <div className="space-y-4 p-5 font-mono text-xs leading-relaxed">
              <Row label="audience" value="Women 28–44 · linen, slow fashion, capsule" />
              <Row label="hero" value="Oversized poplin shirt · €98" />
              <Row label="angle_1" value="“The shirt that replaces five”" />
              <Row label="angle_2" value="Founder-led: how it's cut, why it lasts" />
              <Row label="hook" value="Reviewers mention ‘never takes it off’ 41×" />
              <Row label="budget" value="70% prospecting / 30% retargeting" />
              <Row label="exclude" value="Purchasers last 30d, sale-only buyers" />
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Who it's for</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Built specifically for fashion and lifestyle brands running on Shopify. We don't try to
            be everything to everyone.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["Fashion & lifestyle", "Shopify-native", "$10k–$500k/mo", "DTC operators", "Brand-led teams"].map((chip) => (
              <span key={chip} className="rounded-full border border-border/60 bg-card/40 px-3 py-1 text-sm text-foreground/80">
                {chip}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-sm text-muted-foreground">
            Not for you if you sell B2B, run on a non-Shopify stack, or want a tool that pushes a
            “Buy Now” button on its own.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Simple pricing</h2>
            <p className="mt-3 text-muted-foreground">Cancel anytime. No setup fees.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <PriceCard
              name="Starter"
              price="$49"
              tag="For brands testing Meta"
              features={["1 Shopify store", "Weekly brief", "Audience + creative angles", "Email support"]}
            />
            <PriceCard
              name="Growth"
              price="$149"
              tag="Most fashion brands pick this"
              highlight
              features={["1 Shopify store", "Briefs on demand", "Hero products + hooks", "Budget split + exclusions", "Priority support"]}
            />
            <PriceCard
              name="Scale"
              price="$399"
              tag="For multi-store operators"
              features={["Up to 5 stores", "Unlimited briefs", "Custom audience rules", "Slack delivery", "Dedicated strategist"]}
            />
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Stop guessing what to launch.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Connect your store and get your first brief in minutes.
          </p>
          <div className="mt-8 flex justify-center">
            <CTA>Get your first brief</CTA>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground/90">{value}</span>
    </div>
  );
}

function PriceCard({
  name,
  price,
  tag,
  features,
  highlight,
}: {
  name: string;
  price: string;
  tag: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "relative rounded-xl border bg-card/40 p-6 " +
        (highlight
          ? "border-primary/60 shadow-[var(--shadow-glow)]"
          : "border-border/60")
      }
    >
      {highlight && (
        <span className="absolute -top-2.5 left-6 rounded-full bg-[image:var(--gradient-primary)] px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
          Most popular
        </span>
      )}
      <h3 className="text-sm font-medium text-muted-foreground">{name}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight">{price}</span>
        <span className="text-sm text-muted-foreground">/mo</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{tag}</p>
      <ul className="mt-6 space-y-2.5 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span className="text-foreground/90">{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={
          "mt-6 inline-flex h-10 w-full items-center justify-center rounded-md text-sm font-medium transition " +
          (highlight
            ? "bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90"
            : "border border-border/60 bg-card/60 text-foreground hover:border-primary/40")
        }
      >
        Start with {name}
      </a>
    </div>
  );
}
