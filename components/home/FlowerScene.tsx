"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import {
  Box3,
  BufferGeometry,
  Color,
  DoubleSide,
  Euler,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from "three";
import { mergeBufferGeometries } from "three-stdlib";
import type { HomeHeroVariant } from "@/lib/homeHeroModels";
import { HOME_HERO_VARIANTS } from "@/lib/homeHeroModels";

const GRASS_URL = "/models/grass-green.glb";

type FlowerSceneProps = {
  variant: HomeHeroVariant;
  onPlantSelect?: () => void;
  reducedMotion?: boolean;
};

function centerAndScale(object: Group, targetHeight: number) {
  const box = new Box3().setFromObject(object);
  const size = new Vector3();
  box.getSize(size);
  const s = targetHeight / (size.y || 1);
  object.scale.setScalar(s);
  box.setFromObject(object);
  const center = new Vector3();
  box.getCenter(center);
  object.position.set(-center.x, -box.min.y, -center.z);
}

function HeroPlant({
  variant,
  onSelect,
}: {
  variant: HomeHeroVariant;
  onSelect?: () => void;
}) {
  const { scene } = useGLTF(variant.modelUrl);

  const model = useMemo(() => {
    scene.updateWorldMatrix(true, true);
    const g = new Group();

    if (variant.meshName) {
      const src = scene.getObjectByName(variant.meshName) as Mesh | undefined;
      if (src?.isMesh) {
        const clone = src.clone();
        clone.material = (src.material as MeshStandardMaterial).clone();
        g.add(clone);
      }
    }

    if (g.children.length === 0) {
      g.add(scene.clone(true));
    }

    centerAndScale(g, variant.targetHeight);
    return g;
  }, [scene, variant.meshName, variant.targetHeight]);

  return (
    <group
      position={[0, 0, 0]}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <primitive object={model} />
    </group>
  );
}

function hash01(index: number, salt: number) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function GrassTufts({ radius = 0.22, count = 18 }: { radius?: number; count?: number }) {
  const meshRef = useRef<InstancedMesh>(null);
  const { scene } = useGLTF(GRASS_URL);

  const { geometry, material } = useMemo(() => {
    const geoms: BufferGeometry[] = [];
    let mat: MeshStandardMaterial | null = null;
    scene.updateWorldMatrix(true, true);
    scene.traverse((o) => {
      const m = o as Mesh;
      if (!m.isMesh) return;
      const g = m.geometry.clone();
      g.applyMatrix4(m.matrixWorld);
      geoms.push(g);
      if (!mat) mat = m.material as MeshStandardMaterial;
    });
    const merged =
      geoms.length === 1 ? geoms[0] : mergeBufferGeometries(geoms, true) ?? geoms[0];
    merged.computeBoundingBox();
    const bb = merged.boundingBox as Box3;
    const size = new Vector3();
    bb.getSize(size);
    const h = 0.14;
    const s = h / (size.y || 1);
    merged.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2);
    merged.scale(s, s, s);
    merged.computeVertexNormals();

    const grassMat = (mat ?? new MeshStandardMaterial({ color: "#6a9858" })).clone();
    grassMat.side = DoubleSide;
    grassMat.roughness = 1;
    grassMat.flatShading = true;
    grassMat.color = new Color("#7a9a60");

    return { geometry: merged, material: grassMat };
  }, [scene]);

  const matrices = useMemo(() => {
    const dummy = new Matrix4();
    const pos = new Vector3();
    const quat = new Quaternion();
    const euler = new Euler();
    const scl = new Vector3();
    const out: Matrix4[] = [];

    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + 0.3;
      const r = radius + (i % 3) * 0.06;
      pos.set(Math.cos(a) * r, 0, Math.sin(a) * r * 0.85);
      euler.set(0, a + Math.PI, (hash01(i, 1) - 0.5) * 0.2);
      quat.setFromEuler(euler);
      const t = 0.85 + hash01(i, 2) * 0.35;
      scl.set(t, t * (0.9 + hash01(i, 3) * 0.2), t);
      dummy.compose(pos, quat, scl);
      out.push(dummy.clone());
    }
    return out;
  }, [count, radius]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh || mesh.userData.ready) return;
    for (let i = 0; i < matrices.length; i++) mesh.setMatrixAt(i, matrices[i]);
    mesh.instanceMatrix.needsUpdate = true;
    mesh.userData.ready = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, matrices.length]}
      frustumCulled
    />
  );
}

function SceneContents({ variant, onPlantSelect, reducedMotion }: FlowerSceneProps) {
  const grassRadius = variant.id === "pine" ? 0.3 : 0.22;
  const grassCount = variant.id === "pine" ? 22 : 18;

  return (
    <>
      <ambientLight intensity={0.72} color="#f8fff4" />
      <hemisphereLight color="#dff0ff" groundColor="#6a8860" intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={0.95} color="#fff8e8" />
      <directionalLight position={[-2, 3, -2]} intensity={0.28} color="#c8d8f0" />

      <Suspense fallback={null}>
        <HeroPlant variant={variant} onSelect={onPlantSelect} />
        {variant.withGrass && (
          <GrassTufts radius={grassRadius} count={grassCount} />
        )}
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI * 0.32}
        maxPolarAngle={Math.PI * 0.58}
        minAzimuthAngle={-0.6}
        maxAzimuthAngle={0.6}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.45}
        target={variant.camera.target}
      />
    </>
  );
}

export function FlowerScene({ variant, onPlantSelect, reducedMotion }: FlowerSceneProps) {
  return (
    <Canvas
      className="touch-none"
      dpr={[1, 1.75]}
      camera={{
        position: variant.camera.position,
        fov: 40,
        near: 0.01,
        far: 20,
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContents
        variant={variant}
        onPlantSelect={onPlantSelect}
        reducedMotion={reducedMotion}
      />
    </Canvas>
  );
}

for (const v of HOME_HERO_VARIANTS) {
  useGLTF.preload(v.modelUrl);
}
useGLTF.preload(GRASS_URL);
