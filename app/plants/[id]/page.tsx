import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlantDetail } from "@/components/PlantDetail";
import { RecordView } from "@/components/RecordView";
import { RelatedPlants } from "@/components/RelatedPlants";
import { WhyMatters } from "@/components/WhyMatters";
import { BotanicalContext } from "@/components/BotanicalContext";
import { PlantConditions } from "@/components/PlantConditions";
import { PlantVariants } from "@/components/PlantVariants";
import { fetchPlantById } from "@/lib/trefle";
import { getEntityName } from "@/lib/utils";
import { siteUrl } from "@/lib/seo";

type PlantPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PlantPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await fetchPlantById(id);
  const plant = result?.data;

  if (!plant) {
    return {
      title: "Plant not found · FloraDex",
      robots: { index: false },
    };
  }

  const commonName = plant.common_name ?? plant.scientific_name ?? "Plant";
  const family = getEntityName(plant.family);
  const genus = getEntityName(plant.genus);

  const descriptionEn = `${commonName} (${plant.scientific_name ?? ""}) — family ${family}, genus ${genus}. Discover botanical data on FloraDex.`;
  const descriptionFr = `${commonName} (${plant.scientific_name ?? ""}) — famille ${family}, genre ${genus}. Découvrez les données botaniques sur FloraDex.`;

  const url = `${siteUrl}/plants/${plant.id}`;

  return {
    title: `${commonName} · ${plant.scientific_name ?? "FloraDex"}`,
    description: `${descriptionEn} ${descriptionFr}`,
    keywords: [
      commonName,
      plant.scientific_name ?? "",
      family,
      genus,
      "plant",
      "plante",
      "botany",
      "botanique",
    ].filter(Boolean),
    alternates: {
      canonical: url,
      languages: {
        en: url,
        fr: url,
        "x-default": url,
      },
    },
    openGraph: {
      title: `${commonName} · ${plant.scientific_name ?? ""}`,
      description: descriptionEn,
      url,
      siteName: "FloraDex",
      type: "article",
      locale: "en_US",
      alternateLocale: ["fr_FR"],
      images: plant.image_url
        ? [{ url: plant.image_url, alt: commonName }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${commonName} · ${plant.scientific_name ?? ""}`,
      description: descriptionEn,
      images: plant.image_url ? [plant.image_url] : undefined,
    },
  };
}

export default async function PlantPage({ params }: PlantPageProps) {
  const { id } = await params;
  const result = await fetchPlantById(id);

  if (!result?.data) {
    notFound();
  }

  const plant = result.data;
  const commonName = plant.common_name ?? plant.scientific_name ?? "Plant";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: commonName,
    alternateName: plant.scientific_name ?? undefined,
    image: plant.image_url ?? undefined,
    url: `${siteUrl}/plants/${plant.id}`,
    additionalType: "https://schema.org/Taxon",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecordView plant={plant} />
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-14 px-6 pb-20 pt-10">
        <PlantDetail plant={plant} />
        <div className="grid gap-6 lg:grid-cols-2">
          <WhyMatters plant={plant} />
          <BotanicalContext plant={plant} />
        </div>
        <PlantConditions plant={plant} />
        <PlantVariants plant={plant} />
        <RelatedPlants
          genus={getEntityName(plant.genus)}
          family={getEntityName(plant.family)}
          excludeId={plant.id}
        />
      </main>
      <Footer />
    </div>
  );
}
