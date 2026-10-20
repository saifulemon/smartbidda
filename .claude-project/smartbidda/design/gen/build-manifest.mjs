// build-manifest.mjs — emit design/manifest.json in the CONTRACT.md §2a shape:
// contractVersion + globalStyles + screens[] (one entry per ROUTE, states excluded),
// each with reads/writes. Route↔file map is 1:1 from the PRD's `#### Route:` table.
import { writeFile } from 'node:fs/promises';

const dir = new URL('../', import.meta.url).pathname;
const CONTRACT_VERSION = 2;

// [file, route, app, layout, component, guard, reads[], writes[]]
// reads:  {endpoint, shows:[…]}   writes: {endpoint, produces, feedback, success, failure}
const S = (file, route, app, layout, component, guard, reads, writes) =>
  ({ file: `html/${app}/${file}.html`, route, app, layout, component, guard, reads, writes });

const FRONT = 'frontend';
const ADMIN = 'frontend-admin-dashboard';

const screens = [
  // ---- frontend (24) ----
  S('01-home', '/', FRONT, 'StudentLayout', 'HomePage', 'auth:student',
    [{ endpoint: 'GET /api/home', shows: ['greeting', 'continueLesson', 'subjects', 'pendingTasks', 'streak', 'points', 'screenTime'] }], []),
  S('02-login', '/auth/login', FRONT, 'AuthLayout', 'LoginPage', 'guest',
    [{ endpoint: 'GET /api/auth/children', shows: ['childSelector'] }],
    [{ endpoint: 'POST /api/auth/login', produces: 'greeting', feedback: 'redirect', success: 'সফলভাবে প্রবেশ করা হয়েছে', failure: 'পিন ভুল হয়েছে' }]),
  S('03-signup', '/auth/signup', FRONT, 'AuthLayout', 'SignupPage', 'guest',
    [{ endpoint: 'GET /api/auth/prefill', shows: ['childSelector'] }],
    [{ endpoint: 'POST /api/auth/signup', produces: 'childSelector', feedback: 'redirect', success: 'অ্যাকাউন্ট তৈরি হয়েছে', failure: 'অ্যাকাউন্ট তৈরি করা যায়নি' }]),
  S('04-onboarding', '/onboarding', FRONT, 'StudentSubLayout', 'OnboardingPage', 'auth:student',
    [{ endpoint: 'GET /api/onboarding', shows: ['steps', 'profile'] }],
    [{ endpoint: 'POST /api/onboarding', produces: 'profile', feedback: 'inline', success: 'তথ্য সংরক্ষিত হয়েছে', failure: 'সংরক্ষণ করা যায়নি' }]),
  S('05-subject-list', '/learn', FRONT, 'StudentLayout', 'SubjectListPage', 'auth:student',
    [{ endpoint: 'GET /api/subjects', shows: ['subjects', 'progress', 'search'] }],
    [{ endpoint: 'POST /api/retakes', produces: 'chapter', feedback: 'redirect', success: 'রিটেক তৈরি হয়েছে', failure: 'রিটেক তৈরি করা যায়নি' }]),
  S('06-chapter-list', '/learn/:classNo/:subjectSlug', FRONT, 'StudentSubLayout', 'ChapterListPage', 'auth:student',
    [{ endpoint: 'GET /api/subjects/:slug/chapters', shows: ['chapters', 'progress', 'continue'] }], []),
  S('07-lesson', '/learn/:classNo/:subjectSlug/:chapterSlug', FRONT, 'StudentSubLayout', 'LessonPage', 'auth:student',
    [{ endpoint: 'GET /api/lessons/:slug', shows: ['lessonBody', 'steps', 'media'] }],
    [{ endpoint: 'POST /api/lessons/:slug/progress', produces: 'progress', feedback: 'inline', success: 'অগ্রগতি সংরক্ষিত', failure: 'অগ্রগতি সংরক্ষণ করা যায়নি' }]),
  S('08-quiz', '/quiz/:sessionId', FRONT, 'StudentSubLayout', 'QuizPage', 'auth:student',
    [{ endpoint: 'GET /api/quiz/:sessionId', shows: ['question', 'options', 'timer', 'progress'] }],
    [{ endpoint: 'POST /api/quiz/:sessionId/answer', produces: 'score', feedback: 'inline', success: 'উত্তর গৃহীত হয়েছে', failure: 'উত্তর জমা দেওয়া যায়নি' }]),
  S('09-quiz-result', '/quiz/:sessionId/result', FRONT, 'StudentSubLayout', 'QuizResultPage', 'auth:student',
    [{ endpoint: 'GET /api/quiz/:sessionId/result', shows: ['score', 'points', 'verdict', 'weakTopics'] }], []),
  S('10-retake-class', '/retake/:retakeId', FRONT, 'StudentSubLayout', 'RetakeClassPage', 'auth:student',
    [{ endpoint: 'GET /api/retakes/:retakeId', shows: ['chapter', 'video', 'note', 'verification'] }],
    [{ endpoint: 'POST /api/retakes/:retakeId/complete', produces: 'score', feedback: 'redirect', success: 'রিটেক সম্পন্ন হয়েছে', failure: 'রিটেক সম্পন্ন করা যায়নি' }]),
  S('11-exam-list', '/exams', FRONT, 'StudentLayout', 'ExamListPage', 'auth:student',
    [{ endpoint: 'GET /api/exams', shows: ['upcoming', 'lastAttempt'] }], []),
  S('12-exam', '/exams/:examId', FRONT, 'StudentSubLayout', 'ExamPage', 'auth:student',
    [{ endpoint: 'GET /api/exams/:examId', shows: ['questions', 'timer', 'nav', 'autosave'] }],
    [{ endpoint: 'POST /api/exams/:examId/submit', produces: 'score', feedback: 'redirect', success: 'পরীক্ষা জমা হয়েছে', failure: 'পরীক্ষা জমা দেওয়া যায়নি' }]),
  S('13-exam-result', '/exams/:examId/result', FRONT, 'StudentSubLayout', 'ExamResultPage', 'auth:student',
    [{ endpoint: 'GET /api/exams/:examId/result', shows: ['score', 'passLine', 'rank', 'weakTopics'] }], []),
  S('14-leaderboard', '/leaderboard', FRONT, 'StudentLayout', 'LeaderboardPage', 'auth:student',
    [{ endpoint: 'GET /api/leaderboard', shows: ['top3', 'myRank', 'rows', 'classFilter'] }], []),
  S('15-rewards', '/rewards', FRONT, 'StudentLayout', 'RewardsPage', 'auth:student',
    [{ endpoint: 'GET /api/rewards', shows: ['balance', 'streak', 'badges', 'recentPoints'] }], []),
  S('16-settings', '/settings', FRONT, 'StudentSubLayout', 'SettingsPage', 'auth:student',
    [{ endpoint: 'GET /api/settings', shows: ['language', 'fontSize', 'voice', 'account'] }],
    [{ endpoint: 'PATCH /api/settings', produces: 'fontSize', feedback: 'inline', success: 'সেটিংস সংরক্ষিত', failure: 'সেটিংস সংরক্ষণ করা যায়নি' }]),
  S('17-parent-login', '/parent/login', FRONT, 'PinLayout', 'ParentLoginPage', 'guest', [],
    [{ endpoint: 'POST /api/parent/login', produces: 'children', feedback: 'redirect', success: 'প্যারেন্ট মোড চালু হয়েছে', failure: 'পিন ভুল হয়েছে' }]),
  S('18-parent-dashboard', '/parent', FRONT, 'ParentLayout', 'ParentDashboardPage', 'auth:parent',
    [{ endpoint: 'GET /api/parent/dashboard', shows: ['children', 'subjectScores', 'forecast', 'weakTopic', 'subscription'] }],
    [{ endpoint: 'POST /api/parent/nudge', produces: 'alerts', feedback: 'toast', success: 'নাজ পাঠানো হয়েছে', failure: 'নাজ পাঠানো যায়নি' }]),
  S('19-parent-progress', '/parent/progress', FRONT, 'ParentLayout', 'ParentProgressPage', 'auth:parent',
    [{ endpoint: 'GET /api/parent/progress', shows: ['subjectScores', 'trend'] }], []),
  S('20-parent-analytics', '/parent/analytics', FRONT, 'ParentLayout', 'ParentAnalyticsPage', 'auth:parent',
    [{ endpoint: 'GET /api/parent/analytics', shows: ['forecast', 'alerts', 'disclaimer'] }], []),
  S('21-screen-time', '/parent/screen-time', FRONT, 'ParentLayout', 'ScreenTimePage', 'auth:parent',
    [{ endpoint: 'GET /api/parent/screen-time', shows: ['used', 'limit', 'presets'] }],
    [{ endpoint: 'PATCH /api/parent/screen-time', produces: 'limit', feedback: 'inline', success: 'সীমা আপডেট হয়েছে', failure: 'সীমা আপডেট করা যায়নি' }]),
  S('22-alerts', '/parent/alerts', FRONT, 'ParentLayout', 'AlertsPage', 'auth:parent',
    [{ endpoint: 'GET /api/parent/alerts', shows: ['alerts', 'unread'] }], []),
  S('23-subscription', '/parent/subscription', FRONT, 'ParentLayout', 'SubscriptionPage', 'auth:parent',
    [{ endpoint: 'GET /api/parent/subscription', shows: ['currentPlan', 'plans', 'crashPacks', 'payment'] }], []),
  S('24-parent-settings', '/parent/settings', FRONT, 'ParentLayout', 'ParentSettingsPage', 'auth:parent',
    [{ endpoint: 'GET /api/parent/settings', shows: ['notifications', 'screenTimeEnforced', 'children'] }],
    [{ endpoint: 'PATCH /api/parent/settings', produces: 'notifications', feedback: 'inline', success: 'সেটিংস সংরক্ষিত', failure: 'সেটিংস সংরক্ষণ করা যায়নি' }]),

  // ---- admin (12) ----
  S('01-dashboard', '/admin', ADMIN, 'AdminLayout', 'AdminDashboardPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/dashboard', shows: ['kpis', 'activity'] }], []),
  S('02-students', '/admin/students', ADMIN, 'AdminLayout', 'AdminStudentsPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/students', shows: ['rows', 'search', 'sort', 'pagination'] }],
    [{ endpoint: 'POST /api/admin/students', produces: 'rows', feedback: 'modal', success: 'শিক্ষার্থী তৈরি হয়েছে', failure: 'শিক্ষার্থী তৈরি করা যায়নি' },
     { endpoint: 'DELETE /api/admin/students/:id', produces: 'rows', feedback: 'modal', success: 'শিক্ষার্থী মুছে ফেলা হয়েছে', failure: 'মুছে ফেলা যায়নি' }]),
  S('03-parents', '/admin/parents', ADMIN, 'AdminLayout', 'AdminParentsPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/parents', shows: ['rows', 'search', 'sort', 'export'] }], []),
  S('04-teachers', '/admin/teachers', ADMIN, 'AdminLayout', 'AdminTeachersPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/teachers', shows: ['rows', 'search', 'sort', 'roles'] }],
    [{ endpoint: 'POST /api/admin/teachers', produces: 'rows', feedback: 'modal', success: 'শিক্ষক তৈরি হয়েছে', failure: 'শিক্ষক তৈরি করা যায়নি' }]),
  S('05-curriculum', '/admin/curriculum', ADMIN, 'AdminLayout', 'AdminCurriculumPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/curriculum', shows: ['tree', 'classes', 'subjects', 'chapters'] }], []),
  S('06-content', '/admin/content', ADMIN, 'AdminLayout', 'AdminContentPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/content', shows: ['rows', 'search', 'sort', 'formats'] }], []),
  S('07-questions', '/admin/questions', ADMIN, 'AdminLayout', 'AdminQuestionsPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/questions', shows: ['rows', 'search', 'sort', 'topics'] }], []),
  S('08-exams', '/admin/exams', ADMIN, 'AdminLayout', 'AdminExamsPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/exams', shows: ['rows', 'search', 'sort', 'types'] }], []),
  S('09-remedial', '/admin/remedial', ADMIN, 'AdminLayout', 'AdminRemedialPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/remedial', shows: ['rows', 'search', 'sort', 'subjects'] }], []),
  S('10-subscriptions', '/admin/subscriptions', ADMIN, 'AdminLayout', 'AdminSubscriptionsPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/subscriptions', shows: ['rows', 'search', 'sort', 'payment'] }],
    [{ endpoint: 'POST /api/admin/subscriptions/:id/refund', produces: 'payment', feedback: 'modal', success: 'রিফান্ড সম্পন্ন', failure: 'রিফান্ড করা যায়নি' }]),
  S('11-notifications', '/admin/notifications', ADMIN, 'AdminLayout', 'AdminNotificationsPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/notifications', shows: ['templates', 'channels'] }], []),
  S('12-audit', '/admin/audit', ADMIN, 'AdminLayout', 'AdminAuditPage', 'auth:admin',
    [{ endpoint: 'GET /api/admin/audit', shows: ['entries', 'search', 'sort'] }], []),
];

const manifest = {
  contractVersion: CONTRACT_VERSION,
  version: '2026-10-19',
  app: 'smartbidda',
  selected_reference: 'spotify-rails',
  brandSpec: 'design/BRAND_SPEC.md',
  tokenContract: 'design/FEATURE_CONTRACT.md',
  globalStyles: {
    frontend: ['styles/theme.css', 'styles/components.css'],
    'frontend-admin-dashboard': ['styles/theme.css', 'styles/components.css'],
  },
  layouts: ['AuthLayout', 'PinLayout', 'StudentLayout', 'StudentSubLayout', 'ParentLayout', 'AdminLayout'],
  screens,
  counts: { frontendRoutes: 24, adminRoutes: 12, totalRoutes: screens.length, stateSheets: 36 },
  statesDir: 'html/states/',
  status: 'd2-complete',
};

await writeFile(`${dir}manifest.json`, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(`manifest.json written — contractVersion ${CONTRACT_VERSION}, ${screens.length} screens (reads/writes on all)`);
