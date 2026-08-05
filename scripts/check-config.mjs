// Проверка настроек: ловит «ручки, которые ничего не делают».
//
// Именно этот класс ошибок дороже всего обходится в поддержке: настройка есть,
// выглядит рабочей, человек её меняет — и ничего не происходит. Так было с
// paperRelief (имя разошлось с кодом после переименования), с DEFAULT_PAPER
// (перекрывался значением в DEFAULT_ORDER) и с camera.near/far (их всегда
// пересчитывало кадрирование).
//
// Проверка запускается перед каждой сборкой (npm run build) и отдельно —
// npm run check.

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const configPath = path.join(root, 'js/config.js');

function collectSources() {
  const files = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.js') && path.resolve(full) !== path.resolve(configPath)) {
        files.push(full);
      }
    }
  })(path.join(root, 'js'));
  return files;
}

// Имена ключей конфига по отступам: 2 пробела — раздел, дальше — вложенные.
function collectConfigKeys(source) {
  const keys = [];
  let section = null;
  for (const line of source.split('\n')) {
    if (/^\s*\/\//.test(line)) continue;
    const top = line.match(/^ {2}([a-zA-Z][\w]*):/);
    const nested = line.match(/^ {4,}([a-zA-Z][\w]*):/);
    if (top) {
      section = top[1];
      keys.push({ name: section, path: section });
    } else if (nested && section) {
      keys.push({ name: nested[1], path: `${section}.${nested[1]}` });
    }
  }
  return keys;
}

const configSource = fs.readFileSync(configPath, 'utf8');
const code = collectSources()
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n');

const unused = collectConfigKeys(configSource).filter(
  ({ name }) => !new RegExp(`\\b${name}\\b`).test(code),
);

if (unused.length === 0) {
  console.log('Проверка настроек: все ключи конфига читаются кодом.');
  process.exit(0);
}

console.error('');
console.error('ОШИБКА: в js/config.js есть настройки, которые код не читает.');
console.error('Такую «ручку» можно крутить сколько угодно — ничего не изменится.');
console.error('');
for (const { path: key } of unused) console.error(`  • ${key}`);
console.error('');
console.error('Или переименуйте ключ в соответствии с кодом, или удалите его.');
console.error('');
process.exit(1);
