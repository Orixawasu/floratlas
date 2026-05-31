"use client";

import Link from "next/link";
import { collections } from "@/lib/collections";
import { useI18n } from "@/components/LanguageProvider";

type CollectionGridProps = {
  activeSlug?: string;
};

export function CollectionGrid({ activeSlug }: CollectionGridProps) {
  const { t } = useI18n();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {collections
        .filter((collection) => collection.slug !== activeSlug)
        .map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group flex flex-col gap-3 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-900/10 bg-white text-2xl shadow-sm"
            >
              {collection.emoji}
            </span>
            <h3 className="text-lg font-semibold text-emerald-950">
              {t.catalog[collection.key]?.title}
            </h3>
            <p className="text-sm text-emerald-900/60">
              {t.catalog[collection.key]?.description}
            </p>
            <span className="mt-auto pt-2 text-sm font-semibold text-emerald-900 transition group-hover:text-emerald-700">
              {t.collections.open} →
            </span>
          </Link>
        ))}
    </div>
  );
}
