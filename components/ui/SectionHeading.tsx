import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Landing sections use h2 (the single h1 lives in the Hero). Standalone pages use h1. */
  as?: "h1" | "h2";
  /** Heading id, for `aria-labelledby` on the parent section. */
  id?: string;
}

export function SectionHeading({
  eyebrow,
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
      {eyebrow ? (
        <p className="eyebrow text-accent">
          <span aria-hidden="true">{"// "}</span>
          {eyebrow}
        </p>
      ) : null}
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
