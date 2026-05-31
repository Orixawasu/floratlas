import Link from "next/link";
import type { TreflePlant } from "@/types/plant";
import { PlantCard } from "@/components/PlantCard";

type ExplorerCollectionProps = {
  emoji: string;
  title: string;
  description: string;
  plants: TreflePlant[];
  priority?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

export function ExplorerCollection({
  emoji,
  title,
  description,
  plants,
  priority = false,
  ctaHref,
  ctaLabel,
}: ExplorerCollectionProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-emerald-950">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-900/10 bg-white/70 text-xl shadow-sm backdrop-blur-md"
            >
              {emoji}
            </span>
            {title}
          </h2>
          <p className="max-w-2xl text-sm text-emerald-900/60">{description}</p>
        </div>
        {ctaHref && ctaLabel && (
          <Link
            href={ctaHref}
            className="shrink-0 text-sm font-semibold text-emerald-900 transition hover:text-emerald-700"
          >
            {ctaLabel} →
          </Link>
        )}
      </div>
      <div className="-mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-4 [scrollbar-width:thin]">
        {plants.map((plant, index) => (
          <div
            key={plant.id}
            className="w-[240px] shrink-0 snap-start sm:w-[270px]"
          >
            <PlantCard plant={plant} priority={priority && index < 2} />
          </div>
        ))}
      </div>
    </section>
  );
}
