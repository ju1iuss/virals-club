import { Header } from "@/components/layout/header";
import { RelatedContent } from "@/components/layout/related-content";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      
      <main className="container mx-auto max-w-3xl px-6 py-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40 hover:text-accent-vibrant transition-colors mb-12"
        >
          <ArrowLeft className="w-3 h-3" />
          Zurück zur Startseite
        </Link>

        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-serif font-bold mb-2">Impressum</h1>
          <p className="text-accent-vibrant font-bold text-sm mb-12">
            Tasy AI GmbH – Created to make an impact.
          </p>

          <section className="space-y-8">
            <div>
              <h2 className="text-lg font-bold mb-4">Angaben gemäß § 5 TMG</h2>
              <p>Tasy AI GmbH</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">Vertreten durch den Geschäftsführer:</h3>
              <p className="text-lg font-bold">Julius Kopp</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mb-2">Anschrift</h3>
              <p>
                Karlsplatz 5<br />
                80335 München<br />
                Deutschland
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mb-2">Kontakt</h3>
              <p>
                E-Mail: <a href="mailto:julius@tasy.ai" className="text-accent-vibrant hover:underline">julius@tasy.ai</a><br />
                Tel: +49 151 23402487
              </p>
            </div>

            <div className="pt-8 border-t border-black/5 dark:border-white/5">
              <h2 className="text-lg font-bold mb-4">Haftungsausschluss</h2>
              <p className="text-sm text-black/60 dark:text-white/40 leading-relaxed">
                Wir bemühen uns, die Informationen auf dieser Website aktuell, vollständig und richtig zu halten. Sollten Ihnen Fehler auffallen, informieren Sie uns bitte, damit wir diese umgehend korrigieren können.
              </p>
              <p className="text-sm text-black/60 dark:text-white/40 leading-relaxed mt-4">
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </p>
            </div>
          </section>
        </article>

        <RelatedContent title="Lust auf mehr Content?" />
      </main>
    </div>
  );
}
