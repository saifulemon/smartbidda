# D2-DESIGN BRIEF — smartbidda (Spotify-Rails Selected)

> **Phase:** D2-Design
> **Selected Reference:** spotify-rails
> **Input:** BRAND_SPEC.md, FEATURE_CONTRACT.md, VARY_REPORT.md, DESIGN_STATUS.md,
>   design/concepts/spotify-rails/ (6 hero screens + theme.css + kit), user_stories/_fixtures.yaml
> **Outputs:** html/<app>/ (24+12 routes), states/ (*.states.html), manifest.json (updated),
>   AUDIT_REPORT.md (5-axis), pipeline init completion

---

## 1. Concept & Brand Overview

**Concept:** spotify-rails — Spotify DNA
- **Canvas:** near-black `#131214`
- **Primary Accent:** `#1DB954` (green, 7.7:1 AA on `#08090A`)
- **Secondary Accent:** `#F5C451` (warning), `#F2555A` (error)
- **Typography:** `Mina` (display) + `Hind Siliguri` (body)
- **Form Language:** horizontal content rails, floating pill tabbar, thumb-reach primary action, glow hero panels, dark KPI strips
- **Chrome:** byte-identical topbar `data-shell="topbar"` + bottomnav `data-shell="bottomnav"` across all 5 frontend screens; console chrome `.klc-side` + `.klc-console` for `02-students`

**Brand Tokens (from BRAND_SPEC.md):**
- 14 colour tokens (all plain hex, AA-compliant)
- 25 typography tokens (Mina display, Hind Siliguri body)
- Shape/radius and elevation atoms
- 17 shared component atoms (`.ksr-…` classes)
- Form language per hero screen

---

## 2. Route Map (24 frontend + 12 admin)

**Frontend Routes (24 total, matching `base/frontend/`):**

| Route | Hero Screen? | Key IA for Spotify-Rails |
|---|---|---|
| `/` (01-home) | ✅ | Dark hero panel with glow, KPI strip, subject rail (.ksr-rail/.ksr-tile), voice toggle |
| `/onboarding` | ✅ | Onboarding flow (name + 4-dot Bangla keypad, PIN confirm) |
| `/learn` | ❌ | Breadcrumb header (.klc-breadcrumb), chapter list (.klc-row) with `klc-dot` state |
| `/learn/:classNo/:subjectSlug` | ❌ | Subject hero (.media-media-photo), `.ksr-btn` continue, chapter rows |
| `/learn/:classNo/:subjectSlug/:chapterSlug` | ❌ | Chapter page (.klc-panel), header (.klc-panel-hd), body (.klc-panel-body), nav nav (.klc-navtoggle) |
| `/quiz/:sessionId` | ✅ | Fraction visual (divs, no SVG), 4 stacked pill options (.ksr-opt), `.ksr-timer` thin track, `.ksr-btn .ksr-round` voice |
| `/retake-class` | ❌ | Hairline rows with `klc-dot` state, `.klc-ledger` ledger rows, `.klc-lrow` body |
| `/exam-list` | ❌ | Dense table (.klc-table) with `klc-dot` status, avatar cell, `.klc-row` with micro `.klc-micro` |
| `/exam/:examId` | ❌ | Exam page (.klc-panel), weak topics grid, `.klc-status` dot + word, `.klc-btn .klc-btn.is-danger` |
| `/exam-result` | ❌ | Result page (.klc-panel), score display `.klc-stat`, `.klc-row` with tracks, `.klc-chip` |
| `/leaderboard` | ✅ | Top-3 art-tile rail (.ksr-tile), list rows with inline green track, class chips `.ksr-chip`, my-rank pill `.ksr-badge` |
| `/rewards` | ❌ | Rewards grid (.ksr-tile), earned badges `.ksr-badge.is-ok/.is-bad`, `.klc-progress` |
| `/settings` | ❌ | Settings grid (.klc-grid), toggle switches `.ksr-switch`, `.klc-dot` status indicators |
| `/parent/login` | ❌ | PIN pad keypad (.klc-keypad), `.klc-side-label`, `.klc-side-item` |
| `/parent` | ✅ | Avatar-switcher rail (.kat-side/.ksr-side), KPI panels (.ksr-panel), forecast panel (.ksr-panel), `.kat-btn .ksr-btn` |
| `/parent/progress` | ❌ | Subject score grid (.klc-ledger), `.klc-lrow`, `.klc-lrow-body`, `.klc-lrow-end` |
| `/parent/analytics` | ❌ | Alert list (.klc-row), `.klc-status` dot + word, `.klc-dot.is-ok/.is-warn/.is-bad` |
| `/parent/screen-time` | ❌ | KPI strip (.ksr-stat), `.klc-track` `.klc-fill`, `.klc-dot.is-dark` |
| `/parent/alerts` | ❌ | Dense list (.klc-row), `.klc-status` dot + word, `.klc-dot` + `.klc-btn .klc-btn.is-quiet` |
| `/parent/subscription` | ❌ | Subscription card (.ksr-card), `.ksr-search`, `.ksr-chip`, `.ksr-badge` |
| `/parent/settings` | ❌ | Settings grid (.klc-grid), `.ksr-switch`, `.klc-dot`, `.klc-btn .klc-btn.is-quiet` |

