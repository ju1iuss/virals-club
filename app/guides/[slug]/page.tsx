import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { GuideClient } from "./guide-client";
import { MDXRemote } from "next-mdx-remote/rsc";
import { RelatedContent } from "@/components/layout/related-content";
import { getGuideForMetadata } from "@/lib/guides-public";
import { buildGuideMetadata } from "@/lib/metadata-helpers";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, breadcrumbListJsonLd } from "@/lib/seo";
import { categoryHref } from "@/lib/category-routes";
import type { BreadcrumbItem } from "@/components/seo/breadcrumbs";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideForMetadata(slug);
  if (!guide) {
    return {
      title: "Guide",
      robots: { index: false, follow: false },
    };
  }
  const raw = guide.subtitle?.trim();
  const description = raw
    ? raw.length > 160
      ? `${raw.slice(0, 157)}…`
      : raw
    : `${guide.title} — Strategien, AI & Growth bei Virals Club Deutschland.`;
  const indexable = guide.status === "published";
  return buildGuideMetadata({
    slug,
    title: guide.title,
    description,
    image: guide.image,
    indexable,
  });
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: guide } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("type", "guide")
    .single();

  if (!guide) notFound();

  const isUserAdmin = await isAdmin();

  let mdxElement = null;
  if (guide.content && typeof guide.content === "object" && "mdx" in guide.content) {
    mdxElement = <MDXRemote source={guide.content.mdx} />;
  }

  const catHref = categoryHref(guide.category);
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Startseite", href: "/" },
    { label: "Guides", href: "/guides" },
  ];
  if (guide.category && catHref) {
    breadcrumbItems.push({ label: guide.category, href: catHref });
  }
  breadcrumbItems.push({ label: guide.title });

  const breadcrumbLd = breadcrumbListJsonLd([
    { name: "Startseite", href: absoluteUrl("/") },
    { name: "Guides", href: absoluteUrl("/guides") },
    ...(guide.category && catHref
      ? [{ name: guide.category, href: absoluteUrl(catHref) }]
      : []),
    { name: guide.title, href: absoluteUrl(`/guides/${slug}`) },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <GuideClient
        guide={guide}
        isAdmin={isUserAdmin}
        mdxElement={mdxElement}
        breadcrumbItems={breadcrumbItems}
        canonicalUrl={absoluteUrl(`/guides/${slug}`)}
      >
        <RelatedContent
          currentSlug={slug}
          preferCategory={guide.category}
          title="Das könnte dich auch interessieren"
        />
      </GuideClient>
    </>
  );
}
