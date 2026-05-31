import type { Metadata } from "next";
import { siteDescription, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guide · Comment explorer",
  description:
    `A simple guide to navigating ${siteName} and understanding botanical terms. Un guide simple pour naviguer dans ${siteName} et comprendre les termes botaniques.`,
  openGraph: {
    title: `${siteName} · Guide`,
    description: siteDescription.en,
  },
  alternates: { canonical: "/guide" },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
