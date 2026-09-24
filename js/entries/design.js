// Вход Design Mode (index.html). Режим задаётся здесь, а не параметром адреса.
import { boot, showStartupFailure, whenDomReady } from '../app/boot.js';
import { initDesign } from '../design/designShell.js';

whenDomReady(() => {
  boot({
    mode: 'design',
    initialState: (catalog) => ({ modelId: catalog.defaultModelId }),
  })
    .then((app) => initDesign(app))
    .catch(showStartupFailure);
});
