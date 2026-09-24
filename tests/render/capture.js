// Съёмка одного кадра матрицы render:check: ?frame=<id> из tests/render/matrix.mjs.
// Результат — window.__capture = { status: 'done', png, meta } или { status: 'error', message }.
import './seed.js';
import * as THREE from 'three';
import { CONFIG } from '../../js/config.js';
import { Viewer } from '../../js/Viewer.js';
import { loadCatalog } from '../../js/catalog/catalog.js';
import { UnwrapView } from '../../js/ui/unwrap.js';
import { CANDIDATE_FRAMES, FRAMES, CANVAS } from './matrix.mjs';
import { fixtureName } from './fixtures/names.mjs';

// Кадр не должен зависеть от часов и от экрана: автоповорот выключен,
// DPR 1, круг под стаканом не показывается.
const config = {
  ...CONFIG,
  renderer: { ...CONFIG.renderer, maxPixelRatio: 1 },
  autoRotate: { ...CONFIG.autoRotate, enabled: false },
  security: { ...CONFIG.security, debugApi: 'never' },
};

// «Сверху-сбоку»: видна кромка и контактная тень у основания.
const TOP_VIEW = { elevation: 50, azimuth: 30 };

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));

function aimTopView(viewer) {
  const { camera, controls } = viewer;
  const distance = camera.position.distanceTo(controls.target);
  const el = THREE.MathUtils.degToRad(TOP_VIEW.elevation);
  const az = THREE.MathUtils.degToRad(TOP_VIEW.azimuth);
  camera.position.set(
    controls.target.x + distance * Math.cos(el) * Math.sin(az),
    controls.target.y + distance * Math.sin(el),
    controls.target.z + distance * Math.cos(el) * Math.cos(az),
  );
  camera.lookAt(controls.target);
  controls.update();
}

function glRenderer(renderer) {
  const gl = renderer.getContext();
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  return info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
}

async function captureUnwrap(url) {
  const root = document.getElementById('unwrap');
  root.hidden = false;
  const view = new UnwrapView(root);
  await new Promise((resolve) => view.setSource(url, resolve));
  await nextFrame();
  const source = root.querySelector('canvas');
  const canvas = document.createElement('canvas');
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = getComputedStyle(root).backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, 0, 0);
  return canvas.toDataURL('image/png');
}

async function capture() {
  const id = new URLSearchParams(location.search).get('frame');
  const frame = [...FRAMES, ...CANDIDATE_FRAMES].find((entry) => entry.id === id);
  if (!frame) throw new Error(`нет кадра «${id}»`);

  const stage = document.getElementById('stage');
  const [stageWidth, stageHeight] = frame.container ?? [CANVAS.width, CANVAS.height];
  stage.style.width = `${stageWidth}px`;
  stage.style.height = `${stageHeight}px`;

  const fixture = `tests/render/fixtures/${fixtureName(frame.model, frame.fixture)}`;
  const container = document.getElementById('canvas-container');
  const catalog = await loadCatalog();
  const viewer = new Viewer(container, config, { catalog });
  const meta = { renderer: glRenderer(viewer.renderer), three: THREE.REVISION, userAgent: navigator.userAgent };

  if (frame.view === 'unwrap') {
    container.hidden = true;
    return { png: await captureUnwrap(fixture), meta };
  }

  await viewer.startEnvironment();
  await viewer.present({
    model: catalog.model(frame.model),
    material: catalog.material(frame.material),
    designUrl: fixture,
  });

  if (frame.view === 'top') aimTopView(viewer);
  if (frame.view === 'scene') await viewer.enterPhotoScene(frame.scene);

  await viewer.whenReady();
  for (let i = 0; i < 3; i++) {
    viewer.invalidateModel();
    await nextFrame();
  }
  if (frame.view === 'export') {
    const still = viewer.renderStill({ width: CANVAS.width, height: CANVAS.height });
    return { png: still.toDataURL('image/png'), meta };
  }
  return { png: viewer.renderer.domElement.toDataURL('image/png'), meta };
}

capture().then(
  (result) => {
    window.__capture = { status: 'done', ...result };
  },
  (error) => {
    console.error(error);
    window.__capture = { status: 'error', message: String(error?.stack ?? error) };
  },
);
