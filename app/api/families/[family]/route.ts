import { NextResponse } from "next/server";
import { fetchPlantsByFamily } from "@/lib/trefle";
import { deslugifyFamily } from "@/lib/families";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ family: string }> },
) {
  const { family } = await params;
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1") || 1;

  try {
    const data = await fetchPlantsByFamily(deslugifyFamily(family), page);
    if (!data) {
      return NextResponse.json({ error: "Family not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Trefle family error", error);
    return NextResponse.json(
      { error: "Unable to fetch family plants" },
      { status: 500 },
    );
  }
}
