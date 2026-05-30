"use client";

import { useState } from "react";
import Link from "next/link";
import { PlantCard } from "@/components/PlantCard";
import { SectionHeader } from "@/components/SectionHeader";
import { EmptyState } from "@/components/EmptyState";
import { useI18n } from "@/components/LanguageProvider";
import { popularFamilies, slugifyFamily } from "@/lib/families";
import type { TreflePaginatedResponse, TreflePlant } from "@/types/plant";

type FamilyViewProps = {
  family: string;
  slug: string;
  total: number;
  plants: TreflePlant[];
};

export function FamilyView({ family, slug, total, plants }: FamilyViewProps) {
  const { t } = useI18n();
  const related = popularFamilies.filter((name) => name !== family).slice(0, 6);

  const [items, setItems] = useState<TreflePlant[]>(plants);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(plants.length === 0);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    try {
      const response = await fetch(`/api/families/${slug}?page=${nextPage}`);
      if (!response.ok) {
        setDone(true);
        return;
      }
      const data = (await response.json()) as TreflePaginatedResponse<TreflePlant>;
      const newOnes = (data.data ?? []).filter((plant) => plant.image_url);
      setItems((prev) => {
        const seen = new Set(prev.map((p) => p.id));
        return [...prev, ...newOnes.filter((p) => !seen.has(p.id))];
      });
      setPage(nextPage);
      if (!data.data || data.data.length === 0) {
        setDone(true);
      }
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  const canLoadMore = !done && items.length < total;

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900/70 transition hover:text-emerald-900"
        >
          <span aria-hidden="true">←</span>
          {t.nav.discover}
        </Link>
        <SectionHeader
          emoji="🪴"
          eyebrow={t.families.eyebrow}
          title={family}
          subtitle={t.families.intro}
        />
        {total > 0 && (
          <div className="inline-flex items-baseline gap-2 rounded-2xl border border-emerald-900/10 bg-white/70 px-5 py-3 backdrop-blur-md">
            <span className="font-display text-3xl font-semibold text-emerald-950">
              {total.toLocaleString()}
            </span>
            <span className="text-sm text-emerald-900/60">
              {t.families.speciesCount}
            </span>
          </div>
        )}
      </div>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-emerald-950">
            {t.families.representative}
          </h2>
          {items.length > 0 && total > 0 && (
            <span className="text-sm text-emerald-900/50">
              {t.families.showing} {items.length} / {total.toLocaleString()}
            </span>
          )}
        </div>
        {items.length === 0 ? (
          <EmptyState
            title={t.search.emptyTitle}
            description={t.search.emptyDesc}
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((plant, index) => (
                <PlantCard key={plant.id} plant={plant} priority={index < 3} />
              ))}
            </div>
            {canLoadMore && (
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
                >
                  {loading ? `${t.families.loading}…` : t.families.loadMore}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="space-y-4 border-t border-emerald-900/10 pt-10">
        <h2 className="text-xl font-semibold text-emerald-950">
          {t.families.related}
        </h2>
        <div className="flex flex-wrap gap-2">
          {related.map((name) => (
            <Link
              key={name}
              href={`/families/${slugifyFamily(name)}`}
              className="rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-900/80 backdrop-blur-md transition hover:border-emerald-900/30 hover:text-emerald-900"
            >
              🪴 {name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
