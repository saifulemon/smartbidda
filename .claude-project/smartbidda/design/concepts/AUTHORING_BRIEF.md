# Concept authoring brief — smartbidda D1 · vary (step 3)

Each concept is a **complete design language**, not a recolor of the base. You author
`kit-<slug>.css` (already seeded for you) and **6 hero screens** per concept, from the
base **content** — never from the base **markup**.

---

## 1 · Files (this exact shape)

```
design/concepts/<slug>/
  theme.css            ← :root token overrides ONLY (contrast-gated — see §6)
  kit-<slug>.css       ← fonts + shared atoms + the concept's shared component classes
  01-home.html  06-chapter-list.html  08-quiz.html
  14-leaderboard.html  18-parent-dashboard.html  02-students.html
```

Every screen's `<head>` links, **in this order** (depth is `../../` — a wrong depth
silently unstyles the page):

```html
<link rel="stylesheet" href="../../styles/theme.css">
<link rel="stylesheet" href="theme.css">
<link rel="stylesheet" href="../../styles/components.css">
<link rel="stylesheet" href="kit-<slug>.css">
<script src="https://unpkg.com/lucide@latest"></script>
… </head><body …> … <script>lucide.createIcons();</script>
```

## 2 · Content is the contract (read it first)

`design/FEATURE_CONTRACT.md` is binding. Every module, field, control and CTA on your
screens must be traceable to the base HTML or the PRD; the contract's **negative space**
lists what must NOT appear — obey it literally (no invented fields, no dropped modules,
no extra filters/chips/period selectors). Data values (numbers, names, IDs, states) come
from the base pages — grep them, don't re-invent them. Coincidence anchors that must stay
consistent across pages: `২৪/৬০ মিনিট · আরও ৩৬ মিনিট বাকি` · `১,২৪০ পয়েন্ট · #৪` ·
child `রাফিদহাসান` (Class 4) + sibling `মাহিন` · streak `৫ দিন` · forecast `মাঝারি` ·
pass line `৬০%` · IDs `SB-FAM-… / SB-EXM-20261016-0487 / SB-SUB-20260901-1041`.

## 3 · Language

`lang="bn-BD"` on `<html>`. **Every user-visible string is Bangla** — labels, buttons,
table headers, status chips, empty/error text, breadcrumbs, tooltips, `aria-label`s.
No English UI prose (proper nouns like `bKash`/`SSLCommerz`/`Class` are fine). Route
*filenames* stay English (they already are).

## 4 · Chrome (the #1 convergence trap)

Author your own app frame — **do not copy the base's `.appbar`/`.tabbar`**:

- The **5 frontend screens share one byte-identical chrome block** (same markup, only the
  active nav item differs). Mark it `data-shell="topbar"` / `data-shell="bottomnav"`.
- `02-students.html` is a **desktop console** — its chrome is a sidebar + topbar, in the
  same concept DNA but its own block.
- Your chrome must look like *your* concept (Kahoot ≠ Strava ≠ Spotify ≠ Airbnb ≠ Linear)
  and must differ from all four other concepts.

## 5 · Structure — bespoke per `theme × screen`

Each screen gets its own authored section order and internal layout. **Never reuse one
section order across your 6 screens** (they are different jobs: a catalogue is not a
dashboard), and never mirror the base's order — the base is the neutral mannequin, you
are dressing it differently. Forms are re-authored per concept too: a card that shows
something keeps its *role*, but its form (radius, border, elevation, internal rhythm,
density) is yours.

## 6 · Tokens, contrast and the gate surface

- Colour/type/radius live in `theme.css` as `:root` overrides of the shared names
  (`--c-primary --c-on-primary --c-canvas --c-surface --c-surface-soft --c-ink --c-body
  --c-muted --hero-bg --c-success --c-warning --c-error --c-hairline --font-display
  --font-body --radius-* --space-*`…). **Never put a literal colour/font/radius in an
  inline `style="…"` or a page `<style>`** — use `var(--…)` (your kit may define extra
  concept vars, e.g. `--kp-accent`).
