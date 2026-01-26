import { getGuideBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SoftGate } from "@/components/content/soft-gate";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import Image from "next/image";

type Params = Promise<{ slug: string }>;

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-black">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": guide.meta.title,
        "author": { "@type": "Person", "name": guide.meta.author },
        "datePublished": guide.meta.date,
        "description": guide.meta.subtitle || guide.meta.title
      }} />
      
      <Header />
      
      <article className="container mx-auto max-w-[720px] px-6 py-12 text-white">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-[10px] text-accent-vibrant font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-vibrant animate-pulse" />
            {guide.meta.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.1] tracking-tight">
            {guide.meta.title}
          </h1>
          {guide.meta.subtitle && (
            <p className="text-xl md:text-2xl text-white/50 mb-10 font-sans leading-relaxed font-light">
              {guide.meta.subtitle}
            </p>
          )}
          <div className="flex items-center justify-between py-6 border-y divider-subtle mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold border border-white/5">
                {guide.meta.author.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white/90">{guide.meta.author}</span>
                <span className="text-[10px] text-white/40">{guide.meta.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-white/40 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-white/20" />
                {guide.meta.readTime}
              </span>
            </div>
          </div>

          {guide.meta.image && (
            <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-16 glow-subtle border border-white/5">
              <Image 
                src={guide.meta.image} 
                alt={guide.meta.title}
                fill
                className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                priority
              />
            </div>
          )}
        </header>
        
        <div className="prose prose-invert prose-p:text-white/80 prose-p:leading-[1.8] prose-p:mb-8 prose-headings:text-white prose-headings:font-sans prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4 prose-strong:text-white prose-strong:font-bold prose-li:text-white/80 prose-li:mb-3 prose-ul:mb-8 prose-ol:mb-8 max-w-none text-[17px] selection:bg-accent-vibrant/30">
          <SoftGate isGated={guide.meta.gated} user={user}>
            <MDXRemote source={guide.content} />
          </SoftGate>
        </div>
      </article>
    </div>
  );
}
