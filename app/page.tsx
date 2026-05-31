"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { PopularSearches } from "@/components/PopularSearches";
import { PlantOfTheDay } from "@/components/PlantOfTheDay";
import { RandomPlantButton } from "@/components/RandomPlantButton";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { CollectionGrid } from "@/components/CollectionGrid";
import { SeasonalHighlights } from "@/components/SeasonalHighlights";
import { DiscoverCarousel } from "@/components/DiscoverCarousel";
import { useI18n } from "@/components/LanguageProvider";

export default function Home() {
  const router = useRouter();
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 pb-24 pt-16">
        <section className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-900/70 backdrop-blur-md">
              <span aria-hidden="true">🌿</span>
              {t.home.eyebrow}
            </span>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-emerald-950 sm:text-5xl">
              {t.home.title}
            </h1>
            <p className="max-w-xl text-base text-emerald-900/60 sm:text-lg">
              {t.home.subtitle}
            </p>
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={() => {
                if (query.trim()) {
                  router.push(`/search?q=${encodeURIComponent(query)}`);
                } else {
                  router.push("/search");
                }
              }}
              className="max-w-2xl"
              placeholder={t.home.searchPlaceholder}
            />
            <PopularSearches />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push("/explore")}
                className="inline-flex items-center justify-center rounded-full border border-emerald-900/20 bg-white/70 px-6 py-3 text-sm font-semibold text-emerald-900 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:border-emerald-900/40"
              >
                {t.home.cta}
              </button>
              <button
                type="button"
                onClick={() => router.push("/paths")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-900/10 bg-transparent px-6 py-3 text-sm font-semibold text-emerald-900/70 transition hover:text-emerald-900"
              >
                <span aria-hidden="true">🧭</span>
                {t.nav.paths}
              </button>
            </div>
          </div>
          <div className="relative h-[420px]">
            <Link
              href="/search?q=Monstera+deliciosa"
              className="absolute left-6 top-6 w-56 rotate-[-6deg] rounded-3xl border border-white/60 bg-white/70 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.12)] backdrop-blur-md transition hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_30px_80px_rgba(15,23,42,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
            >
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-emerald-900/40">
                <span aria-hidden="true">🌿</span>
                {t.home.featured}
              </p>
              <p className="mt-3 text-lg font-semibold text-emerald-950">
                Monstera deliciosa
              </p>
              <p className="text-sm italic text-emerald-900/50">
                {t.home.swissCheese}
              </p>
            </Link>
            <Link
              href="/collections/tropical-plants"
              className="absolute right-4 top-24 w-60 rotate-[4deg] rounded-3xl border border-white/60 bg-white/70 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.12)] backdrop-blur-md transition hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_30px_80px_rgba(15,23,42,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
            >
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-emerald-900/40">
                <span aria-hidden="true">🌴</span>
                {t.home.collection}
              </p>
              <p className="mt-3 text-lg font-semibold text-emerald-950">
                {t.home.tropicalCanopies}
              </p>
              <p className="text-sm text-emerald-900/50">
                {t.home.tropicalCanopiesDesc}
              </p>
            </Link>
            <Link
              href="/search?q=Nepenthes+alata"
              className="absolute bottom-6 left-16 w-64 rotate-[1deg] rounded-3xl border border-white/60 bg-white/70 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.12)] backdrop-blur-md transition hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_30px_80px_rgba(15,23,42,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
            >
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-emerald-900/40">
                <span aria-hidden="true">✨</span>
                {t.home.rareFind}
              </p>
              <p className="mt-3 text-lg font-semibold text-emerald-950">
                Nepenthes alata
              </p>
              <p className="text-sm italic text-emerald-900/50">
                {t.home.pitcherPlant}
              </p>
            </Link>
          </div>
        </section>

        <PlantOfTheDay />

        <RandomPlantButton />

        <SeasonalHighlights />

        <DiscoverCarousel
          emoji="🔥"
          title={t.discover.trendingTitle}
          subtitle={t.discover.trendingSubtitle}
          query="orchid"
          loadingLabel={t.explore.loading}
        />

        <RecentlyViewed />

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-emerald-950 sm:text-3xl">
              <span aria-hidden="true">📚</span>
              {t.discover.featuredTitle}
            </h2>
            <p className="max-w-2xl text-sm text-emerald-900/60">
              {t.discover.featuredSubtitle}
            </p>
          </div>
          <CollectionGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
}
