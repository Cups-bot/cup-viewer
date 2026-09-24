# Аудит текущего Cup Viewer (этап 00)

Снимок кода: `main` @ `46d038c` (он же ветка `stable/v1` и тег `v1-stable`).
Ссылки — `файл:строка` на этом коммите.

## 1. Команды, версии, деплой

| Что | Как | Где |
| --- | --- | --- |
| сборка | `npm run build` → `check-config.mjs` + esbuild | `package.json:7`, `scripts/build.mjs:1` |
| dev | `npm run watch` (esbuild watch, sourcemap) + `npm run serve` | `package.json:8-9`, `scripts/build.mjs:83` |
| preview | `npm run start` = build + serve на :8000 | `package.json:10` |
| проверка конфига | `npm run check` | `scripts/check-config.mjs` |
| тесты | нет; есть ручной стенд записи 360 `tests/capture-review*.mjs` | `tests/README.md` |
| lint | нет | — |

- three **0.160.0** (`package.json:15`), esbuild **^0.25** (`package.json:14`), Node у разработчика v24.18.
- Бандлер: esbuild, один вход `js/main.js` → один файл `dist/cup-viewer.js`, ESM, minify
  (`scripts/build.mjs:31-47`). Draco-декодер копируется в `vendor/draco/` (`scripts/build.mjs:58-69`).
  Кэш-бастинг — `?v=<sha256[0:8]>` в `index.html` (`scripts/build.mjs:73-84`).
- `dist/` коммитится (`.gitignore:1-2`), сервер Node не нужен (`docs/integration.md:9`).
- Деплой: статика на сервер типографии / шаблон Битрикса (`docs/integration.md:9-45`). CI/CD нет.
- HTTP-заголовки: в dev их ставит `scripts/serve.mjs:33-50` (CSP, nosniff, Referrer-Policy) с
  `Cache-Control: no-cache` на всё (`scripts/serve.mjs:67`). В проде — веб-сервер типографии
  (nginx/Apache Битрикса); в репозитории конфигурации нет. **Для §51 заголовки выставлять негде,
  кроме dev-сервера** — нужен конфиг хостинга (см. «Чего выяснить не удалось»).

## 2. Карта модулей и порядок инициализации

Точка входа `js/main.js`; `import './ui/approval.js'` (`js/main.js:9`) запускает второй «вход»
с собственным `DOMContentLoaded` (`js/ui/approval.js:443`).

