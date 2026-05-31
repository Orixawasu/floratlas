"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getRecentPlants, type RecentPlant } from "@/lib/recently-viewed";
import { useI18n } from "@/components/LanguageProvider";

export function RecentlyViewed() {
  const { t, locale } = useI18n();
  const [plants, setPlants] = useState<RecentPlant[]>([]);

  useEffect(() => {
    const update = () => setPlants(getRecentPlants());
    update();
    window.addEventListener("floratlas-recent-updated", update);
    return () => window.removeEventListener("floratlas-recent-updated", update);
  }, []);

  if (plants.length === 0) {
    return null;
  }

  const formatDate = (timestamp?: number) => {
    if (!timestamp) {
      return "";
    }
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "short",
    }).format(new Date(timestamp));
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-emerald-950">
            <span aria-hidden="true">🕑</span>
            {t.home.recentTitle}
          </h2>
          <p className="text-sm text-emerald-900/60">{t.home.recentSubtitle}</p>
        </div>
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-900 transition hover:text-emerald-700"
        >
          {t.collections.keepExploring} →
        </Link>
      </div>
      <div className="-mx-2 flex snap-x gap-4 overflow-x-auto px-2 pb-3">
        {plants.map((plant) => (
          <Link
            key={plant.id}
            href={`/plants/${plant.id}`}
            className="group flex w-44 shrink-0 snap-start flex-col gap-3 rounded-3xl border border-white/60 bg-white/70 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:-translate-y-1"
          >
            <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-emerald-50">
              {plant.image_url ? (
                <Image
                  src={plant.image_url}
                  alt={plant.common_name ?? "Plant"}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="180px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl">
                  🌿
                </div>
              )}
            </div>
            <div>
              <p className="truncate text-sm font-semibold text-emerald-950">
                {plant.common_name ?? plant.scientific_name ?? "Plant"}
              </p>
              <p className="truncate text-xs italic text-emerald-900/50">
                {plant.scientific_name ?? ""}
              </p>
              {plant.viewedAt && (
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-900/35">
                  {formatDate(plant.viewedAt)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
