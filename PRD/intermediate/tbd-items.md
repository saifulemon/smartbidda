# TBD Items — smartbidda

Items that are unclear or missing from client input. Each item includes a recommended value, priority, and status.

**Status Legend:**
- 💡 Recommended — Awaiting PM decision
- 📌 Adopted — PM confirmed (accept/modify)
- ❌ Rejected — Moved to Open Questions

**Priority Legend:**
- 🔴 Critical — Architecture/scope impact, must decide before Phase 2
- 🟡 Standard — Industry best practice, batch approval possible
- 🟢 Optional — Nice-to-have, can defer to Phase 4

---

## 🔴 Critical Items

- **C1. Student authentication method (ages 6-11)**
  - [💡 Recommended: No email/password for students. Parent creates the account; the student enters via a 4-digit kid-PIN plus an avatar picker. Sessions last the length of a screen-time budget.]
  - Rationale: 6-year-olds cannot manage passwords or emails, and requiring an email at signup excludes a large share of BD households. Avatar + PIN is the standard child-account pattern (YouTube Kids, Duolingo ABC).
  - Priority: 🔴 Critical — determines the auth module, the session model, and whether a parent must be present at first login.
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17)

- **C2. Parent authentication method**
  - [💡 Recommended: Phone number + OTP as the primary credential (BD is a phone-first market), then a 6-digit parent PIN for re-entering Parent Mode. Biometric is dropped from web MVP — it is a device capability, not a web one.]
  - Rationale: Email penetration among the target parent demographic is low; OTP over SMS matches every BD consumer app.
  - Priority: 🔴 Critical — determines auth, the proxy-login flow, and the notification channel address.
  - Status: **Confirmed (modified)** — `[📌 Adopted: Email + password]` (PM, 2026-10-17).
    PM overrode the recommendation: parent credential is **email + password**, not phone+OTP.
    A separate **6-digit parent PIN is still required to enter Parent Mode** (that part of the
    proposal stands and is adopted). Consequences carried into the PRD:
    - email is a NOT NULL signup field for parents → real deliverability dependency.
    - SMS/OTP is **not** used for auth → it is not a required 3rd-party integration for MVP.
    - Parent notification channels become **in-app + email** (no SMS push channel in MVP).
    - Open Question raised: email reach in the target demographic is low — a password-reset
      path that assumes an inbox the parent actually reads is a support burden.

- **C3. Exam pass threshold value**
  - [💡 Recommended: 60%, set per-exam by the teacher with 60% as the default.]
  - Rationale: the client's own example is 60%; making it per-exam rather than global avoids a hard-coded constant blocking a legitimate lower bar for Class 1.
  - Priority: 🔴 Critical — it is the gate for the whole remedial loop; wrong placement means the loop never fires or always fires.
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17)

- **C4. Remedial ("Retake Class") content: AI-selected vs AI-generated**
  - [💡 Recommended: AI **selects** from a teacher-uploaded, topic-tagged remedial library. AI does **not** generate lesson content.]
  - Rationale: generating instructional content for 6-11 year-olds carries correctness and liability risk with no review step. Selection-from-a-tagged-library is accurate, auditable, and shippable. Generation can be a later, reviewed feature.
  - Priority: 🔴 Critical — decides whether the content model needs an `AI_GENERATED` provenance field, a review workflow, and whether `/admin/content` needs a remedial tagging surface.
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17). Consequence: content model carries a `kind` (LESSON | REMEDIAL) + `topics[]` tag set; NO AI-generated provenance field, NO publish-review workflow.

- **C5. Subscription / pricing model**
  - [💡 Recommended: one monthly or annual **per-family** subscription covering all subjects for every linked child, plus optional separately-priced crash-course packs at exam time.]
  - Rationale: per-family is simpler for multi-child households and avoids the entitlement check multiplying by child. Exam-time crash packs are a proven BD revenue spike.
  - Priority: 🔴 Critical — decides the entitlement entity shape, the payment line items, and what `/parent/subscription` sells.
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17). Entitlement is per-family; `subscription.children[]` is a link set, not N entitlements.

