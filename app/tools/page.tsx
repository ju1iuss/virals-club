import Link from "next/link";
import { Header } from "@/components/layout/header";
import { toolsHubMetadata } from "@/lib/hubs-meta";

export const metadata = toolsHubMetadata;

const STACKS = [
  {
    title: "Analytics & Messung",
    items: ["Plattform-Insights (z. B. native Analytics)", "Events in Produkt- oder CDP-Tools", "Tabellen/Sheets für Experiment-Logs"],
  },
  {
    title: "Content & Produktion",
    items: ["Short-Form Editing (CapCut, Premiere, DaVinci)", "AI-Schreib- und Skript-Assistenz (mit Review-Workflow)", "Asset-Management (Drive, Notion, DAM)"],
  },
  {
    title: "Growth & Automation",
    items: ["Newsletter & CRM (z. B. Brevo, HubSpot — je nach Stack)", "Zapier/Make für leichte Automationen", "A/B-Tools dort, wo ihr Traffic habt"],
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto max-w-3xl px-6 py-16 text-black dark:text-white">
        <p className="text-[10px] uppercase tracking-widest font-bold text-accent-vibrant mb-4">Tools</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Tools &amp; Stacks</h1>
        <p className="text-black/65 dark:text-white/50 mb-12 leading-relaxed">
          Keine endlose Tool-Liste — sondern sinnvolle Bausteine für Teams, die virales Marketing und Growth systematisch
          angehen. Wählt pro Schritt ein Haupt-Tool und vermeidet Tool-Wildwuchs.
        </p>

        <div className="space-y-12">
          {STACKS.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-serif font-bold mb-4">{s.title}</h2>
              <ul className="list-disc pl-5 space-y-2 text-black/75 dark:text-white/60">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          <p className="text-sm text-black/70 dark:text-white/55 mb-4">
            Mehr zur Einordnung: unser Wissensbereich zu AI Marketing, Pipelines und Messung.
          </p>
          <Link href="/wissen/ai-marketing" className="text-accent-vibrant font-bold hover:underline">
            Zu AI Marketing →
          </Link>
        </div>
      </main>
    </div>
  );
}
