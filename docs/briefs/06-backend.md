# Этап 06 — Supabase: авторизация, snapshots, клиентская ссылка

> Этап 06 отложен владельцем (2026-09-24): Supabase не поднимается. Client Mode работает на локальном snapshot того же контракта (`/api/get-snapshot`), который отдаёт dev-сервер.

Интеграция. Бюджет размышления: ultrathink (безопасность и права).
Читать: §3, §4, §31, §33–§35.

## Предусловие
Человек даёт URL проекта и anon key в `.env.local` (в .gitignore). Локальная разработка — Supabase CLI + Docker. Если чего-то из этого нет — остановись и скажи.

## Цель
Авторизованный сотрудник создаёт клиентскую ссылку; по ней без авторизации открывается неизменяемый snapshot, и ни один путь хранилища или исходник клиенту не виден.

## Требования
1. Миграции в `supabase/migrations/`:
   - `staff (user_id uuid pk → auth.users, created_at)` — allowlist сотрудников; функция `is_staff()` security definer;
   - `viewer_snapshots` — поля §34 + `schema_version int not null default 1`. RLS включён. Insert — только `is_staff()` и `created_by = auth.uid()`. Select/update/delete для anon и authenticated — нет политик (snapshot неизменяем, §4; удаление — P1 через service role).
2. Storage: приватный bucket `viewer-assets` (§35). Загружать туда могут только staff в свой префикс. Публичного доступа нет.
3. Публикация (Design Mode, кнопка из §31):
   - загружаются только производные растры: 3D-текстура (≤ 2048) и unwrap; исходный PDF — никогда;
   - Edge Function `publish-snapshot` (JWT обязателен, проверка `is_staff()`): проверяет, что файлы существуют и лежат в префиксе вызывающего; генерирует токен ≥ 128 бит (`crypto.getRandomValues`, base64url); пишет в таблицу только SHA-256 токена; возвращает токен один раз;
   - строка snapshot появляется только когда все ассеты загружены. Сбой посередине — ни строки, ни ссылки; осиротевшие файлы перечисляются в логе функции (чистка — P1).
4. Чтение: Edge Function `get-snapshot` (без JWT). Вход — токен. Хеширует, ищет, возвращает state (§36: model, material, background, scene, brand, title) + signed URLs текстуры и unwrap с TTL 1 ч. Путей, `created_by`, id строки в ответе нет. Неизвестный и кривой токен — одинаковый 404 с одинаковым телом.
5. Клиент перезапрашивает URLs при 400/403 от storage (истёк TTL) — один раз, дальше ошибка §42.
6. Клиентский бандл не тянет `supabase-js`: обычный `fetch` к `get-snapshot`. `supabase-js` — только в design-входе (разрешённая зависимость).
7. Auth Design Mode: вход по magic link. После входа — `is_staff()`; не staff → экран «Нет доступа» + выход. Design-модули импортируются только после успешной проверки.
8. service_role ключ — только в env Edge Functions. `git grep -n "service_role"` вне `supabase/` — пусто.

## Проверка прав — `scripts/check-rls.mjs` против локального Supabase
anon: select из viewer_snapshots → 0 строк / отказ; insert → отказ; list/download storage → отказ.
authenticated не-staff: insert → отказ; upload → отказ.
staff: insert чужого `created_by` → отказ; update/delete своего → отказ.
Каждая проверка печатает PASS/FAIL, общий exit code.

## Не-цели
- список проектов, история, редактирование snapshot, CRM, статусы (§4, §34)
- OAuth (позже)
- UI Client Mode (этап 07) — здесь достаточно, чтобы `get-snapshot` вернул корректный JSON

## Готово
- [ ] `check-rls.mjs` — все PASS; покажи, что хотя бы одна проверка падает при временно открытой политике
- [ ] сквозной прогон: вход → загрузка → публикация → `curl get-snapshot` → JSON без путей, URLs открываются, через 1 ч + 1 мин (или при TTL 60 с в тесте) — 400/403
- [ ] в таблице нет открытых токенов, только хеши
