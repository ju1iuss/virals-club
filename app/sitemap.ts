import { MetadataRoute } from "next";
import { getPublishedContentForSitemap } from "@/lib/guides-public";
import { getAllWissenSlugs } from "@/lib/wissen-topics";
import { SITE_URL } from "@/lib/seo";

const STATIC_PATHS: MetadataRoute.Sitemap = [
  "/",
  "/about",
  "/advertise",
  "/agb",
  "/datenschutz",
  "/impressum",
  "/guides",
  "/resources",
  "/tools",
  "/wissen",
  "/strategie",
  "/formate",
  "/trends",
  "/meinung",
  "/newcomer",
  "/lab",
  "/case-studies",
].map((path) => ({
  url: `${SITE_URL}${path}`,
  lastModified: new Date(),
  changeFrequency: "weekly" as const,
  priority: path === "/" ? 1 : 0.75,
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getPublishedContentForSitemap();
  const guideUrls: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: g.updated_at ? new Date(g.updated_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const wissenUrls: MetadataRoute.Sitemap = getAllWissenSlugs().map((slug) => ({
    url: `${SITE_URL}/wissen/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...STATIC_PATHS, ...guideUrls, ...wissenUrls];
}
