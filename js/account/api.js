// Запросы к серверу CupViewer и тексты его ошибок — общие для сайта, страницы
// входа (login.html) и админки. Без DOM: страница входа не тянет кабинет.

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
  weak_password: 'Пароль — не короче 8 символов',
  email_taken: 'Эта почта уже зарегистрирована — войдите или восстановите пароль',
  bad_login: 'Неверная почта или пароль',
  password_not_set: 'Для этой почты пароль ещё не задан — нажмите «Забыли пароль?»',
  too_many_attempts: 'Слишком много попыток — подождите 15 минут или восстановите пароль',
  too_many_codes: 'Слишком много кодов подряд — попробуйте через час',
  too_many_accounts: 'С этого адреса сегодня уже создавали аккаунты — попробуйте завтра',
  bad_code: 'Код не подошёл — проверьте цифры',
  code_expired: 'Код устарел — запросите новый',
  bad_plan: 'Этот тариф больше недоступен — выберите другой',
  not_enough_tokens: 'Не хватает токенов — пополните баланс',
  too_many_jobs: 'В работе уже три кадра — дождитесь готового',
  subscription_required: 'Срок доступа закончился — продлите подписку',
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
export const daysText = (n) => `${n} ${plural(n, ['день', 'дня', 'дней'])}`;
export const dateText = (iso) => new Date(iso).toLocaleDateString('ru-RU');
