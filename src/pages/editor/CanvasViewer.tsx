import { FC, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const CanvasViewer: FC<{ canvas: HTMLCanvasElement | null }> = ({ canvas }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !canvas) return;

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

    camera.position.set(0, 0, 1);
    controls.update();

    // Add a light source
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);
    scene.background = new THREE.Color(0xffffff);

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);

    // const geometry = new THREE.BoxGeometry(10, 7, 1);
    // const material = new THREE.MeshBasicMaterial({ map: texture });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // Load the shirt model
    const loader = new GLTFLoader();
    loader.load(
      "/t_shirt.glb",
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
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((material) => {
                if ("map" in material) {
                  (material as THREE.MeshStandardMaterial).map = texture;
                  material.needsUpdate = true;
                }
              });
            } else {
              if ("map" in mesh.material) {
                (mesh.material as THREE.MeshStandardMaterial).color =
                  new THREE.Color(0xff0000);
                // (mesh.material as THREE.MeshStandardMaterial).map = texture;
                mesh.material.needsUpdate = true;
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
    };
  }, [canvas]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default CanvasViewer;
