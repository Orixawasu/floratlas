"use client";

import { useEffect, useState } from "react";
import { PlantCard } from "@/components/PlantCard";
import { LoadingState } from "@/components/LoadingState";
import type { TreflePaginatedResponse, TreflePlant } from "@/types/plant";

type DiscoverCarouselProps = {
  emoji: string;
  title: string;
  subtitle?: string;
  query: string;
  loadingLabel: string;
};

export function DiscoverCarousel({
  emoji,
  title,
  subtitle,
  query,
  loadingLabel,
}: DiscoverCarouselProps) {
  const [plants, setPlants] = useState<TreflePlant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: TreflePaginatedResponse<TreflePlant> | null) => {
        if (!active) {
          return;
        }
        setPlants(
          (data?.data ?? []).filter((plant) => plant.image_url).slice(0, 8),
        );
        setLoading(false);
      })
      .catch(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [query]);

  if (!loading && plants.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-emerald-950">
          <span aria-hidden="true">{emoji}</span>
          {title}
        </h2>
        {subtitle && <p className="text-sm text-emerald-900/60">{subtitle}</p>}
      </div>
      {loading ? (
        <LoadingState label={loadingLabel} />
      ) : (
        <div className="-mx-2 flex snap-x gap-6 overflow-x-auto px-2 pb-4">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className="w-[240px] shrink-0 snap-start sm:w-[260px]"
            >
              <PlantCard plant={plant} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
