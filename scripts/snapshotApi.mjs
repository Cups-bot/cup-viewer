// Локальная замена бэкенда клиентских ссылок (этап 06 отложен владельцем).
//
// Контракт — тот же, что у Edge Functions из docs/briefs/06-backend.md, чтобы
// переход на Supabase менял только адреса, а не код страниц:
//
//   POST /api/snapshot-assets     тело — PNG/JPEG → { assetId }
//   POST /api/publish-snapshot    { state, textureAsset, unwrapAsset, texture2Asset?, unwrap2Asset? } → { token }
//   GET  /api/get-snapshot?v=…    → { schemaVersion, state, design: { textureUrl, unwrapUrl } | null, design2 }
//
// design2 — свой макет второго стакана «Фотореала» (CupViewer v2), необязателен.
//   GET  /api/asset?a=…&e=…&s=…   подписанная ссылка на растр, TTL 1 ч
//
// Токен — 128 случайных бит (base64url); на диске лежит только его SHA-256.
// Неизвестный и кривой токен получают одинаковый 404 с одинаковым телом.
// Исходник макета сюда не приходит: страница отправляет только производные
// растры (3D-текстуру ≤ 2048 и развёртку).
//
// ТОЛЬКО ДЛЯ РАЗРАБОТКИ: авторизации сотрудника здесь нет (её даст этап 06).

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const MAX_ASSET_BYTES = 64 * 1024 * 1024;
const TOKEN_RE = /^[A-Za-z0-9_-]{22,64}$/;
const ASSET_RE = /^[A-Za-z0-9_-]{22}$/;
// Поля состояния, которые snapshot вообще может нести (§36 без design).
const STATE_FIELDS = ['modelId', 'materialId', 'backgroundId', 'sceneId', 'brandId', 'title'];

const base64url = (buffer) => buffer.toString('base64url');
const sha256 = (text) => createHash('sha256').update(text).digest('hex');

