export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://virals.club";

export const SITE_NAME = "Virals Club Deutschland";

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export function ogImageUrl(image?: string | null): string | undefined {
  if (!image) return absoluteUrl("/YC-white.png");
  if (image.startsWith("http")) return image;
  return absoluteUrl(image);
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/YC-white.png"),
  description:
    "Die Plattform für virale Marketing-Strategien, AI-Prompts und Growth Case Studies für die nächste Generation von Marketern.",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export function breadcrumbListJsonLd(entries: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      item: e.href,
    })),
  };
}