**Admin Routes (12 total, matching `base/frontend-admin-dashboard/`):**

| Route | Key IA for Spotify-Rails |
|---|---|
| `/admin/students` | `.klc-side` sidebar rail, `.klc-panel-body` table, `.klc-btn .klc-btn.danger`, `.klc-chip`, `.klc-dot`, bulk bar, pagination, `.klc-status` |
| `/admin/parents` | `.klc-side` sidebar, table with parent email cell, `.klc-btn .klc-btn.danger`, export `.klc-export` |
| `/admin/teachers` | `.klc-side` sidebar, table with role cell, `.klc-btn .klc-btn.danger`, `.klc-chip` for role tags |
| `/admin/curriculum` | `.klc-side` sidebar, curriculum tree (.klc-tree), `.klc-lrow`, `.klc-lrow-body`, `.klc-lrow-end` |
| `/admin/content` | `.klc-side` sidebar, content list (.klc-row), `.klc-chip` for format tags, `.ksr-chip` for Kind tags |
| `/admin/questions` | `.klc-side` sidebar, question list (.klc-row), `.klc-chip` for topic tags, `.klc-dot` for difficulty |
| `/admin/exams` | `.klc-side` sidebar, exam list (.klc-row), `.klc-chip` for exam type, `.klc-btn .klc-btn.danger` for delete |
| `/admin/remedial` | `.klc-side` sidebar, remedial list (.klc-row), `.klc-chip` for subject, `.klc-dot` for status |
| `/admin/subscriptions` | `.klc-side` sidebar, subscription list (.klc-row), `.ksr-chip` for plan tags, `.klc-btn .klc.btn.danger` for refund |
| `/admin/notifications` | `.klc-side` sidebar, notification list (.klc-row), `.klc-chip` for channel, `.klc-dot` for priority |
| `/admin/audit` | `.klc-side` sidebar, audit log (.klc-row), `.klc-chip` for action type, `.klc-dot` for success/failure |

**Layout Split:**
- `frontend/` — 24 child/parent routes, `.appbar` + `.tabbar` (5 frontend screens share byte-identical chrome; `02-students` uses `.klc-side` + `.klc-console`)
- `frontend-admin-dashboard/` — 12 admin routes, `.sidebar` + `.app-topbar` (sidebar with 12 items, topbar with app title)

