"""Draft params for every HB / DW template: cup_mockup/params/drafts/<model>.json.

py -3.10 work/v4/make_drafts.py

Template data (work/v4/survey/templates.json) define the blank and the
registration; drawing data (work/v4/survey/drawings.json) define the cup where
a drawing exists.  Missing values are derived from the template with rules
calibrated on the cups that have both (see docs).  Every number gets a _src.
"""
import copy
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PARAMS = ROOT / 'cup_mockup/params'
OUT = PARAMS / 'drafts'
T = json.loads((ROOT / 'work/v4/survey/templates.json').read_text(encoding='utf-8'))
D = json.loads((ROOT / 'work/v4/survey/drawings.json').read_text(encoding='utf-8'))
BASE_HB = json.loads((PARAMS / 'HB80-280.json').read_text(encoding='utf-8'))
BASE_DW = json.loads((PARAMS / 'DW80-280.json').read_text(encoding='utf-8'))

DRAWING_OF = {d['template']: k for k, d in D.items() if not k.startswith('_') and d.get('template')}
VOLUME = {k: (T[k].get('label') or '').split('(')[0].strip() for k in T}

# Rules calibrated on HB62-120, HB70-180, HB70-195, HB70-210 (7oz), HB80-280,
# HB80-340, HB90-430 — the cups with both a drawing and a template.
RULES = {
    'height': 'H = видимая высота шаблона + 0.86·Ø скрутки (на 7 стаканах с чертежом: −0.9…+0.9 мм)',
    'rim_od': 'Ø венчика = 2·(R синей верхней·sinβ + 0.97·Ø скрутки) (−0.4…+0.4 мм)',
    'base_od': 'Ø опоры = 2·(R синей нижней·sinβ + 0.22) (синяя нижняя = линия сгиба; −0.1…+0.1 мм)',
    'curl_d': 'Ø скрутки по диаметру венчика: до Ø72 — 2.5, Ø80 — 3.3, Ø90 — 3.3',
    'wall': 'стенка 0.30 мм (нет чертежа; у чертежей 0.26–0.38)',
    'floor_top': 'дно: до Ø72 — 5.0 мм, Ø80 и H<100 — 6.2, выше — 7.0 (по чертежам)',
}


def clean(o):
    return {k: v for k, v in o.items() if not k.startswith('_')}


def template_block(t):
    out = {'apex_mm': t['apex_mm'], 'visible': clean(t['blue']), 'die': clean(t['green'])}
    out['_src'] = {'all': f"шаблон PDF Mockups/{t['file']}: извлечено work/v4/survey_templates.py"}
    return out


