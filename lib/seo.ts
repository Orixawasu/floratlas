export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const siteName = "FloraDex";

export const siteDescription = {
  en: "FloraDex is a modern botanical encyclopedia — discover plants, families and species through open botanical data.",
  fr: "FloraDex est une encyclopédie botanique moderne — découvrez les plantes, familles et espèces grâce à des données botaniques ouvertes.",
};
