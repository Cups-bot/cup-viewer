// Сборка ZIP-архива в браузере, без библиотек.
//
// Зачем вообще архив. Выгрузка оборота отдаёт девять файлов: ролик и восемь
// кадров. Скачивать их по одному нельзя — браузеры считают вторую и следующие
// загрузки подряд подозрительными: Chrome показывает предупреждение «сайт
// пытается скачать несколько файлов», Safari просто отбрасывает лишние. Один
// архив — одна загрузка и ни одного вопроса пользователю.
//
// Почему свой код, а не готовая библиотека. Здесь нужен ровно один сценарий:
// сложить рядом несколько уже сжатых файлов (PNG и видео сжимать повторно
// бессмысленно — они не уменьшатся). Это метод STORE, то есть «положить как
// есть»: три заголовка и контрольная сумма, около сотни строк. Библиотека
// (JSZip — 100 КБ) тянула бы ещё и полный Deflate, который здесь не нужен.
//
// Формат: APPNOTE.TXT 6.3.4, разделы 4.3.7 (локальный заголовок),
// 4.3.12 (центральный каталог), 4.3.16 (конец каталога).

// Таблица CRC-32 (полином 0xEDB88320) — считается один раз при загрузке модуля.
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Дата и время в формате MS-DOS: два 16-битных поля, как их ждёт ZIP.
// Секунды хранятся с шагом 2 — отсюда сдвиг вправо, год отсчитывается от 1980.
function dosStamp(date) {
  const year = Math.max(date.getFullYear(), 1980);
  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1),
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
  };
}

// Имена файлов внутри архива держим в ASCII: иначе пришлось бы поднимать флаг
// UTF-8 и надеяться на распаковщик. Все имена мы задаём сами (js/config.js →
// turnExport.name), так что ограничение ни на что не влияет.
function asciiName(name) {
  // eslint-disable-next-line no-control-regex
  return name.replace(/[^\x20-\x7e]/g, '_');
}

// Собирает архив из [{ name, data: Uint8Array }] и возвращает Blob.
//
// Порядок в файле: подряд все записи (заголовок + содержимое), затем каталог с
// повтором тех же данных и ссылкой на смещение каждой записи, затем хвост.
// Распаковщик читает архив с конца — по хвосту находит каталог, по каталогу —
// файлы.
export function createZip(files) {
  const encoder = new TextEncoder();
  const stamp = dosStamp(new Date());

  const entries = files.map((file) => ({
    name: encoder.encode(asciiName(file.name)),
    data: file.data,
    crc: crc32(file.data),
  }));

  const parts = [];
  const directory = [];
  let offset = 0;

  for (const entry of entries) {
    const header = new DataView(new ArrayBuffer(30));
    header.setUint32(0, 0x04034b50, true); // сигнатура локального заголовка
    header.setUint16(4, 20, true); // минимальная версия распаковщика — 2.0
    header.setUint16(6, 0, true); // флаги
    header.setUint16(8, 0, true); // метод сжатия: 0 = STORE
    header.setUint16(10, stamp.time, true);
    header.setUint16(12, stamp.date, true);
    header.setUint32(14, entry.crc, true);
    header.setUint32(18, entry.data.length, true); // сжатый размер
    header.setUint32(22, entry.data.length, true); // исходный размер
    header.setUint16(26, entry.name.length, true);
    header.setUint16(28, 0, true); // extra field

    parts.push(header.buffer, entry.name, entry.data);

    const record = new DataView(new ArrayBuffer(46));
    record.setUint32(0, 0x02014b50, true); // сигнатура записи каталога
    record.setUint16(4, 20, true); // версия, которой создан архив
    record.setUint16(6, 20, true); // минимальная версия распаковщика
    record.setUint16(8, 0, true);
    record.setUint16(10, 0, true);
    record.setUint16(12, stamp.time, true);
    record.setUint16(14, stamp.date, true);
    record.setUint32(16, entry.crc, true);
    record.setUint32(20, entry.data.length, true);
    record.setUint32(24, entry.data.length, true);
    record.setUint16(28, entry.name.length, true);
    record.setUint16(30, 0, true); // extra field
    record.setUint16(32, 0, true); // комментарий
    record.setUint16(34, 0, true); // номер диска
    record.setUint16(36, 0, true); // внутренние атрибуты
    record.setUint32(38, 0, true); // внешние атрибуты
    record.setUint32(42, offset, true); // где лежит локальный заголовок

    directory.push(record.buffer, entry.name);
    offset += 30 + entry.name.length + entry.data.length;
  }

  const directorySize = directory.reduce((sum, part) => sum + part.byteLength, 0);

  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true); // сигнатура хвоста
  end.setUint16(4, 0, true); // номер диска
  end.setUint16(6, 0, true); // диск с началом каталога
  end.setUint16(8, entries.length, true); // записей на этом диске
  end.setUint16(10, entries.length, true); // записей всего
  end.setUint32(12, directorySize, true);
  end.setUint32(16, offset, true); // смещение каталога от начала файла
  end.setUint16(20, 0, true); // комментарий к архиву

  return new Blob([...parts, ...directory, end.buffer], { type: 'application/zip' });
}
