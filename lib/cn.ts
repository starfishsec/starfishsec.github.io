import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know our custom theme scales, otherwise it treats e.g. `text-small`
 * (font-size) and `text-bg` (color) as the same group and drops one of them.
 * Keep these lists in sync with the `@theme` block in `app/globals.css`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "bg",
        "bg-elev",
        "bg-elev-2",
        "border",
        "fg",
        "fg-muted",
        "fg-subtle",
        "accent",
        "accent-hover",
        "accent-dim",
        "danger",
        "high",
        "warn",
      ],
      radius: ["card", "btn"],
    },
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "body", "small", "mono-label"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
