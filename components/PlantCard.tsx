"use client";

import Image from "next/image";
import Link from "next/link";
import type { TreflePlant } from "@/types/plant";
import { getEntityName, getRarityLabel, rarityStyles } from "@/lib/utils";
import { useI18n } from "@/components/LanguageProvider";

type PlantCardProps = {
  plant: TreflePlant;
  priority?: boolean;
};

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNlNmYxZWMiLz48L3N2Zz4=";

export function PlantCard({ plant, priority = false }: PlantCardProps) {
  const { t } = useI18n();
  const rarityKey = getRarityLabel(plant.id);
  const rarity = rarityStyles[rarityKey];
  const commonName = plant.common_name ?? t.card.unknown;
  const scientificName = plant.scientific_name ?? t.card.unnamed;
  const href = `/plants/${plant.id}`;

  return (
    <Link
      href={href}
      aria-label={`${commonName} — ${t.card.viewDetails}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
    >
      <div className="relative h-44 w-full bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
        {plant.image_url ? (
          <Image
            src={plant.image_url}
            alt={commonName}
            fill
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src="/plant-fallback.svg"
              alt={t.card.fallbackAlt}
              width={120}
              height={120}
              loading="lazy"
            />
          </div>
        )}
        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${rarity.className}`}
        >
          <span aria-hidden="true">{rarity.emoji}</span>
          {t.rarity[rarityKey]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 py-6">
        <div>
          <h3 className="text-lg font-semibold text-emerald-950">{commonName}</h3>
          <p className="text-sm italic text-emerald-900/60">{scientificName}</p>
        </div>
        <div className="text-xs text-emerald-900/70">
          <p>
            <span className="font-semibold text-emerald-900">{t.card.family}</span>{" "}
            {getEntityName(plant.family)}
          </p>
          <p>
            <span className="font-semibold text-emerald-900">{t.card.genus}</span>{" "}
            {getEntityName(plant.genus)}
          </p>
        </div>
        <span className="mt-auto text-sm font-semibold text-emerald-900 transition group-hover:text-emerald-700">
          {t.card.viewDetails} →
        </span>
      </div>
    </Link>
  );
}
