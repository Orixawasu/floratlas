"use client";

import type { TreflePlant } from "@/types/plant";
import { useI18n } from "@/components/LanguageProvider";

const MONTH_TOKENS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function monthSet(months?: string[] | null) {
  const set = new Set<number>();
  if (!months) {
    return set;
  }
  months.forEach((raw) => {
    const token = String(raw).trim().toLowerCase().slice(0, 3);
    if (token in MONTH_TOKENS) {
      set.add(MONTH_TOKENS[token]);
    } else {
      const num = Number(raw);
      if (Number.isInteger(num) && num >= 1 && num <= 12) {
        set.add(num - 1);
      }
    }
  });
  return set;
}

function scaleLabel(value?: number | null) {
  if (value === null || value === undefined) {
    return null;
  }
  return `${value} / 10`;
}

export function PlantConditions({ plant }: { plant: TreflePlant }) {
  const { t } = useI18n();
  const species = plant.main_species;
  const growth = species?.growth;
  const spec = species?.specifications;
  const flower = species?.flower;
  const foliage = species?.foliage;

  const phRange =
    growth?.ph_minimum != null || growth?.ph_maximum != null
      ? `${growth?.ph_minimum ?? "?"} – ${growth?.ph_maximum ?? "?"}`
      : null;

  const tempRange = (() => {
    const min = growth?.minimum_temperature?.deg_c;
    const max = growth?.maximum_temperature?.deg_c;
    if (min == null && max == null) {
      return null;
    }
    return `${min ?? "?"}°C – ${max ?? "?"}°C`;
  })();

  const sizeLabel = (() => {
    const max = spec?.maximum_height?.cm;
    const avg = spec?.average_height?.cm;
    const cm = max ?? avg;
    if (cm == null) {
      return null;
    }
    return cm >= 100 ? `${(cm / 100).toFixed(1)} m` : `${cm} cm`;
  })();

  const facts: { icon: string; label: string; value: string }[] = [];
  const push = (icon: string, label: string, value?: string | null) => {
    if (value) {
      facts.push({ icon, label, value });
    }
  };

  push("☀️", t.detail.sun, scaleLabel(growth?.light));
  push("💧", t.detail.water, scaleLabel(growth?.atmospheric_humidity));
  push("🌱", t.detail.soil, phRange ? `pH ${phRange}` : null);
  push("🌡️", t.detail.temperature, tempRange);
  push("📏", t.detail.matureSize, sizeLabel);
  push("🌳", t.detail.growthForm, spec?.growth_form ?? undefined);
  push("🌿", t.detail.growthHabit, spec?.growth_habit ?? undefined);
  push("⏱️", t.detail.growthRate, spec?.growth_rate ?? undefined);
  push(
    "🌸",
    t.detail.flowerColor,
    flower?.color && flower.color.length > 0 ? flower.color.join(", ") : undefined,
  );
  push(
    "🍃",
    t.detail.foliageColor,
    foliage?.color && foliage.color.length > 0
      ? foliage.color.join(", ")
      : undefined,
  );

  const bloom = monthSet(growth?.bloom_months);
  const grow = monthSet(growth?.growth_months);
  const fruit = monthSet(growth?.fruit_months);
  const hasSeason = bloom.size > 0 || grow.size > 0 || fruit.size > 0;

  const toxicity = spec?.toxicity;
  const isToxic =
    typeof toxicity === "string" && !/^none$/i.test(toxicity) && toxicity.trim() !== "";

  if (facts.length === 0 && !hasSeason && !toxicity) {
    return (
      <section className="rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-md">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-emerald-950">
          <span aria-hidden="true">🌦️</span>
          {t.detail.conditionsTitle}
        </h2>
        <p className="mt-3 text-sm text-emerald-900/60">{t.detail.noConditions}</p>
      </section>
    );
  }

  const seasonRows = [
    { label: t.detail.bloomMonths, set: bloom, active: "bg-pink-400" },
    { label: t.detail.growthMonths, set: grow, active: "bg-emerald-500" },
    { label: t.detail.fruitMonths, set: fruit, active: "bg-amber-400" },
  ].filter((row) => row.set.size > 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {(facts.length > 0 || toxicity) && (
        <section className="rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-md">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-emerald-950">
              <span aria-hidden="true">🌦️</span>
              {t.detail.conditionsTitle}
            </h2>
            <p className="text-sm text-emerald-900/55">
              {t.detail.conditionsSubtitle}
            </p>
          </div>
          {toxicity && (
            <div
              className={`mt-5 flex items-center gap-3 rounded-2xl border p-4 text-sm font-medium ${
                isToxic
                  ? "border-red-500/20 bg-red-50/80 text-red-800"
                  : "border-emerald-500/20 bg-emerald-50/80 text-emerald-800"
              }`}
            >
              <span aria-hidden="true" className="text-lg">
                {isToxic ? "☠️" : "🐶"}
              </span>
              <span>
                <span className="font-semibold">{t.detail.toxicity}:</span>{" "}
                <span className="capitalize">{toxicity}</span>
              </span>
            </div>
          )}
          {facts.length > 0 && (
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-emerald-900/5 bg-white/60 p-4"
                >
                  <dt className="text-xs uppercase tracking-[0.14em] text-emerald-900/40">
                    <span aria-hidden="true">{fact.icon}</span> {fact.label}
                  </dt>
                  <dd className="mt-1 font-semibold capitalize text-emerald-900">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      )}

      {hasSeason && (
        <section className="rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-md">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-emerald-950">
              <span aria-hidden="true">📅</span>
              {t.detail.seasonTitle}
            </h2>
            <p className="text-sm text-emerald-900/55">{t.detail.seasonSubtitle}</p>
          </div>
          <div className="mt-5 space-y-4">
            {seasonRows.map((row) => (
              <div key={row.label}>
                <p className="mb-1.5 text-sm font-medium text-emerald-900/70">
                  {row.label}
                </p>
                <div className="grid grid-cols-12 gap-1">
                  {t.months.map((month, index) => (
                    <div
                      key={month}
                      title={month}
                      className={`flex h-8 items-center justify-center rounded-md text-[10px] font-semibold ${
                        row.set.has(index)
                          ? `${row.active} text-white`
                          : "bg-emerald-50 text-emerald-900/30"
                      }`}
                    >
                      {month.slice(0, 1)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
