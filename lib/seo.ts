export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const siteName = "FlorAtlas";

export const siteTagline = {
  en: "The botanical atlas",
  fr: "L'atlas botanique",
};

export const siteDescription = {
  en: "FlorAtlas is an interactive botanical atlas — explore plants, families, regions and species through open botanical data. Map the plant kingdom one species at a time.",
  fr: "FlorAtlas est un atlas botanique interactif — explorez plantes, familles, régions et espèces grâce à des données botaniques ouvertes. Cartographiez le règne végétal, espèce par espèce.",
};

export const siteKeywords = [
  "FlorAtlas",
  "floratlas",
  "botanical atlas",
  "atlas botanique",
  "plant atlas",
  "atlas des plantes",
  "plants",
  "plantes",
  "botany",
  "botanique",
  "flora",
  "flore",
  "species",
  "espèces",
  "encyclopedia",
  "encyclopédie",
  "Trefle",
];

export const defaultTitle = `${siteName} · ${siteTagline.en}`;

export const bilingualDescription = `${siteDescription.en} ${siteDescription.fr}`;

export function plantPageDescription(
  commonName: string,
  scientificName: string,
  family: string,
  genus: string,
) {
  return {
    en: `${commonName} (${scientificName}) — family ${family}, genus ${genus}. Explore taxonomy, growing conditions and related species on FlorAtlas.`,
    fr: `${commonName} (${scientificName}) — famille ${family}, genre ${genus}. Explorez la taxonomie, les conditions de culture et les espèces proches sur FlorAtlas.`,
  };
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  alternateName: ["Flor Atlas", "floratlas"],
  url: siteUrl,
  description: siteDescription.en,
  inLanguage: ["en", "fr"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