| Файл | Ответственность | Зависит от |
| --- | --- | --- |
| `js/main.js` | bootstrap, заказ → сцена, отладочный API `window.cupViewer` | Viewer, order, orderPanel, appState, approval |
| `js/Viewer.js` | ядро: сцена, камера, рендер-цикл, фото-сцена, фоны, картон, скриншот, 360 | всё из core/, loaders/, data/, UIManager |
| `js/appState.js` | синглтон viewer/order/unwrap + подписки | — |
| `js/config.js` | все настройки (заморожен) | — |
| `js/core/renderer.js` | WebGLRenderer, цветовой конвейер, тени | config |
| `js/core/postprocessing.js` | EffectComposer: Render → GTAO → SafeOutput → Backdrop → Grain | layers |
| `js/core/studioEnvironment.js` | процедурная студия → PMREM, описание ключевого света | — |
| `js/core/environment.js` | HDRI/EXR, `analyzeSun`, `applyEnvironmentIntensity` | — |
| `js/core/lighting.js` | единственный SpotLight с тенью, наведение по студии | — |
| `js/core/shadowCatcher.js` | невидимый приёмник падающей тени, PCSS по расстоянию | layers |
| `js/core/ambientContactShadow.js` | контактная тень у основания (depth + blur) | layers |
| `js/core/backdrop.js` | свёртка-фон, прибитая к камере; CSS-двойник; отрисовка в 2D | layers |
| `js/core/turntable.js` | поворотный круг под моделью | layers |
| `js/core/paperSurface.js` | процедурная карта нормалей волокна | — |
| `js/core/photoScene.js` | загрузка фото-сцены, кадры, FOV, слои теней | environment, scenes |
| `js/core/turnCapture.js` | запись оборота MediaRecorder + кадры | backdrop |
| `js/loaders/ModelLoader.js` | GLTF+Draco, нормализация, материалы печати, пластик | helpers, paperSurface, catalog, models |
| `js/loaders/TextureManager.js` | макет → текстура ≤2048, «лист с полями» для PP | blankSheet |
| `js/data/models.js` | каталог 19 моделей (16 бумажных + 3 PP), SKU → модель | — |
| `js/data/catalog.js` | картон coated/uncoated + `PLASTIC_FINISH` | — |
| `js/data/scenes.js` | каталог фото-сцен (1 запись) | — |
| `js/data/order.js`, `sanitize.js` | заказ Битрикса: ORDER_DATA / endpoint / query | catalog, models |
| `js/ui/UIManager.js` | кнопки, свотчи, картон, пикер, горячие клавиши, drag&drop, тосты | cupPicker, models, catalog |
| `js/ui/cupPicker.js` | окно выбора стакана | models |
| `js/ui/unwrap.js` | вкладка «Развёртка» (2D canvas, zoom/pan) | — |
| `js/ui/approval.js` | вкладки, сцены, развёртка, подсказка, **согласование, правки, share**, сворачивание панели | unwrap, scenes, config, appState |
| `js/ui/orderPanel.js` | правая панель заказа, чек-лист | — |
| `js/utils/*` | helpers (dispose/measure/frame), blankSheet, zip | — |

Порядок: `main.bootstrap` (`js/main.js:35`) → `renderOrderPanel(readLocalOrder)` (`:42`) →
`new Viewer` (`:44`: `#initCore` `js/Viewer.js:84`, `#initModules` `:142` → `ui.bind` `:171`,
`selectBackground(0)` `:189`) → `setViewer` → параллельно `loadOrder` и `viewer.startEnvironment()`
(`js/main.js:49`; внутри: наблюдатели, запуск цикла, студия `js/Viewer.js:194-202`) →
`applyOrder`: `setOrder` → `loadModel` → `setSurfaceFinish` → `applyTexture` (`js/main.js:54-73`).

## 3. Рендер

- `outputColorSpace = SRGBColorSpace` (`js/core/renderer.js:31`).
- `toneMapping = 'none'` → `NoToneMapping` (`js/config.js:95`, `js/core/renderer.js:32`);
  в фото-сцене временно Linear/AgX по `scene.json` (`js/Viewer.js:523-525`), возврат `:749-750`.
- `toneMappingExposure = 1.0` (`js/config.js:99`).
- DPR: `min(devicePixelRatio, 2)` (`js/config.js:86`, `js/core/renderer.js:23`).
- antialias: `true` на канвасе (`js/config.js:79`), фактически MSAA 4 в HalfFloat-таргете композера
  (`js/core/postprocessing.js:215-218`). `preserveDrawingBuffer: true` ради скриншота (`js/config.js:81`).
- Постпроцессинг: RenderPass → **GTAOPass** (`js/core/postprocessing.js:233`) с камерой только слоя 0 →
  `SafeOutputPass` (тонмап + sRGB с деление на альфу, `:90-135`) → Backdrop (снимок фото-сцены под
  стаканом, `:149-195`) → Grain (`:38-74`). Параметры AO: базовые `js/config.js:145-162`, студийные
  `js/config.js:337`.
- Тени:
  - падающая — SpotLight с PCF (`js/core/lighting.js:43-64`, `js/core/renderer.js:54`), приёмник —
    `shadowCatcher` с PCSS-подобным расширением полутени по расстоянию (`js/config.js:343`,
    `js/core/shadowCatcher.js:56+`), затухание от основания (`js/config.js:301-302`, `:349`);
  - контактная (ambient) — ортопроекция глубины + размытие (`js/core/ambientContactShadow.js:149-210`,
    параметры `js/config.js:306-332`, студийные `:354`);
  - AO — GTAO (см. выше).
