"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { PlantCard } from "@/components/PlantCard";
import { PopularSearches } from "@/components/PopularSearches";
import { CollectionGrid } from "@/components/CollectionGrid";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/components/LanguageProvider";
import type { TreflePaginatedResponse, TreflePlant } from "@/types/plant";

type SearchStatus = "idle" | "loading" | "success" | "error";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState<SearchStatus>(
    initialQuery ? "loading" : "idle",
  );
  const [plants, setPlants] = useState<TreflePlant[]>([]);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setPlants([]);
      setStatus("idle");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error("Search failed");
      }
      const data = (await response.json()) as TreflePaginatedResponse<TreflePlant>;
      setPlants(data.data ?? []);
      setStatus("success");
    } catch (fetchError) {
      console.error(fetchError);
      setStatus("error");
    }
  }, [query]);

  useEffect(() => {
    if (!initialQuery.trim()) {
      return;
    }

    let active = true;

    fetch(`/api/search?q=${encodeURIComponent(initialQuery)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Search failed");
        }
        return response.json() as Promise<TreflePaginatedResponse<TreflePlant>>;
      })
      .then((data) => {
        if (!active) {
          return;
        }
        setPlants(data.data ?? []);
        setStatus("success");
      })
      .catch((fetchError) => {
        console.error(fetchError);
        if (active) {
          setStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, [initialQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-20 pt-10">
        <div className="space-y-6">
          <SectionHeader
            emoji="🔍"
            eyebrow={t.search.eyebrow}
            title={t.search.title}
            subtitle={t.search.subtitle}
          />
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />
          <PopularSearches />
        </div>

        <section className="space-y-6">
          {status === "loading" && <LoadingState label={t.search.loading} />}
          {status === "error" && (
            <EmptyState
              title={t.search.errorTitle}
              description={t.search.errorDesc}
            />
          )}
          {status === "success" && plants.length === 0 && (
            <EmptyState
              title={t.search.emptyTitle}
              description={t.search.emptyDesc}
            />
          )}
          {plants.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plants.map((plant, index) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  priority={index < 3}
                />
              ))}
            </div>
          )}

          {(status === "idle" ||
            (status === "success" && plants.length === 0)) && (
            <div className="space-y-12 pt-2">
              <RecentlyViewed />
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-semibold text-emerald-950">
                  {t.collections.title}
                </h2>
                <CollectionGrid />
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
}
