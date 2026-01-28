import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { GuideClient } from "./guide-client";
import { MDXRemote } from "next-mdx-remote/rsc";
import { RelatedContent } from "@/components/layout/related-content";

type Params = Promise<{ slug: string }>;

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

  // Pre-render MDX if it's legacy content
  let mdxElement = null;
  if (guide.content && typeof guide.content === 'object' && 'mdx' in guide.content) {
    mdxElement = <MDXRemote source={guide.content.mdx} />;
  }

  return (
    <GuideClient guide={guide} isAdmin={isUserAdmin} mdxElement={mdxElement}>
      <RelatedContent currentSlug={slug} title="Das könnte dich auch interessieren" />
    </GuideClient>
  );
}

