"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/LanguageProvider";
import type { TrefleItemResponse, TreflePlant } from "@/types/plant";

export function RandomPlantButton() {
  const router = useRouter();
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/random");
      if (!response.ok) {
        throw new Error("Random failed");
      }
      const data = (await response.json()) as TrefleItemResponse<TreflePlant>;
      router.push(`/plants/${data.data.id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50/80 via-white/70 to-cyan-50/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-3xl">
          🎲
        </span>
        <div>
          <p className="text-lg font-semibold text-emerald-950">
            {t.home.randomTitle}
          </p>
          <p className="text-sm text-emerald-900/60">{t.home.randomDesc}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
      >
        {loading ? `${t.home.randomLoading}…` : t.home.randomCta}
      </button>
    </div>
  );
}
