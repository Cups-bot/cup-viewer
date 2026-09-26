"""blender -b --factory-startup -P work/v4/render_review.py -- MODEL PREFIX RES SAMPLES VIEW [VIEW ...] [--rot DEG]"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import review  # noqa: E402

argv = sys.argv[sys.argv.index('--') + 1:]
rot = None
if '--rot' in argv:
    i = argv.index('--rot')
    rot = float(argv[i + 1])
    del argv[i:i + 2]
model, prefix, res, samples, *views = argv
review.fresh(model)
for p in review.shots(views, prefix, int(res), int(samples), rot):
    print('RENDERED', p, flush=True)
