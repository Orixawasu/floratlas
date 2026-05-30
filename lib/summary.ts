import type { Locale } from "@/lib/i18n";
import type { TreflePlant } from "@/types/plant";
import { getEntityName } from "@/lib/utils";

function nativeRegions(plant: TreflePlant) {
  const native =
    plant.distribution?.native ?? plant.main_species?.distribution?.native;
  if (!native) {
    return "";
  }
  const list = typeof native === "string" ? [native] : native;
  return list.slice(0, 3).join(", ");
}

/**
 * Builds a short, readable summary strictly from available API data.
 * No scientific facts are invented — only the data fields are reworded.
 */
export function buildPlantSummary(plant: TreflePlant, locale: Locale) {
  const name =
    plant.common_name ?? plant.scientific_name ?? (locale === "fr" ? "Cette plante" : "This plant");
  const scientific = plant.scientific_name ?? "";
  const family = getEntityName(plant.family);
  const genus = getEntityName(plant.genus);
  const native = nativeRegions(plant);
  const sentences: string[] = [];

  if (locale === "fr") {
    if (family !== "—" && genus !== "—") {
      sentences.push(
        `${name} appartient à la famille des ${family}, dans le genre ${genus}.`,
      );
    } else if (family !== "—") {
      sentences.push(`${name} appartient à la famille des ${family}.`);
    }
    if (plant.author && plant.year) {
      sentences.push(
        `Cette espèce a été décrite pour la première fois par ${plant.author} en ${plant.year}.`,
      );
    }
    if (native) {
      sentences.push(`On la trouve naturellement dans cette région : ${native}.`);
    }
    if (sentences.length === 0) {
      sentences.push(
        `${name}${scientific ? ` (${scientific})` : ""} fait partie des espèces documentées de la base botanique ouverte.`,
      );
    }
    return sentences.join(" ");
  }

  if (family !== "—" && genus !== "—") {
    sentences.push(
      `${name} belongs to the ${family} family, in the genus ${genus}.`,
    );
  } else if (family !== "—") {
    sentences.push(`${name} belongs to the ${family} family.`);
  }
  if (plant.author && plant.year) {
    sentences.push(
      `This species was first described by ${plant.author} in ${plant.year}.`,
    );
  }
  if (native) {
    sentences.push(`It is naturally found across ${native}.`);
  }
  if (sentences.length === 0) {
    sentences.push(
      `${name}${scientific ? ` (${scientific})` : ""} is part of the documented species in the open botanical database.`,
    );
  }
  return sentences.join(" ");
}
