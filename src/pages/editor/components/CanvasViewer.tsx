import { FC, useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  frontCanvas: HTMLCanvasElement | null;
  backCanvas: HTMLCanvasElement | null;
}

const ShirtModel: FC<Props> = ({ frontCanvas, backCanvas }) => {
  const { scene } = useThree();

  const frontTexture = useMemo(() => {
    if (!frontCanvas) return null;
    const texture = new THREE.CanvasTexture(frontCanvas);
    texture.flipY = false;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }, [frontCanvas]);

  const backTexture = useMemo(() => {
    if (!backCanvas) return null;
    const texture = new THREE.CanvasTexture(backCanvas);
    texture.flipY = false;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }, [backCanvas]);

  const { scene: shirt } = useGLTF("/t_shirt_mod.glb");

  useEffect(() => {
    if (!frontTexture || !backTexture) return;

    shirt.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (
          mesh.name === "Object_10" &&
          mesh.material instanceof THREE.MeshStandardMaterial
        ) {
          mesh.material.map = frontTexture;
          mesh.material.needsUpdate = true;
        } else if (
          mesh.name === "Object_14" &&
          mesh.material instanceof THREE.MeshStandardMaterial
        ) {
          mesh.material.map = backTexture;
          mesh.material.needsUpdate = true;
        }
      }
    });

    const box = new THREE.Box3().setFromObject(shirt);
    const center = new THREE.Vector3();
    box.getCenter(center);
    shirt.position.sub(center);

    scene.add(shirt);

    return () => {
      scene.remove(shirt);
    };
  }, [shirt, frontTexture, backTexture, scene]);

  return null;
};

const CanvasViewer: FC<Props> = ({ frontCanvas, backCanvas }) => {
  return (
    <Canvas camera={{ position: [0, 0, 0.6], fov: 75 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 5]} intensity={1} />
      <ShirtModel frontCanvas={frontCanvas} backCanvas={backCanvas} />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.25}
        enableZoom={true}
      />
    </Canvas>
  );
};

export default CanvasViewer;
