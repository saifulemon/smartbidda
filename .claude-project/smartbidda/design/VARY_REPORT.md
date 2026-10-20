# VARY_REPORT.md — smartbidda (D1 · vary)

> Phase: D1 · Mode: self-generate (local authoring) · Base reference: **Duolingo**
> Concepts: exactly 5 · Written 2026-10-17
> Status: **Step 1 complete** (domain analysis → reference mapping). Steps 2–4 pending.

---

## Step 1 — Domain analysis → reference mapping

### Service characterization

smartbidda is a **Bangla-first learning app for Bangladeshi Class 1–5 children**, sold to their
**parents** as a per-family subscription and administered by **teachers and admins**. It spans two
frontends that could not be less alike: a **mobile-first consumer app** (24 routes — home, subject →
chapter → lesson → quiz, term exams, retake/remedial, leaderboard, rewards, plus a parent hub with
progress, analytics, screen time, alerts and billing) and a **desktop operations console** (12 routes
— dense record tables for students, parents, teachers, curriculum, content, questions, exams,
remedial, subscriptions, notifications, audit). The emotional register therefore splits three ways
inside one product: **playful and energetic** for the child (points, streaks, badges, a leaderboard),
**calm and trust-heavy** for the parent (money leaves the family only through bKash/Nagad/Upay via
SSLCommerz; screen time is enforced server-side), and **dense and utilitarian** for the operator.
Money is freemium: free NCTB core lessons, a paid family plan, and time-boxed exam-time crash packs.
The UI is Bangla-only at every layer, so any display font a concept picks must carry Bangla glyph
weight — a Latin-only display face silently collapses the whole concept to its body font.

### Facet → reference → contribution

The base already reproduces the user's reference (**Duolingo**) in neutral, so the base column *is*
the reference direction and none of the five below duplicates it (vary/01 rule 5). Each concept is a
genuinely divergent alternative, anchored on one experiential facet of this service and drawn from a
**different industry**, which is what guarantees the five languages cannot collapse into each other.

| Facet | Reference | Industry | What it contributes |
|---|---|---|---|
| Core learning loop & play (lesson → quiz → points) | **Kahoot!** | game-show / classroom quiz | giant stacked full-width controls, saturated violet + yellow, heavy rounded display type, answer-first IA |
| Habit, progress & competition (streak, points, leaderboard, badges) | **Strava** | fitness social | stat-first hierarchy, condensed heavy numerals, orange on charcoal, activity rings/bars as the hero element |
| Lesson discovery & content browsing (subject → chapter → lesson, VO, PDF) | **Spotify** | music streaming | dark immersive canvas, horizontal content rails, pill navigation, one functional accent colour, thumb-reach primary action |
| Parent trust & money (plan, crash packs, screen time, alerts) | **Airbnb** | travel marketplace | warm photo-led trust cards, soft elevation, coral accent, search/filter pills, human microcopy and reassurance markers |
| Admin/teacher operations console (dense tables, review workflows) | **Linear** | developer tools | graphite chrome, 1px hairline tables, compact 13px type, icon+label rows, side-panel detail, keyboard-first density |

**Sanity check (vary/01 §4):** five distinct industries; palettes do not collide
(violet/yellow · orange/charcoal · green on black · coral on white · graphite with indigo); type
voices do not collide (heavy rounded · condensed · geometric grotesk · humanist · neutral); elevation
models do not collide (flat saturated · flat · cards on black · soft shadow · hairlines). None of the
five is Duolingo, and none is a recolor of another.

### Reference-basis table (real DNA → the decision it drives here)

The traceable "준거" line — each row is what the real product actually looks like, then the grounded
decision it forces on our hero screens. Bangla font substitutions are decided here because they are
a design decision, not a detail: a concept that cannot set Bangla in its own voice is not a concept.

