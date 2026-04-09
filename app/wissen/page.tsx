import Link from "next/link";
import { Header } from "@/components/layout/header";
import { WISSEN_TOPICS } from "@/lib/wissen-topics";
import { wissenHubMetadata } from "@/lib/hubs-meta";

export const metadata = wissenHubMetadata;

export default function WissenHubPage() {
  const pillars = WISSEN_TOPICS.filter((t) => t.kind === "pillar");
  const clusters = WISSEN_TOPICS.filter((t) => t.kind === "cluster");

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto max-w-4xl px-6 py-20 text-black dark:text-white">
        <p className="text-[10px] uppercase tracking-widest font-bold text-accent-vibrant mb-4">Wissen</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Themenwelten für Growth &amp; virales Marketing
        </h1>
        <p className="text-lg text-black/70 dark:text-white/55 max-w-2xl leading-relaxed mb-16">
          Von AI SEO über UGC Automation bis Growth Engineering — kuratierte Deep Dives für Marketer und Creator in
          Deutschland. Jeder Pillar verlinkt auf vertiefende Artikel.
        </p>

        <section className="mb-20">
          <h2 className="text-2xl font-serif font-bold mb-8">Pillar-Themen</h2>
          <ul className="space-y-6">
            {pillars.map((p) => (
              <li
                key={p.slug}
                className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]"
              >
                <Link href={`/wissen/${p.slug}`} className="block group">
                  <span className="text-xl font-bold font-serif group-hover:text-accent-vibrant transition-colors">
                    {p.title}
                  </span>
                  <p className="text-sm text-black/65 dark:text-white/50 mt-2 leading-relaxed">{p.metaDescription}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold mb-8">Deep Dives</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {clusters.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/wissen/${c.slug}`}
                  className="block p-4 rounded-xl border border-black/8 dark:border-white/8 hover:border-accent-vibrant/40 transition-colors"
                >
                  <span className="font-bold text-sm">{c.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
