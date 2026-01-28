import { ArticleCard } from "./article-card";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import Link from "next/link";
import { Plus } from "lucide-react";

export async function Feed() {
  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("pages")
    .select("*")
    .in("type", ["guide", "blog"])
    .order("created_at", { ascending: false });
  
  const isUserAdmin = await isAdmin();
  
  if (!pages) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-black dark:text-white">
          Blog Posts Übersicht
        </h2>
        {isUserAdmin && (
          <Link
            href="/create"
            className="flex items-center gap-2 px-4 py-2 bg-accent-vibrant text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-all shadow-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            Create Page
          </Link>
        )}
      </div>
      <div className="flex flex-col divide-y divider-subtle">
        {pages.map((page) => (
          <ArticleCard 
            key={`${page.type}-${page.slug}`}
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
