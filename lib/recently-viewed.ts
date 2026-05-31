import type { TreflePlant } from "@/types/plant";

export type RecentPlant = {
  id: number;
  common_name?: string | null;
  scientific_name?: string | null;
  image_url?: string | null;
  viewedAt?: number;
};

const STORAGE_KEY = "floradex-recent";
const MAX_ITEMS = 8;

export function getRecentPlants(): RecentPlant[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as RecentPlant[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addRecentPlant(plant: TreflePlant) {
  if (typeof window === "undefined") {
    return;
  }
  const entry: RecentPlant = {
    id: plant.id,
    common_name: plant.common_name ?? null,
    scientific_name: plant.scientific_name ?? null,
    image_url: plant.image_url ?? null,
    viewedAt: Date.now(),
  };
  const existing = getRecentPlants().filter((item) => item.id !== plant.id);
  const next = [entry, ...existing].slice(0, MAX_ITEMS);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("floradex-recent-updated"));
}
