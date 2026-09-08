import Link from "next/link";
import { site } from "@/content/site";
import { StarfishMark } from "@/components/ui/StarfishMark";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** Show the wordmark next to the mark. */
  withWordmark?: boolean;
  className?: string;
  markSize?: number;
}

/**
 * Brand lockup: the inline-SVG starfish mark (brand drop 2026-09-08, replaces the old PNG) in
 * Signal Green, plus a typeset wordmark.
 *
 * Owner decision (2026-08-26, still standing): the wordmark is typeset in the site font to
 * harmonise with the Geist type system. The brand masters set their wordmark in Arial; on the site
 * the No-Serif/one-family rule wins, matching the lockup's colors (white "Starfish", green "Sec").
 */
/** Visible wordmark text. The accessible name must contain it verbatim (WCAG 2.5.3 label-in-name). */
const wordmarkText = "StarfishSec";

export function Logo({ withWordmark = true, className, markSize = 32 }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5 rounded-btn", className)}
      aria-label={`${wordmarkText}, ${site.name} home`}
    >
      <StarfishMark size={markSize} className="text-accent" />
      {withWordmark ? (
        <span className="text-[1.02rem] leading-none font-semibold tracking-tight text-fg select-none">
          {wordmarkText.slice(0, 8)}
          <span className="text-accent">{wordmarkText.slice(8)}</span>
        </span>
      ) : null}
    </Link>
  );
}
