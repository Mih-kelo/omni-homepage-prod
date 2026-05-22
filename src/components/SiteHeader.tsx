import { Link } from "@tanstack/react-router";
import { LogoIcon } from "./LogoIcon";

const APP_URL = "https://app.omnitarget.co";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <LogoIcon className="w-5 h-5 text-[#8B5CF6]" />
          Omni Target
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link to="/" hash="how" className="hover:text-foreground">How it works</Link>
          <Link to="/" hash="pricing" className="hover:text-foreground">Pricing</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
        </nav>
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center rounded-md bg-[image:var(--gradient-primary)] px-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
        >
          Open app
        </a>
      </div>
    </header>
  );
}
