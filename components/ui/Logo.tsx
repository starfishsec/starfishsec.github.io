import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** Show the serif wordmark image next to the mark. */
  withWordmark?: boolean;
  className?: string;
  markSize?: number;
}

/**
 * Brand lockup rendered from the real logo assets (docs/03 — never re-typeset the wordmark).
 * Assets: /logo-mark-white.png (mark), /logo-wordmark-white.png (serif wordmark).
 * TODO(owner): replace PNGs with clean SVG exports when available.
 */
export function Logo({ withWordmark = true, className, markSize = 32 }: LogoProps) {
  const wordmarkHeight = Math.round(markSize * 0.42);
  const wordmarkWidth = Math.round(wordmarkHeight * (1088 / 126));
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3 rounded-btn", className)}
      aria-label={`${site.name} — home`}
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
        <Image
          src="/logo-wordmark-white.png"
          alt={site.wordmark}
          width={wordmarkWidth}
          height={wordmarkHeight}
          priority
          className="hidden sm:block"
        />
      ) : null}
    </Link>
  );
}
