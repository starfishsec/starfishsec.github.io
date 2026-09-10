import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { sortPosts, type BlogPost, type Reference } from "@/content/blog";
import type { Severity } from "@/content/cves";

/**
 * Build-time loader for the mirrored blog. Each post in `content/posts/<slug>.md` carries our
 * normalized frontmatter (title, author, date, source, …) followed by the author's ORIGINAL
 * article body in Markdown. This module renders that body to HTML with `marked`, so the originals
 * keep their full formatting — headings, images, code, tables, blockquotes and links.
 *
 * The stored Markdown already references images by their local path (`/blog/<slug>/…`); the assets
 * live under `public/blog/<slug>/`. `draft: true` posts are excluded from the build entirely.
 */

const POSTS_DIR = join(process.cwd(), "content", "posts");
const SEVERITIES: readonly Severity[] = ["critical", "high", "medium", "low"];

marked.setOptions({ gfm: true, breaks: false });

/**
 * The bodies are our own founders' authored content, reviewed before it lands in the repo, and the
 * build is static. Still, strip the few HTML constructs that could execute, so a rendered post can
 * never run script — defense in depth, not a trust decision.
 */
function sanitize(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function parsePost(file: string): BlogPost | null {
  const slug = file.replace(/\.md$/, "");
  const raw = readFileSync(join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  if (data.draft === true) return null;

  const title = str(data.title);
  const authorHandle = str(data.authorHandle);
  const summary = str(data.summary);
  if (!title || !authorHandle || !summary) {
    throw new Error(`content/posts/${file}: frontmatter needs title, authorHandle and summary`);
  }

  const severity = str(data.severity);
  const references: Reference[] | undefined = Array.isArray(data.references)
    ? data.references
        .map((r: unknown) => {
          const o = r as { label?: unknown; href?: unknown };
          const label = str(o.label);
          const href = str(o.href);
          return label && href ? { label, href } : null;
        })
        .filter((r): r is Reference => r !== null)
    : undefined;

  const html = sanitize(marked.parse(content, { async: false }) as string);

  return {
    slug,
    title,
    authorHandle,
    date: str(data.date),
    topics: Array.isArray(data.topics) ? data.topics.map(String) : [],
    cve: str(data.cve),
    cvss: typeof data.cvss === "number" ? data.cvss : undefined,
    severity: SEVERITIES.includes(severity as Severity) ? (severity as Severity) : undefined,
    language: data.language === "vi" ? "vi" : "en",
    summary,
    readingTime: str(data.readingTime),
    featured: data.featured === true,
    sourceName: str(data.sourceName),
    sourceUrl: str(data.sourceUrl),
    html,
    references: references?.length ? references : undefined,
  };
}

/** All published (non-draft) posts. Parsed once per build; module scope caches across pages. */
export const blogPosts: BlogPost[] = readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".md"))
  .map(parsePost)
  .filter((p): p is BlogPost => p !== null);

export const sortedPosts: BlogPost[] = sortPosts(blogPosts);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Posts by a given author handle, sorted. */
export function postsByAuthor(handle: string): BlogPost[] {
  return sortPosts(blogPosts.filter((p) => p.authorHandle === handle));
}
