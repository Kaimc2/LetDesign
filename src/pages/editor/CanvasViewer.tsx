import { FC, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Props {
  frontCanvas: HTMLCanvasElement | null;
  backCanvas: HTMLCanvasElement | null;
}

const CanvasViewer: FC<Props> = ({ frontCanvas, backCanvas }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !frontCanvas || !backCanvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    camera.position.set(0, 0, 0.6);
    controls.update();

    // Add a light source
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 5).normalize();
    light.position.setScalar(10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    scene.background = new THREE.Color(0xffffff);

    const frontTexture = new THREE.CanvasTexture(frontCanvas);
    frontTexture.flipY = false;
    frontTexture.wrapS = THREE.RepeatWrapping;
    frontTexture.wrapT = THREE.RepeatWrapping;
    frontTexture.repeat.set(0.58, 0.58);
    frontTexture.offset.x = 0.215;
    frontTexture.offset.y = 0.162;
    frontTexture.needsUpdate = true;

    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.flipY = false;
    backTexture.wrapS = THREE.RepeatWrapping;
    backTexture.wrapT = THREE.RepeatWrapping;
    backTexture.repeat.set(0.56, 0.56);
    backTexture.offset.x = 0.225;
    backTexture.offset.y = 0.172;
    backTexture.needsUpdate = true;

    // Load the shirt model
    const loader = new GLTFLoader();
    loader.load(
      "/t_shirt_mod.glb",
      (gltf) => {
        // Ensure this path is correct
        const shirt = gltf.scene;

        // Compute bounding box to center and scale model
        const box = new THREE.Box3().setFromObject(shirt);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        // Center the model
        shirt.position.sub(center);

        // Apply texture to the model
        shirt.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            if (mesh.name === "Object_10") {
              // Check if the mesh material is an array
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((material) => {
                  if (material instanceof THREE.MeshStandardMaterial) {
                    material.map = frontTexture;
                    material.needsUpdate = true;
                  }
                });
              } else {
                if (mesh.material instanceof THREE.MeshStandardMaterial) {
                  mesh.material.map = frontTexture;
                  mesh.material.needsUpdate = true;
                }
              }
            } else if (mesh.name === "Object_14") {
              // Check if the mesh material is an array
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((material) => {
                  if (material instanceof THREE.MeshStandardMaterial) {
                    material.map = backTexture;
                    material.needsUpdate = true;
                  }
                });
              } else {
                if (mesh.material instanceof THREE.MeshStandardMaterial) {
                  mesh.material.map = backTexture;
                  mesh.material.needsUpdate = true;
                }
              }
            }
          }
        });

        scene.add(shirt);
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF:", error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      frontTexture.dispose();
      backTexture.dispose();
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              material.dispose();
            });
          } else {
            child.material.dispose();
          }
          child.geometry.dispose();
        }
      });
      scene.clear();
    };
  }, [backCanvas, frontCanvas]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default CanvasViewer;
