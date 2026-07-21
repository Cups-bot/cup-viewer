import * as THREE from 'three';

/**
 * Create the shadow catcher: a plane that is itself invisible but still
 * receives shadows.
 *
 * {@link THREE.ShadowMaterial} is the whole trick — it writes nothing but the
 * shadow term, so the plane shows the cup's contact shadow while the
 * background colour reads straight through everywhere else.
 *
 * @param {import('../config.js').CONFIG} config
 * @returns {THREE.Mesh}
 */
export function createGround(config) {
  const { size, opacity } = config.ground;

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.ShadowMaterial({ opacity, transparent: true }),
  );

  ground.name = 'ShadowCatcher';
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  // Never let the invisible plane block clicks or show up in a raycast.
  ground.castShadow = false;
  ground.renderOrder = -1;

  return ground;
}
