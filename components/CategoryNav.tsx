"use client";

import { collections } from "@/lib/collections";
import { useI18n } from "@/components/LanguageProvider";

export function CategoryNav() {
  const { t } = useI18n();

  return (
    <nav
      aria-label={t.explore.categories}
      className="sticky top-0 z-30 -mx-6 border-b border-emerald-900/5 bg-[#f7fbf7]/80 px-6 py-3 backdrop-blur-md"
    >
      <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {collections.map((collection) => (
          <a
            key={collection.key}
            href={`#${collection.key}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-900/80 transition hover:border-emerald-900/30 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            <span aria-hidden="true">{collection.emoji}</span>
            {t.catalog[collection.key]?.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
