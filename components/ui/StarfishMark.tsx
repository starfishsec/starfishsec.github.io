import { cn } from "@/lib/cn";

/**
 * The brand mark as inline SVG, traced verbatim from the vector master in
 * `starfishsec-social-variations/*.svg` (owner brand drop, 2026-09-08): a five-armed line-art
 * starfish, stroked, no fill. Inheriting `currentColor` keeps it themeable; the brand's primary
 * dark-surface variant is the green mark (green-on-black), so callers set `text-accent`.
 */
const ARM = "M46 42 L43 28 L50 4 L57 28 L54 42";

export function StarfishMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={3.2}
      strokeLinejoin="miter"
      strokeLinecap="butt"
    >
      <circle cx="50" cy="50" r="8.5" />
      {/* Top arm is open at the base in the master; the tip is a separate chevron. */}
      <path d="M46 42 L43 28 L48 12 M52 12 L57 28 L54 42" />
      <path d="M49 8 L50.8 3 L52 8" />
      {[72, 144, 216, 288].map((deg) => (
        <path key={deg} d={ARM} transform={`rotate(${deg} 50 50)`} />
      ))}
    </svg>
  );
}
