/**
 * Central configuration for the 3D Cup Viewer.
 *
 * This is the single place to tweak the viewer's behaviour. In most cases
 * you can adapt the whole project without touching any logic — just edit
 * the values below (swap the model, change lighting, adjust the camera…).
 */
export const CONFIG = Object.freeze({
  /** Assets loaded on startup. */
  assets: {
    model: 'assets/models/8cups.glb',
    texture: 'assets/textures/mockup.jpg',
  },

  /** Renderer / color pipeline. */
  renderer: {
    antialias: true,
    /** Required so screenshots can read pixels back from the canvas. */
    preserveDrawingBuffer: true,
    alpha: true,
    /** Clamp DPR to avoid rendering huge buffers on hi-dpi screens. */
    maxPixelRatio: 2,
    toneMappingExposure: 1.2,
    shadows: true,
  },

  /** Perspective camera. */
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
    /** Initial position, also used by "Reset camera". */
    position: { x: 5, y: 3, z: 8 },
  },

  /** OrbitControls. */
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    minDistance: 1,
    maxDistance: 20,
    /** Radians. Math.PI allows orbiting fully under the model. */
    maxPolarAngle: Math.PI,
    autoRotate: true,
    autoRotateSpeed: 1.5,
    enablePan: true,
  },

  /** Lighting rig. Add/remove entries freely — the rig is data-driven. */
  lighting: {
    ambient: { color: 0xffffff, intensity: 1.5 },
    directional: [
      { color: 0xffffff, intensity: 3, position: { x: 5, y: 10, z: 5 }, castShadow: true },
      { color: 0xffffff, intensity: 1.5, position: { x: -5, y: 0, z: -5 }, castShadow: false },
    ],
    shadow: {
      mapSize: 2048,
      near: 0.5,
      far: 50,
      bias: -0.0005,
    },
  },

  /**
   * How the loaded model is normalised. The loader fits any model into a
   * predictable size and re-frames the camera automatically.
   */
  model: {
    /** Largest bounding-box dimension is scaled down to this many units. */
    targetSize: 10,
    /** Multiplier applied when framing the camera (>1 = more margin). */
    cameraFitOffset: 1.3,
  },

  /** Cycled by the "Change background" button. First entry is the default. */
  backgrounds: ['#1a1a2e', '#2d3436', '#ffffff', '#dfe6e9', '#00b894', '#6c5ce7', '#fd79a8', '#fdcb6e'],

  /** UI behaviour. */
  ui: {
    toastDuration: 2500,
    screenshotName: 'cup-viewer-screenshot.png',
  },
});
