"""Enable the local Cups panel for this Blender session without changing preferences.

Re-registers even when the module is already loaded from an earlier session: the
panel needs both its operators and the scene properties, and a half-registered
state leaves the panel unable to draw.
"""
import sys
from pathlib import Path

import bpy

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
if not hasattr(bpy.types.Scene, 'cups'):
    for name in [k for k in list(sys.modules) if k.startswith('cup_mockup')]:
        del sys.modules[name]
import cup_mockup
if not hasattr(bpy.types.Scene, 'cups'):
    cup_mockup.register()
root = bpy.data.objects.get('CUPS_Product')
if root and root.get('model'):
    try:
        bpy.context.scene.cups.model = root['model']
    except Exception:
        pass
