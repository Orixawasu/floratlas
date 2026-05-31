"use client";

import { useEffect, useState } from "react";
import { PlantCard } from "@/components/PlantCard";
import { useI18n } from "@/components/LanguageProvider";
import type { TreflePaginatedResponse, TreflePlant } from "@/types/plant";

type RelatedPlantsProps = {
  genus: string;
  family: string;
  excludeId: number;
};

function useRelated(query: string, excludeId: number) {
  const [plants, setPlants] = useState<TreflePlant[]>([]);

  useEffect(() => {
    let active = true;
    if (!query || query === "—") {
      setPlants([]);
      return;
    }

    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: TreflePaginatedResponse<TreflePlant> | null) => {
        if (!active || !data) {
          return;
        }
        const filtered = (data.data ?? [])
          .filter((plant) => plant.id !== excludeId && plant.image_url)
          .slice(0, 6);
        setPlants(filtered);
      })
      .catch(() => {
        if (active) {
          setPlants([]);
        }
      });

    return () => {
      active = false;
    };
  }, [query, excludeId]);

  return plants;
}

function Carousel({ plants }: { plants: TreflePlant[] }) {
  return (
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
  );
}

export function RelatedPlants({ genus, family, excludeId }: RelatedPlantsProps) {
  const { t } = useI18n();
  const genusPlants = useRelated(genus, excludeId);
  const familyPlants = useRelated(family, excludeId);

  if (genusPlants.length === 0 && familyPlants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-12">
      {genusPlants.length > 0 && (
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-emerald-950">
              <span aria-hidden="true">🌱</span>
              {t.detail.relatedTitle}
            </h2>
            <p className="text-sm text-emerald-900/60">
              {t.detail.sameGenus} · {genus}
            </p>
          </div>
          <Carousel plants={genusPlants} />
        </section>
      )}

      {familyPlants.length > 0 && (
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-emerald-950">
              <span aria-hidden="true">🪴</span>
              {t.detail.sameFamily} · {family}
            </h2>
          </div>
          <Carousel plants={familyPlants} />
        </section>
      )}
    </div>
  );
}
