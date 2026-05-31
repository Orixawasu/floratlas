"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { CollectionGrid } from "@/components/CollectionGrid";
import { useI18n } from "@/components/LanguageProvider";

export default function CollectionsPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-20 pt-10">
        <SectionHeader
          emoji="📚"
          eyebrow={t.collections.eyebrow}
          title={t.collections.title}
          subtitle={t.collections.subtitle}
        />
        <CollectionGrid />
      </main>
      <Footer />
    </div>
  );
}
