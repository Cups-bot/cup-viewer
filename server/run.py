"""Запуск сервера CupViewer из любого каталога: server/.venv/Scripts/python server/run.py"""

import os
import runpy
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
os.chdir(REPO)
sys.path.insert(0, str(REPO))
runpy.run_module("server", run_name="__main__")
