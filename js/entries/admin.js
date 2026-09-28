// Админка CupViewer v2 (этап Е, §2 концепции): пользователи — их доступ по
// подписке и токены, очередь рендера, платежи, тарифы. Права проверяет сервер
// (server/app/admin.py) — страница без прав просто ничего не получит.

import { api, dateText, errorText, tokensText } from '../account/api.js';

const $ = (id) => document.getElementById(id);
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (value != null) node.setAttribute(key, value);
  }
  node.append(...children.filter((c) => c !== null && c !== undefined && c !== false));
  return node;
};
const when = (iso) => (iso ? new Date(iso).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' }) : '—');
const row = (cells, tag = 'td') => el('tr', {}, ...cells.map((c) => el(tag, {}, c)));
// Чем оплачен кадр (server/app/tokens.plan).
const TIERS = { standard: 'Standard', ultra: 'Ultra' };
const WALLETS = { paid: 'купл.', welcome: 'старт.', mixed: 'старт. + купл.' };
// Операции журнала токенов (server/app/tokens.py, billing.py) — по-русски.
// welcome и unmark — из времени до подписки.
const KINDS = {
  starter: 'стартовые', expire: 'сгорели', welcome: 'приветственные', render: 'кадр', refund: 'возврат',
  purchase: 'покупка', unmark: 'убрать знак', grant: 'начисление', revoke: 'списание',
};
// Доступ: до какого числа или «нет».
const accessText = (u) => {
  if (u.isAdmin) return 'админ';
  if (!u.accessUntil) return 'нет';
  const until = new Date(u.accessUntil);
  return until > new Date() ? `до ${dateText(u.accessUntil)}` : `истёк ${dateText(u.accessUntil)}`;
};
const STATUS = {
  queued: 'в очереди', rendering: 'считается', done: 'готово', failed: 'сбой', deleted: 'удалено', expired: 'истёк',
  pending: 'ожидает', paid: 'оплачено', cancelled: 'отменён',
};

async function users() {
  const { users: list } = await api(`api/admin/users?q=${encodeURIComponent($('user-search').value)}`);
  const table = $('users-table');
  table.replaceChildren(row(['Почта', 'Создан', 'Доступ', 'Купленные', 'Стартовые', 'Кадры', ''], 'th'));
  for (const u of list) {
    // Доступ вручную (оплата по счёту, подарок): +дни и стартовые на этот срок.
    const days = el('input', { class: 'text-input admin-amount', type: 'number', value: '30', step: '1', 'aria-label': 'На сколько дней' });
    const starter = el('input', { class: 'text-input admin-amount', type: 'number', value: '3', min: '0', step: '1', 'aria-label': 'Стартовых токенов' });
    const extend = el('button', { class: 'btn', type: 'button', text: 'Продлить' });
    extend.addEventListener('click', async () => {
      try {
        await api(`api/admin/users/${u.id}/access`, { method: 'POST', json: { days: Number(days.value), starterTokens: Number(starter.value) } });
        await users();
      } catch (error) {
        alert(errorText(error));
      }
    });
    const amount = el('input', { class: 'text-input admin-amount', type: 'number', value: '10', step: '1', 'aria-label': 'Сколько токенов' });
    const note = el('input', { class: 'text-input admin-note-input', type: 'text', placeholder: 'За что', 'aria-label': 'Комментарий' });
    const grant = el('button', { class: 'btn btn--accent', type: 'button', text: 'Начислить' });
    const ops = el('button', { class: 'btn', type: 'button', text: 'Журнал' });
    const opsRow = el('tr', { class: 'admin-ops', hidden: '' }, el('td', { colspan: '7' }));
    grant.addEventListener('click', async () => {
      try {
        await api(`api/admin/users/${u.id}/grant`, { method: 'POST', json: { amount: Number(amount.value), note: note.value } });
        await users();
      } catch (error) {
        alert(errorText(error));
      }
    });
    ops.addEventListener('click', async () => {
      if (!opsRow.hidden) {
        opsRow.hidden = true;
        return;
      }
      const { ops: items } = await api(`api/admin/users/${u.id}/ops`);
      opsRow.firstChild.replaceChildren(el('ul', { class: 'admin-ops__list' },
        ...items.map((o) => el('li', { text: `${when(o.created_at)} · ${o.amount > 0 ? '+' : ''}${o.amount} ${o.bucket === 'paid' ? 'купл.' : 'старт.'} · ${KINDS[o.kind] ?? o.kind}${o.job_id ? ` · кадр ${o.job_id}` : ''}${o.note ? ` · ${o.note}` : ''}` }))));
      opsRow.hidden = false;
    });
    table.append(
      row([
        el('span', {}, u.email, u.isAdmin ? el('b', { class: 'admin-badge', text: 'админ' }) : null,
          u.hasPassword ? null : el('b', { class: 'admin-badge', text: 'без пароля', title: 'Пароль задаётся через «Забыли пароль?» на странице входа' })),
        when(u.createdAt), accessText(u), String(u.balance.paid), String(u.balance.welcome), `${u.done} из ${u.jobs}`,
        el('div', { class: 'admin-actions' },
          el('div', { class: 'admin-actions__row' }, days, el('span', { class: 'admin-unit', text: 'дн.' }), starter, el('span', { class: 'admin-unit', text: 'старт.' }), extend),
          el('div', { class: 'admin-actions__row' }, amount, note, grant, ops)),
      ]),
      opsRow,
    );
  }
}

async function queue() {
  const { jobs } = await api('api/admin/queue');
  const table = $('queue-table');
  table.replaceChildren(row(['№', 'Почта', 'Статус', 'Сцена', 'Размер', 'Кошелёк', 'Создан', 'Исполнитель', 'Время', ''], 'th'));
  for (const j of jobs) {
    const cancel = ['queued', 'rendering'].includes(j.status) ? el('button', { class: 'btn', type: 'button', text: 'Отменить' }) : null;
    cancel?.addEventListener('click', async () => {
      if (!confirm(`Отменить кадр ${j.id}? Токены вернутся пользователю.`)) return;
      await api(`api/admin/jobs/${j.id}/cancel`, { method: 'POST' }).catch((e) => alert(errorText(e)));
      await queue();
    });
    const status = `${STATUS[j.status] ?? j.status}${j.status === 'queued' ? ` · ${j.position}-й` : ''}`;
    table.append(row([
      String(j.id), j.email, el('span', { class: `admin-status admin-status--${j.status}`, text: status, title: j.errorRaw ?? j.error ?? '' }),
      `${j.set} · ${j.cups.join(' + ')}`, TIERS[j.size] ?? j.size, WALLETS[j.bucket] ?? j.bucket, when(j.createdAt),
      j.worker ?? '—', j.durationS ? `${Math.round(j.durationS)} с` : '—', cancel,
    ]));
  }
}

async function payments() {
  const { payments: list } = await api('api/admin/payments');
  const table = $('payments-table');
  table.replaceChildren(row(['№', 'Почта', 'Что', 'Сумма', 'Статус', 'Создан', 'Оплачен'], 'th'));
  for (const p of list) {
    const what = p.kind === 'plan'
      ? `Доступ ${p.days} дн. (${p.plan_id})${p.tokens ? ` + ${p.tokens} старт.` : ''}`
      : `Пакет ${tokensText(p.tokens)}`;
    table.append(row([String(p.id), p.email, what, `${p.amount_rub} ₽`, STATUS[p.status] ?? p.status, when(p.created_at), when(p.paid_at)]));
  }
}

// Тарифы: строка — поля и «Сохранить»; последняя строка — новый тариф.
async function plans() {
  const { plans: list } = await api('api/admin/plans');
  const table = $('plans-table');
  table.replaceChildren(row(['Название', 'Дней', 'Цена, ₽', 'Стартовых', 'Виден', ''], 'th'));
  const editRow = (plan) => {
    const label = el('input', { class: 'text-input', type: 'text', value: plan?.label ?? '', placeholder: 'Например, «Год»', 'aria-label': 'Название' });
    const daysIn = el('input', { class: 'text-input admin-amount', type: 'number', value: String(plan?.days ?? 365), min: '1', 'aria-label': 'Дней' });
    const price = el('input', { class: 'text-input admin-amount', type: 'number', value: String(plan?.priceRub ?? ''), min: '0', 'aria-label': 'Цена' });
    const starterIn = el('input', { class: 'text-input admin-amount', type: 'number', value: String(plan?.starterTokens ?? 0), min: '0', 'aria-label': 'Стартовых токенов' });
    const active = el('input', { type: 'checkbox', 'aria-label': 'Виден клиенту' });
    active.checked = plan ? plan.active : true;
    const save = el('button', { class: 'btn btn--accent', type: 'button', text: plan ? 'Сохранить' : 'Добавить' });
    save.addEventListener('click', async () => {
      const json = { label: label.value, days: Number(daysIn.value), priceRub: Number(price.value), starterTokens: Number(starterIn.value), active: active.checked };
      try {
        await api(plan ? `api/admin/plans/${plan.id}` : 'api/admin/plans', { method: plan ? 'PUT' : 'POST', json });
        await plans();
      } catch (error) {
        alert(errorText(error, 'Не сохранилось — проверьте поля'));
      }
    });
    return row([label, daysIn, price, starterIn, active, save]);
  };
  for (const plan of list) table.append(editRow(plan));
  table.append(editRow(null));
}

const LOADERS = { users, queue, payments, plans };
let tab = 'users';
let timer = null;

async function show(next) {
  tab = next;
  for (const b of document.querySelectorAll('[data-tab]')) {
    const on = b.dataset.tab === tab;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-selected', String(on));
  }
  for (const p of document.querySelectorAll('[data-panel]')) p.hidden = p.dataset.panel !== tab;
  await LOADERS[tab]();
  clearInterval(timer);
  // Очередь живая — обновляется сама.
  if (tab === 'queue') timer = setInterval(() => queue().catch(() => {}), 5000);
}

async function start() {
  let me = null;
  try {
    me = await api('api/me');
  } catch {
    // ниже — «войдите»
  }
  if (!me?.isAdmin) {
    $('admin-denied').hidden = false;
    return;
  }
  $('admin-who').textContent = me.email;
  $('admin-app').hidden = false;
  for (const b of document.querySelectorAll('[data-tab]')) b.addEventListener('click', () => show(b.dataset.tab));
  let debounce = null;
  $('user-search').addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(users, 250);
  });
  await show('users');
}

start();
