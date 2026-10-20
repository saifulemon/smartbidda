# FEATURE_CONTRACT.md — smartbidda (D1 · vary, step 2)

> The **content contract** for the five concepts. The base markup is NOT frozen under
> `vary` (each concept re-lays-out its screens), so this replaces that guarantee:
> every screen the concepts re-draw has a spec to stay inside.
>
> **Rule 1 — derived, not recalled.** Every line below was transcribed from the base
> HTML and the PRD, and is grep-traceable to one of them. Nothing here is a design.
> **Rule 2 — parity is verified mechanically.** The DENY/REQUIRED lists at the bottom
> are the executable form of this contract; run them against every concept screen.

**Scope — the 6 hero screens** (`VARY_REPORT.md` step 1):

| Screen | PRD route | Base file |
|---|---|---|
| 01-home | `/` (PRD L1178) | `base/frontend/01-home.html` |
| 06-chapter-list | `/learn/:classNo/:subjectSlug` (L1410) | `base/frontend/06-chapter-list.html` |
| 08-quiz | `/quiz/:sessionId` (L1564) | `base/frontend/08-quiz.html` |
| 14-leaderboard | `/leaderboard` (L2038) | `base/frontend/14-leaderboard.html` |
| 18-parent-dashboard | `/parent` (L2333) | `base/frontend/18-parent-dashboard.html` |
| 02-students | `/admin/students` (L3014) | `base/frontend-admin-dashboard/02-students.html` |

