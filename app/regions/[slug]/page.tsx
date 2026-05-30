import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegionView } from "@/components/RegionView";
import {
  getRegionBySlug,
  getChildren,
  regions,
  type RegionDef,
} from "@/lib/regions";
import { fetchPlantsByDistribution, fetchPlants } from "@/lib/trefle";
import { dictionaries } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";
import type { TreflePlant } from "@/types/plant";

type RegionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) {
    return { title: "Region not found", robots: { index: false } };
  }
  const en = dictionaries.en.regionCatalog[region.key];
  const fr = dictionaries.fr.regionCatalog[region.key];
  const url = `${siteUrl}/regions/${slug}`;
  return {
    title: `${en?.name} flora · Flore de ${fr?.name}`,
    description: `${en?.overview} ${fr?.overview}`,
    alternates: {
      canonical: url,
      languages: { en: url, fr: url, "x-default": url },
    },
    openGraph: {
      title: `${en?.name} · FloraDex`,
      description: en?.overview,
      url,
      type: "website",
    },
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  let plants: TreflePlant[] = [];
  let total = 0;
  let dataMode: "real" | "approx" | "none" = "none";

  try {
    if (region.distribution) {
      const data = await fetchPlantsByDistribution(region.distribution);
      if (data) {
        plants = (data.data ?? []).filter((p) => p.image_url);
        total = data.meta?.total ?? plants.length;
        dataMode = plants.length > 0 ? "real" : "none";
      }
    } else if (region.query) {
      const data = await fetchPlants({ query: region.query });
      plants = (data.data ?? []).filter((p) => p.image_url);
      dataMode = plants.length > 0 ? "approx" : "none";
    }
  } catch (error) {
    console.error("Region fetch error", error);
  }

  const children = getChildren(region.slug);
  const related: RegionDef[] = (region.related ?? [])
    .map((s) => getRegionBySlug(s))
    .filter((r): r is RegionDef => Boolean(r));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-20 pt-10">
        <RegionView
          regionKey={region.key}
          slug={region.slug}
          emoji={region.emoji}
          dataMode={dataMode}
          total={total}
          plants={plants}
          children={children}
          related={related}
        />
      </main>
      <Footer />
    </div>
  );
}
