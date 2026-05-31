import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PathView } from "@/components/PathView";
import { getPathBySlug, paths } from "@/lib/paths";
import { fetchPlants } from "@/lib/trefle";
import { dictionaries } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";
import type { TreflePlant } from "@/types/plant";

type PathPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return paths.map((path) => ({ slug: path.slug }));
}

export async function generateMetadata({
  params,
}: PathPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = getPathBySlug(slug);
  if (!path) {
    return { title: "Path not found", robots: { index: false } };
  }
  const en = dictionaries.en.pathCatalog[path.key];
  const fr = dictionaries.fr.pathCatalog[path.key];
  const url = `${siteUrl}/paths/${slug}`;
  return {
    title: `${en?.title} · ${fr?.title}`,
    description: `${en?.intro} ${fr?.intro}`,
    alternates: { canonical: url, languages: { en: url, fr: url, "x-default": url } },
    openGraph: {
      title: `${en?.title} · FloraDex`,
      description: en?.intro,
      url,
      type: "article",
    },
  };
}

export default async function PathPage({ params }: PathPageProps) {
  const { slug } = await params;
  const path = getPathBySlug(slug);

  if (!path) {
    notFound();
  }

  let plants: TreflePlant[] = [];
  try {
    const data = await fetchPlants({ query: path.query });
    plants = (data.data ?? [])
      .filter((plant) => plant.image_url)
      .slice(0, path.count);
  } catch (error) {
    console.error("Path fetch error", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-20 pt-10">
        <PathView
          pathKey={path.key}
          slug={path.slug}
          emoji={path.emoji}
          minutes={path.minutes}
          plants={plants}
        />
      </main>
      <Footer />
    </div>
  );
}
