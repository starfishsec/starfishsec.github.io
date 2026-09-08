import type { Metadata } from "next";
import { blogHeading, sortedPosts } from "@/content/blog";
import { team } from "@/content/team";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Research & Writing",
  description:
    "Deep-dive vulnerability analyses, weaponized proofs-of-concept, and security research published by the Starfish Security founders, with links to every original.",
  alternates: { canonical: "/blog" },
  // Hidden from nav, footer and sitemap until complete (owner, 2026-08-26); keep out of search too.
  robots: { index: false, follow: false },
};

export default function BlogPage() {
  // Authors, in team order, that actually have posts.
  const authors = team
    .map((m) => m.handle)
    .filter((h): h is string => Boolean(h) && sortedPosts.some((p) => p.authorHandle === h));

  const cveCount = new Set(sortedPosts.map((p) => p.cve).filter(Boolean)).size;

  const stats = [
    { value: String(sortedPosts.length), label: "published write-ups" },
    { value: String(cveCount), label: "CVEs dissected" },
    { value: String(authors.length), label: "founding researchers" },
  ];

  return (
    <>
      {/* Header band with motif */}
      <section
        className="relative isolate overflow-hidden border-b border-border"
        aria-labelledby="blog-title"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_at_50%_0%,black_5%,transparent_60%)]" />
          <div className="absolute left-1/2 top-0 h-[24rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 bg-accent-glow blur-3xl" />
        </div>
        <Container className="flex flex-col gap-8 pt-16 pb-14 md:pt-24 md:pb-20">
          <SectionHeading
            as="h1"
            id="blog-title"
            title={blogHeading.title}
            subtitle={blogHeading.subtitle}
          />
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="font-mono text-3xl font-medium tracking-tight text-fg tabular-nums">
                  {s.value}
                </dt>
                <dd className="text-small text-fg-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Explorer */}
      <section className="py-14 md:py-20" aria-label="All posts">
        <Container>
          <BlogExplorer posts={sortedPosts} authors={authors} />
        </Container>
      </section>
    </>
  );
}
