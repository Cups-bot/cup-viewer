// Индикатор загрузки и тосты. Это hooks движка (см. Viewer): движок сообщает,
// что происходит, а как это показать — решает оболочка.

export function createFeedback({ toastDuration = 2500 } = {}) {
  const loader = document.getElementById('loader');
  const loaderText = document.getElementById('loader-text');

  const api = {
    // percent — только реальный: null или отрицательный значит «неизвестно».
    onLoading(label = 'Загрузка…', percent = null) {
      if (!loader) return;
      loaderText.textContent = percent != null && percent >= 0 ? `${label} ${Math.round(percent)}%` : label;
      loader.hidden = false;
    },

    onLoaded() {
      if (loader) loader.hidden = true;
    },

    // type: 'success' | 'warning' (макет стоит, но стоит проверить) | 'error'.
    onToast(message, type = 'success') {
      document.querySelector('.toast')?.remove();
      const toast = document.createElement('div');
      toast.className = type === 'success' ? 'toast' : `toast toast--${type}`;
      toast.setAttribute('role', 'status');
      toast.textContent = message;
      document.body.appendChild(toast);
      // Уход начинается чуть раньше: анимация исчезновения укладывается в
      // последние 300 мс, и тост не обрывается на полуслове.
      // Предупреждение и ошибку надо успеть прочитать: они висят вдвое дольше.
      const duration = type === 'success' ? toastDuration : toastDuration * 2;
      setTimeout(() => toast.classList.add('is-leaving'), Math.max(duration - 300, 0));
      setTimeout(() => toast.remove(), duration);
    },
  };
  return api;
}
