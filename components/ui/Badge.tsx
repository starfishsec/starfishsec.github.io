import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "critical" | "high" | "medium" | "low" | "neutral" | "accent";

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
  title?: string;
}

const tones: Record<BadgeTone, string> = {
  critical: "border-danger/40 bg-danger/10 text-danger",
  high: "border-high/40 bg-high/10 text-high",
  medium: "border-warn/40 bg-warn/10 text-warn",
  low: "border-border bg-bg-elev-2 text-fg-muted",
  neutral: "border-border bg-bg-elev-2 text-fg-muted",
  accent: "border-accent/40 bg-accent-dim text-accent",
};

export function Badge({ tone = "neutral", children, className, title }: BadgeProps) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[0.75rem] leading-5 whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
