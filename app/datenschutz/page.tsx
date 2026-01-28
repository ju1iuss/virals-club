import { Header } from "@/components/layout/header";
import { RelatedContent } from "@/components/layout/related-content";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
          <h1>Datenschutzerklärung</h1>
          <p className="text-black/60 dark:text-white/60">Zuletzt aktualisiert: 28. Januar 2026</p>

          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h2>2. Datenerfassung auf unserer Website</h2>
          <h3>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:
            <br />
            <strong>Virals Club by Tasy AI</strong>
            <br />
            E-Mail: julius@tasy.ai
          </p>

          <h3>Wie erfassen wir Ihre Daten?</h3>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>

          <h2>3. Analyse-Tools und Tools von Drittanbietern</h2>
          <p>
            Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.
          </p>

          <h2>4. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
          </p>

          <h2>5. Hosting und Content Delivery Networks (CDN)</h2>
          <p>
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            <br />
            <strong>Supabase</strong>
            <br />
            Die Verwendung von Supabase erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website.
          </p>
        </article>

        <RelatedContent title="Noch mehr Insights entdecken" />
      </main>
    </div>
  );
}
