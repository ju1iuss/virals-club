import { Header } from "@/components/layout/header";
import { RelatedContent } from "@/components/layout/related-content";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
          <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>
          <p className="text-black/60 dark:text-white/60">Stand: 28. Januar 2026</p>

          <h2>1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle über die Website virals.club begründeten Rechtsverhältnisse zwischen Virals Club (nachfolgend „Anbieter“) und seinen Kunden.
          </p>

          <h2>2. Leistungsbeschreibung</h2>
          <p>
            Virals Club bietet Informationen, Guides, Tools und Ressourcen im Bereich Marketing und AI an. Einige Inhalte sind kostenfrei zugänglich, während andere einen Account oder eine kostenpflichtige Mitgliedschaft erfordern können.
          </p>

          <h2>3. Registrierung und Account</h2>
          <p>
            Für den Zugriff auf bestimmte Ressourcen ist eine Registrierung erforderlich. Der Nutzer ist verpflichtet, seine Zugangsdaten geheim zu halten und vor dem Zugriff durch unbefugte Dritte zu schützen.
          </p>

          <h2>4. Urheberrecht und Nutzung</h2>
          <p>
            Die auf der Website veröffentlichten Inhalte (Texte, Strategien, AI-Prompts, Grafiken) sind urheberrechtlich geschützt. Eine Vervielfältigung oder Verwendung in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung des Anbieters nicht gestattet.
          </p>

          <h2>5. Haftungsausschluss</h2>
          <p>
            Der Anbieter übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Inhalte. Die Nutzung der Strategien erfolgt auf eigene Gefahr. Für Schäden, die aus der Anwendung der bereitgestellten Informationen entstehen, wird keine Haftung übernommen.
          </p>

          <h2>6. Schlussbestimmungen</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
          </p>
        </article>

        <RelatedContent title="Lerne mehr über Virals Club" />
      </main>
    </div>
  );
}
