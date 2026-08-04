// Локальный статический сервер для разработки.
//
// Страница грузит модули и ассеты по HTTP, поэтому открывать её двойным кликом
// по index.html нельзя. Годится любой статический сервер (например
// `python -m http.server 8000`); этот удобен тем, что заодно ставит те же
// заголовки безопасности, что должны стоять на бою, — расхождение конфигураций
// обнаруживается сразу, а не после выкладки.
//
// Запуск: npm run serve   ·   сборка и запуск: npm start

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT) || 8000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.hdr': 'image/vnd.radiance',
  '.exr': 'image/x-exr',
  '.wasm': 'application/wasm',
  '.map': 'application/json; charset=utf-8',
};

// Ровно тот набор, что описан в docs/security.md. Держим его здесь, чтобы
// нарушение политики ловилось на локальной машине, а не у клиента.
const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data: blob:",
    // blob: здесь обязателен. GLTFLoader достаёт встроенные в .glb текстуры
    // через fetch() по blob-адресу, а 'self' на схему blob: не распространяется:
    // без него текстура молча не грузится, material.map остаётся пустым, и
    // дизайн на стакан не ложится вообще. Ошибка выглядит как «просмотрщик
    // показывает белый стакан» и ищется долго.
    "connect-src 'self' blob:",
    // Draco-декодер работает в worker'е, создаваемом из blob.
    "worker-src 'self' blob:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
};

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const relative = decodeURIComponent(url.pathname);
  const target = normalize(join(root, relative === '/' ? '/index.html' : relative));

  // Выход за пределы каталога проекта — всегда ошибка.
  if (!target.startsWith(root)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const info = await stat(target);
    if (info.isDirectory()) throw new Error('directory');

    res.writeHead(200, {
      'Content-Type': TYPES[extname(target).toLowerCase()] ?? 'application/octet-stream',
      'Content-Length': info.size,
      'Cache-Control': 'no-cache',
      ...SECURITY_HEADERS,
    });
    createReadStream(target).pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Не найдено');
  }
}).listen(port, () => {
  console.log(`Просмотрщик: http://localhost:${port}`);
});
