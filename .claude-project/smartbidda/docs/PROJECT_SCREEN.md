# PROJECT_SCREEN

**Project:** smartbidda
**Concern:** frontend screens — route, guard, component, and the APIs each screen needs.
**GENERATED from `design/manifest.json`** (the single source of truth). Do NOT hand-edit —
edit the manifest and re-run `scaffold-screen-doc`. `screen-integration-coverage` checks that
the built frontend actually calls the APIs listed here.

- Total screens: **36** across 2 frontend app(s).
- APIs per screen = manifest `reads[]` + `writes[]` endpoints, plus user-story endpoints matching the screen's route area.
- `auth:<role>` is a MINIMUM role, ordered by `PROJECT_AUTH.roles[].value`: `auth:teacher`
  admits teacher (2) and admin (3); `auth:admin` admits admin (3) only. The manifest uses
  the minimum so an Authoring page guarded `auth:teacher` is reachable by both roles.

---

## App: `frontend` (24 screens)

| Route | Guard | Component | APIs needed |
|-------|-------|-----------|-------------|
| `/` | auth:student | HomePage | `GET /api/student/home` |
| `/auth/login` | guest | LoginPage | `GET /api/auth/children`<br>`POST /api/auth/student-login` |
| `/auth/signup` | guest | SignupPage | `GET /api/auth/prefill`<br>`POST /api/auth/signup` |
| `/exams` | auth:student | ExamListPage | `GET /api/exams` |
| `/exams/:examId` | auth:student | ExamPage | `GET /api/exams/:id`<br>`POST /api/exams/:id/attempts/:aid/submit`<br>`POST /api/exams/:id/attempts` |
| `/exams/:examId/result` | auth:student | ExamResultPage | `GET /api/exams/:id/attempts/:aid` |
| `/leaderboard` | auth:student | LeaderboardPage | `GET /api/leaderboard` |
| `/learn` | auth:student | SubjectListPage | `GET /api/curriculum/subjects`<br>`POST /api/remedial` |
| `/learn/:classNo/:subjectSlug` | auth:student | ChapterListPage | `GET /api/curriculum/chapters` |
| `/learn/:classNo/:subjectSlug/:chapterSlug` | auth:student | LessonPage | `GET /api/curriculum/chapters/:slug`<br>`POST /api/lessons/:slug/progress`<br>`POST /api/quizzes/sessions`<br>`POST /api/lessons/:slug/start` |
| `/onboarding` | auth:parent | OnboardingPage | `GET /api/onboarding`<br>`POST /api/students` |
| `/parent` | auth:parent | ParentDashboardPage | `GET /api/parent/dashboard`<br>`POST /api/parent/nudge` |
| `/parent/alerts` | auth:parent | AlertsPage | `GET /api/notifications` |
| `/parent/analytics` | auth:parent | ParentAnalyticsPage | `GET /api/parent/students/:id/forecast` |
| `/parent/login` | guest | ParentLoginPage | `POST /api/parent/verify-pin`<br>`POST /api/auth/login` |
| `/parent/progress` | auth:parent | ParentProgressPage | `GET /api/parent/students/:id/progress` |
| `/parent/screen-time` | auth:parent | ScreenTimePage | `GET /api/parent/students/:id/screen-time`<br>`PUT /api/parent/students/:id/screen-time` |
| `/parent/settings` | auth:parent | ParentSettingsPage | `GET /api/parent/settings`<br>`PATCH /api/parent/settings` |
| `/parent/subscription` | auth:parent | SubscriptionPage | `GET /api/parent/subscription`<br>`POST /api/payments/intents` |
| `/quiz/:sessionId` | auth:student | QuizPage | `GET /api/quizzes/sessions/:id`<br>`POST /api/quizzes/sessions/:id/answers` |
| `/quiz/:sessionId/result` | auth:student | QuizResultPage | `GET /api/quizzes/sessions/:id` |
| `/retake/:retakeId` | auth:student | RetakeClassPage | `GET /api/remedial/:id`<br>`POST /api/remedial/:id/complete` |
| `/rewards` | auth:student | RewardsPage | `GET /api/rewards` |
| `/settings` | auth:student | SettingsPage | `GET /api/student/settings`<br>`PATCH /api/student/settings` |

## App: `frontend-admin-dashboard` (12 screens)

| Route | Guard | Component | APIs needed |
|-------|-------|-----------|-------------|
| `/admin` | auth:teacher | AdminDashboardPage | `GET /api/admin/dashboard` |
| `/admin/audit` | auth:admin | AdminAuditPage | `GET /api/admin/audit-logs` |
| `/admin/content` | auth:teacher | AdminContentPage | `GET /api/content` |
| `/admin/curriculum` | auth:teacher | AdminCurriculumPage | `GET /api/admin/curriculum` |
| `/admin/exams` | auth:teacher | AdminExamsPage | `GET /api/admin/exams` |
| `/admin/notifications` | auth:admin | AdminNotificationsPage | `GET /api/admin/notifications` |
| `/admin/parents` | auth:admin | AdminParentsPage | `GET /api/admin/parents` |
| `/admin/questions` | auth:teacher | AdminQuestionsPage | `GET /api/admin/questions` |
| `/admin/remedial` | auth:teacher | AdminRemedialPage | `GET /api/admin/remedial` |
| `/admin/students` | auth:admin | AdminStudentsPage | `GET /api/admin/students`<br>`POST /api/admin/students`<br>`DELETE /api/admin/students/:id` |
| `/admin/subscriptions` | auth:admin | AdminSubscriptionsPage | `GET /api/admin/subscriptions`<br>`POST /api/admin/subscriptions/:id/refund` |
| `/admin/teachers` | auth:admin | AdminTeachersPage | `GET /api/admin/teachers`<br>`POST /api/admin/teachers` |

