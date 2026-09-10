/**
 * Blog types + pure helpers (client-safe: no fs, no data).
 *
 * The blog MIRRORS the founders' own published research. Each post is one of their original
 * articles, moved onto the company site verbatim with attribution: the Markdown body in
 * `content/posts/*.md` is the author's original text (only image paths are rewritten to the local
 * copies under `public/blog/<slug>/`), and every post links back to where it was first published
 * via `sourceName` / `sourceUrl`. `lib/blog.ts` renders the Markdown body to HTML at build time.
 */
import { team } from "./team";
import type { Severity } from "./cves";

/** Topics are free-form (each mirrored post brings its own); `allTopics` orders the known set. */
export type BlogTopic = string;

export interface Reference {
  label: string;
  href: string;
}

export interface BlogPost {
  /** Stable slug for `/blog/[slug]` (the Markdown filename). */
  slug: string;
  title: string;
  /** Team handle — links to the author in content/team.ts. */
  authorHandle: string;
  /** ISO date (YYYY-MM-DD). Only set when verified. */
  date?: string;
  topics: BlogTopic[];
  cve?: string;
  cvss?: number;
  severity?: Severity;
  language: "en" | "vi";
  /** Card + meta-description summary. */
  summary: string;
  readingTime?: string;
  featured?: boolean;
  /** Where this article was first published by its author (shown as an attribution banner). */
  sourceName?: string;
  sourceUrl?: string;
  /** The original article body, rendered from Markdown to HTML at build time (see lib/blog.ts). */
  html: string;
  /** Primary sources / further reading, shown at the end of the article. */
  references?: Reference[];
}

export const blogHeading = {
  title: "Research and writing from the people who find the bugs.",
  subtitle:
    "Deep-dive vulnerability analyses and weaponized proofs-of-concept, first published by the Starfish founders on their own blogs and collected here. Each post links back to the original.",
} as const;

export function authorName(handle: string): string {
  return team.find((m) => m.handle === handle)?.name ?? handle;
}

/** LinkedIn (or other) profile link for an author handle, if known. */
export function authorLink(handle: string): string | undefined {
  return team.find((m) => m.handle === handle)?.linkedin;
}

/** Author role (from the team data), if known. */
export function authorRole(handle: string): string | undefined {
  return team.find((m) => m.handle === handle)?.role;
}

/** Known topics in a stable, curated order; topics not listed here sort after, alphabetically. */
export const allTopics: BlogTopic[] = [
  "CVE Analysis",
  "AI & Security",
  "Reverse Engineering",
  "Web Security",
  "Deserialization",
  "WordPress",
];

/** Sort: featured first, then by date (undated last), then title. */
export function sortPosts(list: BlogPost[]): BlogPost[] {
  return [...list].sort((a, b) => {
    if (!!b.featured !== !!a.featured) return a.featured ? -1 : 1;
    const da = a.date ?? "";
    const db = b.date ?? "";
    if (da !== db) return db.localeCompare(da);
    return a.title.localeCompare(b.title);
  });
}
