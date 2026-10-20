# smartbidda — Design Master Prompt (D1 generate)

> Project: smartbidda
> Mode: **self-generate** (local authoring) — chosen 2026-10-17
> PRD: `.claude-project/smartbidda/prd/smartbidda_PRD.md`
> Screens: 36 routes (24 app + 12 admin)
> **Platform:** responsive — `frontend/` is mobile-first (390), `frontend-admin-dashboard/` is desktop (1440)
> Status: generating

---

## REFERENCE_DNA

**Reference: Duolingo** — chosen for the product's core loop (lesson → quiz → points → badge → streak), which is the strongest structural match of any well-documented kids' learning product.

### Extracted (verified against duolingo.com, 2026-10-17)

| Facet | Extracted | Apply as |
|---|---|---|
| Display font | `feather` — heavy (700/900), geometric, **very rounded terminals** | `--font-display` |
| UI font | `duolingo-sans` — rounded grotesque, 400 + 700 | `--font-body` |
| Type token naming | `--text-body-size` / `-weight` / `-line-height` / `-letter-spacing`, with `-spacious` variants | maps to our `--t-<role>-*` roles |
| Primary | Feather Green `#58CC02`, pressed `#46A302` | `--c-primary` / `--c-primary-active` |
| Accent blue | Macaw `#1CB0F6` | progress, links, info |
| Semantic set | Cardinal `#FF4B4B` · Bee `#FFC800` · Fox `#FF9600` · Beetle `#CE82FF` · Whale `#00CD9C` | `--c-error` / `--c-warning` + reward accents |
| Ink scale | Eel `#4B4B4B` · Wolf `#777777` · Hare `#AFAFAF` | `--c-ink` / `--c-body` / `--c-muted` |
| Structure | Swan `#E5E5E5` hairline · Polar `#F7F7F7` surface-soft · Snow `#FFFFFF` canvas | `--c-hairline` / `--c-surface-soft` / `--c-canvas` |

### Design DNA to carry (not just recolor)

1. **Weight and roundness are the identity.** Buttons, cards and headings are heavy and rounded — this reads as "for children" without decoration. Never thin, never sharp.
2. **The chunky button.** A primary button is a pill with a *darker bottom edge* (`--c-primary-active` as a 4px bottom border), translating down 2–4px on `:active`. This press is the signature interaction.
3. **Progress is the hero element.** A thick rounded progress bar (Macaw blue on a Swan track) appears on lesson, quiz, exam and screen-time. It is structural, not decorative.
4. **Celebration is a first-class state.** Passing a quiz or earning a badge gets a full-bleed, saturated moment — not a toast. The PRD calls this load-bearing for motivation.
5. **Big targets.** Children aged 6–11 on low-cost phones. Every tap target ≥48px; question options are full-width rows, not chips.
6. **Saturation budget.** Green is the single action color. Blue = progress/info. Red = wrong/blocked only. Yellow = reward. Do not spread green across decoration.

### Contrast note (gate-enforced)

`#58CC02` against white text is only ~2.3:1 — it FAILS AA for `--c-on-primary` at body sizes. Duolingo gets away with it using large, heavy, dark-outlined labels. **We do not.** Use a darkened green for any surface carrying white text: `--c-primary: #43A302` (≈3.6:1 at large sizes) or push text to `--c-ink` on light-green fills. The `contrast-check` gate decides, not the reference.

---

## APP SPLIT

Two deployable frontends (per OUTPUT_RULES §0 — an app folder is a deployable, not a layout group):

| Folder | Audience | Routes | Shell |
|---|---|---|---|
| `frontend/` | children + parents | 24 | mobile-first (`.appbar` + `.tabbar`) |
| `frontend-admin-dashboard/` | admin / teacher | 12 | desktop (`.app-shell` + `.sidebar`) |

Auth screens live **inside** the app they gate — never a standalone `auth/` folder.

---

## LAYOUT ASSIGNMENT