**Layouts:**
- `AuthLayout` — `/auth/login`, `/auth/signup` — none, full-screen
- `PinLayout` — `/parent/login` — none, full-screen PIN pad
- `StudentLayout` — `/`, `/learn`, `/exams`, `/leaderboard`, `/rewards` — appbar + 5-tab tabbar
- `StudentSubLayout` — onboarding, subject, chapter, lesson, quiz, quiz result, retake, exam, exam result, settings — appbar with back link, no tabbar
- `ParentLayout` — 7 `/parent/*` routes — appbar + 5-tab tabbar
- `AdminLayout` — all 12 `/admin/*` — sidebar (12 items) + topbar

**Chrome Byte-Identity:**
- All 5 frontend screens share one byte-identical topbar block (only active nav item differs, marked `.is-on` + `aria-current="page"`)
- All 5 frontend screens share one byte-identical bottomnav block (same structure, only active marker differs)
- `02-students.html` uses console chrome `.klc-side` + `.klc-console`, same DNA, its own block

---

## 3. States Sheets Plan

**Per-route `*.states.html` files** (NOT routes, per OUTPUT_RULES §6):
- Generated from `design/gen/extract_states.py` → `gen/states.json`
- Each sheet: loading (skeleton), empty (.empty-state), error (+"আর চেষ্টা করো")
- Edge cases: 14 opt-out notice (14), 15, 23 payment spinner, 24 disabled button
- Frames deduplicated by key, trailing `….`/`।` stripped
- Admin pages: skeleton loading frame + kept edge rows only; empty/error copy recorded as PRD gap, not invented
- Admin pages have no §3 State Screens (PRD L2971 defers to undelivered `admin-standards.md`)

**State Counts:**
- Frontend sheets: 3–8 frames per sheet (24 routes)
- Admin sheets: 2–6 frames per sheet (12 routes)
- Total: 36 `*.states.html` sibling files

**Key States per Route (derived from PRD + audit):**
- `01-home`: Loading (skeleton tiles), Empty (no content), Error (স nond)
- `06-chapter-list`: Loading (9 skeleton rows), Empty (no chapters), Error (chapter load fail)
- `08-quiz`: Loading (question + 4 options skeleton), Error (question load fail), Error state with retry
- `14-leaderboard`: Loading (3 skeleton rows + podium), Empty (no data), Error (data load fail), Error state with retry
- `18-parent-dashboard`: Loading (card skeletons), Empty (no child data), Error (dashboard load fail)
- `02-students`: Loading (skeleton table), Empty (no students), Error (data load fail), Error state with retry

**Per-route state sheet files:** `design/states/01-home.states.html`, ..., `design/states/24-parent-settings.states.html`

---

## 4. Manifest.json Update

The `design/manifest.json` already created needs to be updated to reflect the full route map and globalStyles consumed from the brand spec. Key fields:

- `routes.frontend`: all 24 routes (not just hero set)
- `routes.admin`: all 12 admin routes
- `globalStyles`: reference to `design/styles/theme.css` + `design/styles/components.css`
- `primaryColour`: `#1DB954`, `onPrimaryColour`: `#08090A`, `canvasColour`: `#131214`
- `fontDisplay`: `Mina, system-ui, sans-serif`, `fontBody`: `Hind Siliguri, system-ui, sans-serif`
- `tokenContract`: `design/FEATURE_CONTRACT.md`
- `d1DesignConsumed`: `true`
- `brandSpec`: `design/BRAND_SPEC.md`

**Updated manifest.json will be placed at:** `design/manifest.json` (overwrite with full route map)

---

## 5. AUDIT_REPORT.md (5-Axis PRD-vs-Design Audit)

**Axes to score (per concept, but only spotify-rails is relevant post-pick):**

| Axis | Bucket (spotify-rails) |
|---|---|
| **Color** | full-dark (canvas `#131214`, surface `#1D1C20`, primary `#1DB954`) |
| **Type** | compressed-display (Mina display, Hind Siliguri body, tabular numerals) |
| **Shape** | sharp-0px (hairlines, 0px borders, no rounded corners on core elements) |
| **Elevation** | flat-hairline (no shadow, only hairline rules) |
| **Chrome** | minimal-bar (topbar + bottomnav, re-authored, not base-copy) |
| **Layout-IA** | horizontal-scroller (rails, tiles, KPI strips; per-screen IA) |
| **Interaction** | snap-swipe-rails (vertical scroll only on admin; hero screens use rail-swipe or tap) |

