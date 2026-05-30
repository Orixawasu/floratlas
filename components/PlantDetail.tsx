"use client";

import Image from "next/image";
import Link from "next/link";
import type { TreflePlant } from "@/types/plant";
import { formatDistribution, getEntityName, getRarityLabel, rarityStyles } from "@/lib/utils";
import { useI18n } from "@/components/LanguageProvider";
import { TraitChips } from "@/components/TraitChips";

type PlantDetailProps = {
  plant: TreflePlant;
};

export function PlantDetail({ plant }: PlantDetailProps) {
  const { t } = useI18n();
  const rarityKey = getRarityLabel(plant.id);
  const rarity = rarityStyles[rarityKey];

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900/70 transition hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
      >
        <span aria-hidden="true">←</span>
        {t.detail.back}
      </Link>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative min-h-[320px] overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-md">
        {plant.image_url ? (
          <Image
            src={plant.image_url}
            alt={plant.common_name ?? plant.scientific_name ?? t.detail.unknown}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src="/plant-fallback.svg"
              alt={t.card.fallbackAlt}
              width={180}
              height={180}
            />
          </div>
        )}
        <span
          className={`absolute left-5 top-5 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${rarity.className}`}
        >
          <span aria-hidden="true">{rarity.emoji}</span>
          {t.rarity[rarityKey]}
        </span>
      </div>
      <div className="space-y-6 rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <div>
          <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-emerald-900/50">
            <span aria-hidden="true">🌿</span>
            {t.detail.profile}
          </p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-emerald-950 sm:text-4xl">
            {plant.common_name ?? t.detail.unknown}
          </h1>
          <p className="text-base italic text-emerald-900/60">
            {plant.scientific_name ?? t.detail.unnamed}
          </p>
        </div>
        <TraitChips plant={plant} />
        <div className="grid gap-4 text-sm text-emerald-900/70 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-900/5 bg-white/60 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-emerald-900/40">
              🪴 {t.detail.family}
            </p>
            <p className="font-semibold text-emerald-900">
              {getEntityName(plant.family)}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-900/5 bg-white/60 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-emerald-900/40">
              🌿 {t.detail.genus}
            </p>
            <p className="font-semibold text-emerald-900">
              {getEntityName(plant.genus)}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-900/5 bg-white/60 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-emerald-900/40">
              ✍️ {t.detail.author}
            </p>
            <p className="font-semibold text-emerald-900">
              {plant.author ?? "—"}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-900/5 bg-white/60 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-emerald-900/40">
              📅 {t.detail.year}
            </p>
            <p className="font-semibold text-emerald-900">
              {plant.year ?? "—"}
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-900/5 bg-white/60 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-emerald-900/40">
            📍 {t.detail.distribution}
          </p>
          <p className="mt-1 text-sm text-emerald-900/70">
            {formatDistribution(
              plant.distribution?.native ??
                plant.main_species?.distribution?.native ??
                plant.observations ??
                [],
            )}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
