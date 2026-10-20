// promote-theme.mjs — D2-design Step: promote the chosen concept's theme into
// the shared styles/theme.css so the whole delivery re-themes from ONE file
// (the re-theme invariant). The neutral mannequin is preserved at
// styles/theme.neutral.css. Spotify only overrides ~41 of the ~111 tokens; the
// rest (spacing, media, control-h, container, mobile downscale) must survive.
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url).pathname;
const neutral = readFileSync(`${dir}styles/theme.neutral.css`, 'utf8');
const spot = readFileSync(`${dir}concepts/spotify-rails/theme.css`, 'utf8');

// parse spotify :root overrides
const over = {};
for (const m of spot.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) over[m[1]] = m[2].trim();

// apply overrides token-by-token over the neutral contract
let out = neutral.replace(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g, (full, name) =>
  name in over ? `${name}: ${over[name]};` : full
);

// carry the spotify-only glow token next to --hero-bg
out = out.replace(
  /(--hero-bg:[^;]+;)/,
  '$1\n  --sr-glow: radial-gradient(120% 90% at 20% 0%, rgba(29, 185, 84, 0.22), transparent 60%);'
);

// refresh the header comment to reflect the promoted brand
out = out.replace(
  /^\/\* base-theme\.css[\s\S]*?\*\//,
  `/* theme.css — smartbidda brand theme (spotify-rails concept, promoted by D2-design).
 * Neutral mannequin preserved at styles/theme.neutral.css.
 * Full TOKEN_CONTRACT.md token set; brand overrides layered on top.
 * DNA: near-black canvas, one functional green, content rails, pill controls.
 * Text on green is near-black (#08090A ~ 7.7:1). Plain hex only. */`
);

writeFileSync(`${dir}styles/theme.css`, out);

const got = {};
for (const m of out.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) got[m[1]] = 1;
const pick = (n) => (out.match(new RegExp(`${n}\\s*:\\s*([^;]+);`)) || [])[1];
console.log('tokens in new theme:', Object.keys(got).length);
console.log('spotify overrides applied:', Object.keys(over).length);
for (const t of ['--c-primary', '--c-canvas', '--c-on-primary', '--font-display', '--space-lg', '--control-h', '--sr-glow', '--hero-bg', '--radius-pill', '--t-caption-weight'])
  console.log(`  ${t} =`, pick(t));
