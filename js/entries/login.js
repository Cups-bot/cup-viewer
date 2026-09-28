// Страница входа (login.html): вход и регистрация по почте и паролю, сброс
// пароля кодом, выбор срока доступа и оплата (пока тестовая). С действующей
// подпиской страница сразу уводит на сайт; «?renew» — продлить заранее.
//
// Сайт без подписки сервер не отдаёт (server/app/main.py) — сюда же ведёт и
// сайт, когда срок кончился посреди работы (js/account/account.js).

import { api, dateText, daysText, errorText, tokensText } from '../account/api.js';

const $ = (id) => document.getElementById(id);
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (value != null) node.setAttribute(key, value);
  }
  node.append(...children.filter((c) => c != null && c !== false));
  return node;
};

const sections = { auth: $('auth'), plans: $('plans'), offline: $('offline') };
const show = (name) => {
  for (const [key, node] of Object.entries(sections)) node.hidden = key !== name;
};
const renew = new URLSearchParams(location.search).has('renew');
const toSite = () => location.replace('./');

// ── вход, регистрация, сброс ────────────────────────────────────────────────
const forms = { login: $('login-form'), register: $('register-form'), reset: $('reset-form') };
const tabs = [...document.querySelectorAll('.login-tabs [data-mode]')];
const status = $('auth-status');
let mode = 'login';

const setMode = (next) => {
  mode = next;
  for (const [key, form] of Object.entries(forms)) form.hidden = key !== next;
  for (const tab of tabs) {
    const on = tab.dataset.mode === next;
    tab.classList.toggle('is-active', on);
    tab.setAttribute('aria-selected', String(on));
  }
  document.querySelector('.login-tabs').hidden = next === 'reset';
  status.textContent = '';
  // Почта переносится между формами: ввёл и передумал — не набирать заново.
  const email = [...Object.values(forms)].map((f) => f.elements.email.value).find(Boolean) ?? '';
  forms[next].elements.email.value = email;
  (email ? forms[next].elements.password ?? forms[next].elements.email : forms[next].elements.email).focus();
};
for (const tab of tabs) tab.addEventListener('click', () => setMode(tab.dataset.mode));
for (const link of document.querySelectorAll('[data-go]')) link.addEventListener('click', () => {
  resetStep(false);
  setMode(link.dataset.go);
});

const busy = (form, on) => {
  for (const control of form.querySelectorAll('button, input')) control.disabled = on;
};

// Вошли — дальше по доступу: есть — на сайт, нет — к тарифам.
const entered = async (me) => {
  if (me.access.active && !renew) {
    toSite();
    return;
  }
  await showPlans(me);
};

forms.login.addEventListener('submit', async (event) => {
  event.preventDefault();
  const f = forms.login.elements;
  busy(forms.login, true);
  status.textContent = '';
  try {
    await entered(await api('api/auth/login', { method: 'POST', json: { email: f.email.value, password: f.password.value } }));
  } catch (error) {
    status.textContent = errorText(error);
    if (error.code === 'password_not_set') forms.reset.elements.email.value = f.email.value;
  } finally {
    busy(forms.login, false);
  }
});

forms.register.addEventListener('submit', async (event) => {
  event.preventDefault();
  const f = forms.register.elements;
  busy(forms.register, true);
  status.textContent = '';
  try {
    await entered(await api('api/auth/register', { method: 'POST', json: { email: f.email.value, password: f.password.value } }));
  } catch (error) {
    status.textContent = errorText(error);
  } finally {
    busy(forms.register, false);
  }
});

