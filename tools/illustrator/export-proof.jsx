// export-proof.jsx
// -----------------------------------------------------------------------------
// Illustrator -> Photoshop, без единого вопроса: растрирует активный документ в
// CMYK, назначает профиль бумаги (числа CMYK сохраняются) и печёт имитацию цвета
// бумаги в sRGB PNG (Convert to Profile, Absolute Colorimetric, без Black Point
// Compensation). Готовый PNG идёт в текстуры вьювера.
//
// Тип бумаги берётся из задания, а не спрашивается: рядом с макетом лежит папка
// In с файлом args.txt, например
//
//   132576 браславские озера CT DW80-280
//   DW80-280
//   offset
//   coated
//   coating:color_touch
//
// Правило: строка coating:… или CT / ST в названии — мелованная с лаком;
// иначе берётся строка coated / uncoated.
//
// Перед экспортом документ приводится к тому же виду, что и мокап в
// 1_DW_Export.jsx: видимым остаётся только слой Conus, а под всей иерархией
// заводится временный слой с белой заливкой по артборду. Оба вмешательства
// живут ровно до конца экспорта PSD и откатываются — на диск они не попадают.
// Результат ложится рядом с макетом в папку Mockup под именем
// img_mokup_<суффикс бумаги>.
//
// Установка: File > Scripts > Other Script...  (или положить в папку
// Illustrator/Presets/<lang>/Scripts, чтобы появился в File > Scripts).
//
// Требуется: сохранённый документ Illustrator и установленный Photoshop.
// -----------------------------------------------------------------------------

#target illustrator

