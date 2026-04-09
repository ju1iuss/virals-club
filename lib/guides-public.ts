import { createClient } from "@/lib/supabase/server";

export type GuideMetaRow = {
  slug: string;
  title: string;
  subtitle: string | null;
  image: string | null;
  status: string | null;
  updated_at: string | null;
  category: string | null;
  author: string | null;
  date: string | null;
};

export async function getGuideForMetadata(slug: string): Promise<GuideMetaRow | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("slug,title,subtitle,image,status,updated_at,category,author,date")
    .eq("type", "guide")
    .eq("slug", slug)
    .maybeSingle();
  return data as GuideMetaRow | null;
}

export type SitemapContentRow = { slug: string; updated_at: string | null; type: string };

/** Published guides for sitemap (blog has no public route yet — guides only). */
export async function getPublishedContentForSitemap(): Promise<SitemapContentRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("slug,updated_at,type")
    .eq("type", "guide")
    .eq("status", "published");

  return (data ?? []) as SitemapContentRow[];
}