- Окружение: процедурная студия из софтбоксов → PMREM (`js/core/studioEnvironment.js:369-399`),
  перекрашивается под фон (`js/Viewer.js:989-998`). Интенсивность 0.5 на материалах
  (`js/config.js:182`, `js/core/environment.js:158`).
- Материалы бумаги: у материала печати из GLB меняются только `roughness`, `metalness`, normalMap
  (`js/loaders/ModelLoader.js:87-115`). coated: roughness 0.18, relief 0.1, reliefScale 42,
  normalScale 0.3; uncoated: 0.85 / 0.55 / 16 / 1.4 (`js/data/catalog.js:36-70`). Сам тип
  материала — тот, что в GLB (MeshStandard/MeshPhysical из GLTFLoader).
- Пластик (PP): `PLASTIC_FINISH` (`js/data/catalog.js:125-154`) — белый, opacity стенки 0.65 через
  альфу листа, roughness 0.62, clearcoat 0.35/0.3, sheen 0.5/0.6, **transmission принудительно 0**
  (`js/loaders/ModelLoader.js:133-141`); второй проход задних граней (`:178-202`).
- Paper relief: собственная normalMap модели (у конвейера 3D_Cups она есть) со своей силой
  `normalScale`, иначе процедурная 512² (`js/core/paperSurface.js:149-172`).
- Путь текстуры: URL/файл → `fetch` → `createImageBitmap` с ресайзом до `min(2048, maxTextureSize)`
  (`js/loaders/TextureManager.js:31`, `:118-150`) → для PP «лист с полями» 10 % (`:65-96`) →
  `THREE.Texture`, `colorSpace = SRGB` (`:236`), `channel = print.uv` (`:239`), `flipY=false`,
  anisotropy = max, mipmaps + trilinear (`:257-261`).
- Unwrap: отдельная картинка `order.unwrap || order.texture` в 2D-канвасе (`js/ui/approval.js:161`,
  `js/ui/unwrap.js`), на GPU не идёт. При загрузке файла развёртка получает исходный файл целиком
  (`js/Viewer.js:876`). PDF не поддерживается.

## 4. Камера

- PerspectiveCamera fov 32, направление `(0, .40, 1.2)` (`js/config.js:106-111`, `js/core/camera.js:12-17`).
- OrbitControls (`js/core/controls.js:5-19`): damping 0.08, distance 0.4…3, `maxPolarAngle = π`,
  pan включён (`js/config.js:114-122`). Собственный autoRotate OrbitControls выключен.
- Автоповорот крутит **модель**, а не камеру: `rotation.y += 0.45 рад/с · dt` (`js/Viewer.js:256-259`,
  `js/config.js:126-129`), выкл/вкл кнопкой и клавишей A (`js/Viewer.js:1000-1004`).
- Reset: двойной клик → `frameCurrentModel` (`js/ui/approval.js:184`, `js/Viewer.js:1030-1036`,
  `js/utils/helpers.js:46-74`). Кадрирование: offset 1.6, прицел −0.015 высоты (`js/config.js:361-365`).
- Поворотный круг: ручной поворот модели (`js/core/turntable.js`).
- Пресетов ракурсов (front/right/…), анимации камеры — **нет**.
- В фото-сцене камера фиксирована по `scene.json`, `controls.enabled = false` (`js/Viewer.js:596-603`).

## 5. Где живёт состояние

