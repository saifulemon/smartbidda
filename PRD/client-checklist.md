# smartbidda — Client Preparation Checklist

> Project: smartbidda
> Generated: 2026-10-17
> Platform: Web
> Total: 16 items

These are the items **we cannot start certain work without**. Everything here is something only your team can provide or confirm. Where we could reasonably proceed without an item, we have said so in the note.

If you do not have an item yet, tell us and we will mark that part of the build as "degraded but working" so it never blocks the rest.

---

## Accounts & API keys

- [ ] **SSLCommerz payment account** — Store ID + Store Password (sandbox is fine to start).
      Needed before any payment can be tested. Without it the subscription screens build but checkout stays disabled.

- [ ] **OpenAI API key** — used to select remedial lessons for a struggling student and to build the progress forecast.
      Without it the app still works: remedial selection falls back to a rule-based path. Tell us if you would rather ship that way to begin with.

- [ ] **Email sending account** — an API key + the "from" address you want parents to see.
      Required for parent notifications and password reset. Password reset is the one thing that genuinely cannot ship without this, because your parents sign in with email.

- [ ] **Web domain + hosting** — the production URL, and where the database should live (we recommend the same country as your users for speed).

## Brand & design

- [ ] **Logo file** — SVG or high-resolution PNG.

- [ ] **Brand colors** — the 2–4 main colors, with any light/dark preference. If you have none, we will propose a palette built around a warm, high-contrast, child-friendly range.

- [ ] **Bangla font files** — we specified **Hind Siliguri** and **Kalpurush**. Please confirm you hold the licence to embed them, or send the fonts you want instead. This affects every screen.

- [ ] **2–3 example products you like** — for look and feel only. We suggested starting points (a kids' learning app for the progression and reward loop, a large-tile video app for layout, and a Bangladeshi school result sheet for exam terminology). Send anything better you have seen.

- [ ] **Photographs or illustration direction** — do you want real photography of Bangladeshi classrooms, or illustrated characters? This is a significant cost and timing difference, so we need it early.

## Content

- [ ] **Confirm the starting curriculum scope** — the PRD supports Classes 1–10 across all NCTB subjects. For the first release, which classes and subjects should we populate first? Loading all of them at once is possible but slow.

- [ ] **Curriculum material** — either (a) files you are licensed to use, or (b) confirmation that your teachers will create original material. Every uploaded item requires a signed attestation that it is yours to use. Please name the person on your side who will sign these.

- [ ] **Sample questions** — around 20 multiple-choice questions for one chapter, so we can build and test the quiz engine against real Bangla content rather than placeholders.

- [ ] **Voice prompt recordings** — the app speaks to young children in Bangla at key moments. This needs pre-recorded audio, not a computer voice. We need roughly 20 short lines (greetings, quiz start, correct/incorrect, screen-time ended). If these are not ready, the app falls back to text and we add the audio later.

## Decisions & legal

- [ ] **Subscription pricing** — the monthly and annual Family price, and the Crash Pack price. Nothing about the payment screens is blocked by this until launch, but the storefront cannot be finalized without it.

- [ ] **Terms of Service + Privacy text** — parents must accept these before signing up. We can draft a starting version for your lawyer if that helps.

- [ ] **Confirm parents have email** — this is the most important item on this list. Parents sign in with an email address and password; there is no phone or OTP option. If a meaningful share of your families do not use email, tell us now, because it changes the parent sign-in design.

---

## Already decided, no action needed

These were confirmed during planning and are recorded in the PRD. Listed so you can spot anything you disagree with.

| Decision | Confirmed |
|----------|-----------|
| Students sign in with a 4-digit PIN + avatar, no password | Yes |
| Pass mark defaults to 60%, changeable per exam | Yes |
| Struggling students are given remedial lessons you upload | Yes |
| Screen time is enforced by the server, not the child's device | Yes |
| Leaderboard shows display name and class only; hiding is the default | Yes |
| Voice prompts are pre-recorded Bangla audio | Yes |
| Database is PostgreSQL only (no Firebase) | Yes |
| Mobile apps are a later phase — this release is web only | Yes |

---

## What happens next

1. Send back whatever you have — partial is fine, tell us what is missing.
2. Answer the **10 open questions** in Section 8 of the PRD, especially the pricing one and the parent-email one.
3. We will confirm the design direction before building screens.
4. When you get new answers later, we update the PRD rather than working from memory.
