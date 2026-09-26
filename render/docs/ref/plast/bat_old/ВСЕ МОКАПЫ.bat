@echo off
chcp 866 >nul
setlocal
set PYTHONIOENCODING=cp866
title Все фоны

rem ---------------------------------------------------------------------
rem  Пересчитать весь набор мокапов в финальном качестве.
rem  Пять фонов, объём и режим печати берутся из mockup\params\shots.json.
rem  Считается долго: это пять сцен по 450 сэмплов на 1600 px.
rem ---------------------------------------------------------------------

set "BLENDER="
for /d %%D in ("C:\Program Files\Blender Foundation\Blender*") do if exist "%%D\blender.exe" set "BLENDER=%%D\blender.exe"
if not defined BLENDER (
  echo Blender не найден в Program Files.
  pause
  exit /b 2
)

"%BLENDER%" -b --factory-startup --python-exit-code 1 -P "%~dp0mockup\run.py" -- --all --render
set "CODE=%ERRORLEVEL%"
echo.
if "%CODE%"=="0" (
  echo Готово. Кадры и файлы сцен лежат в mockup\out
  rem Обзорная страница: сначала пробуем py, потом python. Обе строки
  rem безопасны: неудачная просто ничего не делает.
  py -3.11 "%~dp0mockup\tools\make_contact_sheet.py" >nul 2>&1
  python "%~dp0mockup\tools\make_contact_sheet.py" >nul 2>&1
  if exist "%~dp0mockup\out\ОБЗОР.html" (
    start "" "%~dp0mockup\out\ОБЗОР.html"
  ) else (
    start "" "%~dp0mockup\out"
  )
) else (
  echo Не собралось, код %CODE%.
)
pause