| Layout | Routes | Chrome (byte-identical within group) |
|---|---|---|
| `AuthLayout` | `/auth/login`, `/auth/signup` | none — full-screen, no bars |
| `PinLayout` | `/parent/login` | none — full-screen PIN pad |
| `StudentLayout` | `/`, `/learn`, `/exams`, `/leaderboard`, `/rewards` | `.appbar` + `.tabbar` (5 tabs) |
| `StudentSubLayout` | `/onboarding`, subject list, chapter list, lesson, quiz, quiz result, retake, exam, exam result, settings | `.appbar` only (back + title), **no** tabbar |
| `ParentLayout` | `/parent`, progress, analytics, screen-time, alerts, subscription, settings | `.appbar` + `.tabbar` (5 tabs) |
| `AdminLayout` | all 12 `/admin/*` | `.sidebar` + `.app-topbar` |

> `StudentLayout` vs `StudentSubLayout` is a chrome split, not a semantic one: the 5 tabbed routes carry the bottom nav, the 9 sub-screens do not. One Layout cannot be correct for both (OUTPUT_RULES §2).

---

## CANONICAL CHROME — copy byte-identically

### Student tabbar — 5 tabs (StudentLayout only)

```
হোম (home) · পড়াশোনা (book-open) · পরীক্ষা (clipboard-check) · লিডারবোর্ড (trophy) · পুরস্কার (award)
```

### Parent tabbar — 5 tabs (ParentLayout only)

```
ড্যাশবোর্ড (layout-dashboard) · অগ্রগতি (trending-up) · স্ক্রিন টাইম (timer) · অ্যালার্ট (bell) · সেটিংস (settings)
```

### Admin sidebar — 12 items

```
ড্যাশবোর্ড (layout-dashboard) · শিক্ষার্থী (users) · অভিভাবক (users-round) · শিক্ষক (graduation-cap) ·
পাঠ্যক্রম (library) · কনটেন্ট (play-square) · প্রশ্নব্যাংক (help-circle) · পরীক্ষা (file-text) ·
রিমিডিয়াল (refresh-cw) · সাবস্ক্রিপশন (credit-card) · নোটিফিকেশন (mail) · অডিট লগ (scroll-text)
```

---

## LOCALE

Every user-visible string is **Bangla** (`lang="bn-BD"` on `<html>`). This is a hard PRD rule (§3.2 Locale). No English labels, no mixed-language buttons. Route filenames stay English; screen copy does not.

Class range is **1–5**, NCTB curriculum. Subject names: গণিত · বাংলা · ইংরেজি · বিজ্ঞান · সমাজ ও নাগরিকতা · ধর্ম ও নৈতিক শিক্ষা · চারু ও কারুকলা · শারীরিক শিক্ষা · স্বাস্থ্য ও সুরক্ষা · তথ্য ও যোগাযোগ প্রযুক্তি

---

## SCREEN MAP

### frontend/ — 24 routes

| File | Route | Layout | Page |
|---|---|---|---|
| `01-home.html` | `/` | StudentLayout | আজকের পাঠ — today's class, progress ring, screen-time indicator, nudge stream |
| `02-login.html` | `/auth/login` | AuthLayout | email + password (parent/teacher/admin) **and** student PIN entry |
| `03-signup.html` | `/auth/signup` | AuthLayout | parent account creation + terms consent + add first child |
| `04-onboarding.html` | `/onboarding` | StudentSubLayout | pick class + avatar (8 presets) |
| `05-subject-list.html` | `/learn` | StudentLayout | NCTB subjects for the child's class, with progress per subject |
| `06-chapter-list.html` | `/learn/:classNo/:subjectSlug` | StudentSubLayout | chapters, ordered, completion + weakness markers |
| `07-lesson.html` | `/learn/:classNo/:subjectSlug/:chapterSlug` | StudentSubLayout | video player + PDF + Bangla VO, progress bar |
| `08-quiz.html` | `/quiz/:sessionId` | StudentSubLayout | 10 adaptive MCQ/TF, large option rows, no timer (Class 1–2) |
| `09-quiz-result.html` | `/quiz/:sessionId/result` | StudentSubLayout | score, pass/fail vs 60%, celebration or retake CTA |
| `10-retake-class.html` | `/retake/:retakeId` | StudentSubLayout | remedial content assigned for the weakness, cap 2 |
| `11-exam-list.html` | `/exams` | StudentLayout | ১ম সাময়িক / অর্ধবার্ষিক / বার্ষিক, window open/closed |
| `12-exam.html` | `/exams/:examId` | StudentSubLayout | exam taking, question nav, autosave |
| `13-exam-result.html` | `/exams/:examId/result` | StudentSubLayout | score, before/after, weakness breakdown, re-exam or remedial |
| `14-leaderboard.html` | `/leaderboard` | StudentLayout | national, top 100, opt-out default, display name + class only |
| `15-rewards.html` | `/rewards` | StudentLayout | points, badges, streak |
| `16-settings.html` | `/settings` | StudentSubLayout | language, voice on/off |
| `17-parent-login.html` | `/parent/login` | PinLayout | 6-digit parent PIN |
| `18-parent-dashboard.html` | `/parent` | ParentLayout | per-child summary cards |
| `19-parent-progress.html` | `/parent/progress` | ParentLayout | subject/chapter progress, weakness list |
| `20-parent-analytics.html` | `/parent/analytics` | ParentLayout | AI forecast, weakness→remedial recommendation |
| `21-screen-time.html` | `/parent/screen-time` | ParentLayout | limit slider, usage bars, extension grant, block/unblock |
| `22-alerts.html` | `/parent/alerts` | ParentLayout | notification history, opt-out toggles |
| `23-subscription.html` | `/parent/subscription` | ParentLayout | plan, MFS checkout (bKash/Nagad/Upay), invoices |
| `24-parent-settings.html` | `/parent/settings` | ParentLayout | linked children (max 3), account, second guardian N/A |

