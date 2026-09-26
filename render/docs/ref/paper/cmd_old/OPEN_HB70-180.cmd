@echo off
start "" "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" "%~dp0output\production\HB70-180\HB70-180.blend" --python "%~dp0work\open_project.py"
