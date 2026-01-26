import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-12 sticky top-24 h-fit">
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b divider-subtle pb-2 text-black dark:text-white">Editorial Picks</h3>
        <div className="flex flex-col gap-6">
          <SidebarItem 
            title="Die 40+ Account Strategie: Automatisierte AI UGC-Videos"
            description="Wie wir mit post management & AI UGC täglich 4x mehr Klicks generieren."
            slug="automated-ugc-strategy"
          />
          <SidebarItem 
            title="Von 0 auf 45 Mio. Views: In 60 Tagen zum TikTok-Erfolg"
            description="5 glasklare Lektionen von Jeewon Shin (Chief of Staff @ Alta), wie man ohne Vorerfahrung viral geht."
            slug="tiktok-beginner-to-45m-views"
          />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b divider-subtle pb-2 text-black dark:text-white">Popular Reads</h3>
        <div className="flex flex-col gap-6">
          <PopularItem 
            num="1"
            title="Wie Man Viral AI Pages baut und bis zu €275k/Monat mit Affiliates macht!"
            description="Die exakte Strategie hinter Yang Muns Erfolg mit 2,5 Millionen Followern und wie du sie kopierst."
            slug="viral-ai-pages-guide"
          />
          <PopularItem 
            num="2"
            title="Die 40+ Account Strategie: Automatisierte AI UGC-Videos"
            description="Wie wir mit post management & AI UGC täglich 4x mehr Klicks generieren."
            slug="automated-ugc-strategy"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6 border-b divider-subtle pb-2">
          <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Ressourcen</h3>
          <Link href="/resources" className="text-[10px] text-black/60 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
            Alle <ArrowRight className="w-2 h-2" />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <ResourceLink label="How To TikTok Marketing Guides" />
          <ResourceLink label="35M Views in 60 Tagen CoupleJoy Dataset" />
          <ResourceLink label="298M+ Views Locket Viral Hooks" />
        </div>
      </section>
    </div>
  );
}

function SidebarItem({ title, description, author, category, slug }: any) {
  return (
    <div className="group cursor-pointer">
      <Link href={`/guides/${slug || 'placeholder'}`} className="text-sm font-bold group-hover:text-accent-vibrant transition-colors block mb-1 leading-tight text-black dark:text-white">
        {title}
      </Link>
      {description && <p className="text-[11px] text-black/70 dark:text-white/40 mb-2 leading-relaxed group-hover:text-black dark:group-hover:text-white/60 transition-colors">{description}</p>}
      {author && (
        <div className="text-[9px] text-black/50 dark:text-white/20 font-bold uppercase tracking-[0.15em] group-hover:text-black/70 dark:group-hover:text-white/40 transition-colors">
          <span className="text-accent-vibrant/40">{category}</span> • {author}
        </div>
      )}
    </div>
  );
}

function PopularItem({ num, title, description, slug }: any) {
  return (
    <div className="flex gap-3 group cursor-pointer">
      <span className="text-2xl font-serif font-bold text-black/10 dark:text-white/5 group-hover:text-accent-vibrant/20 transition-colors shrink-0">{num}</span>
      <div>
        <Link href={`/guides/${slug || 'placeholder'}`} className="text-[13px] font-bold group-hover:text-accent-vibrant transition-colors block mb-1 leading-snug text-black dark:text-white">
          {title}
        </Link>
        <p className="text-[10px] text-black/60 dark:text-white/30 leading-relaxed group-hover:text-black/80 dark:group-hover:text-white/50 transition-colors line-clamp-2">{description}</p>
      </div>
    </div>
  );
}

function ResourceLink({ label }: { label: string }) {
  return (
    <Link href="#" className="text-[11px] text-black/70 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors bg-black/5 dark:bg-white/[0.02] p-2.5 rounded border border-black/10 dark:border-white/5 hover:border-accent-vibrant/20 hover:bg-black/10 dark:hover:bg-white/[0.04] transition-all flex items-center justify-between group">
      {label}
      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent-vibrant" />
    </Link>
  );
}
