// Последние макеты главного стакана — в IndexedDB этого браузера: после
// перезагрузки страницы и при смене стакана они кладутся заново. Файл никуда
// не уходит (как и раньше, §6) — это только память вкладки, пережившая
// перезагрузку. Хранилища нет (приватный режим, запрет) — просто не помним.
//
// Запись по ключу: «hero» — готовый макет, «hero-rect» — рисунок в
// прямоугольнике SIZE (у каждого вида свой файл).
// source — { kind: 'file', file } | { kind: 'sides', sides: { A: File|null, B: File|null } }
//        | { kind: 'template', file, as } | { kind: 'rect', file, placement }.

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

export const saveDesignSource = (source, key = KEY) => run('readwrite', (store) => store.put(source, key)).catch(() => {});
export const clearDesignSource = (key = KEY) => run('readwrite', (store) => store.delete(key)).catch(() => {});
export const loadDesignSource = (key = KEY) => run('readonly', (store) => store.get(key)).catch(() => null);
