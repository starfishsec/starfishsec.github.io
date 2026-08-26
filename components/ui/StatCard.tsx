import type { Stat } from "@/content/stats";
import { TodoNote } from "@/components/ui/TodoNote";

/** Borderless strip cell: solid mono numeral, muted label. The strip's hairlines do the framing. */
export function StatCard({ value, label, todo }: Stat) {
  return (
    <div className="flex flex-col gap-3 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
      <p className="font-mono text-stat text-fg tabular-nums">{value}</p>
      <p className="max-w-[16rem] text-small text-fg-muted">{label}</p>
      {todo ? <TodoNote className="self-start">{todo}</TodoNote> : null}
    </div>
  );
}
