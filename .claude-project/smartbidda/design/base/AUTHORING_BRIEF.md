# smartbidda base HTML — authoring brief (read before writing any page)

You are authoring ONE route page of the neutral **base** design for smartbidda.
This brief is the complete rule set. Follow it exactly — the output is machine-gated.

## Output location

Write to `.claude-project/smartbidda/design/base/<app>/<file>.html`.
`<app>` is `frontend` (24 mobile pages) or `frontend-admin-dashboard` (12 desktop pages).

## Read these first (they are authoritative)

- `../../../skills/2-D1-design/base/TOKEN_CONTRACT.md`
- `../../../skills/2-D1-design/base/AUTHORING_RULES.md`
- `../../../skills/2-D1-design/base/CONSISTENCY_RULES.md`
- `../../../skills/2-D1-design/base/OUTPUT_RULES.md`
- `../../design/getdesign.md` — reference DNA, route map, domain constants
- **`../../design/base/frontend/01-home.html`** — the canonical StudentLayout exemplar
- **`../../design/base/frontend-admin-dashboard/02-students.html`** — the canonical AdminLayout writable-listing exemplar

## Non-negotiable rules (each one is a gate)

1. **Token-only CSS.** No hex, no `rgb()`, no named colours, no literal `font-*`,
   no literal `border-radius`, no literal `box-shadow`. Use `var(--c-*)`,
   `var(--t-*)`, `var(--radius-*)`, `var(--shadow-*)`, `var(--space-*)`.
   Flex/grid, widths of layout regions, percentages, `z-index`, aspect ratios and
   the three canonical breakpoints (900/760/600px) are structure and MAY be literal.
2. **Never re-declare a shared class in a page `<style>`.** If the selector
   contains a class defined in `styles/components.css` (`.btn`, `.card`,
   `.table`, `.sidebar`, `.app-body`, `.listing-head`, `.listing-filters`,
   `.listing-body`, `.progress`, …) it is a FAIL. Promote genuinely-shared
   helpers to `components.css` instead — but for this task, **do not edit
   components.css**; compose from what already exists.
3. **No duplicate custom selector within a page, and none shared with another
   page.** Every custom class in your `<style>` must be unique to YOUR page.
   Prefix it with the screen name (`.lesson-player`, `.quiz-option`,
   `.parents-summary`). If two of your pages need the same helper, name it
   per-page anyway (`.a-…` / `.b-…`) — a shared name is a FAIL.
4. **Icons are Lucide only.** `<i data-lucide="kebab-name"></i>` with real
   lucide.dev names. `<script src="https://unpkg.com/lucide@latest"></script>`
   once in `<head>`, `<script>lucide.createIcons();</script>` once before
   `</body>`. Never emoji, never inline `<svg>`. Standalone icons get
   `.icon-sm`/`.icon-md`/`.icon-lg`; decorative ones get `aria-hidden="true"`.
5. **`data-testid` on every interactive element**, lowercase kebab-case,
   prefixed with the screen (`home-lesson-cta`). Rows repeat the row testid plus
   a `data-id`. ≥70% of interactive elements covered or the gate fails.
6. **All user-visible copy is Bangla.** `lang="bn-BD"`. No English labels.
7. **Each page needs `env(safe-area-inset-…)` somewhere in its own `<style>`**,
   attached to a page-unique class (the gate reads only the page's own style
   block). Do it the way `01-home.html` does — fold it into an existing
   page-unique layout rule rather than adding a second declaration of it.
8. **Semantic HTML**, labels on every input, `data-component` markers on block
   roots (`nav`, `hero`, `card`, `form`, `table`, `list`, `tabs`, `modal`,
   `footer`, `kpi`, `cta`, `media`).

## Page skeleton

```html
<!doctype html>
<html lang="bn-BD">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{Bangla page title} — স্মার্টবিদ্যা</title>
<link rel="stylesheet" href="../../styles/theme.css">
<link rel="stylesheet" href="../../styles/components.css">
<script src="https://unpkg.com/lucide@latest"></script>
<style>
  /* ONLY page-unique layout classes. Prefix with the screen name. */
</style>
</head>
<body data-app="{frontend|frontend-admin-dashboard}" data-layout="{LayoutName}">
  …chrome (byte-identical — copy from the exemplar)…
  <main class="app-body" data-shell="content">…THIS ROUTE ONLY…</main>
  …chrome…
  <script>lucide.createIcons();</script>
</body>
</html>
```

