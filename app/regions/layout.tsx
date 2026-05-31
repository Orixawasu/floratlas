import type { Metadata } from "next";
import { siteDescription, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Regions · Régions",
  description:
    `Explore the world's flora region by region on ${siteName} — from France to Asia. Explorez la flore du monde région par région sur ${siteName}.`,
  openGraph: {
    title: `${siteName} · Regions`,
    description: siteDescription.en,
  },
  alternates: { canonical: "/regions" },
};

export default function RegionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
