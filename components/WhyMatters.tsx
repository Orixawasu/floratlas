"use client";

import type { TreflePlant } from "@/types/plant";
import { buildPlantSummary } from "@/lib/summary";
import { useI18n } from "@/components/LanguageProvider";

export function WhyMatters({ plant }: { plant: TreflePlant }) {
  const { t, locale } = useI18n();
  const summary = buildPlantSummary(plant, locale);

  return (
    <section className="rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-md">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-emerald-950">
        <span aria-hidden="true">💡</span>
        {t.detail.whyTitle}
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-emerald-900/70">
        {summary}
      </p>
    </section>
  );
}
