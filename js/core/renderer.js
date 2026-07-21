import * as THREE from 'three';

/**
 * Create a WebGL renderer configured with a modern, physically-based color
 * pipeline: sRGB output, ACES Filmic tone mapping and clamped pixel ratio.
 * @param {import('../config.js').CONFIG} config
 * @returns {THREE.WebGLRenderer}
 */
export function createRenderer(config) {
  const { antialias, preserveDrawingBuffer, alpha, maxPixelRatio, toneMappingExposure, shadows } =
    config.renderer;

  const renderer = new THREE.WebGLRenderer({
    antialias,
    preserveDrawingBuffer,
    alpha,
    // Ask for the discrete GPU on dual-graphics laptops.
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));

  // Correct color management: textures are authored in sRGB, lighting is
  // computed in linear space and the final image is tone-mapped back to sRGB.
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = toneMappingExposure;

  if (shadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  return renderer;
}
