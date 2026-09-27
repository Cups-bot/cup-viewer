// Последний макет главного стакана — в IndexedDB этого браузера: после
// перезагрузки страницы и при смене стакана он кладётся заново. Файл никуда
// не уходит (как и раньше, §6) — это только память вкладки, пережившая
// перезагрузку. Хранилища нет (приватный режим, запрет) — просто не помним.
//
// source — { kind: 'file', file } | { kind: 'sides', sides: { A: File|null, B: File|null } }.

const DB = 'cupviewer';
const STORE = 'design';
const KEY = 'hero';

function open() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function run(mode, action) {
  const db = await open();
  try {
    return await new Promise((resolve, reject) => {
      const request = action(db.transaction(STORE, mode).objectStore(STORE));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

export const saveDesignSource = (source) => run('readwrite', (store) => store.put(source, KEY)).catch(() => {});
export const clearDesignSource = () => run('readwrite', (store) => store.delete(KEY)).catch(() => {});
export const loadDesignSource = () => run('readonly', (store) => store.get(KEY)).catch(() => null);
