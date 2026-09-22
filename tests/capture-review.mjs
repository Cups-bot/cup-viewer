// Local-only integration fixture; does not modify the shipped page.
// Run after npm run build, then open /capture-review.local.html.
import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const html = (await readFile(new URL('index.html', root), 'utf8'))
  .replace(/(src|href)="(?!#|\/|https?:|data:|blob:)([^"]+)"/g, '$1="/$2"');
await writeFile(new URL('capture-review.local.html', root), html.replace('<head>',
  '<head><link rel="stylesheet" href="/tests/capture-review.css"><script type="module" src="/tests/capture-review.js"></script>'));
console.log('Capture review: http://localhost:8000/capture-review.local.html');
