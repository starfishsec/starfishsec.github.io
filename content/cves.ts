/**
 * CVE / advisory data.
 *
 * The rows live in `content/cves.data.ts` (GENERATED from public Wordfence Intelligence records
 * credited to the team — see `scripts/import-wordfence.mjs`). Nothing is invented: platform, type,
 * CVSS and publish date are parsed verbatim from the public record.
 *
 * TODO(owner): CVEs published outside Wordfence (Apache, other databases) and CVEs credited to
 * Phuoc Pham / Dau Hoang Tai are not in this export yet — add another JSON under `data/wordfence/`
 * (or another importer) to include them.
 */
import { cveData } from "./cves.data";

export type Severity = "critical" | "high" | "medium" | "low";

export interface Cve {
  id: string;
  platform: string;
  /** Vulnerability type / short title, e.g. "Unauthenticated Privilege Escalation". */
  title: string;
  severity: Severity;
  /** CVSS base score when known. */
  cvss?: number;
  /** ISO date (YYYY-MM-DD) the advisory was published. */
  publishedAt?: string;
  /** Public record URL (advisory page). */
  source?: string;
  /** Team handle credited on the record. */
  researcher?: string;
}

export const researchHeading = {
  eyebrow: "Research",
  title: "Proof, published.",
  subtitle: "We don't just claim skill — it's in the public record. 200+ CVEs and counting.",
} as const;

export const cveTotalClaim = "200+";

/** All CVEs, highest severity first (then newest). */
export const cves: Cve[] = cveData;

export const severityLabel: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const severityOrder: Severity[] = ["critical", "high", "medium", "low"];

export function cveYear(cve: Cve): number {
  return Number.parseInt(cve.id.split("-")[1] ?? "0", 10);
}

/** Public record URL: the advisory page when we have one, otherwise the NVD entry. */
export function cveUrl(cve: Cve): string {
  return cve.source ?? `https://nvd.nist.gov/vuln/detail/${cve.id}`;
}

/** Count per severity, for summary chips. */
export function severityCounts(list: Cve[]): Record<Severity, number> {
  const counts: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const c of list) counts[c.severity] += 1;
  return counts;
}
