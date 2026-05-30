"use client";

import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";

const SEASON_QUERY: Record<string, string> = {
  spring: "blossom",
  summer: "desert",
  winter: "evergreen",
};

function currentSeasonKey() {
  const month = new Date().getMonth();
  if (month <= 1 || month === 11) {
    return "winter";
  }
  if (month <= 4) {
    return "spring";
  }
  if (month <= 7) {
    return "summer";
  }
  return "winter";
}

export function SeasonalHighlights() {
  const { t } = useI18n();
  const current = currentSeasonKey();

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-emerald-950">
          <span aria-hidden="true">🍃</span>
          {t.discover.seasonalTitle}
        </h2>
        <p className="text-sm text-emerald-900/60">
          {t.discover.seasonalSubtitle}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {t.discover.seasons.map((season) => {
          const isNow = season.key === current;
          return (
            <Link
              key={season.key}
              href={`/search?q=${encodeURIComponent(SEASON_QUERY[season.key])}`}
              className={`group relative flex flex-col gap-3 overflow-hidden rounded-3xl border p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:-translate-y-1 ${
                isNow
                  ? "border-emerald-900/20 bg-gradient-to-br from-emerald-50/90 via-white/70 to-cyan-50/70"
                  : "border-white/60 bg-white/70"
              }`}
            >
              {isNow && (
                <span className="absolute right-4 top-4 rounded-full bg-emerald-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                  {t.discover.seasonNow}
                </span>
              )}
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-900/10 bg-white text-2xl shadow-sm"
              >
                {season.emoji}
              </span>
              <h3 className="text-lg font-semibold text-emerald-950">
                {season.title}
              </h3>
              <p className="text-sm text-emerald-900/60">{season.desc}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
