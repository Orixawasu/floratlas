"use client";

import { useState } from "react";
import Link from "next/link";
import { PlantCard } from "@/components/PlantCard";
import { SectionHeader } from "@/components/SectionHeader";
import { RegionsGrid } from "@/components/RegionsGrid";
import { CollectionGrid } from "@/components/CollectionGrid";
import { useI18n } from "@/components/LanguageProvider";
import type { RegionDef } from "@/lib/regions";
import type { TreflePaginatedResponse, TreflePlant } from "@/types/plant";

type DataMode = "real" | "approx" | "none";

type RegionViewProps = {
  regionKey: string;
  slug: string;
  emoji: string;
  dataMode: DataMode;
  total: number;
  plants: TreflePlant[];
  children: RegionDef[];
  related: RegionDef[];
};

export function RegionView({
  regionKey,
  slug,
  emoji,
  dataMode,
  total,
  plants,
  children,
  related,
}: RegionViewProps) {
  const { t } = useI18n();
  const meta = t.regionCatalog[regionKey];

  const [items, setItems] = useState<TreflePlant[]>(plants);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(plants.length === 0);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    try {
      const response = await fetch(`/api/regions/${slug}?page=${nextPage}`);
      if (!response.ok) {
        setDone(true);
        return;
      }
      const data = (await response.json()) as TreflePaginatedResponse<TreflePlant>;
      const fresh = (data.data ?? []).filter((p) => p.image_url);
      setItems((prev) => {
        const seen = new Set(prev.map((p) => p.id));
        return [...prev, ...fresh.filter((p) => !seen.has(p.id))];
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

  const canLoadMore = dataMode === "real" && !done && items.length < total;

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Link
          href="/regions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900/70 transition hover:text-emerald-900"
        >
          <span aria-hidden="true">←</span>
          {t.nav.regions}
        </Link>
        <SectionHeader
          emoji={emoji}
          eyebrow={t.regionsMeta.eyebrow}
          title={meta?.name ?? slug}
          subtitle={meta?.overview}
        />
        <div className="flex flex-wrap items-center gap-3">
          {dataMode === "real" && total > 0 && (
            <div className="inline-flex items-baseline gap-2 rounded-2xl border border-emerald-900/10 bg-white/70 px-5 py-3 backdrop-blur-md">
              <span className="font-display text-3xl font-semibold text-emerald-950">
                {total.toLocaleString()}
              </span>
              <span className="text-sm text-emerald-900/60">
                {t.regionsMeta.representative.toLowerCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-emerald-900/5 bg-white/60 p-6 backdrop-blur-md">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/40">
            🌦️ {t.regionsMeta.climateTitle}
          </p>
          <p className="mt-2 text-sm text-emerald-900/70">{meta?.climate}</p>
        </div>
        {dataMode === "real" ? (
          <div className="rounded-3xl border border-emerald-900/5 bg-emerald-50/60 p-6 text-sm text-emerald-900/70 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/40">
              ✅ Data
            </p>
            <p className="mt-2">{t.regionsMeta.realData}</p>
          </div>
        ) : (
          <div className="rounded-3xl border border-amber-500/20 bg-amber-50/70 p-6 text-sm text-amber-900/80 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700/70">
              ⚠️ Notice
            </p>
            <p className="mt-2">
              {dataMode === "approx"
                ? t.regionsMeta.noticeApprox
                : t.regionsMeta.noticeNone}
            </p>
          </div>
        )}
      </section>

      {children.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-emerald-950">
            {t.regionsMeta.subregionsTitle}
          </h2>
          <RegionsGrid items={children} small />
        </section>
      )}

      {items.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-emerald-950">
              {t.regionsMeta.representative}
            </h2>
            {dataMode === "real" && total > 0 && (
              <span className="text-sm text-emerald-900/50">
                {t.regionsMeta.showing} {items.length} / {total.toLocaleString()}
              </span>
            )}
          </div>
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
                {loading
                  ? `${t.regionsMeta.loading}…`
                  : t.regionsMeta.loadMore}
              </button>
            </div>
          )}
        </section>
      )}

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold text-emerald-950">
          {t.regionsMeta.collectionsTitle}
        </h2>
        <CollectionGrid />
      </section>

      {related.length > 0 && (
        <section className="space-y-5 border-t border-emerald-900/10 pt-10">
          <h2 className="text-xl font-semibold text-emerald-950">
            {t.regionsMeta.relatedTitle}
          </h2>
          <RegionsGrid items={related} small />
        </section>
      )}
    </div>
  );
}
