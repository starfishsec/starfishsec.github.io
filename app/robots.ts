import type { MetadataRoute } from "next";

// Required for `output: "export"`: metadata routes must declare themselves static.
export const dynamic = "force-static";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
