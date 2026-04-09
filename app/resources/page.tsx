import Link from "next/link";
import { Header } from "@/components/layout/header";
import { resourcesHubMetadata } from "@/lib/hubs-meta";
import { WISSEN_TOPICS } from "@/lib/wissen-topics";

export const metadata = resourcesHubMetadata;

const CATEGORY_LINKS = [
  { href: "/strategie", label: "Strategie" },
  { href: "/formate", label: "Formate" },
  { href: "/trends", label: "Trends" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/lab", label: "The Growth Lab" },
];

export default function ResourcesPage() {
  const pillars = WISSEN_TOPICS.filter((t) => t.kind === "pillar");

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto max-w-3xl px-6 py-16 text-black dark:text-white">
        <p className="text-[10px] uppercase tracking-widest font-bold text-accent-vibrant mb-4">Ressourcen</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ressourcen &amp; Einstieg</h1>
        <p className="text-black/65 dark:text-white/50 mb-12 leading-relaxed">
          Hier sammeln wir Einstiege in unsere Themenwelten — von kuratierten Wissens-Pillars bis zu Feed-Kategorien mit
          aktuellen Artikeln.
        </p>

        <section className="mb-14">
          <h2 className="text-xl font-serif font-bold mb-4">Wissens-Hub</h2>
          <p className="text-sm text-black/60 dark:text-white/45 mb-6">
            Tiefgehende Artikel zu AI SEO, viralem Marketing, UGC und Growth Engineering.
          </p>
          <Link
            href="/wissen"
            className="inline-flex px-6 py-3 rounded-full bg-accent-vibrant text-black font-black uppercase tracking-widest text-[10px]"
          >
            Zum Wissens-Hub
          </Link>
          <ul className="mt-8 space-y-3">
            {pillars.map((p) => (
              <li key={p.slug}>
                <Link href={`/wissen/${p.slug}`} className="text-accent-vibrant font-bold hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-serif font-bold mb-4">Kategorien</h2>
          <p className="text-sm text-black/60 dark:text-white/45 mb-6">
            Unser Feed nach Themen — passend zu Strategie, Trends und Case Studies.
          </p>
          <ul className="flex flex-wrap gap-3">
            {CATEGORY_LINKS.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="inline-block px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-sm font-bold hover:border-accent-vibrant/50 transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-serif font-bold mb-4">Guides</h2>
          <p className="text-sm text-black/60 dark:text-white/45 mb-6">Alle veröffentlichten Playbooks auf einen Blick.</p>
          <Link href="/guides" className="text-accent-vibrant font-bold hover:underline">
            Zur Guides-Übersicht →
          </Link>
        </section>
      </main>
    </div>
  );
}
