import { AlertTriangle, Info } from "lucide-react";
import type { ReactNode } from "react";
import type { ContentBlock } from "@/content/blog";

/**
 * Minimal inline formatter for post bodies (no external markdown lib in the client bundle):
 * `code`, **bold**, *italic* and [links](https://…). Block structure is parsed at build time
 * in lib/blog.ts; this handles only what appears inside a text run.
 */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("`")) {
      out.push(
        <code
          key={i}
          className="rounded bg-bg-elev-2 px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
        >
          {tok.slice(1, -1)}
        </code>,
      );
    } else if (tok.startsWith("**")) {
      out.push(
        <strong key={i} className="font-semibold text-fg">
          {tok.slice(2, -2)}
        </strong>,
      );
    } else if (tok.startsWith("[")) {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(tok);
      if (link) {
        const external = /^https?:\/\//.test(link[2]);
        out.push(
          <a
            key={i}
            href={link[2]}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="text-fg underline underline-offset-4 transition-colors hover:text-accent"
          >
            {inline(link[1])}
          </a>,
        );
      } else {
        out.push(tok);
      }
    } else {
      out.push(<em key={i}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "h2":
            return (
              <h2 key={i} className="mt-4 text-h2 text-balance text-fg">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-2 text-h3 text-fg">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-base leading-relaxed text-fg-muted">
                {inline(block.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2.5">
                {block.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed text-fg-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="flex flex-col gap-2.5">
                {block.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed text-fg-muted">
                    <span className="mt-0.5 font-mono text-small font-medium text-accent">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ol>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-card border border-border bg-bg-elev p-4 font-mono text-small leading-relaxed text-fg"
              >
                <code>{block.code}</code>
              </pre>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-accent/50 pl-4 text-base leading-relaxed text-fg-muted italic"
              >
                {inline(block.text)}
              </blockquote>
            );
          case "callout": {
            const warn = block.tone === "warn";
            const Icon = warn ? AlertTriangle : Info;
            return (
              <aside
                key={i}
                className={`flex gap-3 rounded-card border p-4 ${
                  warn ? "border-warn/40 bg-warn/5" : "border-accent/30 bg-accent-dim"
                }`}
              >
                <Icon
                  className={`mt-0.5 size-5 shrink-0 ${warn ? "text-warn" : "text-accent"}`}
                  aria-hidden="true"
                />
                <div>
                  {block.title ? (
                    <p className={`font-semibold ${warn ? "text-warn" : "text-accent"}`}>
                      {block.title}
                    </p>
                  ) : null}
                  <p className="mt-0.5 text-small leading-relaxed text-fg-muted">
                    {inline(block.text)}
                  </p>
                </div>
              </aside>
            );
          }
          case "img":
            return (
              <figure key={i} className="my-2 flex flex-col gap-2">
                <span className="overflow-hidden rounded-card border border-border bg-bg-elev">
                  {/* Content images have arbitrary intrinsic sizes and the site is a static export
                      with unoptimized images, so a plain lazy <img> is the right primitive here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.src}
                    alt={block.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </span>
                {block.caption ? (
                  <figcaption className="text-small text-fg-subtle">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
