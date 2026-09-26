@echo off
start "" "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" "%~dp0output\production\HB80-280\HB80-280.blend" --python "%~dp0work\open_project.py"
