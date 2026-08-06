"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { TreflePlant, TrefleImagesByCategory } from "@/types/plant";
import { useI18n } from "@/components/LanguageProvider";

type GalleryImage = {
  url: string;
  category: string;
  copyright?: string | null;
};

const CATEGORY_ORDER = [
  "habit",
  "flower",
  "leaf",
  "fruit",
  "bark",
  "seed",
  "trunk",
  "stem",
  "bud",
  "form",
  "sheath",
  "other",
];

const CATEGORY_EMOJI: Record<string, string> = {
  habit: "🌳",
  flower: "🌸",
  leaf: "🍃",
  fruit: "🍒",
  bark: "🪵",
  seed: "🌰",
  trunk: "🪵",
  stem: "🌿",
  bud: "🌱",
  form: "🖼️",
  sheath: "🍂",
  other: "📷",
};

const INITIAL_VISIBLE = 8;

function collectImages(source?: TrefleImagesByCategory | null): GalleryImage[] {
  if (!source) {
    return [];
  }
  const images: GalleryImage[] = [];
  const seen = new Set<string>();
  Object.entries(source).forEach(([rawCategory, entries]) => {
    if (!Array.isArray(entries)) {
      return;
    }
    const category = rawCategory.trim() ? rawCategory.trim().toLowerCase() : "other";
    entries.forEach((entry) => {
      const url = entry?.image_url;
      if (!url || seen.has(url)) {
        return;
      }
      seen.add(url);
      images.push({ url, category, copyright: entry?.copyright });
    });
  });
  return images;
}

function orderCategories(categories: string[]) {
  return [...categories].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    const rankA = ia === -1 ? CATEGORY_ORDER.length : ia;
    const rankB = ib === -1 ? CATEGORY_ORDER.length : ib;
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    return a.localeCompare(b);
  });
}

export function PlantGallery({ plant }: { plant: TreflePlant }) {
  const { t } = useI18n();

  const images = useMemo(() => {
    const collected = collectImages(plant.images ?? plant.main_species?.images);
    const rank = (category: string) => {
      const index = CATEGORY_ORDER.indexOf(category);
      return index === -1 ? CATEGORY_ORDER.length : index;
    };
    return collected
      .map((image, order) => ({ image, order }))
      .sort((a, b) => rank(a.image.category) - rank(b.image.category) || a.order - b.order)
      .map((item) => item.image);
  }, [plant.images, plant.main_species?.images]);

  const categories = useMemo(
    () => orderCategories([...new Set(images.map((image) => image.category))]),
    [images],
  );

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "all") {
      return images;
    }
    return images.filter((image) => image.category === activeCategory);
  }, [images, activeCategory]);

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);

  const categoryLabel = useCallback(
    (category: string) =>
      t.gallery.categories[category] ??
      category.charAt(0).toUpperCase() + category.slice(1),
    [t.gallery.categories],
  );

  const selectCategory = useCallback((category: string) => {
    setActiveCategory(category);
    setExpanded(false);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () =>
      setLightboxIndex((index) =>
        index === null ? index : (index - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );
  const showNext = useCallback(
    () =>
      setLightboxIndex((index) =>
        index === null ? index : (index + 1) % filtered.length,
      ),
    [filtered.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPrev();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  if (images.length === 0) {
    return null;
  }

  const active = lightboxIndex === null ? null : filtered[lightboxIndex];

  return (
    <section className="rounded-[32px] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-md">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-emerald-950">
            <span aria-hidden="true">🖼️</span>
            {t.gallery.title}
          </h2>
          <span className="rounded-full bg-emerald-900/5 px-2.5 py-0.5 text-xs font-semibold text-emerald-900/60">
            {(images.length === 1
              ? t.gallery.photoSingular
              : t.gallery.photosCount
            ).replace("{count}", String(images.length))}
          </span>
        </div>
        <p className="text-sm text-emerald-900/55">{t.gallery.subtitle}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label={t.gallery.title}>
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "all"}
          onClick={() => selectCategory("all")}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
            activeCategory === "all"
              ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
              : "border-emerald-900/10 bg-white/70 text-emerald-900/70 hover:border-emerald-600/40 hover:text-emerald-900"
          }`}
        >
          {t.gallery.all}
          <span
            className={`rounded-full px-1.5 text-xs font-bold ${
              activeCategory === "all"
                ? "bg-white/25 text-white"
                : "bg-emerald-900/5 text-emerald-900/50"
            }`}
          >
            {images.length}
          </span>
        </button>
        {categories.map((category) => {
          const count = images.filter((image) => image.category === category).length;
          const selected = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectCategory(category)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                selected
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                  : "border-emerald-900/10 bg-white/70 text-emerald-900/70 hover:border-emerald-600/40 hover:text-emerald-900"
              }`}
            >
              <span aria-hidden="true">{CATEGORY_EMOJI[category] ?? "📷"}</span>
              {categoryLabel(category)}
              <span
                className={`rounded-full px-1.5 text-xs font-bold ${
                  selected ? "bg-white/25 text-white" : "bg-emerald-900/5 text-emerald-900/50"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((image, index) => (
          <li key={image.url}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-emerald-900/5 bg-emerald-50/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              <Image
                src={image.url}
                alt={`${plant.common_name ?? plant.scientific_name ?? ""} — ${categoryLabel(
                  image.category,
                )}`.trim()}
                fill
                unoptimized
                loading="lazy"
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-2 text-left text-[11px] font-semibold uppercase tracking-wide text-white opacity-0 transition group-hover:opacity-100">
                {categoryLabel(image.category)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {filtered.length > INITIAL_VISIBLE && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="rounded-full border border-emerald-900/10 bg-white/70 px-5 py-2 text-sm font-semibold text-emerald-900/80 transition hover:border-emerald-600/40 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            {expanded
              ? t.gallery.showLess
              : t.gallery.showMore.replace("{count}", String(filtered.length))}
          </button>
        </div>
      )}

      {active &&
        lightboxIndex !== null &&
        typeof document !== "undefined" &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.title}
          className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div className="flex items-center justify-between px-4 py-4 text-white sm:px-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span aria-hidden="true">{CATEGORY_EMOJI[active.category] ?? "📷"}</span>
              <span>{categoryLabel(active.category)}</span>
              <span className="text-white/50">
                ·{" "}
                {t.gallery.counter
                  .replace("{current}", String(lightboxIndex + 1))
                  .replace("{total}", String(filtered.length))}
              </span>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label={t.gallery.close}
              className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16"
            onClick={(event) => event.stopPropagation()}
          >
            {filtered.length > 1 && (
              <button
                type="button"
                onClick={showPrev}
                aria-label={t.gallery.previous}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            <div className="relative h-full max-h-[75vh] w-full max-w-4xl">
              <Image
                src={active.url}
                alt={`${plant.common_name ?? plant.scientific_name ?? ""} — ${categoryLabel(
                  active.category,
                )}`.trim()}
                fill
                unoptimized
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {filtered.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                aria-label={t.gallery.next}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>

          {active.copyright && (
            <p className="px-4 pb-5 text-center text-xs text-white/50 sm:px-6">
              © {active.copyright}
            </p>
          )}
        </div>,
          document.body,
        )}
    </section>
  );
}
