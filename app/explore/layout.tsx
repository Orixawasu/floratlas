import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore collections · Explorer les collections",
  description:
    "Browse curated botanical collections: desert, tropical, carnivorous plants and more. Parcourez des collections botaniques sélectionnées.",
  alternates: { canonical: "/explore" },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
