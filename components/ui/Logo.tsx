import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** Show the wordmark next to the mark. */
  withWordmark?: boolean;
  className?: string;
  markSize?: number;
}

/**
 * Brand lockup: the real starfish mark asset (/logo-mark-white.png) + a typeset wordmark.
 *
 * Owner decision (2026-08-26): the original serif wordmark PNG clashed with the site's
 * sans/mono type system (Geist + Geist Mono), so the wordmark is typeset in the site font to harmonise
 * (this intentionally supersedes the "keep the serif wordmark image" note in docs/03).
 * The mark stays as the supplied image asset. TODO(owner): swap the PNG for a clean SVG mark.
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
      <Image
        src="/logo-mark-white.png"
        alt=""
        width={markSize}
        height={markSize}
        priority
        className="shrink-0"
      />
      {withWordmark ? (
        <span className="text-[1.02rem] leading-none font-semibold tracking-tight text-fg select-none">
          {wordmarkText.slice(0, 8)}
          <span className="text-accent">{wordmarkText.slice(8)}</span>
        </span>
      ) : null}
    </Link>
  );
}
