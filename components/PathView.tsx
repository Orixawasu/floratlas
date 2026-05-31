"use client";

import Link from "next/link";
import { PlantCard } from "@/components/PlantCard";
import { SectionHeader } from "@/components/SectionHeader";
import { PathsList } from "@/components/PathsList";
import { EmptyState } from "@/components/EmptyState";
import { useI18n } from "@/components/LanguageProvider";
import type { TreflePlant } from "@/types/plant";

type PathViewProps = {
  pathKey: string;
  slug: string;
  emoji: string;
  minutes: number;
  plants: TreflePlant[];
};

export function PathView({
  pathKey,
  slug,
  emoji,
  minutes,
  plants,
}: PathViewProps) {
  const { t } = useI18n();
  const meta = t.pathCatalog[pathKey];

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Link
          href="/paths"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900/70 transition hover:text-emerald-900"
        >
          <span aria-hidden="true">←</span>
          {t.pathsMeta.backToAll}
        </Link>
        <SectionHeader
          emoji={emoji}
          eyebrow={t.pathsMeta.eyebrow}
          title={meta?.title ?? slug}
          subtitle={meta?.intro}
        />
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/50">
          <span>
            {plants.length} {t.pathsMeta.plants}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {minutes} {t.pathsMeta.minutes}
          </span>
        </div>
      </div>

      {plants.length === 0 ? (
        <EmptyState
          title={t.explore.errorTitle}
          description={t.explore.errorDesc}
        />
      ) : (
        <ol className="space-y-8">
          {plants.map((plant, index) => (
            <li
              key={plant.id}
              className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-900 text-lg font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-emerald-900/40 sm:hidden">
                  {t.pathsMeta.step} {index + 1}
                </span>
              </div>
              <div className="max-w-sm">
                <PlantCard plant={plant} priority={index < 2} />
              </div>
            </li>
          ))}
        </ol>
      )}

      <section className="space-y-5 border-t border-emerald-900/10 pt-10">
        <h2 className="text-xl font-semibold text-emerald-950">
          {t.pathsMeta.relatedTitle}
        </h2>
        <PathsList activeSlug={slug} />
      </section>
    </div>
  );
}
