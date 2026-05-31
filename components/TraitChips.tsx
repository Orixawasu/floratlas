"use client";

import Link from "next/link";
import type { TreflePlant } from "@/types/plant";
import { inferTraits, getTrait } from "@/lib/traits";
import { useI18n } from "@/components/LanguageProvider";

export function TraitChips({ plant }: { plant: TreflePlant }) {
  const { t } = useI18n();
  const keys = inferTraits(plant);

  if (keys.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {keys.map((key) => {
        const trait = getTrait(key);
        if (!trait) {
          return null;
        }
        return (
          <Link
            key={key}
            href={`/traits/${key}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-900/10 bg-white/70 px-3 py-1.5 text-sm font-medium text-emerald-900/80 backdrop-blur-md transition hover:border-emerald-900/30 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            <span aria-hidden="true">{trait.emoji}</span>
            {t.traitLabels[key]}
          </Link>
        );
      })}
    </div>
  );
}
