# Parsed Input — smartbidda

> Parser artifact (generate-prd Phase 1.4). Source: `../smartbidda-prd-input.md`
> Generated: 2026-10-17

## Business Context

- **Business Model**: Freemium — free core NCTB learning modules; premium subscriptions and/or per-course purchase paid through Bangladeshi Mobile Financial Services (bKash, Nagad, Upay) and SSLCommerz.
- **Core Value Proposition**: The only Bangla-first primary LMS (Class 1-5) that follows the NCTB syllabus AND closes the loop automatically — weak topic detected → mandatory retake class assigned → re-exam unlocked → parent notified, with no teacher intervention.
- **Competitive Differentiator**: Existing BD content platforms deliver static video libraries. smartbidda adds (a) mandatory quiz-gated progression, (b) AI-curated remedial retake classes, (c) a Parent Proxy dashboard in Bangla with screen-time control and before/after progress charts.
- **MVP TOP 3**: (1) Quiz-gated NCTB lesson progression with Bangla-first voice-guided UI, (2) Term exam + AI remedial retake loop, (3) Parent Proxy dashboard with screen-time + notifications.
- **Success Metrics**: module completion rate, quiz pass rate, daily active students, parent dashboard engagement (weekly active parents), paid conversion rate.

## Detected Features

- [x] Bilingual Bangla/English interface with language toggle
- [x] Voice-guided navigation (Bangla TTS for pre-literate readers)
- [x] NCTB-aligned curriculum tree (Class 1-5 → Subject → Chapter → Lesson)
- [x] Multimodal lesson content (animated/interactive Bangla video + PDF material)
- [x] Auto-triggered mandatory quiz on module completion
- [x] Quiz-gated sequential lesson unlocking
- [x] Adaptive quiz difficulty (accuracy-driven)
- [x] National real-time leaderboard (per grade, points-based)
- [x] Gamification — points, virtual rewards, badges
- [x] Three term exams per class (১ম সাময়িক / অর্ধবার্ষিক / বার্ষিক)
- [x] Baseline pass threshold gating progression (<60% = fail)
- [x] Automated weakness detection (per-topic cognitive gap map)
- [x] AI-curated mandatory "Retake Class" (remedial video/PDF)
- [x] Re-exam unlock gated on retake completion
- [x] Parent Proxy login (PIN / biometric) → Parent Mode
- [x] Screen-time management (daily usage limit per child)
- [x] Real-time parent notifications (exam score, weakness alert, nudge, re-exam progress)
- [x] Parental nudge (on-screen prompt to child's device)
- [x] Before vs. After remedial progress chart
- [x] Predictive term-exam outcome forecast (parent dashboard)
- [x] Content management (admin/teacher uploads Bangla/English video + PDF)
- [x] Freemium subscription + course purchase (BD MFS)
- [x] Custom Bengali web fonts (Hind Siliguri, Kalpurush)

## Adaptive Complexity Flags

| Flag | Detected | Source |
|------|:--------:|--------|
| SaaS | Yes | freemium subscription + premium course purchase |
| File upload | Yes | admin/teacher uploads video + PDF study material |
| Real-time | Yes | "real-time, global ranking system"; live parent alerts |
| Billing | Yes | bKash, Nagad, Upay, SSLCommerz |
| Chat | No | no messaging feature in input |

## Detected Feature Bundles

| Bundle | Detected | Trigger Source | Required Items | Recommended Items | Conditional Triggers |
|--------|:--------:|----------------|:--------------:|:-----------------:|----------------------|
| 1. Auth/Registration | Yes | proxy login, parent email+password signup, student kid-PIN entry | 9 | 6 | Social Login: **No**, Phone Auth: **No** (PM chose email+password — see tbd-items C2) |
| 2. Chat/Messaging | No | — | — | — | — |
| 3. Payment/Subscription | Yes | bKash/Nagad/Upay/SSLCommerz, premium subscription, course purchase | — | — | — |
| 4. Booking/Scheduling | No | — | — | — | — |
| 5. Assignment/Matching | Yes | "AI … selectively **queues** remedial content without human intervention"; retake class auto-assignment | — | — | — |
| 6. Board/Feed | No | leaderboard is a ranking, not a board/feed | — | — | — |
| 7. Search/Filter | Yes | curriculum browsed by class → subject → chapter; content discovery is primary | — | — | — |
| 8. File Upload/Media | Yes | "upload NCTB-aligned Bangla/English content"; video + PDF | — | — | — |
| 9. Notification | **Yes (implicit)** | any event-producing bundle active + explicit real-time parent alerts | 5 | 6 | — |
| 10. Review/Rating | **No — keyword collision** | "Evaluation & Remedial Module" matches the `evaluation` trigger, but this is exam evaluation, not user reviews of content. Deliberately NOT activated. | — | — | — |
| 11. Dashboard/Analytics | **Yes (implicit)** | admin user exists + data-producing bundles active; explicit parent dashboard + predictive analytics | — | — | — |
| 12. Invite/Share | No | parental nudge is a one-way prompt, not a referral/invite | — | — | — |

**Active bundles: 7** (1, 3, 5, 7, 8, 9, 11).

> No ⚠️ Bundle Density Warning: project complexity is **Complex** (25+ screens), whose threshold is 8-12 active bundles. 7 is under it.

> Deferred bundles (MVP out of scope): **none** — all detected bundles are MVP. Mobile app delivery is deferred (see MVP Scope) but is a delivery target, not a feature bundle.

## Client-Imposed Constraints (reconciled)

| Client stated | Pipeline constraint | Resolution |
|---|---|---|
| Flutter / React Native mobile + React web | Pipeline builds React (RR7) web only | **MVP = responsive web app.** Mobile retained as post-MVP phase. Recorded in MVP Out of Scope + Open Questions. |
| Backend "Node.js or Python (FastAPI/Django)" | NestJS | NestJS adopted (Node.js family, satisfies client's first preference). |
| Database "PostgreSQL and Firebase" | PostgreSQL | PostgreSQL adopted as system of record. Firebase listed as a 3rd-party candidate for push delivery only (see Open Questions). |
| Google Cloud Speech-to-Text (Bengali) for voice | — | Retained as integration; MVP uses pre-authored Bangla voice-over assets with TTS as stretch. See Open Questions. |
| OpenAI API for AI logic | — | Retained. |

## Categorized Information

### Language & Localization
- Default UI language: **Bangla (Bengali)** — child-friendly register.
- Secondary: English — seamless settings toggle.
- The **English subject** content is bilingual (Bangla gloss + English source).
- All user-visible strings, toasts, validation errors, empty states → Bangla (the §3.2 Locale rule).
- Voice-guided navigation for pre-fluent readers; sample copy: "আজকের ক্লাসে তোমাকে স্বাগতম!", "দারুণ করেছ! চলো পরের ধাপে যাই!"
- Fonts: Hind Siliguri, Kalpurush.

### User Types & Relationships
- **Learner (Student)** 6-11 (Class 1-5): learn through play, Bangla content, virtual rewards. Pain: boring, low motivation alone.
- **Observer (Parent)** 25-45: monitor progress, screen time, weaknesses. Pain: can't see digital activity; unaware of academic gaps.
- **Admin/Teacher** adult: upload NCTB content, manage leaderboard. Pain: manual grading + individualized remedial assignment is infeasible.
- Relationship: Parent → 1..n Students (guardian link). Admin/Teacher → all students. A student has exactly one acting parent for proxy access `[💡 Recommended: single guardian of record; additional guardians deferred]`.

### Exam Loop (core domain)
1. Three standardized term exams per class: ১ম সাময়িক (First Term), অর্ধবার্ষিক (Half-Yearly), বার্ষিক (Annual).
2. Baseline pass threshold (client example: 60%).
3. Below threshold → cannot proceed to next module.
4. AI evaluates wrong answers → auto-curates mandatory **Retake Class** (remedial video/PDF on weak topics only).
5. Retake completion → **Re-exam** unlocks.
6. Parent alerted at each step; before/after chart on re-exam.

### AI
- Adaptive assessment: quiz difficulty adjusts to real-time accuracy.
- Predictive analytics: term-exam forecast from daily quiz scores + chapter-level revision highlights.
- Weakness detection: per-topic gap map (e.g. fractions weak, geometry strong) → auto-queues remedial content.

### Payments
- bKash, Nagad, Upay (MFS) + SSLCommerz (aggregator) for premium subscription and course purchase.

### Content
- Types: animated/interactive video (Bangla), PDF study material.
- Organized: Class (1-5) → Subject → Chapter → Lesson, NCTB-aligned.

### Notifications (Bangla + English)
- Exam completion + score.
- Weakness alert + retake assignment.
- Parental nudge.
- Re-exam progress (remedial finished) + before/after chart.

### Technical
- Frontend: React (RR7) web, responsive, Bengali web fonts.
- Backend: NestJS.
- DB: PostgreSQL.
- AI: OpenAI API. Voice: Google Cloud Speech-to-Text (Bengali) `[💡 Recommended: pre-authored Bangla VO assets in MVP, STT for voice search later]`.
- Payments: bKash / Nagad / Upay / SSLCommerz.
