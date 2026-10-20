# BRAND_SPEC.md — Spotify Rails (D1-1-brand, finalized 2026-10-19)

> **Purpose:** Finalized brand tokens and visual language for the chosen D1 concept.
> **Reference:** `selected_reference: spotify-rails` (recorded in DESIGN_STATUS.md)
> **Scope:** Brand tokens, colour system, typography scale, and component form language
> that will be consumed by D2-design (`html/<app>/`, `states/`, `manifest.json`,
> `AUDIT_REPORT.md`). No new tokens may be introduced in D2 that are not defined
> here or in the existing `theme.css` / `kit-spotify-rails.css`.

---

## 1 · Colour tokens (`theme.css` :root)

All colours are plain hex only (contrast-gated, 0 failures across 5 themes).

| Token | Value | Role / where used |
|---|---|---|
| `--c-primary` | `#1DB954` | Primary action / CTA |
| `--c-primary-active` | `#159B46` | Housed / pressed state |
| `--c-primary-soft` | `#173322` | Laid-back background (cards, panels) |
| `--c-on-primary` | `#08090A` | Text on primary — 7.7:1 AA on canvas |
| `--c-canvas` | `#131214` | Global background |
| `--c-surface` | `#1D1C20` | Card / panel background |
| `--c-surface-soft` | `#26252A` | Muted card elevation |
| `--c-ink` | `#FFFFFF` | Body text on canvas / surface-soft |
| `--c-body` | `#E6E3E9` | Base text colour |
| `--c-muted` | `#A6A2AD` | Secondary / disabled text |
| `--c-link` | `#1DB954` | Hyperlinks |
| `--c-hairline` | `#2C2B30` | 1px rule inside panels |
| `--c-hairline-strong` | `#3E3D44` | Bold rule / section separator |
| `--c-success` | `#4ADE80` | Success state / badges |
| `--c-warning` | `#F5C451` | Warning / attention |
| `--c-error` | `#F2555A` | Error / destructive action |
| `--c-focus-ring` | `#1DB954` | Focus outline (matches primary) |
| `--hero-bg` | `linear-gradient(180deg, #0E0D0F, #221F26)` | Hero section background |
| `--overlay-scrim` | `rgba(0, 0, 0, 0.66)` | Modal / overlay darkness |

---

## 2 · Typography tokens (`theme.css` :root)

All font-faces are Google‑Font imports (`Mina` display, `Hind Siliguri` body).
Only `--font-family` / `--font-size` / `--font-weight` / `--font-line-height`
/ `--font-letter-spacing` are authorised; `font-stretch` / `font-variant-numeric`
are used only where explicitly noted.

| Token | Value | Role |
|---|---|---|
| `--font-display` | `Mina, system-ui, sans-serif` | Section heads, hero titles, badge labels |
| `--font-body` | `Hind Siliguri, system-ui, sans-serif` | Body copy, form labels, table text |
| `--font-mono` | `Mina, ui-monospace, monospace` | Code snippets, stat values |
| `--t-display-xl-size` | `40px` | Hero page page-title |
| `--t-display-lg-size` | `32px` | Section subhead |
| `--t-display-md-size` | `24px` | Card h3 |
| `--t-title-lg-size` | `20px` | Module headings |
| `--t-title-md-size` | `17.5px` | Meta line, pill label |
| `--t-body-lg-size` | `16.5px` | Lead copy |
| `--t-body-md-size` | `15.5px` | Default body |
| `--t-body-sm-size` | `14px` | Small print, captions |
| `--t-caption-size` | `13px` | Tooltips, meta |
| `--t-button-size` | `16px` | Primary CTA |
| `--t-weight-bold` | `700` | Display / strong headings |
| `--t-weight-semibold` | `600` | Section heads |
| `--t-weight-medium` | `500` | Body copy |
| `--t-weight-regular` | `400` | Body text |
| `--t-body-md-lh` | `1.5` | Body leading |
| `--t-caption-ls` | `0.01em` | Caption tracking |

---

## 3 · Shape & elevation (`theme.css` :root)

| Token | Value | Role |
|---|---|---|
| `--radius-xs` | `4px` | Small chips, avatars |
| `--radius-sm` | `7px` | Buttons, pill inbox |
| `--radius-md` | `11px` | Card corners |
| `--radius-lg` | `16px` | Panel corners |
| `--radius-xl` | `22px` | Full‑bleed sections |
| `--radius-pill` | `999px` | Full pill buttons |
| `--shadow-0` | `none` | Reset |
| `--shadow-1` | `0 6px 18px rgba(0, 0, 0, 0.45)` | Card elevation |
| `--shadow-2` | `0 10px 30px rgba(0, 0, 0, 0.55)` | Panel stack |
| `--shadow-3` | `0 16px 44px rgba(0, 0, 0, 0.6)` | Modal drawer |
| `--shadow-hover` | `0 8px 22px rgba(0, 0, 0, 0.5)` | Hover state |

---

## 4 · Component‑specific atoms (`kit-spotify-rails.css`)

Shared classes that live on **2+ screens** and therefore **must be defined once in the kit** (per consistency-check rule). Page‑local `<style>` may not re‑declare these selectors.

