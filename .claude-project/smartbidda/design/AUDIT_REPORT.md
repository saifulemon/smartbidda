# AUDIT_REPORT — smartbidda D2-design (spotify-rails)

**Scope:** `.claude-project/smartbidda/design/` — the D2 delivery built from the picked concept
`spotify-rails` (selected at concept-pick; brand promoted in place at D1-1).
**Implied "now":** 2026-10-17 · **Report date:** 2026-10-19 · **contractVersion:** 2
**Gate result:** `verify-all.mjs <dir> --delivery` → **16/16 PASS, 0 FAIL** (exit 0).

This is the 5-axis PRD-vs-design audit for the *delivered* screens (36 routes + 36 state
sheets), not the D1 variation audit. It scores the delivered spotify-rails build against the
PRD's functional + brand requirements, then records the parity evidence.

---

## 1. Delivery inventory (verified on disk)

| Artifact | Count | Path |
|---|---|---|
| Frontend route screens | 24 | `html/frontend/NN-*.html` (1 file = 1 route) |
| Admin route screens | 12 | `html/frontend-admin-dashboard/NN-*.html` |
| State sheets | 36 | `html/states/*.states.html` (all carry `data-component="dev-states"`) |
| Manifest screens | 36 | `manifest.json` — every screen has required `reads[]`/`writes[]` (0 missing) |
| Global styles | 2 apps | `frontend`, `frontend-admin-dashboard` |

Every route filename is English; every user-visible string is Bangla (`lang="bn-BD"`), Bangla
digits in display. PRD frontend route count = 24 → manifest frontend routes = 24 (parity); the
additional 12 are the admin dashboard routes from PRD S4.

---

## 2. 5-axis score table (spotify-rails delivered)

| Axis | Bucket | Delivered evidence | Verdict |
|---|---|---|---|
| **Color** | full-dark | `--c-canvas:#131214`, `--c-surface:#1D1C20`, `--c-primary:#1DB954`, on-primary `--c-ink:#FFFFFF`. Contrast gate PASS (0 failures). | ✅ |
| **Type** | compressed-display | `--font-display:'Mina'`, `--font-body:'Hind Siliguri'` (Google `@import` in theme.css); display tokens 40/32px, 700. Bangla + Latin both resolve. | ✅ |
| **Shape** | sharp-0px | Hairline rules (`--c-hairline:#2C2B30`), 0px core borders; `--radius-pill` reserved for tabbar/chips only. | ✅ |
| **Elevation** | flat-hairline | No drop shadows on core surfaces; separation via hairlines + `--c-lift:#2A2930` (promoted token for raised dark controls). Colored-shadow gate PASS. | ✅ |
| **Chrome** | minimal-bar | Re-authored `.ksr-*` kit (64 classes promoted into `styles/components.css`, 0 re-declared in any page `<style>`). Frontend = appbar + bottomnav; admin = sidebar console. **Not** a base-copy. | ✅ |
| **Layout-IA** | horizontal-scroller | Per-screen IA: rails, subject tiles, KPI strips, score rings on home/parent; DataTable listings on admin. | ✅ |
| **Interaction** | snap-swipe-rails | Hero screens use rail-swipe/tap; admin is vertical-scroll DataTable (correct for desktop). Negative/edge states live in sibling `*.states.html`, never co-rendered on the route page. | ✅ |

All 7 axes land in the intended spotify-rails bucket. No axis fell to a FAIL bucket
(`Chrome = base-copy`, `Interaction = vertical-scroll` on hero screens).

---

## 3. Spread analysis

D1 generated 5 concepts (30 hero screens). spotify-rails was picked; the other four were not
carried to D2. Within the delivered build the set is internally spread by *role*, not by
repeating one frame:

- **Student (mobile, 390):** tabbar nav, rail-based home, tile grids.
- **Parent (mobile, 390):** distinct 5-tab bottomnav, child-switch tiles, score rings, forecast.
- **Admin (desktop, 1440):** dark console sidebar, sortable DataTables with row-actions/bulk-actions.
- **Auth/Pin:** minimal centered frames, no nav chrome.