| Состояние | Где | Ссылка |
| --- | --- | --- |
| заказ | `appState.state.order` + `viewer.order` | `js/appState.js:16-20`, `js/Viewer.js:889` |
| модель | `modelLoader.cup/currentModel` | `js/loaders/ModelLoader.js:35-39` |
| картон | `viewer.paperKey` | `js/Viewer.js:892`, `:902` |
| фон | `viewer.backgroundIndex` | `js/Viewer.js:64`, `:955` |
| автоповорот | `viewer.autoRotate`, `manualRotate` | `js/Viewer.js:66-68` |
| фото-сцена | `viewer.photo`; выбранная — модульная `currentSceneId` в approval | `js/Viewer.js:74`, `js/ui/approval.js:83` |
| вкладка | **DOM**: `.stage-tab.is-active`, `.stage.is-photo/.is-unwrap`, `hidden` | `js/ui/approval.js:42-58` |
| полный экран | **DOM**: `.is-fullscreen` + body-класс | `js/Viewer.js:1338-1345` |
| подсказки/меню экспорта | **DOM** `hidden`, `aria-expanded` | `js/ui/UIManager.js:286-297` |
| активный стакан в пикере | DOM `.is-active` | `js/ui/cupPicker.js:424` |
| панель свёрнута | DOM + `localStorage['cup-viewer:panel-collapsed']` | `js/ui/approval.js:370-409` |
| согласование/правки | DOM (`confirming` в замыкании) | `js/ui/approval.js:269-355` |
| URL | `?sku,model,texture,unwrap,paper,roughness,title,status` (localhost), `?order=` | `js/data/order.js:104-158` |
| глобалы | `window.ORDER_DATA` (вход), `window.cupViewer` (debug) | `js/data/order.js:221`, `js/main.js:79` |

## 6. Каталог моделей

Формат — JS-модуль (`js/data/models.js`): `id, label, group, wall, volume, note, file, size{height,top,bottom},
finish('paper'|'plastic'|'own'), print{materials,uv,sheet}` (`:67-90`, `:114-166`).
`textureMapping` как поля нет — роль играет `print` (имя материала, UV-канал, «лист с полями»).
PET-моделей нет. Модели в `assets/models/` вне каталога: `8cups.glb`, `HB80-280.glb` (дубль старой версии).

Ветвления по конкретным моделям/типам:
- `FALLBACK_CUP_ID = 'HB80-280'` и `ID_PATTERNS` с id `DW80-280/EM80-280/HB80-280/PP-500` (`js/data/models.js:171-180`);
- `DEFAULT_ORDER.sku = 'DW80-280'` (`js/data/order.js:54`);
- `cup.finish === 'plastic'` в загрузчике (`js/loaders/ModelLoader.js:69`, `:93`) и `cupTakesPaper` (`js/Viewer.js:917-920`);
- `print.sheet` в TextureManager (`js/loaders/TextureManager.js:40`, `:246`);
- класс карточки `--plastic` по `wall` (`js/ui/cupPicker.js`, `css/approve.css:1157`);
- тени фото-сцены по `cup.id` (`js/core/photoScene.js:114-116`, `assets/scenes/*/scene.json → shadows`).
Ветвлений по конкретному id **в UI-логике** нет, кроме fallback/pattern в models.js и DEFAULT_ORDER.

## 7. Photo scene (§18)

- Состав папки: `scene.json`, `backdrop.webp` (1122²), `backdrop-tall.webp` (1122×1402), `env.hdr`,
  `shadow-<id>[-tall].webp` на 5 моделей (`assets/scenes/cafe/`).
- `scene.json`: камера (позиция, цель, FOV для wide/tall), пол (`mmPerUnit`), точка стакана, view
  transform, кадры, `environmentIntensity`, `shadow.keyScale`, карта теней (`assets/scenes/cafe/scene.json`).
- Подключение: `js/data/scenes.js:21-27` (только `cafe`; папка `living` лежит в assets, но в каталоге её нет),
  загрузка `js/core/photoScene.js:76-106`, применение `js/Viewer.js:487-563`.
- Тени по моделям: запечённый слой, если есть для `cup.id`, иначе расчётная (`js/Viewer.js:709-741`).
- Захардкожено: `SCENES_ROOT = 'assets/scenes'` (`js/data/scenes.js:31`), порог кадра 0.85
  (`js/core/photoScene.js:29`), grain 0.03 по умолчанию (`js/Viewer.js:556`), keyScale 0.5 (`:543`).

