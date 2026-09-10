/**
 * Renders a mirrored post's original body. `html` is produced at build time by `lib/blog.ts`
 * (Markdown → sanitized HTML), so the founders' articles keep their full original formatting.
 * All typography lives in the `.prose-post` rules in app/globals.css.
 */
export function ArticleBody({ html }: { html: string }) {
  return <div className="prose-post" dangerouslySetInnerHTML={{ __html: html }} />;
}
