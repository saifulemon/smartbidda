# smartbidda

A Bangla-first learning app for Bangladeshi schoolchildren in Class 1–5, and the parents who watch over them.

A child signs in with a 4-digit PIN and an avatar — no email, no password. A parent signs in with email, enters a 6-digit PIN for Parent Mode, and sees what their child is studying, where they are struggling, and how much screen time they have used.

---

## Status

Planning complete. No code yet.

The product spec is finished and reviewed. Engineering has not started.

## What's here

```
PRD/
├── smartbidda_PRD.md        The full product + technical spec (Sections 0–8)
├── client-checklist.md      What we need from the client before/during build
├── prd-input.md             The original client brief
└── intermediate/
    ├── parsed-input.md      Parsed features, scope reconciliation
    ├── screen-inventory.md  Every route: 24 app + 12 admin
    └── tbd-items.md         Decision register — 10 critical, 13 standard, 5 optional
```

### The spec

`PRD/smartbidda_PRD.md` — Sections 0–8, ~4,700 lines.

| Section | Contents |
|---|---|
| 0 | Project overview, user types and statuses |
| 1 | Terminology — 14 core concepts |
| 2 | 11 system modules, each with a concrete success and failure scenario |
| 2.5 | Notification specification — 16 triggers |
| 3 | User application — 24 routes, each with the mandatory 9 items |
| 4 | Admin dashboard — 12 pages |
| 5 | Tech stack, architecture, environment variables, 5 conditional subsystems |
| 6 | Data model — 27 entities, enums, index hints |
| 7 | Permission matrix — 43 actions across 5 roles |
| 8 | Open questions — 10 product, 8 technical |

## Product decisions worth knowing

Ten critical questions were settled before the spec was written:

| Decision | Choice |
|---|---|
| Student sign-in | 4-digit PIN + avatar. No email, no password |
| Parent sign-in | Email + password. SMS/OTP is not in the MVP |
| Pass threshold | 60% default, configurable per exam |
| Remedial content | AI selects from a teacher-uploaded library. It does not generate |
| Billing | Per-family subscription, plus optional one-time crash packs |
| Screen time | Enforced server-side, hard block. Not a client-side counter |
| Leaderboard | Display name and class only. Opting out is the default |
| Voice prompts | Pre-recorded Bangla audio. No live speech recognition |
| Database | PostgreSQL only |
| Content rights | Original teacher material, signed attestation required |

Mobile apps are deliberately out of scope for this release. The web app is the product.

## Stack

React Router 7 (framework mode) · TypeScript · Tailwind · Redux Toolkit
NestJS · TypeORM · PostgreSQL · Redis

Ports: backend `3072`, frontend `5210`.

## Open questions

Ten product questions are still open and are tracked in Section 8.1 of the spec. Two matter most:

- **Parent email reach.** Parents authenticate by email alone. If a meaningful share of families do not read email, password reset and notifications fail, and the sign-in design changes.
- **Pricing.** The Family and Crash Pack prices are unset, so the storefront cannot be finalized.

`PRD/client-checklist.md` lists everything the client must supply, and what each item blocks.
