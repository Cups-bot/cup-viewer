# CupViewer

Публичный сайт: 3D-просмотр бумажных и пластиковых стаканов с макетом заказчика и
фотореалистичный рендер за токены (концепция v2 — [`docs/CONCEPT-v2.md`](docs/CONCEPT-v2.md)).

- **Сайт** (`index.html`) — стакан (однослойные, двухслойные, эмбо, пластиковые BM, PET) →
  макет (JPG, PNG, PDF) → результат. Материал — в шапке. 3D, развёртка и «Фотореал»
  (сцена, ракурс, формат, второй стакан); фото 2048×2048, 4 ракурса или видео оборота —
  бесплатно, фотореал-кадр — за токены, после входа.
- **Кабинет** — вход по почте и коду, баланс, «Мои рендеры», пополнение; **админка** —
  `admin.html`. Сервер и исполнитель рендера — [`server/`](server/README.md), движок
  рендера — [`render/`](render/README.md).

Ссылок клиенту нет (владелец, 2026-09-27: общий сервис — клиент сам приходит на сайт).

Оформление — в системе colorcups.ru: светлая и тёмная тема (по системе или переключателем
«солнце/луна»). Объёмы — номинальные, как в каталоге formacia.ru.

Один движок и одно состояние на страницу.

Концепция — [`docs/CONCEPT.md`](docs/CONCEPT.md) · этапы — [`docs/briefs/`](docs/briefs/) ·
рендер — [`docs/rendering.md`](docs/rendering.md) · материалы — [`docs/materials.md`](docs/materials.md) ·
развёртывание — [`docs/deploy.md`](docs/deploy.md) · совместимость — [`docs/qa/compat.md`](docs/qa/compat.md) ·
отчёт по этапам — [`docs/reports/2026-09-24.md`](docs/reports/2026-09-24.md).

Прежняя версия (клиентская страница для Битрикса) — ветка `stable/v1`, тег `v1-stable`.

## Быстрый старт

```bash
npm install
npm run start          # сборка + dev-сервер http://localhost:8000 (без кабинета)
```

| Команда | Что делает |
| --- | --- |
| `npm run build` | проверка конфига + сборка `dist/` (design, admin, чанки по требованию) |
| `npm run watch` | пересборка при правке `js/` |
| `npm run serve` | dev-сервер :8000: статика, заголовки, кэш §51, «Задание» для Blender (без кабинета) |
| `npm run test:unit` | unit-тесты (`node --test`) |
| `npm run render:check` | сверка рендера с эталонами (`-- --strict` — любое отличие = провал) |
| `npm run render:candidates` | кадры новых материалов для глаз — эталонами становятся после «ок» |
| `npm run render:baseline` | переснять эталоны — **только с «ок» владельца** |

Отладка (только localhost): `window.ViewerState`, `window.cupViewer`, оверлей `?debug=perf`.

## Как добавить

- **Стакан** — строка в `catalog/models.json` (`volumeMl` — номинальный объём,
  `fullVolumeMl` — до края); размер развёртки и азимут шва:
  `node scripts/measure-unwrap.mjs --catalog`. Раздел пикера выбирается по `type` и `wall`.
- **Материал, фон** — строка в `catalog/materials.json`, `backgrounds.json`.
- **Интерьер** (фото-сцену) — папка `catalog/scenes/<id>/` (scene.json, снимки, env.hdr, тени)
  и строка в `catalog/scenes/index.json`. Код не правится. Сцена «Гостиная» собрана, но из
  списка убрана по решению владельца.

## Структура

```
index.html, admin.html  сайт и админка
assets/brand/           логотип Cup Viewer (светлый, тёмный, знак)
catalog/                данные: стаканы (cups.json → models.json), материалы, фоны, сцены
js/Viewer.js            движок: сцена, камера и пресеты, фото-сцена, кадр для экспорта, 360
js/core/ js/loaders/    рендер, материалы печати, загрузка моделей и макетов
js/state/               ViewerState (§36) и ModeController (§37)
js/catalog/             загрузка и проверка каталогов
js/app/                 общий старт, связка состояния с движком, действия
js/ui/                  общий интерфейс сцены: вкладки, развёртка, панель, тосты, тексты §42, тема
js/design/              сайт: пикер и силуэты, материал, загрузка макета, pdf.js, «Фотореал»
js/account/             кабинет: вход, токены, «Мои рендеры», пополнение
js/export/              экспорт (грузится по требованию)
js/entries/             входы design.js и admin.js
scripts/                сборка, dev-сервер, «Задание» для Blender, замер развёртки
tests/render/           render:check — детерминированная съёмка, эталоны, кандидаты
tests/unit/             unit-тесты
```

## render:check

Headless Chromium на SwiftShader снимает 9 кадров (1600×1200, DPR 1) — бумага coated/uncoated,
PP, фото-сцена, развёртка, экспорт — и сравнивает с `tests/render/baseline/`. Рендер
детерминирован бит в бит. Пороги §58: доля отличающихся пикселей ≤ 0,1 %, mean ΔE00 ≤ 0,5,
p99 ΔE00 ≤ 2,0. Отчёт — `tests/render/out/report.json`, для глаз — `contact-sheet.png`
(эталон | текущий | тепловая карта ΔE00).
