"use client";

import Link from "next/link";
import { popularSearches } from "@/lib/collections";
import { useI18n } from "@/components/LanguageProvider";

export function PopularSearches() {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/40">
        {t.home.popularLabel}
      </span>
      {popularSearches.map((term) => (
        <Link
          key={term}
          href={`/search?q=${encodeURIComponent(term)}`}
          className="rounded-full border border-emerald-900/10 bg-white/70 px-3 py-1.5 text-sm font-medium text-emerald-900/80 backdrop-blur-md transition hover:border-emerald-900/30 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
        >
          {term}
        </Link>
      ))}
    </div>
  );
}