**Source tags:** `base <file>` = the module exists in the base; `PRD L<line>` = the PRD
names it; `PRD-pending` = base-carried, PRD-untraceable, already recorded as a PRD
defect (audit `AUDIT_AXES_3_4_7.md` §"Recorded as PRD defects" #7) — **allowed to
appear**, but a concept may not build new weight on it.

---

## 01-home · `/`

**Required modules** (a concept that drops one has failed the contract):

| # | Module | Source |
|---|---|---|
| 1 | Greeting header — `আসসালামু আলাইকুম, {name}` + avatar | PRD L1185 |
| 2 | Continue-lesson card — current chapter title + progress bar, largest tile | PRD L1186 · base |
| 3 | Today's task strip — up to **3** pending items (retake / exam / lesson), tap navigates | PRD L1187 · base `home-task-*` |
| 4 | Screen-time indicator — `{used}/{limit} মিনিট` + remaining bar | PRD L1188 · base `২৪/৬০ মিনিট` |
| 5 | Points + rank badge — `{points} পয়েন্ট · #{rank}`, taps to `/leaderboard` | PRD L1189 · base `১,২৪০ পয়েন্ট · #৪` |
| 6 | Voice prompt control — auto-played route VO + mute toggle (`কণ্ঠস্বর চালু`) | PRD L1190 · base `home-voice-toggle` |
| 7 | Nudge surface — parent-sent one-way prompt shown on the child's device | PRD L219/L640 · base `মায়ের বার্তা` (PRD-pending string) |
| 8 | Subject shortcuts — গণিত / বাংলা / বিজ্ঞান / ইংরেজি + `সব দেখুন` | base `home-subject-*` (PRD-pending) |

**Controls / CTA verbs:** `পড়া চালিয়ে যান` · `সব দেখুন` · task-row taps · voice toggle.
**Data that must stay as-is** (coincidence anchors, verified across pages): screen time
`২৪/৬০ মিনিট` + `আরও ৩৬ মিনিট বাকি` · points/rank `১,২৪০ পয়েন্ট · #৪` · child `রাফিদহাসান` ·
task strip = retake + exam + lesson.

**Negative space (must NOT appear):**
- No **search** field — not in the PRD home table; browse lives at `/learn`.
- No **leaderboard widget/list** — the points badge links out; the list is 14's job.
- No **overflow chip** (`আরও ২ টি`) — the strip caps at 3 pending items (audit #59).
- No **streak counter** presented as spec'd data — `ধারাবাহিকতা`/`আজকের লক্ষ্য` are
  PRD-pending; a concept may show them only as the base does, never as a new hero metric.
- No **download/offline** affordance anywhere (PRD `📌 Adopted: O3`).

---

## 06-chapter-list · `/learn/:classNo/:subjectSlug`

**Required modules:**

| # | Module | Source |
|---|---|---|
| 1 | Subject header — title (`গণিত`) + progress ring | PRD L1417 · base |
| 2 | Chapter list — ordered rows: number, title, state icon, mastery % | PRD L1418 · base `chapter-row` ×9 |
| 3 | Continue button `চালিয়ে যাও` — sits on the **first available** chapter | PRD L1419 · base `chapter-continue` |
| 4 | State icons — ✓ completed / ▶ available / 🔒 locked, locked rows greyed | PRD L1420 |
| 5 | Retake status on a chapter — `রিটেক প্রয়োজন` routes to `/retake-class` | base rows + PRD `/retake-class` route |

**Controls / CTA verbs:** `চালিয়ে যাও` · row tap (→ lesson) · back (→ `/learn`).
**Data that must stay as-is:** subject `গণিত` with the chapter counts the base uses
(01/05/06/19 agree; 122 chapters total across 10 subjects); the "continue" chapter is
the same one 01-home's continue card names.

**Negative space (must NOT appear):**
- No **search/filter input** — those live at `/learn` (subject/class filter), not here.
- No **video/PDF player** on a chapter row — media is 07-lesson's job.
- No **download/offline** button (O3).
- No **pagination** controls on the row list.

---

## 08-quiz · `/quiz/:sessionId`

**Required modules:**

| # | Module | Source |
|---|---|---|
| 1 | Question text + image hint (fraction visual) | PRD L1572 · base |
| 2 | Answer options — **exactly 4** tappable tiles, one selectable state | PRD L1573 · base `quiz-option` ×4 |
| 3 | Voice control `শুনুন` — question read aloud (Bangla VO) | PRD L1574 · base `quiz-voice-play` |
| 4 | Timer — `৪৮ সেকেন্ড বাকি`, **Class 3-5 only** (fixture is Class 4) | PRD L1575 (timer defined; audit #8 retracted the earlier "no timer") |
| 5 | Progress dots — position within the quiz (e.g. 4 of 20) | PRD L1571 · base |

**Controls / CTA verbs:** option tap (auto-advance to next question) · voice play · back.
**Data that must stay as-is:** the fraction question and its four options; the countdown
`৪৮ সেকেন্ড বাকি`; pass threshold 60 % (C3) governs the result screens, not this one.

**Negative space (must NOT appear):**
- No **difficulty badge** (সহজ/মাঝারি/কঠিন) — removed by audit; difficulty is admin data.
- No **per-question explanation** text — the PRD gives none; feedback is at result time.
- No **submit button** per question — the flow auto-advances on selection.
- No **skip** control and no **free-text/numeric answer** input — MCQ only.
- No **timer bar for Class 1-2** — the timer is scoped to Class 3-5.

---

## 14-leaderboard · `/leaderboard`

**Required modules:**

| # | Module | Source |
|---|---|---|
| 1 | Class chips — ১-৫, current class selected | PRD L2045 |
| 2 | Podium — top 3 with display names | PRD L2046 |
| 3 | List rows — rank, avatar, **display name + class** (never a real name), points | PRD L2047 · C7 |
| 4 | My-rank bar — sticky bottom `#{rank} · {points}` | PRD L2048 · base |
| 5 | Scope line — all-time, points-ordered (`পয়েন্ট অনুযায়ী · সব সময়`) | base (period claim removed by batch D) |
| 6 | More rows affordance — `আরও দেখুন` past the first page | base `lb-more` |

**Controls / CTA verbs:** class chip tap (refetch) · row tap (**no-op**, privacy) ·
my-rank tap (scroll to my row) · `আরও দেখুন`.
**Data that must stay as-is:** my row `#৪ · ১,২৪০ পয়েন্ট`; display names are pseudonyms
with class (`রাফি · ৪শ্রেণি`); opt-out state is per-child and set on 24.

**Negative space (must NOT appear):**
- No **opt-out notice** (`তুমি লিডারবোর্ডে দেখাচ্ছো না`) on the route page — it is a
  mutually-exclusive state and lives in `14-leaderboard.states.html`.
- No **period selector** (`এই সপ্তাহ`/`এই মাস`) — the PRD defines no period; DV-4/5 are
  all-time. The scope line is a label, not a filter.
- No **profile pages / chat / report / add-friend** — tapping a row is a deliberate no-op.
- No **real names, photos or school names** on any row.

---

## 18-parent-dashboard · `/parent`

**Required modules:**

| # | Module | Source |
|---|---|---|
| 1 | Child switcher — avatar chips per linked child (রাফিদ / মাহিন) + `যোগ করুন` | PRD L2340 · base `pd-switch-*` |
| 2 | Today's usage card — `{used}/{limit} মিনিট` bar (hidden when unlimited) | PRD L2341 · base `২৪/৬০ মিনিট` |
| 3 | Subject score grid — per-subject latest %, taps → `/parent/progress` | PRD L2342 · base `বিষয়ভিত্তিক নম্বর` |
| 4 | Weak-topic alert card — Bangla topic names + retake count (hidden when none) | PRD L2343 |
| 5 | Forecast card — `প্রাক্কলন: মাঝারি` + revision chapters, taps → analytics | PRD L2344 · base |
| 6 | Nudge button `মনে করিয়ে দাও` — spinner, disabled >5/day, toast on delivery | PRD L2345 |
| 7 | Recent alerts strip — `সাম্প্রতিক সতর্কতা` + `সব দেখুন` | base `pd-alerts-*` + PRD `/parent/alerts` |
| 8 | Quick actions — অগ্রগতি / বিশ্লেষণ / সাবস্ক্রিপশন | base `pd-action-*` + parent nav map L1004 |

**Controls / CTA verbs:** `মনে করিয়ে দাও` · `সব দেখুন` ×2 · `স্ক্রিন টাইম নিয়ন্ত্রণ` ·
`বিশ্লেষণ দেখুন` · child switch · `যোগ করুন`.
**Data that must stay as-is:** `রাফিদ` selected, `মাহিন` second; screen time `২৪/৬০ মিনিট`;
forecast band `মাঝারি`; every query is family-scoped (no other family's data, ever).

**Negative space (must NOT appear):**
- No **free-text nudge composer** — the message is chosen from presets (PRD L2348 note).
- No **email/password fields** — parent auth is `/parent/login` + PIN (audit removed them).
- No **completion card** (removed by audit wave C).
- No **chat / comments / two-way messaging** with the child — nudge is one-way (PRD L219).
- No **cross-family data** — no global rankings, no other parents' children.

---

## 02-students · `/admin/students`

**Required modules (the admin-listing contract, CONTRACT.md §3 + PRD L3018-3042):**

| # | Module | Source |
|---|---|---|
| 1 | DataTable — sortable headers + the PRD column set (name+avatar, class, parent, status badge, points, today usage, last active) | PRD L3018-3027 |
| 2 | Search — matches display name + parent email | PRD L3036 · base `students-search` |
| 3 | Class filter + removable filter chip | PRD L3030 · base `students-filter-class` |
| 4 | Row actions menu — View / Edit / Suspend | PRD L3028 · CONTRACT §3 · base `students-menu-*` |
| 5 | Row select + select-all + bulk bar (count, action, delete) | CONTRACT §3 · base `students-bulk-*` |
| 6 | Create flow — `নতুন শিক্ষার্থী` opens a modal with name / class / avatar / 4-digit PIN / parent | base `students-modal` + `students-f-*` |
| 7 | Result count + pagination (prev / next / range) | CONTRACT §3 · base `students-pagination` |
| 8 | Export `রপ্তানি` (CSV) | base `students-export` |

**Controls / CTA verbs:** `নতুন শিক্ষার্থী` · `রপ্তানি` · row menu View/Edit/Suspend ·
bulk delete (behind confirm) · sort toggles · filter chip remove.
**Data that must stay as-is:** readable identifiers only (`SB-FAM-…`), never UUIDs;
status badges use the PRD enum labels `সক্রিয়`/`স্থগিত`/`তুলে নেওয়া`; masked sensitive
fields stay masked; the page is desktop-first (1440) but must not break at 390.

**Negative space (must NOT appear):**
- No **Status dropdown or Date Range picker** in the filter row — the base ships search +
  class filter only; PRD names two more filters, which is a **recorded delta for D2**
  (design may add them there, a concept may not invent them here).
- No **PIN reveal / avatar editing** in a row — PIN is set only at creation, then masked.
- No **inline cell editing** — edits happen in the modal (single writer, per §8 concurrency).
- No **delete button per row** — student deletion is a suspend/withdraw workflow, not a
  destructive row action (row menu is View / Edit / Suspend).

---

## Parity sweep (the contract's executable form)

Run before `preview`. DENY expects **0 hits** in every concept screen; REQUIRED expects
**≥1 hit** in the matching screen of every concept.

```sh
# invention sweep — nothing here may appear in any concept hero screen
DENY='ডাউনলোড|অফলাইন|এই সপ্তাহ|গুগল দিয়ে|কমেন্ট|চ্যাট|সহজ \| মাঝারি|কঠিন \| সহজ|লিডারবোর্ডে দেখাচ্ছো না|আরও ২ টি|পাসওয়ার্ড'
grep -rlnE "$DENY" concepts/*/0*.html concepts/*/1*.html concepts/*/2*.html
# → expect no output

# drop sweep — required modules that MUST survive every re-layout
for d in concepts/*/; do
  grep -c 'পয়েন্ট'        "$d/01-home.html"    # ≥1  points/rank
  grep -c 'বাকি'           "$d/01-home.html"    # ≥1  screen-time remaining
  grep -c 'চালিয়ে যাও'     "$d/06-chapter-list.html"  # ≥1  continue CTA
  grep -c 'বাকি'           "$d/08-quiz.html"    # ≥1  timer
  grep -c 'শুনুন'          "$d/08-quiz.html"    # ≥1  voice control
  grep -c 'পয়েন্ট'        "$d/14-leaderboard.html"   # ≥1  row points
  grep -c 'মনে করিয়ে দাও'  "$d/18-parent-dashboard.html"  # ≥1  nudge
  grep -c 'প্রাক্কলন'      "$d/18-parent-dashboard.html"  # ≥1  forecast
  grep -c 'row-actions\|কার্যক্রম' "$d/02-students.html"   # ≥1  row actions
done
```

Grow `DENY` and `REQUIRED` every time a regression is found — each entry doubles as a
regression test for the next run.

