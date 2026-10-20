# D2 BUILD BRIEF — spotify-rails full build (shared by every build agent)

You are building ONE screen of the smartbidda **spotify-rails** delivery. Read this
brief fully, then your assigned screen's base file, then write the output.

## Output location
`design/html/<app>/<NN-name>.html` where `<app>` is `frontend` (24 screens) or
`frontend-admin-dashboard` (12 screens). State sheets → `design/html/states/<NN-name>.states.html`.

## `<head>` — exactly this, same depth (`../../`) as concepts
```html
<!doctype html>
<html lang="bn-BD">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>… — স্মার্টবিদ্যা</title>
<link rel="stylesheet" href="../../styles/theme.css">
<link rel="stylesheet" href="../../styles/components.css">
<script src="https://unpkg.com/lucide@latest"></script>
<style>
  /* page-local LAYOUT only — every colour / font-size / radius / shadow is a var(--…) token */
</style>
</head>
```
The brand theme (`styles/theme.css`) + the spotify-rails component vocabulary
(`styles/components.css`, the `.ksr-*` classes) are ALREADY promoted into the shared
styles. Do NOT link any `concepts/` or `kit-*.css` file. Do NOT redefine any `.ksr-*`
or shared class in your page `<style>` (Hard rule 8 → FAIL). Page `<style>` holds only
single-use layout scaffolding (flex gaps, a page-specific max-width, grid columns),
all values `var(--…)`.

## Chrome — copy VERBATIM from the exemplar, byte-identical per layout group
Use the markup below. Only change (a) text in the title slot, (b) which nav item has
`is-on` + `aria-current="page"`, (c) intra-app hrefs.

### StudentLayout (appbar + floating pill tabbar) — exemplar `concepts/spotify-rails/01-home.html`
Copy its `<header class="ksr-appbar" data-shell="topbar">…</header>` and its
`<nav class="ksr-tabbar" data-shell="bottomnav" …>…</nav>` blocks byte-for-byte.
5 tabs: হোম(01-home) · পড়াশোনা(05-subject-list) · পরীক্ষা(11-exam-list) ·
লিডারবোর্ড(14-leaderboard) · পুরস্কার(15-rewards). Active tab gets `class="ksr-tab is-on"`
+ `aria-current="page"`; others `class="ksr-tab"`. Content lives in `<main class="ksr-main" data-shell="content">`.

### StudentSubLayout (back + title appbar, no tabbar) — exemplar `concepts/spotify-rails/06-chapter-list.html`
Back link: `<a class="ksr-back" href="SIBLING.html" data-testid="…-back"><i data-lucide="arrow-left" class="icon-sm" aria-hidden="true"></i> LABEL</a>`
inside `<main class="ksr-main">`. No tabbar.

### ParentLayout — same chrome as StudentLayout but PARENT tabs; exemplar `concepts/spotify-rails/18-parent-dashboard.html`
5 tabs: ড্যাশবোর্ড(18-parent-dashboard) · অগ্রগতি(19-parent-progress) ·
স্ক্রিন টাইম(21-screen-time) · অ্যালার্ট(22-alerts) · সেটিংস(24-parent-settings).

### AdminLayout (dark console) — exemplar `concepts/spotify-rails/02-students.html`
`<div class="ksr-console">` wrapping `<aside class="ksr-side" data-shell="sidebar">`
(12 nav items, byte-identical across all 12 admin screens) + `<div class="stu-main">`
with `<header class="ksr-appbar" data-shell="topbar">` (nav-toggle + title + user menu).
Copy the whole sidebar byte-for-byte; only the `is-on`/`aria-current` item changes.

### AuthLayout / PinLayout (no chrome) — exemplars: 02-login/03-signup (auth), 17-parent-login (pin)
Full-screen centered card. No appbar, no tabbar.

## Content contract (binding)
- **Every module, field, control, CTA must trace to the base screen or PRD.** Read
  `design/FEATURE_CONTRACT.md` negative space: invent NO extra fields/filters/chips; drop NONE.
- **Data values come from the base file** — grep them, don't re-invent. Keep the
  coincidence anchors consistent: `২৪/৬০ মিনিট · আরও ৩৬ মিনিট বাকি` · `১,২৪০ পয়েন্ট · #৪` ·
  child `রাফিদ` (Class 4) + sibling `মাহিন` · streak `৫ দিন` · forecast `মাঝারি` ·
  pass `৬০%` · IDs `SB-FAM-… / SB-EXM-20261016-0487 / SB-SUB-20260901-1041 / SB-PAY-20260925-4181`.
- **All user-visible strings Bangla** (`lang="bn-BD"`). Bangla digits for display numbers.

## Structural markers — PRESERVE byte-identical from base (converter maps these)
`data-testid` (all of them — never drop/rename), `data-component`, `data-shell`,
`data-app` / `data-layout`, `data-sort` on `<th>`, and the admin-listing set
`data-listing` / `data-table` / `search-bar` / `row-actions` / `row-select` /
`bulk-actions` / `entity-form-modal`. A listing that loses these decomposes into
N hand-drawn tables → `listing-check` FAIL.

## Gate rules (will be verified — do not violate)
- No literal hex/rgb, `font-size`, `border-radius`, `box-shadow` colour in `style=`
  or `<style>` — use `var(--token)`. (Plain structural layout like `gap`, `flex`,
  `width:%`, `aspect-ratio` are fine.)
- Icons: Lucide `<i data-lucide="…">` only. NO inline `<svg>`, NO emoji.
- Media: real placeholder photos `<img class="pimg" src="https://picsum.photos/seed/…">`
  inside a `.media` frame — NOT flat grey boxes.
- No fixed frame / `100vh` height; `viewport-fit=cover` + safe-area padding on scroll containers.
- Every interactive row that is a records listing needs `row-actions` + sortable `<th data-sort>` + `search-bar`.
- End each file with `<script>lucide.createIcons();</script>` before `</body>`.

## Intra-app links
In `html/frontend/`, sibling screens link `NN-name.html`. In
`html/frontend-admin-dashboard/`, siblings link `NN-name.html`. Do NOT link into
`base/` or `concepts/` from a delivery screen.

## Class vocabulary (all defined in shared components.css — USE, don't redefine)
`.ksr-appbar .ksr-wordmark .ksr-appbar-title .ksr-round .ksr-tabbar .ksr-tab .ksr-tab-ico`
`.ksr-side .ksr-side-item .ksr-console .ksr-navtoggle` · `.ksr-main .ksr-section .ksr-sec-hd
.ksr-sec-link .ksr-back .ksr-hero .ksr-panel .ksr-hd .ksr-eyebrow .ksr-stack` ·
`.ksr-rail .ksr-tile .ksr-tile-title .ksr-tile-meta` · `.ksr-btn (.is-quiet .is-block)
.ksr-chip (.is-on) .ksr-badge (.is-ok .is-bad .is-warn .is-quiet) .ksr-row .ksr-item
.ksr-item-t .ksr-play (.is-quiet) .ksr-list` · utilities `.ksr-grow .ksr-col .ksr-ok .ksr-mute`.
Shared from components.css also: `.media .progress .progress-fill .avatar .row .stack
.card .badge .t-* .icon-sm/.icon-md .search .table .chip .status .dot .track .fill .ledger .lrow .keypad .switch .empty-state .skeleton`.
Grep `styles/components.css` for the exact class you need before inventing one.

---
Match the bespoke quality of the 6 hero exemplars: real photos, the concept's actual
badge/chip/rail vocabulary, thumb-reach primary CTAs, glow hero panels where the
exemplar uses them. Not a thinner generic approximation.
