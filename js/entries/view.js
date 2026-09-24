// Вход Client Mode (view.html). Кода выбора модели, материала и загрузки
// макета здесь нет — не спрятан, а отсутствует в бандле (§37).
import { boot, showStartupFailure, whenDomReady } from '../app/boot.js';

whenDomReady(() => {
  boot({
    mode: 'client',
    // До этапа 07 клиент открывается на стакане каталога по умолчанию;
    // дальше здесь будет snapshot по ссылке (?v=<token>).
    initialState: (catalog) => ({ modelId: catalog.defaultModelId }),
  }).catch(showStartupFailure);
});
