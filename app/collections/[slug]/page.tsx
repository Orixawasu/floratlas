import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CollectionView } from "@/components/CollectionView";
import { collections, getCollectionBySlug } from "@/lib/collections";
import { fetchPlants } from "@/lib/trefle";
import { dictionaries } from "@/lib/i18n";
import { siteName, siteUrl } from "@/lib/seo";
import type { TreflePlant } from "@/types/plant";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return { title: "Collection not found", robots: { index: false } };
  }

  const en = dictionaries.en.catalog[collection.key];
  const fr = dictionaries.fr.catalog[collection.key];
  const url = `${siteUrl}/collections/${slug}`;

  return {
    title: `${en?.title} · ${fr?.title}`,
    description: `${en?.description} ${fr?.description}`,
    alternates: {
      canonical: url,
      languages: { en: url, fr: url, "x-default": url },
    },
    openGraph: {
      title: `${en?.title} · ${siteName}`,
      description: en?.description,
      url,
      type: "website",
      locale: "en_US",
      alternateLocale: ["fr_FR"],
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  let plants: TreflePlant[] = [];
  let total = 0;
  try {
    const data = await fetchPlants({ query: collection.query });
    plants = (data.data ?? []).filter((plant) => plant.image_url);
    total = data.meta?.total ?? plants.length;
  } catch (error) {
    console.error("Collection fetch error", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-20 pt-10">
        <CollectionView
          collectionKey={collection.key}
          slug={collection.slug}
          emoji={collection.emoji}
          total={total}
          plants={plants}
        />
      </main>
      <Footer />
    </div>
  );
}
