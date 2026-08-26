"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "./useReducedMotion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use for stagger (e.g. index * 0.08). */
  delay?: number;
  /** Fade + slide distance in px. */
  y?: number;
}

/**
 * Scroll-reveal wrapper (docs/03 motion: opacity 0→1, y 16→0, 0.5s ease-out, once).
 *
 * Implemented with IntersectionObserver + a CSS transition (`[data-reveal]` rules in
 * `globals.css`) instead of an animation library: the landing page shipped ~120 KB of
 * framer-motion for this one effect, which cost the Lighthouse performance budget.
 *
 * Reduced motion / no JS are handled in CSS so the content is never gated on hydration:
 *  - `@media (prefers-reduced-motion: reduce) [data-reveal]` forces the final state;
 *  - the root layout's `<noscript>` style does the same when scripts are disabled;
 *  - the hook below additionally skips the observer, so nothing waits for a scroll.
 */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, shown]);

  const style = {
    transitionDelay: delay ? `${delay}s` : undefined,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <div ref={ref} data-reveal={shown ? "shown" : ""} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
