import { Link } from "@tanstack/react-router";

const APP_URL = "https://app.omnitarget.co";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
            <span className="inline-block h-5 w-5 rounded-md bg-[image:var(--gradient-primary)]" />
            Omni-target
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Shopify store intelligence for fashion and lifestyle brands.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={APP_URL} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground">Open app</a></li>
            <li><Link to="/" hash="pricing" className="text-foreground/80 hover:text-foreground">Pricing</Link></li>
            <li><Link to="/" hash="how" className="text-foreground/80 hover:text-foreground">How it works</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Legal</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/privacy" className="text-foreground/80 hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-foreground/80 hover:text-foreground">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Omni-target. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
