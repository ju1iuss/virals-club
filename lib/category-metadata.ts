import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

const CATEGORY_MAP: Record<string, string> = {
  strategie: "Strategie",
  formate: "Formate",
  trends: "Trends",
  meinung: "Meinung",
  newcomer: "Newcomer",
  lab: "The Growth Lab",
  "case-studies": "Case Studies",
};

const DESCRIPTIONS: Record<string, string> = {
  strategie:
    "Virale Marketing-Strategien, Playbooks und Systeme — Virals Club Deutschland für Growth-orientierte Marketer.",
  formate:
    "Content-Formate, die skalieren: Hooks, Skripte und Strukturen für Social und Short-Form.",
  trends:
    "Aktuelle Trends in Social, AI und Creator-Ökonomie — analysiert für die Praxis.",
  meinung:
    "Meinung und Einordnung zu Marketing, AI und viralem Wachstum aus der Virals-Community.",
  newcomer:
    "Newcomer, aufstrebende Brands und frische Perspektiven — Inspiration für schnelles Wachstum.",
  lab: "The Growth Lab: Experimente, Taktiken und datengetriebene Ideen zum Ausprobieren.",
  "case-studies":
    "Case Studies und Breakdowns: Was funktioniert — mit Zahlen, Learnings und Next Steps.",
};

export function getCategoryLabel(slug: string): string | undefined {
  return CATEGORY_MAP[slug];
}

export function buildCategoryMetadata(slug: string): Metadata | null {
  const label = CATEGORY_MAP[slug];
  if (!label) return null;
  const description = DESCRIPTIONS[slug] ?? `${label} — Artikel und Guides bei ${SITE_NAME}.`;
  const canonical = absoluteUrl(`/${slug}`);
  const title = label;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
