import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Botanical glossary · Glossaire botanique",
  description:
    "Essential botanical vocabulary to read plant data like a botanist. Le vocabulaire botanique essentiel pour lire les données des plantes.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
