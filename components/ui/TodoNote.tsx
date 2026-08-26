import { cn } from "@/lib/cn";

/**
 * Visible placeholder for owner-pending *data* the page claims (a stat, a bio, a highlight). Never
 * hide unfinished content behind fake values. Absent optional blocks (e.g. social links) render
 * nothing instead; the TODO lives in the content file.
 */
export function TodoNote({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-dashed border-warn/40 px-2 py-1 font-mono text-[0.75rem] leading-4 text-warn/90",
        className,
      )}
    >
      {children}
    </span>
  );
}
