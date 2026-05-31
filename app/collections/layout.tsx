import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections botaniques",
  description:
    "Editorial botanical collections curated by FloraDex. Collections botaniques éditorialisées par FloraDex.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
