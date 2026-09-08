import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (owner decision, 2026-09-08): the whole site builds to `out/`
 * with no server. The contact form posts to FormSubmit (see content/site.ts) instead of a server
 * action.
 *
 * - `images.unoptimized`: the on-demand image optimizer needs a server; the site's images are a
 *   handful of small logo PNGs, so this costs nothing measurable.
 * - `trailingSlash`: emits `route/index.html` files, which GitHub Pages serves natively (no 404s
 *   on deep links or refresh).
 * - Custom domain (starfishsec.com) ⇒ no `basePath`. If the site is ever served from
 *   username.github.io/<repo> instead, set `basePath: "/<repo>"`.
 * - `public/.nojekyll` ships with the export so Pages doesn't run Jekyll (which would drop the
 *   `_next/` directory).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
