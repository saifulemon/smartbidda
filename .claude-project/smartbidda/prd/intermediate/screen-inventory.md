# Screen Inventory — smartbidda

> Parser artifact (generate-prd Phase 1.4). Derived from `parsed-input.md`.
> Total: **36 routes** (24 user app + 12 admin) → project complexity **Complex** (25+ screens).

## User App Routes (Total: 24)

| # | Feature | Route | Page Name | User Type | Access Group |
|---|---------|-------|-----------|-----------|--------------|
| 1 | Home / today's class | `/` | `HomePage` | Student | Student |
| 2 | Login | `/auth/login` | `LoginPage` | Student, Parent | Public |
| 3 | Signup (parent creates account) | `/auth/signup` | `SignupPage` | Parent | Guest only |
| 4 | Student onboarding (class, avatar) | `/onboarding` | `OnboardingPage` | Student | Student |
| 5 | Subject list (NCTB curriculum) | `/learn` | `SubjectListPage` | Student | Student |
| 6 | Chapter list for a subject | `/learn/:classNo/:subjectSlug` | `ChapterListPage` | Student | Student |
| 7 | Lesson (video + PDF) | `/learn/:classNo/:subjectSlug/:chapterSlug` | `LessonPage` | Student | Student |
| 8 | Auto-triggered quiz | `/quiz/:sessionId` | `QuizPage` | Student | Student |
| 9 | Quiz result + unlock | `/quiz/:sessionId/result` | `QuizResultPage` | Student | Student |
| 10 | Retake class (remedial) | `/retake/:retakeId` | `RetakeClassPage` | Student | Student |
| 11 | Term exam list | `/exams` | `ExamListPage` | Student | Student |
| 12 | Take term exam | `/exams/:examId` | `ExamPage` | Student | Student |
| 13 | Exam result + before/after | `/exams/:examId/result` | `ExamResultPage` | Student | Student |
| 14 | National leaderboard | `/leaderboard` | `LeaderboardPage` | Student | Student |
| 15 | Rewards & badges | `/rewards` | `RewardsPage` | Student | Student |
| 16 | Settings (language, voice) | `/settings` | `SettingsPage` | Student | Student |
| 17 | Parent proxy login (PIN) | `/parent/login` | `ParentLoginPage` | Parent | Guest only |
| 18 | Parent dashboard home | `/parent` | `ParentDashboardPage` | Parent | Parent |
| 19 | Child progress detail | `/parent/progress` | `ParentProgressPage` | Parent | Parent |
| 20 | AI predictive analytics | `/parent/analytics` | `ParentAnalyticsPage` | Parent | Parent |
| 21 | Screen-time management | `/parent/screen-time` | `ScreenTimePage` | Parent | Parent |
| 22 | Alerts & notification history | `/parent/alerts` | `ParentAlertsPage` | Parent | Parent |
| 23 | Subscription & payments | `/parent/subscription` | `SubscriptionPage` | Parent | Parent |
| 24 | Parent settings & linked children | `/parent/settings` | `ParentSettingsPage` | Parent | Parent |

## Admin Routes (Total: 12)

| # | Route | Page Name | Managed Entity | Default Sort | Notes |
|---|-------|-----------|----------------|--------------|-------|
| 1 | `/admin` | `AdminDashboardPage` | — (aggregates) | — | stats cards, period filter, charts, recent activity |
| 2 | `/admin/students` | `AdminStudentsPage` | `student` | `createdAt DESC` | has Create button |
| 3 | `/admin/parents` | `AdminParentsPage` | `parent` | `createdAt DESC` | has Create button |
| 4 | `/admin/teachers` | `AdminTeachersPage` | `teacher` | `createdAt DESC` | RBAC levels; has Create button |
| 5 | `/admin/curriculum` | `AdminCurriculumPage` | `chapter` (tree) | `classNo ASC, subjectOrder ASC, chapterOrder ASC` | reference/lookup — no create at leaf; tree editor |
| 6 | `/admin/content` | `AdminContentPage` | `learningContent` | `createdAt DESC` | video + PDF upload; teacher role too |
| 7 | `/admin/questions` | `AdminQuestionsPage` | `question` | `createdAt DESC` | question bank; has Create button |
| 8 | `/admin/exams` | `AdminExamsPage` | `termExam` | `examDate DESC` | has Create button |
| 9 | `/admin/remedial` | `AdminRemedialPage` | `remedialAssignment` | `assignedAt DESC` | AI-queued + teacher override |
| 10 | `/admin/subscriptions` | `AdminSubscriptionsPage` | `subscription` | `createdAt DESC` | payments, MFS transactions |
| 11 | `/admin/notifications` | `AdminNotificationsPage` | `notificationTemplate` | `key ASC` | reference/lookup — templates |
| 12 | `/admin/audit` | `AdminAuditPage` | `auditLog` | `createdAt DESC` | read-only, no create |

## Bundle-Derived Routes

| Route | Source Bundle | Why it was added |
|-------|---------------|------------------|
| `/auth/signup`, `/auth/login` | Auth/Registration (Required) | account creation + session |
| `/parent/login` | Auth/Registration (Required) | proxy-entry auth for parent |
| `/parent/subscription` | Payment/Subscription (Required) | checkout + entitlement |
| `/retake/:retakeId` | Assignment/Matching (Required) | auto-queued remedial assignment needs a target screen |
| `/learn`, `/learn/...` | Search/Filter (Required) | browse/discovery of curriculum |
| `/admin/content` | File Upload/Media (Required) | upload surface for video/PDF |
| `/parent/alerts`, in-app toast layer | Notification (Required) | notification inbox |
| `/parent/analytics`, `/admin` | Dashboard/Analytics (Required) | analytics surfaces |

## Access Group → Layout Mapping (candidate)

| Group | Prefix | Auth | Layout |
|-------|--------|------|--------|
| Public/Guest | `/auth` | No | `AuthLayout` |
| Student | `/`, `/learn`, `/quiz`, `/retake`, `/exams`, `/leaderboard`, `/rewards`, `/settings` | Yes (student) | `StudentLayout` |
| Parent | `/parent` | Yes (parent, PIN re-entry) | `ParentLayout` |
| Admin | `/admin` | Yes (admin/teacher) | `AdminLayout` |

> Layout names are candidates for the design manifest; final names settle with D2 (`design/manifest.json`).
