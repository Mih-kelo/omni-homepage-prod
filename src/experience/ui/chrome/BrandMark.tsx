import logoUrl from "@/assets/omni-target-logo.png";

/**
 * The brand mark, everywhere it appears beside the wordmark: the node-arc
 * logo cropped to a circular coin. The source art carries its own deep
 * navy ground, so the circle turns it into a clean badge on the light
 * page and on the First Breath's indigo veil alike. Decorative — the
 * wordmark text always travels with it.
 */
export function BrandMark({ size, className }: { size?: number; className?: string }) {
  return (
    <img
      src={logoUrl}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className ? `lx-brandmark ${className}` : "lx-brandmark"}
      style={size ? { width: size, height: size } : undefined}
    />
  );
}
