import * as THREE from 'three';

/**
 * Build the lighting rig and add it to the scene.
 *
 * The HDRI installed by `environment.js` does the actual lighting; the
 * directional lights here exist mostly so the model casts a defined shadow
 * onto the invisible ground plane (an environment map alone casts none).
 * That is why there is no ambient light — it would only wash out the
 * image-based lighting.
 *
 * Returns the created group so callers can dispose or tweak it later.
 * @param {THREE.Scene} scene
 * @param {import('../config.js').CONFIG} config
 * @returns {THREE.Group}
 */
export function createLighting(scene, config) {
  const { directional, shadow } = config.lighting;
  const rig = new THREE.Group();
  rig.name = 'LightingRig';

  for (const spec of directional) {
    const light = new THREE.DirectionalLight(spec.color, spec.intensity);
    light.position.set(spec.position.x, spec.position.y, spec.position.z);

    if (spec.castShadow && config.renderer.shadows) {
      light.castShadow = true;
      light.shadow.mapSize.set(shadow.mapSize, shadow.mapSize);

      // Fit the shadow camera tightly around the model. A default frustum is
      // ~20x too large for a 0.5-unit model, which wastes almost the whole
      // shadow map and makes the contact shadow look blocky.
      const cam = light.shadow.camera;
      cam.near = shadow.near;
      cam.far = shadow.far;
      cam.left = -shadow.radius;
      cam.right = shadow.radius;
      cam.top = shadow.radius;
      cam.bottom = -shadow.radius;
      cam.updateProjectionMatrix();

      light.shadow.bias = shadow.bias;
      light.shadow.normalBias = shadow.normalBias;
    }

    rig.add(light);
  }

  scene.add(rig);
  return rig;
}
