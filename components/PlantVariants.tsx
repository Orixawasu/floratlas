"use client";

import Link from "next/link";
import type { TreflePlant, TrefleTaxonRef } from "@/types/plant";
import { useI18n } from "@/components/LanguageProvider";

function VariantGroup({
  label,
  items,
}: {
  label: string;
  items: TrefleTaxonRef[];
}) {
  if (items.length === 0) {
    return null;
  }
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/40">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/plants/${item.id}`}
            className="rounded-full border border-emerald-900/10 bg-white/70 px-3 py-1.5 text-sm italic text-emerald-900/80 transition hover:border-emerald-900/30 hover:text-emerald-900"
          >
            {item.scientific_name ?? `#${item.id}`}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function PlantVariants({ plant }: { plant: TreflePlant }) {
  const { t } = useI18n();
  const subspecies = plant.subspecies ?? [];
  const varieties = plant.varieties ?? [];

  if (subspecies.length === 0 && varieties.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-md">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-emerald-950">
          <span aria-hidden="true">🌿</span>
          {t.detail.taxonomyTitle}
        </h2>
        <p className="text-sm text-emerald-900/55">{t.detail.taxonomySubtitle}</p>
      </div>
      <div className="mt-5 space-y-5">
        <VariantGroup label={t.detail.subspecies} items={subspecies} />
        <VariantGroup label={t.detail.varieties} items={varieties} />
      </div>
    </section>
  );
}
