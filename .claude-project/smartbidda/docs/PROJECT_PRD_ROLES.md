# PRD Role & Layout Requirements (Auto-generated)

## User Roles
- student (0): Learns, quizzes, takes exams, earns points. Cannot manage content or other users.
- parent (1): Owns and manages linked children, subscriptions, screen time. Cannot author content.
- teacher (2): Authors and tags content, builds the question bank, sets thresholds, reviews escalated retakes. Cannot manage billing or roles.
- admin (3): Full platform authority including users, roles, subscriptions, payments, templates, and audit.

## Layout Requirements
- StudentLayout
- AuthLayout
- StudentSubLayout
- PinLayout
- ParentLayout
- AdminLayout

## Route Guards
- auth:student
- guest
- auth:parent
- auth:teacher
- auth:admin