- **C6. Screen-time enforcement point**
  - [💡 Recommended: **server-side** daily counter per child; at the limit the app hard-blocks and shows a "ask your parent" screen. Parent can grant a one-time extension.]
  - Rationale: a client-side-only counter is bypassed by a page refresh and does not survive switching devices — exactly the control the parent is paying for.
  - Priority: 🔴 Critical — decides whether heartbeat/usage events exist and where the block is enforced.
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17). Requires a client→server usage heartbeat; the block is a server decision rendered by the client.

- **C7. National leaderboard scope and child privacy**
  - [💡 Recommended: leaderboard ranks **display name + class only** (no photo, no full name, no school). Parental opt-out defaults ON; an opted-out child still earns points and sees their own rank but is not listed.]
  - Rationale: a public ranking of identifiable 6-11 year-olds is a safeguarding problem, and Bangladesh's Digital Security / child-protection expectations make default-opt-out the defensible posture.
  - Priority: 🔴 Critical — decides the leaderboard query, the profile fields it may read, and the privacy policy content.
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17). `student.leaderboardOptOut` defaults `true`; the ranking query joins only `displayName` + `classNo`.

- **C8. Voice-guided navigation approach**
  - [💡 Recommended: **pre-authored Bangla voice-over audio assets** keyed to navigation and state events. Google Cloud Speech-to-Text is deferred out of MVP.]
  - Rationale: STT is for understanding what a user says; navigation guidance is playback. Bengali child-speech recognition is unreliable, and the client's stated goal ("help young children who are still developing reading skills") is solved by playback alone.
  - Priority: 🔴 Critical — removes or keeps a live speech integration from the MVP critical path.
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17). Google Cloud Speech-to-Text is OUT of MVP. Voice = pre-authored Bangla audio assets served from the content CDN.

- **C9. Firebase's role**
  - [💡 Recommended: **drop Firebase from MVP.** PostgreSQL is the single system of record; web push is delivered through one provider. Firebase may return later as a push transport only.]
  - Rationale: two databases create two answers to "what is the student's progress?", which is the exact split this workspace's pipeline has paid to reconcile eleven times. No feature in the input requires it.
  - Priority: 🔴 Critical — the data layer is not reversible after schema work begins.
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17). PostgreSQL is the ONLY datastore. Web Push is a single-provider integration chosen at build time (see Open Questions).

- **C10. Content licensing / NCTB material provenance**
  - [💡 Recommended: teachers upload only content they have rights to; the platform stores an uploader + rights-attestation per asset. NCTB textbook *text* is not redistributed as-is; video/PDF are original teacher material referencing the syllabus.]
  - Rationale: NCTB textbooks are copyrighted by the state. Redistributing them verbatim is a legal exposure the client should decide on knowingly.
  - Priority: 🔴 Critical — shapes the content upload contract and the legal documents in the client checklist.
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17). Upload form requires an explicit rights attestation checkbox; `learningContent.rightsAttestedBy/At` are stored.

## 🟡 Standard Items