**Scoring & Spread:**
- Each concept scores one bucket per axis
- No two variations share 4+ buckets (proven by design)
- No concept in FAIL bucket: `Chrome = base-copy` or `Interaction = vertical-scroll` (when all are)
- Set spread: not all light, not all pill, not all card-stack, not all the same nav frame, not all vertical-scroll

**Report Structure:**
- Score table per axis per concept
- Spread analysis (no two concepts occupy same bucket on 4+ axes)
- Parity check: each variation passes verify loop (contract/overlap/textbreak/link)
- Notes: chrome re-authoring verified, interaction models distinct, layout-IA per-screen not just home

**Report Location:** `design/AUDIT_REPORT.md`

---

## 6. D2-Design Handoff Checklist

- [ ] `manifest.json` updated with full route map + globalStyles + brand spec reference
- [ ] `html/<app>/` — 24 frontend routes + 12 admin routes, each linking 4 stylesheets (`../../styles/theme.css`, `theme.css`, `../../styles/components.css`, `kit-spotify-rails.css`)
- [ ] `states/` — `*.states.html` for every route (skeleton + edge rows only, no co-rendered frames)
- [ ] `AUDIT_REPORT.md` — 5-axis scoring table, spread analysis, parity check results
- [ ] `user_stories/_fixtures.yaml` — already authored, verified against all routes
- [ ] `verify-all.mjs` (default scope) — 0 failures on `design/` (base + concepts/spotify-rails)
- [ ] `DESIGN_STATUS.md` — updated: `D2-design in progress → D2-design completes → pipeline init triggered`
- [ ] No cross-page drift in consistency-check (all shared classes `.ksr-…` promoted to kit, none in page `<style>`)
- [ ] Chrome identity verified: topbar md5 identical across 5 frontend screens, tabbar identical after stripping `is-on`/`aria-current`
- [ ] Class audit: all classes defined on all 6 files, no re-declarations in page `<style>`

---

## 6. Timeline & Dependencies

**Dependencies:**
- `BRAND_SPEC.md` — finalized tokens and form language
- `FEATURE_CONTRACT.md` — per-screen module requirements and negative space
- `VARY_REPORT.md` — divergence/parity check results
- `DESIGN_STATUS.md` — selected reference: spotify-rails
- `design/concepts/spotify-rails/` — 6 hero screens + theme.css + kit-spotify-rails.css
- `user_stories/_fixtures.yaml` — already authored, verified against all routes
- `design/manifest.json` — already created, needs route map update

**Dependencies Excluded (concepts only, not delivery):**
- `DESIGN_SCOPE=all` consistency/checks (concepts excluded from default gate)
- `listing-check` FAILs only with `DESIGN_SCOPE=all` (2 incomplete of 15 marked)

**Timeline:**
- D2-design: 2–3 weeks (full app build from chosen concept)
- Pipeline init: immediately after D2-design artifacts are validated
- Full pipeline (database → backend → frontend → integrate → test-api → test-browser): after pipeline init

---

## 7. Next Steps

1. **Update `manifest.json`** with full route map + globalStyles (already in progress)
2. **Generate `states/`** — 36 `*.states.html` files from `gen/states.json`
3. **Generate `html/<app>/`** — all 36 route files (24 frontend + 12 admin) with full IA per Spotify-Rails
4. **Write `AUDIT_REPORT.md`** — 5-axis scoring and spread analysis
5. **Run `verify-all`** (default scope) — validate all gates pass
6. **Trigger `pipeline init`** — mark D2 complete, begin database/Backend/frontend phases

---

## 8. D2-Design Brief Ends Here

The Spotify-Rails concept is the basis for the full app build. All D1-design output artifacts are consumed as inputs for D2-design.

---

*End of D2-Design Brief*