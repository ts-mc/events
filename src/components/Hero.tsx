import { cn } from "@/lib/utils";

/**
 * Large blurred colour orb. Sits behind a hero at low opacity and partially
 * off-canvas; there should never be more than three in one composition.
 */
export function GlowOrb({
  className,
  color,
  size = 384,
  opacity = 0.1,
}: {
  className?: string;
  color: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn("glow-orb", className)}
      style={{
        width: size,
        height: size,
        background: color,
        opacity: opacity * 0.35,
      }}
    />
  );
}
