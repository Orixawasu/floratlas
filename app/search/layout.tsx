import type { Metadata } from "next";
import { siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search plants · Recherche de plantes",
  description:
    `Search plants by common or scientific name on ${siteName}. Recherchez des plantes par nom commun ou scientifique sur ${siteName}.`,
  alternates: { canonical: "/search" },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
