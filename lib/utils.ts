import type { PlantRarity, TrefleNamedEntity } from "@/types/plant";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const rarities: PlantRarity[] = ["Common", "Uncommon", "Rare", "Exotic"];

export function getRarityLabel(seed?: number) {
  if (!seed) {
    return rarities[0];
  }

  return rarities[Math.abs(seed) % rarities.length];
}

export const rarityStyles: Record<
  PlantRarity,
  { emoji: string; className: string }
> = {
  Common: {
    emoji: "🌱",
    className: "bg-emerald-50/90 text-emerald-700 ring-1 ring-emerald-600/20",
  },
  Uncommon: {
    emoji: "🌿",
    className: "bg-teal-50/90 text-teal-700 ring-1 ring-teal-600/20",
  },
  Rare: {
    emoji: "💎",
    className: "bg-sky-50/90 text-sky-700 ring-1 ring-sky-600/20",
  },
  Exotic: {
    emoji: "✨",
    className: "bg-amber-50/90 text-amber-700 ring-1 ring-amber-500/30",
  },
};

export function getEntityName(
  value?: string | TrefleNamedEntity | null,
): string {
  if (!value) {
    return "—";
  }

  if (typeof value === "string") {
    return value;
  }

  return value.common_name || value.name || "—";
}

export function formatDistribution(list?: string[] | string | null) {
  if (!list || list.length === 0) {
    return "—";
  }

  if (typeof list === "string") {
    return list;
  }

  return list.join(", ");
}
