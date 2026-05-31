import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TraitView } from "@/components/TraitView";
import { getTrait, traits } from "@/lib/traits";
import { fetchPlants } from "@/lib/trefle";
import { dictionaries } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";
import type { TreflePlant } from "@/types/plant";

type TraitPageProps = {
  params: Promise<{ trait: string }>;
};

export function generateStaticParams() {
  return traits.map((trait) => ({ trait: trait.key }));
}

export async function generateMetadata({
  params,
}: TraitPageProps): Promise<Metadata> {
  const { trait } = await params;
  const def = getTrait(trait);
  if (!def) {
    return { title: "Trait not found", robots: { index: false } };
  }
  const en = dictionaries.en.traitLabels[trait];
  const fr = dictionaries.fr.traitLabels[trait];
  const url = `${siteUrl}/traits/${trait}`;
  return {
    title: `${en} plants · Plantes ${fr}`,
    description: `Discover plants with the ${en} trait. Découvrez les plantes ${fr}.`,
    alternates: { canonical: url, languages: { en: url, fr: url, "x-default": url } },
  };
}

export default async function TraitPage({ params }: TraitPageProps) {
  const { trait } = await params;
  const def = getTrait(trait);

  if (!def) {
    notFound();
  }

  let plants: TreflePlant[] = [];
  try {
    const data = await fetchPlants({ query: def.query });
    plants = (data.data ?? []).filter((plant) => plant.image_url).slice(0, 12);
  } catch (error) {
    console.error("Trait fetch error", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-20 pt-10">
        <TraitView traitKey={def.key} emoji={def.emoji} plants={plants} />
      </main>
      <Footer />
    </div>
  );
}
