// Админка CupViewer v2 (этап Е, §2 концепции): пользователи и их токены,
// очередь рендера, платежи. Права проверяет сервер (server/app/admin.py) —
// страница без прав просто ничего не получит.

import { api, errorText, tokensText } from '../account/account.js';

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
const WALLETS = { paid: 'купл.', welcome: 'привет.', mixed: 'купл. + привет.' };
const STATUS = {
  queued: 'в очереди', rendering: 'считается', done: 'готово', failed: 'сбой', deleted: 'удалено', expired: 'истёк',
  pending: 'ожидает', paid: 'оплачено', cancelled: 'отменён',
};

async function users() {
  const { users: list } = await api(`api/admin/users?q=${encodeURIComponent($('user-search').value)}`);
  const table = $('users-table');
  table.replaceChildren(row(['Почта', 'Создан', 'Купленные', 'Приветственные', 'Кадры', ''], 'th'));
  for (const u of list) {
    const amount = el('input', { class: 'text-input admin-amount', type: 'number', value: '10', step: '1', 'aria-label': 'Сколько токенов' });
    const note = el('input', { class: 'text-input admin-note-input', type: 'text', placeholder: 'За что', 'aria-label': 'Комментарий' });
    const grant = el('button', { class: 'btn btn--accent', type: 'button', text: 'Начислить' });
    const ops = el('button', { class: 'btn', type: 'button', text: 'Журнал' });
    const opsRow = el('tr', { class: 'admin-ops', hidden: '' }, el('td', { colspan: '6' }));
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
        ...items.map((o) => el('li', { text: `${when(o.created_at)} · ${o.amount > 0 ? '+' : ''}${o.amount} ${o.bucket === 'paid' ? 'купл.' : 'привет.'} · ${o.kind}${o.job_id ? ` · кадр ${o.job_id}` : ''}${o.note ? ` · ${o.note}` : ''}` }))));
      opsRow.hidden = false;
    });
    table.append(
      row([
        el('span', {}, u.email, u.isAdmin ? el('b', { class: 'admin-badge', text: 'админ' }) : null),
        when(u.createdAt), String(u.balance.paid), String(u.balance.welcome), `${u.done} из ${u.jobs}`,
        el('div', { class: 'admin-actions' }, amount, note, grant, ops),
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
      `${j.set} · ${j.cups.join(' + ')}`, j.size, WALLETS[j.bucket] ?? j.bucket, when(j.createdAt),
      j.worker ?? '—', j.durationS ? `${Math.round(j.durationS)} с` : '—', cancel,
    ]));
  }
}

async function payments() {
  const { payments: list } = await api('api/admin/payments');
  const table = $('payments-table');
  table.replaceChildren(row(['№', 'Почта', 'Пакет', 'Сумма', 'Статус', 'Создан', 'Оплачен'], 'th'));
  for (const p of list) {
    table.append(row([String(p.id), p.email, tokensText(p.tokens), `${p.amount_rub} ₽`, STATUS[p.status] ?? p.status, when(p.created_at), when(p.paid_at)]));
  }
}

const LOADERS = { users, queue, payments };
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
