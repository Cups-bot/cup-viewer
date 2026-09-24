import { blankSheetUrl } from '../utils/blankSheet.js';

// Связывает ViewerState с движком: состояние меняется — сцена доводится до
// него. Обратно движок пишет в состояние только факты, которые случились
// помимо воли человека: модель не загрузилась, сцена не открылась, полный
// экран закрыли клавишей Escape.
export function bindEngine({ state, viewer, catalog, unwrap, onSceneFailed }) {
  const present = async (s) => {
    const result = await viewer.present({
      model: catalog.model(s.modelId),
      material: catalog.material(s.materialId),
      designUrl: s.design?.textureUrl ?? null,
    });
    // Сбой загрузки: сцена осталась на прежней модели — состояние тоже.
    const shownId = result.model?.id ?? null;
    if (!viewer.presenting && shownId && shownId !== state.get().modelId) state.set({ modelId: shownId });
    return result;
  };
  state.subscribe(['modelId', 'materialId', 'design'], present);

  state.subscribe(['backgroundId'], (s) => {
    const background = catalog.background(s.backgroundId);
    if (background) viewer.setBackground(background);
  });

  state.subscribe(['autoRotate'], (s) => viewer.setAutoRotate(s.autoRotate));
  state.subscribe(['fullscreen'], (s) => viewer.setFullscreen(s.fullscreen));

  // Развёртка показывает то же, что лежит на модели; макета нет — чистый лист,
  // пустая вкладка выглядела бы как не загрузившаяся страница.
  const showUnwrap = (s) => unwrap?.setSource(s.design?.unwrapUrl ?? blankSheetUrl());
  state.subscribe(['design'], showUnwrap);
  showUnwrap(state.get());

  // Фото-сцена грузится с первым открытием вкладки и дальше остаётся в памяти.
  // Вкладку могли переключить, пока сцена грузилась: тогда после загрузки
  // сразу возвращаемся в студию.
  let sceneJob = Promise.resolve();
  const syncScene = () => {
    sceneJob = sceneJob.then(async () => {
      const s = state.get();
      // Автоповорот в фоне только жрёт кадры, пока смотрят развёртку.
      viewer.setManualRotate(s.tab === 'unwrap');
      if (s.tab !== 'scene') {
        await viewer.exitPhotoScene();
        return;
      }
      const photo = await viewer.enterPhotoScene(s.sceneId);
      if (!photo) {
        onSceneFailed?.();
        return;
      }
      if (state.get().tab !== 'scene') await viewer.exitPhotoScene();
    });
    return sceneJob;
  };
  state.subscribe(['tab', 'sceneId'], syncScene);

  viewer.hooks.onFullscreen = (on) => state.set({ fullscreen: on });

  return { present: () => present(state.get()) };
}