// Сброс в два шага: почта → код и новый пароль (одной формой).
let codeSent = false;
const resetStep = (sent) => {
  codeSent = sent;
  $('reset-step').hidden = !sent;
  $('reset-email-field').hidden = sent;
  $('reset-submit').textContent = sent ? 'Сохранить пароль и войти' : 'Прислать код';
};
forms.reset.addEventListener('submit', async (event) => {
  event.preventDefault();
  const f = forms.reset.elements;
  busy(forms.reset, true);
  status.textContent = '';
  try {
    if (!codeSent) {
      const sent = await api('api/auth/request', { method: 'POST', json: { email: f.email.value } });
      resetStep(true);
      // Пока письма не уходят (до этапа Ж), код печатается в консоли сервера.
      $('reset-lead').textContent = `Код отправлен на ${f.email.value.trim()}, если такая почта зарегистрирована.${sent?.console ? ' Пока письма не уходят, код виден в консоли сервера.' : ''}`;
      f.code.value = '';
      f.code.focus();
    } else {
      await entered(await api('api/auth/reset', { method: 'POST', json: { email: f.email.value, code: f.code.value, password: f.password.value } }));
    }
  } catch (error) {
    status.textContent = errorText(error);
  } finally {
    busy(forms.reset, false);
  }
});

// ── тарифы и оплата ─────────────────────────────────────────────────────────
const planStatus = $('plans-status');

async function showPlans(me) {
  show('plans');
  const expired = me.access.until && !me.access.active;
  $('plans-title').textContent = me.access.active ? 'Продлить доступ' : expired ? 'Срок доступа закончился' : 'Выберите срок доступа';
  const paid = me.balance.paid;
  $('plans-lead').textContent = me.access.active
    ? `Доступ открыт до ${dateText(me.access.until)}. Продление прибавится к этому сроку.`
    : expired
      ? `Доступ был открыт до ${dateText(me.access.until)}. Продлите, чтобы продолжить${paid ? ` — ${tokensText(paid)} на балансе сохранены` : ''}.`
      : 'Доступ ко всему сайту: 3D, развёртка, «Фотореал». Стартовые токены на рендеры — в каждом тарифе, докупить можно внутри.';
  $('plans-who').textContent = me.email;
  $('plans-back').hidden = !me.access.active;
  planStatus.textContent = '';
  const { plans, test } = await api('api/plans');
  $('plans-note').hidden = !test;
  const month = plans.find((p) => p.days === 30);
  $('plan-list').replaceChildren(...plans.map((plan) => {
    const perMonth = Math.round((plan.priceRub / plan.days) * 30);
    // Выгода — только у тарифов длиннее месяца и только если она есть.
    const save = month && plan.days > 30 && perMonth < month.priceRub
      ? `${perMonth.toLocaleString('ru-RU')} ₽ в месяц` : null;
    const pay = el('button', { class: 'btn btn--accent btn--block', type: 'button', text: `Оплатить ${plan.priceRub.toLocaleString('ru-RU')} ₽` });
    pay.addEventListener('click', async () => {
      pay.disabled = true;
      planStatus.textContent = '';
      try {
        const { paymentId } = await api('api/subscription/checkout', { method: 'POST', json: { plan: plan.id } });
        await api(`api/payments/${paymentId}/confirm`, { method: 'POST' });
        toSite();
      } catch (error) {
        planStatus.textContent = errorText(error);
        pay.disabled = false;
      }
    });
    return el('article', { class: 'plan' },
      el('p', { class: 'plan__label', text: plan.label }),
      el('p', { class: 'plan__price', text: `${plan.priceRub.toLocaleString('ru-RU')} ₽` }),
      save ? el('p', { class: 'plan__save', text: save }) : null,
      el('ul', { class: 'plan__list' },
        el('li', { text: `${daysText(plan.days)} доступа ко всему сайту` }),
        plan.starterTokens ? el('li', { text: `${tokensText(plan.starterTokens)} на рендеры — до конца срока` }) : null,
        el('li', { text: 'Пакеты токенов — внутри' })),
      pay);
  }));
}

$('logout').addEventListener('click', async () => {
  await api('api/auth/logout', { method: 'POST' }).catch(() => {});
  show('auth');
  setMode('login');
});

// ── старт ───────────────────────────────────────────────────────────────────
async function start() {
  let me = null;
  try {
    me = await api('api/me');
  } catch (error) {
    if (error.status === 401) {
      show('auth');
      setMode('login');
      return;
    }
    show('offline');
    return;
  }
  await entered(me);
}

start();
