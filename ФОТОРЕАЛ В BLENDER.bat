@echo off
chcp 65001 >nul
rem ─────────────────────────────────────────────────────────────────────────
rem  «Фотореал» в Blender — как OPEN_*.cmd в 3D_Cups, но сцены фотореальные.
rem  Откроется Blender, справа панель N → «Фотореал»: фон и ракурс, стакан,
rem  картон, макет (PDF/AI/PNG), конгрев, «Имитация картона», второй стакан.
rem    «Собрать сцену» — сцена откроется здесь, F12 — пробный кадр
rem    «Черновик»      — настоящий кадр мелко, ~1 мин, откроется сам
rem    «В очередь»     — Ultra и др.: считается в отдельном окне по одному,
rem                      Blender можно закрыть. Кадры — D:\Cups_Soft\Рендеры
rem ─────────────────────────────────────────────────────────────────────────
set "BLENDER=C:\Program Files\Blender Foundation\Blender 5.2\blender.exe"
if not exist "%BLENDER%" (
  echo  Не найден Blender 5.2: %BLENDER%
  pause
  exit /b 1
)
start "" "%BLENDER%" --python "%~dp0render\engine\studio_panel.py"
