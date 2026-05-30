"use client";

import Link from "next/link";
import { PlantCard } from "@/components/PlantCard";
import { SectionHeader } from "@/components/SectionHeader";
import { EmptyState } from "@/components/EmptyState";
import { useI18n } from "@/components/LanguageProvider";
import { traits } from "@/lib/traits";
import type { TreflePlant } from "@/types/plant";

type TraitViewProps = {
  traitKey: string;
  emoji: string;
  plants: TreflePlant[];
};

export function TraitView({ traitKey, emoji, plants }: TraitViewProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900/70 transition hover:text-emerald-900"
        >
          <span aria-hidden="true">←</span>
          {t.nav.discover}
        </Link>
        <SectionHeader
          emoji={emoji}
          eyebrow={t.traitsPage.eyebrow}
          title={t.traitLabels[traitKey]}
          subtitle={t.traitsPage.subtitle}
        />
        <div className="flex flex-wrap gap-2">
          {traits.map((trait) => (
            <Link
              key={trait.key}
              href={`/traits/${trait.key}`}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium backdrop-blur-md transition ${
                trait.key === traitKey
                  ? "border-emerald-900/30 bg-emerald-900 text-white"
                  : "border-emerald-900/10 bg-white/70 text-emerald-900/80 hover:border-emerald-900/30 hover:text-emerald-900"
              }`}
            >
              <span aria-hidden="true">{trait.emoji}</span>
              {t.traitLabels[trait.key]}
            </Link>
          ))}
        </div>
      </div>

      {plants.length === 0 ? (
        <EmptyState
          title={t.search.emptyTitle}
          description={t.search.emptyDesc}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plants.map((plant, index) => (
            <PlantCard key={plant.id} plant={plant} priority={index < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