## 8. 360-запись и скриншот

- Скриншот: принудительный рендер через конвейер → 2D-канвас с фоном `paintBackdrop` → PNG
  (`js/Viewer.js:1087-1194`); размер = размер холста · DPR. iOS — через `navigator.share` (`:1155-1168`).
- 360: `canvas.captureStream(fps)` + **MediaRecorder** (`js/core/turnCapture.js:100-199`); кодеки по
  приоритету mp4/avc1 → mp4 → webm vp9/vp8 (`:42-48`); 12 с, 30 fps, 8 Мбит/с (`js/config.js:418-435`);
  реальное время (setTimeout), не детерминированно. Кадры каждые 45° — PNG (`:204-229`).
- ZIP — **свой** модуль без сжатия (STORE) + CRC32 (`js/utils/zip.js:61`).
- Размер 360/скриншота = холст; отдельного экспортного разрешения нет (`js/config.js:414-417`).

## 9. Approval / share (§53) — кандидаты на удаление

- JS: `initApproveFlow`, `initEditsFlow`, `initShare` (`js/ui/approval.js:269-429`); `renderOrderPanel`
  с чек-листом (`js/ui/orderPanel.js:43-79`); `DEFAULT_ORDER.status/title/lead/spec/checklist/note`
  (`js/data/order.js:79-100`); поля `status/checklist/...` в sanitize (`js/data/sanitize.js:37`, `:132`).
- DOM: `aside#approve-panel` целиком — status-chip, title, lead, spec, `#approve-actions`, `#checklist`,
  `#approve-btn`, `#edits-btn`, `#share-btn`, `form#edits-form` (`index.html:170-233`);
  `#panel-toggle` (`index.html:69-80`); `<title>Согласование макета</title>` (`index.html:9`);
  `body.approve`, `.approve-grid` (`index.html:13-15`).
- CSS: `css/approve.css` — блоки `.approve-panel`, `.status-chip`, `.spec`, `.checklist`, `.check`,
  `.cta*`, `.edits*`, `.panel-toggle`, `.approve-grid.is-panel-collapsed` (`css/approve.css:102-190`, `:1339-1660`).
- Эндпоинты/хранилища: нет (кнопки только показывали тосты). Канал заказа Битрикса —
  `window.ORDER_DATA`, `config.order.endpoint`, `?order=` (`js/data/order.js`, `js/config.js:48-50`),
  документация `docs/integration.md`. По решению владельца (2026-09-24) удаляется вместе с approval.
- Переплетено с сохраняемым (§54): `js/ui/approval.js` одновременно держит **вкладки, фото-сцены,
  развёртку, двойной клик-reset, круг, подсказку** (`:33-265`) — их надо вынести, а не удалить;
  `appState.onOrder` кормит развёртку (`js/ui/approval.js:161`); модель по SKU из заказа
  (`js/data/order.js:172-211`) — единственный способ задать стартовую модель; `css/approve.css`
  содержит и раскладку сцены, вкладок, пикера, подсказки.

## 10. Upload

- Кнопка «Заменить дизайн» → `<input accept="image/*">` (`index.html:95-98`), drag&drop картинок и
  `.glb/.gltf` (`js/ui/UIManager.js:338-367`).
- Проверка типа — **по MIME от браузера** (`file.type.startsWith('image/')`,
  `js/loaders/TextureManager.js:186-189`), не по сигнатуре. Лимита размера нет. PDF/AI/EPS/CDR — нет.
- Прозрачность PNG: для бумажных — альфа как есть уходит в `map` (материал непрозрачный, альфа
  игнорируется → прозрачные места выглядят как RGB под альфой, обычно чёрные/белые — зависит от
  файла); для PP — рисуется на белый лист с альфой стенки (`js/loaders/TextureManager.js:65-96`).
- Отмены повторной загрузки нет: две быстрые загрузки гоняются; модель — через очередь `selectCup`
  (`js/Viewer.js:796-810`), текстура — нет.

