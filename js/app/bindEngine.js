import { blankSheetUrl } from '../utils/blankSheet.js';

// Связывает ViewerState с движком: состояние меняется — сцена доводится до
// него. Обратно движок пишет в состояние только факты, которые случились
// помимо воли человека: модель не загрузилась, сцена не открылась, полный
// экран закрыли клавишей Escape.
export function bindEngine({ state, viewer, catalog, unwrap, onSceneFailed }) {
  // Ключ второго стакана, который последним отдали движку (null — второго нет).
  let secondKey = null;
  // Второй стакан не загрузился — движок снял желание (photoSecond = null);
  // состояние следует за ним, как за главным в present, иначе кнопка второго
  // показывала бы стакан, которого нет ни в кадре, ни в задании рендера.
  // Смотрим только на стакан, который действительно отдавали движку: до
  // первого setPhotoSecond у движка второго ещё нет, и это не сбой.
  const dropFailedSecond = () => {
    const photo = state.get().photo;
    if (secondKey === null || viewer.photoSecond || !photo?.second) return;
    secondKey = null;
    state.set({ photo: { ...photo, second: null } });
  };

  // Углы стаканов фото-сцены: заданные явно (сцена из «Моих рендеров») —
  // как заданы; иначе лицом к камере. Автоповорота в сцене нет: угол уходит
  // в задание рендера, и стакан не должен стоять к камере случайной стороной.
  const placeAngles = () => {
    const angles = state.get().photo?.angles;
    if (angles) angles.forEach((angle, index) => viewer.rotateCupTo(index, angle));
    else viewer.facePhotoCups();
  };

  let shownModelId = null;
  const present = async (s) => {
    const result = await viewer.present({
      model: catalog.model(s.modelId),
      material: catalog.material(s.materialId),
      designUrl: s.design?.textureUrl ?? null,
    });
    // Сбой загрузки: сцена осталась на прежней модели — состояние тоже.
    const shownId = result.model?.id ?? null;
    if (!viewer.presenting && shownId && shownId !== state.get().modelId) state.set({ modelId: shownId });
    dropFailedSecond();
    // Другой стакан в сцене — тоже лицом к камере (новая модель встаёт с нулём).
    if (viewer.photo && shownId && shownId !== shownModelId) placeAngles();
    shownModelId = shownId;
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
  //
  // Сцена и второй стакан идут одной цепочкой. Сбой шага ловится в нём самом:
  // отклонённое звено пропустило бы все следующие, и «Фотореал» замер бы до
  // перезагрузки — ни второго стакана, ни ракурса, ни формата.
  let sceneJob = Promise.resolve();
  const enqueue = (step) => {
    sceneJob = sceneJob.then(step).catch((error) => console.error('Фото-сцена:', error));
    return sceneJob;
  };
  const syncScene = () =>
    enqueue(async () => {
      const s = state.get();
      // Автоповорот в фоне только жрёт кадры, пока смотрят развёртку.
      viewer.setManualRotate(s.tab === 'unwrap');
      if (s.tab !== 'scene') {
        await viewer.exitPhotoScene();
        return;
      }
      const photo = await viewer.enterPhotoScene(s.sceneId, { preset: s.photo?.preset, frame: s.photo?.frame });
      if (!photo) {
        onSceneFailed?.();
        return;
      }
      dropFailedSecond();
      if (state.get().tab !== 'scene') {
        await viewer.exitPhotoScene();
        return;
      }
      placeAngles();
    });
  state.subscribe(['tab', 'sceneId'], syncScene);

  // Ракурс, формат и второй стакан фото-сцены. Второй стакан — в материале
  // главного, если он ему подходит; иначе в своём материале по умолчанию.
  const syncPhoto = () =>
    enqueue(async () => {
      const s = state.get();
      const p = s.photo ?? {};
      const model = p.second ? catalog.model(p.second.modelId) : null;
      const materialId = model && model.materialCompatibility.includes(s.materialId) ? s.materialId : model?.defaultMaterial;
      // Свой макет второго (design2); без него у пары — макет главного.
      const designUrl = s.design2?.textureUrl ?? null;
      const key = model ? `${model.id}|${materialId}|${p.second.kind}|${designUrl ?? ''}` : null;
      if (key !== secondKey) {
        secondKey = key;
        await viewer.setPhotoSecond(model
          ? { model, material: catalog.material(materialId), kind: p.second.kind, designUrl }
          : null);
        dropFailedSecond();
      }
      if (!viewer.photo) return;
      const q = state.get().photo ?? {};
      const turned = Boolean(q.preset && viewer.photo.preset.id !== q.preset);
      if (turned) await viewer.setPhotoPreset(q.preset);
      if (q.frame && viewer.photo.frameId !== q.frame) viewer.setPhotoFrame(q.frame);
      // Камера встала в другую точку — стаканы снова лицом к ней.
      if (turned || q.angles) placeAngles();
    });
  state.subscribe(['photo', 'materialId', 'design2'], syncPhoto);

  viewer.hooks.onFullscreen = (on) => state.set({ fullscreen: on });

  return { present: () => present(state.get()) };
}