### frontend-admin-dashboard/ — 12 routes

| File | Route | Managed entity | Default sort | Listing |
|---|---|---|---|---|
| `01-dashboard.html` | `/admin` | — | — | KPI cards + charts + recent activity (no listing) |
| `02-students.html` | `/admin/students` | `student` | `createdAt DESC` | **writable** |
| `03-parents.html` | `/admin/parents` | `parent` | `createdAt DESC` | **writable** |
| `04-teachers.html` | `/admin/teachers` | `teacher` | `createdAt DESC` | **writable** (RBAC level column) |
| `05-curriculum.html` | `/admin/curriculum` | `chapter` tree | `classNo ASC` | **readonly** — tree editor, no leaf create |
| `06-content.html` | `/admin/content` | `learningContent` | `createdAt DESC` | **writable** + upload + rights attestation |
| `07-questions.html` | `/admin/questions` | `question` | `createdAt DESC` | **writable** |
| `08-exams.html` | `/admin/exams` | `termExam` | `examDate DESC` | **writable** |
| `09-remedial.html` | `/admin/remedial` | `remedialAssignment` | `assignedAt DESC` | **writable** (AI-queued + teacher override) |
| `10-subscriptions.html` | `/admin/subscriptions` | `subscription` | `createdAt DESC` | **writable** + payments/MFS |
| `11-notifications.html` | `/admin/notifications` | `notificationTemplate` | `key ASC` | **writable** — templates |
| `12-audit.html` | `/admin/audit` | `auditLog` | `createdAt DESC` | **readonly** — read-only, no create |

---

## DOMAIN CONSTANTS — must be numerically coherent across every page

| Constant | Value |
|---|---|
| Pass threshold | 60% (per-exam configurable) |
| Quiz length | 10 questions, adaptive difficulty 1–5, seeded at tier 2 |
| Retake cap | 2 per chapter, then escalate to teacher review |
| Linked children | max 3 self-serve, admin-overridable |
| Screen-time default | 60 min/day, parent-changeable, `null` = explicitly unlimited |
| Extension grant | 15 min, one-time, parent-initiated |
| Upload limits | video 500MB · PDF 25MB |
| Leaderboard | top 100, display name + class only, opt-out default **on** |
| Pagination | 25 default / 100 max |
| Parent PIN | 6-digit · Student PIN | 4-digit |
| Currency | ৳ (BDT), stored as poisha |
| Notification caps | 20/day push · 5/day nudge |

**Time-coherence:** every page is one snapshot at a single implied "now". Use 2026-10-17 consistently; no future-dated completed events.

**Badge rules:** one label + one color per enum value, reused identically on every page. Actor/reason goes in a caption, never an ad-hoc badge variant.
