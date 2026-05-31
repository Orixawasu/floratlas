"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";
import { getEntityName, getRarityLabel, rarityStyles } from "@/lib/utils";
import type { TrefleItemResponse, TreflePlant } from "@/types/plant";

export function PlantOfTheDay() {
  const { t } = useI18n();
  const [plant, setPlant] = useState<TreflePlant | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/plant-of-the-day")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: TrefleItemResponse<TreflePlant> | null) => {
        if (active) {
          setPlant(data?.data ?? null);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (active) {
          setLoaded(true);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  if (!loaded || !plant) {
    return null;
  }

  const rarity = rarityStyles[getRarityLabel(plant.id)];
  const commonName = plant.common_name ?? plant.scientific_name ?? "Plant";

  return (
    <section className="overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_30px_80px_rgba(15,23,42,0.1)] backdrop-blur-md">
      <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
        <Link
          href={`/plants/${plant.id}`}
          className="relative block min-h-[260px] overflow-hidden bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
        >
          {plant.image_url ? (
            <Image
              src={plant.image_url}
              alt={commonName}
              fill
              className="object-cover transition duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          ) : (
            <div className="flex h-full min-h-[260px] w-full items-center justify-center text-5xl">
              🌼
            </div>
          )}
        </Link>
        <div className="flex flex-col justify-center gap-4 p-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            <span aria-hidden="true">🌟</span>
            {t.home.potdEyebrow}
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold text-emerald-950 sm:text-3xl">
              {commonName}
            </h2>
            <p className="text-base italic text-emerald-900/60">
              {plant.scientific_name ?? ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-emerald-900/70">
            <span className="rounded-full bg-emerald-50 px-3 py-1">
              🪴 {getEntityName(plant.family)}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${rarity.className}`}
            >
              {rarity.emoji} {t.rarity[getRarityLabel(plant.id)]}
            </span>
          </div>
          <Link
            href={`/plants/${plant.id}`}
            className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            {t.home.potdCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