| Class | Purpose | Screens it appears on |
|---|---|---|
| `.ksr-main` | Page wrapper, `max-width: 1440px; margin: 0 auto` | all 6 hero screens |
| `.ksr-hero` | Full‑bleed banner hero block | 01‑home, 14‑leaderboard |
| `.ksr-panel` | Card with hairline border + soft shadow | 06‑chapter‑list, 18‑parent‑dashboard |
| `.ksr-hd` | Heading inside a panel | all screens |
| `.ksr-eyebrow` | Sub‑heading, muted accent | 01‑home, 18‑parent‑dashboard |
| `.ksr-stack` | Vertical stack, `flex-direction: column; gap: var(--space-lg)` | 08‑quiz, 18‑parent‑dashboard |
| `.ksr-stat` | Large stat numeral, tabular numerals | 01‑home KPI strip, 18‑parent‑dashboard KPI grid |
| `.ksr-rail` | Horizontal scrolling content rail | 01‑home subject rail, 06‑chapter‑list hero |
| `.ksr-tile` | Individual tile inside a rail | 01‑home, 14‑leaderboard |
| `.ksr-chip` | Pill‑shaped filter / action button | 14‑leaderboard class chips, 18‑parent‑dashboard quick actions |
| `.ksr-badge` | Small status label | 08‑quiz option states, 14‑leaderboard rank dots |
| `.ksr-search` | Search input wrapper | 02‑students admin |
| `.ksr-tab` | Tab indicator (floating pill tabbar) | frontend chrome (topbar + bottomnav) |
| `.ksr-side` | Console sidebar rail (1440px) | 02‑students only |
| `.ksr-console` | Console main shell | 02‑students only |

> **Hard rule 8 (AUTHORING_RULES):** a custom selector that appears in 2+ pages’
> `<style>` blocks with a different rule body is a FAIL. All shared classes live
> exclusively in `kit-spotify-rails.css`; every page’s `<style>` may only contain
> selectors unique to that one screen.

---

## 5 · Form language (per‑screen, bespoke)

Each hero screen re‑authors its own structure and component forms. The kit
provides the tokens; each screen HTML decides the layout. No shared layout is
re‑used across a concept’s screens (per 02‑skin-authoring.md §4).

| Screen | Form pattern (key divergences from base) |
|---|---|
| **01-home** | Dark hero panel with glow effect (`--sr-glow`), vertical KPI strip, subjects as horizontal rail (.ksr-rail / .ksr-tile) |
| **06-chapter-list** | Subject hero with cover media (.media‑photo), chapter rows as hairline tables (.klc‑row) with `klc‑dot` state indicators |
| **08-quiz** | Fraction visual drawn with divs (no SVG), four stacked pill options (.ksr‑opt), thin green timer track (.ksr‑timer) |
| **14-leaderboard** | Top‑3 as art‑tile rail (.ksr‑tile), list rows with inline green track, my‑rank pill above tabbar |
| **18-parent-dashboard** | Avatar‑rail children (.kat‑side / .ksr‑side), KPI panels with green track, forecast panel with status dot |
| **02-students** (desktop) | Dark sidebar rail (.ksr‑side), dense hairline table (.klc‑row), row‑actions menu, bulk bar, pagination (.klc‑pagination) |

---

## 6 · Invariant guarantees (what D2 must NOT break)

- `lang="bn-BD"` on `<html>`; every UI string Bangla (proper nouns exempt).
- Head links in exact order: `../../styles/theme.css`, `theme.css`,
  `../../styles/components.css`, `kit-spotify-rails.css`,
  `<script src="https://unpkg.com/lucide@latest"></script>`.
- No literal colours / font‑size / font‑family / border‑radius /
  box‑shadow / named colours in inline `style="…"` or page `<style>`.
- No `100vh`; no `width: ≥320px` / `min-width: ≥320px` / `height: ≥650px`
  in page `<style>`; no `.screen/.frame/.device` wrapper with `overflow:hidden`.
- Lucide `<i data-lucide="…">` + `lucide.createIcons()` only; no inline `<svg>`.
- Data‑testid‑free design: layout is driven by tokens and content‑contract
  modules, not by IDs.
- Admin `02-students.html` keeps `data-listing="table"` on the `<table>`,
  sortable `<th>` with `aria-sort`, search input, select‑all + row checkboxes,
  bulk bar, `row-actions` trigger + menu, result count, pagination, export.

---

## 7 · D2‑design handoff checklist

- [ ] `manifest.json` generated from `design/concepts/spotify-rails/` route map
- [ ] `html/<app>/` — 24 frontend routes + 12 admin routes, each linking the 4 stylesheets
- [ ] `states/` — `*.states.html` for every route (skeleton + edge rows only)
- [ ] `AUDIT_REPORT.md` — 5‑axis PRD‑vs‑design audit (colour, type, shape, elevation, chrome / layout‑IA / interaction)
- [ ] `user_stories/_fixtures.yaml` — hand‑authored, one fixture per route, data‑testid‑light
- [ ] `verify-all.mjs` (default scope) — 0 failures on `design/` (base + concepts/spotify‑rails)
- [ ] No cross‑page drift in consistency-check (all shared classes promoted to kit, none in page `<style>`)

---

*End of BRAND_SPEC.md*