import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { authorLink, authorName, authorRole } from "@/content/blog";
import { blogPosts, getPostBySlug, postsByAuthor } from "@/lib/blog";
import { initials } from "@/content/team";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { PostCard } from "@/components/blog/PostCard";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      authors: [authorName(post.authorHandle)],
      publishedTime: post.date,
    },
  };
}

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = authorName(post.authorHandle);
  const role = authorRole(post.authorHandle);
  const profile = authorLink(post.authorHandle);
  const date = formatDate(post.date);
  const related = postsByAuthor(post.authorHandle)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="pb-20 md:pb-28">
      {/* Header band */}
      <div className="relative isolate overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_50%_0%,black_5%,transparent_65%)]" />
          <div className="absolute left-1/2 top-0 h-[22rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 bg-accent-glow blur-3xl" />
        </div>
        <Container className="max-w-3xl pt-14 pb-12 md:pt-20 md:pb-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-small text-fg-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All research
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {post.topics.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-bg px-2.5 py-0.5 font-mono text-[0.75rem] text-fg-muted"
              >
                {t}
              </span>
            ))}
            {post.cve ? (
              <Badge tone={post.severity ?? "neutral"}>
                {post.cve}
                {post.cvss !== undefined ? ` ${post.cvss.toFixed(1)}` : ""}
              </Badge>
            ) : null}
          </div>

          <h1 className="mt-5 text-h1 text-balance text-fg">{post.title}</h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-small text-fg-muted">
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-full border border-accent/30 bg-accent-dim font-mono text-[0.75rem] text-accent"
            >
              {initials(author)}
            </span>
            <span className="font-medium text-fg">{author}</span>
            {role ? <span className="text-fg-subtle">· {role}</span> : null}
            {date ? (
              <>
                <span aria-hidden="true" className="text-fg-subtle">
                  ·
                </span>
                <time dateTime={post.date} className="font-mono">
                  {date}
                </time>
              </>
            ) : null}
            {post.readingTime ? (
              <>
                <span aria-hidden="true" className="text-fg-subtle">
                  ·
                </span>
                <span className="font-mono">{post.readingTime} read</span>
              </>
            ) : null}
          </div>
        </Container>
      </div>

      {/* Body */}
      <Container className="max-w-3xl pt-12 md:pt-14">
        <p className="border-l-2 border-accent/40 pl-4 text-lg leading-relaxed text-fg">
          {post.summary}
        </p>

        {post.sourceUrl ? (
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-between gap-3 rounded-card border border-border bg-bg-elev px-4 py-3 text-small transition-colors hover:border-accent/40"
          >
            <span className="text-fg-muted">
              Originally published by <span className="text-fg">{author}</span>
              {post.sourceName ? (
                <>
                  {" "}
                  on <span className="text-fg">{post.sourceName}</span>
                </>
              ) : null}
              . Read the original.
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-accent" aria-hidden="true" />
          </a>
        ) : null}

        <div className="mt-10">
          <ArticleBody html={post.html} />
        </div>

        {post.references && post.references.length > 0 ? (
          <div className="mt-14 border-t border-border pt-6">
            <h2 className="eyebrow text-fg-muted">References &amp; further reading</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {post.references.map((ref) => (
                <li key={ref.href}>
                  <a
                    href={ref.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-small text-fg-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {ref.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Author card */}
        <div className="mt-12 flex flex-col gap-3 rounded-card border border-border bg-bg-elev p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-full border border-accent/30 bg-accent-dim font-mono text-accent"
            >
              {initials(author)}
            </span>
            <div>
              <p className="font-semibold text-fg">{author}</p>
              {role ? <p className="text-small text-fg-muted">{role}, Starfish Security</p> : null}
            </div>
          </div>
          {profile ? (
            <a
              href={profile}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-1.5 rounded-btn border border-border px-3 py-1.5 font-mono text-small text-fg-muted transition-colors hover:border-accent hover:text-fg"
            >
              LinkedIn
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 ? (
        <Container className="mt-16">
          <h2 className="text-h3 text-fg">More from {author}</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug} className="h-full">
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </Container>
      ) : null}
    </article>
  );
}
