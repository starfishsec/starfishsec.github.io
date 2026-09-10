import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked, type Token, type Tokens } from "marked";
import { sortPosts, type BlogPost, type ContentBlock, type Reference } from "@/content/blog";
import type { Severity } from "@/content/cves";

/**
 * Build-time loader for the Markdown blog. Posts live in `content/posts/*.md` (frontmatter +
 * Markdown body, written via the blog-manager app); this module parses each body into the
 * site's typed `ContentBlock[]` so the existing ArticleBody renderer keeps doing the layout.
 *
 * Supported Markdown subset (everything the old typed blocks could express):
 *   ## / ###  headings · paragraphs · - / 1. lists · fenced code · > quotes ·
 *   > [!INFO] / > [!WARN] callouts (first line may carry a title) ·
 *   inline **bold**, *italic*, `code`, [links](https://…) via ArticleBody.
 * Anything else (tables, images, raw HTML) is intentionally not rendered — extend the block
 * model and ArticleBody first if a post ever needs it.
 *
 * `draft: true` posts are excluded from the build entirely (no page, no index, no sitemap):
 * the manager can save work-in-progress and even publish it to git without shipping it.
 */

const POSTS_DIR = join(process.cwd(), "content", "posts");

const SEVERITIES: readonly Severity[] = ["critical", "high", "medium", "low"];
const CALLOUT_RE = /^\[!(INFO|WARN)\][ \t]*([^\n]*)\n?([\s\S]*)$/;

function listItems(token: Tokens.List): string[] {
  return token.items.map((it) => it.text.trim());
}

function tokensToBlocks(tokens: Token[], file: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  for (const t of tokens) {
    switch (t.type) {
      case "heading": {
        const text = t.text.trim();
        if (t.depth <= 2) blocks.push({ kind: "h2", text });
        else blocks.push({ kind: "h3", text });
        break;
      }
      case "paragraph":
        blocks.push({ kind: "p", text: t.text.trim() });
        break;
      case "list":
        blocks.push(
          (t as Tokens.List).ordered
            ? { kind: "ol", items: listItems(t as Tokens.List) }
            : { kind: "ul", items: listItems(t as Tokens.List) },
        );
        break;
      case "code":
        blocks.push({ kind: "code", lang: t.lang || undefined, code: t.text });
        break;
      case "blockquote": {
        const inner = t.text.trim();
        const m = CALLOUT_RE.exec(inner);
        if (m) {
          blocks.push({
            kind: "callout",
            tone: m[1] === "WARN" ? "warn" : "info",
            title: m[2].trim() || undefined,
            text: m[3].trim(),
          });
        } else {
          blocks.push({ kind: "quote", text: inner });
        }
        break;
      }
      case "space":
      case "hr":
        break;
      default:
        // Fail loud at build time rather than silently dropping content.
        throw new Error(`content/posts/${file}: unsupported markdown construct "${t.type}"`);
    }
  }
  return blocks;
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
    body: tokensToBlocks(marked.lexer(content), file),
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
