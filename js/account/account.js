// Кабинет CupViewer v2 (этапы Г–Е): вход по почте и коду, баланс токенов в
// шапке, рендер за токены, «Мои рендеры», покупка пакета, уведомление «Кадр
// готов». Только Design Mode — в клиентский бандл не попадает.
//
// Сервер — server/ (python -m server). На dev-сервере (npm run serve) API
// кабинета нет: api/me отвечает 404, и кабинет не показывается вовсе —
// остаётся ручное «Задание» для Blender (scripts/renderJobApi.mjs).

import { hideLayer, showLayer } from '../ui/motion.js';

export class ApiError extends Error {
  constructor(status, code) {
    super(code || `HTTP ${status}`);
    this.status = status;
    this.code = code;
  }
}

export async function api(path, { method = 'GET', json, body } = {}) {
  const res = await fetch(path, {
    method,
    credentials: 'same-origin',
    headers: json !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: json !== undefined ? JSON.stringify(json) : body,
  });
  const data = (res.headers.get('content-type') ?? '').includes('application/json') ? await res.json() : null;
  if (!res.ok) throw new ApiError(res.status, data?.error);
  return data;
}

// Тексты ошибок сервера — по-человечески.
const ERRORS = {
  bad_email: 'Проверьте адрес почты',
  disposable_email: 'Одноразовая почта не подходит — укажите обычную',
  too_many_codes: 'Слишком много кодов подряд — попробуйте через час',
  too_many_accounts: 'С этого адреса сегодня уже создавали аккаунты — попробуйте завтра',
  bad_code: 'Код не подошёл — проверьте цифры',
  code_expired: 'Код устарел — запросите новый',
  not_enough_tokens: 'Не хватает токенов — пополните баланс',
  one_free_job_at_a_time: 'Бесплатные кадры — по одному: дождитесь готового',
  login_required: 'Войдите, чтобы продолжить',
};
export const errorText = (error, fallback = 'Что-то пошло не так — попробуйте ещё раз') =>
  ERRORS[error?.code] ?? fallback;

export function plural(n, [one, few, many]) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b === 1) return one;
  if (b >= 2 && b <= 4) return few;
  return many;
}
export const tokensText = (n) => `${n} ${plural(n, ['токен', 'токена', 'токенов'])}`;

const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (value !== false && value != null) node.setAttribute(key, value === true ? '' : value);
  }
  node.append(...children.filter(Boolean));
  return node;
};
const closeIcon = () => {
  const b = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Закрыть' });
  b.innerHTML = '<svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#close" /></svg>';
  return b;
};

