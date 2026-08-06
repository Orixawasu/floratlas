export type TrefleNamedEntity = {
  id?: number;
  name?: string | null;
  common_name?: string | null;
  slug?: string | null;
};

export type TrefleDistribution = {
  native?: string[] | string;
  introduced?: string[] | string;
  doubtful?: string[] | string;
  absent?: string[] | string;
  extinct?: string[] | string;
} | null;

export type TrefleMeasure = {
  cm?: number | null;
  mm?: number | null;
  deg_c?: number | null;
  deg_f?: number | null;
} | null;

export type TrefleGrowth = {
  description?: string | null;
  light?: number | null;
  atmospheric_humidity?: number | null;
  ph_minimum?: number | null;
  ph_maximum?: number | null;
  minimum_temperature?: TrefleMeasure;
  maximum_temperature?: TrefleMeasure;
  minimum_precipitation?: TrefleMeasure;
  maximum_precipitation?: TrefleMeasure;
  soil_texture?: number | null;
  soil_humidity?: number | null;
  growth_months?: string[] | null;
  bloom_months?: string[] | null;
  fruit_months?: string[] | null;
} | null;

export type TrefleSpecifications = {
  growth_form?: string | null;
  growth_habit?: string | null;
  growth_rate?: string | null;
  average_height?: TrefleMeasure;
  maximum_height?: TrefleMeasure;
  toxicity?: string | null;
} | null;

export type TrefleFlower = {
  color?: string[] | null;
  conspicuous?: boolean | null;
} | null;

export type TrefleFoliage = {
  texture?: string | null;
  color?: string[] | null;
  leaf_retention?: boolean | null;
} | null;

export type TrefleSpeciesDetail = {
  id?: number;
  scientific_name?: string | null;
  common_name?: string | null;
  family?: string | TrefleNamedEntity | null;
  genus?: string | TrefleNamedEntity | null;
  image_url?: string | null;
  edible?: boolean | null;
  edible_part?: string[] | null;
  duration?: string | null;
  distribution?: TrefleDistribution;
  growth?: TrefleGrowth;
  specifications?: TrefleSpecifications;
  flower?: TrefleFlower;
  foliage?: TrefleFoliage;
  common_names?: Record<string, string[]> | null;
  images?: TrefleImagesByCategory | null;
};

export type TrefleImage = {
  id?: number;
  image_url?: string | null;
  copyright?: string | null;
};

export type TrefleImagesByCategory = Record<string, TrefleImage[]>;

export type TrefleTaxonRef = {
  id: number;
  scientific_name?: string | null;
  common_name?: string | null;
  image_url?: string | null;
  rank?: string | null;
};

export type TreflePlant = {
  id: number;
  slug?: string | null;
  common_name?: string | null;
  scientific_name?: string | null;
  family?: string | TrefleNamedEntity | null;
  family_common_name?: string | null;
  genus?: string | TrefleNamedEntity | null;
  image_url?: string | null;
  author?: string | null;
  year?: number | null;
  rank?: string | null;
  status?: string | null;
  bibliography?: string | null;
  observations?: string | null;
  vegetable?: boolean | null;
  edible?: boolean | null;
  common_names?: Record<string, string[]> | null;
  images?: TrefleImagesByCategory | null;
  distribution?: TrefleDistribution;
  main_species?: TrefleSpeciesDetail | null;
  subspecies?: TrefleTaxonRef[] | null;
  varieties?: TrefleTaxonRef[] | null;
};

export type TreflePaginatedResponse<T> = {
  data: T[];
  links?: {
    self?: string;
    first?: string;
    last?: string;
    next?: string;
    prev?: string;
  };
  meta?: {
    total?: number;
  };
};

export type TrefleItemResponse<T> = {
  data: T;
};

export type PlantRarity = "Common" | "Uncommon" | "Rare" | "Exotic";