| Concept | Reference · real DNA (font · colour · signature form · IA hierarchy) | Decision it drives in this concept |
|---|---|---|
| `kahoot-play` | Kahoot! · Montserrat-class heavy rounded display · `#46178F` purple field, `#FFC800` yellow CTA, white type · full-bleed colour blocks, answer tiles as huge stacked buttons with a hard offset edge, 3px outlines · question-first, one thing on screen | Hero screens become full-bleed violet sections; quiz options are giant stacked tiles that depress on press; the leaderboard podium is three oversized colour blocks, not a table; Bangla display weight comes from a heavy Bengali face (e.g. Hind Siliguri/Anek Bangla 800) since Montserrat has no Bangla |
| `strava-streak` | Strava · condensed heavy sans for numerals · `#FC4C02` orange on `#242428` charcoal · segmented bars, activity summaries, chunky stat blocks · stat-first: the number is the headline, the label is a tracked caption | Home and parent progress lead with the metric (points, streak, screen time) as oversized numerals over charcoal chips; progress bars become the hero graphic on 18 and 14; section labels are small tracked captions above a single dominant number |
| `spotify-rails` | Spotify · Circular-class geometric grotesk · `#191414` canvas, `#1DB954` green accent only on action · pill controls, horizontal rails of large artwork cards, sticky bottom mini-player · content-forward: browse by rail, never by table | Subject/chapter discovery becomes horizontal rails on a dark canvas; primary actions are full pills docked in thumb reach; the tab bar is a floating pill; one green accent does all the signalling (progress, active, success) |
| `airbnb-trust` | Airbnb · Cereal-class humanist sans · `#FF5A5F` Rausch coral on white, warm greys, 8–12px radii · soft-shadow photo-led cards, search pill, filter chips · search → filter → grid → detail with trust markers | Parent screens read as a reassuring marketplace: photo-led plan and subject cards, soft elevation, coral for the single primary action, trust markers (verification state, "যাচাই করা", parent-facing reassurance lines) promoted above the fold |
| `linear-console` | Linear · Inter-class neutral sans · `#08090A` graphite, `#5E6AD2` indigo accent · hairline dividers, compact rows, icon+label affordances, side-panel detail · sidebar → dense list → panel | The 12 admin routes become the concept's showpiece: hairline tables with compact rows, status as small text chips rather than filled badges, filters in a slim toolbar, row detail in a side panel; the student app keeps the same restraint with one indigo accent |

### Hero set (the picker subset — identical across all 5 concepts)

Chosen by IA density, not by nav (vary rule: exclude low-variance utility screens, which can only
reskin and therefore mislead the pick). Six screens, covering both frontends and all five facets:

| # | Screen | App | Why it earns a slot |
|---|---|---|---|
| 1 | `01-home` | frontend | densest student IA — today's plan, progress, points, entry to every loop |
| 2 | `06-chapter-list` | frontend | the discovery/catalogue surface — where a rail vs list vs card language is decided |
| 3 | `08-quiz` | frontend | the core loop's interaction moment — options, focus state, voice, timer |
| 4 | `14-leaderboard` | frontend | motivation surface — podium, data viz, opt-out notice |
| 5 | `18-parent-dashboard` | frontend | the parent facet — trust, charts, nudge, forecast |
| 6 | `02-students` | frontend-admin-dashboard | the console facet — DataTable, search/sort/select/bulk/row-actions, modal |

Excluded as low-variance: `16-settings`, `22-alerts`, `21-screen-time`, `17-parent-login`,
`02-login` (utility/auth), and the remaining 8 admin tables (same DataTable already proven on
`02-students`). Billing (`23-subscription`) ships in D2 for whichever concept wins.

### Slugs

`kahoot-play` · `strava-streak` · `spotify-rails` · `airbnb-trust` · `linear-console`

(These drive `compile_themes`, `build_picker --only`, `curation.json`, and the picker columns.)

### Anchor decision

No ⚓ anchor concept: the user's reference site (Duolingo) is already expressed by the **base**,
which is the reference direction (vary/01 rule 5). All five concepts are divergent alternatives, so
no facet concept was dropped to make room for one.
