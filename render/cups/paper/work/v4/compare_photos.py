"""Side-by-side sheets: reference photo | v4 render, into output/production/<MODEL>/review.

py -3.10 work/v4/compare_photos.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
PAIRS = {
    'HB80-280': [
        ('01_catalogue', 'images/HB80-280/IMG_7998.JPG', 'hero.png', 'Общий вид: пропорции, оливковая полоса, логотип'),
        ('02_seam', 'images/HB80-280/IMG_8014.JPG', 'seam_macro.png', 'Шов: одна кромка клапана, рисунок без сдвига'),
        ('03_rim', 'images/HB80-280/IMG_8007.JPG', 'rim_macro.png', 'Венчик у шва: скрутка и ступенька нахлёста'),
        ('04_bottom', 'images/HB80-280/IMG_8013.JPG', 'underside.png', 'Дно: подворот с текстом, донный диск'),
        ('05_heel', 'images/HB80-280/IMG_8014.JPG', 'bottom_macro.png', 'Пятка у шва'),
        ('06_inside', 'images/HB80-280/IMG_8009.JPG', 'interior.png', 'Внутри: линия шва до дна'),
    ],
    'DW80-280': [
        ('01_catalogue', 'images/DW80-280/DW80-280-0037 (2).JPG', 'print.png', 'Общий вид (фото растянуто по вертикали ~11 %)'),
        ('02_catalogue_mdk', 'images/DW80-280/mdklinik.jpg', 'hero.png', 'Пропорции: белая полоса под обечайкой ~10 мм'),
        ('03_sleeve_roll', 'images/DW80-280/DW80-280-0037 (2).JPG', 'sleeve_macro.png', 'Подворот обечайки на шве — без складки'),
        ('04_seam', 'images/DW80-280/DW80-280-0037 (2).JPG', 'seam_macro.png', 'Шов обечайки: служебный текст у кромки'),
        ('05_bottom', 'images/HB80-280/IMG_8013.JPG', 'underside.png', 'Дно (внутренний стакан как HB)'),
    ],
}
CROPS = {('DW80-280', '03_sleeve_roll'): (300, 3700, 3500, 5616)}
H = 900


def font(size):
    for name in ('segoeui.ttf', 'arial.ttf'):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            pass
    return ImageFont.load_default()


def sheet(model, key, photo, render, caption):
    out = ROOT / 'output/production' / model / 'review'
    out.mkdir(parents=True, exist_ok=True)
    rpath = ROOT / 'output/production' / model / 'renders' / render
    if not rpath.exists():
        print('missing', rpath)
        return
    a = Image.open(ROOT / photo).convert('RGB')
    if (model, key) in CROPS:
        a = a.crop(CROPS[(model, key)])
    b = Image.open(rpath).convert('RGB')
    a = a.resize((round(a.width * H / a.height), H))
    b = b.resize((round(b.width * H / b.height), H))
    top = 56
    img = Image.new('RGB', (a.width + b.width + 12, H + top), (245, 245, 243))
    img.paste(a, (0, top))
    img.paste(b, (a.width + 12, top))
    d = ImageDraw.Draw(img)
    d.text((10, 8), f'Фото: {Path(photo).name}', fill=(40, 40, 40), font=font(22))
    d.text((a.width + 22, 8), f'Модель v4: {render}', fill=(40, 40, 40), font=font(22))
    d.text((10, 32), caption, fill=(90, 90, 90), font=font(18))
    path = out / f'{key}.jpg'
    img.save(path, quality=88)
    print('saved', path)


for model, pairs in PAIRS.items():
    for key, photo, render, caption in pairs:
        sheet(model, key, photo, render, caption)
