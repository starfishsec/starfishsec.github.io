/**
 * Announcement bar (docs/02 §1). Set to `null` to hide the bar entirely.
 * TODO(owner): confirm the live advisory link target. Currently points to the CVE row on /research.
 */
export interface Announcement {
  prefix: string;
  text: string;
  linkLabel: string;
  href: string;
}

export const announcement: Announcement | null = {
  prefix: "Latest research:",
  text: "We disclosed a stored-XSS vulnerability in Rank Math SEO (2M+ installs).",
  linkLabel: "Read the advisory",
  href: "/research#CVE-2024-2536",
};
