// run.mjs — render every page definition to disk.
import { writeFile, mkdir } from 'node:fs/promises';
import { render } from './chrome.mjs';
import p1 from './p1.mjs';
import p2 from './p2.mjs';
import p3 from './p3.mjs';
import admin from './admin.mjs';

const BASE = new URL('../base/', import.meta.url).pathname;

const all = [...p1, ...p2, ...p3, ...admin];

for (const p of all) {
  const dir = `${BASE}${p.app}`;
  await mkdir(dir, { recursive: true });
  const html = render({ ...p, style: p.style || '  /* layout only */' });
  await writeFile(`${dir}/${p.file}`, html, 'utf8');
  console.log(`wrote ${p.app}/${p.file}`);
}
console.log(`\n${all.length} pages generated`);
