"use client";

import { useEffect } from "react";
import type { TreflePlant } from "@/types/plant";
import { addRecentPlant } from "@/lib/recently-viewed";

export function RecordView({ plant }: { plant: TreflePlant }) {
  useEffect(() => {
    addRecentPlant(plant);
  }, [plant]);

  return null;
}
