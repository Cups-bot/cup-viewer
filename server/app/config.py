"""Настройки сервера CupViewer v2 (этапы Г–Е, концепция docs/CONCEPT-v2.md).

Всё, что зависит от места запуска, — из переменных окружения: локально хватает
значений по умолчанию, на сервере (этап Ж) их задаёт окружение.
"""

import os
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DATA = Path(os.environ.get("CV_DATA", REPO / "server" / "data")).resolve()
DB_PATH = DATA / "cupviewer.sqlite3"
FILES = DATA / "files"
WORKER_KEY_FILE = DATA / "worker.key"

HOST = os.environ.get("CV_HOST", "127.0.0.1")
PORT = int(os.environ.get("CV_PORT", "8000"))

# Администраторы — по почте (владелец, 2026-09-26).
ADMIN_EMAILS = {e.strip().lower() for e in os.environ.get("CV_ADMINS", "danilkakhudia@gmail.com").split(",") if e.strip()}

# Уровни рендера (владелец, 2026-09-27): Standard и Ultra. px — длинная сторона
# кадра, её же берёт исполнитель; сэмплы — по его железу (server/worker.py).
TIERS = {
    "standard": {"label": "Standard", "px": int(os.environ.get("CV_PX_STANDARD", "2000")),
                 "price": int(os.environ.get("CV_PRICE_STANDARD", "2"))},
    "ultra": {"label": "Ultra", "px": int(os.environ.get("CV_PX_ULTRA", "4000")),
              "price": int(os.environ.get("CV_PRICE_ULTRA", "5"))},
}
# Токены: цена кадра по уровню.
PRICES = {tier: t["price"] for tier, t in TIERS.items()}
# Кадры до уровней заказывали по пикселям: 1600 — нынешний Standard, 3000 — Ultra.
LEGACY_SIZES = {"1600": "standard", "3000": "ultra"}


def tier_of(size: str) -> str:
    return LEGACY_SIZES.get(size, size)


# Подписка (владелец, 2026-09-28): сайт целиком — по почте и паролю, после
# оплаты доступа. Тариф — срок и стартовые токены на этот срок (сгорают с его
# концом); внутри подписки докупаются пакеты. Подписка кончилась — доступ
# закрыт, даже если токены остались. Тарифы правит админка (таблица plans),
# здесь — только то, чем заполняется пустая база. Цены — заглушка.
DEFAULT_PLANS = [
    {"id": "month", "label": "Месяц", "days": 30, "price_rub": 990, "starter_tokens": 3, "sort": 1},
    {"id": "quarter", "label": "3 месяца", "days": 90, "price_rub": 2490, "starter_tokens": 10, "sort": 2},
]
# Пакеты токенов (§5) — только при действующей подписке. Цены — заглушка до
# замера себестоимости (§9).
PACKS = {10: 490, 30: 1290, 100: 3900}

# Хранение (§10): макеты и кадры живут 30 дней.
RETENTION_DAYS = 30

# Вход — почта и пароль (scrypt, security.py); не больше 10 неверных паролей
# на почту за 15 минут. Сброс пароля — код из 6 цифр: живёт 10 минут, 5
# попыток, не чаще 5 кодов в час на почту. Не больше 5 новых аккаунтов с
# одного адреса в сутки.
PASSWORD_MIN = 8
LOGIN_FAILS = 10
LOGIN_FAILS_MINUTES = 15
CODE_TTL_MIN = 10
CODE_ATTEMPTS = 5
CODES_PER_HOUR = 5
ACCOUNTS_PER_IP_DAY = int(os.environ.get("CV_ACCOUNTS_PER_IP_DAY", "5"))
SESSION_DAYS = 30
DISPOSABLE_DOMAINS = {
    "mailinator.com", "yopmail.com", "10minutemail.com", "guerrillamail.com", "sharklasers.com",
    "tempmail.com", "temp-mail.org", "trashmail.com", "getnada.com", "dispostable.com",
    "maildrop.cc", "mohmal.com", "fakeinbox.com", "throwawaymail.com", "emailondeck.com",
}

# Очередь (§9): у каждого не больше трёх заданий в работе — очередь общая;
# зависшее у исполнителя (нет вестей 10 минут) возвращается в очередь.
MAX_ACTIVE_JOBS = 3
STALE_MINUTES = 10
# Задание зависало у исполнителя столько раз — больше не крутим его по кругу:
# сбой с возвратом токенов (оно, видимо, и роняет исполнителя).
STALE_ATTEMPTS = 3
# Исполнитель не выходил на связь столько минут — «рендер-сервер не на связи».
WORKER_OFFLINE_MIN = 2
# Задание ждёт исполнителя дольше — сбой с возвратом токенов.
QUEUE_TIMEOUT_HOURS = 24

# Размер загрузок: макет до 50 МБ (владелец, 2026-09-25), кадр от исполнителя — до 80 МБ.
MAX_ART_BYTES = 50 * 1024 * 1024
# Растр макета в пикселях: больше — не разжимаем (исполнитель упал бы по памяти).
MAX_ART_SIDE = 16384
MAX_ART_PIXELS = 120_000_000
MAX_IMAGE_BYTES = 80 * 1024 * 1024

# Что сервер отдаёт как сайт: только страницы и их папки, не весь репозиторий
# (там render/, server/data/, .git). vendor/ — декодер Draco (PET, EM90-530)
# и pdf.js (макеты PDF): без них эти стаканы и PDF не открываются.
# Ссылок клиенту нет (владелец, 2026-09-27: общий сервис) — view.html не отдаётся.
PUBLIC_FILES = {"index.html", "admin.html", "login.html"}
PUBLIC_DIRS = {"dist", "css", "js", "assets", "catalog", "vendor"}
# Закрыто подпиской (владелец, 2026-09-28): страницы сайта и данные — модели,
# фоны, каталог, шаблоны, декодеры. Без доступа страница уводит на вход
# (login.html), данные — 403. Код и стили открыты: в них нет ничего, кроме
# самой страницы входа.
GATED_PAGES = {"index.html", "admin.html"}
GATED_PREFIXES = ("assets/models/", "assets/hdri/", "assets/textures/", "assets/thumbs/",
                  "assets/templates/", "catalog/", "vendor/")
