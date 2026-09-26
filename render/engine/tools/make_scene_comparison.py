"""Reference/render pairs, original images linked without resampling."""
from pathlib import Path
from html import escape
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[2]
rows = [('window', 'S14 — Городская пауза', '12_41_29'),
        ('cream', 'S12 — Молочная пластика', '12_41_51'),
        ('ice', 'S07 — Ледяная грань', '12_42_06')]
page = ['''<!doctype html><html lang="ru"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Сцены 14 / 12 / 07 — сравнение</title><style>
body{background:#151719;color:#eee;font:16px/1.6 system-ui;margin:0;padding:32px;max-width:1500px;margin:auto}
h1{font-size:28px}h2{font-size:21px;margin-top:48px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}
figure{margin:0}img{width:100%;aspect-ratio:1;object-fit:contain;background:#222;display:block}a{color:#c8d8e6}
figcaption{padding:12px 0;color:#bbb}@media(max-width:650px){body{padding:16px}.pair{grid-template-columns:1fr}}
</style><h1>Сцены 14 / 12 / 07</h1><p>Слева — ваш референс. Справа — Blender / Cycles, пустой стандартный стакан 650 мл.
Клик открывает исходное изображение. Материал и геометрия стакана сохранены.</p>''']
for name, title, suffix in rows:
    ref = next((ROOT/'ref/bg').glob('*'+suffix+'.png'))
    ref_url = quote('../../../ref/bg/'+ref.name)
    render_url = '../'+name+'_650ml_clean.png'
    assert (ROOT/'mockup/out'/Path(render_url).name).exists()
    page.append(f'<h2>{escape(title)}</h2><div class="pair">')
    for url, label in [(ref_url,'Референс'),(render_url,'Результат · 1600 × 1600 · 256 samples')]:
        page.append(f'<figure><a href="{url}"><img src="{url}" alt="{escape(title+": "+label)}"></a><figcaption>{label}</figcaption></figure>')
    page.append(f'</div><a href="../{name}_650ml_clean.blend">Открыть сцену .blend</a>')
page.append('</html>')
out=ROOT/'mockup/out/scene_review/СРАВНЕНИЕ.html'
out.write_text('\n'.join(page),encoding='utf-8')
print(out)
