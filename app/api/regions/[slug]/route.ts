import { NextResponse } from "next/server";
import { getRegionBySlug } from "@/lib/regions";
import { fetchPlantsByDistribution, fetchPlants } from "@/lib/trefle";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) {
    return NextResponse.json({ error: "Region not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1") || 1;

  try {
    if (region.distribution) {
      const data = await fetchPlantsByDistribution(region.distribution, page);
      return NextResponse.json(data ?? { data: [] });
    }
    if (region.query) {
      const data = await fetchPlants({ query: region.query });
      return NextResponse.json(data);
    }
    return NextResponse.json({ data: [] });
  } catch (error) {
    console.error("Region plants error", error);
    return NextResponse.json(
      { error: "Unable to fetch region plants" },
      { status: 500 },
    );
  }
}
