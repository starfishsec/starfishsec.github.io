import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className, interactive = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-bg-elev p-6",
        interactive &&
          "transition-[border-color,transform,box-shadow] duration-200 hover:border-accent/60 " +
            "hover:shadow-[0_12px_40px_-20px_rgba(57,255,136,0.35)] motion-safe:hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}
