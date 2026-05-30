import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide · Comment explorer",
  description:
    "A simple guide to navigating FloraDex and understanding botanical terms. Un guide simple pour naviguer dans FloraDex et comprendre les termes botaniques.",
  alternates: { canonical: "/guide" },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
