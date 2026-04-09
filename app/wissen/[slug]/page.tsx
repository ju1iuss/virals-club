import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { WissenTopicView } from "@/components/wissen/wissen-topic-view";
import { getAllWissenSlugs, getWissenTopic } from "@/lib/wissen-topics";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllWissenSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getWissenTopic(slug);
  if (!topic) {
    return { title: "Wissen" };
  }
  const canonical = absoluteUrl(`/wissen/${slug}`);
  return {
    title: topic.title,
    description: topic.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: topic.title,
      description: topic.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: topic.title,
      description: topic.metaDescription,
    },
  };
}

export default async function WissenTopicPage({ params }: { params: Params }) {
  const { slug } = await params;
  const topic = getWissenTopic(slug);
  if (!topic) notFound();
  return <WissenTopicView topic={topic} />;
}
