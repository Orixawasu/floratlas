"use client";

import Image from "next/image";
import Link from "next/link";
import { PlantCard } from "@/components/PlantCard";
import { CollectionGrid } from "@/components/CollectionGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { EmptyState } from "@/components/EmptyState";
import { useI18n } from "@/components/LanguageProvider";
import type { TreflePlant } from "@/types/plant";

type CollectionViewProps = {
  collectionKey: string;
  slug: string;
  emoji: string;
  total: number;
  plants: TreflePlant[];
};

export function CollectionView({
  collectionKey,
  slug,
  emoji,
  total,
  plants,
}: CollectionViewProps) {
  const { t } = useI18n();
  const catalog = t.catalog[collectionKey];
  const extra = t.collectionExtra[collectionKey];
  const heroPlant = plants.find((plant) => plant.image_url);

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900/70 transition hover:text-emerald-900"
        >
          <span aria-hidden="true">←</span>
          {t.collections.backToAll}
        </Link>
        <SectionHeader
          emoji={emoji}
          eyebrow={t.collections.eyebrow}
          title={catalog?.title ?? slug}
          subtitle={catalog?.description}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div className="relative min-h-[260px] overflow-hidden rounded-[32px] border border-white/60 bg-emerald-50 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
          {heroPlant?.image_url ? (
            <Image
              src={heroPlant.image_url}
              alt={catalog?.title ?? slug}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl">
              {emoji}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center gap-5 rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-md">
          {total > 0 && (
            <div className="inline-flex w-fit items-baseline gap-2 rounded-2xl border border-emerald-900/10 bg-white/70 px-4 py-2">
              <span className="font-display text-2xl font-semibold text-emerald-950">
                {total.toLocaleString()}
              </span>
              <span className="text-xs uppercase tracking-[0.14em] text-emerald-900/50">
                {t.families.speciesCount}
              </span>
            </div>
          )}
          <p className="text-base leading-relaxed text-emerald-900/70">
            {extra?.intro}
          </p>
        </div>
      </div>

      {extra?.facts && extra.facts.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-3">
          {extra.facts.map((fact, index) => (
            <div
              key={index}
              className="rounded-3xl border border-emerald-900/5 bg-white/60 p-5 text-sm text-emerald-900/70 backdrop-blur-md"
            >
              <span aria-hidden="true" className="text-lg">
                💡
              </span>
              <p className="mt-2">{fact}</p>
            </div>
          ))}
        </section>
      )}

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold text-emerald-950">
          {t.families.representative}
        </h2>
        {plants.length === 0 ? (
          <EmptyState
            title={t.explore.errorTitle}
            description={t.explore.errorDesc}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plants.map((plant, index) => (
              <PlantCard key={plant.id} plant={plant} priority={index < 3} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6 border-t border-emerald-900/10 pt-12">
        <h2 className="font-display text-2xl font-semibold text-emerald-950">
          {t.collections.keepExploring}
        </h2>
        <CollectionGrid activeSlug={slug} />
      </section>
    </div>
  );
}
