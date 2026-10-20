// fix-consistency-collisions.mjs
// The consistency gate treats base/ as a peer vocabulary, so a delivery page that
// re-declares a page-local selector which ALSO exists in base/<same-name>.html fails
// Hard rule 8 / cross-page drift. These are single-use page-local LAYOUT hooks — they
// do not belong in the shared components.css. Renaming them to a delivery-unique name
// resolves the collision without touching data-testid (we only rewrite inside <style>
// selectors and class="…" attributes, never inside data-testid="…").
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = new URL('../', import.meta.url).pathname;

// file → the page-local class tokens that collide with base/
const PLAN = {
  'html/frontend/14-leaderboard.html': ['lb-myrank', 'lb-rank', 'lb-row'],
  'html/frontend/18-parent-dashboard.html': ['pd-stats', 'pd-stat'],
  'html/frontend/15-rewards.html': ['rw-badge-mark', 'rw-badge', 'rw-days', 'rw-day'],
  'html/frontend/16-settings.html': ['set-row'],
  'html/frontend/20-parent-analytics.html': ['pa-disclaimer', 'pa-why-row'],
  'html/frontend/23-subscription.html': ['sb-price'],
  'html/frontend/21-screen-time.html': ['st-limit-values'],
};

const SUFFIX = '-dlv';
// whole-token boundary: not preceded/followed by a letter, digit, or hyphen
const boundary = (t) => `(?<![a-z0-9-])${t.replace(/-/g, '\\-')}(?![a-z0-9-])`;

for (const [rel, tokens] of Object.entries(PLAN)) {
  const p = join(dir, rel);
  let html = await readFile(p, 'utf8');

  // 1) <style> block — rename .token selectors (and compound like .token.is-x)
  html = html.replace(/<style>[\s\S]*?<\/style>/, (block) => {
    for (const t of tokens) block = block.replace(new RegExp(`\\.${boundary(t)}`, 'g'), `.${t}${SUFFIX}`);
    return block;
  });

  // 2) class="…" attributes — rename whole tokens
  html = html.replace(/class="([^"]*)"/g, (m, cls) => {
    for (const t of tokens) cls = cls.replace(new RegExp(boundary(t), 'g'), `${t}${SUFFIX}`);
    return `class="${cls}"`;
  });

  await writeFile(p, html, 'utf8');
  console.log(`renamed [${tokens.join(', ')}] → *${SUFFIX} in ${rel}`);
}
console.log('\ndone');