**`data-shell="content"` goes on the page-unique scroll body only.** Every bar is
a **sibling** of it, never inside it. Getting this wrong makes the page
uncollapsible at React conversion and is the single most common defect.

## Chrome — copy BYTE-IDENTICALLY from the exemplar

Open the exemplar and copy the chrome block verbatim. Only two things may differ:
the text inside the `data-slot` element, and `aria-current="page"` on the active
nav item.

| Layout | Exemplar | Chrome |
|---|---|---|
| `AuthLayout`, `PinLayout` | — | no bars, full-screen |
| `StudentLayout` | `01-home.html` | `.appbar` + `.tabbar` (5 Bangla tabs) |
| `StudentSubLayout` | — | `.appbar` only, with a back link; **no** tabbar |
| `ParentLayout` | — | `.appbar` + parent `.tabbar` (see getdesign.md) |
| `AdminLayout` | `02-students.html` | `.sidebar` (12 items) + `.app-topbar` |

For `StudentSubLayout` / `ParentLayout`, derive the chrome from the two exemplars:
same `.appbar` structure (brand is replaced by a back link + title slot), same
tabbar markup with the appropriate items and `aria-current`.

## Content rules

- **Lifecycle tails.** Result/confirmation/expiry screens exist in the route map —
  build the one you are given completely, including its negative state affordance.
- **Time coherence.** One implied "now" = **2026-10-17**. No future-dated
  completed events. All dates on a page consistent with each other.
- **Demo data must add up.** KPI totals equal their visible parts; the same
  entity shows identical values everywhere.
- **Media placeholders.** Where a branded app would place imagery, insert
  `.media-placeholder` with `data-component="media"` and a caption naming what
  belongs there. Never leave a blank void.
- **States go in a sibling file.** The route page is the happy path only. Write
  loading/empty/error variants to `<same-name>.states.html` with
  `<body data-component="dev-states">`, linking the same two stylesheets.

## Domain constants (must be numerically consistent across ALL pages)

| | |
|---|---|
| Pass threshold | 60% |
| Quiz | 10 questions, adaptive difficulty 1–5, seeded tier 2, no timer for Class 1–2 |
| Retake cap | 2 per chapter |
| Linked children | max 3 |
| Screen time | 60 min/day default; `null` = explicitly unlimited; extension 15 min |
| Uploads | video 500MB · PDF 25MB |
| Leaderboard | top 100, display name + class only, opt-out default ON |
| Pagination | 25 default / 100 max |
| PINs | student 4-digit · parent 6-digit |
| Currency | ৳ (BDT) |
| Classes | 1–5, NCTB. Subjects: গণিত বাংলা ইংরেজি বিজ্ঞান সমাজ ও নাগরিকতা ধর্ম ও নৈতিক শিক্ষা চারু ও কারুকলা শারীরিক শিক্ষা স্বাস্থ্য ও সুরক্ষা তথ্য ও যোগাযোগ প্রযুক্তি |
| Term exams | ১ম সাময়িক · অর্ধবার্ষিক · বার্ষিক |
| Payment | bKash · Nagad · Upay (via SSLCommerz) |
| Status badge rule | one label + one colour per enum value, reused identically on every page |

## Admin listings (the 12 admin pages)

Copy the full listing structure from `02-students.html`. A **writable** listing
needs ALL of: `.search` + `search-bar` marker, `th.sortable[data-sort]` with
exactly ONE `aria-sort` (the default sort), `.row-actions` + marker, `.row-check`
+ `row-select` marker, `.bulk-bar` + `bulk-actions` marker (hidden until
selection), ONE `entity-form-modal` serving create AND edit, and a create button.
`data-listing="readonly"` listings need only search + sortable.

Default sorts are listed in `getdesign.md`.

## Verify your work

```
node .claude/design/scripts/contract-lint.mjs <file>
node .claude/design/scripts/consistency-check.mjs .claude-project/smartbidda/design
node .claude/design/scripts/viewport-check.mjs <file>
node .claude/design/scripts/copy-lint.mjs <file>
```

Fix every FAIL before you finish. `links` gate failures pointing at pages you did
not write are expected and NOT yours to fix.
