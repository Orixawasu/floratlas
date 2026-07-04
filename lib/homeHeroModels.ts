export type HomeHeroVariant = {
  id: string;
  modelUrl: string;
  /** Nom du mesh dans le GLB ; si absent, toute la scène est clonée. */
  meshName?: string;
  withGrass: boolean;
  targetHeight: number;
  plantId: number;
  camera: {
    position: [number, number, number];
    target: [number, number, number];
  };
};

/** Variantes hero accueil — fleurs sauvages, orchidée en pot, sapin. */
export const HOME_HERO_VARIANTS: HomeHeroVariant[] = [
  {
    id: "viola",
    modelUrl: "/models/flowers.glb",
    meshName: "Flower_1",
    withGrass: true,
    targetHeight: 0.52,
    plantId: 111620,
    camera: { position: [0.55, 0.42, 1.15], target: [0, 0.22, 0] },
  },
  {
    id: "campanula",
    modelUrl: "/models/flowers.glb",
    meshName: "Flower_2_Clump",
    withGrass: true,
    targetHeight: 0.52,
    plantId: 220457,
    camera: { position: [0.55, 0.42, 1.15], target: [0, 0.22, 0] },
  },
  {
    id: "daisy",
    modelUrl: "/models/flowers.glb",
    meshName: "Flower_3_Clump",
    withGrass: true,
    targetHeight: 0.52,
    plantId: 17792,
    camera: { position: [0.55, 0.42, 1.15], target: [0, 0.22, 0] },
  },
  {
    id: "orchid",
    modelUrl: "/models/orchid.glb",
    withGrass: false,
    targetHeight: 0.62,
    plantId: 71320,
    camera: { position: [0.5, 0.38, 1.05], target: [0, 0.28, 0] },
  },
  {
    id: "pine",
    modelUrl: "/models/pine-tree.glb",
    withGrass: true,
    targetHeight: 0.78,
    plantId: 127300,
    camera: { position: [0.65, 0.55, 1.35], target: [0, 0.35, 0] },
  },
];

export function pickRandomHeroVariant(): HomeHeroVariant {
  const index = Math.floor(Math.random() * HOME_HERO_VARIANTS.length);
  return HOME_HERO_VARIANTS[index]!;
}
