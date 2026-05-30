"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { RegionsGrid } from "@/components/RegionsGrid";
import { useI18n } from "@/components/LanguageProvider";
import { getTopRegions } from "@/lib/regions";

export default function RegionsPage() {
  const { t } = useI18n();
  const top = getTopRegions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-20 pt-10">
        <SectionHeader
          emoji="🗺️"
          eyebrow={t.regionsMeta.eyebrow}
          title={t.regionsMeta.title}
          subtitle={t.regionsMeta.subtitle}
        />
        <RegionsGrid items={top} />
      </main>
      <Footer />
    </div>
  );
}
