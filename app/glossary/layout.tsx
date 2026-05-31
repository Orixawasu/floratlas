import type { Metadata } from "next";
import { siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Botanical glossary · Glossaire botanique",
  description:
    `Essential botanical vocabulary to read plant data on ${siteName}. Le vocabulaire botanique essentiel pour lire les données des plantes sur ${siteName}.`,
  alternates: { canonical: "/glossary" },
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
