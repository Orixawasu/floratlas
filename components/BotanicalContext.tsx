"use client";

import Link from "next/link";
import type { TreflePlant } from "@/types/plant";
import { getEntityName } from "@/lib/utils";
import { slugifyFamily } from "@/lib/families";
import { useI18n } from "@/components/LanguageProvider";

export function BotanicalContext({ plant }: { plant: TreflePlant }) {
  const { t } = useI18n();
  const family = getEntityName(plant.family);
  const genus = getEntityName(plant.genus);
  const species = plant.scientific_name ?? "—";

  const hierarchy = [
    {
      label: t.detail.family,
      value: family,
      href: family !== "—" ? `/families/${slugifyFamily(family)}` : undefined,
    },
    {
      label: t.detail.genus,
      value: genus,
      href:
        genus !== "—" ? `/search?q=${encodeURIComponent(genus)}` : undefined,
    },
    {
      label: "Species",
      value: species,
      href: undefined,
    },
  ];

  return (
    <section className="rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-md">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-emerald-950">
          <span aria-hidden="true">🧬</span>
          {t.detail.contextTitle}
        </h2>
        <p className="text-sm text-emerald-900/55">{t.detail.contextSubtitle}</p>
      </div>
      <ol className="mt-5 space-y-2">
        {hierarchy.map((item, index) => (
          <li
            key={item.label}
            className="flex items-center gap-3"
            style={{ paddingLeft: `${index * 1.25}rem` }}
          >
            <span aria-hidden="true" className="text-emerald-900/30">
              {index === 0 ? "•" : "└"}
            </span>
            <span className="text-xs uppercase tracking-[0.16em] text-emerald-900/40">
              {item.label}
            </span>
            {item.href ? (
              <Link
                href={item.href}
                className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
              >
                {item.value}
              </Link>
            ) : (
              <span className="text-sm font-semibold italic text-emerald-900/80">
                {item.value}
              </span>
            )}
          </li>
        ))}
      </ol>
      {family !== "—" && (
        <Link
          href={`/families/${slugifyFamily(family)}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 transition hover:text-emerald-700"
        >
          {t.detail.viewFamily} →
        </Link>
      )}
    </section>
  );
}
