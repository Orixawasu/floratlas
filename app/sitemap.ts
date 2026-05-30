import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { collections } from "@/lib/collections";
import { paths } from "@/lib/paths";
import { traits } from "@/lib/traits";
import { regions } from "@/lib/regions";
import { popularFamilies, slugifyFamily } from "@/lib/families";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/search",
    "/explore",
    "/collections",
    "/paths",
    "/glossary",
    "/guide",
    "/regions",
  ];

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map(
    (collection) => ({
      url: `${siteUrl}/collections/${collection.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  const pathRoutes: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${siteUrl}/paths/${path.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const traitRoutes: MetadataRoute.Sitemap = traits.map((trait) => ({
    url: `${siteUrl}/traits/${trait.key}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const familyRoutes: MetadataRoute.Sitemap = popularFamilies.map((family) => ({
    url: `${siteUrl}/families/${slugifyFamily(family)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const regionRoutes: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${siteUrl}/regions/${region.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...collectionRoutes,
    ...pathRoutes,
    ...traitRoutes,
    ...familyRoutes,
    ...regionRoutes,
  ];
}
