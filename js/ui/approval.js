// Интерактив «страницы согласования» (блок 2): переключатели режимов, кнопки
// согласования/правок/шаринга и подсказка. Логики вьювера не касается — только
// оформление страницы. Всё опционально: если элемента нет, обработчик молчит.

// Тосты берём у вьювера, если он уже поднялся (window.cupViewer.ui.showToast).
function toast(message, type = 'success') {
  window.cupViewer?.ui?.showToast?.(message, type);
}

function initApproval() {
  // Переключатель режимов: 3D — рабочий, остальные пока витринные.
  const tabs = Array.from(document.querySelectorAll('.stage-tab'));
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      if (tab.textContent.trim() !== '3D-визуализация') {
        toast('Этот режим появится позже', 'error');
      }
    });
  });

  // Подсказка по кнопке «i».
  const hint = document.getElementById('stage-hint');
  document.getElementById('info-btn')?.addEventListener('click', () => {
    if (hint) hint.hidden = !hint.hidden;
  });

  // Согласование: фиксируем макет визуально и запираем действия.
  const chip = document.getElementById('status-chip');
  const approveBtn = document.getElementById('approve-btn');
  approveBtn?.addEventListener('click', () => {
    if (chip) {
      chip.classList.add('is-done');
      const text = chip.querySelector('.status-chip__text');
      if (text) text.textContent = 'Согласовано — макет отправлен в печать';
    }
    approveBtn.disabled = true;
    approveBtn.textContent = 'Согласовано ✓';
    approveBtn.style.opacity = '0.6';
    approveBtn.style.cursor = 'default';
    document.getElementById('edits-btn')?.setAttribute('disabled', '');
    toast('Заказ согласован и отправлен в печать');
  });

  // Правки — заглушка под будущую форму комментариев.
  document.getElementById('edits-btn')?.addEventListener('click', () => {
    toast('Форма правок скоро появится', 'error');
  });

  // Поделиться — копируем персональную ссылку в буфер обмена.
  document.getElementById('share-btn')?.addEventListener('click', async () => {
    const link = document.getElementById('order-link')?.textContent?.trim();
    if (!link) return;
    const url = link.startsWith('http') ? link : `https://${link}`;
    try {
      await navigator.clipboard.writeText(url);
      toast('Ссылка скопирована');
    } catch {
      toast('Не удалось скопировать ссылку', 'error');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApproval, { once: true });
} else {
  initApproval();
}
