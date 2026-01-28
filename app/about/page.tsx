import { Header } from "@/components/layout/header";
import { RelatedContent } from "@/components/layout/related-content";
import Image from "next/image";
import { Target, Zap, TrendingUp, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-6 py-20">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-black dark:text-white leading-tight">
              The <span className="text-accent-vibrant">growth engineers</span> mindset.
            </h1>
            <p className="text-xl text-black/60 dark:text-white/40 leading-relaxed">
              Virals Club ist die Plattform für die nächste Generation von Marketern. Wir kombinieren Engineering-Prinzipien mit kreativem Content, um skalierbares Wachstum im AI-Zeitalter zu ermöglichen.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-black dark:text-white">Unsere Mission</h2>
              <p className="text-black/70 dark:text-white/60 leading-relaxed">
                In einer Welt, in der Content durch AI demokratisiert wird, gewinnen diejenigen, die Technologie verstehen und strategisch einsetzen. Wir helfen Brands und Creatorn dabei, diese neuen Möglichkeiten zu nutzen.
              </p>
              <p className="text-black/70 dark:text-white/60 leading-relaxed">
                Von automatisierten UGC-Strategien bis hin zu datengetriebenen AI-Prompts – wir liefern das Playbook für viralen Erfolg, der nicht auf Glück, sondern auf Systemen basiert.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-3">
                <Zap className="w-6 h-6 text-accent-vibrant" />
                <h3 className="font-bold text-sm">Speed</h3>
                <p className="text-xs text-black/50 dark:text-white/40">Schnelle Iteration und Umsetzung neuer Trends.</p>
              </div>
              <div className="p-6 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-3">
                <Target className="w-6 h-6 text-accent-vibrant" />
                <h3 className="font-bold text-sm">Precision</h3>
                <p className="text-xs text-black/50 dark:text-white/40">Datengetriebene Entscheidungen statt Raten.</p>
              </div>
              <div className="p-6 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-3">
                <TrendingUp className="w-6 h-6 text-accent-vibrant" />
                <h3 className="font-bold text-sm">Scale</h3>
                <p className="text-xs text-black/50 dark:text-white/40">Systeme, die mit deinem Erfolg wachsen.</p>
              </div>
              <div className="p-6 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-3">
                <Users className="w-6 h-6 text-accent-vibrant" />
                <h3 className="font-bold text-sm">Community</h3>
                <p className="text-xs text-black/50 dark:text-white/40">Ein Netzwerk aus Experten und Machern.</p>
              </div>
            </div>
          </div>

          {/* Vision/Founder Section */}
          <div className="bg-black dark:bg-white text-white dark:text-black rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden bg-white/10 flex-shrink-0 border-4 border-accent-vibrant">
               <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">JK</div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold">The Vision</h2>
                <p className="text-accent-vibrant font-bold text-sm uppercase tracking-widest">Julius Kopp, Founder</p>
              </div>
              <p className="text-white/70 dark:text-black/60 leading-relaxed italic text-lg">
                "Marketing war früher Kunst. Heute ist es eine Kombination aus Psychologie und Software-Engineering. Virals Club ist der Ort, an dem wir diese beiden Welten vereinen."
              </p>
            </div>
          </div>

          {/* Related Content */}
          <RelatedContent title="Starte jetzt mit unseren Guides" />
        </div>
      </main>
    </div>
  );
}
