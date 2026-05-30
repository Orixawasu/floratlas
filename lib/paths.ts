export type PathDef = {
  slug: string;
  key: string;
  emoji: string;
  query: string;
  count: number;
  minutes: number;
};

export const paths: PathDef[] = [
  {
    slug: "surviving-the-desert",
    key: "desert",
    emoji: "🌵",
    query: "desert",
    count: 8,
    minutes: 10,
  },
  {
    slug: "japan-through-plants",
    key: "japan",
    emoji: "🌸",
    query: "japan",
    count: 12,
    minutes: 15,
  },
  {
    slug: "tropical-giants",
    key: "tropical",
    emoji: "🌴",
    query: "tropical",
    count: 10,
    minutes: 8,
  },
  {
    slug: "carnivores-of-the-wild",
    key: "carnivorous",
    emoji: "🪤",
    query: "carnivorous",
    count: 8,
    minutes: 9,
  },
  {
    slug: "flora-of-france",
    key: "france",
    emoji: "🇫🇷",
    query: "france",
    count: 12,
    minutes: 14,
  },
  {
    slug: "gardens-of-provence",
    key: "provence",
    emoji: "💜",
    query: "lavandula",
    count: 8,
    minutes: 10,
  },
  {
    slug: "alpine-flora",
    key: "alpine",
    emoji: "🏔️",
    query: "alpine",
    count: 10,
    minutes: 12,
  },
  {
    slug: "mediterranean-coast",
    key: "mediterranean",
    emoji: "🌊",
    query: "mediterranean",
    count: 10,
    minutes: 11,
  },
  {
    slug: "vineyards-and-terroir",
    key: "vineyard",
    emoji: "🍇",
    query: "grape",
    count: 8,
    minutes: 9,
  },
];

export function getPathBySlug(slug: string) {
  return paths.find((path) => path.slug === slug);
}
