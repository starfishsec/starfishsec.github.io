import { cn } from "@/lib/cn";

/** Visible placeholder for owner-pending data. Never hide unfinished content behind fake values. */
export function TodoNote({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-dashed border-warn/40 px-1.5 py-0.5 font-mono text-[0.7rem] leading-4 text-warn/90",
        className,
      )}
    >
      {children}
    </span>
  );
}
