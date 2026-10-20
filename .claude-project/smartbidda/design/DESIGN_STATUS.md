# DESIGN_STATUS.md — smartbidda (D1-design → D2-design)

> Phase: **D2-design COMPLETE** · Mode: **self-generate (local)** · Reference: **spotify-rails** (selected 2026-10-17)
> Started 2026-10-17 · **D2 complete 2026-10-19 — ready for pipeline `init`.**

## D2-design completion (2026-10-19)

The picked concept `spotify-rails` was built across all 36 route screens + 36 state sheets.
Brand promoted in place at D1-1 (spotify theme merged over the 111-token neutral contract).

- **Delivery:** `html/frontend/` (24 routes) · `html/frontend-admin-dashboard/` (12 routes) ·
  `html/states/` (36 `*.states.html`, all `data-component="dev-states"`, relinked to routes).
- **Manifest:** `manifest.json` — `contractVersion: 2`, 36 screens, every screen with required
  `reads[]`/`writes[]`; `globalStyles` keyed per app (frontend, frontend-admin-dashboard).
- **Gate:** `verify-all.mjs <dir> --delivery` → **16/16 PASS, 0 FAIL (exit 0)** — contract ·
  consistency · contrast · links · icons · listing · copy · viewport · **surface** · testids ·
  manifest · marker-table · theme-contract · **shell** · classes · kit.
  - `surface` cleared: every `writes[].produces` now appears in some screen's `reads[].shows`
    (0 orphan-writes).
  - `shell` cleared: `data-shell` chrome byte-identical within all 6 (app, layout) groups —
    active nav state moved from a per-page `is-on` class to `[aria-current="page"]` in CSS, and
    the appbar back/title testids unified (`sub-back`/`sub-title`). Chrome-identity md5 verified.
- **Audit:** `AUDIT_REPORT.md` — 5-axis PRD-vs-design score table (all 7 axes in the intended
  spotify-rails bucket), spread analysis, parity evidence.
- **Fix scripts (idempotent):** `gen/build-manifest.mjs`, `gen/fix-shell-chrome.mjs`,
  `gen/fix-state-links.mjs`, `gen/fix-safe-area*.mjs`, `gen/fix-consistency-collisions.mjs`.
- All design changes remain **uncommitted** (only PRD/docs commit `0cab5db` is pushed).

**Next:** hand off to pipeline `init`. Open product questions (non-blocking): Family/Crash-Pack
pricing, C7 opt-out default, parent-email reliability.

---

# Original D1-design status (retained below)

## Where things are

| Path | What |
|---|---|
| `design/getdesign.md` | master prompt — REFERENCE_DNA, app split, layout map, canonical chrome, domain constants |
| `design/styles/theme.css` | neutral base theme (the "mannequin" every concept re-skins) |
| `design/styles/components.css` | shared component vocabulary + 3 additions made this session |
| `design/base/frontend/` | **24** user routes (mobile-first) |
| `design/base/frontend-admin-dashboard/` | **12** admin routes (desktop console) |
| `design/gen/` | generator — one code path per layout, so chrome cannot drift |
| `design/base/AUTHORING_BRIEF.md` | the rule set any author (human or agent) must follow |

**`design/manifest.json` — now present (D2 artifact).** It was deliberately absent
during D1 (OUTPUT_RULES §6: D1 ends at the concept pick and emits no manifest);
it was built at the start of D2 from the PRD's authoritative `#### Route:` /
`### Admin Page:` list — 24 frontend + 12 admin = 36 routes, plus the
`globalStyles` block the pipeline's `scaffold-design-css-bridge` (RULE-F12)
consumes. `surface` and `class-check`/`shell-check` are therefore judged again
in the D2 gate run below, not waived.

## Gate results — 2026-10-17 (after states sheets)

