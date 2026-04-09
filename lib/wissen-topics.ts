import { absoluteUrl } from "@/lib/seo";

export type WissenSection = { heading: string; paragraphs: string[] };
export type WissenFaq = { question: string; answer: string };

export type WissenTopic = {
  slug: string;
  kind: "pillar" | "cluster";
  /** For clusters: pillar slug for breadcrumbs */
  parentSlug: string | null;
  title: string;
  metaDescription: string;
  intro: string;
  sections: WissenSection[];
  faq: WissenFaq[];
  relatedSlugs: string[];
};

const PILLAR_LABEL: Record<string, string> = {
  "virales-marketing": "Virales Marketing",
  "ai-marketing": "AI Marketing",
  "ai-seo": "AI SEO",
  "ugc-automation": "UGC Automation",
  "growth-engineering": "Growth Engineering",
};

export const WISSEN_TOPICS: WissenTopic[] = [
  {
    slug: "virales-marketing",
    kind: "pillar",
    parentSlug: null,
    title: "Virales Marketing: System statt Glück",
    metaDescription:
      "Virales Marketing verstehen: Algorithmen, Hooks und messbare Iteration — Playbook für Marketer und Creator in Deutschland.",
    intro:
      "Virales Marketing ist kein Zufallstreffer, sondern das Ergebnis klarer Hypothesen, schneller Iteration und Formate, die zur Plattform passen. Hier ordnen wir Grundlagen, Messgrößen und typische Fehler ein — damit du Reichweite planbar machst.",
    sections: [
      {
        heading: "Was virales Marketing heute ausmacht",
        paragraphs: [
          "Plattformen priorisieren Retention: Inhalte, die Nutzer länger in der App halten, gewinnen. Das bedeutet: Der erste Eindruck (Hook), die Story und der Wiedererkennungswert müssen in Sekunden sitzen — egal ob TikTok, Reels oder Shorts.",
          "Parallel verschiebt sich Produktion: Teams, die mit Templates, AI-Assistenz und klaren Briefings arbeiten, können mehr Varianten testen und damit die Trefferquote erhöhen.",
        ],
      },
      {
        heading: "Messbarkeit und Experimente",
        paragraphs: [
          "Ohne klare KPIs (z. B. Hook-Rate, Watchtime, Saves, Shares) bleibt Content ein Gefühlsthema. Ein einfaches Experiment-Log reicht oft: eine Idee, eine Annahme, eine Metrik, ein Zeitraum.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist virales Marketing nur für große Brands?",
        answer:
          "Nein — kleinere Accounts profitieren oft von Nischen und klarem Ton. Entscheidend ist Konsistenz und Lernen aus Daten, nicht das Budget allein.",
      },
      {
        question: "Welche Rolle spielt AI?",
        answer:
          "AI beschleunigt Recherche, Skripte und Varianten. Die Strategie — wer ihr folgt und welche Positionierung ihr tragt — bleibt menschlich.",
      },
    ],
    relatedSlugs: ["virales-marketing-hooks", "ai-marketing"],
  },
  {
    slug: "virales-marketing-hooks",
    kind: "cluster",
    parentSlug: "virales-marketing",
    title: "Hooks: Aufmerksamkeit in den ersten Sekunden",
    metaDescription:
      "Hook-Formeln für Short-Form: Muster, Beispiele und Tests — damit dein Content nicht verpufft.",
    intro:
      "Der Hook entscheidet, ob der Algorithmus dein Video überhaupt verteilt. Wir fokussieren auf klare Muster: Kontrast, offene Schleifen, konkrete Versprechen — und wie du sie A/B-testest.",
    sections: [
      {
        heading: "Muster, die funktionieren",
        paragraphs: [
          "Kontrast („So mache ich X anders als 90 % …“), Zeitdruck („In 30 Sekunden …“) und soziale Beweise („So hat [Person] …“) sind bewährt — immer im Kontext deiner Zielgruppe.",
          "Teste eine Idee pro Video; zu viele Variablen verwässern das Learning.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie lang sollte ein Hook sein?",
        answer:
          "Oft genügen 1–2 Sätze oder ein starker Visual-Hook. Wichtig ist Klarheit im ersten Moment, nicht die Länge.",
      },
    ],
    relatedSlugs: ["virales-marketing", "formate-social"],
  },
  {
    slug: "ai-marketing",
    kind: "pillar",
    parentSlug: null,
    title: "AI Marketing: Effizienz mit Leitplanken",
    metaDescription:
      "KI im Marketing: Prompts, Content-Pipelines, Markenstimme und Compliance — praxisnah für Teams in Deutschland.",
    intro:
      "AI Marketing bedeutet: wiederholbare Workflows statt Einzelkämpfer-Chatverläufe. Wir trennen Recherche, Erstellung, Review und Veröffentlichung — mit klaren Regeln für Ton, Fakten und Markenrecht.",
    sections: [
      {
        heading: "Prompts und Systemkontext",
        paragraphs: [
          "Gute Ergebnisse entstehen durch Kontext: Zielgruppe, Angebot, Tabus, Beispiele. Speichere „System-Prompts“ und Styleguides zentral — nicht nur in einzelnen Chats.",
        ],
      },
      {
        heading: "Compliance und Transparenz",
        paragraphs: [
          "Wenn AI-generierte Inhalte öffentlich sind, sollten Marken ihre Regeln kennen (z. B. Kennzeichnung, Urheberrecht bei Referenzmaterial). Interne Checks vor Publish reduzieren Risiko.",
        ],
      },
    ],
    faq: [
      {
        question: "Ersetzt AI Marketing-Teams?",
        answer:
          "Sie verändert Rollen: weniger reine Texterstellung, mehr Kuratierung, Strategie und Qualitätssicherung.",
      },
    ],
    relatedSlugs: ["ai-marketing-content-pipelines", "ai-seo"],
  },
  {
    slug: "ai-marketing-content-pipelines",
    kind: "cluster",
    parentSlug: "ai-marketing",
    title: "Content-Pipelines mit KI skalieren",
    metaDescription:
      "Von der Idee zum Posting: wie du AI in eine wiederholbare Pipeline einbindest — ohne Qualitätsverlust.",
    intro:
      "Eine Pipeline verbindet Briefing, Erstellung, Review und Distribution. KI übernimmt Varianten und Rohformen; Menschen entscheiden über Brand-Fit und Aussagen.",
    sections: [
      {
        heading: "Schritte einer robusten Pipeline",
        paragraphs: [
          "1) Briefing mit Ziel und Format, 2) Rohskript mit AI, 3) menschlicher Cut, 4) visuelle Assets, 5) Veröffentlichung mit Tracking.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie vermeide ich „generischen“ AI-Ton?",
        answer:
          "Mit Beispielen aus eurer Marke, klaren Tabus und einem letzten menschlichen Edit — nicht mit mehr Prompt-Länge allein.",
      },
    ],
    relatedSlugs: ["ai-marketing", "ugc-automation"],
  },
  {
    slug: "ai-seo",
    kind: "pillar",
    parentSlug: null,
    title: "AI SEO: Klassik, KI-Übersichten und Sichtbarkeit",
    metaDescription:
      "AI SEO erklärt: klassische Suchoptimierung, Antworten in KI-Oberflächen und strukturierte Daten — für Marketer, die 2026 Sichtbarkeit brauchen.",
    intro:
      "AI SEO ist kein Ersatz für technische und inhaltliche Grundlagen — es erweitert sie. Suchmaschinen und KI-Oberflächen liefern Antworten aus Quellen, die klar strukturiert, vertrauenswürdig und gut verlinkt sind. Wer beides bedient, gewinnt klassische Rankings und neue Zitate.",
    sections: [
      {
        heading: "Drei Ebenen: Crawling, Antworten, Autorität",
        paragraphs: [
          "Technisches SEO (Crawlbarkeit, Performance, saubere URLs) bleibt Basis. Inhaltlich zählen klare H-Struktur, Suchintention und FAQs.",
          "Für KI-Oberflächen hilft präzise, belegbare Aussagen in neutraler Sprache — plus strukturierte Daten, damit Maschinen Kontext parsen.",
        ],
      },
      {
        heading: "E-E-A-T und Quellen",
        paragraphs: [
          "Experience, Expertise, Authoritativeness, Trust bleiben relevant. Autorenprofile, Fakten, externe Referenzen und konsistente Markeninfos stärken Vertrauen.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist klassisches SEO tot?",
        answer:
          "Nein — organische Suche bleibt ein Hauptkanal. Zusätzlich optimierst du für Antwort-Snippets und KI-Zitate mit Klarheit und Struktur.",
      },
      {
        question: "Was sind strukturierte Daten?",
        answer:
          "Schema.org-Markup (z. B. Article, FAQ) hilft Suchmaschinen, Inhalte zu verstehen — sinnvoll bei Guides und Ratgebern.",
      },
    ],
    relatedSlugs: ["ai-seo-ki-overviews", "ai-seo-strukturierte-daten", "ai-seo-eeat"],
  },
  {
    slug: "ai-seo-ki-overviews",
    kind: "cluster",
    parentSlug: "ai-seo",
    title: "KI-Übersichten & AI Overviews: Inhalte, die zitiert werden",
    metaDescription:
      "So strukturierst du Inhalte für KI-Antworten und Übersichten: Klarheit, Quellen, FAQ — ohne Keyword-Stuffing.",
    intro:
      "Oberflächen wie AI Overviews bevorzugen klare Antwortblöcke, Listen und verifizierbare Fakten. Schreibe so, dass ein Modell eure Kernaussage in einem Absatz zusammenfassen kann — und verlinkt zu vertiefenden Seiten.",
    sections: [
      {
        heading: "Praxis-Tipps",
        paragraphs: [
          "Definiere Begriffe kurz, nutze Zwischenüberschriften als logische Stufen und wiederhole keine Floskeln.",
          "Verweise auf Primärquellen und eigene Daten, wenn möglich.",
        ],
      },
    ],
    faq: [
      {
        question: "Muss ich alles in Bulletpoints schreiben?",
        answer:
          "Nein — Mischformate sind ok. Wichtig sind klare Leitideen pro Absatz und eine erkennbare Schlussfolgerung.",
      },
    ],
    relatedSlugs: ["ai-seo", "ai-seo-eeat"],
  },
  {
    slug: "ai-seo-strukturierte-daten",
    kind: "cluster",
    parentSlug: "ai-seo",
    title: "Strukturierte Daten für SEO und Rich Results",
    metaDescription:
      "JSON-LD, FAQPage, Article: strukturierte Daten richtig einsetzen — mit Fokus auf Nutzen statt Spam.",
    intro:
      "Strukturierte Daten machen Seiteninhalt maschinenlesbar. Nutze sie dort, wo sie den Inhalt widerspiegeln — FAQ bei echten Fragen, Article bei Guides. Vermeide leere Marker nur für Sternchen in der SERP.",
    sections: [
      {
        heading: "Was sich lohnt",
        paragraphs: [
          "Article + Publisher für redaktionelle Inhalte, FAQPage bei Frage-Antwort-Blöcken, BreadcrumbList für Navigation.",
        ],
      },
    ],
    faq: [
      {
        question: "Strukturierte Daten = Ranking-Boost?",
        answer:
          "Sie helfen beim Verstehen und Rich Results, ersetzen aber keine Relevanz oder Links.",
      },
    ],
    relatedSlugs: ["ai-seo", "ai-seo-ki-overviews"],
  },
  {
    slug: "ai-seo-eeat",
    kind: "cluster",
    parentSlug: "ai-seo",
    title: "E-E-A-T im AI-Zeitalter",
    metaDescription:
      "Experience, Expertise, Authority, Trust: wie du Glaubwürdigkeit für Mensch und Maschine stärkst.",
    intro:
      "E-E-A-T ist kein Score, sondern ein Muster aus Signalen: wer schreibt, welche Faktenbasis besteht, wie konsistent die Marke auftritt. Für KI-Zitate zählt zudem, ob eure Seite als verlässliche Quelle erkannt wird.",
    sections: [
      {
        heading: "Konkrete Maßnahmen",
        paragraphs: [
          "Autorenseiten, klare Impressums- und About-Inhalte, nachvollziehbare Updates und externe Erwähnungen in relevanten Kontexten.",
        ],
      },
    ],
    faq: [
      {
        question: "Reicht ein generisches Autorenfoto?",
        answer:
          "Vertrauen entsteht durch Substanz: Bio, Expertise-Nachweis und inhaltliche Tiefe schlagen Stock-Fotos.",
      },
    ],
    relatedSlugs: ["ai-seo", "about"],
  },
  {
    slug: "ugc-automation",
    kind: "pillar",
    parentSlug: null,
    title: "UGC Automation: Skalierung ohne Qualitätsverlust",
    metaDescription:
      "User-Generated Content skalieren: Briefings, Creator-Ops, Freigaben und QA — für Teams, die viel testen müssen.",
    intro:
      "UGC funktioniert, wenn Creators verstehen, was die Marke braucht — und wann ihr eingreift. Automation bedeutet hier: klare Templates, schnelle Feedback-Schleifen und messbare Standards, nicht blindes Hochladen.",
    sections: [
      {
        heading: "Briefings, die halten",
        paragraphs: [
          "Definiere Dos/Don’ts, Beispiele für Ton, Pflicht-Claims und technische Specs (Format, Länge, Safe Zones).",
        ],
      },
    ],
    faq: [
      {
        question: "Wie viele Creator parallel?",
        answer:
          "Das hängt von QA-Kapazität ab — lieber weniger mit hoher Trefferquote als viele mit Streuung.",
      },
    ],
    relatedSlugs: ["ugc-automation-briefings", "virales-marketing"],
  },
  {
    slug: "ugc-automation-briefings",
    kind: "cluster",
    parentSlug: "ugc-automation",
    title: "Briefings, die Creator lieben",
    metaDescription:
      "Checklisten und Beispiele für UGC-Briefings — weniger Nacharbeit, bessere Ergebnisse.",
    intro:
      "Ein gutes Briefing reduziert Runden. Struktur: Ziel, Zielgruppe, Key-Message, Must-haves, No-gos, Referenzclips und Deadline.",
    sections: [
      {
        heading: "Template-Ideen",
        paragraphs: [
          "Nutze einseitige PDFs oder Notion-Seiten mit Screenshots guter Umsetzungen — nicht nur Textwände.",
        ],
      },
    ],
    faq: [
      {
        question: "Soll ich Skripte vorgeben?",
        answer:
          "Orientierung ja, Wortlaut-Wort-für-Wort selten — Authentizität leidet, wenn jeder Clip gleich klingt.",
      },
    ],
    relatedSlugs: ["ugc-automation", "ai-marketing-content-pipelines"],
  },
  {
    slug: "growth-engineering",
    kind: "pillar",
    parentSlug: null,
    title: "Growth Engineering: Systeme statt Hacks",
    metaDescription:
      "Growth Engineering verbindet Produkt, Daten und Marketing — Experimente, Metriken und Iteration für nachhaltiges Wachstum.",
    intro:
      "Growth Engineering denkt in Schleifen: Hypothese bauen, messen, lernen. Viralität ist ein Hebel, nicht das ganze System — ihr braucht Fundament (Produkt-Market-Fit-Signale, Retention, Aktivierung).",
    sections: [
      {
        heading: "Experimente richtig aufsetzen",
        paragraphs: [
          "Eine klare Metrik pro Test, ausreichende Stichprobe, Dokumentation der Learnings. Vermeidet „wir haben es gefühlt“.",
        ],
      },
    ],
    faq: [
      {
        question: "Growth vs. Performance Marketing?",
        answer:
          "Performance fokussiert oft Paid-Kanäle; Growth integriert Produkt, Content und Lifecycle — je nach Setup.",
      },
    ],
    relatedSlugs: ["growth-engineering-experimente", "case-studies"],
  },
  {
    slug: "growth-engineering-experimente",
    kind: "cluster",
    parentSlug: "growth-engineering",
    title: "Experimente: Von der Idee zum Learning",
    metaDescription:
      "Wie du Growth-Experimente planst, dokumentierst und skalierst — ohne Tool-Wildwuchs.",
    intro:
      "Ein Experiment braucht eine erwartete Wirkung und eine Auswertungsregel vor Start. So vermeidet ihr Post-hoc-Rationalisierung.",
    sections: [
      {
        heading: "Minimal viable Process",
        paragraphs: [
          "Backlog priorisieren (ICE/RICE), ein Ticket pro Test, Retro nach Abschluss. Tools sind sekundär zur Disziplin.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie lange laufen Tests?",
        answer:
          "Bis genug Daten für eure gewählte Signifikanz — und mindestens eine vollständige Nutzer-Woche bei B2C oft sinnvoll.",
      },
    ],
    relatedSlugs: ["growth-engineering", "lab"],
  },
  {
    slug: "formate-social",
    kind: "cluster",
    parentSlug: "virales-marketing",
    title: "Social-Formate, die ihr skalieren könnt",
    metaDescription:
      "Wiederkehrende Formate für Short- und Long-Form: Serien, Stunts und Evergreens — mit Planbarkeit.",
    intro:
      "Formate reduzieren Entscheidungsmüde: Zuschauer wissen, was kommt; Teams können wiederholen und verbessern. Kombiniert Evergreens mit trendgebundenen Stunts.",
    sections: [
      {
        heading: "Serien vs. One-offs",
        paragraphs: [
          "Serien bauen Erwartung auf; One-offs können Peaks erzeugen. Balance ist key.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie oft wechseln?",
        answer:
          "Wenn ein Format müde wird, variiert Hook und Setting — nicht jedes Mal das komplette Konzept.",
      },
    ],
    relatedSlugs: ["virales-marketing", "virales-marketing-hooks"],
  },
];

export function getWissenTopic(slug: string): WissenTopic | undefined {
  return WISSEN_TOPICS.find((t) => t.slug === slug);
}

export function getAllWissenSlugs(): string[] {
  return WISSEN_TOPICS.map((t) => t.slug);
}

/** Map relatedSlugs entries to internal paths (wissen, categories, static). */
export function resolveTopicLink(slug: string): string {
  if (slug === "about") return "/about";
  if (getWissenTopic(slug)) return `/wissen/${slug}`;
  if (
    slug === "strategie" ||
    slug === "formate" ||
    slug === "trends" ||
    slug === "meinung" ||
    slug === "newcomer" ||
    slug === "lab" ||
    slug === "case-studies"
  ) {
    return `/${slug}`;
  }
  return `/wissen/${slug}`;
}

export function relatedLinkLabel(slug: string): string {
  if (slug === "about") return "Über Virals Club";
  if (slug === "lab") return "The Growth Lab";
  if (slug === "case-studies") return "Case Studies";
  const t = getWissenTopic(slug);
  return t?.title ?? slug.replace(/-/g, " ");
}

export function faqPageJsonLd(topic: WissenTopic, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topic.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
    url,
  };
}

export function wissenBreadcrumbJsonLd(topic: WissenTopic) {
  const items: { name: string; href: string }[] = [
    { name: "Startseite", href: absoluteUrl("/") },
    { name: "Wissen", href: absoluteUrl("/wissen") },
  ];
  if (topic.parentSlug) {
    const parent = getWissenTopic(topic.parentSlug);
    const parentLabel = parent?.title ?? PILLAR_LABEL[topic.parentSlug] ?? topic.parentSlug;
    items.push({
      name: parentLabel,
      href: absoluteUrl(`/wissen/${topic.parentSlug}`),
    });
  }
  items.push({ name: topic.title, href: absoluteUrl(`/wissen/${topic.slug}`) });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      item: e.href,
    })),
  };
}
