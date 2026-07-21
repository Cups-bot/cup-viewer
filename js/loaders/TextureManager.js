import * as THREE from 'three';

/**
 * Manages the base-color texture applied to the current model.
 *
 * Replaces textures in place (no model reload), automatically targets the
 * meshes the {@link ModelLoader} flagged as texturable, and disposes the
 * previous textures it created to avoid GPU memory leaks.
 */
export class TextureManager {
  /**
   * @param {object} deps
   * @param {import('./ModelLoader.js').ModelLoader} deps.modelLoader
   * @param {import('../config.js').CONFIG} deps.config
   */
  constructor({ modelLoader, config }) {
    this.modelLoader = modelLoader;
    this.config = config;
    this.loader = new THREE.TextureLoader();
    /** Textures created by this manager, tracked for disposal. */
    this.ownedTextures = new Set();
  }

  /**
   * Load a texture from any URL (http path, blob: or data: URI).
   * @param {string} url
   * @returns {Promise<THREE.Texture>}
   */
  loadTexture(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (texture) => resolve(this.#configure(texture)),
        undefined,
        () => reject(new Error(`Failed to load texture "${url}"`)),
      );
    });
  }

  /**
   * Load a texture from a user-selected `File` (input or drag & drop).
   * A blob URL is used and revoked once decoded — cheaper than base64.
   * @param {File} file
   * @returns {Promise<THREE.Texture>}
   */
  async loadFromFile(file) {
    if (!file.type.startsWith('image/')) {
      throw new Error(`"${file.name}" is not an image file`);
    }
    const url = URL.createObjectURL(file);
    try {
      return await this.loadTexture(url);
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  /**
   * Apply a texture as the base-color map of every texturable mesh.
   * @param {THREE.Texture} texture
   * @returns {number} Number of materials updated.
   */
  applyTexture(texture) {
    const meshes = this.modelLoader.texturableMeshes;
    if (meshes.length === 0) return 0;

    let updated = 0;
    for (const mesh of meshes) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) {
        if (!material.map) continue;
        this.#disposeOwned(material.map);
        material.map = texture;
        material.needsUpdate = true;
        updated++;
      }
    }
    return updated;
  }

  /**
   * Convenience: load a texture from a URL and apply it in one call.
   * @param {string} url
   * @returns {Promise<number>} Number of materials updated.
   */
  async replaceTexture(url) {
    return this.applyTexture(await this.loadTexture(url));
  }

  /** Apply color-space and wrapping settings shared by all textures. */
  #configure(texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // glTF UVs are authored with the WebGL convention; don't flip.
    texture.flipY = false;
    texture.anisotropy = 8;
    this.ownedTextures.add(texture);
    return texture;
  }

  /** Dispose a texture only if this manager created it (never the model's own). */
  #disposeOwned(texture) {
    if (this.ownedTextures.has(texture)) {
      texture.dispose();
      this.ownedTextures.delete(texture);
    }
  }

  /** Release every texture this manager owns. */
  dispose() {
    for (const texture of this.ownedTextures) texture.dispose();
    this.ownedTextures.clear();
  }
}
