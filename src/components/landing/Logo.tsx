import logoUrl from "@/assets/omni-target-logo.png";

type LogoProps = {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

export function Logo({
  size = 32,
  className = "",
  showWordmark = true,
  wordmarkClassName = "font-serif text-xl font-bold tracking-tight text-white",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className={wordmarkClassName}>
          Omni <span className="text-[var(--primary-mid)]">Target</span>
        </span>
      )}
    </span>
  );
}

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <img
      src={logoUrl}
      alt="Omni Target"
      width={size}
      height={size}
      className="shrink-0 rounded-[6px]"
      style={{ width: size, height: size }}
    />
  );
}
