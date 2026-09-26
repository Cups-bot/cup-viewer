"""Markdown tables for docs/СТАКАНЫ_РАЗВЁРТКИ_RU.md.

py -3.10 work/v4/make_guide_tables.py > work/v4/survey/tables.md
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
T = json.loads((ROOT / 'work/v4/survey/templates.json').read_text(encoding='utf-8'))
D = json.loads((ROOT / 'work/v4/survey/drawings.json').read_text(encoding='utf-8'))
CHECKS = ROOT / 'work/v4/survey/checks'
DRAFTS = ROOT / 'cup_mockup/params/drafts'

FAMILY = {'HB': 'HB — однослойный', 'EHB': 'EHB — однослойный с тиснением', 'DW': 'DW — двухслойный',
          'DWE': 'DWE — двухслойный (тот же контур, что DW)', 'EH': 'EH — Waffle (гофра)', 'EM': 'EM — Waffle (гофра)'}


def fam(name):
    for k in ('DWE', 'EHB', 'DW', 'EH', 'EM', 'HB'):
        if name.startswith(k):
            return k
    return '?'


def num(x, n=2):
    return '—' if x is None else f'{x:.{n}f}'.rstrip('0').rstrip('.') if isinstance(x, float) else str(x)


print('### Все 26 развёрток\n')
print('| Артикул | Семейство | Объём | Конус β | Заготовка R внеш / R внутр | Длина заготовки | Видимая область | Припуск низ / верх | Клапан | Чертёж |')
print('|---|---|---|---:|---|---:|---:|---|---:|---|')
DRAW_BY_TPL = {d.get('template'): k for k, d in D.items() if isinstance(d, dict) and d.get('template')}
for name in sorted(T, key=lambda n: (fam(n), n)):
    t = T[name]
    d = t.get('derived') or {}
    g, b = t.get('green'), t.get('blue')
    vol = (t.get('label') or '—').split(' ')[0]
    draw = DRAW_BY_TPL.get(name)
    print(f"| {name} | {fam(name)} | {vol} | {num(d.get('cone_half_angle_deg'), 3)}° | "
          f"{num(g['R_top_mm']) if g else '—'} / {num(g['R_bottom_mm']) if g else '—'} | {num(d.get('blank_slant_mm'))} | "
          f"{num(d.get('visible_slant_mm'))} (h {num(d.get('visible_height_mm'))}) | {num(d.get('hidden_bottom_mm'))} / {num(d.get('hidden_top_mm'))} | "
          f"{num(d.get('overlap_strip_mm_at_bottom'))} | {draw or '—'} |")

print('\n### Чертежи\n')
print('| Чертёж | Шаблон | H | Ø венчика | Ø скрутки | Ø опоры | Конус | Стенка / дно | Дно, мм | Заготовка | Нахлёст | Подворот |')
print('|---|---|---:|---:|---:|---:|---:|---|---:|---|---:|---:|')
for k, d in D.items():
    if k.startswith('_') or d.get('height') is None and d.get('sleeve_height') is None:
        if k.startswith('_'):
            continue
        print(f"| {k} | {d.get('template') or '—'} | — | — | — | — | — | — | — | — | — | — | ")
        continue
    if d.get('sleeve_height'):
        print(f"| {k} | {d.get('template')} | {num(d.get('height'))} | — | — | — | обечайка {num(d.get('sleeve_taper'))}° | "
              f"{num(d.get('sleeve_sheet'))} | обечайка {num(d.get('sleeve_height'))} от {num(d.get('sleeve_bottom_z'))} | "
              f"{num(d['blank_R'][0])}/{num(d['blank_R'][1])}, {num(d.get('blank_angle'), 3)}° | {num(d.get('overlap'))} | {num(d.get('roll_tab'))} |")
    else:
        print(f"| {k} | {d.get('template') or '—'} | {num(d.get('height'))} | {num(d.get('rim_od'))} | {num(d.get('curl_d'))} | {num(d.get('base_od'))} | "
              f"{num(d.get('taper'))}° | {num(d.get('wall'))} / {num(d.get('floor'))} | {num(d.get('floor_top'))} | "
              f"{(num(d['blank_R'][0]) + '/' + num(d['blank_R'][1])) if d.get('blank_R') else '—'}, {num(d.get('blank_angle'), 3)}° | "
              f"{num(d.get('overlap'))} | {num(d.get('fold'))} |")

print('\n### Черновики моделей\n')
print('| Черновик | H | Ø венчика | Ø опоры | Конус | Источник размеров | Сборка и проверка |')
print('|---|---:|---:|---:|---:|---|---|')
for f in sorted(DRAFTS.glob('*.json')):
    p = json.loads(f.read_text(encoding='utf-8'))
    c = p.get('cup')
    chk = CHECKS / f'{f.stem}.json'
    verdict = '—'
    if chk.exists():
        r = json.loads(chk.read_text(encoding='utf-8'))
        dims = r['dimensions_mm']
        verdict = ('пройдена' if r['pass'] else 'ОШИБКА: ' + '; '.join(r.get('failures', []))) + \
                  f", пересечений {sum(v['self_intersections'] for v in r['objects'].values()) + sum(x['intersections'] for x in r['pairs'])}"
    if c:
        src = 'чертёж' if 'чертёж' in str(p['cup']['_src'].get('height', '')) else 'расчёт по шаблону'
        print(f"| {f.stem} | {num(c['height_mm'])} | {num(c['rim_od_mm'])} | {num(c['base_od_mm'])} | {num(c['taper_deg'], 3)}° | {src} | {verdict} |")
    else:
        ip = DRAFTS.parent / (p['inner_from'] + '.json')      # promoted model or draft
        inner = json.loads(ip.read_text(encoding='utf-8'))['cup']
        s = p['sleeve']
        print(f"| {f.stem} | {num(inner['height_mm'])} | {num(inner['rim_od_mm'])} | {num(inner['base_od_mm'])} | обечайка {num(s['taper_deg'], 3)}° | "
              f"{'чертёж' if p['sources'].get('drawing') else 'расчёт по шаблону'} | {verdict} |")