(function () {
  // --- Настройки -------------------------------------------------------------
  // Профили можно задавать именем файла, полным путём или описанием из списка
  // Photoshop. При первом запуске эти значения записываются в файл настроек
  // (путь — в логе), дальше правятся там: обновление скрипта их не тронет.

  var DEFAULTS = {
    dpi: 300,
    dest: 'sRGB IEC61966-2.1',   // целевой профиль (как его видит Photoshop)
    out: '',                     // пусто => рядом с макетом
    papers: [
      { key: 'coated',   label: 'Мелованная',       profile: 'glossy_curve+blended.icm',   suffix: 'coated'   },
      { key: 'uncoated', label: 'Немелованная',     profile: 'novd_backside_blended7.icm', suffix: 'uncoated' },
      { key: 'varnish',  label: 'Мелованная + лак', profile: 'matte_forged_6.icm',         suffix: 'varnish'  }
    ]
  };

  // Куда и под каким именем ложится готовая картинка. Совпадает с мокапом из
  // 1_DW_Export.jsx: подпапка Mockup рядом с макетом, имя img_mokup + суффикс
  // бумаги. Пустая строка в SUBFOLDER — класть прямо в папку вывода.
  var OUT_SUBFOLDER = 'Mockup';
  var OUT_BASENAME  = 'img_mokup';
  var OUT_FORMAT    = 'png';   // 'png' или 'jpg'
  var JPG_QUALITY   = 12;      // 0–12, только для 'jpg'

  // Слои макета — те же имена, что и в 1_DW_Export.jsx. В прооф уходит только
  // Conus: Info и Masks (и всё прочее) гасятся на время экспорта.
  var LAYERS = { info: 'Info', conus: 'Conus', masks: 'Masks' };

  // Временный слой с белой подложкой. Имя со служебным префиксом: по нему же
  // подчищаются хвосты, если прошлый прогон оборвался на середине.
  var BG_LAYER_NAME = '__proof_white_bg';
  var BG_BLEED_PT   = 1;   // на сколько пунктов вылезти за артборд, чтобы по
                           // краю не осталось полупрозрачной каймы

  // Показывать окно, если прогон сорвался. Успех проходит молча в любом случае.
  var SHOW_ERRORS = true;

  // Где искать задание относительно папки макета и насколько высоко подниматься.
  var ARGS_PATH = 'In/args.txt';
  var ARGS_LOOKUP_DEPTH = 4;

  var SETTINGS_FILE = new File(Folder.userData.fsName + '/cup-viewer-export-proof.txt');
  var LOG_FILE = new File(Folder.temp.fsName + '/export-proof.log');

  // --- Состояние -------------------------------------------------------------

  var settings = loadSettings();
  var profileCache = null;   // список установленных профилей, читается один раз
  var log = [];
  var undoStack = [];        // что тронули в документе — чтобы вернуть как было

  // --- Ход дела --------------------------------------------------------------

  if (app.documents.length === 0) {
    fail('Нет открытого документа Illustrator.');
    return;
  }

  var doc = app.activeDocument;
  note('Документ: ' + doc.name);

  var srcDir = null;
  try { srcDir = doc.path; } catch (e) { srcDir = null; }
  if (!srcDir || !srcDir.exists) {
    fail('Документ не сохранён на диск — рядом с ним нечего искать.\n' +
         'Сохрани макет и запусти снова.');
    return;
  }
  note('Папка макета: ' + srcDir.fsName);

  var argsFile = findArgsFile(srcDir);
  if (!argsFile) {
    fail('Не найден файл задания «' + ARGS_PATH + '».\n\n' +
         'Искал рядом с макетом и на ' + ARGS_LOOKUP_DEPTH + ' уровня выше:\n' +
         srcDir.fsName);
    return;
  }
  note('Задание: ' + argsFile.fsName);

  var job = readArgs(argsFile);
  if (!job) {
    fail('Не удалось прочитать задание:\n' + argsFile.fsName);
    return;
  }
  note('Название: ' + job.name);
  note('Артикул: ' + (job.sku || '—') + ', печать: ' + (job.method || '—') +
       ', бумага: ' + (job.paper || '—') + ', лак: ' + (job.coating || '—'));

  var choice = pickPaper(job);
  if (!choice.paper) {
    fail('В задании не сказано, какая бумага.\n\n' + argsFile.fsName +
         '\n\nЖду строку coated или uncoated.');
    return;
  }
  note('Бумага: ' + choice.paper.label + ' (' + choice.reason + ')');

  var paper = choice.paper;

  // Photoshop понимает только ОПИСАНИЕ профиля («Profile» в Convert to Profile),
  // а не имя .icm-файла. Разбираемся здесь, чтобы не ловить немую ошибку внутри
  // BridgeTalk.
  var resolved = resolveProfile(paper.profile);
  if (!resolved.name) {
    fail('Профиль для «' + paper.label + '» не найден: ' + paper.profile +
         '\n\n' + resolved.note + '\n\nПрофили задаются в файле настроек:\n' +
         SETTINGS_FILE.fsName);
    return;
  }
  // Длину пишем не для красоты: по ней видно, не затёк ли в описание мусор из
  // тега профиля. Класс и пространство — чтобы не гадать над немой ошибкой
  // «Параметры команды Назначить профиль недействительны».
  note('Профиль: «' + resolved.name + '» (' + resolved.name.length + ' симв.) [' +
       resolved.note + ']' +
       (resolved.cls ? ', класс ' + resolved.cls : '') +
       (resolved.space ? ', пространство ' + resolved.space : ''));

  // Назначить документу можно только обычный профиль устройства. DeviceLink,
  // abstract и named color описывают преобразование, а не пространство — Assign
  // Profile их не принимает.
  if (resolved.cls === 'link' || resolved.cls === 'abst' || resolved.cls === 'nmcl') {
    fail('Профиль «' + resolved.name + '» — это ' +
         (resolved.cls === 'link' ? 'DeviceLink' : resolved.cls === 'abst' ? 'abstract' : 'named color') +
         '-профиль (класс ' + resolved.cls + ').\n\n' +
         'Такой нельзя назначить документу: он описывает преобразование, а не ' +
         'цветовое пространство. Нужен обычный профиль печати (класс prtr).\n\n' +
         'Профили задаются в файле настроек:\n' + SETTINGS_FILE.fsName);
    return;
  }

  // PSD уходит в CMYK — профиль обязан быть того же пространства.
  if (resolved.space && resolved.space !== 'CMYK') {
    fail('Профиль «' + resolved.name + '» описывает пространство ' + resolved.space +
         ', а макет уходит в Photoshop как CMYK.\n\n' +
         'Assign Profile такое сочетание не принимает. Проверь, тот ли файл ' +
         'прописан для «' + paper.label + '»:\n' + SETTINGS_FILE.fsName);
    return;
  }

  var target = BridgeTalk.getSpecifier('photoshop');
  if (!target) {
    fail('Photoshop не найден. BridgeTalk не видит установленную копию.');
    return;
  }
  note('Photoshop: ' + target + (BridgeTalk.isRunning(target) ? ' (запущен)' : ' (не запущен, будет поднят)'));

  var baseOutDir = settings.out ? new Folder(settings.out) : srcDir;
  var outDir = OUT_SUBFOLDER
    ? new Folder(baseOutDir.fsName + '/' + OUT_SUBFOLDER)
    : baseOutDir;
  if (!outDir.exists && !outDir.create()) {
    fail('Не удалось создать папку для картинки:\n' + outDir.fsName +
         '\n\nПоправь строку out= в файле настроек:\n' + SETTINGS_FILE.fsName);
    return;
  }
  note('Папка вывода: ' + outDir.fsName);

  // Через Photoshop гоняем только ASCII-имена во временной папке, а готовый PNG
  // переносим на место уже средствами Illustrator. Имя документа и путь к папке
  // бывают кириллическими, и в чужом процессе такой путь до файла не доводит.
  var stamp = new Date().getTime();
  var ext = (String(OUT_FORMAT).toLowerCase() === 'jpg') ? 'jpg' : 'png';
  var psd = new File(Folder.temp.fsName + '/export-proof-' + stamp + '.psd');
  var pngTemp = new File(Folder.temp.fsName + '/export-proof-' + stamp + '.' + ext);
  var pngFinal = new File(outDir.fsName + '/' + OUT_BASENAME + '_' + paper.suffix + '.' + ext);
  note('Файл вывода: ' + pngFinal.fsName);

  // 1) Illustrator -> плоский CMYK PSD. Профиль печати назначим уже в Photoshop,
  //    поэтому здесь важен только режим CMYK и сохранность чисел. Профиль НЕ
  //    вкладываем: с вложенным Photoshop по умолчанию спрашивает про несовпадение
  //    профилей и останавливается на модальном окне, а нетегированный CMYK
  //    открывается молча — и мы всё равно назначаем свой профиль следующим шагом.
  //
  //    Перед экспортом документ приводится к виду мокапа: гасим всё, кроме
  //    Conus, и подкладываем белый прямоугольник в самый низ. Обе правки
  //    откатываются в finally — что бы ни случилось внутри, документ на экране
  //    остаётся таким же, каким его открыли.
  dropStaleBackground();

  var bgLayer = null;
  var exportError = null;
  try {
    isolateConus();
    bgLayer = addWhiteBackground();

    var opt = new ExportOptionsPhotoshop();
    opt.imageColorSpace = ImageColorSpace.CMYK;
    opt.resolution      = settings.dpi;
    opt.embedICCProfile = false;
    opt.antiAliasing    = true;
    opt.writeLayers     = false; // flatten
    doc.exportFile(psd, ExportType.PHOTOSHOP, opt);
  } catch (e) {
    exportError = e;
  } finally {
    removeLayer(bgLayer);
    undoAll();
  }

  if (exportError) {
    fail('Illustrator не смог экспортировать PSD:\n\n' +
         (exportError && exportError.message ? exportError.message : exportError));
    return;
  }

  psd = new File(psd.fsName); // перечитываем состояние с диска
  if (!psd.exists || psd.length === 0) {
    fail('Illustrator не отдал PSD:\n' + psd.fsName);
    return;
  }
  note('PSD: ' + psd.fsName + ' (' + Math.round(psd.length / 1024) + ' КБ)');

  // 2) Photoshop через BridgeTalk: назначить профиль бумаги (числа CMYK не
  //    меняются) и сконвертировать в sRGB методом Absolute Colorimetric — это и
  //    есть запечённая имитация цвета бумаги и чёрной краски.
  //
  //    Код обёрнут в try/catch и возвращает строку «OK|…» либо «ERR|…»: без
  //    этого ошибка внутри Photoshop гасится молча, и со стороны выглядит так,
  //    будто скрипт просто открыл PSD и остановился.
  //
  //    Все строки едут в процентной кодировке и разворачиваются на той стороне
  //    через decodeURIComponent: тело сообщения остаётся чистым ASCII, а
  //    кириллица в пути или в названии профиля доезжает целой.
  var ps = [
    'var res;',
    'try {',
    '  app.displayDialogs = DialogModes.NO;',
    '  var profile = decodeURIComponent(' + enc(resolved.name) + ');',
    '  var f = new File(decodeURIComponent(' + enc(psd.fsName) + '));',
    // Текст ошибок с этой стороны — латиницей: он едет между процессами через
    // BridgeTalk, и кириллица по дороге превращается в кашу.
    '  if (!f.exists) throw new Error("PSD not found: " + f.fsName);',
    '  var d = app.open(f);',
    '  if (d.mode !== DocumentMode.CMYK) throw new Error("PSD opened as " + d.mode + ", expected CMYK");',
    // Присваивание colorProfileName — это и есть Assign Profile, но у документа
    // без тега (мы экспортируем PSD без вложенного профиля) DOM-свойство
    // валидно только при colorProfileType = CUSTOM, и Photoshop отвечает
    // «параметры команды недействительны». Поэтому сначала переводим документ
    // в CUSTOM, а если и это не проходит — назначаем той же командой меню
    // через Action Manager: она работает в любой версии и на любом теге.
    '  var assigned = false;',
    '  var why = [];',
    '  try { d.colorProfileType = DocumentColorProfileType.CUSTOM; } catch (eT) { why.push("type: " + eT.message); }',
    '  try { d.colorProfileName = profile; assigned = true; } catch (e1) { why.push("dom: " + e1.message); }',
    '  if (!assigned) {',
    '    try { assignByAction(profile); assigned = true; } catch (e2) { why.push("action: " + e2.message); }',
    '  }',
    '  if (!assigned) throw new Error("Assign rejected [" + why.join(" | ") + "] for: " + profile);',
    '  var got = "";',
    '  try { got = String(d.colorProfileName); } catch (e3) { got = "<unreadable>"; }',
    '  if (norm(got) !== norm(profile)) {',
    '    throw new Error("Assign failed. Asked: " + profile + " / document has: " + got);',
    '  }',
    '  d.convertProfile(decodeURIComponent(' + enc(settings.dest) + '), Intent.ABSOLUTECOLORIMETRIC, false, false);',
    '  if (d.mode !== DocumentMode.RGB) throw new Error("Document is not RGB after convert");',
    '  d.flatten();',
    '  if (d.bitsPerChannel !== BitsPerChannelType.EIGHT) d.bitsPerChannel = BitsPerChannelType.EIGHT;',
    '  var out = new File(decodeURIComponent(' + enc(pngTemp.fsName) + '));',
    (ext === 'jpg'
      ? '  var so = new JPEGSaveOptions(); so.quality = ' + JPG_QUALITY + '; d.saveAs(out, so, true);'
      : '  d.saveAs(out, new PNGSaveOptions(), true);'),
    '  d.close(SaveOptions.DONOTSAVECHANGES);',
    '  out = new File(out.fsName);',
    '  if (!out.exists) throw new Error("PNG was not saved: " + out.fsName);',
    '  res = "OK|" + out.length;',
    '} catch (e) {',
    '  try { while (app.documents.length) app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); } catch (e2) {}',
    '  res = "ERR|" + (e && e.message ? e.message : String(e));',
    '}',
    'function norm(s) { return String(s).replace(/\\s+/g, " ").replace(/^ | $/g, "").toLowerCase(); }',
    'function assignByAction(name) {',
    '  var desc = new ActionDescriptor();',
    '  desc.putString(app.charIDToTypeID("Prfl"), name);',
    '  app.executeAction(app.charIDToTypeID("AssgP"), desc, DialogModes.NO);',
    '}',
    'res;'
  ].join('\n');

  var answer = null;

  var bt = new BridgeTalk();
  bt.target = target;
  bt.body   = ps;
  bt.onResult  = function (message) { answer = String(message && message.body); };
  bt.onError   = function (message) { answer = 'ERR|BridgeTalk: ' + (message && message.body); };
  bt.onTimeout = function () { answer = null; };

  // ВАЖНО: send() с таймаутом — синхронный. Без аргумента отправка асинхронная,
  // и когда скрипт Illustrator заканчивается, колбэки умирают вместе с его
  // контекстом: Photoshop свою часть делает, а ответ приходить уже некуда.
  // Снаружи это выглядит как «открылся PSD и всё».
  note('Отправляю в Photoshop, жду ответа…');
  var delivered = bt.send(600); // секунд: растр 300 dpi конвертируется небыстро

  if (!delivered || answer === null) {
    fail('Photoshop не ответил.\n\nСкорее всего в нём висит модальное окно ' +
         '(профили, шрифты, обновление), которое ждёт ответа.');
    return;
  }

  if (answer.indexOf('OK|') !== 0) {
    try { psd.remove(); } catch (e) {}
    fail('Photoshop не смог доделать:\n\n' +
         (answer.indexOf('ERR|') === 0 ? answer.substring(4) : answer));
    return;
  }

  note('Photoshop отдал PNG: ' + pngTemp.fsName + ' (' + answer.substring(3) + ' Б)');

  // Перенос делаем здесь: имя документа и папка бывают кириллическими, и
  // работать с таким путём должен тот процесс, который его и составил.
  pngTemp = new File(pngTemp.fsName);
  if (!pngTemp.exists) {
    fail('Photoshop отчитался об успехе, но файла нет:\n' + pngTemp.fsName);
    return;
  }
  try { if (pngFinal.exists) pngFinal.remove(); } catch (e) {}
  if (!pngTemp.copy(pngFinal.fsName)) {
    fail('PNG готов, но перенести его не удалось.\n\nЛежит здесь:\n' + pngTemp.fsName +
         '\n\nНе получилось положить сюда:\n' + pngFinal.fsName);
    return;
  }

  note('Готово: ' + pngFinal.fsName);
  writeLog();
  try { psd.remove(); } catch (e) {}
  try { pngTemp.remove(); } catch (e) {}

  // --- Слои и подложка -------------------------------------------------------

  // Правки в документе делаются только через setProp: в стек ложится прежнее
  // значение, и после экспорта откатывается ровно тронутое. Снимок всего
  // документа тут не годится — у слоёв бывают вложенные слои и поштучно скрытые
  // объекты, а вернуть надо всё до последней галочки.
  function setProp(obj, prop, value) {
    try {
      if (obj[prop] === value) return;
      undoStack.push({ obj: obj, prop: prop, value: obj[prop] });
      obj[prop] = value;
    } catch (e) {
      note('Не удалось выставить ' + prop + ': ' + (e && e.message ? e.message : e));
    }
  }

  // В обратном порядке: сначала возвращаем видимость, потом замок — иначе
  // запертый слой не примет правку.
  function undoAll() {
    for (var i = undoStack.length - 1; i >= 0; i--) {
      try { undoStack[i].obj[undoStack[i].prop] = undoStack[i].value; } catch (e) {}
    }
    undoStack = [];
  }

  function findLayer(name) {
    try { return doc.layers.getByName(name); } catch (e) { return null; }
  }

  // Оставляет видимым только Conus — то же состояние, из которого 1_DW_Export.jsx
  // печёт мокап. Если слоя нет, документ уходит как есть: прооф важнее, чем
  // соответствие структуре, а расхождение видно в логе.
  function isolateConus() {
    var conus = findLayer(LAYERS.conus);
    if (!conus) {
      note('Слой «' + LAYERS.conus + '» не найден — экспортирую документ как есть.');
      return;
    }

    var hidden = [];
    for (var i = 0; i < doc.layers.length; i++) {
      var layer = doc.layers[i];
      if (layer.name === LAYERS.conus) continue;
      if (layer.visible) hidden.push(layer.name);
      setProp(layer, 'locked', false);
      setProp(layer, 'visible', false);
    }

    setProp(conus, 'locked', false);
    setProp(conus, 'visible', true);
    showEverythingInside(conus);

    note('Виден только «' + LAYERS.conus + '»' +
         (hidden.length ? ', погашено: ' + hidden.join(', ') : ''));
  }

  // Внутри слоя прячут и объекты (hidden), и вложенные слои (visible). Замок
  // снимаем до того, как трогать содержимое: в запертом слое правка не пройдёт.
  function showEverythingInside(layer) {
    var i;
    for (i = 0; i < layer.layers.length; i++) {
      var sub = layer.layers[i];
      setProp(sub, 'locked', false);
      setProp(sub, 'visible', true);
      showEverythingInside(sub);
    }
    for (i = 0; i < layer.pageItems.length; i++) {
      setProp(layer.pageItems[i], 'hidden', false);
    }
  }

  // Белая подложка под всем содержимым. Нужна только PSD: Illustrator отдаёт
  // плоский растр с прозрачным фоном, а после Assign + Convert to Profile
  // прозрачность в вьювере оборачивается чем угодно, только не бумагой.
  // В макете слой не остаётся — уходит сразу после экспорта.
  function addWhiteBackground() {
    var layer = doc.layers.add();
    layer.name = BG_LAYER_NAME;

    // Самый низ иерархии: под всеми слоями и объектами.
    try { layer.zOrder(ZOrderMethod.SENDTOBACK); }
    catch (e) { layer.move(doc, ElementPlacement.PLACEATEND); }

    // artboardRect: [left, top, right, bottom], ось Y смотрит вверх.
    var ab = doc.artboards[doc.artboards.getActiveArtboardIndex()].artboardRect;
    var b = BG_BLEED_PT;
    var rect = layer.pathItems.rectangle(
      ab[1] + b,                 // top
      ab[0] - b,                 // left
      (ab[2] - ab[0]) + b * 2,   // width
      (ab[1] - ab[3]) + b * 2    // height
    );

    rect.name      = 'white background';
    rect.stroked   = false;
    rect.filled    = true;
    rect.fillColor = whiteColor();

    layer.locked  = false;
    layer.visible = true;

    note('Подложка: белый прямоугольник ' + Math.round(rect.width) + '×' +
         Math.round(rect.height) + ' pt в самом низу.');
    return layer;
  }

  function whiteColor() {
    if (doc.documentColorSpace === DocumentColorSpace.CMYK) {
      var cmyk = new CMYKColor();
      cmyk.cyan = 0; cmyk.magenta = 0; cmyk.yellow = 0; cmyk.black = 0;
      return cmyk;
    }
    var rgb = new RGBColor();
    rgb.red = 255; rgb.green = 255; rgb.blue = 255;
    return rgb;
  }

  function removeLayer(layer) {
    if (!layer) return;
    try {
      layer.locked = false;
      layer.visible = true;
      layer.remove();
    } catch (e) {
      note('Временный слой подложки убрать не вышло: ' + (e && e.message ? e.message : e));
    }
  }

  // Хвост от прогона, который оборвался на экспорте: слой мог остаться в файле.
  function dropStaleBackground() {
    var stale = findLayer(BG_LAYER_NAME);
    if (stale) {
      note('Нашёл подложку от прошлого прогона — убираю.');
      removeLayer(stale);
    }
  }

  // --- Задание ---------------------------------------------------------------

  // Ищет In/args.txt рядом с макетом и выше по дереву: макет может лежать в
  // подпапке заказа, а задание — в корне.
  function findArgsFile(startDir) {
    var dir = startDir;
    for (var level = 0; level <= ARGS_LOOKUP_DEPTH && dir; level++) {
      var candidate = new File(dir.fsName + '/' + ARGS_PATH);
      if (candidate.exists) return candidate;
      dir = dir.parent;
    }
    return null;
  }

  // Разбирает args.txt. Порядок строк не важен: ищем осмысленные, остальные
  // складываем в «прочее» — задание может обрасти полями, ломаться от этого
  // скрипт не должен.
  function readArgs(file) {
    var text = readText(file);
    if (text === null) return null;

    var lines = String(text).split(/\r\n|\r|\n/);
    var job = { name: '', sku: '', method: '', paper: '', coating: '', lines: [] };

    for (var i = 0; i < lines.length; i++) {
      var line = trim(lines[i]);
      if (!line) continue;
      job.lines.push(line);

      var lower = line.toLowerCase();
      var colon = line.indexOf(':');
      if (colon > 0) {
        var key = trim(line.substring(0, colon)).toLowerCase();
        var value = trim(line.substring(colon + 1));
        if (key === 'coating') job.coating = value;
        continue;
      }

      if (lower === 'coated' || lower === 'uncoated') { job.paper = lower; continue; }
      if (lower === 'offset' || lower === 'digital' || lower === 'flexo') { job.method = lower; continue; }
      if (!job.name) { job.name = line; continue; }
      if (!job.sku) { job.sku = line; continue; }
    }

    note('Строк в задании: ' + job.lines.length);
    return job;
  }

  // Читает текст, подбирая кодировку: задание пишется на разных машинах, а
  // ключевые слова в нём латиницей — по ним и понятно, угадали мы или нет.
  function readText(file) {
    var encodings = ['UTF-8', 'windows-1251', 'ASCII'];
    var fallback = null;

    for (var i = 0; i < encodings.length; i++) {
      var text = null;
      try {
        file.encoding = encodings[i];
        if (!file.open('r')) continue;
        text = file.read();
        file.close();
      } catch (e) {
        try { file.close(); } catch (e2) {}
        continue;
      }
      if (text === null) continue;
      if (fallback === null) fallback = text;

      // Кодировка угадана, если ключевые слова читаются и нет мусорных символов.
      if (text.toLowerCase().match(/(^|\n)\s*(coated|uncoated)\s*(\r|\n|$)/) &&
          text.indexOf('\uFFFD') < 0) {
        note('Кодировка задания: ' + encodings[i]);
        return text;
      }
    }
    return fallback;
  }

  // Тип бумаги по заданию. Лак — либо строкой coating:…, либо метками CT / ST
  // в названии (в том числе кириллическими двойниками этих букв).
  function pickPaper(job) {
    if (job.coating) {
      return { paper: paperByKey('varnish'), reason: 'coating:' + job.coating };
    }

    // Метка стоит отдельным словом: «СМУ-88 ST DW80-280» — лак, «ПОСТ» или
    // «СТАКАН» — нет. C и T принимаем и латиницей, и кириллическими двойниками:
    // в названиях заказов они перемешаны.
    var mark = String(job.name).match(/(?:^|[\s_\-.])((?:[CС]|S)[TТ])(?=[\s_\-.]|$)/i);
    if (mark) {
      return { paper: paperByKey('varnish'), reason: 'метка ' + mark[1] + ' в названии' };
    }

    if (job.paper === 'coated')   return { paper: paperByKey('coated'),   reason: 'строка coated' };
    if (job.paper === 'uncoated') return { paper: paperByKey('uncoated'), reason: 'строка uncoated' };
    return { paper: null, reason: 'в задании нет типа бумаги' };
  }

  function paperByKey(key) {
    for (var i = 0; i < settings.papers.length; i++) {
      if (settings.papers[i].key === key) return settings.papers[i];
    }
    return null;
  }

  // --- Настройки -------------------------------------------------------------

  // Читает сохранённые настройки; чего нет — берётся из DEFAULTS. Формат простой,
  // «ключ=значение» построчно: JSON в ExtendScript нет, а тащить парсер ради
  // пяти строк незачем. Файла нет — создаём, чтобы было что править.
  function loadSettings() {
    var s = {
      dpi: DEFAULTS.dpi,
      dest: DEFAULTS.dest,
      out: DEFAULTS.out,
      papers: []
    };
    for (var i = 0; i < DEFAULTS.papers.length; i++) {
      var p = DEFAULTS.papers[i];
      s.papers.push({ key: p.key, label: p.label, profile: p.profile, suffix: p.suffix });
    }

    if (!SETTINGS_FILE.exists) {
      saveSettings(s);
      return s;
    }

    var text = '';
    try {
      SETTINGS_FILE.encoding = 'UTF-8';
      if (!SETTINGS_FILE.open('r')) return s;
      text = SETTINGS_FILE.read();
      SETTINGS_FILE.close();
    } catch (e) {
      try { SETTINGS_FILE.close(); } catch (e2) {}
      return s;
    }

    var lines = String(text).split(/\r\n|\r|\n/);
    for (var j = 0; j < lines.length; j++) {
      var line = lines[j];
      if (!line || line.charAt(0) === '#') continue;
      var eq = line.indexOf('=');
      if (eq < 1) continue;
      var key = trim(line.substring(0, eq));
      var value = trim(line.substring(eq + 1));

      if (key === 'dpi') { var n = parseInt(value, 10); if (n > 0) s.dpi = n; continue; }
      if (key === 'dest') { if (value) s.dest = value; continue; }
      if (key === 'out')  { s.out = value; continue; }
      for (var k = 0; k < s.papers.length; k++) {
        if (s.papers[k].key === key && value) s.papers[k].profile = value;
      }
    }
    return s;
  }

  function saveSettings(s) {
    try {
      var lines = ['# Настройки export-proof.jsx.',
                   '# profile: имя .icm, полный путь или описание из списка Photoshop.',
                   '# out: куда класть PNG; пусто — рядом с макетом.',
                   'dpi=' + s.dpi,
                   'dest=' + s.dest,
                   'out=' + s.out];
      for (var i = 0; i < s.papers.length; i++) {
        lines.push(s.papers[i].key + '=' + s.papers[i].profile);
      }
      SETTINGS_FILE.encoding = 'UTF-8';
      if (!SETTINGS_FILE.open('w')) return false;
      SETTINGS_FILE.write(lines.join('\n') + '\n');
      SETTINGS_FILE.close();
      return true;
    } catch (e) {
      try { SETTINGS_FILE.close(); } catch (e2) {}
      return false;
    }
  }

  // --- Профили ---------------------------------------------------------------

  // Приводит запись из настроек к описанию профиля, которое понимает Photoshop.
  // Принимает путь к файлу, имя файла или готовое описание.
  function resolveProfile(wanted) {
    var value = trim(String(wanted));
    if (!value) return { name: null, note: 'Профиль не задан.' };

    // 1) Полный путь — самый однозначный случай.
    if (value.indexOf('/') >= 0 || value.indexOf('\\') >= 0) {
      var direct = new File(value);
      if (direct.exists) {
        var info = readProfileInfo(direct);
        if (info && info.name) {
          return { name: info.name, space: info.space, cls: info.cls,
                   note: 'Файл: ' + direct.fsName };
        }
        return { name: null, note: 'Файл найден (' + direct.fsName +
                 '), но описание внутри прочитать не удалось.' };
      }
    }

    var profiles = listProfiles();
    var lower = value.toLowerCase();

    // 2) Совпадение по имени файла.
    for (var i = 0; i < profiles.length; i++) {
      if (profiles[i].fileName.toLowerCase() === lower) {
        if (profiles[i].name) {
          return { name: profiles[i].name, space: profiles[i].space, cls: profiles[i].cls,
                   note: 'Файл: ' + profiles[i].path };
        }
        return { name: null, note: 'Файл найден (' + profiles[i].path +
                 '), но описание внутри прочитать не удалось.' };
      }
    }

    // 3) Совпадение по описанию внутри профиля.
    for (var j = 0; j < profiles.length; j++) {
      if (profiles[j].name && profiles[j].name.toLowerCase() === lower) {
        return { name: profiles[j].name, space: profiles[j].space, cls: profiles[j].cls,
                 note: 'Файл: ' + profiles[j].path };
      }
    }

    // 4) Ни то, ни другое.
    if (lower.match(/\.(icc|icm)$/)) {
      return { name: null, note: 'Среди ' + profiles.length +
               ' профилей системы файла с таким именем нет. Установи профиль ' +
               '(macOS: ~/Library/ColorSync/Profiles, Windows: правый клик по .icm → ' +
               '«Установить профиль»).' };
    }
    return { name: value, note: 'Считаем строку описанием профиля.' };
  }

  // Все установленные профили: путь, имя файла, описание, цветовое пространство.
  // Список читается один раз за запуск — сканирование папок не бесплатное.
  function listProfiles() {
    if (profileCache) return profileCache;

    var dirs = [
      new Folder('~/Library/ColorSync/Profiles'),
      new Folder('/Library/ColorSync/Profiles'),
      new Folder('/System/Library/ColorSync/Profiles'),
      new Folder(Folder.system.fsName + '/spool/drivers/color'),
      new Folder(Folder.system.fsName + '/System32/spool/drivers/color'),
      new Folder('C:/Windows/System32/spool/drivers/color')
    ];

    var out = [];
    var seen = {};
    for (var i = 0; i < dirs.length; i++) {
      if (!dirs[i].exists) continue;
      var files = dirs[i].getFiles(/\.(icc|icm)$/i) || [];
      for (var j = 0; j < files.length; j++) {
        var key = String(files[j].fsName).toLowerCase();
        if (seen[key]) continue;
        seen[key] = true;

        var info = readProfileInfo(files[j]);
        out.push({
          path: files[j].fsName,
          fileName: decodeURI(files[j].name),
          name: info ? info.name : null,
          space: info ? info.space : '',
          cls: info ? info.cls : ''
        });
      }
    }

    profileCache = out;
    return out;
  }

  // Читает из ICC-файла описание (тег desc) и цветовое пространство. Файл не
  // вычитывается целиком: профили бывают по нескольку мегабайт, а нужны сотня
  // байт заголовка и один тег.
  function readProfileInfo(file) {
    try {
      file.encoding = 'BINARY';
      if (!file.open('r')) return null;

      var head = file.read(132);
      if (!head || head.length < 132) { file.close(); return null; }

      var cls = trim(head.substr(12, 4));            // 'prtr', 'mntr', 'link', 'abst'…
      var space = trim(head.substr(16, 4));          // 'CMYK', 'RGB ', 'GRAY'…
      var tagCount = u32(head, 128);
      if (tagCount <= 0 || tagCount > 1000) { file.close(); return null; }

      var table = file.read(tagCount * 12);
      var off = 0, size = 0;
      for (var i = 0; i < tagCount; i++) {
        var p = i * 12;
        if (table.substr(p, 4) === 'desc') {
          off = u32(table, p + 4);
          size = u32(table, p + 8);
          break;
        }
      }

      var name = null;
      if (off > 0 && size > 0 && size < 1048576) {
        file.seek(off, 0);
        name = parseDescTag(file.read(size));
      }
      file.close();
      return { name: name, space: space, cls: cls };
    } catch (e) {
      try { file.close(); } catch (e2) {}
      return null;
    }
  }

  // Тег desc бывает двух видов: 'desc' (ICC v2, ASCII) и 'mluc' (ICC v4, UTF-16BE).
  function parseDescTag(tag) {
    if (!tag || tag.length < 12) return null;
    var type = tag.substr(0, 4);

    if (type === 'desc') {
      var len = u32(tag, 8);
      if (len <= 0 || len > tag.length) len = tag.length - 12;
      return orNull(clean(tag.substr(12, len)));
    }
    if (type === 'mluc') {
      if (tag.length < 28) return null;
      if (u32(tag, 8) < 1) return null;               // записей нет
      var strLen = u32(tag, 20);
      var strOff = u32(tag, 24);
      if (strOff + strLen > tag.length) return null;
      return orNull(clean(utf16be(tag.substr(strOff, strLen))));
    }
    return null;
  }

  function u32(s, i) {
    return (((s.charCodeAt(i)     & 255) << 24) |
            ((s.charCodeAt(i + 1) & 255) << 16) |
            ((s.charCodeAt(i + 2) & 255) << 8)  |
             (s.charCodeAt(i + 3) & 255)) >>> 0;
  }

  function utf16be(bytes) {
    var out = '';
    for (var i = 0; i + 1 < bytes.length; i += 2) {
      out += String.fromCharCode(((bytes.charCodeAt(i) & 255) << 8) | (bytes.charCodeAt(i + 1) & 255));
    }
    return out;
  }

  // --- Вспомогательное -------------------------------------------------------

  // Готовит строку к переезду в Photoshop: проценты + кавычки. На той стороне
  // её разворачивает decodeURIComponent. Так в теле сообщения не остаётся ни
  // одного небезопасного символа — ни перевода строки из описания профиля, ни
  // кириллицы из пути.
  function enc(s) {
    return q(encodeURIComponent(String(s)));
  }

  // Экранирует строку для вставки внутрь исходника Photoshop.
  function q(s) {
    var text = String(s);
    var out = '';
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      var code = text.charCodeAt(i);
      if (ch === '\\') out += '\\\\';
      else if (ch === '"') out += '\\"';
      else if (code >= 32 && code <= 126) out += ch;
      else {
        var hex = code.toString(16);
        while (hex.length < 4) hex = '0' + hex;
        out += '\\u' + hex;
      }
    }
    return '"' + out + '"';
  }

  function trim(s) {
    return String(s).replace(/^\s+|\s+$/g, '');
  }

  // Пустое описание — это «не прочиталось», а не «профиль без имени».
  function orNull(s) {
    return s ? s : null;
  }

  // Приводит прочитанное из ICC к пригодному для Photoshop виду. ASCII-часть
  // тега desc заканчивается нулевым байтом, а следом в том же теге лежат
  // Unicode- и ScriptCode-версии названия: если счётчик длины соврал, в строку
  // затекает двоичный хвост. Режем по первому нулю и выкидываем управляющие
  // символы.
  function clean(s) {
    var text = String(s);
    var nul = text.indexOf('\0');
    if (nul >= 0) text = text.substring(0, nul);
    text = text.replace(/[\x00-\x1f\x7f]+/g, ' ');
    return trim(text);
  }

  function note(message) {
    log.push(message);
  }

  // Прогон молчит, пока всё идёт по плану: лог пишется всегда, окно — только на
  // сорванном прогоне и только если SHOW_ERRORS.
  function fail(message) {
    note('ОШИБКА: ' + message);
    writeLog();
    if (SHOW_ERRORS) alert(message + '\n\nЛог: ' + LOG_FILE.fsName);
  }

  function writeLog() {
    try {
      LOG_FILE.encoding = 'UTF-8';
      if (!LOG_FILE.open('w')) return;
      LOG_FILE.write('export-proof, ' + new Date().toString() + '\n\n' + log.join('\n') + '\n');
      LOG_FILE.close();
    } catch (e) {
      try { LOG_FILE.close(); } catch (e2) {}
    }
  }
})();
