import {
  Cpu,
  Crosshair,
  Gauge,
  Microscope,
  Receipt,
  ShieldCheck,
  Swords,
  Terminal,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import type { UspIcon } from "@/content/hero";
import type { ServiceIcon } from "@/content/services";

/** Content files store icon *keys* (serializable); this map resolves them to Lucide components. */
export const iconMap: Record<ServiceIcon | UspIcon, LucideIcon> = {
  crosshair: Crosshair,
  microscope: Microscope,
  swords: Swords,
  "shield-check": ShieldCheck,
  terminal: Terminal,
  cpu: Cpu,
  "user-check": UserCheck,
  gauge: Gauge,
  receipt: Receipt,
};
