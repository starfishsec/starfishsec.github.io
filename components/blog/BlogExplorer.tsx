"use client";

import { useEffect, useMemo, useState } from "react";
import { allTopics, authorName, sortPosts, type BlogPost, type BlogTopic } from "@/content/blog";
import { PostCard } from "@/components/blog/PostCard";
import { cn } from "@/lib/cn";

const ALL = "all";

interface BlogExplorerProps {
  posts: BlogPost[];
  /** Author handles that appear in the post set, in team order. */
  authors: string[];
}

const chip =
  "rounded-full border px-3.5 py-1.5 font-mono text-[0.75rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function BlogExplorer({ posts, authors }: BlogExplorerProps) {
  const [author, setAuthor] = useState<string>(ALL);
  const [topic, setTopic] = useState<BlogTopic | typeof ALL>(ALL);

  // Deep link from the Team section: /blog?author=<handle>. Read after mount so the
  // statically prerendered HTML is identical for every visitor.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("author");
    if (q && authors.includes(q)) setAuthor(q);
  }, [authors]);

  const topics = useMemo(() => {
    const present = new Set(posts.flatMap((p) => p.topics));
    const known = allTopics.filter((t) => present.has(t));
    const extra = [...present].filter((t) => !allTopics.includes(t)).sort();
    return [...known, ...extra];
  }, [posts]);

  const filtered = useMemo(() => {
    const list = posts.filter(
      (p) =>
        (author === ALL || p.authorHandle === author) &&
        (topic === ALL || p.topics.includes(topic)),
    );
    return sortPosts(list);
  }, [posts, author, topic]);

  const [featured, ...rest] = filtered;

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by author"
        >
          <span className="mr-1 eyebrow text-fg-subtle">Author</span>
          <button
            type="button"
            onClick={() => setAuthor(ALL)}
            aria-pressed={author === ALL}
            className={cn(
              chip,
              author === ALL
                ? "border-accent bg-accent-dim text-accent"
                : "border-border text-fg-muted hover:border-fg-subtle hover:text-fg",
            )}
          >
            Everyone
          </button>
          {authors.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setAuthor(h)}
              aria-pressed={author === h}
              className={cn(
                chip,
                author === h
                  ? "border-accent bg-accent-dim text-accent"
                  : "border-border text-fg-muted hover:border-fg-subtle hover:text-fg",
              )}
            >
              {authorName(h)}
            </button>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by topic"
        >
          <span className="mr-1 eyebrow text-fg-subtle">Topic</span>
          <button
            type="button"
            onClick={() => setTopic(ALL)}
            aria-pressed={topic === ALL}
            className={cn(
              chip,
              topic === ALL
                ? "border-accent bg-accent-dim text-accent"
                : "border-border text-fg-muted hover:border-fg-subtle hover:text-fg",
            )}
          >
            All topics
          </button>
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={cn(
                chip,
                topic === t
                  ? "border-accent bg-accent-dim text-accent"
                  : "border-border text-fg-muted hover:border-fg-subtle hover:text-fg",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="font-mono text-small text-fg-muted" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "post" : "posts"}
        {author !== ALL ? ` by ${authorName(author)}` : ""}
        {topic !== ALL ? ` · ${topic}` : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-card border border-dashed border-border px-6 py-16 text-center text-fg-muted">
          No posts match that filter yet.
        </p>
      ) : (
        <>
          {featured ? <PostCard key={featured.slug} post={featured} featured /> : null}
          {rest.length > 0 ? (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.slug} className="h-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </div>
  );
}
