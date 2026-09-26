// Локальная замена API заданий рендера (CupViewer v2, до сервера этапа Г).
//
//   POST /api/render-job   { job, arts: { "<номер стакана>": assetId } } → { dir, command }
//
// Растры макетов страница заранее кладёт через /api/snapshot-assets (тот же
// склад, что у клиентских ссылок, scripts/snapshotApi.mjs). Здесь задание
// становится папкой render/jobs/<время>/: job.json и макеты рядом с ним —
// ровно то, что читает render/engine/run.py --job (пути к макетам — от файла
// задания). Исходник макета сюда не приходит: только растр развёртки, тот же,
// что лёг на 3D-модель.
//
// ТОЛЬКО ДЛЯ РАЗРАБОТКИ: ни входа, ни токенов здесь нет (этапы Г–Д).

import { copyFile, mkdir, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const ASSET_RE = /^[A-Za-z0-9_-]{22}$/;
const ID_RE = /^[A-Z]{2}\d{2}-\d{3}$/;

export function createRenderJobApi({ root }) {
  const assetsDir = resolve(root, '.local-snapshots', 'assets');
  const jobsDir = resolve(root, 'render', 'jobs');

  const json = (res, status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify(body));
  };

  async function readJson(req, limit) {
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > limit) throw Object.assign(new Error('too_large'), { status: 413 });
      chunks.push(chunk);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  }

  const assetFile = async (assetId) => {
    if (!ASSET_RE.test(assetId ?? '')) return null;
    for (const ext of ['png', 'jpg']) {
      const path = resolve(assetsDir, `${assetId}.${ext}`);
      if (await stat(path).then(() => true, () => false)) return { path, ext };
    }
    return null;
  };

  // Задание проверяется по форме, а не по смыслу: смысл проверит движок
  // (run.load_job) и скажет по-русски, что не так.
  function sane(job) {
    if (!job || typeof job.set !== 'string' || !/^[a-z0-9_-]{1,40}$/.test(job.set)) return 'bad_set';
    if (!Array.isArray(job.cups) || job.cups.length < 1 || job.cups.length > 2) return 'bad_cups';
    for (const cup of job.cups) {
      if (!ID_RE.test(cup?.id ?? '')) return 'bad_cup_id';
      if (cup.art !== undefined) return 'art_from_server_only';
    }
    return null;
  }

  return {
    matches: (url) => url.pathname === '/api/render-job',
    async handle(req, res) {
      if (req.method !== 'POST') return json(res, 405, { error: 'method' });
      const origin = req.headers.origin;
      if (origin && origin !== `http://${req.headers.host}`) return json(res, 403, { error: 'forbidden' });
      let input;
      try {
        input = await readJson(req, 64 * 1024);
      } catch (error) {
        return json(res, error.status ?? 400, { error: 'bad_json' });
      }
      const job = input?.job;
      const problem = sane(job);
      if (problem) return json(res, 400, { error: problem });

      const stamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
      const dir = resolve(jobsDir, `${stamp}_${job.set}`);
      await mkdir(dir, { recursive: true });
      // Один растр — один файл: у пары макет общий.
      const named = new Map();
      for (const [index, assetId] of Object.entries(input.arts ?? {})) {
        const cup = job.cups[Number(index)];
        const file = await assetFile(assetId);
        if (!cup || !file) return json(res, 400, { error: `bad_art_${index}` });
        if (!named.has(assetId)) {
          const name = `art-${named.size + 1}.${file.ext}`;
          await copyFile(file.path, resolve(dir, name));
          named.set(assetId, name);
        }
        cup.art = named.get(assetId);
      }
      await writeFile(resolve(dir, 'job.json'), `${JSON.stringify(job, null, 1)}\n`);
      const rel = `render/jobs/${stamp}_${job.set}`;
      return json(res, 201, {
        dir: rel,
        // Черновик в лёгком режиме: ноутбук владельца (CLAUDE.md, render/README.md).
        command: `blender -b --factory-startup -t 4 -P render/engine/run.py -- --job ${rel}/job.json --render --samples 64 --resolution 800`,
      });
    },
  };
}
