import { NextResponse } from "next/server";
import { fetchPlantById } from "@/lib/trefle";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const data = await fetchPlantById(id);
    if (!data) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Trefle detail error", error);
    return NextResponse.json(
      { error: "Unable to fetch plant data" },
      { status: 500 },
    );
  }
}
