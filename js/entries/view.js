// Вход Client Mode (view.html?v=<token>). Режим задаётся здесь, а не
// параметром адреса. Кода выбора модели, материала и загрузки макета в этом
// бандле нет — не спрятан, а отсутствует (§37).
import { CONFIG } from '../config.js';
import { boot, whenDomReady } from '../app/boot.js';
import { SnapshotError, downloadDesign, fetchSnapshot, readToken } from '../client/snapshot.js';
import { applyBrand, createLoader, hasWebGL, initClient, showError } from '../client/clientShell.js';
import { MESSAGES } from '../ui/messages.js';
import { initTheme } from '../ui/theme.js';
import { initLottie } from '../ui/lottie.js';
import { initSegments } from '../ui/motion.js';

// Клиенту — медленный оборот: круг за 21 с (§23). Стартует после появления.
// Сцена клиента — на весь экран, поверх неё логотип и панель: стакану нужно
// больше воздуха, чем в рабочем окне сотрудника.
const CLIENT_CONFIG = Object.freeze({
  ...CONFIG,
  autoRotate: Object.freeze({ enabled: false, speed: (2 * Math.PI) / 21 }),
  model: Object.freeze({ ...CONFIG.model, cameraFitOffset: 1.95 }),
});

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function start() {
  if (!hasWebGL()) {
    showError(MESSAGES.webglUnavailable);
    return;
  }

  const token = readToken();
  let snapshot;
  try {
    snapshot = await fetchSnapshot(token);
  } catch {
    showError(MESSAGES.snapshotMissing);
    return;
  }

  const loader = createLoader();
  loader.step('model');
  let revealed = false;
  const app = await boot({
    mode: 'client',
    lock: false,
    config: CLIENT_CONFIG,
    hooks: {
      // До появления загрузку показывает экран этапов; потом — обычный значок.
      onLoading: (label, percent) => {
        if (!revealed) {
          loader.percent(percent == null || percent < 0 ? null : percent / 100);
          return;
        }
        const box = document.getElementById('loader');
        document.getElementById('loader-text').textContent =
          percent != null && percent >= 0 ? `${label} ${Math.round(percent)}%` : label;
        box.hidden = false;
      },
      onLoaded: () => {
        document.getElementById('loader').hidden = true;
      },
    },
    initialState: (catalog, mode) => {
      const s = snapshot.state;
      if (!catalog.model(s.modelId)) throw new SnapshotError('missing');
      const background = catalog.background(s.backgroundId);
      return {
        modelId: s.modelId,
        materialId: s.materialId ?? null,
        // Дизайнер мог смотреть на студийном фоне — клиенту только клиентские.
        backgroundId: mode.canUseBackground(background) ? background.id : undefined,
        sceneId: catalog.scene(s.sceneId) ? s.sceneId : (catalog.scenes[0]?.id ?? null),
        brandId: catalog.brand(s.brandId) ? s.brandId : (catalog.brands[0]?.id ?? null),
        title: s.title ?? null,
        autoRotate: false,
      };
    },
  }).catch((error) => {
    showError(error instanceof SnapshotError ? MESSAGES.snapshotMissing : MESSAGES.modelFailed);
    return null;
  });
  if (!app) return;
  const { state, mode, viewer, catalog } = app;
  applyBrand(catalog.brand(state.get().brandId), state.get().title);

  // Модель уже грузится (bindEngine) — дожидаемся её.
  await viewer.whenReady();

  // Дизайн: растры snapshot → blob-адреса, и только потом права запираются.
  loader.step('design');
  let design = null;
  try {
    design = await downloadDesign(token, snapshot, (share) => loader.percent(share));
  } catch {
    showError(MESSAGES.snapshotExpired);
    return;
  }
  if (design) state.set({ design: { ...design, width: null, height: null } });
  mode.lock();
  await viewer.present({ designUrl: design?.textureUrl ?? null });

  loader.step('material');
  await viewer.whenReady();
  for (let i = 0; i < 2; i++) {
    viewer.invalidateModel();
    await nextFrame();
  }

  // Появление (§41): холст проявляется 420 мс, камера «оседает» в вид спереди.
  const shell = initClient(app, { title: state.get().title });
  const { camera, controls } = viewer;
  const offset = camera.position.clone().sub(controls.target);
  camera.position.copy(controls.target).addScaledVector(offset, 1.1);
  camera.position.y += offset.length() * 0.06;
  viewer.setView('front');
  revealed = true;
  loader.done();
  document.body.classList.add('is-revealed');
  await wait(450);
  state.set({ autoRotate: true });
  shell.autoRotate.arm();
  shell.showOnboarding();
}

whenDomReady(() => {
  initTheme();
  initLottie();
  initSegments();
  start().catch((error) => {
    console.error('Просмотр не запустился:', error);
    showError(MESSAGES.modelFailed);
  });
});
