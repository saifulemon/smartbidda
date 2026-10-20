// fix-state-links.mjs — state sheets live in html/states/ but carry bare
// `NN.html` hrefs (valid only when they sat next to the routes). Rewrite each
// internal href to the correct relative path into its app folder.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = new URL('../', import.meta.url).pathname;
const statesDir = `${dir}html/states`;
const files = (await readdir(statesDir)).filter((f) => f.endsWith('.states.html'));

let changed = 0;
for (const f of files) {
  const p = join(statesDir, f);
  let html = await readFile(p, 'utf8');
  const app = /data-app="frontend-admin-dashboard"/.test(html)
    ? 'frontend-admin-dashboard'
    : 'frontend';
  const before = html;
  // bare NN-name.html (not already ../ or http or # or //) → ../<app>/NN-name.html
  html = html.replace(/href="(?!https?:|#|\/\/|\.\.\/)([0-9]{2}-[a-z0-9-]+\.html)"/g,
    (_m, g) => `href="../${app}/${g}"`);
  if (html !== before) { await writeFile(p, html, 'utf8'); changed++; console.log(`fixed ${f} → ../${app}/`); }
}
console.log(`\n${changed}/${files.length} state sheets relinked`);
