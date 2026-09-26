@echo off
chcp 866 >nul
setlocal
set PYTHONIOENCODING=utf-8
title Панель съёмки

rem ---------------------------------------------------------------------
rem  Панель управления съёмкой в браузере. Двойной щелчок - откроется
rem  страница. Пока это окно открыто, панель работает; закрыть - Ctrl+C
rem  или просто закрыть окно.
rem  BAT-файлы никуда не делись и работают как раньше.
rem ---------------------------------------------------------------------

set "PY="
py -3.11 -c "import sys" >nul 2>&1
if not errorlevel 1 set "PY=py -3.11"
if not defined PY (
  py -3 -c "import sys" >nul 2>&1
  if not errorlevel 1 set "PY=py -3"
)
if not defined PY (
  python -c "import sys" >nul 2>&1
  if not errorlevel 1 set "PY=python"
)
if not defined PY (
  echo Python не найден. Установите Python 3 или пользуйтесь МОКАП.bat
  pause
  exit /b 2
)

%PY% "%~dp0mockup\web\server.py"
if errorlevel 1 pause
