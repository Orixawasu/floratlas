"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExplorerCollection } from "@/components/ExplorerCollection";
import { CategoryNav } from "@/components/CategoryNav";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/components/LanguageProvider";
import { collections as collectionDefs } from "@/lib/collections";
import type { TreflePaginatedResponse, TreflePlant } from "@/types/plant";

export default function ExplorePage() {
  const { t } = useI18n();
  const [collections, setCollections] = useState<Record<string, TreflePlant[]>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const collectionsWithPlants = useMemo(
    () =>
      collectionDefs.map((config) => ({
        ...config,
        title: t.catalog[config.key]?.title ?? config.key,
        description: t.catalog[config.key]?.description ?? "",
        plants: collections[config.key] ?? [],
      })),
    [collections, t],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadCollections() {
      setLoading(true);
      setError(false);

      try {
        const responses = await Promise.all(
          collectionDefs.map((collection) =>
            fetch(`/api/search?q=${encodeURIComponent(collection.query)}`),
          ),
        );

        const data = await Promise.all(
          responses.map(async (response) => {
            if (!response.ok) {
              throw new Error("Explore fetch failed");
            }
            return (await response.json()) as TreflePaginatedResponse<TreflePlant>;
          }),
        );

        if (!isMounted) {
          return;
        }

        const nextCollections: Record<string, TreflePlant[]> = {};
        data.forEach((response, index) => {
          nextCollections[collectionDefs[index].key] = response.data ?? [];
        });

        setCollections(nextCollections);
      } catch (fetchError) {
        console.error(fetchError);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCollections();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-20 pt-10">
        <SectionHeader
          emoji="🧭"
          eyebrow={t.explore.eyebrow}
          title={t.explore.title}
          subtitle={t.explore.subtitle}
        />

        <CategoryNav />

        {loading && <LoadingState label={t.explore.loading} />}
        {error && (
          <EmptyState
            title={t.explore.errorTitle}
            description={t.explore.errorDesc}
          />
        )}

        {!loading &&
          !error &&
          collectionsWithPlants.map((collection, index) => (
            <div
              key={collection.key}
              id={collection.key}
              className="scroll-mt-20"
            >
              <ExplorerCollection
                emoji={collection.emoji}
                title={collection.title}
                description={collection.description}
                plants={collection.plants}
                priority={index === 0}
                ctaHref={`/collections/${collection.slug}`}
                ctaLabel={t.collections.open}
              />
            </div>
          ))}
      </main>
      <Footer />
    </div>
  );
}
