# Axis 3 / 4 / 7 audit — action list

Source: full PRD-vs-design sweep run 2026-10-17. Severity:
**blocker** = contradicts the PRD or itself · **major** = a PRD-named component/string/
count is absent, so a developer must invent it · **minor** = polish.

Every claim below was re-verified against the PRD line cited before being recorded.
Legend: `✅` applied · `📦` recorded as a PRD defect (not a design change) · `⬜` still open.

---

## Applied

| # | Sev | Where | PRD | Change |
|---|-----|-------|-----|--------|
| 2 | blocker | `03-signup` | 1114 | Submit `অ্যাকাউন্ট তৈরি করুন` → **`অ্যাকাউন্ট বানাও`** |
| 17 | blocker | `gen/p1` 09 | 1654 | Message `চমৎকার!` → **`দারুণ করেছ!`** |
| 18 | blocker | `gen/p1` 09 | 1656 | CTA `পরের পাঠে যান` → **`পরের পড়ায় যাও`** |
| 27 | blocker | `gen/p1` 12 | 1894 | Submit `পরীক্ষা জমা দিন` → **`জমা দাও`** |
| 40 | blocker | `gen/p2` 17 | 2272 | Submit `প্রবেশ করুন` → **`প্যারেন্ট মোডে ঢোকো`** |
| 48 | blocker | `gen/p3` 21 | 2573 | Button `১৫ মিনিট বাড়ান` → **`১৫ মিনিট বাড়াও`** |
| 54 | blocker | `gen/p3` 24 | 2814 | `সন্তান যোগ করুন` → **`সন্তান যোগ করো`** |
| F1 | blocker | `gen/p3` 22 | — | Exam alert said `১৭–২৩ অক্টোবর`; 11 + admin 08 both say `১০–১৬ অক্টোবর` → **aligned** |
| F2 | blocker | `gen/p3` 22 | 1654/1824 | 18/11/13 publish the result but alerts had no `ফলাফল` row → **row recategorised to ফলাফল** |
| F3 | blocker | `gen/p2` 19 | — | `৪৪ টি শেষ` + `36%` → **`৪৩ টি` + `৩৫%`** (05's ten tiles sum to 43) |
| F5 | blocker | `gen/p3` 23 | — | Second invoice was `SB-PAY-20260910-3921`, owned by `SB-FAM-20260815-0392` (নাসরিন) → **row removed** |
| F5b | blocker | `gen/p3` 23 | 256 | Invoice badge `পরিশোধিত` (in no enum) → **`সফল`** |
| F6 | blocker | `gen/admin` 12 | 259–261 | Change `পরিশোধিত →পেমেন্ট সমস্যা` (neither value exists) → **`সক্রিয় → মেয়াদোত্তীর্ণ`** |
| F7 | blocker | `gen/admin` 10 | 260 | Badge `মেয়াদ শেষ` → **`মেয়াদোত্তীর্ণ`** |
| 6/A1 | blocker | `05-subject-list` | 1341 | Tile caption `১৮টি অধ্যায় · ৩টি শেষ` → **`৩ / ১৮ শেষ`** (all 10) |
| 9 | major | `06-chapter-list` | 1425 | Invented search box removed — page declares **no inputs** |
| 25 | blocker | `gen/p1` 11 | 1819 | Invented filter chips `সব/সাময়িক/অর্ধবার্ষিক/বার্ষিক` removed — **no inputs** |
| 3 | major | `03-signup` | 1109–1113, 990 | Invented child-profile section removed — child records are created at `/onboarding` |
| 59 | minor | `01-home` | 1188 | `আরও ২ টি` overflow chip removed — the strip caps at **3 pending items** |
| 50 | blocker | `gen/p3` 22 | 2660, 946–955 | Invented prefs block removed — `/parent/alerts` has no prefs; §2.5 prefs live on 24 |
| A5 | minor | `06-chapter-list` | — | Second (in-body) back link removed; every other sub-screen has only the appbar back |
| A7 | blocker | `gen/p2` 19 | — | `বাক্য গঠন` filed as `বাংলা · ১ বার ভুল` while 20/22/admin all say `ইংরেজি · ২ বার ভুল` → **aligned** |

---

## Wave C applied — structural blockers & majors

| # | Sev | Page | PRD | Change |
|---|-----|------|-----|--------|
| 1 | blocker | `02-login` | 1030–1034, 1053–1057 | **Rebuilt.** Adult email+password+select+text-PIN replaced by child selector cards (avatar + name, selected ring + scale), 4-dot PIN pad, large Bangla numeral keypad (০–৯ + backspace), voice-prompt toggle, `প্যারেন্ট হিসেবে লগ ইন` link → 17. No email field, no submit button (auto-submit on the 4th digit, stated in the note line). |
| 12/13 | blocker/major | `gen/p1` 07 | 1492, 1496 | Added the **PDF viewer card** (thumb + `পড়ো`); CTA relabelled `পড়া শেষ করে কুইজ দিন` → **`কুইজ শুরু করো`** and rendered in its *disabled* state at 65 % watched with the 95 % threshold spelled out. |
| 14/16 | blocker/major | `gen/p1` 08 | 1574, 1575 | Replaced the false `চতুর্থ শ্রেণির জন্য সময়সীমা নেই` with a **live 60 s per-question timer** (Class 4 is in 3–5), and the percent bar with **10 progress dots** (answered filled, current ringed). |
| 15 | blocker | `gen/p1` 08 | 1577, 1596 | `আগের/পরের প্রশ্ন` buttons removed; replaced by an auto-advance/auto-submit note (400 ms, auto-submit after last answer). |
| 17/18 | — | `gen/p1` 09 | 1654–1656 | Strings fixed earlier; **+ reward burst `+২৫পয়েন্ট`**, **+ voice prompt** added. |
| 19 | blocker | `gen/p1` 09 | 1657 | **Retake link removed** — hidden on pass. 10 is now reached from 13's weak-topic list. |
| 20/21 | blocker/major | `gen/p1` 10 | 1729–1735, 1756, AL-8 | Page rebuilt to the component table: status `চেষ্টা শেষ` → **`চলছে`** (`IN_PROGRESS`), "attempt cap" card → PRD's **progress note `১ / ২ রিটেক শেষ`**, **+ Remedial PDF card + `পড়ো`**, **+ Understanding check (৩ টি প্রশ্ন)**, **+ disabled Complete button** (the AL-8 trigger), **+ disabled `রি-এক্সাম`**. Invented `শিক্ষককে জানান` / `পড়া আবার দেখুন` actions dropped (notify-teacher belongs to the empty state, L1737). |
| 22 | major | `gen/p1` 11 | 1811, 1815, 1854 | **3rd exam card** (বার্ষিক, আসন্ন) added; invented results-empty section removed. |
| 23 | blocker | `gen/p1` 11 | 1812 | State badge `শেষ` → **`উত্তীর্ণ`** (student enum; `শেষ` is the admin enum at L3418). |
| 24 | major | `gen/p1` 11 | 1813–1815 | **`শুরু করো`** greyed on both upcoming cards; **score preview** `সর্বশেষ ফলাফল ৬৯%` added. |
| 28 | major | `gen/p1` 12 | 1891–1893, 1930 | **Whole-exam timer `৫৭:৩২`** (mm:ss) and **`ফ্ল্যাগ`** toggle added; the flagged navigator chip (২) now carries the amber state. (Navigator grid already existed — the earlier claim that nav was linear was wrong.) |
| F4 | blocker | `gen/p1` 12 | — | `প্রশ্ন ২ / ২৫` → **`২ / ৫০`**, navigator `+২০` → **`+৪৫`**, progress 8 % → 4 % — now matching admin 08's row for the same exam. |
| 29/31 | blocker/major | `gen/p1` 13 | 1972–1973, 2011 | Subject bars → **topic breakdown** (5 topics, accuracy **ASC**, warnings below 60 %) **+ weak-topic list** (`ভগ্নাংশের তুলনা`, `বাক্য গঠন`), both `রিটেক প্রয়োজন`, with a `রিটেক ক্লাসে যান` route to 10. |
| 30 | blocker | `gen/p1` 13 | 1971 | Before/after chart was comparing *quiz avg vs exam*; now a **single bar** with an explicit note that no re-exam exists (L1973). |
| 32/33 | blocker/major | `gen/p1` 13 | 1974, 1992 | **`পরের পড়ায় যাও`** (pass CTA) replaces the invented remedial + `আবার পরীক্ষা দিন`; **`প্রিন্ট`** added. |
| 10 | major | `06-chapter-list` | 1472 | **`রিটেক প্রয়োজন`** badge on ch-4, and the row now routes to `/retake/:id` (10). |
| 45/46 | blocker/major | `gen/p3` 20 | 2497–2498, 2515–2517 | Chart was **daily screen-time minutes** → now **daily quiz-score trend, 14 days** with real bars; **+ 7/14/30-day period filter**, **+ `নির্ভরযোগ্যতা ৮৬%`**, **+ "কেন এই প্রাক্কলন" inputs card**. |
| 47/49 | blocker/major | `gen/p3` 21 | 2568–2574, 2610 | `গত ৩ দিন` → **7-day weekly chart** (`week[]`, date ASC) carrying the exact seven values 20's chart used to hold, so 20/21 still agree; invented **`এখনই বন্ধ করুন`** button removed and replaced by the PRD **Blocked status** component that also quotes the literal `সন্তান এখন ব্লক করা আছে`. |
| 51/52/53 | major/blocker | `gen/p3` 23 | 2732–2735 | **+ Plan options** (মাসিক ৳৩৯৯ selected / বার্ষিক ৳৩,৪৯৯ · ২৭ % সাশ্রয়), **+ `কার্ড`** method (enum is `bkash\|nagad\|upay\|card`), footnote rewritten so it no longer denies card payments, বিকাশ marked selected, **+ `পেমেন্ট করুন (৳৩৯৯)`**. |
| 38 | major | `gen/p2` 16 | 2193, 2214 | Language `<select>` → **`.segmented` `বাংলা` / `English`**, the control added once to `components.css` (2 pages use it). |
| 36 | major | `gen/p2` 15 | 2123, 2156 | **Recent earnings** list added (source + points + date), two `+২৫` quiz entries. |

### Decisions taken (not oversights)

- **Leaderboard opt-out notice (#35) is deferred to the `*.states.html` sheet.** PRD L2047 gives the component the default string `তুমি লিডারবোর্ডে দেখাচ্ছো না` and L2105 edge case 5 a second string `লিডারবোর্ডে তোমার নাম দেখানো হচ্ছে না`, but 14 renders রাফিদ **in the public list** (rank 4, `is-me`, matching `১,২৪০পয়েন্ট · #৪` on 01/15). Showing the notice next to a public row contradicts itself, so both strings belong to the opted-out state sheet. C7's "opt-out default ON" needs the PRD to say which of the two readings it means — **new open question**.
- **`২৭% সাশ্রয়` / `৳৩,৪৯৯` annual price is fixture data** — Open Question #2 (Family/Crash Pack pricing) is still unanswered. Monthly ৳৳৩৯৯ comes from the existing invoice; the annual figure is derived from it (৳৳৪,৭৮৮ → ৳৳৩,৪৯৯).
- **`গত ৩০ দিন` (page header, forecast window) vs `গত ১৪ দিন` (chart window) are deliberately different** — PRD L2497 fixes the trend at 14 days while L2518's inputs are 30-day.

---

## Open — structural (a developer would have to invent these)

### Student app
| # | Sev | Page | PRD | Gap |
|---|-----|------|-----|-----|
| 1 | blocker | `02-login` | 1030–1033, 1055, 987 | Rebuilt as an **adult login** (email + child `<select>` + text PIN). PRD wants child **selector cards**, a **4-digit Bangla keypad with 4 dots** (auto-submit on the 4th digit), the **`প্যারেন্ট হিসেবে লগ ইন`** link and a **voice prompt** — no email, one endpoint (`POST /api/auth/student-login`). |
| 12 | blocker | `gen/p1` 07 | 1494 | Quiz CTA is live at `৬৫%` watched; PRD hides it until **≥ 95%**. |
| 13 | major | `gen/p1` 07 | 1492, 1513 | **PDF viewer card** (`থাম্বনেইল +পড়ো`, error `পিডিএফ খোলা যায়নি`) absent — `পড়ো` occurs nowhere. |
| 14 | blocker | `gen/p1` 08 | 1575 | Page asserts `চতুর্থ শ্রেণির জন্য সময়সীমা নেই`; PRD defines **`Timer (Class 3-5)` — 60 s per question, zero → auto-submit**. |
| 15 | blocker | `gen/p1` 08 | 1577, 1596 | `আগের/পরের প্রশ্ন` buttons contradict **tap option → auto-advance 400 ms** and **auto-submit after last answer**. |
| 16 | major | `gen/p1` 08 | 1574, 1615 | The 10 **progress dots** (current filled, answered ✓) are missing — a percent bar was substituted. |
| 19 | blocker | `gen/p1` 09 | 1656–1657, 556 | Pass result still shows a live **retake** button; PRD hides the retake card on pass. |
| 20 | blocker | `gen/p1` 10 | 1734, 1756, 1799, AL-8 | No **Complete button**, so `POST /api/remedial/:id/complete` (AL-8) has no UI trigger; success string `রিটেক শেষ হয়েছে!` never appears. |
| 21 | major | `gen/p1` 10 | 1732–1735, 1770 | Missing remedial **PDF card + `পড়ো`**, **Understanding check** (3–5 Qs), progress note `১/২ রিটেক শেষ`; `চেষ্টার সংখ্যা ২ /২` relabels PRD's `position/total`. |
| 22 | major | `gen/p1` 11 | 1811, 1851 | **2 exam cards**, PRD specifies **3** (১ম সাময়িক / অর্ধবার্ষিক / বার্ষিক). |
| 23 | blocker | `gen/p1` 11 | 1812 | State badge `শেষ` is outside the student enum `আসন্ন/চলছে/উত্তীর্ণ/অনুত্তীর্ণ/রিটেকপ্রয়োজন` (`শেষ` is the **admin** enum, 3418). |
| 24 | major | `gen/p1` 11 | 1813–1815 | No **`শুরু করো`**, no **`রি-এক্সাম`**, no **score preview**. |
| 26 | major | `gen/p1` 11 | 1824 | Empty-section copy ≠ PRD's `এখনো কোনো পরীক্ষা দেওয়া হয়নি।` |
| 28 | major | `gen/p1` 12 | 1891–1893, 1916 | No whole-exam **timer (mm:ss)**, no **`ফ্ল্যাগ`** toggle; linear nav instead of the numbered **navigator**. |
| 29 | blocker | `gen/p1` 13 | 1972, 1990, 2008–2010 | `বিষয়ভিত্তিক` subject bars replace **Topic breakdown** (per-topic accuracy, sorted ASC, tap expands). |
| 30 | blocker | `gen/p1` 13 | 1971, DV-8 | Before/after chart compares quiz avg vs exam; PRD sources it from **first failed attempt vs re-exam** — single bar when no re-exam. |
| 31 | major | `gen/p1` 13 | 1973 | **Weak-topic list** absent. |
| 32 | major | `gen/p1` 13 | 1992, 2443 | **Print** action absent (also on 19). |
| 33 | blocker | `gen/p1` 13 | 1974, 1814 | Pass result offers `আবার পরীক্ষা দিন` + a remedial CTA; PRD pass CTA is **`পরের পড়ায় যাও`**, retake only on fail, `রি-এক্সাম` only in `RETAKE_COMPLETED`. |
| 10 | major | `06-chapter-list` | 1474 | **`রিটেকপ্রয়োজন`** badge appears nowhere in the design. |

### Rewards / settings
| # | Sev | Page | PRD | Gap |
|---|-----|------|-----|-----|
| 34 | blocker | `gen/p2` 14 | 2047, DV-4/5 | Subtitle `এই সপ্তাহ` but the endpoint carries **no period parameter** and DV ranks over all time. Needs one choice: label all-time, or spec a period. |
| 35 | major | `gen/p2` 14 | 2050, 2105, 614 | **Opt-out notice** `তুমি লিডারবোর্ডে দেখাচ্ছো না` absent. |
| 36 | major | `gen/p2` 15 | 2123, 2155 | **Recent earnings** list absent (fallback `এখনো কিছু নেই`). |
| 38 | major | `gen/p2` 16 | 2193, 2214 | Language is a `<select>`; PRD says **`বাংলা / English` segmented**. |
| 57 | major | `gen/p3` 24 | 2818, 2839 | No **Language** row and no remove-child confirm `সন্তান মুছে দেবেন?`. |
| 56 | major | `gen/p3` 24 | 2817 | One family-wide leaderboard switch; PRD wants **per-child** opt-out. |
| 55 | blocker | `gen/p3` 24 | 2814 | Cap copy `বেশি দরকার হলে অ্যাডমিনকে জানাতে হবে` — PRD says **disabled at 3 children**. |

### Parent mode
| # | Sev | Page | PRD | Gap |
|---|-----|------|-----|-----|
| 41 | major | `gen/p2` 17 | 2271, 2293 | Email fallback is a **link** to the *student* login; PRD wants an inline **`পিন মনে নেই?` expander**. |
| 42 | major | `gen/p2` 18 | 2343–2346, 2409 | Missing **Subject score grid**, **Forecast card**, **Nudge button `মনে করিয়ে দাও`**. |
| 43 | major | `gen/p2` 18 | DV-7 2940 | No **unread-notification count** on the `/parent` header. |
| 44 | major | `gen/p2` 19 | 2421–2425, 2441–2443 | Missing **Subject tabs**, **Chapter mastery list**, **Topic accuracy bars**, **Before/after chart**, **Timeline**, print. |
| 45 | blocker | `gen/p3` 20 | 2497, 2515 | Trend card is **daily screen-time minutes**; PRD wants **daily quiz-score trend, 14 days**, with tooltip. Different metric, source and window. |
| 46 | major | `gen/p3` 20 | 2498, 2517, 2530 | Missing **Why-this card**, **period filter 7/14/30**, and **confidence `নির্ভরযোগ্যতা …%`**. |
| 47 | blocker | `gen/p3` 21 | 2572, 2610 | Usage chart `গত ৩ দিন` (3 bars) vs PRD **7-day** `.week[]`. |
| 49 | major | `gen/p3` 21 | 2568–2574 | Invented **`এখনই বন্ধ করুন`** — no component, no action, no endpoint. |
| 51 | major | `gen/p3` 23 | 2732 | No **Plan options** `Monthly / Annual`. |
| 52 | blocker | `gen/p3` 23 | 2734 | Method picker missing **`উপায়`** and **`কার্ড`**, and the footnote *denies* card payments while PRD offers them via SSLCommerz. |
| 53 | major | `gen/p3` 23 | 2735 | No **`পেমেন্ট করুন (৳{n})`** pay button, no **`পেমেন্ট যাচাই হচ্ছে...`** verify state. |
| F8 | major | §3.6 pages | 2954–2960 | `SB-EXM-` / `SB-PAY-` / `SB-SUB-` never rendered on family-facing screens (only admin). |

### Mirror symmetry still open
| # | Sev | Pages | Fix |
|---|-----|-------|-----|
| A3 | major | 16 vs 24 | Language present on student settings, absent on parent settings (PRD 2818 requires it). |
| A4 | blocker | 02 vs 17 | Same PRD pattern rendered as keypad+dots on 17, `<select>`+text on 02. |
| A6 | minor | admin 01 vs 15/20/21 | Week strip starts `শনি` on admin, `রবি` on student/parent; today is শনিবার everywhere. |
| A8 | minor | 05 | Filter labelled `ক্লাস বা বিষয় দিয়ে ছাঁকুন` but only offers শ্রেণি options. |

---

## Recorded as PRD defects (not design changes)

1. **`student_no` (3022)** — no display format exists in §3.6. *(previously recorded)*
2. **Difficulty tier** — form says 1–3, DDL `BETWEEN 1 AND 5`. *(previously recorded)*
3. **Audit Actions column** absent from its Display Fields table but CONTRACT §3 requires `row-actions`. *(previously recorded)*
4. **L1383** `Pagination: N/A (5 subjects max per class)` — the fixture has **10** subjects totalling **122** chapters, and 19 + admin 01 reuse those totals (`610 = 5 × 122`). Either the note or the fixture must move; the note is a pagination assumption, not a product rule.
5. **L1378–1379 vs DV-10 (2943)** — `/learn` names `lessonCount`/`completedCount` while every counter in the design is **chapter**-based. PRD must name the unit.
6. **L976–979 / 990–1003 layout map** — design declares `StudentSubLayout` and `PinLayout`; PRD defines only `AuthLayout`/`StudentLayout`/`ParentLayout`/`AdminLayout`. Sanctioned by `getdesign.md` as "a chrome split, not a semantic one" → PRD needs the two extra names.
7. **Streak / daily-quest** (37, 60) — `ধারাবাহিকতা`, `আজকের লক্ষ্য` and `মায়ের বার্তা` have no component, endpoint, Action Ledger row or DV row anywhere in the PRD; only trace is the badge key `streak_7` (4258). Present on 01, 15, 18. Either spec them or remove them.
8. **L1576 vs the design** — *retracted*: an earlier note said "no quiz timer in the PRD". **L1575 does define `Timer (Class 3-5)`**; the design was wrong, not the PRD.

---

## Verified clean

Identifier date encodings (`SB-FAM`/`SB-PAY`/`SB-SUB`/`SB-CASE` all match their own
timestamps, UUIDs never shown) · screen time `২৪/৬০ মিনিট` + `আরও ৩৬ মিনিট বাকি` + 40 %
agreed on 01/18/21/admin 02 and matched 20's per-day bars · points/rank
`১,২৪০ পয়েন্ট · #৪` on 01/14/15/admin 02 · `শনিবার ·আজ` correct for 2026-10-17 ·
`১২–২০ ডিসেম্বর২০২৬ =৫৬ দিন পরে` · `গত ৩০ দিন` 17 Sep – 17 Oct · cycle `২২/৩০` ·
family identity (`রাফিদ হাসান`, `SB-FAM-20260902-1041`, `ফারহানা রহমান`, `২ /৩` children)
consistent across 16/18/24/admin 03 · admin aggregates (`১,২৪৮`, `৩৪ · ৯চলছে`,
`২৯১ · ৩পেমেন্ট সমস্যা`, `৬১০`) internally consistent · per-subject chapter numbers
agree across 01/05/06/19 and total 122 · student exam enum verified at L1812 vs admin
L3418 (both correct for their own page).

---

## Resolution log — waves B / C / D (2026-10-17)

Every row below was re-checked against the **rendered `base/` output** after
`gen/run.mjs`, not against memory. Current gate state: `contract · consistency ·
contrast · links · icons · listing · copy · viewport` all **PASS**, `surface` fails
only because D2 has not written `manifest.json` yet, `testid-coverage` **818/818**.

### ✅ Applied — every row of the Open tables above

| # | Sev | Where | What landed |
|---|-----|-------|-------------|
| 34 | blocker | `gen/p2` 14 | Subtitle `এই সপ্তাহ · পয়েন্ট অনুযায়ী` → **`পয়েন্ট অনুযায়ী · সব সময়`**. See "audit corrections" below — the PRD citation was wrong. |
| 35 | major | — | **Deferred to `14-leaderboard.states.html`** (see Decisions). |
| 36 | major | `gen/p2` 15 | **Recent earnings** list (`সাম্প্রতিক পয়েন্ট`, 2 × `+২৫`). Fallback `এখনো কিছু নেই` goes on the states sheet. |
| 38 | major | `gen/p2` 16 | Language is now `.segmented` **`বাংলা` / `English`**; `.segmented`/`.segment` added once to `components.css` (rule 8 — used on 16 and 24). |
| 41 | major | `gen/p2` 17 | The email fallback **linked to the student login** (02). Replaced by the inline **`পিন মনে নেই?`** expander (PRD L2269: collapsed / expanded) carrying the email + password fields. |
| 42 | major | `gen/p2` 18 | **Subject score grid** (গণিত ৭৮% · বাংলা ৭২% · ইংরেজি ৫৮% — the subject values 13 gave up when it moved to topic breakdown, avg ≈ the ৬৯% exam score), **Forecast card** (`প্রাক্কলন: মাঝারি` · ৬৮% + revision chapters → analytics), **Nudge `মনে করিয়ে দাও`**. |
| 43 | major | `gen/chrome` | **Unread `৩`** badge on the `/parent` appbar (DV-7 L2940). ParentLayout only; StudentLayout keeps the plain bell. |
| 44 | major | `gen/p2` 19 | **Subject tabs** (chips, গণিত selected) + **Chapter mastery list** (6 গণিত chapters, mastery %, state — titles/statuses reused verbatim from 06) + **Topic accuracy bars** (ASC, `কম প্রশ্ন` low-sample note) + **Before/after single bar** (`রি-এক্সাম দেওয়া হয়নি`) + **Timeline** (3 entries) + **Print**. The PRD-unlisted subject-completion card was removed — its `৩ / ১৮` etc. already live on 05. |
| 45 | blocker | `gen/p3` 20 | Trend is **daily quiz-score, 14 days**, with `৭/১৪/৩০ দিন` filter. |
| 46 | major | `gen/p3` 20 | **কেন এই প্রাক্কলন** card + period filter + **`নির্ভরযোগ্যতা ৮৬%`**. |
| 47 | blocker | `gen/p3` 21 | 3-row list → **7-day bar chart** (`.chart`), রবি…আজ = **32 / 48 / 56 / 38 / 60 / 48 / 24**, today 24 = the `২৪ / ৬০` used everywhere else; `week[]` date ASC ending today. Dead `.st-usage*` rules removed. |
| 49 | major | `gen/p3` 21 | Invented `এখনই বন্ধ করুন` gone; the Blocked card quotes PRD L2610 `সন্তান এখন ব্লক করা আছে`. |
| 51 | major | `gen/p3` 23 | **Plan options** (মাসিক ৳৩৯৯ selected / বার্ষিক ৳৩,৪৯৯ · `২৭% সাশ্রয়`) + **Crash packs**. |
| 52 | blocker | `gen/p3` 23 | Method picker = **বিকাশ · নগদ · আপায় · কার্ড** (PRD L2734 `bKash / Nagad / Upay / Card`, enum `bkash\|nagad\|upay\|card`), footnote no longer denies cards, SSLCommerz note kept. |
| 53 | major | `gen/p3` 23 | **`পেমেন্ট করুন (৳৩৯৯)`** pay button landed. The **`পেমেন্ট যাচাই হচ্ছে...`** verify state is deferred → `23-subscription.states.html` (it is an Active/redirect state; showing it beside an enabled pay button would contradict the default). |
| 55 | blocker | `gen/p3` 24 | Invented `বেশি দরকার হলে অ্যাডমিনকে জানাতে হবে` → **`২ / ৩ ব্যবহৃত · সর্বোচ্চ ৩ জন সন্তান — ৩ জন হলে যোগ করার বোতাম বন্ধ থাকে`** (PRD L2810 "Disabled at 3 children"). The disabled-at-3 *button* itself goes on the states sheet — the fixture family is at 2/3, so the live button is correctly enabled. |
| 56 | major | `gen/p3` 24 | One family-wide switch → **per-child opt-out switches** (L2817): রাফিদ `বন্ধ` (shown — 14 renders him, rank 4), মাহিন `চালু` (hidden — he appears on no leaderboard surface, verified). Section caption `ডিফল্টে নাম লুকানো থাকে`. |
| 57 | major | `gen/p3` 24 | **Language row** (`বাংলা` / `English`, byte-mirrors 16) + **remove control** per child (PRD `Avatar + name + class + remove`; the invented `ব্যবস্থাপনা` action and the extra `· পিন সেট করা আছে` caption are gone) + the confirm dialog **`সন্তান মুছে দেবেন?`** as hidden `.modal-sm` markup (same convention as admin's creation modal). |
| F8 | major | 13 · 23 · 24 · admin 12 | §3.6 now rendered where a person quotes it: `SB-EXM-20261016-0487` on the exam result, `SB-SUB-20260901-1041` on the subscription card, `SB-PAY-20260925-4181` on the invoice row (matches admin `su-1` exactly), `SB-FAM-20260902-1041` on the parent account row (mirrors 16). |
| A3 | major | `gen/p3` 24 | Language row present — mirror of 16 closed. |
| A4 | blocker | 02 vs 17 | **Already closed by the 02 rebuild** — 02 is child-selector + 4-dot Bangla keypad, 17 is 6-dot Bangla keypad. Two *different* PRD patterns (student PIN vs parent PIN), same interaction language. |
| A6 | minor | admin 01 | `গত ৭ দিন` ran শনি→শুক্র, i.e. it **skipped today**. Re-ordered to **রবি → আজ**, the same window 15 and 21 use. |
| A8 | minor | 05 | **Not reproducible** — see "audit corrections". |

### Fixes found while applying (not in the original list)

| Where | Fix |
|-------|-----|
| admin 08 ex-3 | Row `label` said `বার্ষিক পরীক্ষা — দ্বিতীয় শ্রেণি` while its own class cell (and student 11's third card) said `চতুর্থ` → label corrected. |
| admin 12 audit | `SB-SUB-202608-0177` has 6 digits before the dash; §3.6 says `YYYYMMNN-NNNN` → **`SB-SUB-20260801-0177`**. `SB-FAM`/`SB-PAY`/`SB-CASE` were already compliant. |
| `gen/p3` 23 | আপায় carried a `credit-card` icon; it is an MFS like বিকাশ/নগদ → `smartphone`. |

### Decisions taken

1. **#35 (opt-out notice) → `14-leaderboard.states.html`, not the base sheet.** PRD
   L2047 `তুমি লিডারবোর্ডে দেখাচ্ছো না` and edge-case-5 L2105
   `লিডারবোর্ডে তোমার নাম দেখানো হচ্ছে না` cannot both be live while 14 shows রাফিদ
   publicly (rank 4, `is-me`). C7's "opt-out default ON" is ambiguous → **open
   question for the client**; base sheet = opted-in state, states sheet = opted-out.
2. **#53 verify state → `23-subscription.states.html`.** Active/redirect state.
3. **#26 exam-list empty copy** (`এখনো কোনো পরীক্ষা দেওয়া হয়নি।`) **→ `11-exam-list.states.html`.**
   The base sheet has all 3 exams; an empty sheet cannot coexist with them.
4. **24's email/password change rows were removed.** Not in PRD L2810's component
   table, no input-validation row, no endpoint — the same test that killed the
   invented `এখনই বন্ধ করুন` button. The identity card stays (it mirrors 16's
   অ্যাকাউন্ট card) and now carries the family code.
5. **19's subject-completion card was replaced, not kept.** PRD L2421-2425 lists
   tabs / chapter mastery / topic accuracy / before-after / timeline; the removed
   numbers were 05's job anyway.

### Corrections to this audit's own claims

- **#34's citation is wrong.** `এই সপ্তাহ` appears **nowhere in the PRD** (grep: 0 hits).
  The subtitle was design-invented and then blamed on L2047. DV-4/5 sum points and rank
  over all time with no period parameter, so the invented *period claim* was the defect —
  removed, and the base sheet now states the semantics DV actually uses.
- **A8 is not a real gap.** `05`'s filter carries **both** optgroups — `শ্রেণি` (5) and
  `বিষয়` (4) — matching PRD `/learn`'s "Filter dropdown (Class / Subject)". The finding
  claimed it offered only class options.
