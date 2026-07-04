"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/LanguageProvider";
import { pickRandomHeroVariant } from "@/lib/homeHeroModels";
import type { HomeHeroVariant } from "@/lib/homeHeroModels";
import type { TreflePlant } from "@/types/plant";
import { getEntityName } from "@/lib/utils";

const FlowerScene = dynamic(
  () => import("@/components/home/FlowerScene").then((m) => m.FlowerScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-emerald-900/40">
        …
      </div>
    ),
  },
);

/** Viewer 3D hero accueil — plante aléatoire à chaque visite. */
export function FlowerViewer() {
  const { t } = useI18n();
  const [variant] = useState<HomeHeroVariant>(() => pickRandomHeroVariant());
  const [cardOpen, setCardOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [plant, setPlant] = useState<TreflePlant | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/plants/${variant.plantId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled && json?.data) setPlant(json.data as TreflePlant);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [variant.plantId]);

  const name =
    plant?.common_name ?? plant?.scientific_name ?? t.home.flowerName;
  const family = plant ? getEntityName(plant.family) : t.home.flowerFamily;
  const desc =
    plant?.observations?.trim() ||
    plant?.main_species?.growth?.description?.trim() ||
    t.home.flowerDesc;
  const href = plant ? `/plants/${plant.id}` : t.home.flowerHref;

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden">
      <div className="absolute inset-0">
        <FlowerScene
          variant={variant}
          onPlantSelect={() => setCardOpen(true)}
          reducedMotion={reducedMotion}
        />
      </div>

      {!cardOpen && (
        <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center px-4">
          <span className="rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-xs text-emerald-900/65 shadow-sm backdrop-blur">
            {t.home.flowerHint}
          </span>
        </div>
      )}

      {cardOpen && (
        <div className="absolute inset-x-4 bottom-4 z-10 rounded-2xl border border-emerald-900/10 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.1)] backdrop-blur-md sm:inset-x-auto sm:right-0 sm:top-1/2 sm:bottom-auto sm:w-72 sm:-translate-y-1/2">
          <button
            type="button"
            onClick={() => setCardOpen(false)}
            aria-label={t.home.flowerClose}
            className="absolute right-3 top-3 text-emerald-900/40 transition hover:text-emerald-900"
          >
            ✕
          </button>
          <span className="inline-flex rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-900/55">
            {t.home.flowerTag}
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold text-emerald-950">
            {name}
          </h2>
          {plant?.scientific_name && plant.common_name && (
            <p className="text-sm italic text-emerald-900/50">
              {plant.scientific_name}
            </p>
          )}
          {!plant?.common_name && !plant?.scientific_name && (
            <p className="text-sm italic text-emerald-900/50">{family}</p>
          )}
          {plant && family !== "—" && (
            <p className="mt-1 text-sm text-emerald-900/45">{family}</p>
          )}
          <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-emerald-900/70">
            {desc}
          </p>
          <div className="my-4 h-px bg-emerald-900/10" />
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-900 transition hover:gap-2"
          >
            {t.home.flowerCta}
          </Link>
        </div>
      )}
    </div>
  );
}
