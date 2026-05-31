import { NextResponse } from "next/server";
import { fetchPlants } from "@/lib/trefle";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 },
    );
  }

  try {
    const data = await fetchPlants({ query });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Trefle search error", error);
    return NextResponse.json(
      { error: "Unable to fetch plant data" },
      { status: 500 },
    );
  }
}
