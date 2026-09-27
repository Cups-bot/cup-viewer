"""Атлас листьев владельца (ChatGPT, листья на белом) → маска, номера, рамки.

    python render/engine/tools/prep_leaf_atlas.py

Белый фон — не прозрачность: лист — где насыщенно или темно, мягкий край —
пороговая рампа. Рамки — связные области маски (со стеблями); рамки соседей
перекрываются, поэтому ещё карта номеров: лист в шейдере показывает только
свою область. Результат рядом с атласом (scenes/assets/park/user):
leaf_atlas_alpha.png, leaf_atlas_ids.png, leaf_atlas_color.png (без белой каймы),
leaf_atlas_boxes.json (рамки, центр, ось листа),
leaf_atlas_idx.jpg (номера — для выбора листьев в build_park.py)."""
import glob
import json
import os

import cv2
import numpy as np

D = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
                 "scenes", "assets", "park", "user")
src = [f for f in glob.glob(os.path.join(D, "*ChatGPT*.png"))][0]
img = cv2.imdecode(np.fromfile(src, np.uint8), cv2.IMREAD_COLOR).astype(np.float32) / 255.0
nrm = cv2.imdecode(np.fromfile(os.path.join(D, "leaf_atlas_normal_generated.png"), np.uint8), cv2.IMREAD_COLOR)
mx, mn = img.max(axis=2), img.min(axis=2)
sat = mx - mn
dark = 1.0 - mx
score = np.maximum(sat * 1.6, dark * 2.5)
alpha = np.clip((score - 0.06) / 0.10, 0, 1)
# мелкие дыры внутри листа (блики) закрыть, края не раздувать
solid = (alpha > 0.5).astype(np.uint8)
solid = cv2.morphologyEx(solid, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
n, lab, stats, cent = cv2.connectedComponentsWithStats(solid, 8)
boxes = []
for i in range(1, n):
    x, y, w, h, area = stats[i]
    if area < 800:
        continue
    boxes.append([int(x), int(y), int(x + w), int(y + h), int(area)])
fill = np.zeros_like(alpha)
for i in range(1, n):
    if stats[i][4] >= 800:
        fill[lab == i] = 1.0
alpha = np.maximum(alpha * (cv2.dilate(fill, np.ones((5, 5), np.uint8)) > 0), fill)
order = sorted([i for i in range(1, n) if stats[i][4] >= 800], key=lambda i: (stats[i][1] // 150, stats[i][0]))
boxes = [[int(stats[i][0]), int(stats[i][1]), int(stats[i][0] + stats[i][2]), int(stats[i][1] + stats[i][3]), int(stats[i][4])]
         for i in order]
# Карта номеров: рамки листьев перекрываются — лист показывает только свою
# область (номер + 1; 0 — фон). Мягкий край маски — к ближайшему листу.
ids = np.zeros(lab.shape, np.uint8)
for k, i in enumerate(order):
    ids[lab == i] = k + 1
grown = ids.copy()
for _ in range(6):
    dil = cv2.dilate(grown, np.ones((3, 3), np.uint8))
    grown = np.where(grown == 0, dil, grown)
cv2.imencode(".png", grown)[1].tofile(os.path.join(D, "leaf_atlas_ids.png"))
cv2.imencode(".png", (alpha * 255).astype(np.uint8))[1].tofile(os.path.join(D, "leaf_atlas_alpha.png"))
# Цвет без белой каймы: полупрозрачный край листа брал белый фон атласа — на
# листе в сцене читалась светлая кайма (разбор владельца). Фон за листом
# заливается цветом самого листа (inpaint), край — цветом листа.
core = (alpha > 0.97).astype(np.uint8)
bgr8 = (img * 255).astype(np.uint8)
bleed = cv2.inpaint(bgr8, (1 - core).astype(np.uint8), 4, cv2.INPAINT_TELEA)
cv2.imencode(".png", bleed)[1].tofile(os.path.join(D, "leaf_atlas_color.png"))
# Ось листа (главная жилка ≈ главная ось маски) и центр — для изгиба листа
# вдоль жилки в build_park.py (px атласа, угол от +x против часовой, y вверх).
shape = []
for k, i in enumerate(order):
    ys, xs = np.nonzero(lab == i)
    cx, cy = xs.mean(), ys.mean()
    cov = np.cov(np.stack([xs - cx, -(ys - cy)]))
    w, v = np.linalg.eigh(cov)
    ax = v[:, 1]
    shape.append({"centre": [round(float(cx), 1), round(float(cy), 1)],
                  "axis_deg": round(float(np.degrees(np.arctan2(ax[1], ax[0]))), 1),
                  "elong": round(float(np.sqrt(w[1] / max(w[0], 1e-6))), 2)})
json.dump({"atlas": os.path.basename(src), "size": [img.shape[1], img.shape[0]], "boxes": boxes, "shape": shape},
          open(os.path.join(D, "leaf_atlas_boxes.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
# совпадение нормалей с цветом: маска по нормалям (отклонение от плоского синего)
flat = np.array([255, 128, 128], np.float32)   # BGR: плоская нормаль (128,128,255) в BGR
dev = np.abs(nrm.astype(np.float32) - flat).sum(axis=2)
nm = (dev > 18).astype(np.uint8)
inter = (nm & solid).sum() / max(1, (nm | solid).sum())
print("leaves", len(boxes), "normal/colour IoU", round(float(inter), 3))
# лист с номерами — для выбора
vis = (img * 255).astype(np.uint8).copy()
for k, (x0, y0, x1, y1, a) in enumerate(boxes):
    cv2.rectangle(vis, (x0, y0), (x1, y1), (0, 0, 255), 2)
    cv2.putText(vis, str(k), (x0 + 4, y0 + 22), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 3)
    cv2.putText(vis, str(k), (x0 + 4, y0 + 22), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 1)
cv2.imencode(".jpg", vis)[1].tofile(os.path.join(D, "leaf_atlas_idx.jpg"))
