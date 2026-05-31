export function slugifyFamily(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function deslugifyFamily(slug: string) {
  const cleaned = slug.replace(/-/g, " ").trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export const popularFamilies = [
  "Asteraceae",
  "Fabaceae",
  "Orchidaceae",
  "Rosaceae",
  "Poaceae",
  "Araceae",
  "Cactaceae",
  "Lamiaceae",
];
