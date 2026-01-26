import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth", "/login"],
    },
    sitemap: "https://viralsclub.de/sitemap.xml",
  };
}
