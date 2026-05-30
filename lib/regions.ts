export type RegionDef = {
  slug: string;
  key: string;
  emoji: string;
  parent?: string;
  /** Trefle distribution slug (TDWG code) — yields real native data when set. */
  distribution?: string;
  /** Fallback search query when no distribution mapping exists. */
  query?: string;
  /** Slugs of related regions to suggest. */
  related?: string[];
  /** Child region slugs (for hub regions like France). */
  children?: string[];
};

export const regions: RegionDef[] = [
  {
    slug: "france",
    key: "france",
    emoji: "🇫🇷",
    distribution: "fra",
    related: ["europe", "mediterranean"],
    children: ["occitanie", "provence", "alps", "brittany", "corsica"],
  },
  {
    slug: "europe",
    key: "europe",
    emoji: "🌍",
    distribution: "1",
    related: ["france", "mediterranean", "asia"],
  },
  {
    slug: "mediterranean",
    key: "mediterranean",
    emoji: "🫒",
    query: "mediterranean",
    related: ["france", "europe"],
  },
  {
    slug: "north-america",
    key: "northAmerica",
    emoji: "🦅",
    distribution: "7",
    related: ["europe", "asia"],
  },
  {
    slug: "asia",
    key: "asia",
    emoji: "🏯",
    distribution: "3",
    related: ["europe", "mediterranean"],
  },

  // France sub-regions
  {
    slug: "occitanie",
    key: "occitanie",
    emoji: "🌾",
    parent: "france",
    query: "occitania",
    related: ["provence", "mediterranean"],
  },
  {
    slug: "provence",
    key: "provence",
    emoji: "💜",
    parent: "france",
    query: "lavandula",
    related: ["mediterranean", "corsica"],
  },
  {
    slug: "alps",
    key: "alps",
    emoji: "🏔️",
    parent: "france",
    query: "alpine",
    related: ["europe", "france"],
  },
  {
    slug: "brittany",
    key: "brittany",
    emoji: "🌊",
    parent: "france",
    query: "maritime",
    related: ["france", "europe"],
  },
  {
    slug: "corsica",
    key: "corsica",
    emoji: "🏝️",
    parent: "france",
    distribution: "cor",
    related: ["provence", "mediterranean"],
  },
];

export function getRegionBySlug(slug: string) {
  return regions.find((region) => region.slug === slug);
}

export function getTopRegions() {
  return regions.filter((region) => !region.parent);
}

export function getChildren(slug: string) {
  return regions.filter((region) => region.parent === slug);
}
