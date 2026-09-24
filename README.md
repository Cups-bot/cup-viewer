# Cup Viewer

Браузерный 3D-просмотрщик бумажных и пластиковых стаканов с дизайном заказчика.
Концепция продукта — [`docs/CONCEPT.md`](docs/CONCEPT.md), этапы работ — [`docs/briefs/`](docs/briefs/),
почему рендер устроен именно так — [`docs/rendering.md`](docs/rendering.md).

> Проект в переработке по брифам этапов 00–08. Прежняя версия (клиентская страница
> для Битрикса) лежит в ветке `stable/v1` и теге `v1-stable`.

## Быстрый старт

```bash
npm install
npm run start          # сборка + локальный сервер http://localhost:8000
```

| Команда | Что делает |
| --- | --- |
| `npm run build` | проверка конфига + сборка `dist/` |
| `npm run watch` | пересборка при правке `js/` |
| `npm run serve` | локальный сервер на :8000 |
| `npm run test:unit` | unit-тесты (`node --test`) |
| `npm run render:check` | сверка рендера с эталонами (`-- --strict` — любое отличие = провал) |
| `npm run render:baseline` | переснять эталоны — **только с «ок» владельца** |

## Структура

```
index.html            Design Mode (сотрудник) → dist/design.js
view.html             Client Mode (клиент по ссылке) → dist/view.js
catalog/              данные: модели, материалы, фоны, бренды, сцены (scenes/<id>/)
js/Viewer.js          движок: сцена, камера, рендер-цикл, фото-сцена, снимок, 360
js/core/              рендер: свет, тени, постобработка, окружение, запись оборота
js/loaders/           модели и макеты
js/state/             ViewerState (единственный источник истины) и ModeController (права)
js/catalog/           загрузка и проверка каталогов
js/app/               общий старт, связка состояния с движком, действия
js/ui/                общий интерфейс сцены: вкладки, развёртка, панель, тосты
js/design/            только Design Mode: выбор стакана и материала, загрузка макета
js/entries/           входы design.js и view.js
css/                  стили (style.css — база, stage.css — раскладка страницы)
assets/               модели, иконки
tests/render/         render:check — детерминированная съёмка и эталоны
tests/unit/           unit-тесты
scripts/              сборка, сервер, замер развёртки
Cafe_Mockup_Blender_Pack/  исходники фото-сцены «Кофейня» (Blender)
```

### Как добавить

- **Стакан** — строка в `catalog/models.json`; размер развёртки: `node scripts/measure-unwrap.mjs --catalog`.
- **Сцену** — папка `catalog/scenes/<id>/` (scene.json и ассеты) и строка в `catalog/scenes/index.json`.
- **Фон, материал, бренд** — строка в соответствующем `catalog/*.json`. Код не правится.

## render:check

Headless Chromium на SwiftShader снимает фиксированную матрицу кадров (1600×1200, DPR 1)
и сравнивает с эталонами в `tests/render/baseline/`. Отчёт — `tests/render/out/report.json`,
для глаз — `tests/render/out/contact-sheet.png` (эталон | текущий | тепловая карта ΔE00).
Пороги (§58): доля отличающихся пикселей ≤ 0,1 %, mean ΔE00 ≤ 0,5, p99 ΔE00 ≤ 2,0.
