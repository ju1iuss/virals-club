import Link from "next/link";
import { Header } from "@/components/layout/header";
import { createClient } from "@/lib/supabase/server";
import { ArticleCard } from "@/components/home/article-card";
import { JsonLd } from "@/components/seo/json-ld";
import { guidesHubMetadata } from "@/lib/hubs-meta";
import { absoluteUrl } from "@/lib/seo";

export const metadata = guidesHubMetadata;

export default async function GuidesIndexPage() {
  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("pages")
    .select("*")
    .eq("type", "guide")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const itemListLd =
    pages && pages.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: pages.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: absoluteUrl(`/guides/${p.slug}`),
            name: p.title,
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {itemListLd && <JsonLd data={itemListLd} />}
      <Header />
      <main className="container mx-auto max-w-3xl px-6 py-16 text-black dark:text-white">
        <p className="text-[10px] uppercase tracking-widest font-bold text-accent-vibrant mb-4">Guides</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Alle Guides</h1>
        <p className="text-black/65 dark:text-white/50 mb-12 max-w-xl leading-relaxed">
          Playbooks und Strategien von Virals Club Deutschland — virales Marketing, AI und Growth Engineering.
        </p>

        {pages && pages.length > 0 ? (
          <div className="flex flex-col divide-y divider-subtle">
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
        ) : (
          <p className="text-black/50 dark:text-white/35">
            Noch keine veröffentlichten Guides — schau bald wieder vorbei oder starte auf der{" "}
            <Link href="/" className="text-accent-vibrant font-bold">
              Startseite
            </Link>
            .
          </p>
        )}
      </main>
    </div>
  );
}