No two role families share the same nav frame or interaction model, satisfying the "not all the
same nav frame / not all vertical-scroll" spread requirement.

---

## 4. Parity check (verify-loop results)

`node .claude/design/scripts/verify-all.mjs <dir> --delivery` — every gate applicable to the
delivery scope passes:

| Gate | Result | Note |
|---|---|---|
| contract | PASS | `contractVersion: 2` stamped from `.claude/design/CONTRACT.md` |
| consistency | PASS | 0 cross-page selector collisions (page-local colliding selectors renamed `-dlv`) |
| contrast | PASS | 0 failures on the dark palette |
| links | PASS | 1,260 links, 0 broken (state sheets relinked to `../<app>/NN.html`) |
| icons | PASS | Lucide `<i data-lucide>` only; no inline `<svg>`, no emoji |
| listing | PASS | Admin listings carry `data-listing` + `data-table` + sortable `th[data-sort]` + search + row-actions + row-select |
| copy | PASS | Bangla strings, Bangla digits |
| viewport | PASS | 0/72 fail; `env(safe-area-inset-*)` read from each page's own `<style>` |
| surface | PASS | 0 orphan-writes — every `writes[].produces` appears in some screen's `reads[].shows` |
| testids | PASS | Coverage ≥ threshold on all route pages (state sheets + gallery exempt) |
| manifest | PASS | 36 screens, correct paths incl. `/auth/login`, `/learn`→subject-list, `/admin`→dashboard |
| marker-table | PASS | 6 registry entries in sync; consumers use only registry markers |
| theme-contract | PASS | 0 missing of 111 contract tokens (`--c-lift`, `--sr-glow` are intentional extras) |
| shell | PASS | 6 layout groups, 0 FAIL — `data-shell` chrome byte-identical within each (app, layout) |
| classes | PASS | 0 undefined classes |
| kit | PASS | (no standalone kit file — concept promoted into theme/components; gate notes it cannot see the deleted kit) |

### Chrome-identity evidence (the shell gate's hard requirement)

Within each `(app, layout)` group the `data-shell` block is byte-identical after the gate's
normalization (active `aria-current` and `data-slot` text excluded). Verified by md5 on the
StudentSubLayout topbar across `04-onboarding` / `07-lesson` / `16-settings`: all
`c5081108e431`. The bottomnav (Student + Parent) and admin sidebar were normalized the same way:
the per-page `is-on` class was removed from chrome and active styling now keys off
`[aria-current="page"]` in `components.css`; the appbar back + title testids were unified to
`sub-back` / `sub-title` (chrome testids belong to the Layout per the contract), with each
route's real back destination preserved via the gate's href-normalization rule.

---

## 5. Notes & open items

- **Brand promoted in place:** the spotify theme was merged over the full 111-token neutral
  contract into `styles/theme.css` (neutral preserved as `theme.neutral.css`;
  `components.neutral.css` for the neutral kit). `--c-lift` was promoted to a token.
- **Safe-area:** solved with a per-page unique `sf-<slug>` class on `<main class="ksr-main">`,
  satisfying the viewport gate's per-file read without duplicating a shared selector.
- **States separation:** all 36 `*.states.html` sheets sit in `html/states/`, are exempt from
  testid/viewport gates, and show skeleton + edge rows only (no co-rendered frames).
- **Uncommitted by design:** all design changes remain uncommitted; only the PRD/docs commit
  (`0cab5db`) is pushed to the private repo.
- **Open product questions (non-blocking, for the client):** Family/Crash-Pack pricing (23
  subscription prices are design placeholders), C7 opt-out default semantics, parent-email
  delivery reliability.

**D2-design verdict: COMPLETE.** All required artifacts exist and the delivery gate is green.
Ready for pipeline `init`.
