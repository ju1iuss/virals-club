import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

const ogDefaults = {
  siteName: SITE_NAME,
  locale: "de_DE",
  type: "website" as const,
};

export const homeMetadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} | The growth engineers mindset`,
  },
  description:
    "Die Plattform für virale Marketing-Strategien, AI-Prompts und Growth Case Studies — Virals Club Deutschland.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    ...ogDefaults,
    url: absoluteUrl("/"),
    title: `${SITE_NAME} | The growth engineers mindset`,
    description:
      "Die Plattform für virale Marketing-Strategien, AI-Prompts und Growth Case Studies.",
    images: [{ url: absoluteUrl("/YC-white.png") }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | The growth engineers mindset`,
    description:
      "Die Plattform für virale Marketing-Strategien, AI-Prompts und Growth Case Studies.",
  },
};

export const aboutMetadata: Metadata = {
  title: "Über uns",
  description:
    "Mission, Mindset und Team hinter Virals Club Deutschland — Growth Engineering trifft virales Marketing.",
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    ...ogDefaults,
    url: absoluteUrl("/about"),
    title: `Über uns | ${SITE_NAME}`,
    description:
      "Die nächste Generation von Marketern: Engineering, Kreativität und AI für skalierbares Wachstum.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Über uns | ${SITE_NAME}`,
    description:
      "Mission und Mindset von Virals Club Deutschland — Growth Engineering im AI-Zeitalter.",
  },
};

export const advertiseMetadata: Metadata = {
  title: "Werben",
  description:
    "Reichweite bei Creator- und Growth-orientierten Entscheidern — Werbemöglichkeiten bei Virals Club Deutschland.",
  alternates: { canonical: absoluteUrl("/advertise") },
  openGraph: {
    ...ogDefaults,
    url: absoluteUrl("/advertise"),
    title: `Werben | ${SITE_NAME}`,
    description:
      "Sichtbarkeit für Brands in der Virals-Community — Sponsoring und Partnerschaften.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Werben | ${SITE_NAME}`,
    description: "Werbemöglichkeiten und Reichweite bei Virals Club Deutschland.",
  },
};

export const legalDatenschutzMetadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von Virals Club Deutschland.",
  alternates: { canonical: absoluteUrl("/datenschutz") },
  robots: { index: true, follow: true },
  openGraph: {
    ...ogDefaults,
    url: absoluteUrl("/datenschutz"),
    title: `Datenschutz | ${SITE_NAME}`,
    description: "Datenschutzerklärung gemäß DSGVO.",
  },
};

export const legalAgbMetadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von Virals Club Deutschland.",
  alternates: { canonical: absoluteUrl("/agb") },
  robots: { index: true, follow: true },
  openGraph: {
    ...ogDefaults,
    url: absoluteUrl("/agb"),
    title: `AGB | ${SITE_NAME}`,
    description: "Allgemeine Geschäftsbedingungen.",
  },
};

export const legalImpressumMetadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Angaben gemäß § 5 TMG — Virals Club Deutschland.",
  alternates: { canonical: absoluteUrl("/impressum") },
  robots: { index: true, follow: true },
  openGraph: {
    ...ogDefaults,
    url: absoluteUrl("/impressum"),
    title: `Impressum | ${SITE_NAME}`,
    description: "Impressum und Kontaktangaben.",
  },
};
