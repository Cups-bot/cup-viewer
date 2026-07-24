// export-proof.jsx
// -----------------------------------------------------------------------------
// Illustrator -> Photoshop, в один клик: растрирует активный документ в CMYK,
// назначает выбранный профиль бумаги (числа CMYK сохраняются) и печёт
// имитацию цвета бумаги в sRGB PNG (Convert to Profile, Absolute Colorimetric,
// без Black Point Compression). Готовый PNG идёт в текстуры вьювера.
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

  // Папка для готового PNG. null => рядом с исходным .ai. Можно указать явно,
  // например путь к текстурам вьювера:
  //   var OUT_FOLDER = '/Users/me/cup-viewer/assets/textures';
  var OUT_FOLDER = null;

  // Три профиля бумаги. Впиши имена ТОЧНО так, как их показывает Photoshop
  // (Edit > Convert to Profile -> раскрой список Profile: там нужный текст;
  // это ОПИСАНИЕ внутри .icm, оно может отличаться от имени файла).
  var PAPERS = [
    { label: 'Мелованная',       profile: 'REPLACE_coated_profile_name',   suffix: 'coated'   },
    { label: 'Немелованная',     profile: 'REPLACE_uncoated_profile_name', suffix: 'uncoated' },
    { label: 'Мелованная + лак', profile: 'REPLACE_varnish_profile_name',  suffix: 'varnish'  }
  ];

  // --- Логика ----------------------------------------------------------------

  if (app.documents.length === 0) {
    alert('Открой документ Illustrator и запусти скрипт снова.');
    return;
  }

  var paper = choosePaper(PAPERS);
  if (!paper) return; // отмена

  if (paper.profile.indexOf('REPLACE_') === 0) {
    alert('Впиши имя ICC-профиля для «' + paper.label + '» в начало скрипта ' +
          '(массив PAPERS).');
    return;
  }

  var doc  = app.activeDocument;
  var base = doc.name.replace(/\.[^.]+$/, '');

  var srcDir;
  try { srcDir = doc.path; } catch (e) { srcDir = null; }
  var outDir = OUT_FOLDER ? new Folder(OUT_FOLDER)
                          : (srcDir && srcDir.exists ? srcDir : Folder.temp);
  if (!outDir.exists) outDir.create();

  var psd = new File(Folder.temp.fsName + '/' + base + '_cmyk.psd');
  var png = new File(outDir.fsName + '/' + base + '_' + paper.suffix + '.png');

  // 1) Illustrator -> плоский CMYK PSD. Профиль печати назначим уже в Photoshop,
  //    поэтому здесь важен только режим CMYK и сохранность чисел.
  var opt = new ExportOptionsPhotoshop();
  opt.imageColorSpace = ImageColorSpace.CMYK;
  opt.resolution      = DPI;
  opt.embedICCProfile = true;
  opt.antiAliasing    = true;
  opt.writeLayers     = false; // flatten
  doc.exportFile(psd, ExportType.PHOTOSHOP, opt);

  // 2) Photoshop через BridgeTalk: назначить профиль бумаги (числа CMYK не
  //    меняются) и сконвертировать в sRGB методом Absolute Colorimetric — это и
  //    есть запечённая имитация цвета бумаги и чёрной краски.
  var ps =
    'app.displayDialogs=DialogModes.NO;' +
    'var d=app.open(new File(' + q(psd.fsName) + '));' +
    'd.colorProfileType=ColorProfileType.CUSTOM;' +
    'd.colorProfileName=' + q(paper.profile) + ';' +               // = Assign Profile
    'd.convertProfile(' + q(DEST) + ',Intent.ABSOLUTECOLORIMETRIC,false,false);' +
    'd.flatten();' +
    'd.saveAs(new File(' + q(png.fsName) + '),new PNGSaveOptions(),true);' +
    'd.close(SaveOptions.DONOTSAVECHANGES);' +
    "'OK';";

  var bt = new BridgeTalk();
  bt.target  = 'photoshop';
  bt.body    = ps;
  bt.onResult = function () { alert('Готово (' + paper.label + '):\n' + png.fsName); };
  bt.onError  = function (e) { alert('Photoshop вернул ошибку:\n' + (e && e.body)); };
  bt.send();

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
    row.add('button', undefined, 'Отмена', { name: 'cancel' });
    row.add('button', undefined, 'OK', { name: 'ok' });

    if (dlg.show() !== 1) return null;
    return papers[dd.selection.index];
  }
})();
