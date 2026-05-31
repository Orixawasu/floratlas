import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FamilyView } from "@/components/FamilyView";
import { deslugifyFamily } from "@/lib/families";
import { fetchPlantsByFamily } from "@/lib/trefle";
import { siteName, siteUrl } from "@/lib/seo";
import type { TreflePlant } from "@/types/plant";

type FamilyPageProps = {
  params: Promise<{ family: string }>;
};

export async function generateMetadata({
  params,
}: FamilyPageProps): Promise<Metadata> {
  const { family } = await params;
  const name = deslugifyFamily(family);
  const url = `${siteUrl}/families/${family}`;

  return {
    title: `${name} family · Famille des ${name}`,
    description: `Discover plants from the ${name} botanical family. Découvrez les plantes de la famille des ${name}.`,
    alternates: {
      canonical: url,
      languages: { en: url, fr: url, "x-default": url },
    },
    openGraph: {
      title: `${name} · ${siteName}`,
      description: `Plants from the ${name} family.`,
      url,
      type: "website",
    },
  };
}

export default async function FamilyPage({ params }: FamilyPageProps) {
  const { family } = await params;
  const name = deslugifyFamily(family);

  let plants: TreflePlant[] = [];
  let total = 0;
  try {
    const data = await fetchPlantsByFamily(name);
    if (data) {
      plants = (data.data ?? []).filter((plant) => plant.image_url);
      total = data.meta?.total ?? data.data?.length ?? 0;
    }
  } catch (error) {
    console.error("Family fetch error", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-20 pt-10">
        <FamilyView family={name} slug={family} total={total} plants={plants} />
      </main>
      <Footer />
    </div>
  );
}
