import {
  Award,
  BookOpenCheck,
  Crosshair,
  FileCheck2,
  Fingerprint,
  Microscope,
  ShieldCheck,
  Swords,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/content/services";
import type { WhyIcon } from "@/content/whyus";

/** Content files store icon *keys* (serializable); this map resolves them to Lucide components. */
export const iconMap: Record<ServiceIcon | WhyIcon, LucideIcon> = {
  crosshair: Crosshair,
  microscope: Microscope,
  swords: Swords,
  "shield-check": ShieldCheck,
  terminal: Terminal,
  fingerprint: Fingerprint,
  "book-open-check": BookOpenCheck,
  award: Award,
  "file-check": FileCheck2,
};
