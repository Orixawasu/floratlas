import type { TreflePlant } from "@/types/plant";
import { getEntityName } from "@/lib/utils";

export type TraitKey =
  | "tropical"
  | "lowWater"
  | "fullSun"
  | "houseplant"
  | "toxic"
  | "coldResistant"
  | "edible"
  | "flowering";

export type TraitDef = {
  key: TraitKey;
  emoji: string;
  query: string;
};

export const traits: TraitDef[] = [
  { key: "tropical", emoji: "🌴", query: "tropical" },
  { key: "lowWater", emoji: "💧", query: "desert" },
  { key: "fullSun", emoji: "🌞", query: "sun" },
  { key: "houseplant", emoji: "🪴", query: "houseplant" },
  { key: "toxic", emoji: "☠️", query: "toxic" },
  { key: "coldResistant", emoji: "❄️", query: "alpine" },
  { key: "edible", emoji: "🍎", query: "edible" },
  { key: "flowering", emoji: "🌸", query: "flower" },
];

export function getTrait(key: string) {
  return traits.find((trait) => trait.key === key);
}

const familyTraitMap: Record<string, TraitKey[]> = {
  Cactaceae: ["lowWater", "fullSun", "houseplant"],
  Araceae: ["tropical", "houseplant"],
  Orchidaceae: ["flowering", "tropical", "houseplant"],
  Rosaceae: ["flowering", "edible"],
  Asteraceae: ["flowering", "fullSun"],
  Fabaceae: ["edible", "fullSun"],
  Poaceae: ["fullSun", "coldResistant"],
  Crassulaceae: ["lowWater", "houseplant"],
  Pinaceae: ["coldResistant"],
  Lamiaceae: ["edible", "fullSun"],
};

const keywordTraitMap: { match: RegExp; trait: TraitKey }[] = [
  { match: /cact|agave|aloe|succulent|euphorbia/i, trait: "lowWater" },
  { match: /palm|monstera|philoden|ficus|banana/i, trait: "tropical" },
  { match: /nepenthes|dionaea|drosera|sarracenia/i, trait: "tropical" },
  { match: /pine|fir|spruce|larch|juniper/i, trait: "coldResistant" },
  { match: /mint|basil|thyme|sage|rosemary|oregano/i, trait: "edible" },
  { match: /rose|orchid|lily|tulip|iris|daisy/i, trait: "flowering" },
];

export function inferTraits(plant: TreflePlant): TraitKey[] {
  const result = new Set<TraitKey>();
  const family = getEntityName(plant.family);
  const haystack = [
    getEntityName(plant.genus),
    plant.scientific_name ?? "",
    plant.common_name ?? "",
  ]
    .join(" ")
    .toLowerCase();

  if (family && familyTraitMap[family]) {
    familyTraitMap[family].forEach((trait) => result.add(trait));
  }

  keywordTraitMap.forEach(({ match, trait }) => {
    if (match.test(haystack)) {
      result.add(trait);
    }
  });

  if (plant.edible) {
    result.add("edible");
  }

  if (result.size === 0) {
    result.add("flowering");
  }

  return Array.from(result).slice(0, 4);
}
