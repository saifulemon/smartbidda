// fix-safe-area.mjs — the viewport gate reads only a page's OWN <style> for
// env(safe-area-inset-*). Delivery pages moved layout into the shared .ksr-main
// (which already carries safe-area in components.css), so the gate can't see it.
// Add a page-local, attribute-scoped clearance rule (token-only, not a shared-class
// redefinition → won't trip consistency/hard-rule-8) to any frontend route page
// that lacks one. Admin console is desktop → exempt, untouched.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = new URL('../', import.meta.url).pathname;
const appDir = `${dir}html/frontend`;
const files = (await readdir(appDir)).filter((f) => f.endsWith('.html') && !f.endsWith('.states.html'));

const RULE = `  /* notch / home-indicator clearance — page-local; reinforces shared .ksr-main */
  main[data-shell="content"] {
    padding-bottom: calc(var(--space-xxl) + env(safe-area-inset-bottom, 0px));
  }`;

let fixed = 0;
for (const f of files) {
  const p = join(appDir, f);
  let html = await readFile(p, 'utf8');
  if (/env\(\s*safe-area-inset/.test(html)) continue;         // already has one
  if (/<style>[\s\S]*?<\/style>/.test(html)) {
    // append the rule inside the existing page <style>
    html = html.replace(/(<style>[\s\S]*?)(<\/style>)/, (_m, body, close) =>
      `${body}\n${RULE}\n${close}`);
  } else {
    // no page <style> — insert one right after the lucide script tag
    html = html.replace(/(<script src="https:\/\/unpkg\.com\/lucide@latest"><\/script>)/,
      `$1\n<style>\n${RULE}\n</style>`);
  }
  await writeFile(p, html, 'utf8');
  fixed++;
  console.log(`safe-area added → ${f}`);
}
console.log(`\n${fixed}/${files.length} frontend route pages updated`);
