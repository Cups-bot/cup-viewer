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
// Требуется: открытый документ Illustrator и установленный Photoshop.
// -----------------------------------------------------------------------------

#target illustrator

(function () {
  // --- Настройки -------------------------------------------------------------

  var DPI  = 300;                       // разрешение растра
  var DEST = 'sRGB IEC61966-2.1';       // целевой профиль (как его видит Photoshop)

  // Папка для готового PNG. null => рядом с исходным .ai. Путь должен быть
  // существующим и доступным на запись; '/Mockup' — это корень диска, туда
  // система обычно писать не даёт. Примеры:
  //   var OUT_FOLDER = '/Users/me/cup-viewer/assets/textures';   // macOS
  //   var OUT_FOLDER = 'C:/work/cup-viewer/assets/textures';     // Windows
  var OUT_FOLDER = null;

  // Три профиля бумаги. Можно писать ЛИБО имя файла профиля
  // ('glossy_curve+blended.icm'), ЛИБО его описание из списка Photoshop —
  // скрипт сам найдёт файл в системных папках профилей и прочитает описание.
  // Кнопка «Проверить профили» в окне запуска показывает, что нашлось.
  var PAPERS = [
    { label: 'Мелованная',       profile: 'REPLACE_coated_profile',   suffix: 'coated'   },
    { label: 'Немелованная',     profile: 'REPLACE_uncoated_profile', suffix: 'uncoated' },
    { label: 'Мелованная + лак', profile: 'REPLACE_varnish_profile',  suffix: 'varnish'  }
  ];

  // --- Логика ----------------------------------------------------------------

  if (app.documents.length === 0) {
    alert('Открой документ Illustrator и запусти скрипт снова.');
    return;
  }

  var paper = choosePaper(PAPERS);
  if (!paper) return; // отмена

  if (paper.profile.indexOf('REPLACE_') === 0) {
    alert('Впиши профиль для «' + paper.label + '» в начало скрипта (массив PAPERS).');
    return;
  }

  // Photoshop понимает только ОПИСАНИЕ профиля («Profile» в Convert to Profile),
  // а не имя .icm-файла. Разбираемся здесь, чтобы не ловить немую ошибку внутри
  // BridgeTalk.
  var resolved = resolveProfile(paper.profile);
  if (!resolved.name) {
    alert('Профиль не найден: ' + paper.profile + '\n\n' + resolved.note +
          '\n\nОткрой окно запуска ещё раз и нажми «Проверить профили».');
    return;
  }

  var target = BridgeTalk.getSpecifier('photoshop');
  if (!target) {
    alert('Photoshop не найден. BridgeTalk не видит установленную копию — ' +
          'запусти Photoshop вручную и повтори.');
    return;
  }

  var doc  = app.activeDocument;
  var base = doc.name.replace(/\.[^.]+$/, '');

  var srcDir;
  try { srcDir = doc.path; } catch (e) { srcDir = null; }
  var outDir = OUT_FOLDER ? new Folder(OUT_FOLDER)
                          : (srcDir && srcDir.exists ? srcDir : Folder.temp);
  if (!outDir.exists && !outDir.create()) {
    alert('Не удалось создать папку для PNG:\n' + outDir.fsName +
          '\n\nУкажи в OUT_FOLDER существующий путь с правом на запись ' +
          '(корень диска, например «/Mockup», не подходит).');
    return;
  }

  var psd = new File(Folder.temp.fsName + '/' + base + '_cmyk.psd');
  var png = new File(outDir.fsName + '/' + base + '_' + paper.suffix + '.png');

  // 1) Illustrator -> плоский CMYK PSD. Профиль печати назначим уже в Photoshop,
  //    поэтому здесь важен только режим CMYK и сохранность чисел. Профиль НЕ
  //    вкладываем: с вложенным Photoshop по умолчанию спрашивает про несовпадение
  //    профилей и останавливается на модальном окне, а нетегированный CMYK
  //    открывается молча — и мы всё равно назначаем свой профиль следующим шагом.
  var opt = new ExportOptionsPhotoshop();
  opt.imageColorSpace = ImageColorSpace.CMYK;
  opt.resolution      = DPI;
  opt.embedICCProfile = false;
  opt.antiAliasing    = true;
  opt.writeLayers     = false; // flatten
  doc.exportFile(psd, ExportType.PHOTOSHOP, opt);

  psd = new File(psd.fsName); // перечитываем состояние с диска
  if (!psd.exists || psd.length === 0) {
    alert('Illustrator не отдал PSD:\n' + psd.fsName);
    return;
  }

  // 2) Photoshop через BridgeTalk: назначить профиль бумаги (числа CMYK не
  //    меняются) и сконвертировать в sRGB методом Absolute Colorimetric — это и
  //    есть запечённая имитация цвета бумаги и чёрной краски.
  //
  //    Весь код обёрнут в try/catch и возвращает строку «OK|…» либо «ERR|…»:
  //    без этого ошибка внутри Photoshop гасится молча, и со стороны выглядит
  //    так, будто скрипт просто открыл PSD и остановился.
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
    '  d.convertProfile(' + q(DEST) + ', Intent.ABSOLUTECOLORIMETRIC, false, false);',
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

  var bt = new BridgeTalk();
  bt.target  = target;
  bt.body    = ps;
  bt.timeout = 600; // растр 300 dpi конвертируется небыстро
  bt.onResult = function (message) {
    var body = String(message && message.body);
    if (body.indexOf('OK|') === 0) {
      alert('Готово (' + paper.label + '):\n' + body.substring(3));
      try { psd.remove(); } catch (e) {}
    } else if (body.indexOf('ERR|') === 0) {
      alert('Photoshop не смог доделать:\n\n' + body.substring(4));
    } else {
      alert('Photoshop вернул непонятный ответ:\n\n' + body);
    }
  };
  bt.onError = function (message) {
    alert('Photoshop вернул ошибку:\n\n' + (message && message.body));
  };
  bt.onTimeout = function () {
    alert('Photoshop не ответил за 10 минут.\n\nПереключись в него: скорее всего ' +
          'на экране висит модальное окно (профили, шрифты, обновление), ' +
          'которое ждёт ответа.');
  };
  bt.send();

  // --- Профили ---------------------------------------------------------------

  // Приводит запись из PAPERS к описанию профиля, которое понимает Photoshop.
  // На вход принимает и имя файла ('paper.icm'), и уже готовое описание.
  function resolveProfile(wanted) {
    var files = listProfileFiles();
    var lower = String(wanted).toLowerCase();

    // 1) Совпадение по имени файла — самый частый случай.
    for (var i = 0; i < files.length; i++) {
      if (String(files[i].name).toLowerCase() === lower ||
          decodeURI(files[i].name).toLowerCase() === lower) {
        var desc = readProfileDescription(files[i]);
        if (desc) return { name: desc, note: 'Файл: ' + files[i].fsName };
        return { name: null, note: 'Файл найден (' + files[i].fsName +
                 '), но описание внутри прочитать не удалось.' };
      }
    }

    // 2) Совпадение по описанию внутри профиля.
    for (var j = 0; j < files.length; j++) {
      var d = readProfileDescription(files[j]);
      if (d && d.toLowerCase() === lower) {
        return { name: d, note: 'Файл: ' + files[j].fsName };
      }
    }

    // 3) Ни то, ни другое: возможно, профиль лежит не в системной папке —
    //    отдаём строку как есть, Photoshop скажет своё слово.
    if (String(wanted).toLowerCase().match(/\.(icc|icm)$/)) {
      return { name: null, note: 'Среди ' + files.length +
               ' профилей системы файла с таким именем нет. ' +
               'Проверь, что профиль установлен (macOS: ~/Library/ColorSync/Profiles, ' +
               'Windows: System32\\spool\\drivers\\color).' };
    }
    return { name: String(wanted), note: 'Считаем строку описанием профиля.' };
  }

  // Все .icc/.icm из системных папок профилей.
  function listProfileFiles() {
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
      var found = dirs[i].getFiles(/\.(icc|icm)$/i) || [];
      for (var j = 0; j < found.length; j++) {
        var key = String(found[j].fsName).toLowerCase();
        if (seen[key]) continue;
        seen[key] = true;
        out.push(found[j]);
      }
    }
    return out;
  }

  // Читает поле 'desc' из ICC-файла: это и есть текст, который Photoshop
  // показывает в списке профилей.
  function readProfileDescription(file) {
    var data = null;
    try {
      file.encoding = 'BINARY';
      if (!file.open('r')) return null;
      data = file.read();
      file.close();
    } catch (e) {
      try { file.close(); } catch (e2) {}
      return null;
    }
    if (!data || data.length < 132) return null;

    var tagCount = u32(data, 128);
    if (tagCount <= 0 || tagCount > 1000) return null;

    for (var i = 0; i < tagCount; i++) {
      var p = 132 + i * 12;
      if (p + 12 > data.length) break;
      if (data.substr(p, 4) !== 'desc') continue;

      var off = u32(data, p + 4);
      if (off + 12 > data.length) return null;
      var type = data.substr(off, 4);

      if (type === 'desc') {                       // ICC v2
        var len = u32(data, off + 8);
        return clean(data.substr(off + 12, len));
      }
      if (type === 'mluc') {                       // ICC v4
        var records = u32(data, off + 8);
        if (records < 1) return null;
        var strLen = u32(data, off + 20);
        var strOff = u32(data, off + 24);
        return clean(utf16be(data.substr(off + strOff, strLen)));
      }
      return null;
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

  function clean(s) {
    return String(s).replace(/\0+$/g, '').replace(/^\s+|\s+$/g, '');
  }

  // --- Вспомогательное -------------------------------------------------------

  // Экранирует строку для вставки внутрь исходника Photoshop.
  function q(s) {
    return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }

  // Диалог выбора типа бумаги. Возвращает выбранный элемент PAPERS или null.
  function choosePaper(papers) {
    var dlg = new Window('dialog', 'Цветопроба — тип бумаги');
    dlg.orientation = 'column';
    dlg.alignChildren = 'fill';
    dlg.margins = 16;
    dlg.spacing = 12;

    dlg.add('statictext', undefined, 'Какую бумагу имитировать:');

    var dd = dlg.add('dropdownlist', undefined, []);
    for (var i = 0; i < papers.length; i++) dd.add('item', papers[i].label);
    dd.selection = 0;

    var row = dlg.add('group');
    row.alignment = 'right';
    var check = row.add('button', undefined, 'Проверить профили');
    row.add('button', undefined, 'Отмена', { name: 'cancel' });
    row.add('button', undefined, 'OK', { name: 'ok' });

    // Показывает, что именно скрипт нашёл по каждой записи PAPERS: без этого
    // единственный симптом неверного имени — тишина со стороны Photoshop.
    check.onClick = function () {
      var lines = [];
      for (var k = 0; k < papers.length; k++) {
        var r = resolveProfile(papers[k].profile);
        lines.push(papers[k].label + ':\n  задано: ' + papers[k].profile +
                   '\n  профиль: ' + (r.name || '— не найден —') +
                   '\n  ' + r.note);
      }
      alert(lines.join('\n\n'));
    };

    if (dlg.show() !== 1) return null;
    return papers[dd.selection.index];
  }
})();
