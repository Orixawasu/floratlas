"use client";

import Link from "next/link";
import { traits } from "@/lib/traits";
import { useI18n } from "@/components/LanguageProvider";

export function TraitGrid() {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap gap-3">
      {traits.map((trait) => (
        <Link
          key={trait.key}
          href={`/traits/${trait.key}`}
          className="group flex items-center gap-2 rounded-2xl border border-emerald-900/10 bg-white/70 px-4 py-3 text-sm font-semibold text-emerald-900/80 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-emerald-900/30 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
        >
          <span aria-hidden="true" className="text-lg">
            {trait.emoji}
          </span>
          {t.traitLabels[trait.key]}
        </Link>
      ))}
    </div>
  );
}
