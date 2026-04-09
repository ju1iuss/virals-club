import type { Metadata } from "next";
import { absoluteUrl, ogImageUrl, SITE_NAME } from "@/lib/seo";

export function buildGuideMetadata(opts: {
  slug: string;
  title: string;
  description: string;
  image?: string | null;
  indexable: boolean;
}): Metadata {
  const canonical = absoluteUrl(`/guides/${opts.slug}`);
  const og = ogImageUrl(opts.image);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    robots: opts.indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: opts.title,
      description: opts.description,
      images: og ? [{ url: og }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: og ? [og] : undefined,
    },
  };
}