export function createSnapshotApi({ root, ttlSeconds = Number(process.env.SNAPSHOT_TTL) || 3600 }) {
  const dir = resolve(root, '.local-snapshots');
  const assetsDir = resolve(dir, 'assets');
  const snapshotsDir = resolve(dir, 'snapshots');
  // Ключ подписи живёт в памяти: после перезапуска старые ссылки на растры
  // истекают, а сам snapshot по токену открывается как прежде.
  const secret = randomBytes(32);

  const sign = (assetId, expires) => base64url(createHmac('sha256', secret).update(`${assetId}.${expires}`).digest());

  const json = (res, status, body, extra = {}) => {
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extra,
    });
    res.end(JSON.stringify(body));
  };
  const notFound = (res) => json(res, 404, { error: 'not_found' });

  async function readBody(req, limit) {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > limit) throw Object.assign(new Error('too_large'), { status: 413 });
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }

  const assetPath = async (assetId) => {
    if (!ASSET_RE.test(assetId ?? '')) return null;
    for (const ext of ['png', 'jpg']) {
      const path = resolve(assetsDir, `${assetId}.${ext}`);
      if (await stat(path).then(() => true, () => false)) return path;
    }
    return null;
  };

  const signedUrl = (assetId) => {
    const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
    return `/api/asset?a=${assetId}&e=${expires}&s=${sign(assetId, expires)}`;
  };

  // Запросы на запись — только со своей страницы.
  const sameOrigin = (req) => {
    const origin = req.headers.origin;
    return !origin || origin === `http://${req.headers.host}`;
  };

  async function handle(req, res, url) {
    if (url.pathname === '/api/snapshot-assets' && req.method === 'POST') {
      if (!sameOrigin(req)) return json(res, 403, { error: 'forbidden' });
      const body = await readBody(req, MAX_ASSET_BYTES);
      const png = body.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
      const jpeg = body[0] === 0xff && body[1] === 0xd8 && body[2] === 0xff;
      if (!png && !jpeg) return json(res, 415, { error: 'unsupported_media' });
      await mkdir(assetsDir, { recursive: true });
      const assetId = base64url(randomBytes(16));
      await writeFile(resolve(assetsDir, `${assetId}.${png ? 'png' : 'jpg'}`), body);
      return json(res, 201, { assetId });
    }

    if (url.pathname === '/api/publish-snapshot' && req.method === 'POST') {
      if (!sameOrigin(req)) return json(res, 403, { error: 'forbidden' });
      const input = JSON.parse((await readBody(req, 64 * 1024)).toString('utf8'));
      const state = {};
      for (const key of STATE_FIELDS) {
        const value = input?.state?.[key];
        if (value === null || value === undefined) continue;
        if (typeof value !== 'string' || value.length > 200) return json(res, 400, { error: `bad_${key}` });
        state[key] = value;
      }
      if (!state.modelId) return json(res, 400, { error: 'bad_modelId' });
      // Раскладка «Фотореала» (CupViewer v2): ракурс, формат, второй стакан,
      // углы. Форму проверяет и страница клиента (viewerState), здесь — чтобы
      // в хранилище не легло лишнее.
      const photo = input?.state?.photo;
      if (photo !== undefined && photo !== null) {
        const short = (v) => v === null || v === undefined || (typeof v === 'string' && v.length <= 40);
        const second = photo.second;
        const ok = typeof photo === 'object'
          && short(photo.preset) && short(photo.frame)
          && (second == null || (typeof second === 'object' && short(second.modelId) && short(second.kind)))
          && (photo.angles == null || (Array.isArray(photo.angles) && photo.angles.length <= 2
            && photo.angles.every((x) => typeof x === 'number' && Number.isFinite(x))));
        if (!ok) return json(res, 400, { error: 'bad_photo' });
        state.photo = {
          preset: photo.preset ?? null,
          frame: photo.frame ?? null,
          second: second ? { modelId: second.modelId, kind: second.kind } : null,
          angles: photo.angles ?? null,
        };
      }
      // Растры должны уже лежать в хранилище: snapshot появляется, только
      // когда загружено всё (бриф 06, п. 3).
      const withDesign = Boolean(input.textureAsset || input.unwrapAsset);
      if (withDesign && (!(await assetPath(input.textureAsset)) || !(await assetPath(input.unwrapAsset)))) {
        return json(res, 409, { error: 'assets_missing' });
      }
      const withDesign2 = Boolean(input.texture2Asset || input.unwrap2Asset);
      if (withDesign2 && (!(await assetPath(input.texture2Asset)) || !(await assetPath(input.unwrap2Asset)))) {
        return json(res, 409, { error: 'assets_missing' });
      }
      const token = base64url(randomBytes(16));
      await mkdir(snapshotsDir, { recursive: true });
      await writeFile(
        resolve(snapshotsDir, `${sha256(token)}.json`),
        JSON.stringify({
          schemaVersion: 1,
          state,
          textureAsset: withDesign ? input.textureAsset : null,
          unwrapAsset: withDesign ? input.unwrapAsset : null,
          texture2Asset: withDesign2 ? input.texture2Asset : null,
          unwrap2Asset: withDesign2 ? input.unwrap2Asset : null,
          createdAt: new Date().toISOString(),
        }),
      );
      return json(res, 201, { token });
    }

    if (url.pathname === '/api/get-snapshot' && req.method === 'GET') {
      const token = url.searchParams.get('v') ?? '';
      if (!TOKEN_RE.test(token)) return notFound(res);
      const record = await readFile(resolve(snapshotsDir, `${sha256(token)}.json`), 'utf8').then(JSON.parse, () => null);
      if (!record) return notFound(res);
      return json(res, 200, {
        schemaVersion: record.schemaVersion,
        state: record.state,
        design: record.textureAsset
          ? { textureUrl: signedUrl(record.textureAsset), unwrapUrl: signedUrl(record.unwrapAsset) }
          : null,
        design2: record.texture2Asset
          ? { textureUrl: signedUrl(record.texture2Asset), unwrapUrl: signedUrl(record.unwrap2Asset) }
          : null,
      });
    }

    if (url.pathname === '/api/asset' && req.method === 'GET') {
      const assetId = url.searchParams.get('a') ?? '';
      const expires = Number(url.searchParams.get('e'));
      const signature = Buffer.from(url.searchParams.get('s') ?? '');
      const expected = Buffer.from(sign(assetId, expires));
      const valid =
        Number.isFinite(expires) &&
        expires > Date.now() / 1000 &&
        signature.length === expected.length &&
        timingSafeEqual(signature, expected);
      const path = valid ? await assetPath(assetId) : null;
      if (!path) return json(res, 403, { error: 'expired_or_invalid' });
      const info = await stat(path);
      res.writeHead(200, {
        'Content-Type': path.endsWith('.png') ? 'image/png' : 'image/jpeg',
        'Content-Length': info.size,
        'Cache-Control': 'private, max-age=3600',
      });
      createReadStream(path).pipe(res);
      return undefined;
    }

    return notFound(res);
  }

  return {
    matches: (url) => url.pathname.startsWith('/api/'),
    async handle(req, res, url) {
      try {
        await handle(req, res, url);
      } catch (error) {
        json(res, error.status ?? 400, { error: error.status === 413 ? 'too_large' : 'bad_request' });
      }
    },
  };
}