- `contrast-check.mjs` reads **your** `theme.css` and requires AA on:
  `--c-body/--c-canvas` · `--c-body/--c-surface` · `--c-ink/--c-canvas` ·
  `--c-on-primary/--c-primary` · `--c-on-primary` (or `--c-ink`)/`--hero-bg` ·
  `--c-muted/--c-canvas` and `--c-muted/--c-surface-soft` (WARN tier).
  **Plain hex values only** (a `color-mix()` is skipped, i.e. unverified).
- **Any class used on 2+ of your screens is defined once, in the kit** — a selector
  redefined in two pages' `<style>` blocks (even identically) is a Hard-rule-8 failure.
  Page `<style>` may hold only selectors that appear on that one page.
- **Viewport-safe:** no `width:`/`min-width:` ≥320px, no fixed `height:` ≥650px, no
  `100vh` (use `100dvh`), no `.screen/.frame/.device` with `overflow:hidden`. Fluid only.
- **Icons:** Lucide `<i data-lucide="…">` + `lucide.createIcons()`; **no inline `<svg>**.
  Known-good set already used by the base: `bell volume-2 chevron-right trophy award flame
  check lock play circle-play clipboard-check users graduation-cap settings search
  download more-horizontal plus x eye pencil pause-circle shield wallet calendar clock
  trending-up bar-chart-3 target home book-open medal gift log-out`.
- **Text must not overflow its box** at 390px (the textbreak gate renders and compares
  `scrollWidth > clientWidth`): no fixed widths, long Bangla wraps with
  `word-break: keep-all; overflow-wrap: anywhere` where needed, chips/buttons use
  `min-width:0` + ellipsis on the label when truncation is intended.
- The admin listing must keep CONTRACT §3 behaviour **and markup** on `02-students.html`:
  `data-listing="table"` on the table, `<th>` sortable headers with
  `aria-sort`+sort buttons, search input, row checkboxes + select-all, a bulk bar, and a
  `row-actions` trigger + menu.

## 7 · Images (preview realism)

Media blocks carry stand-in images so the concept reads true, via the shared atom
`.pimg { object-fit: cover; display: block; width: 100%; height: 100% }` (defined in your
kit). Rules: **only where media is real content** (subject/chapter cover art), always
`<img alt="…" loading="lazy">`, wrapped in a class containing `media`, and the URL must be
a verified-loading one — check with `curl -sI` before shipping. Suggested seed form:
`https://picsum.photos/seed/<word>/640/480`. Quiz's fraction visual stays CSS/SVG-free of
photos (draw it with divs), because a random photo is not a fraction.

## 8 · Structure of an HTML file

```html
<!doctype html>
<html lang="bn-BD">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>… বাংলা …</title>
<link …four stylesheets…>
<script src="https://unpkg.com/lucide@latest"></script>
<style> /* page-local selectors ONLY — see §6 */ </style>
</head>
<body class="…">
  <header class="…topbar…" data-shell="topbar"> … </header>
  <main class="…"> …modules… </main>
  <nav class="…tabbar…" data-shell="bottomnav"> … </nav>   <!-- frontend only -->
  <script>lucide.createIcons();</script>
</body>
</html>
```

Link hygiene: screens in the hero set link each other **same-folder**
(`01-home.html` ↔ `08-quiz.html`); anything outside the hero set points at the real base
page — `../../base/frontend/<name>.html` or `../../base/frontend-admin-dashboard/<name>.html`.
Every `href` must resolve to a file that exists (run `find design -name '<target>'`).

## 9 · Self-check before you report done

```bash
cd design && for f in concepts/<slug>/*.html; do
  grep -c 'style="[^"]*#[0-9a-fA-F]' "$f"        # must be 0 (literal hex inline)
  grep -c '100vh\|width: *[0-9]\{3\}px' "$f"     # must be 0
done
DESIGN_SCOPE=all node ../../../../.claude/design/scripts/lint_dos_donts.mjs contract . | tail -3
DESIGN_SCOPE=all node ../../../../.claude/design/scripts/consistency-check.mjs . | tail -5
node ../../../../.claude/design/scripts/contrast-check.mjs . | tail -5
node ../../../../.claude/design/scripts/link-check.mjs . | tail -5
```

Report: files written, gates run + result, and any contract item you could not satisfy.
