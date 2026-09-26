// Snapshot клиентской ссылки (§4): неизменяемый слепок состояния и растров.
//
// Обычный fetch к get-snapshot — без supabase-js (бриф 06, п. 6). Растры
// скачиваются сюда же и превращаются в blob-адреса: подписанные ссылки живут
// час, а страница может быть открыта дольше.

export const SNAPSHOT_ENDPOINT = 'api/get-snapshot';

export class SnapshotError extends Error {
  // reason: 'missing' — ссылки нет или она неизвестна; 'expired' — растры не
  // скачались и после повторного запроса ссылок.
  constructor(reason) {
    super(reason);
    this.reason = reason;
  }
}

export function readToken() {
  return new URLSearchParams(window.location.search).get('v');
}

export async function fetchSnapshot(token) {
  if (!token) throw new SnapshotError('missing');
  const response = await fetch(`${SNAPSHOT_ENDPOINT}?v=${encodeURIComponent(token)}`, {
    cache: 'no-store',
    credentials: 'omit',
    headers: { Accept: 'application/json' },
  }).catch(() => null);
  if (!response?.ok) throw new SnapshotError('missing');
  const data = await response.json().catch(() => null);
  if (!data?.state?.modelId) throw new SnapshotError('missing');
  return data;
}

// Скачивает растр с реальным процентом, если сервер назвал размер.
async function download(url, onProgress) {
  const response = await fetch(url, { credentials: 'omit' });
  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  const total = Number(response.headers.get('Content-Length')) || 0;
  if (!response.body || !total) {
    onProgress?.(null);
    return response.blob();
  }
  const reader = response.body.getReader();
  const chunks = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    onProgress?.(loaded / total);
  }
  return new Blob(chunks, { type: response.headers.get('Content-Type') ?? '' });
}

// Растры дизайна → { textureUrl, unwrapUrl } (blob:). При 400/403 (истёк
// TTL подписи) — один повторный запрос snapshot за свежими ссылками.
// key — design (главный стакан) или design2 (второй стакан «Фотореала»).
export async function downloadDesign(token, snapshot, onProgress, key = 'design') {
  let design = snapshot[key];
  if (!design) return null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const same = design.textureUrl === design.unwrapUrl;
      const texture = await download(design.textureUrl, (share) => onProgress?.(share == null ? null : same ? share : share / 2));
      const unwrap = same ? texture : await download(design.unwrapUrl, (share) => onProgress?.(share == null ? null : 0.5 + share / 2));
      const textureUrl = URL.createObjectURL(texture);
      return { textureUrl, unwrapUrl: same ? textureUrl : URL.createObjectURL(unwrap) };
    } catch (error) {
      if (attempt === 0 && (error.status === 400 || error.status === 403)) {
        design = (await fetchSnapshot(token))[key];
        if (design) continue;
      }
      throw new SnapshotError('expired');
    }
  }
  throw new SnapshotError('expired');
}
