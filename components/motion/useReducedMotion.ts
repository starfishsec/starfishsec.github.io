"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/** True when the OS asks for reduced motion. Falls back to false on the server / first render. */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
