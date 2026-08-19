import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllTemplateSlugs } from "@/data/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const templatePages = getAllTemplateSlugs().map((slug) => ({
    url: `${SITE_URL}/templates/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...templatePages,
    // Invitation pages are intentionally excluded from sitemap
    // (shared via WhatsApp, not discovered via search)
  ];
}
