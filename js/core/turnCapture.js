// Выгрузка полного оборота: ролик и, по желанию, кадры через каждые 45°.
//
// Модуль не знает ни про Three.js, ни про Viewer: ему передают три функции —
// «поставь такой угол», «нарисуй кадр», «сообщи о ходе дела». Всё остальное он
// делает сам. Так же устроен и снимок сцены: рендером владеет Viewer, а сборкой
// файла — отдельный код.
//
// ── Почему кадр пересобирается, а не снимается с холста напрямую ──────────
// Холст просмотрщика прозрачный: фон рисует CSS, иначе тонмаппинг перекрасил бы
// заливку (см. core/backdrop.js). Снять поток прямо с него — получить стакан на
// пустоте, а прозрачность в видео превращается в чёрный прямоугольник. Поэтому
// рядом живёт обычный 2D-холст: на него кладётся тот же фон, сверху — кадр
// сцены, и уже с него пишется видео и снимаются фотографии.
//
// ── Почему поворот считается по часам, а не по номеру кадра ───────────────
// MediaRecorder пишет в реальном времени: он не ждёт, пока мы отрисуем
// следующий кадр. Если считать угол по счётчику кадров, то на слабом телефоне
// оборот растянется на пятнадцать секунд вместо шести. Угол берётся от
// прошедшего времени — тогда ролик всегда нужной длины, а просадка кадров
// выглядит просто как менее плавное вращение.
//
// ── Почему кадры гонит таймер, а не requestAnimationFrame ─────────────────
// requestAnimationFrame привязан к выводу картинки на экран. Пока окно на
// виду, разницы нет, но стоит его перекрыть другим окном, свернуть или открыть
// страницу во встроенном браузере, который на экран ничего не выводит, — и
// вызовы приходят раз в секунду или не приходят совсем. Ролик при этом
// записывается положенные шесть секунд, только вместо вращения в нём почти
// неподвижная картинка; проверено — за шесть секунд доходило семь кадров.
//
// Записи экран не нужен: кадр собирается на своём холсте и уходит в поток
// независимо от того, показывают его кому-нибудь или нет. Поэтому шаг задаёт
// setTimeout, а не отрисовка окна.

import { paintBackdrop } from './backdrop.js';

// Контейнеры для ролика в порядке предпочтения.
//
// mp4 первым намеренно: его открывает что угодно, включая «Просмотр» на macOS,
// стандартный проигрыватель Windows и вложение в письме. webm умеют не все
// (в частности, Safari до 18 и старые версии Windows Media Player), поэтому он
// запасной — но лучше, чем ничего.
const VIDEO_TYPES = [
  { mime: 'video/mp4;codecs=avc1.42E01E', ext: 'mp4' },
  { mime: 'video/mp4', ext: 'mp4' },
  { mime: 'video/webm;codecs=vp9', ext: 'webm' },
  { mime: 'video/webm;codecs=vp8', ext: 'webm' },
  { mime: 'video/webm', ext: 'webm' },
];

// Какой контейнер умеет этот браузер. null — записывать нечем.
export function pickVideoType() {
  if (typeof MediaRecorder === 'undefined') return null;
  for (const candidate of VIDEO_TYPES) {
    if (MediaRecorder.isTypeSupported?.(candidate.mime)) return candidate;
  }
  return null;
}

// Холст, на котором кадр собирается заново: фон плюс сцена.
//
// Стороны округляются вниз до чётных. H.264 кодирует картинку блоками 16×16 и
// нечётную сторону не принимает: запись в mp4 на холсте шириной 1023 пикселя
// не начиналась бы вовсе, причём молча.
function createCompositor(source, backdrop) {
  const width = Math.max(2, source.width - (source.width % 2));
  const height = Math.max(2, source.height - (source.height % 2));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  return {
    canvas,
    draw() {
      paintBackdrop(ctx, width, height, backdrop);
      ctx.drawImage(source, 0, 0);
    },
  };
}

