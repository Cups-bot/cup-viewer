// Вход Design Mode (index.html). Режим задаётся здесь, а не параметром адреса.
import { boot, showStartupFailure, whenDomReady } from '../app/boot.js';
import { initDesign } from '../design/designShell.js';
import { loadSession } from '../design/session.js';
import { initTheme } from '../ui/theme.js';
import { initLottie } from '../ui/lottie.js';
import { initSegments } from '../ui/motion.js';

whenDomReady(() => {
  initTheme();
  initLottie();
  initSegments();
  boot({
    mode: 'design',
    // Без сохранённой сессии — пустая сцена и «Выбрать стакан» (§11).
    initialState: (catalog) => loadSession(catalog),
  })
    .then((app) => initDesign(app))
    .catch(showStartupFailure);
});
