import Link from "next/link";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import {
  type WissenTopic,
  faqPageJsonLd,
  wissenBreadcrumbJsonLd,
  resolveTopicLink,
  getWissenTopic,
  relatedLinkLabel,
} from "@/lib/wissen-topics";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/breadcrumbs";
import { absoluteUrl } from "@/lib/seo";

export function WissenTopicView({ topic }: { topic: WissenTopic }) {
  const path = `/wissen/${topic.slug}`;
  const url = absoluteUrl(path);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Startseite", href: "/" },
    { label: "Wissen", href: "/wissen" },
  ];
  if (topic.parentSlug) {
    const parent = getWissenTopic(topic.parentSlug);
    breadcrumbItems.push({
      label: parent?.title ?? topic.parentSlug,
      href: `/wissen/${topic.parentSlug}`,
    });
  }
  breadcrumbItems.push({ label: topic.title });

  const faqLd = faqPageJsonLd(topic, url);
  const bcLd = wissenBreadcrumbJsonLd(topic);

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: topic.title,
    description: topic.metaDescription,
    url,
    isPartOf: { "@type": "WebSite", url: absoluteUrl("/"), name: "Virals Club Deutschland" },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <JsonLd data={bcLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={webPageLd} />
      <Header />
      <article className="container mx-auto max-w-3xl px-6 py-16 text-black dark:text-white">
        <Breadcrumbs items={breadcrumbItems} />
        <p className="text-[10px] uppercase tracking-widest font-bold text-accent-vibrant mb-4">
          {topic.kind === "pillar" ? "Pillar" : "Deep Dive"}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">{topic.title}</h1>
        <p className="text-lg text-black/70 dark:text-white/55 leading-relaxed mb-12">{topic.intro}</p>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-p:leading-relaxed">
          {topic.sections.map((sec) => (
            <section key={sec.heading} className="mb-12">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">{sec.heading}</h2>
              {sec.paragraphs.map((p, i) => (
                <p key={i} className="text-black/75 dark:text-white/65 mb-4">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <section className="mt-16 pt-12 border-t border-black/10 dark:border-white/10">
          <h2 className="text-xl font-serif font-bold mb-6">Häufige Fragen</h2>
          <dl className="space-y-6">
            {topic.faq.map((f) => (
              <div key={f.question}>
                <dt className="font-bold text-black dark:text-white mb-2">{f.question}</dt>
                <dd className="text-black/70 dark:text-white/60 leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {topic.relatedSlugs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-black/10 dark:border-white/10">
            <h2 className="text-xl font-serif font-bold mb-6">Mehr dazu</h2>
            <ul className="space-y-3">
              {topic.relatedSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={resolveTopicLink(slug)}
                    className="text-accent-vibrant font-bold hover:underline"
                  >
                    {relatedLinkLabel(slug)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-16 p-8 rounded-3xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
          <p className="text-sm text-black/70 dark:text-white/55 mb-4">
            Tiefere Playbooks und aktuelle Case Studies findest du in unseren Guides und auf der Startseite.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/guides"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent-vibrant text-black font-black uppercase tracking-widest text-[10px]"
            >
              Zu den Guides
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-black/15 dark:border-white/15 font-bold text-sm"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
