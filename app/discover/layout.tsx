import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover · Découvrir",
  description:
    "Wander through the plant kingdom: plant of the day, trending species, traits and botanical journeys. Flânez dans le règne végétal.",
  alternates: { canonical: "/discover" },
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
