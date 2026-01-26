import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-12 sticky top-24 h-fit">
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b divider-subtle pb-2">Editorial Picks</h3>
        <div className="flex flex-col gap-6">
          <SidebarItem 
            title="Wie ich 1,000 TikTok Creators manage"
            description="Learnings von einem Growth Hacker aus München."
          />
          <SidebarItem 
            title="Warum Kopieren dich zum Ziel führt"
            author="Floor Niemans"
            category="Meinung"
          />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b divider-subtle pb-2">Popular Reads</h3>
        <div className="flex flex-col gap-6">
          <PopularItem 
            num="1"
            title="Der AI Breakup Doodle mit 23.8M Views"
            description="Ein KI 'crying girlfriend' selfie und seine Auswirkungen."
          />
          <PopularItem 
            num="2"
            title="9.7M Views mit einem einzigen KI Bild"
            description="Automatisierung der Jobmarkt-Verzweiflung."
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6 border-b divider-subtle pb-2">
          <h3 className="text-sm font-bold uppercase tracking-widest">Ressourcen</h3>
          <Link href="/resources" className="text-[10px] text-white/40 hover:text-white transition-colors flex items-center gap-1">
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

function SidebarItem({ title, description, author, category }: any) {
  return (
    <div className="group cursor-pointer">
      <Link href="/guide/placeholder" className="text-sm font-bold group-hover:text-accent-vibrant transition-colors block mb-1 leading-tight">
        {title}
      </Link>
      {description && <p className="text-[11px] text-white/40 mb-2 leading-relaxed group-hover:text-white/60 transition-colors">{description}</p>}
      {author && (
        <div className="text-[9px] text-white/20 font-bold uppercase tracking-[0.15em] group-hover:text-white/40 transition-colors">
          <span className="text-accent-vibrant/40">{category}</span> • {author}
        </div>
      )}
    </div>
  );
}

function PopularItem({ num, title, description }: any) {
  return (
    <div className="flex gap-3 group cursor-pointer">
      <span className="text-2xl font-serif font-bold text-white/5 group-hover:text-accent-vibrant/20 transition-colors shrink-0">{num}</span>
      <div>
        <Link href="/guide/placeholder" className="text-[13px] font-bold group-hover:text-accent-vibrant transition-colors block mb-1 leading-snug">
          {title}
        </Link>
        <p className="text-[10px] text-white/30 leading-relaxed group-hover:text-white/50 transition-colors line-clamp-2">{description}</p>
      </div>
    </div>
  );
}

function ResourceLink({ label }: { label: string }) {
  return (
    <Link href="#" className="text-[11px] text-white/50 hover:text-white transition-colors bg-white/[0.02] p-2.5 rounded border border-white/5 hover:border-accent-vibrant/20 hover:bg-white/[0.04] transition-all flex items-center justify-between group">
      {label}
      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent-vibrant" />
    </Link>
  );
}
