"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
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
 * The markup is identical on server and client (always a `motion.div`) so hydration never
 * mismatches. Reduced motion is handled two ways:
 *  - CSS: `@media (prefers-reduced-motion: reduce) [data-reveal]` forces the final state
 *    (`globals.css`) — works even before JS runs.
 *  - JS: the transition duration collapses to 0 so Framer never schedules an animation.
 */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={
        reduce ? { duration: 0, delay: 0 } : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
