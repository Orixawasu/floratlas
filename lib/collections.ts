export type CollectionDef = {
  slug: string;
  key: string;
  query: string;
  emoji: string;
};

export const collections: CollectionDef[] = [
  { slug: "desert-plants", key: "desert", query: "desert", emoji: "🌵" },
  { slug: "tropical-plants", key: "tropical", query: "tropical", emoji: "🌴" },
  { slug: "japanese-flora", key: "japan", query: "japan", emoji: "🌸" },
  {
    slug: "carnivorous-plants",
    key: "carnivorous",
    query: "carnivorous",
    emoji: "🦟",
  },
  { slug: "ancient-trees", key: "ancient", query: "ancient tree", emoji: "🌳" },
  { slug: "toxic-beauties", key: "toxic", query: "toxic", emoji: "☠️" },
  { slug: "indoor-plants", key: "indoor", query: "ficus", emoji: "🏠" },
  {
    slug: "pet-friendly-plants",
    key: "petFriendly",
    query: "calathea",
    emoji: "🐶",
  },
  {
    slug: "pollinator-plants",
    key: "pollinator",
    query: "bee",
    emoji: "🌼",
  },
  { slug: "edible-plants", key: "edible", query: "fruit", emoji: "🍓" },
];

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export const popularSearches = [
  "Rose",
  "Orchid",
  "Maple",
  "Bamboo",
  "Lavender",
  "Aloe",
  "Fern",
  "Cactus",
];
