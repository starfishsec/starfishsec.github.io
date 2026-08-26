import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { authorName, type BlogPost } from "@/content/blog";
import { initials } from "@/content/team";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", timeZone: "UTC" });
}

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const date = formatDate(post.date);
  const author = authorName(post.authorHandle);

  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`${post.title}, by ${author}`}
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-card border border-border bg-bg-elev p-6 transition-colors duration-200 hover:border-accent/50 focus-visible:border-accent",
        featured && "md:p-8",
      )}
    >
      {featured ? <span aria-hidden="true" className="gradient-ring" /> : null}

      {/* meta row */}
      <div className="relative flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.75rem]">
        <span className="inline-flex items-center gap-2 font-mono text-fg-muted">
          <span
            aria-hidden="true"
            className="flex size-6 items-center justify-center rounded-btn border border-accent/30 bg-accent-dim text-[0.75rem] leading-none text-accent"
          >
            {initials(author)}
          </span>
          {author}
        </span>
        {date ? (
          <time className="font-mono text-fg-muted" dateTime={post.date}>
            {date}
          </time>
        ) : null}
        {post.readingTime ? <span className="font-mono text-fg-muted">{post.readingTime}</span> : null}
      </div>

      {/* title */}
      <h3
        className={cn(
          "relative font-semibold text-balance text-fg transition-colors group-hover:text-accent",
          featured ? "text-h2" : "text-h3",
        )}
      >
        {post.title}
      </h3>

      {/* summary */}
      <p
        className={cn(
          "relative text-small leading-relaxed text-fg-muted",
          featured && "max-w-3xl text-base",
        )}
      >
        {post.summary}
      </p>

      {/* footer: cve/severity + topics + read affordance */}
      <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-2">
        {post.cve ? (
          <Badge tone={post.severity ?? "neutral"}>
            {post.cve}
            {post.cvss !== undefined ? ` ${post.cvss.toFixed(1)}` : ""}
          </Badge>
        ) : null}
        {post.topics.slice(0, featured ? 4 : 2).map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-bg px-2.5 py-0.5 font-mono text-[0.75rem] text-fg-muted"
          >
            {t}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 font-mono text-[0.72rem] text-fg-muted transition-colors group-hover:text-accent">
          Read
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
