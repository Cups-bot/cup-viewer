// Намерения человека → проверка прав режима → ViewerState или движок.
// Здесь только общее для обеих оболочек; выбор модели, материала и загрузка
// макета живут в design-входе (js/design/) и в клиентский бандл не попадают.

export function createActions({ state, mode, catalog, viewer }) {
  const backgrounds = () => catalog.backgrounds.filter((background) => mode.canUseBackground(background));

  return {
    setTab(tab) {
      if (tab === 'scene' && !mode.check('openScene')) return;
      if (tab === 'unwrap' && !mode.check('openUnwrap')) return;
      // Сцена открывается той, что выбрана; выбора ещё не было — первой.
      const patch = { tab };
      if (tab === 'scene' && !state.get().sceneId) patch.sceneId = catalog.scenes[0]?.id ?? null;
      state.set(patch);
    },

    selectScene(sceneId) {
      if (!mode.check('openScene')) return;
      state.set({ sceneId, tab: 'scene' });
    },

    selectBackground(backgroundId) {
      state.set({ backgroundId });
    },

    cycleBackground() {
      const list = backgrounds();
      if (list.length === 0) return;
      const index = list.findIndex((background) => background.id === state.get().backgroundId);
      state.set({ backgroundId: list[(index + 1) % list.length].id });
    },

    toggleAutoRotate() {
      if (!mode.check('autoRotate')) return;
      state.set({ autoRotate: !state.get().autoRotate });
    },

    toggleFullscreen() {
      if (!mode.check('fullscreen')) return;
      state.set({ fullscreen: !state.get().fullscreen });
    },

    resetView() {
      if (!mode.check('camera')) return;
      viewer.resetView();
      state.set({ view: 'front' });
    },

    // Пресет камеры (§12). Автоповорот выключается: иначе вид уедет, едва
    // камера доберётся до пресета.
    setView(view) {
      if (!mode.check('camera')) return;
      if (viewer.setView(view)) state.set({ view, autoRotate: false });
    },

    // Развёртка — PNG в полном разрешении того растра, что в развёртке.
    // Имя — из модели, а не из исходного файла: его клиенту не показываем.
    async downloadUnwrap(view) {
      if (!mode.canExport('unwrap')) {
        mode.check('export', 'скачать развёртку');
        return;
      }
      const image = view?.image;
      if (!image) return;
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth ?? image.width;
      canvas.height = image.naturalHeight ?? image.height;
      canvas.getContext('2d').drawImage(image, 0, 0);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      canvas.width = 0;
      if (!blob) {
        viewer.hooks.onToast?.('Не удалось сохранить файл. Попробуйте ещё раз.', 'error');
        return;
      }
      // Клиенту — без номенклатуры (§25, §59), как и в остальном экспорте.
      const base = mode.mode === 'client' ? 'cup' : (state.get().modelId ?? 'cup');
      const name = `${base}_unwrap.png`;
      await viewer.deliverFile(blob, name, 'image/png');
    },

    screenshot() {
      if (mode.check('export', 'снимок')) viewer.takeScreenshot();
    },

    exportTurn(options) {
      if (mode.canExport('turn')) viewer.exportTurn(options);
      else mode.check('export', 'запись оборота');
    },
  };
}
