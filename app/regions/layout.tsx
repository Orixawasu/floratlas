import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regions · Régions",
  description:
    "Explore the world's flora region by region, from France to Asia. Explorez la flore du monde région par région, de la France à l'Asie.",
  alternates: { canonical: "/regions" },
};

export default function RegionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
