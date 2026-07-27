// export-proof.jsx
// -----------------------------------------------------------------------------
// Illustrator -> Photoshop, в один клик: растрирует активный документ в CMYK,
// назначает выбранный профиль бумаги (числа CMYK сохраняются) и печёт
// имитацию цвета бумаги в sRGB PNG (Convert to Profile, Absolute Colorimetric,
// без Black Point Compensation). Готовый PNG идёт в текстуры вьювера.
//
// Установка: File > Scripts > Other Script...  (или положить в папку
// Illustrator/Presets/<lang>/Scripts, чтобы появился в File > Scripts).
//
// Настройки (профили бумаги, папка, DPI) задаются кнопкой «Настройки…» в окне
// запуска и хранятся отдельно от скрипта, в файле настроек пользователя —
// обновление скрипта их не затирает, заново вписывать ничего не нужно.
//
// Требуется: открытый документ Illustrator и установленный Photoshop.
// -----------------------------------------------------------------------------

#target illustrator

(function () {
  // --- Значения по умолчанию -------------------------------------------------
  // Используются, пока в настройках не сохранено своё. Профиль можно задавать
  // именем файла, полным путём или описанием из списка Photoshop.

  var DEFAULTS = {
    dpi: 300,
    dest: 'sRGB IEC61966-2.1',   // целевой профиль (как его видит Photoshop)
    out: '',                     // пусто => рядом с исходным .ai
    papers: [
      { key: 'coated',   label: 'Мелованная',       profile: 'glossy_curve+blended.icm',   suffix: 'coated'   },
      { key: 'uncoated', label: 'Немелованная',     profile: 'novd_backside_blended7.icm', suffix: 'uncoated' },
      { key: 'varnish',  label: 'Мелованная + лак', profile: 'matte_forged_6.icm',         suffix: 'varnish'  }
    ]
  };

  var SETTINGS_FILE = new File(Folder.userData.fsName + '/cup-viewer-export-proof.txt');
  var LOG_FILE = new File(Folder.temp.fsName + '/export-proof.log');

  // --- Состояние -------------------------------------------------------------

  var settings = loadSettings();
  var profileCache = null;   // список установленных профилей, читается один раз
  var log = [];

  // --- Ход дела --------------------------------------------------------------

  if (app.documents.length === 0) {
    alert('Открой документ Illustrator и запусти скрипт снова.');
    return;
  }

  var paper = choosePaper();
  if (!paper) return; // отмена

  note('Бумага: ' + paper.label + ' (задано: ' + paper.profile + ')');

  // Photoshop понимает только ОПИСАНИЕ профиля («Profile» в Convert to Profile),
  // а не имя .icm-файла. Разбираемся здесь, чтобы не ловить немую ошибку внутри
  // BridgeTalk.
  var resolved = resolveProfile(paper.profile);
  if (!resolved.name) {
    fail('Профиль не найден: ' + paper.profile + '\n\n' + resolved.note +
         '\n\nОткрой «Настройки…» и выбери профиль из списка установленных.');
    return;
  }
  note('Профиль: ' + resolved.name + ' [' + resolved.note + ']');

  var target = BridgeTalk.getSpecifier('photoshop');
  if (!target) {
    fail('Photoshop не найден. BridgeTalk не видит установленную копию — ' +
         'запусти Photoshop вручную и повтори.');
    return;
  }
  note('Photoshop: ' + target + (BridgeTalk.isRunning(target) ? ' (запущен)' : ' (не запущен, будет поднят)'));

  var doc  = app.activeDocument;
  var base = doc.name.replace(/\.[^.]+$/, '');

  var srcDir;
  try { srcDir = doc.path; } catch (e) { srcDir = null; }
  var outDir = settings.out ? new Folder(settings.out)
                            : (srcDir && srcDir.exists ? srcDir : Folder.temp);
  if (!outDir.exists && !outDir.create()) {
    fail('Не удалось создать папку для PNG:\n' + outDir.fsName +
         '\n\nОткрой «Настройки…» и укажи существующий путь с правом на запись ' +
         '(корень диска, например «/Mockup», не подходит).');
    return;
  }
  note('Папка вывода: ' + outDir.fsName);

  var psd = new File(Folder.temp.fsName + '/' + base + '_cmyk.psd');
  var png = new File(outDir.fsName + '/' + base + '_' + paper.suffix + '.png');

  // 1) Illustrator -> плоский CMYK PSD. Профиль печати назначим уже в Photoshop,
  //    поэтому здесь важен только режим CMYK и сохранность чисел. Профиль НЕ
  //    вкладываем: с вложенным Photoshop по умолчанию спрашивает про несовпадение
  //    профилей и останавливается на модальном окне, а нетегированный CMYK
  //    открывается молча — и мы всё равно назначаем свой профиль следующим шагом.
  try {
    var opt = new ExportOptionsPhotoshop();
    opt.imageColorSpace = ImageColorSpace.CMYK;
    opt.resolution      = settings.dpi;
    opt.embedICCProfile = false;
    opt.antiAliasing    = true;
    opt.writeLayers     = false; // flatten
    doc.exportFile(psd, ExportType.PHOTOSHOP, opt);
  } catch (e) {
    fail('Illustrator не смог экспортировать PSD:\n\n' + (e && e.message ? e.message : e));
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
  var ps = [
    'var res;',
    'try {',
    '  app.displayDialogs = DialogModes.NO;',
    '  var f = new File(' + q(psd.fsName) + ');',
    // Текст ошибок с этой стороны — латиницей: он едет между процессами через
    // BridgeTalk, и кириллица по дороге превращается в кашу.
    '  if (!f.exists) throw new Error("PSD not found: " + f.fsName);',
    '  var d = app.open(f);',
    // Присваивание colorProfileName и есть Assign Profile; colorProfileType
    // трогать не нужно — он сам станет CUSTOM.
    '  d.colorProfileName = ' + q(resolved.name) + ';',
    '  var got = String(d.colorProfileName);',
    '  if (norm(got) !== norm(' + q(resolved.name) + ')) {',
    '    throw new Error("Assign failed. Asked: " + ' + q(resolved.name) +
      ' + " / document has: " + got);',
    '  }',
    '  d.convertProfile(' + q(settings.dest) + ', Intent.ABSOLUTECOLORIMETRIC, false, false);',
    '  if (d.mode !== DocumentMode.RGB) throw new Error("Document is not RGB after convert");',
    '  d.flatten();',
    '  if (d.bitsPerChannel !== BitsPerChannelType.EIGHT) d.bitsPerChannel = BitsPerChannelType.EIGHT;',
    '  var out = new File(' + q(png.fsName) + ');',
    '  d.saveAs(out, new PNGSaveOptions(), true);',
    '  d.close(SaveOptions.DONOTSAVECHANGES);',
    '  out = new File(out.fsName);',
    '  if (!out.exists) throw new Error("PNG was not saved: " + out.fsName);',
    '  res = "OK|" + out.fsName;',
    '} catch (e) {',
    '  try { while (app.documents.length) app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); } catch (e2) {}',
    '  res = "ERR|" + (e && e.message ? e.message : String(e));',
    '}',
    'function norm(s) { return String(s).replace(/\\s+/g, " ").replace(/^ | $/g, "").toLowerCase(); }',
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
    fail('Photoshop не ответил.\n\nПереключись в него: скорее всего на экране ' +
         'висит модальное окно (профили, шрифты, обновление), которое ждёт ответа.');
    return;
  }

  if (answer.indexOf('OK|') === 0) {
    var savedTo = answer.substring(3);
    note('Готово: ' + savedTo);
    writeLog();
    try { psd.remove(); } catch (e) {}
    var openFolder = confirm('Готово (' + paper.label + '):\n' + savedTo +
                             '\n\nОткрыть папку?');
    if (openFolder) { try { new File(savedTo).parent.execute(); } catch (e) {} }
    return;
  }

  fail('Photoshop не смог доделать:\n\n' +
       (answer.indexOf('ERR|') === 0 ? answer.substring(4) : answer));

  // --- Настройки -------------------------------------------------------------

  // Читает сохранённые настройки; чего нет — берётся из DEFAULTS. Формат простой,
  // «ключ=значение» построчно: JSON в ExtendScript нет, а тащить парсер ради
  // пяти строк незачем.
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

    if (!SETTINGS_FILE.exists) return s;

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

  function saveSettings() {
    try {
      var lines = ['# Настройки export-proof.jsx. Правится кнопкой «Настройки…» в скрипте.',
                   'dpi=' + settings.dpi,
                   'dest=' + settings.dest,
                   'out=' + settings.out];
      for (var i = 0; i < settings.papers.length; i++) {
        lines.push(settings.papers[i].key + '=' + settings.papers[i].profile);
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

    // 1) Полный путь — самый однозначный случай, он же приходит из «Настроек».
    if (value.indexOf('/') >= 0 || value.indexOf('\\') >= 0) {
      var direct = new File(value);
      if (direct.exists) {
        var info = readProfileInfo(direct);
        if (info && info.name) return { name: info.name, note: 'Файл: ' + direct.fsName };
        return { name: null, note: 'Файл найден (' + direct.fsName +
                 '), но описание внутри прочитать не удалось.' };
      }
    }

    var profiles = listProfiles();
    var lower = value.toLowerCase();

    // 2) Совпадение по имени файла.
    for (var i = 0; i < profiles.length; i++) {
      if (profiles[i].fileName.toLowerCase() === lower) {
        if (profiles[i].name) return { name: profiles[i].name, note: 'Файл: ' + profiles[i].path };
        return { name: null, note: 'Файл найден (' + profiles[i].path +
                 '), но описание внутри прочитать не удалось.' };
      }
    }

    // 3) Совпадение по описанию внутри профиля.
    for (var j = 0; j < profiles.length; j++) {
      if (profiles[j].name && profiles[j].name.toLowerCase() === lower) {
        return { name: profiles[j].name, note: 'Файл: ' + profiles[j].path };
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
          space: info ? info.space : ''
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
      return { name: name, space: space };
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
      return clean(tag.substr(12, len));
    }
    if (type === 'mluc') {
      if (tag.length < 28) return null;
      if (u32(tag, 8) < 1) return null;               // записей нет
      var strLen = u32(tag, 20);
      var strOff = u32(tag, 24);
      if (strOff + strLen > tag.length) return null;
      return clean(utf16be(tag.substr(strOff, strLen)));
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

  // --- Окна ------------------------------------------------------------------

  // Окно запуска: выбор бумаги, состояние профиля, вход в настройки.
  function choosePaper() {
    var dlg = new Window('dialog', 'Цветопроба — тип бумаги');
    dlg.orientation = 'column';
    dlg.alignChildren = 'fill';
    dlg.margins = 16;
    dlg.spacing = 10;

    dlg.add('statictext', undefined, 'Какую бумагу имитировать:');

    var dd = dlg.add('dropdownlist', undefined, []);
    for (var i = 0; i < settings.papers.length; i++) dd.add('item', settings.papers[i].label);
    dd.selection = 0;

    var status = dlg.add('statictext', undefined, '', { multiline: true });
    status.preferredSize = [420, 46];

    var where = dlg.add('statictext', undefined, '');
    where.preferredSize.width = 420;

    var row = dlg.add('group');
    row.alignment = 'right';
    var setup = row.add('button', undefined, 'Настройки…');
    row.add('button', undefined, 'Отмена', { name: 'cancel' });
    var okBtn = row.add('button', undefined, 'OK', { name: 'ok' });

    // Показывает, что скрипт нашёл по выбранной бумаге: без этого единственным
    // симптомом неверного имени была тишина со стороны Photoshop.
    function refresh() {
      var paper = settings.papers[dd.selection.index];
      var r = resolveProfile(paper.profile);
      status.text = r.name
        ? 'Профиль: ' + r.name + '\n' + r.note
        : 'Профиль не найден.\n' + r.note;
      okBtn.enabled = !!r.name;
      where.text = 'Куда: ' + (settings.out ? settings.out : 'рядом с исходным .ai') +
                   '   ·   ' + settings.dpi + ' dpi';
      dlg.layout.layout(true);
    }

    dd.onChange = refresh;
    setup.onClick = function () { if (showSettings(dlg)) refresh(); };
    refresh();

    if (dlg.show() !== 1) return null;
    return settings.papers[dd.selection.index];
  }

  // Настройки: профиль под каждую бумагу выбирается из установленных в системе,
  // выбор сохраняется в файл настроек и переживает обновление скрипта.
  function showSettings(parent) {
    var profiles = listProfiles();

    // Для бумаги осмысленны только CMYK-профили; если таких нет (профили не
    // установлены) — показываем все, чтобы окно не было пустым.
    var usable = [];
    for (var i = 0; i < profiles.length; i++) {
      if (profiles[i].name && profiles[i].space === 'CMYK') usable.push(profiles[i]);
    }
    if (!usable.length) {
      for (var j = 0; j < profiles.length; j++) if (profiles[j].name) usable.push(profiles[j]);
    }
    usable.sort(function (a, b) { return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1; });

    var dlg = new Window('dialog', 'Настройки цветопробы');
    dlg.orientation = 'column';
    dlg.alignChildren = 'fill';
    dlg.margins = 16;
    dlg.spacing = 10;

    dlg.add('statictext', undefined,
            'Профили бумаги (' + usable.length + ' подходящих установлено в системе):');

    var pickers = [];
    for (var k = 0; k < settings.papers.length; k++) {
      var paper = settings.papers[k];
      var row = dlg.add('group');
      row.alignChildren = 'center';

      var label = row.add('statictext', undefined, paper.label + ':');
      label.preferredSize.width = 130;

      var list = row.add('dropdownlist', undefined, []);
      list.preferredSize.width = 380;
      list.add('item', '— не выбран —');

      var current = resolveProfile(paper.profile);
      for (var m = 0; m < usable.length; m++) {
        list.add('item', usable[m].name + '   ·   ' + usable[m].fileName);
        if (current.name && usable[m].name === current.name) list.selection = m + 1;
      }
      if (!list.selection) list.selection = 0;
      pickers.push(list);
    }

    dlg.add('panel').preferredSize.height = 1;

    var outRow = dlg.add('group');
    var outLabel = outRow.add('statictext', undefined, 'Папка для PNG:');
    outLabel.preferredSize.width = 130;
    var outField = outRow.add('edittext', undefined, settings.out);
    outField.preferredSize.width = 300;
    var browse = outRow.add('button', undefined, 'Выбрать…');
    browse.onClick = function () {
      var picked = Folder.selectDialog('Куда класть готовые PNG');
      if (picked) outField.text = picked.fsName;
    };

    var hint = dlg.add('statictext', undefined, 'Пусто — класть рядом с исходным .ai');
    hint.preferredSize.width = 420;

    var dpiRow = dlg.add('group');
    var dpiLabel = dpiRow.add('statictext', undefined, 'Разрешение, dpi:');
    dpiLabel.preferredSize.width = 130;
    var dpiField = dpiRow.add('edittext', undefined, String(settings.dpi));
    dpiField.preferredSize.width = 80;

    var buttons = dlg.add('group');
    buttons.alignment = 'right';
    buttons.add('button', undefined, 'Отмена', { name: 'cancel' });
    buttons.add('button', undefined, 'Сохранить', { name: 'ok' });

    if (dlg.show() !== 1) return false;

    for (var n = 0; n < pickers.length; n++) {
      var index = pickers[n].selection ? pickers[n].selection.index : 0;
      // Храним путь к файлу: он однозначен и не зависит от языка описания.
      if (index > 0) settings.papers[n].profile = usable[index - 1].path;
    }
    settings.out = trim(outField.text);
    var dpi = parseInt(dpiField.text, 10);
    if (dpi > 0) settings.dpi = dpi;

    if (!saveSettings()) {
      alert('Настройки применены, но записать файл не удалось:\n' + SETTINGS_FILE.fsName +
            '\n\nВ следующий раз их придётся задать заново.');
    }
    return true;
  }

  // --- Вспомогательное -------------------------------------------------------

  // Экранирует строку для вставки внутрь исходника Photoshop.
  function q(s) {
    return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }

  function trim(s) {
    return String(s).replace(/^\s+|\s+$/g, '');
  }

  function clean(s) {
    return trim(String(s).replace(/\0+$/g, ''));
  }

  function note(message) {
    log.push(message);
  }

  // Сообщение об ошибке + лог рядом: по нему видно, на каком шаге всё встало.
  function fail(message) {
    note('ОШИБКА: ' + message);
    writeLog();
    alert(message + '\n\nЛог: ' + LOG_FILE.fsName);
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