def hb_draft(name):
    t = T[name]
    dv = t['derived']
    beta = dv['cone_half_angle_deg']
    sb = math.sin(math.radians(beta))
    dk = DRAWING_OF.get(name)
    dr = D.get(dk, {}) if dk else {}
    has = dr.get('height') is not None
    src = {}

    def pick(key, derived, rule):
        if has and dr.get(key) is not None:
            src[key] = f'чертёж {dr["drawing"]}'
            return float(dr[key])
        src[key] = 'расчёт по шаблону: ' + RULES.get(rule, rule)
        return round(derived, 2)

    vis_h = dv['visible_height_mm']
    rim_guess = 2 * (t['blue']['R_top_mm'] * sb + 0.97 * 3.3)
    curl = pick('curl_d', 2.5 if rim_guess < 76 else 3.3, 'curl_d')
    rim = pick('rim_od', 2 * (t['blue']['R_top_mm'] * sb + 0.97 * curl), 'rim_od')
    height = pick('height', vis_h + 0.86 * curl, 'height')
    base = pick('base_od', 2 * (t['blue']['R_bottom_mm'] * sb + 0.22), 'base_od')
    wall = pick('wall', 0.30, 'wall')
    floor = pick('floor', 0.30, 'wall')
    floor_top = pick('floor_top', 5.0 if rim < 75 else (6.2 if height < 100 else 7.0), 'floor_top')
    fold = dv['hidden_bottom_mm']
    p = copy.deepcopy(BASE_HB)
    p['model'] = name
    p['label'] = f'{name} · однослойный'
    p['status'] = 'draft'
    p['hero_rotation_deg'] = 0.0
    p['_hero_rotation_src'] = 'не задано: логотипа на черновике нет'
    p['sources'] = {'drawing': dr.get('drawing'), 'template': f"Mockups/{t['file']}", 'artwork': None, 'photos': None,
                    'note': dr.get('note')}
    tc = round(min(0.30, 0.8 * wall), 2)
    p['cup'] = {'height_mm': height, 'rim_od_mm': rim, 'curl_d_mm': curl, 'base_od_mm': base, 'taper_deg': beta,
                'wall_mm': wall, 'curl_sheet_mm': tc, 'floor_mm': floor, 'floor_top_mm': floor_top,
                '_src': dict(src, taper_deg=f'шаблон: видимая дуга {dv["visible_span_deg"]}° = 360°·sinβ'
                             + (f'; по чертежу {dr["taper"]}°' if dr.get('taper') else ''),
                             curl_sheet_mm='0.8 стенки, не больше 0.30 (как HB80-280)')}
    rho1 = curl / 2 - tc / 2
    p['construction'] = {'heel_gap_mm': 0.02,
                         'return_top_mm': round(min(fold - 0.17, floor_top - floor - 0.3), 2),
                         'skirt_end_above_heel_mm': 0.1, 'floor_bend_outer_mm': round(max(0.45, floor + 0.2), 2),
                         'curl_turn_deg': 325.0, 'curl_end_radius_mm': round(0.7 * rho1, 3),
                         'neck_start_mm': round(height - curl - 1.1, 2),
                         '_src': {'return_top_mm': f'подворот кончается там, где кончается заготовка: лист ниже линии сгиба ровно {fold} мм (шаблон: синяя нижняя − высечка); если столько под дно не входит — обрезан по дну',
                                  'curl_end_radius_mm': '0.7 радиуса скрутки (как HB80-280)',
                                  'neck_start_mm': 'H − Ø скрутки − 1.1 (как HB80-280)',
                                  'other': 'как HB80-280'}}
    # The board below the reference must be exactly what the blank has under
    # the blue line; the height of the return follows from that (linear).
    def board_below(rt):
        con = dict(p['construction'], return_top_mm=rt)
        return -float(_paper().cup_profile(p['cup'], con, p['mesh']).arrays()[3].min())
    rt0 = p['construction']['return_top_mm']
    solved = rt0 + (fold - board_below(rt0)) / (board_below(rt0 + 1.0) - board_below(rt0))
    # round down: the modelled board may end inside the die-cut, never past it
    p['construction']['return_top_mm'] = math.floor(min(solved, floor_top - floor - 0.3) * 100) / 100
    p['template'] = template_block(t)
    p['registration'] = {'reference': 'heel', 'R_at_reference_mm': t['blue']['R_bottom_mm'], 'design_shift_mm': 0.0,
                         '_src': {'R_at_reference_mm': 'синяя нижняя дуга = линия сгиба у пятки (правило HB, проверено на 7 чертежах)'}}
    return p


def _paper():
    import importlib.util
    spec = importlib.util.spec_from_file_location('paper', ROOT / 'cup_mockup/paper.py')
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def _outline(P, N, t):
    import numpy as np
    return np.vstack((P + N * t[:, None] / 2, P - N * t[:, None] / 2))


def dw_clearance(p, inner, sl, mesh):
    """Smallest gaps in the r/z section: sleeve roll vs inner wall, sleeve vs curl end."""
    import numpy as np
    pp = _paper()
    ip = pp.cup_profile(inner['cup'], inner['construction'], inner['mesh'])
    P, N, t, _ = ip.arrays()
    inner_pts = _outline(P, N, t)
    sp = pp.sleeve_profile(sl, inner['cup'], mesh)
    S, SN, st, _ = sp.arrays()
    sleeve_pts = _outline(S, SN, st)
    zone = np.array(sp.zone * 2)
    d = np.sqrt(((sleeve_pts[:, None, :] - inner_pts[None, :, :]) ** 2).sum(-1)).min(1)
    roll = zone == 'ROLL'
    curl_zone = np.array([z == 'CURL' for z in ip.zone] * 2)
    dc = np.sqrt(((sleeve_pts[:, None, :] - inner_pts[curl_zone][None, :, :]) ** 2).sum(-1)).min(1)
    return float(d[roll].min()), float(dc.min())


