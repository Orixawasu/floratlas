"use client";

import Link from "next/link";
import { paths } from "@/lib/paths";
import { useI18n } from "@/components/LanguageProvider";

type PathsListProps = {
  activeSlug?: string;
};

export function PathsList({ activeSlug }: PathsListProps) {
  const { t } = useI18n();

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {paths
        .filter((path) => path.slug !== activeSlug)
        .map((path) => {
          const meta = t.pathCatalog[path.key];
          return (
            <Link
              key={path.slug}
              href={`/paths/${path.slug}`}
              className="group flex flex-col gap-3 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-900/10 bg-white text-2xl shadow-sm"
              >
                {path.emoji}
              </span>
              <h3 className="text-lg font-semibold text-emerald-950">
                {meta?.title}
              </h3>
              <p className="text-sm text-emerald-900/60">{meta?.intro}</p>
              <div className="mt-auto flex items-center gap-3 pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/50">
                <span>
                  {path.count} {t.pathsMeta.plants}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {path.minutes} {t.pathsMeta.minutes}
                </span>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
