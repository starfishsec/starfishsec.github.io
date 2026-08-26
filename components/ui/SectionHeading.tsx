import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Landing sections use h2 (the single h1 lives in the Hero). Standalone pages use h1. */
  as?: "h1" | "h2";
  /** Heading id, for `aria-labelledby` on the parent section. */
  id?: string;
}

/** Headline + optional muted subtitle. No kicker above the headline anywhere (DESIGN.md, Headline-Alone Rule). */
export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
  as = "h2",
  id,
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Tag id={id} className="text-h1 text-balance">
        {title}
      </Tag>
      {subtitle ? (
        <p className={cn("max-w-2xl text-fg-muted", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
