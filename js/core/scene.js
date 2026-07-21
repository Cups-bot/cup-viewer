import * as THREE from 'three';

/**
 * Create the root scene.
 * @param {import('../config.js').CONFIG} config
 * @returns {THREE.Scene}
 */
export function createScene(config) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(config.backgrounds[0]);
  return scene;
}
