/**
 * Blog types + pure helpers (client-safe: no fs, no data).
 *
 * The posts themselves live as Markdown files in `content/posts/*.md` (frontmatter + body),
 * written and published through the separate blog-manager app; `lib/blog.ts` loads and parses
 * them at build time into the `BlogPost`/`ContentBlock` shapes below. The typed-block article
 * renderer (`components/blog/ArticleBody.tsx`) is unchanged from the hand-written era.
 *
 * Bodies are original write-ups authored by / for the Starfish team, grounded in public,
 * verifiable facts; where a primary write-up exists it is credited under "References".
 */
import { team } from "./team";
import type { Severity } from "./cves";

/** Topics are free-form (the manager can introduce new ones); `allTopics` orders the known set. */
export type BlogTopic = string;

/** A rendered article body is a list of typed blocks (parsed from Markdown at build time). */
export type ContentBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "code"; lang?: string; code: string }
  | { kind: "callout"; tone?: "info" | "warn"; title?: string; text: string }
  | { kind: "quote"; text: string }
  | { kind: "img"; src: string; alt: string; caption?: string };

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
  /** The on-site article body. */
  body: ContentBlock[];
  /** Primary sources / further reading, shown at the end of the article. */
  references?: Reference[];
}

export const blogHeading = {
  title: "Research and writing from the people who find the bugs.",
  subtitle:
    "Deep-dive vulnerability analyses, weaponized proofs-of-concept, and security research, written by the Starfish founders. Grounded in the public record; sources credited.",
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
