import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center lg:px-12">
        <Logo size={24} wordmarkClassName="font-serif text-lg font-bold tracking-tight text-white" />
        <nav className="flex items-center gap-6 text-[14px] text-white/55">
          <a href="#" className="hover:text-white">Privacy</a>
          <span className="text-white/20">·</span>
          <a href="#" className="hover:text-white">Terms</a>
        </nav>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40 md:text-right">
          Built for fashion brands who are serious about Meta.
        </p>
      </div>
    </footer>
  );
}

