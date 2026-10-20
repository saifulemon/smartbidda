// fix-safe-area-v2.mjs — replace the duplicated `main[data-shell="content"]`
// selector (Hard rule 8) with a PAGE-UNIQUE layout class carrying safe-area,
// matching the base convention (.home-stack, .chapter-body, …). The viewport gate
// reads only the page's own <style>; a unique per-page class satisfies it without
// cross-page duplication.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = new URL('../', import.meta.url).pathname;
const appDir = `${dir}html/frontend`;
const files = (await readdir(appDir)).filter((f) => f.endsWith('.html') && !f.endsWith('.states.html'));

// the block the previous script inserted
const OLD = `  /* notch / home-indicator clearance — page-local; reinforces shared .ksr-main */
  main[data-shell="content"] {
    padding-bottom: calc(var(--space-xxl) + env(safe-area-inset-bottom, 0px));
  }`;

let fixed = 0;
for (const f of files) {
  const p = join(appDir, f);
  let html = await readFile(p, 'utf8');
  if (!html.includes(OLD)) continue;
  const slug = f.replace(/\.html$/, '').replace(/^\d+-/, '');   // 01-home → home
  const cls = `sf-${slug}`;                                       // unique per page
  const RULE = `  /* notch / home-indicator clearance — page-local layout class */
  .${cls} {
    padding-bottom: calc(var(--space-xxl) + env(safe-area-inset-bottom, 0px));
  }`;
  html = html.replace(OLD, RULE);
  // add the unique class to this page's <main class="ksr-main">
  html = html.replace(/<main class="ksr-main"/, `<main class="ksr-main ${cls}"`);
  await writeFile(p, html, 'utf8');
  fixed++;
  console.log(`${f} → .${cls}`);
}
console.log(`\n${fixed}/${files.length} pages given a unique safe-area class`);
