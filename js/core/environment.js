import * as THREE from 'three';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

/** Pick a loader from the file extension so both .exr and .hdr just work. */
function loaderFor(url) {
  return url.toLowerCase().endsWith('.exr') ? new EXRLoader() : new RGBELoader();
}

/**
 * Load an equirectangular HDRI and install it as the scene's image-based
 * lighting source.
 *
 * The map is pre-filtered with a {@link THREE.PMREMGenerator}, which is what
 * makes rough and glossy materials converge instead of sparkling: each
 * roughness level gets its own correctly blurred mip. The result is assigned
 * to `scene.environment` only — never to `scene.background` — so the visible
 * backdrop stays a flat, controllable colour while the model is still lit by
 * the full dynamic range of the HDRI.
 *
 * Because the environment lives in world space, spinning the model leaves the
 * reflections anchored where they are; orbiting the camera moves the view
 * through them. That is exactly the difference between the two rotation modes.
 *
 * @param {THREE.Scene} scene
 * @param {THREE.WebGLRenderer} renderer
 * @param {import('../config.js').CONFIG} config
 * @param {(percent: number) => void} [onProgress] 0–100, or -1 if unknown.
 * @returns {Promise<THREE.Texture>} The pre-filtered environment map.
 */
export function loadEnvironment(scene, renderer, config, onProgress) {
  const url = config.assets.hdri;

  return new Promise((resolve, reject) => {
    loaderFor(url).load(
      url,
      (texture) => {
        // Pre-filter once, then throw away both the generator and the raw
        // equirect texture — only the small cube map is needed from here on.
        const pmrem = new THREE.PMREMGenerator(renderer);
        pmrem.compileEquirectangularShader();
        const envMap = pmrem.fromEquirectangular(texture).texture;

        texture.dispose();
        pmrem.dispose();

        scene.environment = envMap;
        if ('environmentIntensity' in scene) {
          scene.environmentIntensity = config.lighting.environmentIntensity;
        }

        resolve(envMap);
      },
      (event) => onProgress?.(event.total > 0 ? (event.loaded / event.total) * 100 : -1),
      (error) => reject(new Error(`Failed to load HDRI "${url}": ${error?.message ?? error}`)),
    );
  });
}

/**
 * Apply the environment map to every material of an object.
 *
 * Needed on three r160, where `scene.environment` is picked up automatically
 * but per-material `envMapIntensity` still has to be set explicitly to get a
 * consistent look across the model's materials.
 *
 * @param {THREE.Object3D} root
 * @param {number} intensity
 */
export function applyEnvironmentIntensity(root, intensity) {
  root.traverse((node) => {
    if (!node.isMesh || !node.material) return;
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of materials) {
      if (!('envMapIntensity' in material)) continue;
      material.envMapIntensity = intensity;
      material.needsUpdate = true;
    }
  });
}