```
PASS  contract      token-only CSS, no literal colour/type/radius/shadow
PASS  consistency   no shared-class redefinition, no cross-page drift
PASS  contrast      AA against the neutral theme
PASS  links         all hrefs resolve, including in *.states.html
PASS  icons         Lucide only, zero inline <svg>, zero emoji
PASS  listing       10 admin listings complete (search/sort/actions/select/bulk/modal)
PASS  copy          no dev identifiers, doc refs, raw enums, or prose
PASS  viewport      no fixed frame/height, no 100vh, safe-area present on all 36
FAIL  surface       (D1 run — manifest.json absent by design; re-run in D2)
```

Also clear outside `verify-all`:
- `testid-coverage` — **100 % (818/818)** across the 36 route files
  (`*.states.html` are exempt by the gate's own rule); 0 file below threshold
- `listing-check` — 0 incomplete of 11 marked · 0 unmarked
- `icon-check` — 0 of 72 files · `image-check` — 0 `<img>` across 72 files
- **chrome byte-identity** verified across all 6 layout groups (see below)
- 72 files total = 36 route screens + 36 `*.states.html` sheets

## App split

Two deployable frontends, per OUTPUT_RULES §0 (an app folder is a *deployable*,
not a layout group):

- `frontend/` — children + parents, 24 routes, `.appbar` + `.tabbar`
- `frontend-admin-dashboard/` — admin/teacher, 12 routes, `.sidebar` + `.app-topbar`

## Layouts

| Layout | Routes | Chrome |
|---|---|---|
| `AuthLayout` | `/auth/login`, `/auth/signup` | none — full-screen |
| `PinLayout` | `/parent/login` | none — full-screen PIN pad |
| `StudentLayout` | `/`, `/learn`, `/exams`, `/leaderboard`, `/rewards` | appbar + 5-tab tabbar |
| `StudentSubLayout` | onboarding, subject, chapter, lesson, quiz, quiz result, retake, exam, exam result, settings | appbar with back link, no tabbar |
| `ParentLayout` | 7 `/parent/*` routes | appbar + 5-tab tabbar |
| `AdminLayout` | all 12 `/admin/*` | sidebar (12 items) + topbar |

All six verified **byte-identical** within their group, after normalising only
the three sanctioned differences (data-slot text, `aria-current`, and the
sub-layout back link). This is the invariant the React conversion depends on —
it collapses N pages into one Layout around the hole.

## Changes made to the shared sheets

Three additions to `components.css`, each justified by appearing on 2+ pages
(AUTHORING_RULES hard rule 8 — a component used on more than one page must live
once in the shared sheet, never re-declared per page):

1. `.tabbar` — `env(safe-area-inset-bottom)` so the pinned bar clears the home indicator
2. `.sidebar.is-open` + its ≤760 px hide rule — the mobile drawer; the toggle lives in `.app-topbar`
3. `.progress` / `.progress-fill` — a genuinely new shared component: lesson, quiz, exam, retake and screen-time all need a progress bar and none existed
4. `.listing-head` / `.listing-filters` / `.listing-body` — admin listing helpers used by all 10 records screens

## Defects found and fixed during generation

| # | Defect | Fix |
|---|---|---|
| 1 | `.X .btn { width:100% }` in 8 page `<style>` blocks — a page rule naming a shared class is a gate FAIL | moved to structural inline `style` on the specific buttons (`width`/`flex` are structure, not theme) |
| 2 | `@media (min-width:761px)` readability caps tripped `viewport-check`'s fixed-frame rule | folded into an unconditional `max-width:760px` on the existing rule — merged, not duplicated, since a second rule for one selector trips the drift gate |
| 3 | badge inconsistency — "চলছে" mapped to `badge-success` in 3 places and `badge-primary` in another | standardised on `badge-primary` (in-progress = the action colour) |
| 4 | **content coherence** — the retake page showed the cap reached (২ / ২) yet still offered "পাঠ শুরু করুন" | cap-reached state now offers escalation: primary "শিক্ষককে জানান", secondary "পড়া আবার দেখুন" — matches the PRD's "2 attempts, then teacher review" |

## Numeric coherence verified across all 36 pages

Pass threshold 60 % · screen-time default 60 min · retake cap 2 · linked
children 2/3 · leaderboard opt-out default ON · ৳ BDT · classes 1–5 · single
implied "now" of 2026-10-17.

## Audit rounds

### Axis 1 — PRD conformance (design quality / missing mandated elements)

**0 P0 / 33 P1 / 42 P2.** Triangulated every candidate against the PRD before
touching the file — roughly a third of the raw findings did not survive
(the "quiz timer" had no PRD basis, and one reading put a screen-time line on
the wrong screen).

Fixed:

| Finding | PRD authority | Fix |
|---|---|---|
| F-07 | L4604 `No [O3] adopted` | removed the PDF-download card and its meta chip from `07-lesson` — offline/download is out of MVP |
| F-08 | L1576 `Difficulty hint \| Hidden (adaptive tier not shown to child)` | removed the difficulty badge from `08-quiz`; a child never sees their tier |
| F-16 | L659 / L675 / L2323 — 3 wrong PINs → 10 min | parent PIN lockout copy corrected from ৫ বার / ১৫ মিনিট |
| F-20 | L2580 / L2622 `dailyLimitMin 0..240` | screen-time slider now 0–240 (was 15–180) |
| D-1 | L3382 difficulty select = `1-3`, Adopted S4 = 3 tiers | quiz seeding tier, question-bank cells and form options all 1–3 |

### Axis 1 — admin listings conformed to the PRD **Display Fields** tables

Every one of the 12 admin pages was re-checked against its own
`1. Table Column Definition`, `2. Filter Options`, `3. Detail Drawer`,
`4. Creation Modal` block. All 10 records screens now match on columns *and*
per-page Actions:

| Page | Columns now | Row actions now |
|---|---|---|
| students | Name · Class · **Parent** · Status · **Points** · Today usage · **Last active** | View / Edit / **Suspend** |
| parents | **Family code** · Name · Email · Children · Plan · Status · Created | View / Edit / **Reset password** |
| teachers | Name · **Email** · Role · **Content count** · Status · **Last login** | View / Edit / **Change role** |
| curriculum | Class · Subject · Chapter · **Order** · **Topics** · Content · Status | **Edit / Move / Archive** |
| content | Title · **Kind** · **Format** · Chapter · **Topics** · Size · **Rights attested** · Status · **Uploaded by** | **Preview / Publish / Archive / Delete** |
| questions | Question · **Subject** · **Chapter** · **Topic** · Difficulty · Type · Used in | **Edit / Duplicate / Retire** |
| exams | Title · Class · Window · Threshold · **Questions** · **Attempts** · **Pass rate** · Status | **Edit / Preview / Close** |
| remedial | **Case no** · Student · **Subject** · Topic · Source · Assigned · Status | View / **Reassign** / **Complete** / **Dismiss** |
| subscriptions | **Payment no** · Family · Plan · Amount · Method · Status · **Gateway ref** · Created | View / **Refund** / **Reconcile** |
| notifications | Key · **Category** · Channels · **Mandatory** · **Sent (30d)** · **Failure rate** | **Edit / Test send** |

Supporting changes:

- `listing()` now takes `rowActions`, because the PRD's Actions column differs on
  every page. Default unchanged (writable → view/edit/delete, read-only → view/copy).
- **Curriculum is now writable.** It was flagged read-only because chapter leaves
  "cannot be created", but the PRD has a full Creation Modal for chapters (L3252).
- **Creation modals re-conformed**: students (parent email, not family code;
  screen-time removed — that is a parent field), teachers (role + temp password),
  content (file → title → kind → chapter → topic tags → rights attestation),
  exams (type, open/close, threshold, question count), notifications
  (bn **and** en subject/body, per template parity).
- **Status enums corrected to the PRD's own lists.** This was the single richest
  source of defects: content `খসড়া / প্রকাশিত / সংরক্ষিত`, remedial
  `তালিকাভুক্ত / চলছে / সম্পন্ন / উর্ধ্বতনে পাঠানো`, exams `আসন্ন / চলছে / শেষ`
  (now identical on the student exam list and the admin table), payments
  `অপেক্ষমাণ / সফল / ব্যর্থ / ফেরত` — the subscription page is payment-shaped, so
  it carries the *payment* enum, not the subscription one.
- **§3.6 identifier formats applied.** `family_code` was rendered `FAM-20418`;
  §3.6 mandates `SB-FAM-YYYYMMDD-NNNN`. All four families, the payments and the
  remedial cases now carry `SB-FAM-…`, `SB-PAY-…`, `SB-CASE-…`, and every date
  inside a code matches that record's own Created column.
- Audit log: before/after merged into one **Change** column with `password`,
  `kidPinHash`, `parentPinHash` masked (a fourth row demonstrates it), **IP**
  added, and the `subscription` filter chip removed — the rows deliberately mix
  entity types, so the page cannot claim to be filtered to one.

**Gates after all of the above:** contract · consistency · contrast · links ·
icons · listing · copy · viewport all **PASS**; only `surface` failed, and it
failed because `manifest.json` is a D2 artifact that did not exist yet (it has
since been built — see the manifest note above).
`testid-coverage` 100 % (756/756) · `icon-check` clean · `image-check` clean ·
`listing-check` 0 column-skew across 11 listings.

### Axis 1 — frontend structural gaps closed (Batch 3)

Every route below was checked against its own PRD component table. Items in
**bold** were missing entirely before this pass.

**`gen/p2.mjs` — 16-settings · 14-leaderboard**
- **Font-size section** (`অক্ষরের আকার` → ছোট / মাঝারি / বড়, default মাঝারি) added —
  PRD L2193 lists Language · Voice · **Font size** · Mute all · Parent link · Logout.
- Sound row copy was a single result beep; PRD says **Mute all** → `সব শব্দ বন্ধ`.
- **`মাকে বলি` parent-link row** inserted between mute and logout (PRD L2197 — an earlier
  F-15 note wrongly excluded it).
- Leaderboard scope chips (আমার শ্রেণি / স্কুল / জাতীয়) were **invented** — the word
  `পরিসর` appears nowhere in the PRD. Replaced with the mandated **class chips ১–৫**.
- **Sticky my-rank bar** `#৪ · ১,২৪০` (PRD L2049) and the *"highlighted when it's me"*
  row state both added; PRD's own sample row is rank 4 at 1,240.

**`gen/p3.mjs` — 22-alerts · 21-screen-time · 24-parent-settings**
- Alerts filter was `সব / দুর্বলতা / পরীক্ষা / স্ক্রিন টাইম`; PRD L2651 mandates
  `ফলাফল / দুর্বলতা / পেমেন্ট / অন্যান্য`. Row badges now name the same categories.
- **Unread badge** (`৩ টি নতুন`), **unread dot** per row, **mark-all-read**
  (`সব পড়া হয়েছে`) and **pagination** (`আরও দেখুন`) were all absent — all four are
  PRD L2648–2656 components.
- Screen-time extension button had a **duplicate `style` attribute** (invalid HTML) and
  read `যোগ করুন`; the PRD success string is `{n} মিনিট বাড়ানো হয়েছে` → `১৫ মিনিট বাড়ান`.
- **`কোন বার্তা পাবেন` notification prefs** (§2.5.4) added to parent settings — 3 of the 5
  rows locked as mandatory, 2 configurable, promo default **off**, quiet hours explained.
  Nudges are child-side, so they are deliberately not listed for the parent.

**`gen/` hand-written pages — 03-signup · 01-home · 05-subject-list · 06-chapter-list · 04-onboarding**
- Signup had **one combined consent checkbox**; PRD L117–119 requires **four separate
  checkboxes** (শর্তাবলী / গোপনীয়তা / শিশুর তথ্য required + marketing optional) with the
  three verbatim error strings, and L1139 requires the CTA to start disabled.
- Home had no **task strip** (PRD L1188: ≤3 pending items + `আরও {n} টি`), no **rank**
  (L1189: `{points} পয়েন্ট · #{rank}`) and no **voice prompt** (L1190).
  The points KPI is now a full-width link card reading exactly `১,২৪০ পয়েন্ট · #৪`.
- Subject list had no **class chips**, no **search input**, no **filter dropdown**
  (PRD `/learn` component table).
- Chapter list started at ch-4 while the header claimed `৩টি অধ্যায় শেষ` — ch-1…3 were
  missing. Rewritten to 9 rows carrying PRD L1416–1419: **row number, state icon
  (✓ / ▶ / 🔒), mastery %**, a **`চালিয়ে যাও` continue button** on the first available
  row, and one **locked, greyed** row.
- Onboarding had no **child-name field** and no **PIN pad** (PRD L1264–1268). Now 3 steps
  (১/৩) with name input, 4-dot **Bangla-numeral keypad** + confirm pad, and the submit
  label corrected from `শুরু করুন` to PRD's `শুরু করো`.

**Deliberately not shown** (states belong on the `*.states.html` sheets): the locked
subject tile — this family's `SB-SUB-20260902-1041` payment is `সফল`, so nothing is
entitlement-locked right now; and an alerts `ফলাফল` / `পেমেন্ট` row — the exam list
shows `কোনো ফলাফল নেই` and this family's last payment succeeded, so both categories
correctly have zero rows.

**Gates after Batch 3:** contract · consistency · contrast · links · icons ·
listing · copy · viewport all **PASS**; only D2-only `surface` failed (no
`manifest.json` at that point — since built). `testid-coverage` **100 % (797/797)** · `listing-check`
0 of 11 · `icon-check` 0 · `image-check` 0.

### Waves B / C / D + parent batch (2026-10-17) — audit closure

Full row-by-row record lives in `AUDIT_AXES_3_4_7.md` ("Resolution log — waves
B / C / D"); this is the summary. Every fix was re-verified against the
rendered output, not the source.

| Wave | What it did |
|---|---|
| **B — mirror symmetry + invented inputs** | Removed controls/content the PRD's component tables do not list; made admin/user sides symmetric where the PRD specs them symmetrically. |
| **C — screen-by-screen rebuild** | `02-login` rebuilt (child selector cards, 4-dot Bangla keypad, voice toggle, প্রিমারি/মাধ্যমিক split, প্যারেন্ট হিসেবে লগ ইন); 07–13 assessment flow (PDF viewer + disabled CTA at 65 %, live `৪৮ সেকেন্ড বাকি`, `+২৫ পয়েন্ট` burst, retake page, exam list 3 cards, `৫৭:৩২` timer + `ফ্ল্যাগ`, exam result weak topics); `06` retake status → 10; `20` 14-day chart + `নির্ভরযোগ্যতা ৮৬%` + `কেন এই প্রাক্কলন`; `21` Blocked status; `23` plan options + `পেমেন্ট করুন (৳৩৯৯)`; `16` `.segmented`; `15` `সাম্প্রতিক পয়েন্ট`. |
| **Parent batch** | `17` inline `পিন মনে নেই?` expander (was wrongly linking to student login); `18` subject score grid + nudge + forecast card; `19` subject tabs / chapter mastery / topic accuracy / before-after / timeline replacing the PRD-unlisted completion card; parent appbar unread badge `৩`. |
| **24 batch** | quota line, per-child leaderboard opt-out switches (মাহিন hidden from 14), Language row, per-child remove + hidden confirm modal, 3-step PIN help; **email/password rows removed** — not in the PRD L2810 table, no validation row, no endpoint. |
| **D — identifiers, enums, dates** | admin ex-3 row `দ্বিতীয়`→`চতুর্থ`; admin week strip now ends at `আজ`; `SB-SUB-20260801-0177` (§3.6 `YYYYMMNN-NNNN`); `21` 7-day `.chart` replacing a 3-row list (today 24 = the `২৪ / ৬০` used everywhere else); readable IDs `SB-EXM-20261016-0487` / `SB-SUB-20260901-1041` / `SB-PAY-20260925-4181` / `SB-FAM-20260902-1041` on 13/23/24; `14` subtitle → `পয়েন্ট অনুযায়ী · সব সময়` (the design-invented `এই সপ্তাহ` period claim appears nowhere in the PRD — DV-4/5 are all-time). |

Two audit claims were checked back against the PRD and **found false**: #34's
citation of a "this week" string, and A8 (the `05` filter carries both শ্রেণি
and বিষয় optgroups). Corrections are logged in the audit file.

### State sheets — 36 `*.states.html` siblings

Route pages carry only the happy path; every PRD state screen, error message
and edge case sits in a sibling `<page>.states.html` marked
`data-component="dev-states"` (SKILL step 4; at D2 delivery they move to
`html/states/`). They are **generated from the PRD, not authored**:

- `design/gen/extract_states.py` → `gen/states.json` — pulls §3 State Screens
  (Loading/Empty/Error), §7 Error Handling rows and §8 Edge Cases for the 24
  routes, plus the Edge Cases tables of the 12 admin pages (admin URLs read
  from the PRD's own `**URL:**` lines).
- `design/gen/states.mjs` → derives each sheet from its **rendered** route
  page (chrome byte-identical by construction, page-local `<style>` dropped so
  no selector appears in two files). Every frame is one state, never two
  co-rendered; duplicate strings dedupe; loading frames are skeleton bars
  (no copy to invent).

**The PRD writes two languages in one cell** — the Bangla string the screen
shows and the English instruction for the builder (`3 skeleton cards`,
`Empty table + create CTA`). Only the Bangla half is printed, so nothing
English ships through the 1:1 conversion. Rows with no Bangla string at all
(builder prose: concurrency, CSV-in-background, keyset pagination) render no
frame — they are spec, not a state the screen ever shows.

Frame counts: 2–8 per sheet (frontend 3–8, admin 2–6). This closes the four
items deferred from the route pages: `তুমি লিডারবোর্ডে দেখাচ্ছো না` (14),
`পেমেন্ট যাচাই হচ্ছে...` + spinner (23), `এখনো কোনো পরীক্ষা দেওয়া হয়নি।` (11),
and the disabled-at-3 `সন্তান যোগ করো` button + `সর্বোচ্চ ৩ জন সন্তান যোগ করা
যায়` (24, which now also carries that PRD string as its base quota line).

**Recorded PRD gap (admin empty/error copy):** L2971 defers loading/empty/error
for all 12 admin pages to an `admin-standards.md` that was never delivered, and
five Zero-data rows (`Parents`, `Teachers & Admins`, `Term Exams`, `Payments`,
`Notifications`-adjacent) name no Bangla string. Their sheets ship the
copy-free skeleton frame; the empty/error copy is listed for the client rather
than invented.

### PRD defects surfaced by the audit (for the client)

These are contradictions **inside the PRD**, not design choices:

1. **`student_no` (L3022) is undefinable.** §3.6 says `student.id` is
   "internal only, never displayed" and that students are identified by Bangla
   title + class; it defines display formats for family/subscription/payment/
   attempt/case and **none for a student**. The students table therefore leads
   with name + class + parent email and does **not** invent a student number.
2. **Difficulty tier range.** L3382 (admin form) says `1-3`, Adopted S4 says
   "3 tiers", but the schema's `difficulty_tier` CHECK is `BETWEEN 1 AND 5`
   (L4416). The design follows the form spec (1-3); the DDL is a superset.
3. Audit has no Actions column in its Display Fields table, but CONTRACT.md §3
   requires `row-actions` on every listing. Kept a read-only menu (View / Copy).
4. **`admin-standards.md` is referenced but was never delivered.** L2971 makes
   loading/empty/error states for all 12 admin pages uniform "per
   admin-standards.md"; the file is not part of the PRD. Sheets ship the
   copy-free loading skeleton and leave admin empty/error copy to the client.

## Next

1. ~~audit~~ — axes 1, 2, 3, 4, 6, 7 closed (see `AUDIT_AXES_3_4_7.md`);
   axis 0 (design quality) runs before the client sees the variations,
   axis 5 (pre-dev gate) runs right before development, after D2
2. **vary** — 5 concepts on the hero subset only (never × all screens)
3. **preview** → `picker.html`, record `selected_reference` here, **STOP — client gate**
