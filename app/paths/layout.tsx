import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Botanical paths · Parcours botaniques",
  description:
    "Guided narrative journeys through the most fascinating plants. Des parcours narratifs guidés à travers les plantes les plus fascinantes.",
  alternates: { canonical: "/paths" },
};

export default function PathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
