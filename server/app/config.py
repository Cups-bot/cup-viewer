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
# Токены (§3–§4 концепции): цена кадра по уровню, «Убрать знак», приветственные.
PRICES = {tier: t["price"] for tier, t in TIERS.items()}
# Кадры до уровней заказывали по пикселям: 1600 — нынешний Standard, 3000 — Ultra.
LEGACY_SIZES = {"1600": "standard", "3000": "ultra"}


def tier_of(size: str) -> str:
    return LEGACY_SIZES.get(size, size)


UNMARK_PRICE = 1
WELCOME_TOKENS = 3
WELCOME_DAYS = 30
# Пакеты токенов (§5). Цены — заглушка до замера себестоимости (§9).
PACKS = {10: 490, 30: 1290, 100: 3900}

# Хранение (§10): макеты и кадры живут 30 дней.
RETENTION_DAYS = 30

# Вход (§6): код из 6 цифр, живёт 10 минут, 5 попыток; не чаще 5 кодов в час
# на почту; не больше 5 новых аккаунтов с одного адреса в сутки.
CODE_TTL_MIN = 10
CODE_ATTEMPTS = 5
CODES_PER_HOUR = 5
ACCOUNTS_PER_IP_DAY = 5
SESSION_DAYS = 30
DISPOSABLE_DOMAINS = {
    "mailinator.com", "yopmail.com", "10minutemail.com", "guerrillamail.com", "sharklasers.com",
    "tempmail.com", "temp-mail.org", "trashmail.com", "getnada.com", "dispostable.com",
    "maildrop.cc", "mohmal.com", "fakeinbox.com", "throwawaymail.com", "emailondeck.com",
}

# Очередь (§9): у бесплатных — одно задание в очереди; зависшее у исполнителя
# (нет вестей 10 минут) возвращается в очередь.
FREE_ACTIVE_JOBS = 1
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
PUBLIC_FILES = {"index.html", "admin.html"}
PUBLIC_DIRS = {"dist", "css", "js", "assets", "catalog", "vendor"}