- **S1. Parent account password rules**
  - [💡 Recommended: min 8 chars, at least 1 number. OTP-primary means this only guards the fallback.]
  - Rationale: industry default.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S2. Pagination sizes**
  - [💡 Recommended: admin lists 25/page (selector 10/25/50/100); leaderboard shows top 100 with the viewing child's own row pinned below if outside the top 100.]
  - Rationale: admin-standards.md requires the selector; the pinned own-row is the standard leaderboard affordance.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S3. Quiz length and timing per module**
  - [💡 Recommended: 10 questions per module quiz. No time limit for Class 1-2; per-question 60s for Class 3-5.]
  - Rationale: timed pressure is developmentally inappropriate for the youngest cohort and the client wants encouragement, not stress.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S4. Adaptive difficulty mechanism**
  - [💡 Recommended: 3 difficulty tiers per question; move up after 2 consecutive correct, down after 2 consecutive wrong. Accuracy window = last 10 answered.]
  - Rationale: simple, explainable to a parent, and avoids a black-box that a wrong answer cannot correct.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S5. Max children per parent account**
  - [💡 Recommended: 3.]
  - Rationale: covers the modal BD household; higher values are an admin override, not a self-serve limit.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S6. Points model**
  - [💡 Recommended: lesson complete = 10 pts, quiz passed = 25 pts, quiz at 100% = +10 bonus, exam passed = 100 pts, retake passed = 50 pts. Points are per-class for leaderboard ranking.]
  - Rationale: weighting toward exams keeps the leaderboard aligned with the client's academic goal rather than pure click-through.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S7. Retake cap before teacher escalation**
  - [💡 Recommended: 2 retakes per chapter; on the 3rd failure the assignment is flagged to the teacher for manual review instead of auto-queuing again.]
  - Rationale: prevents an infinite auto-loop that quietly never resolves a real gap.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S8. Notification rate limits**
  - [💡 Recommended: parent alerts max 20/day; exam and weakness alerts are exempt (transactional); nudge max 5/day.]
  - Rationale: standard deliverability + annoyance control.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S9. Currency**
  - [💡 Recommended: BDT (৳), stored in poisha as an integer.]
  - Rationale: float money is a defect; BD standard.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S10. Session lifetime**
  - [💡 Recommended: student session = their remaining screen-time budget (hard-capped at 4h); parent/admin session 7 days with 30-min idle re-auth for Parent Mode.]
  - Rationale: ties auth lifetime to the screen-time feature rather than inventing a second timer.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S11. Soft-delete retention**
  - [💡 Recommended: 90 days, then hard delete. Child accounts purge progress data on parent request within 7 days.]
  - Rationale: standard; child data purge is a privacy expectation.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S12. Upload limits**
  - [💡 Recommended: video ≤ 500MB (mp4/webm), PDF ≤ 25MB. Admin bulk import ≤ 20 files.]
  - Rationale: typical LMS constraint; large Bangla animated lessons are the reason video is generous.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **S13. Content search behavior**
  - [💡 Recommended: debounced (300ms), searches chapter title + subject name, URL-state so results are shareable. Class/subject/chapter are filters, not free text.]
  - Rationale: matches the pipeline's `scaffold-search-filter-bar` contract.
  - Priority: 🟡 Standard
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

## 🟢 Optional Items

- **O1. Dark mode**
  - [💡 Recommended: defer to post-MVP.]
  - Rationale: a children's daytime-use app; low value vs. token churn.
  - Priority: 🟢 Optional
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **O2. Avatar customization**
  - [💡 Recommended: ship 8 preset animal avatars in MVP; full customization (upload) post-MVP.]
  - Rationale: upload moderation for children's images is a safeguarding cost worth deferring.
  - Priority: 🟢 Optional
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **O3. Offline PDF download**
  - [💡 Recommended: defer. MVP streams PDF in-browser.]
  - Rationale: offline sync is a large engineering surface; low-bandwidth streaming covers the near-term need.
  - Priority: 🟢 Optional
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **O4. Printable progress report (PDF)**
  - [💡 Recommended: include a simple printable view at `/parent/progress` using the browser print path.]
  - Rationale: near-zero cost, high value for parents who want to show relatives.
  - Priority: 🟢 Optional
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)

- **O5. Email digest for parents**
  - [💡 Recommended: defer; in-app + push covers MVP.]
  - Rationale: email reach in the target demographic is low (see C2).
  - Priority: 🟢 Optional
  - Status: **Confirmed** — `[📌 Adopted]` (PM, 2026-10-17 — batch approval)
