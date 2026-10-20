// chrome.mjs — single source for every shared chrome block.
// Each layout is built by ONE function, so byte-identity across a layout group
// holds by construction rather than by copy-paste discipline.
// The only per-page variation is (a) text inside the data-slot element and
// (b) aria-current="page" on the active nav item.

const T = (title) =>
  `<span class="appbar-title" data-slot="title" data-testid="appbar-title">${title}</span>`;

/* ---------- StudentLayout / ParentLayout: brand appbar + 5-tab tabbar ---------- */

const appbar = (screen, unread) => `
  <header class="appbar" data-shell="topbar">
    <span class="nav-brand" data-testid="appbar-brand">স্মার্টবিদ্যা</span>
    ${T('')}
    <div class="row" style="margin-left:auto">
      <!-- PRD DV-7 L2940: unread notification count on the /parent header -->
      <button class="btn btn-ghost btn-sm" style="position:relative" data-testid="appbar-notifications" aria-label="${unread ? `নোটিফিকেশন — ${unread} টি না পড়া` : 'নোটিফিকেশন'}">
        <i data-lucide="bell" class="icon-md"></i>${
          unread
            ? `
        <span data-testid="appbar-unread" style="position:absolute;top:2px;right:2px;min-width:18px;height:18px;padding:0 4px;background:var(--c-error);color:var(--c-on-primary);border-radius:var(--radius-pill);font-size:var(--t-caption-size);line-height:18px;text-align:center;">${unread}</span>`
            : ''
        }
      </button>
      <button class="btn btn-ghost btn-sm" data-testid="appbar-profile" aria-label="প্রোফাইল">
        <span class="avatar" aria-hidden="true">${screen}</span>
      </button>
    </div>
  </header>`;

const tabbar = (items, active) => `
  <nav class="tabbar" data-shell="bottomnav" data-component="nav" aria-label="প্রধান নেভিগেশন">
${items
  .map(
    ([href, id, icon, label]) => `    <a class="tabbar-item" href="${href}" data-testid="nav-${id}"${
      active === id ? ' aria-current="page"' : ''
    }>
      <i data-lucide="${icon}" class="icon-md"></i>
      ${label}
    </a>`
  )
  .join('\n')}
  </nav>`;

export const STUDENT_TABS = [
  ['01-home.html', 'home', 'home', 'হোম'],
  ['05-subject-list.html', 'learn', 'book-open', 'পড়াশোনা'],
  ['11-exam-list.html', 'exams', 'clipboard-check', 'পরীক্ষা'],
  ['14-leaderboard.html', 'leaderboard', 'trophy', 'লিডারবোর্ড'],
  ['15-rewards.html', 'rewards', 'award', 'পুরস্কার'],
];

export const PARENT_TABS = [
  ['18-parent-dashboard.html', 'dashboard', 'layout-dashboard', 'ড্যাশবোর্ড'],
  ['19-parent-progress.html', 'progress', 'trending-up', 'অগ্রগতি'],
  ['21-screen-time.html', 'screentime', 'timer', 'স্ক্রিন টাইম'],
  ['22-alerts.html', 'alerts', 'bell', 'অ্যালার্ট'],
  ['24-parent-settings.html', 'settings', 'settings', 'সেটিংস'],
];

/* ---------- StudentSubLayout: back + title, no tabbar ----------
 * Matches base/frontend/06-chapter-list.html byte-for-byte (including its
 * screen-prefixed testids) — that file already exists and the group must not
 * drift against it. */
export const subAppbar = (backHref, backTestId, titleTestId, title) => `
  <header class="appbar" data-shell="topbar">
    <a class="back" href="${backHref}" aria-label="ফিরে যান" data-testid="${backTestId}">
      <i data-lucide="arrow-left" class="icon-md"></i>
    </a>
    <span class="appbar-title" data-slot="title" data-testid="${titleTestId}">${title}</span>
  </header>`;

/* ---------- AdminLayout: sidebar + in-shell topbar ---------- */

