import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

const tw = { card: "summary_large_image" as const };

export const guidesHubMetadata: Metadata = {
  title: "Guides",
  description:
    "Alle Guides und Playbooks — virale Strategien, AI, Growth und Case Studies von Virals Club Deutschland.",
  alternates: { canonical: absoluteUrl("/guides") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/guides"),
    siteName: SITE_NAME,
    title: `Guides — ${SITE_NAME}`,
    description:
      "Exklusive Guides zu viralem Marketing, KI-Prompts und Growth Engineering.",
  },
  twitter: {
    ...tw,
    title: "Guides",
    description: "Playbooks und Strategien für die nächste Generation von Marketern.",
  },
};

export const resourcesHubMetadata: Metadata = {
  title: "Ressourcen",
  description:
    "Ressourcen, Themen-Hubs und Links — Wissen zu viralem Marketing, AI SEO und Growth.",
  alternates: { canonical: absoluteUrl("/resources") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/resources"),
    siteName: SITE_NAME,
    title: `Ressourcen | ${SITE_NAME}`,
    description: "Kuratierter Einstieg in unsere Wissensbereiche und Kategorien.",
  },
  twitter: {
    ...tw,
    title: "Ressourcen",
    description: "Themen, Hub-Seiten und weiterführende Inhalte.",
  },
};

export const toolsHubMetadata: Metadata = {
  title: "Tools",
  description:
    "Tool-Empfehlungen und Stacks für Creator- und Growth-Teams — von Analytics bis AI-Workflows.",
  alternates: { canonical: absoluteUrl("/tools") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tools"),
    siteName: SITE_NAME,
    title: `Tools | ${SITE_NAME}`,
    description: "Welche Tools sich für Produktion, Analytics und Automation lohnen.",
  },
  twitter: {
    ...tw,
    title: "Tools",
    description: "Stacks und Tools für virales Marketing und Growth.",
  },
};

export const wissenHubMetadata: Metadata = {
  title: "Wissen",
  description:
    "Wissens-Hub: virales Marketing, AI Marketing, AI SEO, UGC Automation und Growth Engineering — für Marketer in Deutschland.",
  alternates: { canonical: absoluteUrl("/wissen") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/wissen"),
    siteName: SITE_NAME,
    title: `Wissen | ${SITE_NAME}`,
    description:
      "Pillar-Artikel und Deep Dives zu Growth, AI und viralem Erfolg.",
  },
  twitter: {
    ...tw,
    title: "Wissen",
    description: "Themenwelten: von AI SEO bis UGC Automation.",
  },
};