// Окно поверх страницы: фон, Escape, возврат фокуса — как у остальных окон.
function modal(className, titleText, ...content) {
  const backdrop = el('div', { class: 'dialog-backdrop', hidden: true });
  const close = closeIcon();
  const id = `${className}-title`;
  const dialog = el('div', { class: `dialog ${className}`, role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': id, hidden: true },
    el('div', { class: 'dialog__head' }, el('p', { class: 'dialog__title', id, text: titleText }), close), ...content);
  document.body.append(backdrop, dialog);
  let opener = null;
  let shown = false;
  let onHide = null;
  const hide = () => {
    if (!shown) return;
    shown = false;
    hideLayer(dialog);
    hideLayer(backdrop);
    opener?.focus?.();
    onHide?.();
  };
  close.addEventListener('click', hide);
  backdrop.addEventListener('click', hide);
  window.addEventListener('keydown', (e) => e.key === 'Escape' && shown && hide());
  return {
    dialog,
    get shown() {
      return shown;
    },
    open(from, whenHidden) {
      opener = from ?? document.activeElement;
      onHide = whenHidden ?? null;
      shown = true;
      showLayer(backdrop);
      showLayer(dialog);
    },
    hide,
  };
}

export function initAccount({ catalog, feedback }) {
  const listeners = new Set();
  let me = null;
  let available = false;

  const emit = () => listeners.forEach((fn) => fn(me));
  const refresh = async () => {
    try {
      me = await api('api/me');
      available = true;
    } catch (error) {
      me = null;
      available = error.status === 401;
    }
    emit();
    return me;
  };

  // ── вход ─────────────────────────────────────────────────────────────────
  const email = el('input', { class: 'text-input', type: 'email', autocomplete: 'email', placeholder: 'name@mail.ru', 'aria-label': 'Почта' });
  const code = el('input', { class: 'text-input login-code', type: 'text', inputmode: 'numeric', autocomplete: 'one-time-code', maxlength: '6', placeholder: '000000', 'aria-label': 'Код из письма' });
  const status = el('p', { class: 'login-status', role: 'status' });
  const sendBtn = el('button', { class: 'btn btn--accent btn--block', type: 'button', text: 'Получить код' });
  const enterBtn = el('button', { class: 'btn btn--accent btn--block', type: 'button', text: 'Войти' });
  const backBtn = el('button', { class: 'rail__link', type: 'button', text: 'Другая почта' });
  const againBtn = el('button', { class: 'rail__link', type: 'button', text: 'Прислать ещё раз' });
  const stepEmail = el('div', { class: 'login-step' },
    el('p', { class: 'login-lead', text: 'Пароль не нужен: пришлём на почту код из 6 цифр. После первого входа — 3 фотореал-кадра бесплатно.' }),
    el('p', { class: 'field-label', text: 'Почта' }), email, sendBtn);
  const sentTo = el('b');
  const stepCode = el('div', { class: 'login-step', hidden: true },
    el('p', { class: 'login-lead' }, 'Код отправлен на ', sentTo, '. Пока сервер работает на этом компьютере, код печатается в его консоли.'),
    el('p', { class: 'field-label', text: 'Код' }), code, enterBtn, el('div', { class: 'login-links' }, backBtn, againBtn));
  const login = modal('login-dialog', 'Вход', stepEmail, stepCode, status);
  let pending = null;

  const setStep = (codeStep) => {
    stepEmail.hidden = codeStep;
    stepCode.hidden = !codeStep;
    status.textContent = '';
    (codeStep ? code : email).focus();
  };
  const send = async () => {
    sendBtn.disabled = againBtn.disabled = true;
    status.textContent = '';
    try {
      await api('api/auth/request', { method: 'POST', json: { email: email.value } });
      sentTo.textContent = email.value.trim();
      code.value = '';
      setStep(true);
    } catch (error) {
      status.textContent = errorText(error);
    } finally {
      sendBtn.disabled = againBtn.disabled = false;
    }
  };
  const enter = async () => {
    enterBtn.disabled = true;
    status.textContent = '';
    try {
      const fresh = await api('api/auth/verify', { method: 'POST', json: { email: email.value, code: code.value } });
      me = fresh;
      emit();
      const done = pending;
      pending = null;
      login.hide();
      done?.(true);
      feedback.onToast(fresh.balance.welcome > 0 && fresh.balance.paid === 0
        ? `Вы вошли · ${tokensText(fresh.balance.welcome)} на пробу`
        : 'Вы вошли', 'success');
    } catch (error) {
      status.textContent = errorText(error);
    } finally {
      enterBtn.disabled = false;
    }
  };
  sendBtn.addEventListener('click', send);
  againBtn.addEventListener('click', send);
  enterBtn.addEventListener('click', enter);
  backBtn.addEventListener('click', () => setStep(false));
  email.addEventListener('keydown', (e) => e.key === 'Enter' && send());
  code.addEventListener('keydown', (e) => e.key === 'Enter' && enter());
  code.addEventListener('input', () => code.value.replace(/\D/g, '').length === 6 && enter());

  const requireLogin = (from) => {
    if (me) return Promise.resolve(true);
    if (!available) return Promise.resolve(false);
    return new Promise((resolve) => {
      pending = resolve;
      setStep(false);
      login.open(from, () => {
        if (pending === resolve) {
          pending = null;
          resolve(false);
        }
      });
      email.focus();
    });
  };

  // ── покупка пакета (тестовая оплата до эквайринга, этап Ж) ──────────────
  const packsBox = el('div', { class: 'packs' });
  const buyNote = el('p', { class: 'export-note', text: 'Купленные токены не сгорают, кадры за них — без знака. Сейчас оплата тестовая: деньги не списываются.' });
  const buy = modal('buy-dialog', 'Пополнить токены', packsBox, buyNote);
  const openBuy = async (from) => {
    if (!(await requireLogin(from))) return;
    const { packs } = await api('api/payments/packs');
    packsBox.replaceChildren(...packs.map((p) => {
      const button = el('button', { class: 'pack', type: 'button' },
        el('span', { class: 'pack__tokens', text: tokensText(p.tokens) }),
        el('span', { class: 'pack__price', text: `${p.priceRub.toLocaleString('ru-RU')} ₽` }),
        el('span', { class: 'pack__each', text: `${Math.round(p.priceRub / p.tokens)} ₽ за кадр` }));
      button.addEventListener('click', async () => {
        button.disabled = true;
        try {
          const { paymentId } = await api('api/payments/checkout', { method: 'POST', json: { tokens: p.tokens } });
          await api(`api/payments/${paymentId}/confirm`, { method: 'POST' });
          await refresh();
          buy.hide();
          feedback.onToast(`Начислено ${tokensText(p.tokens)} (тестовая оплата)`, 'success');
        } catch (error) {
          feedback.onToast(errorText(error), 'error');
        } finally {
          button.disabled = false;
        }
      });
      return button;
    }));
    buy.open(from);
  };

  // ── «Мои рендеры» ────────────────────────────────────────────────────────
  const grid = el('div', { class: 'renders' });
  const empty = el('p', { class: 'renders__empty', hidden: true,
    text: 'Здесь появятся ваши кадры. Соберите сцену во вкладке «Фотореал» и нажмите «Рендер».' });
  const rendersBalance = el('p', { class: 'renders__balance' });
  const renders = modal('renders-dialog', 'Мои рендеры', rendersBalance, empty, grid);
  let poll = null;

  const statusText = (job) => {
    if (job.status === 'queued') {
      const minutes = Math.max(1, Math.round((job.etaSeconds ?? 60) / 60));
      return job.position > 1 ? `В очереди · ${job.position}-й · ~${minutes} мин` : `Следующий · ~${minutes} мин`;
    }
    if (job.status === 'rendering') return `Считается · ~${Math.max(1, Math.round((job.etaSeconds ?? 60) / 60))} мин`;
    if (job.status === 'failed') return 'Не получилось — токены вернулись';
    if (job.status === 'expired') return 'Срок хранения истёк';
    const days = Math.max(0, Math.ceil((new Date(job.expiresAt) - Date.now()) / 86400000));
    return `Готово · хранится ещё ${days} ${plural(days, ['день', 'дня', 'дней'])}`;
  };

  const act = async (fn, okText) => {
    try {
      await fn();
      if (okText) feedback.onToast(okText, 'success');
    } catch (error) {
      feedback.onToast(errorText(error), 'error');
    }
    await Promise.all([loadRenders(), refresh()]);
  };

  const card = (job) => {
    const scene = catalog.scene(job.set)?.name ?? job.set;
    const art = job.thumbUrl
      ? el('img', { class: 'render__img', src: job.thumbUrl, alt: `${scene}, ${job.size} px`, loading: 'lazy' })
      : el('div', { class: `render__img render__img--${job.status}` }, el('span', { class: 'spinner', 'aria-hidden': 'true' }));
    const actions = el('div', { class: 'render__actions' });
    if (job.status === 'done') {
      actions.append(el('a', { class: 'btn btn--accent', href: `${job.imageUrl}?download=1`, download: '', text: 'Скачать PNG' }));
      if (job.marked) {
        const unmark = el('button', { class: 'btn', type: 'button', text: `Убрать знак · ${me?.unmarkPrice ?? 1}` });
        unmark.addEventListener('click', () => act(() => api(`api/jobs/${job.id}/unmark`, { method: 'POST' }), 'Знак убран'));
        actions.append(unmark);
      }
    }
    if (job.status === 'done' || job.status === 'failed') {
      const again = el('button', { class: 'btn', type: 'button', text: 'Повторить' });
      again.addEventListener('click', () => act(() => api(`api/jobs/${job.id}/repeat`, { method: 'POST' }), 'Задание снова в очереди'));
      actions.append(again);
    }
    if (job.status !== 'rendering') {
      const remove = el('button', { class: 'icon-btn render__remove', type: 'button', 'aria-label': 'Удалить', 'data-tip': job.status === 'queued' ? 'Отменить' : 'Удалить', 'data-tip-side': 'left' });
      remove.innerHTML = '<svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#close" /></svg>';
      remove.addEventListener('click', () => act(() => api(`api/jobs/${job.id}`, { method: 'DELETE' }), job.status === 'queued' ? 'Отменено, токены вернулись' : null));
      actions.append(remove);
    }
    return el('article', { class: `render render--${job.status}` }, art,
      el('div', { class: 'render__body' },
        el('p', { class: 'render__title', text: `${scene} · ${job.size === '3000' ? 'для печати' : '1600 px'} · ${job.frame}` }),
        el('p', { class: 'render__status', text: statusText(job) }),
        job.marked ? el('p', { class: 'render__mark', text: 'Со знаком — кадр за приветственный токен' }) : null,
        job.error && job.status === 'failed' ? el('p', { class: 'render__error', text: job.error.slice(0, 140) }) : null),
      actions);
  };

  async function loadRenders() {
    const { jobs } = await api('api/jobs');
    grid.replaceChildren(...jobs.map(card));
    empty.hidden = jobs.length > 0;
    const unseen = jobs.filter((j) => !j.seen && (j.status === 'done' || j.status === 'failed')).map((j) => j.id);
    if (unseen.length && renders.shown) await api('api/jobs/seen', { method: 'POST', json: { ids: unseen } });
    return jobs;
  }
  const openRenders = async (from) => {
    if (!(await requireLogin(from))) return;
    renders.open(from, () => {
      clearInterval(poll);
      poll = null;
    });
    await loadRenders();
    await refresh();
    clearInterval(poll);
    poll = setInterval(() => loadRenders().catch(() => {}), 5000);
  };

  // ── уведомление «Кадр готов»: пока есть задания в работе ─────────────────
  let watching = null;
  let lastActive = 0;
  const watch = () => {
    if (watching) return;
    watching = setInterval(async () => {
      const before = lastActive;
      await refresh();
      const active = me?.activeJobs ?? 0;
      if (before > active && me?.unseenJobs > 0 && !renders.shown) {
        feedback.onToast('Кадр готов — он в «Моих рендерах»', 'success');
      }
      lastActive = active;
      if (!active) {
        clearInterval(watching);
        watching = null;
      }
    }, 8000);
  };
  listeners.add((m) => {
    if (m?.activeJobs) {
      lastActive = Math.max(lastActive, m.activeJobs);
      watch();
    }
  });

  // ── шапка: «Войти» или баланс с меню ─────────────────────────────────────
  const box = document.getElementById('account');
  const loginBtn = el('button', { class: 'pill-btn account__login', type: 'button', hidden: true },
    el('span', { class: 'pill-btn__text', text: 'Войти' }));
  const meBtn = el('button', { class: 'pill-btn account__me', type: 'button', 'aria-haspopup': 'menu', 'aria-expanded': 'false', hidden: true });
  const menu = el('div', { class: 'account-menu', role: 'menu', hidden: true });
  box?.append(loginBtn, meBtn, menu);
  const item = (text, fn) => {
    const b = el('button', { class: 'account-menu__item', type: 'button', role: 'menuitem', text });
    b.addEventListener('click', () => {
      toggleMenu(false);
      fn(meBtn);
    });
    return b;
  };
  const toggleMenu = (open = menu.hidden) => {
    menu.hidden = !open;
    meBtn.setAttribute('aria-expanded', String(open));
  };
  loginBtn.addEventListener('click', () => requireLogin(loginBtn));
  meBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  document.addEventListener('click', (e) => !menu.hidden && !menu.contains(e.target) && toggleMenu(false));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && toggleMenu(false));

  listeners.add((m) => {
    if (!box) return;
    box.hidden = !available;
    loginBtn.hidden = Boolean(m);
    meBtn.hidden = !m;
    if (!m) return;
    const total = m.balance.paid + m.balance.welcome;
    // replaceChildren превратил бы null в текст «null» — только настоящие узлы.
    meBtn.replaceChildren(...[
      el('span', { class: 'account__avatar', text: m.email[0].toUpperCase(), 'aria-hidden': 'true' }),
      el('span', { class: 'pill-btn__text', text: tokensText(total) }),
      m.unseenJobs ? el('span', { class: 'account__dot', 'aria-label': 'Есть готовые кадры' }) : null,
    ].filter(Boolean));
    const welcomeLeft = m.balance.welcome
      ? `, приветственных ${m.balance.welcome} до ${new Date(m.balance.welcomeExpiresAt).toLocaleDateString('ru-RU')}` : '';
    menu.replaceChildren(...[
      el('p', { class: 'account-menu__head' }, el('b', { text: m.email }), el('span', { text: `Купленных ${m.balance.paid}${welcomeLeft}` })),
      item(m.unseenJobs ? `Мои рендеры · ${m.unseenJobs} нов.` : 'Мои рендеры', openRenders),
      item('Пополнить токены', openBuy),
      m.isAdmin ? item('Админка', () => window.open('admin.html', '_blank', 'noopener')) : null,
      item('Выйти', async () => {
        await api('api/auth/logout', { method: 'POST' }).catch(() => {});
        await refresh();
      }),
    ].filter(Boolean));
    rendersBalance.textContent = `Баланс: ${tokensText(total)}${m.balance.welcome ? ` (приветственных ${m.balance.welcome})` : ''}`;
  });

  refresh();
  return {
    get available() {
      return available;
    },
    get me() {
      return me;
    },
    onChange(fn) {
      listeners.add(fn);
      fn(me);
      return () => listeners.delete(fn);
    },
    refresh,
    requireLogin,
    openRenders,
    openBuy,
    // Задание ушло в очередь — начинаем следить, когда будет готово.
    watchJobs() {
      lastActive = Math.max(lastActive, 1);
      watch();
    },
  };
}
