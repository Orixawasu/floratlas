import type { Metadata } from "next";
import { siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Collections botaniques",
  description:
    `Editorial botanical collections curated by ${siteName}. Collections botaniques éditorialisées par ${siteName}.`,
  alternates: { canonical: "/collections" },
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
