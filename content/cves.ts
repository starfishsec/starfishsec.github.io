/**
 * Featured CVEs — real, credited to An Ngo / `ancorn_` on public Wordfence records.
 * A sample of the team's 200+. Source: docs/02-CONTENT.md §7.
 *
 * TODO(owner): export the authoritative full CVE list (all 3 researchers, incl. Apache
 * and other databases) for the /research page.
 * Reference: https://www.wordfence.com/threat-intel/vulnerabilities/researchers/ngo-thien-an-ancorn
 */
export type Severity = "critical" | "high" | "medium" | "low";

export interface Cve {
  id: string;
  platform: string;
  title: string;
  severity: Severity;
  /** CVSS base score when known. */
  cvss?: number;
}

export const researchHeading = {
  eyebrow: "Research",
  title: "Proof, published.",
  subtitle: "We don't just claim skill — it's in the public record. 200+ CVEs and counting.",
} as const;

export const cveTotalClaim = "200+";

export const cves: Cve[] = [
  {
    id: "CVE-2024-2536",
    platform: "Rank Math SEO",
    title: "Stored XSS (Contributor+)",
    severity: "medium",
    cvss: 6.4,
  },
  { id: "CVE-2024-2165", platform: "SEOPress", title: "Stored XSS", severity: "medium", cvss: 6.4 },
  { id: "CVE-2024-4943", platform: "Blocksy", title: "Stored XSS", severity: "medium", cvss: 6.4 },
  {
    id: "CVE-2024-5901",
    platform: "SiteOrigin Widgets Bundle",
    title: "Stored XSS",
    severity: "medium",
    cvss: 6.4,
  },
  {
    id: "CVE-2024-4360",
    platform: "Element Pack (Elementor Addons)",
    title: "Stored XSS",
    severity: "medium",
    cvss: 6.4,
  },
  { id: "CVE-2024-47363", platform: "Blockspare", title: "Stored XSS", severity: "medium" },
  {
    id: "CVE-2023-47851",
    platform: "Bootstrap Shortcodes Ultimate",
    title: "Stored XSS",
    severity: "medium",
    cvss: 6.4,
  },
];

export const severityLabel: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function cveYear(cve: Cve): number {
  return Number.parseInt(cve.id.split("-")[1] ?? "0", 10);
}

/** Deterministic public record URL for a CVE ID (NVD). */
export function cveUrl(cve: Cve): string {
  return `https://nvd.nist.gov/vuln/detail/${cve.id}`;
}
