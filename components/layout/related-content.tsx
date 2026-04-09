import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/home/article-card";

interface RelatedContentProps {
  currentSlug?: string;
  limit?: number;
  title?: string;
  /** Prefer guides in this category first, then fill from other categories. */
  preferCategory?: string | null;
}

type PageRow = {
  id: string;
  slug: string;
  category: string;
  author: string;
  title: string;
  subtitle: string | null;
  date: string;
  read_time: string;
  image: string | null;
  type: string;
};

export async function RelatedContent({
  currentSlug,
  limit = 3,
  title = "Mehr von Virals Club",
  preferCategory,
}: RelatedContentProps) {
  const supabase = await createClient();

  let pages: PageRow[] = [];

  if (preferCategory && currentSlug) {
    const { data: sameCat } = await supabase
      .from("pages")
      .select("*")
      .in("type", ["guide", "blog"])
      .eq("status", "published")
      .eq("category", preferCategory)
      .neq("slug", currentSlug)
      .order("created_at", { ascending: false })
      .limit(limit);
    pages = (sameCat ?? []) as PageRow[];
  }

  if (pages.length < limit) {
    const seen = new Set<string>([...(currentSlug ? [currentSlug] : []), ...pages.map((p) => p.slug)]);
    const { data: more } = await supabase
      .from("pages")
      .select("*")
      .in("type", ["guide", "blog"])
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(limit * 3);

    for (const p of (more ?? []) as PageRow[]) {
      if (pages.length >= limit) break;
      if (seen.has(p.slug)) continue;
      seen.add(p.slug);
      pages.push(p);
    }
  }

  if (pages.length === 0) return null;

  return (
    <div className="mt-24 pt-16 border-t border-black/10 dark:border-white/10 max-w-[720px] mx-auto w-full">
      <h3 className="text-2xl font-bold font-helvetica mb-10 text-black dark:text-white">
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {pages.map((page) => (
          <ArticleCard
            key={page.id}
            id={page.id}
            category={page.category}
            author={page.author}
            title={page.title}
            excerpt={page.subtitle || "Entdecke exklusive Strategien für viralen Erfolg."}
            date={page.date}
            readTime={page.read_time}
            slug={page.slug}
            image={page.image ?? undefined}
            type={page.type}
          />
        ))}
      </div>
    </div>
  );
}
