import type { MetadataRoute } from "next";

// Required for `output: "export"`: metadata routes must declare themselves static.
export const dynamic = "force-static";
import { site } from "@/content/site";

// Blog enabled 2026-09-10 (owner: the site ships a Markdown-driven blog page). Draft posts are
// excluded upstream by lib/blog.ts.
import { sortedPosts } from "@/lib/blog";

const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/research", priority: 0.9, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/disclosure", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
  const posts = sortedPosts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.date ? new Date(`${p.date}T00:00:00Z`) : lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
