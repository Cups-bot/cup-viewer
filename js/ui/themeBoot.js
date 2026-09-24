// Тема до первой отрисовки: обычный (не модульный) скрипт в <head>, чтобы
// тёмная тема не мигала светлой. Выбор человека — в localStorage, иначе — как
// в системе. Переключатель — js/ui/theme.js.
(function () {
  var stored = null;
  try {
    stored = localStorage.getItem('cv.theme');
  } catch (error) {
    stored = null;
  }
  var dark = stored ? stored === 'dark' : window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
})();