def dw_draft(name):
    t = T[name]
    dv = t['derived']
    inner_name = 'HB' + name[2:]
    dk = DRAWING_OF.get(name)
    dr = D.get(dk, {}) if dk else {}
    ipath = PARAMS / f'{inner_name}.json'                 # promoted model wins over the draft
    ip = json.loads((ipath if ipath.exists() else OUT / f'{inner_name}.json').read_text(encoding='utf-8'))
    icup = ip['cup']
    beta = dv['cone_half_angle_deg']
    p = copy.deepcopy(BASE_DW)
    p['model'] = name
    p['label'] = f'{name} · двухслойный'
    p['status'] = 'draft'
    # the inner cup may already be a promoted model
    p['inner_from'] = inner_name if (PARAMS / f'{inner_name}.json').exists() else f'drafts/{inner_name}'
    p['hero_rotation_deg'] = 0.0
    p['_hero_rotation_src'] = 'не задано'
    p['sources'] = {'drawing': dr.get('drawing'), 'template': f"Mockups/{t['file']}", 'artwork': None, 'photos': None}
    rho1 = icup['curl_d_mm'] / 2 - icup['curl_sheet_mm'] / 2
    p['inner_overrides'] = {'construction': {'curl_turn_deg': 280.0, 'curl_end_radius_mm': round(rho1 - 0.05, 3)},
                            '_src': {'construction': 'как DW80-280: скрутка заканчивается снаружи обечайки'}}
    fit = round(icup['height_mm'] - icup['curl_d_mm'], 2)
    sl = copy.deepcopy(BASE_DW['sleeve'])
    sl.update({'taper_deg': beta, 'sheet_mm': dr.get('sleeve_sheet', 0.3), 'bottom_z_mm': dr.get('sleeve_bottom_z', 10.0),
               'top_z_mm': round(fit + 1.8, 2), 'fit_z_mm': fit, 'visible_top_z_mm': fit})
    sl.pop('top_od_drawing_mm', None)
    if dr.get('sleeve_top_od'):
        sl['top_od_drawing_mm'] = dr['sleeve_top_od']
    # Fit the roll into the gap to the inner cup and keep the tuck clear of the
    # curl end, with room for the doubled seams (≈0.4 mm).
    inner = copy.deepcopy(ip)
    for k, v in p['inner_overrides']['construction'].items():
        inner['construction'][k] = v
    chosen = None
    # Clearances must also swallow the doubled seams: the sleeve flap stands
    # 0.3 mm proud and, near the fit line, the sleeve rides 0.4 mm out over the
    # inner cup's lap (build._sleeve drape).
    for top_gap in (0.05, 0.15, 0.25, 0.35, 0.5):
        for roll in (0.65, 0.55, 0.45, 0.4):
            for turn in (280.0, 272.0, 265.0, 258.0, 250.0):
                sl.update(top_gap_mm=top_gap, roll_radius_mm=roll, roll_end_radius_mm=round(roll * 0.65, 3))
                inner['construction']['curl_turn_deg'] = turn
                g_roll, g_curl = dw_clearance(p, inner, sl, p['mesh'])
                if g_roll >= 0.50 and g_curl >= 0.55:
                    chosen = (top_gap, roll, turn, g_roll, g_curl)
                    break
            if chosen:
                break
        if chosen:
            break
    if not chosen:
        raise RuntimeError(f'{name}: sleeve does not fit the inner cup')
    p['inner_overrides']['construction']['curl_turn_deg'] = chosen[2]
    sl['_src'] = {'taper_deg': f'шаблон: видимая дуга {dv["visible_span_deg"]}°' + (f'; по чертежу {dr["sleeve_taper"]}°' if dr.get('sleeve_taper') else ''),
                  'bottom_z_mm': 'чертёж' if dr else 'как у DW80-280 и DW90-430 (10 мм)',
                  'fit_z_mm': 'низ скрутки внутреннего стакана (H − Ø скрутки), как DW80-280',
                  'top_z_mm': 'обечайка заходит в скрутку на 1.8 мм, как DW80-280',
                  'other': 'как DW80-280',
                  'top_gap_mm': f'подобрано генератором: зазоры в сечении — подворот {chosen[3]:.2f} мм, конец скрутки {chosen[4]:.2f} мм',
                  'roll_radius_mm': 'подобрано генератором под зазор до внутреннего стакана'}
    p['sleeve'] = sl
    p['template'] = template_block(t)
    p['registration'] = {'reference': 'roll_bottom', 'R_at_reference_mm': t['blue']['R_bottom_mm'], 'design_shift_mm': 2.0,
                         'R_at_visible_top_mm': t['blue']['R_top_mm'],
                         '_src': {'design_shift_mm': 'правило заказчика 20.09.2026 для всех DW: нижняя граница видимой области на 2 мм выше синей (скрутка выше)',
                                  'R_at_visible_top_mm': 'видимый верх обечайки — по синей верхней (как DW80-280)'}}
    return p


def main():
    OUT.mkdir(exist_ok=True)
    made = []
    for name in sorted(T):
        t = T[name]
        if (PARAMS / f'{name}.json').exists() or 'derived' not in t:
            continue                      # already promoted to a full model
        if name.startswith('HB'):
            p = hb_draft(name)
        else:
            continue
        (OUT / f'{name}.json').write_text(json.dumps(p, ensure_ascii=False, indent=2), encoding='utf-8')
        made.append(name)
    for name in sorted(T):
        if (name.startswith('DW') and not name.startswith('DWE')
                and not (PARAMS / f'{name}.json').exists() and 'derived' in T[name]):
            p = dw_draft(name)
            (OUT / f'{name}.json').write_text(json.dumps(p, ensure_ascii=False, indent=2), encoding='utf-8')
            made.append(name)
    print('drafts:', ' '.join(made))


if __name__ == '__main__':
    main()
