/**
 * CVE / advisory data.
 *
 * The rows live in `content/cves.data.ts` (GENERATED from public Wordfence Intelligence records
 * credited to the team — see `scripts/import-wordfence.mjs`). Nothing is invented: platform, type,
 * CVSS and publish date are parsed verbatim from the public record.
 *
 * Advisories outside the Wordfence export (other databases, non-WordPress targets) live in
 * `cves.manual.ts` and are merged in below.
 *
 * TODO(owner): more of Dau Hoang Tai's non-WordPress advisories — only CVE-2022-29317 is on public
 * record so far. Send the CVE IDs and they get added to `cves.manual.ts`.
 */
import { cveData } from "./cves.data";
import { cveManual } from "./cves.manual";

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
  /** Team handles credited on the record. A joint finding credits more than one. */
  researchers?: string[];
}

export const researchHeading = {
  title: "Proof, published.",
  subtitle: "We don't just claim skill. It's in the public record: 200+ CVEs and counting.",
} as const;

export const cveTotalClaim = "200+";

/**
 * All CVEs: the generated Wordfence export plus the hand-maintained non-Wordfence advisories,
 * highest severity first, then newest.
 */
export const cves: Cve[] = [...cveData, ...cveManual].sort(
  (a, b) =>
    (b.cvss ?? 0) - (a.cvss ?? 0) || (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
);

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
