import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search plants · Recherche de plantes",
  description:
    "Search plants by common or scientific name. Recherchez des plantes par nom commun ou scientifique.",
  alternates: { canonical: "/search" },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
