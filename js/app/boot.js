import { CONFIG } from '../config.js';
import { Viewer } from '../Viewer.js';
import { loadCatalog } from '../catalog/catalog.js';
import { createViewerState } from '../state/viewerState.js';
import { createModeController } from '../state/modeController.js';
import { createActions } from './actions.js';
import { bindEngine } from './bindEngine.js';
import { createFeedback } from '../ui/feedback.js';
import { initStage } from '../ui/stage.js';
import { initToolbar } from '../ui/toolbar.js';

const isLocalhost = () => ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);

function debugAllowed() {
  const setting = CONFIG.security?.debugApi ?? 'never';
  if (setting === 'always') return true;
  if (setting === 'never') return false;
  return isLocalhost();
}

// Общий старт обеих оболочек: каталог, состояние, права режима, движок и
// общий интерфейс сцены. Режим задаёт вызывающий вход (design.js).
//
// initialState(catalog) — стартовое состояние; ставится ДО lock(), поэтому
// сессия разворачивается целиком, а дальше права уже действуют.
// config — настройки движка (по умолчанию js/config.js); hooks — добавочные
// hooks движка поверх тостов и индикатора загрузки.
export async function boot({ mode: modeName, initialState, config = CONFIG, hooks: extraHooks = {} }) {
  const container = document.getElementById('canvas-container');
  if (!container) throw new Error('Нет элемента #canvas-container');

  const catalog = await loadCatalog();
  const state = createViewerState({ catalog, dev: isLocalhost() });
  const mode = createModeController(modeName);
  mode.attach(state, catalog);

  const feedback = createFeedback({ toastDuration: CONFIG.ui.toastDuration });
  const hooks = { ...feedback, ...extraHooks };
  const viewer = new Viewer(container, config, { catalog, hooks });
  const actions = createActions({ state, mode, catalog, viewer });

  const { unwrap } = initStage({ state, viewer, catalog, actions });
  initToolbar({ state, catalog, mode, actions });
  bindEngine({
    state,
    viewer,
    catalog,
    unwrap,
    onSceneFailed: () => state.set({ tab: '3d' }),
  });

  await viewer.startEnvironment();
  const firstBackground = catalog.backgrounds.find((background) => mode.canUseBackground(background));
  state.set({
    backgroundId: firstBackground?.id ?? null,
    autoRotate: config.autoRotate.enabled,
    ...(await initialState(catalog, mode)),
  });
  mode.lock();

  const app = { catalog, state, mode, viewer, actions, feedback, unwrap, config };
  if (debugAllowed()) {
    publishDebugApi(app);
    if (new URLSearchParams(window.location.search).get('debug') === 'perf') {
      import('../ui/perfOverlay.js').then(({ mountPerfOverlay }) => mountPerfOverlay(viewer));
    }
  }
  return app;
}

// Отладочный API — только там, где его разрешает config.security.debugApi.
function publishDebugApi({ catalog, state, mode, viewer }) {
  window.ViewerState = state;
  window.cupViewer = {
    viewer,
    state,
    mode,
    catalog,
    setRoughness: (roughness) => viewer.setSurfaceFinish({ roughness }),
    setMetalness: (metalness) => viewer.setSurfaceFinish({ metalness }),
    setRelief: (relief) => viewer.setSurfaceFinish({ relief }),
    setReliefScale: (reliefScale) => viewer.setSurfaceFinish({ reliefScale }),
    describeKeyLight: () => viewer.describeKeyLight(),
    // Показать только карту затенения складок: так удобно подбирать
    // quality.ambientOcclusion.radius и scale в js/config.js.
    debugAO: (on = true) => viewer.pipeline.showAmbientOcclusionOnly(on),
    setAO: (options) => {
      viewer.pipeline.setAmbientOcclusion(options);
      viewer.invalidate();
    },
    setCavity: (value) => viewer.setCavityStrength(value),
  };
}

// Сцена не поднялась — человек не должен смотреть в пустой прямоугольник без
// объяснений.
export function showStartupFailure(error) {
  console.error('Просмотрщик не запустился:', error);

  const host = document.getElementById('stage') ?? document.body;
  if (host.querySelector('.startup-error')) return;

  const box = document.createElement('div');
  box.className = 'startup-error';
  box.setAttribute('role', 'alert');

  const title = document.createElement('p');
  title.className = 'startup-error__title';
  title.textContent = 'Не удалось показать 3D-модель';

  const text = document.createElement('p');
  text.className = 'startup-error__text';
  text.textContent =
    'Проверьте вкладку «Развёртка» — макет там открывается плоско. ' +
    'Если 3D не появится и после обновления страницы, напишите разработчику.';

  box.append(title, text);
  host.appendChild(box);
}

export function whenDomReady(start) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}
