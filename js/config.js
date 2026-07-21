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
    texture: 'assets/textures/img_mokup.jpg',
    hdri: 'assets/hdri/main.hdr',
    /** Folder the control-panel icons are read from (one .svg per action). */
    icons: 'assets/icons/',
  },

  /** Renderer / color pipeline. */
  renderer: {
    antialias: true,
    /** Required so screenshots can read pixels back from the canvas. */
    preserveDrawingBuffer: true,
    alpha: true,
    /** Clamp DPR to avoid rendering huge buffers on hi-dpi screens. */
    maxPixelRatio: 2,
    toneMappingExposure: 1.0,
    shadows: true,
  },

  /** Perspective camera. */
  camera: {
    fov: 40,
    near: 0.1,
    far: 1000,
    position: { x: 0, y: 0.35, z: 1.2 },
  },

  /** OrbitControls. Auto-rotation is done on the model, not the camera. */
  controls: {
    enableDamping: true,
    dampingFactor: 0.08,
    minDistance: 0.4,
    maxDistance: 3,
    /** Radians. Math.PI allows orbiting fully under the model. */
    maxPolarAngle: Math.PI,
    enablePan: true,
  },

  /**
   * Model spin. The model itself turns while the camera and the HDRI stay
   * put, so highlights and reflections remain anchored to the environment.
   * Dragging with the mouse orbits the camera instead, which moves the
   * lighting and the model together.
   */
  autoRotate: {
    enabled: true,
    /** Radians per second. */
    speed: 0.45,
  },

  /** Image-based lighting from the HDRI, plus a key light for the shadow. */
  lighting: {
    /** Strength of the HDRI contribution on the model's materials. */
    environmentIntensity: 1.0,
    directional: [
      {
        color: 0xffffff,
        intensity: 2.2,
        position: { x: 1.5, y: 2.5, z: 1.5 },
        castShadow: true,
      },
    ],
    shadow: {
      mapSize: 4096,
      near: 0.1,
      far: 12,
      /** Half-extent of the shadow camera's frustum, in world units. */
      radius: 1.2,
      bias: -0.0002,
      normalBias: 0.008,
    },
  },

  /**
   * Invisible ground plane that only catches the model's shadow, so the cup
   * appears grounded without a visible floor.
   */
  ground: {
    enabled: true,
    size: 20,
    /** 0–1. How dark the caught shadow is drawn. */
    opacity: 0.35,
  },

  /**
   * Surface finish of the meshes the loaded texture lands on.
   *
   * 8cups.glb ships that material with `roughness: 0` — a perfect mirror,
   * which reads as glossy plastic rather than printed paper. There is no
   * roughnessMap on it, so this single scalar controls the whole finish:
   *   0.0  зеркало / глянцевый пластик
   *   0.3  лакированная поверхность
   *   0.6  матовая печать на бумаге  ← по умолчанию
   *   1.0  полностью матовая, без бликов
   *
   * Set either value to `null` to keep whatever the model was authored with.
   * Tune it live from the console with `setRoughness(0.4)`.
   */
  texturedSurface: {
    roughness: 0.2,
    metalness: 0,
  },

  /**
   * How the loaded model is normalised. The loader fits any model into a
   * predictable size and re-frames the camera automatically.
   */
  model: {
    /** Largest bounding-box dimension is scaled down to this many units. */
    targetSize: 0.5,
    /** Multiplier applied when framing the camera (>1 = more margin). */
    cameraFitOffset: 1.6,
  },

  /** Cycled by the "Change background" button. First entry is the default. */
  backgrounds: ['#ffffff', '#e8e8e8', '#9a9a9a', '#1c1c1e'],

  /** UI behaviour. */
  ui: {
    toastDuration: 2500,
    screenshotName: 'cup-viewer-screenshot.png',
  },
});