## 11. Детерминизм

Мешает одинаковому кадру:
- `Math.random()` в карте волокна (`js/core/paperSurface.js:42`) — у моделей без своей normalMap
  (PP) рельеф разный при каждом запуске;
- автоповорот по часам (`js/Viewer.js:256-259`) и `THREE.Clock`;
- damping OrbitControls (`js/config.js:115`) — камера «доезжает» несколько кадров;
- анимация появления/скрытия поворотного круга (`js/core/turntable.js:312-360`);
- асинхронные HDRI/модель/текстура/фото-сцена без общего сигнала готовности;
- grain в фото-сцене — детерминирован (хеш от UV), GTAO — шум фиксированный (three r160).
События «всё загружено и отрисовано» **нет**: есть только промис `applyOrder` в main.

## 12. Расхождения с концепцией

- §54 «сохранить развёртку/сцены/экспорт» — физически живут в `approval.js`, файле, который §53 удаляет.
- §16/§49 «3D ≤ 2048, unwrap полноразмерный»: 3D соблюдается (`TextureManager.js:31`); unwrap из файла —
  исходник без предела площади (риск iOS canvas > 16.7 Мп).
- §15 «цвет важнее»: соблюдено (toneMapping none), но в фото-сцене AgX/Linear (осознанно).
- §38 «модели — данные в catalog/»: сейчас JS-модули `js/data/*.js` с логикой; `textureMapping` нет.
- §39 материалы: только coated/uncoated/PP-молочный; soft-touch, kraft, PP clear, PP frosted, PET — нет.
- §13 фоны: 4 цвета массивом (`js/config.js:395`), без флагов client.
- §12 ракурсы: пресетов нет.
- §20 экспорт: только скриншот размером с холст и 360; нет PNG/JPG размеров, ZIP ракурсов.
- §37 режимы: одного интерфейса с флагами `ui.modelPicker/uploadButton/dragAndDrop` — скрытие флагом,
  код остаётся в бандле.

## Предлагаемые секции CLAUDE.md

### Команды
```
dev:          npm run watch   (+ npm run serve в соседнем терминале, :8000)
build:        npm run build
unit:         node --test tests/unit
render:check  npm run render:check      (эталоны: npm run render:baseline — только с «ок» человека)
```

### Устройство
- Движок: `js/Viewer.js` + `js/core/*` + `js/loaders/*`. Один renderer, одна сцена.
- Состояние: `js/state/viewerState.js`; права — `js/state/modeController.js`.
- Данные: `catalog/*.json` + `catalog/scenes/<id>/scene.json`; валидатор — `js/catalog/`.
- Входы: `design.html` → `js/entries/design.js`, `view.html` → `js/entries/view.js`.

### Грабли
- Рендер по требованию: после любого изменения сцены — `viewer.invalidate()`/`invalidateModel()`, иначе кадр не обновится.
- Загрузка модели сбрасывает материалы — отделку и текстуру применять после `loadModel`.
- Фото-сцена меняет toneMapping — при выходе он возвращается (`exitPhotoScene`); не трогать в обход.
- PP печатается «листом с полями» (`print.sheet`): прямоугольная развёртка, не веер.
- `preserveDrawingBuffer: true` нужен для скриншота с холста.

## Чего выяснить не удалось

- `docs/CONCEPT.md` в репозитории и на дисках нет; по решению владельца восстанавливается по ТЗ,
  макету интерфейса и коду (`docs/CONCEPT.md`, помечено как реконструкция).
- Где и кем будут выставляться прод-заголовки (§51): хостинг неизвестен, конфигов nginx/Apache нет.
- Реальные значения `UNMASKED_RENDERER_WEBGL` на устройствах матрицы §52 — нужен человек с устройствами.
- Физические параметры soft-touch/kraft/PET у типографии (замеры блеска, цвет крафта) — берутся
  стартовые, обоснованные значения.
- Предел canvas на конкретном iPhone — проверяется только на устройстве.