const SIDEBAR = [
  ['01-dashboard.html', 'dashboard', 'layout-dashboard', 'ড্যাশবোর্ড'],
  ['02-students.html', 'students', 'users', 'শিক্ষার্থী'],
  ['03-parents.html', 'parents', 'users-round', 'অভিভাবক'],
  ['04-teachers.html', 'teachers', 'graduation-cap', 'শিক্ষক'],
  ['05-curriculum.html', 'curriculum', 'library', 'পাঠ্যক্রম'],
  ['06-content.html', 'content', 'play-square', 'কনটেন্ট'],
  ['07-questions.html', 'questions', 'help-circle', 'প্রশ্নব্যাংক'],
  ['08-exams.html', 'exams', 'file-text', 'পরীক্ষা'],
  ['09-remedial.html', 'remedial', 'refresh-cw', 'রিমিডিয়াল'],
  ['10-subscriptions.html', 'subscriptions', 'credit-card', 'সাবস্ক্রিপশন'],
  ['11-notifications.html', 'notifications', 'mail', 'নোটিফিকেশন'],
  ['12-audit.html', 'audit', 'scroll-text', 'অডিট লগ'],
];

export const adminSidebar = (active) => `
    <aside class="sidebar" data-shell="sidebar" data-component="nav" aria-label="প্রধান নেভিগেশন">
      <span class="nav-brand" style="padding:var(--space-sm) var(--space-md)" data-testid="admin-brand">স্মার্টবিদ্যা</span>
${SIDEBAR.map(
  ([href, id, icon, label]) =>
    `      <a class="nav-link" href="${href}" data-testid="side-${id}"${
      active === id ? ' aria-current="page"' : ''
    }><i data-lucide="${icon}" class="icon-md"></i>${label}</a>`
).join('\n')}
    </aside>`;

export const adminTopbar = (title) => `
      <header class="app-topbar" data-shell="topbar">
        <button class="nav-toggle" data-testid="admin-nav-toggle" aria-label="মেনু" aria-expanded="false"
          onclick="const s=this.closest('.app-shell').querySelector('.sidebar');const o=s.classList.toggle('is-open');this.setAttribute('aria-expanded',o)">
          <i data-lucide="menu"></i>
        </button>
        <div class="topbar-title">
          <h1 data-slot="title" data-testid="admin-title">${title}</h1>
        </div>
        <div class="row" style="margin-left:auto">
          <button class="btn btn-ghost btn-sm" data-testid="admin-user-menu" aria-label="ব্যবহারকারী মেনু">
            <span class="avatar" aria-hidden="true">প</span>
          </button>
        </div>
      </header>`;

/* ---------- page assembly ---------- */

export function render(p) {
  const { app, layout, title, head, style, content, screen } = p;

  let top = '',
    bottom = '';

  if (layout === 'StudentLayout') {
    top = appbar(screen || 'র');
    bottom = tabbar(STUDENT_TABS, p.activeTab);
  } else if (layout === 'ParentLayout') {
    top = appbar(screen || 'ম', 3);
    bottom = tabbar(PARENT_TABS, p.activeTab);
  } else if (layout === 'StudentSubLayout') {
    top = subAppbar(p.backHref, p.backTestId, p.titleTestId, p.title);
  } else if (layout === 'AdminLayout') {
    top = `<div class="app-shell">${adminSidebar(p.activeSide)}\n\n    <div class="app-main">${adminTopbar(
      title
    )}`;
    // mainClose below already emits </main> — closing app-main and app-shell only.
    bottom = `    </div>\n  </div>`;
  }
  // AuthLayout / PinLayout: no chrome at all.

  const mainOpen =
    layout === 'AdminLayout'
      ? `\n      <main class="app-body" data-shell="content">`
      : `\n  <main class="app-body" data-shell="content">`;
  const mainClose = layout === 'AdminLayout' ? `      </main>` : `  </main>`;

  return `<!doctype html>
<html lang="bn-BD">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title} — স্মার্টবিদ্যা</title>
<link rel="stylesheet" href="../../styles/theme.css">
<link rel="stylesheet" href="../../styles/components.css">
<script src="https://unpkg.com/lucide@latest"></script>
<style>
${style}
</style>
</head>
<body data-app="${app}" data-layout="${layout}">
${top}
${mainOpen}
${content}
${mainClose}
${bottom}

  <script>lucide.createIcons();</script>
</body>
</html>
`;
}
