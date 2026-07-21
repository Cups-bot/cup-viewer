import * as THREE from 'three';

// Корневая сцена.
export function createScene(config) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(config.backgrounds[0]);
  return scene;
}
