import * as THREE from 'three';

/**
 * Build a data-driven lighting rig from the config and add it to the scene.
 * Returns the created group so callers can dispose or tweak it later.
 * @param {THREE.Scene} scene
 * @param {import('../config.js').CONFIG} config
 * @returns {THREE.Group}
 */
export function createLighting(scene, config) {
  const { ambient, directional, shadow } = config.lighting;
  const rig = new THREE.Group();
  rig.name = 'LightingRig';

  rig.add(new THREE.AmbientLight(ambient.color, ambient.intensity));

  for (const spec of directional) {
    const light = new THREE.DirectionalLight(spec.color, spec.intensity);
    light.position.set(spec.position.x, spec.position.y, spec.position.z);

    if (spec.castShadow && config.renderer.shadows) {
      light.castShadow = true;
      light.shadow.mapSize.set(shadow.mapSize, shadow.mapSize);
      light.shadow.camera.near = shadow.near;
      light.shadow.camera.far = shadow.far;
      light.shadow.bias = shadow.bias;
    }

    rig.add(light);
  }

  scene.add(rig);
  return rig;
}
