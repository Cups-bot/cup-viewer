// Переключатель темы «солнце / луна», как на colorcups.ru. Тема до загрузки
// модулей ставится в js/ui/themeBoot.js; здесь — кнопки и слежение за
// системой, пока человек не выбрал сам.

import { transitionTheme } from './motion.js';

const KEY = 'cv.theme';

function stored() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  for (const button of document.querySelectorAll('[data-theme-set]')) {
    button.setAttribute('aria-pressed', String(button.dataset.themeSet === theme));
  }
}

export function initTheme() {
  const system = window.matchMedia?.('(prefers-color-scheme: dark)');
  apply(stored() ?? (system?.matches ? 'dark' : 'light'));
  system?.addEventListener?.('change', (event) => {
    if (!stored()) apply(event.matches ? 'dark' : 'light');
  });
  for (const button of document.querySelectorAll('[data-theme-set]')) {
    button.addEventListener('click', () => {
      const theme = button.dataset.themeSet;
      if (document.documentElement.dataset.theme === theme) return;
      try {
        localStorage.setItem(KEY, theme);
      } catch {
        // Не сохранилось — тема всё равно сменится до перезагрузки.
      }
      const rect = button.getBoundingClientRect();
      transitionTheme(() => apply(theme), { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    });
  }
}
