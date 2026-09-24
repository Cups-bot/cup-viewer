# Развёртывание

Страницы статические: Node на сервере не нужен, `dist/` лежит в репозитории готовым.
Нужен веб-сервер, который отдаёт файлы и ставит заголовки ниже, и бэкенд клиентских
ссылок (сейчас — локальная замена в `scripts/snapshotApi.mjs`, дальше — Supabase, этап 06).

## Что копировать

```
index.html          Design Mode (сотрудник)
view.html           Client Mode (клиент по ссылке ?v=<token>)
dist/               сборка: design.js, view.js, chunks/*-<хеш>.js
css/                стили
assets/             модели, иконки
catalog/            каталоги и фото-сцены
vendor/             Draco и pdf.js (worker, шрифты, cmaps, ICC, wasm)
```

`js/`, `scripts/`, `tests/`, `docs/`, `node_modules/`, `Cafe_Mockup_Blender_Pack/` на сервер не нужны.

## Кэш (§51)

| Что | Cache-Control |
| --- | --- |
| `dist/chunks/*-XXXXXXXX.js` (хеш в имени) | `public, max-age=31536000, immutable` |
| `index.html`, `view.html` | `no-store` |
| ответы `get-snapshot` | `no-store` |
| `dist/design.js`, `dist/view.js`, `css/*` | `no-cache` — версию несёт `?v=<хеш>` в HTML |
| `assets/`, `catalog/`, `vendor/` | `no-cache` (ETag); имена без хеша — долгий кэш давать нельзя |

Эталон этих правил — `cacheControl()` в `scripts/serve.mjs`.

## Заголовки безопасности

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self';
  img-src 'self' data: blob:; connect-src 'self' blob:; worker-src 'self' blob:; font-src 'self';
  object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin          (view.html дополнительно: <meta name="referrer" content="no-referrer">)
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
```

- `wasm-unsafe-eval` — только компиляция WebAssembly (декодеры pdf.js); `eval` запрещён.
- `worker-src blob:` — воркер кодирования растров (`js/utils/encode.js`) и Draco.
- `connect-src blob:` — GLTFLoader читает встроенные текстуры по blob-адресам.
- Если бэкенд ссылок живёт на другом домене (Supabase), его адрес добавляется в `connect-src` и `img-src`.

## nginx (пример)

```nginx
location = /index.html { add_header Cache-Control "no-store"; }
location = /view.html  { add_header Cache-Control "no-store"; }
location ~ ^/dist/chunks/.+-[A-Z0-9]{8}\.js$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
location / { add_header Cache-Control "no-cache"; try_files $uri =404; }
types { application/wasm wasm; text/javascript mjs; }
gzip on; gzip_types text/javascript application/json text/css image/svg+xml;
```

## Бэкенд клиентских ссылок

Контракт (реализован локально в `scripts/snapshotApi.mjs`, повторяется Edge Functions этапа 06):

| Запрос | Ответ |
| --- | --- |
| `POST api/snapshot-assets` (PNG/JPEG) | `{ assetId }` |
| `POST api/publish-snapshot` `{ state, textureAsset, unwrapAsset }` | `{ token }` — один раз |
| `GET api/get-snapshot?v=<token>` | `{ schemaVersion, state, design: { textureUrl, unwrapUrl } \| null }`, `no-store` |
| неизвестный или кривой токен | одинаковый `404 {"error":"not_found"}` |

Токен — 128 случайных бит (base64url); хранится только SHA-256. Ссылки на растры —
подписанные, TTL 1 ч; клиент при 400/403 один раз перезапрашивает snapshot.
Локальная замена **не проверяет, что публикует сотрудник** — на бой её не выкладывать.

## Размер стартовой загрузки (2026-09-24, без gzip)

| Страница | Всего | JS | Модель | Прочее |
| --- | --- | --- | --- | --- |
| v1 (`stable/v1`) | 1238 КБ | 752 КБ одним файлом | 386 КБ | 100 КБ |
| Design Mode с сессией | 1219 КБ | 760 КБ | 386 КБ | 73 КБ |
| Client Mode | 2018 КБ | 755 КБ | 447 КБ | 816 КБ, из них растры дизайна 757 КБ |

По требованию (не на старте): pdf.js 524 КБ + worker, экспорт 11 КБ, запись 360 3 КБ,
Model Picker, окно ссылки, фото-сцены (≈ 2 МБ на сцену), ресурсы pdf.js в `vendor/pdfjs/`.
