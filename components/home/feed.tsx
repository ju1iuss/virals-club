import { ArticleCard } from "./article-card";
import { getAllGuides } from "@/lib/mdx";

export async function Feed() {
  const guides = await getAllGuides();
  
  // Sort guides by date (assuming date is in a sortable format or just reversed for latest)
  const sortedGuides = guides.reverse();

  return (
    <div className="flex flex-col">
      <h2 className="font-serif font-bold text-3xl md:text-4xl mb-8 text-black dark:text-white">
        Blog Posts Übersicht
      </h2>
      <div className="flex flex-col divide-y divider-subtle">
        {sortedGuides.map((guide) => (
          <ArticleCard 
            key={guide.slug}
            category={guide.meta.category}
            author={guide.meta.author}
            title={guide.meta.title}
            excerpt={guide.meta.subtitle || "Entdecke exklusive Strategien für viralen Erfolg."}
            date={guide.meta.date}
            readTime={guide.meta.readTime}
            slug={guide.slug}
            image={guide.meta.image}
          />
        ))}
      </div>
    </div>
  );
}
