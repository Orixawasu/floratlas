import type { Metadata } from "next";
import { siteDescription, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Explore collections · Explorer les collections",
  description:
    `Browse curated botanical collections on ${siteName}: desert, tropical, carnivorous plants and more. Parcourez des collections botaniques sélectionnées sur ${siteName}.`,
  openGraph: {
    title: `${siteName} · Explore`,
    description: siteDescription.en,
  },
  alternates: { canonical: "/explore" },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
