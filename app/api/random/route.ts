import { NextResponse } from "next/server";
import { fetchRandomPlant } from "@/lib/trefle";

export async function GET() {
  try {
    const plant = await fetchRandomPlant();
    if (!plant) {
      return NextResponse.json(
        { error: "No plant found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ data: plant });
  } catch (error) {
    console.error("Trefle random error", error);
    return NextResponse.json(
      { error: "Unable to fetch a random plant" },
      { status: 500 },
    );
  }
}
