import { getAllGuides } from "@/lib/mdx";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getAllGuides();
  const guideUrls = guides.map((guide) => ({
    url: `https://viralsclub.de/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://viralsclub.de",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...guideUrls,
  ];
}
