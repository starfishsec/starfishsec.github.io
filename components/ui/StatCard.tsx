import type { Stat } from "@/content/stats";
import { TodoNote } from "@/components/ui/TodoNote";

export function StatCard({ value, label, todo }: Stat) {
  return (
    <div className="flex flex-col gap-2 p-6 md:p-8">
      <p className="font-mono text-4xl font-medium tracking-tight text-accent md:text-5xl">
        {value}
      </p>
      <p className="text-small text-fg-muted">{label}</p>
      {todo ? <TodoNote className="self-start">{todo}</TodoNote> : null}
    </div>
  );
}
