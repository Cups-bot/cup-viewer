"""Экспозиция каждого фона под общий конвейер Khronos PBR Neutral.

Два способа, по ключу фона exposure_mode:

  card — по серой карте (по умолчанию для фотобокса). Освещённая сторона
         стакана с листом 18 % серого должна дать 18 % (118 из 255): тогда
         любой цвет печати на ней выходит как в файле. Каталожный свет.

  auto — меньшая из двух экспозиций (остальные сцены): по карте и по яркости
         кадра. «По кадру» — кадр в целом так же светел, как в прежнем,
         одобренном виде сцены (--legacy-color). В living, podium, water, window
         стакан освещён сзади или сбоку: карта сожгла бы окна, решает кадр. В
         spotlight, cream, ice стакан освещён спереди: кадр пересветил бы печать,
         решает карта.

Стакан — HB90-530 (136 мм, рост эталона: камера не подъезжает), немелованный,
лист 18 % серого.

    py -3 engine/tools/calibrate_exposure.py            все фоны, два прохода, запись в sets/*.json
    py -3 engine/tools/calibrate_exposure.py --check    только замер
    py -3 engine/tools/calibrate_exposure.py --set water
"""

import argparse
import datetime
import glob
import io
import json
import math
import os
import subprocess
import sys
from collections import OrderedDict

import numpy as np
from PIL import Image

PROJECT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CUP = "HB90-530"
GREY = os.path.join(PROJECT, "art", "calibration", "grey18_A4.png")
OUT = os.path.join(PROJECT, "out", "calibration")


def blender():
    found = sorted(glob.glob(r"C:\Program Files\Blender Foundation\Blender*\blender.exe"))
    if not found:
        sys.exit("Blender не найден")
    return found[-1]


def srgb_to_lin(c):
    c = np.asarray(c, float) / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def ensure_grey():
    if not os.path.isfile(GREY):
        os.makedirs(os.path.dirname(GREY), exist_ok=True)
        Image.new("RGB", (1754, 1240), (118, 118, 118)).save(GREY)   # 18 % серого, A4 150 dpi


def render(set_name, legacy=False):
    out = os.path.join(OUT, "legacy" if legacy else "pbn")
    args = [blender(), "-b", "--factory-startup", "--python-exit-code", "1",
            "-P", os.path.join(PROJECT, "engine", "run.py"), "--",
            "--set", set_name, "--cup", CUP, "--board", "uncoated", "--art", GREY,
            "--samples", "64", "--resolution", "700", "--no-save", "--output-dir", out, "--render"]
    if legacy:
        args.append("--legacy-color")
    res = subprocess.run(args, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if res.returncode:
        raise RuntimeError(f"{set_name}: рендер не удался\n{res.stdout[-1500:]}{res.stderr[-800:]}")
    stem = f"{set_name}_{CUP}-uncoated_sheet"
    with open(os.path.join(out, stem + ".json"), encoding="utf-8") as fh:
        info = json.load(fh)
    img = np.asarray(Image.open(os.path.join(out, stem + ".png")).convert("RGB"), float)
    return info, img


def face_linear(info, img):
    x, y = info["face_px"]
    r = 6
    patch = img[max(0, y - r):y + r + 1, max(0, x - r):x + r + 1].reshape(-1, 3)
    return float(srgb_to_lin(patch.mean(0)).mean())


def frame_gmean(img):
    lum = srgb_to_lin(img) @ np.array([0.2126, 0.7152, 0.0722])
    return float(np.exp(np.log(np.clip(lum, 0.002, 1.0)).mean()))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--set", default=None)
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--passes", type=int, default=2)
    args = ap.parse_args()
    ensure_grey()
    names = [args.set] if args.set else sorted(
        os.path.basename(f)[:-5] for f in glob.glob(os.path.join(PROJECT, "sets", "*.json"))
        if not os.path.basename(f).startswith("_"))
    for name in names:
        path = os.path.join(PROJECT, "sets", name + ".json")
        with io.open(path, encoding="utf-8") as fh:
            d = json.load(fh, object_pairs_hook=OrderedDict)
        mode = d.get("exposure_mode") or ("card" if d.get("source") == "greybox" else "auto")
        if mode == "match":
            mode = "auto"
        target = None
        if mode == "auto":
            _info, legacy = render(name, legacy=True)
            target = frame_gmean(legacy)
        for p in range(1 if args.check else args.passes):
            info, img = render(name)
            cur = info["color"]["exposure"]
            face = face_linear(info, img)
            ev_card = math.log2(0.18 / max(face, 1e-4)) + cur
            if mode == "card":
                got, ev = face, ev_card
                note = f"серый на стенке лин. {face:.3f}"
            else:
                # Меньшая из двух: печать на освещённой стороне не светлее
                # файла (карта) и кадр не светлее прежнего вида (кадр). В
                # контровом свете решает кадр, во фронтальном — карта.
                got = frame_gmean(img)
                ev_frame = math.log2(target / max(got, 1e-4)) + cur
                ev = min(ev_card, ev_frame)
                note = (f"карта {ev_card:+.2f}, кадр {ev_frame:+.2f} "
                        f"({got:.4f} против прежнего {target:.4f}) → по {'карте' if ev_card < ev_frame else 'кадру'}")
            print(f"{name:<10} [{mode}] проход {p + 1}: {note}, экспозиция {cur:+.2f} → {ev:+.2f}")
            if args.check:
                break
            d["exposure"] = round(ev, 2)
            d["exposure_mode"] = mode
            d["_exposure_calibration"] = OrderedDict([
                ("date", datetime.date.today().isoformat()), ("cup", CUP), ("card", "18 % серого"),
                ("mode", mode), ("measured", round(got, 4)), ("at_ev", cur),
                ("legacy_frame_gmean", round(target, 4) if target else None)])
            with io.open(path, "w", encoding="utf-8") as fh:
                fh.write(json.dumps(d, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
