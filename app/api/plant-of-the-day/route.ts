import { NextResponse } from "next/server";
import { fetchPlantOfTheDay } from "@/lib/trefle";

export async function GET() {
  try {
    const plant = await fetchPlantOfTheDay();
    if (!plant) {
      return NextResponse.json({ error: "No plant found" }, { status: 404 });
    }
    return NextResponse.json({ data: plant });
  } catch (error) {
    console.error("Trefle plant-of-the-day error", error);
    return NextResponse.json(
      { error: "Unable to fetch the plant of the day" },
      { status: 500 },
    );
  }
}
