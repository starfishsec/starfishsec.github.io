import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-[0.75rem] text-fg-muted", className)}>
      <span className="status-dot" aria-hidden="true" />
      {site.status}
    </span>
  );
}
