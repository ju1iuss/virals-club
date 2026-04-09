import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/home/hero";
import { Feed } from "@/components/home/feed";
import { Sidebar } from "@/components/layout/sidebar";
import { notFound } from "next/navigation";
import { buildCategoryMetadata, getCategoryLabel } from "@/lib/category-metadata";

type Params = Promise<{ category: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const meta = buildCategoryMetadata(categorySlug);
  if (!meta) {
    return { title: "Kategorie" };
  }
  return meta;
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category: categorySlug } = await params;
  const categoryName = getCategoryLabel(categorySlug);

  if (!categoryName) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto max-w-[1200px] px-4">
        <Hero />
        <Navigation />

        <main className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 py-10">
          <Feed category={categoryName} />
          <Sidebar />
        </main>
      </div>
    </div>
  );
}
