import type { Metadata } from "next";
import { siteDescription, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Botanical paths · Parcours botaniques",
  description:
    `Guided narrative journeys through the most fascinating plants on ${siteName}. Des parcours narratifs guidés à travers les plantes les plus fascinantes sur ${siteName}.`,
  openGraph: {
    title: `${siteName} · Paths`,
    description: siteDescription.en,
  },
  alternates: { canonical: "/paths" },
};

export default function PathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
