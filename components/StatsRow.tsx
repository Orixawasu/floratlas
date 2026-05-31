"use client";

import { globalStats } from "@/lib/stats";
import { useI18n } from "@/components/LanguageProvider";

export function StatsRow() {
  const { t } = useI18n();

  const items = [
    { value: globalStats.species, label: t.stats.species },
    { value: globalStats.genera, label: t.stats.genera },
    { value: globalStats.families, label: t.stats.families },
  ];

  return (
    <dl className="grid grid-cols-3 gap-4 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-md">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <dt className="sr-only">{item.label}</dt>
          <dd className="font-display text-2xl font-semibold text-emerald-950 sm:text-3xl">
            {item.value}
          </dd>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-emerald-900/50">
            {item.label}
          </p>
        </div>
      ))}
    </dl>
  );
}
