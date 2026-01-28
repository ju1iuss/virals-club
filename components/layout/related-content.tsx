import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/home/article-card";

interface RelatedContentProps {
  currentSlug?: string;
  limit?: number;
  title?: string;
}

export async function RelatedContent({ currentSlug, limit = 3, title = "Mehr von Virals Club" }: RelatedContentProps) {
  const supabase = await createClient();
  
  let query = supabase
    .from("pages")
    .select("*")
    .in("type", ["guide", "blog"])
    .order("created_at", { ascending: false });

  if (currentSlug) {
    query = query.neq("slug", currentSlug);
  }

  const { data: pages } = await query.limit(limit);

  if (!pages || pages.length === 0) return null;

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
            image={page.image}
            type={page.type}
          />
        ))}
      </div>
    </div>
  );
}
