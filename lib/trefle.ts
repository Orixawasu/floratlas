import type {
  TrefleItemResponse,
  TreflePaginatedResponse,
  TreflePlant,
} from "@/types/plant";

const TREFLE_BASE_URL = "https://trefle.io/api/v1";

type FetchOptions = {
  path: string;
  params?: Record<string, string | number | boolean | undefined>;
};

function getToken() {
  const token = process.env.TREFLE_API_TOKEN;
  if (!token) {
    throw new Error("Missing TREFLE_API_TOKEN");
  }
  return token;
}

function buildUrl({ path, params }: FetchOptions) {
  const url = new URL(`${TREFLE_BASE_URL}${path}`);
  const token = getToken();
  url.searchParams.set("token", token);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        return;
      }
      url.searchParams.set(key, String(value));
    });
  }

  return url;
}

export async function fetchPlants(params: { query: string }) {
  const url = buildUrl({ path: "/plants/search", params: { q: params.query } });
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error("Failed to fetch plant search");
  }
  return (await response.json()) as TreflePaginatedResponse<TreflePlant>;
}

export async function fetchPlantById(id: string) {
  const url = buildUrl({ path: `/plants/${id}` });
  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as TrefleItemResponse<TreflePlant>;
}

export async function fetchPlantsByFamily(family: string, page = 1) {
  const url = buildUrl({
    path: "/plants",
    params: { "filter[family_name]": family, page },
  });
  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as TreflePaginatedResponse<TreflePlant>;
}

export async function fetchPlantsByDistribution(slug: string, page = 1) {
  const url = buildUrl({
    path: `/distributions/${slug}/plants`,
    params: { page },
  });
  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as TreflePaginatedResponse<TreflePlant>;
}

export async function fetchPlantsPage(page: number) {
  const url = buildUrl({ path: "/plants", params: { page } });
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error("Failed to fetch plants page");
  }
  return (await response.json()) as TreflePaginatedResponse<TreflePlant>;
}

function pickImaged(plants: TreflePlant[]) {
  return plants.filter((plant) => Boolean(plant.image_url));
}

export async function fetchRandomPlant(): Promise<TreflePlant | null> {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const page = Math.floor(Math.random() * 600) + 1;
    try {
      const { data } = await fetchPlantsPage(page);
      const imaged = pickImaged(data);
      if (imaged.length > 0) {
        return imaged[Math.floor(Math.random() * imaged.length)];
      }
    } catch {
      // try another page
    }
  }
  return null;
}

export async function fetchPlantOfTheDay(): Promise<TreflePlant | null> {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  const page = (dayOfYear % 200) + 1;

  try {
    const { data } = await fetchPlantsPage(page);
    const imaged = pickImaged(data);
    if (imaged.length === 0) {
      return null;
    }
    return imaged[dayOfYear % imaged.length];
  } catch {
    return null;
  }
}
