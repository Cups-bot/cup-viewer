# 3D Cup Viewer

A lightweight, configuration-driven 3D model viewer built with
[Three.js](https://threejs.org/). Drop in a `.glb`/`.gltf` model, swap its
texture with a click or a drag, and view it with orbit controls, auto-rotation,
wireframe mode, screenshots and fullscreen.

No build step and no dependencies to install — it runs as plain ES modules
straight from the browser, loading Three.js from a CDN via an
[import map](https://developer.mozilla.org/docs/Web/HTML/Element/script/type/importmap).

![Screenshot of the viewer showing a red cup](docs/preview.png)

---

## Quick start

Because the app uses ES modules and loads local assets, it must be served over
HTTP (opening `index.html` from the file system will not work).

```bash
# From the project root, use any static server, e.g.:
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static host works (GitHub Pages, Netlify, `npx serve`, etc.).

---

## Project structure

```
.
├── index.html              # Markup only — no inline CSS or JS
├── css/
│   ├── style.css           # Base styles + design tokens (CSS variables)
│   └── responsive.css      # Small-screen / orientation adjustments
├── js/
│   ├── main.js             # Entry point; exposes the public API
│   ├── config.js           # ⭐ Single source of truth for all settings
│   ├── Viewer.js           # Orchestrator: composes everything, owns the loop
│   ├── core/
│   │   ├── scene.js        # createScene()
│   │   ├── camera.js       # createCamera()
│   │   ├── renderer.js     # createRenderer() — color pipeline & shadows
│   │   ├── lighting.js     # createLighting() — data-driven light rig
│   │   └── controls.js     # createControls() — OrbitControls
│   ├── loaders/
│   │   ├── ModelLoader.js  # Loads, centers, scales & frames models
│   │   └── TextureManager.js # Swaps textures in place, manages disposal
│   ├── ui/
│   │   └── UIManager.js    # All DOM: buttons, shortcuts, toasts, drag & drop
│   └── utils/
│       └── helpers.js      # Pure helpers: disposal, measuring, camera framing
├── assets/
│   ├── models/8cups.glb
│   └── textures/mockup.jpg
└── README.md
```

### Why this layout?

- **Separation of concerns** — markup, styling and logic never mix. Each module
  has a single responsibility (`SceneManager`, loaders, UI…).
- **`core/` factories vs `loaders/`/`ui/` classes** — stateless creation is
  expressed as small factory functions; anything that owns state and a lifecycle
  (models, textures, DOM) is a class.
- **`Viewer` as the only integrator** — it is the single place that knows about
  all the pieces, so the individual modules stay decoupled and testable.

---

## Configuration

Almost everything is tunable from **`js/config.js`** without touching logic:
model & texture paths, light intensities & shadows, background colors, camera
FOV/position, OrbitControls (zoom limits, damping, auto-rotate speed), tone
mapping exposure, pixel-ratio clamp, and model normalisation.

```js
export const CONFIG = Object.freeze({
  assets: { model: 'assets/models/8cups.glb', texture: 'assets/textures/mockup.jpg' },
  camera: { fov: 45, position: { x: 5, y: 3, z: 8 }, /* … */ },
  controls: { minDistance: 1, maxDistance: 20, autoRotate: true, /* … */ },
  // …lighting, backgrounds, renderer, model normalisation
});
```

---

## Replacing the model

**Permanently** — edit one line in `js/config.js`:

```js
assets: { model: 'assets/models/my-model.glb', /* … */ }
```

**At runtime** — one line from the console or your own code:

```js
loadModel('assets/models/my-model.glb');
```

…or simply **drag & drop** a `.glb`/`.gltf` file onto the page.

The loader automatically centers the model, scales it to a consistent size,
computes its bounding box, enables shadows, discovers texturable materials and
re-frames the camera — no manual adjustment required.

## Replacing the texture

**Permanently** — edit `assets.texture` in `js/config.js`.

**At runtime** — one line:

```js
replaceTexture('assets/textures/mockup.jpg');
```

…or use the **Replace Texture** button, or **drag & drop** an image onto the
page. Textures are swapped in place (no model reload) and the previous ones are
disposed to avoid GPU memory leaks.

---

## Controls

| Action            | Button | Key |
| ----------------- | :----: | :-: |
| Reset camera      |   🔄   |  R  |
| Change background |   🎨   |  B  |
| Toggle wireframe  |   🔲   |  W  |
| Toggle auto-rotate|   💫   |  A  |
| Screenshot (PNG)  |   📸   |  S  |
| Fullscreen        |   ⛶   |  F  |
| Replace texture   |  🖼️   |  —  |

Orbit with the left mouse button, zoom with the wheel, pan with the right
button. Touch gestures are supported on mobile.

---

## Rendering & performance notes

- **Color pipeline:** sRGB output color space, ACES Filmic tone mapping,
  linear-space lighting, and sRGB textures — physically correct, no washed-out
  colors.
- **Pixel ratio** is clamped (default `2`) to avoid oversized framebuffers on
  hi-DPI displays.
- **Soft shadows** via `PCFSoftShadowMap`, configurable shadow-map resolution
  and bias.
- **Memory safety:** geometries, materials and textures are disposed when a
  model or texture is swapped; the `TextureManager` only disposes textures it
  created, never the model's originals.
- **Resize** is handled by a `ResizeObserver` on the container (not just the
  window), so it reacts to layout changes too.
- **WebGL context loss** is caught and the render loop is restarted on restore.
- **Draco-compressed** meshes are supported (decoder fetched lazily, only if a
  model needs it).

---

## Extending

The decoupled structure makes common extensions straightforward:

- **Add a control** — add a button in `index.html`, wire it in `UIManager.bind`,
  and implement the action on `Viewer`.
- **Add post-processing** — introduce an `EffectComposer` in `Viewer` and render
  it instead of `renderer.render` in the loop.
- **Add an environment map / HDR** — extend `core/lighting.js` (or a new
  `core/environment.js`) and set `scene.environment`.
- **Multiple models** — `ModelLoader` already owns a single model with clean
  disposal; generalise it to a keyed collection.

---

## Tech

- Three.js `0.160.0` (loaded via import map from a CDN)
- Vanilla ES modules — no bundler, no framework, no install step