function canvasBlob(canvas, type = 'image/png') {
  return new Promise((resolve) => {
    try {
      canvas.toBlob((blob) => resolve(blob), type);
    } catch (error) {
      console.error(error);
      resolve(null);
    }
  });
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Максимальный шаг записи (мс). Тот же приём, что в цикле отрисовки Viewer:
// длинный простой не должен одним рывком провернуть модель.
const MAX_CAPTURE_STEP = 250;

// Записывает один полный оборот от текущего угла. Возвращает Blob с роликом.
async function recordTurn({ compositor, type, settings, startAngle, setAngle, renderFrame, onProgress }) {
  const { fps, bitrate, duration } = settings;

  const stream = compositor.canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, {
    mimeType: type.mime,
    videoBitsPerSecond: bitrate,
  });

  const chunks = [];
  recorder.addEventListener('dataavailable', (event) => {
    if (event.data?.size) chunks.push(event.data);
  });

  // Готовый файл собирается только после stop: до этого момента у нас на руках
  // куски произвольной длины, склеивать которые рано.
  const finished = new Promise((resolve, reject) => {
    recorder.addEventListener('stop', resolve, { once: true });
    recorder.addEventListener(
      'error',
      (event) => reject(event.error ?? new Error('Запись прервана')),
      { once: true },
    );
  });

  // Первый кадр должен быть на холсте до старта записи: пустой белый кадр в
  // начале ролика заметен, а стоит он одной строчки.
  setAngle(startAngle);
  renderFrame();
  compositor.draw();

  recorder.start();
  const frameMs = 1000 / fps;
  const total = duration * 1000;

  // Время оборота копится по шагам, а не берётся как «сейчас минус старт».
  // Разница принципиальная: копится только то время, когда вкладку реально
  // показывали, — см. паузу ниже.
  let elapsed = 0;
  let last = performance.now();

  await new Promise((resolve) => {
    const step = () => {
      const now = performance.now();

      // Вкладка в фоне — стоит и запись, и отсчёт. Иначе MediaRecorder писал бы
      // реальное время и в ролике остался бы застывший кадр ровно на столько,
      // на сколько человек отвлёкся.
      //
      // Пауза ставится отсюда, а не по событию visibilitychange: событие
      // сообщает только о СМЕНЕ состояния, и запись, начатая в уже скрытой
      // вкладке, паузы бы не увидела — отсчёт улетел бы вперёд, а оборот
      // схлопнулся в один кадр. Проверено, ровно так и выходило.
      if (document.hidden) {
        if (recorder.state === 'recording') recorder.pause();
        last = now;
        setTimeout(step, 200);
        return;
      }
      if (recorder.state === 'paused') recorder.resume();

      // Шаг ограничен сверху: если кадры почему-то перестали доходить (окно
      // перекрыто, вкладка подтормаживает), оборот растянется по времени, но
      // останется плавным. Без ограничения простой отдался бы одной дельтой и
      // стакан перепрыгнул бы полкруга.
      elapsed += Math.min(now - last, MAX_CAPTURE_STEP);
      last = now;

      const progress = Math.min(elapsed / total, 1);
      setAngle(startAngle + progress * 360);
      renderFrame();
      compositor.draw();
      onProgress?.(progress);

      if (progress >= 1) {
        resolve();
        return;
      }
      // Следующий кадр — по расписанию, а не «через 33 мс после этого»: иначе
      // время отрисовки прибавлялось бы к шагу и частота проседала.
      setTimeout(step, Math.max(0, frameMs - (performance.now() - now)));
    };
    step();
  });

  // Пауза перед остановкой. Поток забирает кадры с холста по своему таймеру, и
  // stop сразу после отрисовки обрубает последний кадр: ролик заканчивался на
  // 350° и в зацикленном виде дёргался.
  await wait(Math.ceil(1000 / fps) + 60);

  recorder.stop();
  await finished;
  stream.getTracks().forEach((track) => track.stop());

  return new Blob(chunks, { type: type.mime });
}

// Снимает кадры через равные углы. Угол здесь абсолютный, от нуля модели, а не
// от того, что сейчас на экране: набор должен быть одинаковым при каждой
// выгрузке, и имя файла обязано соответствовать реальному повороту.
async function shootPhotos({ compositor, step, prefix, setAngle, renderFrame, onProgress }) {
  // Шаг приводим к целому числу кадров на оборот: 45° → 8, 50° → 7 по 51,4°.
  // Иначе последний кадр совпал бы с первым или до него не хватило бы места.
  const count = Math.max(1, Math.round(360 / step));
  const exact = 360 / count;
  const files = [];

  for (let index = 0; index < count; index += 1) {
    const angle = index * exact;
    setAngle(angle);
    renderFrame();
    compositor.draw();

    const blob = await canvasBlob(compositor.canvas);
    if (blob) {
      const degrees = String(Math.round(angle)).padStart(3, '0');
      files.push({
        name: `${prefix}-${degrees}.png`,
        data: new Uint8Array(await blob.arrayBuffer()),
      });
    }
    onProgress?.((index + 1) / count);
  }

  return files;
}

// Полная выгрузка оборота.
//
// Возвращает { video, photos } — Blob ролика и массив кадров { name, data }.
// Ролик может оказаться null: браузер без MediaRecorder (Safari до 14.1,
// встроенные вебвью старых Android) кадры всё равно отдаст.
export async function captureTurn({
  source,
  backdrop,
  settings,
  startAngle,
  setAngle,
  renderFrame,
  photos = false,
  onProgress,
}) {
  const compositor = createCompositor(source, backdrop);
  const type = pickVideoType();

  // Доли общего хода: запись длится секунды, съёмка кадров — доли секунды,
  // поэтому вес у них разный. Без ролика все сто процентов достаются кадрам.
  const videoShare = type ? (photos ? 0.85 : 1) : 0;

  let video = null;
  if (type) {
    video = await recordTurn({
      compositor,
      type,
      settings,
      startAngle,
      setAngle,
      renderFrame,
      onProgress: (value) => onProgress?.(value * videoShare, 'Запись оборота'),
    });
  }

  let frames = [];
  if (photos) {
    frames = await shootPhotos({
      compositor,
      step: settings.photoStep,
      prefix: settings.name,
      setAngle,
      renderFrame,
      onProgress: (value) =>
        onProgress?.(videoShare + value * (1 - videoShare), 'Съёмка кадров'),
    });
  }

  return { video, videoExt: type?.ext ?? null, photos: frames };
}
