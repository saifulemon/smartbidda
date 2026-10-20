// admin.mjs — the 12 admin routes.
// Ten of them are records screens sharing one listing structure, so that
// structure is BUILT here rather than written out 10 times: search, sortable
// headers, row actions, row selection, the bulk bar, one entity-form-modal
// serving create AND edit, and pagination. Only the entity, columns, rows and
// form fields vary.

const I = (name) => `<i data-lucide="${name}" class="icon-sm"></i>`;

function sortableTh(col, screen, defaultSort) {
  if (!col.sortable) return `                  <th>${col.label}</th>`;
  const isDefault = col.sort === defaultSort;
  return `                  <th class="sortable" data-sort="${col.sort}"${
    isDefault ? ' aria-sort="ascending"' : ''
  }>${col.label} ${I('chevrons-up-down')}</th>`;
}

/** rows: array of { id, cells: [html...], label } — cells align with columns. */
function listing(opts) {
  const {
    screen,
    heading,
    count,
    searchPlaceholder,
    createLabel,
    writable,
    // PRD §Actions differs on every admin page (students => Suspend, parents =>
    // Reset password, content => Publish, ...), so the menu is declared per page
    // instead of being hard-coded to view/edit/delete.
    rowActions = writable
      ? [
          { id: 'view', label: 'বিস্তারিত' },
          { id: 'edit', label: 'সম্পাদনা' },
          { id: 'delete', label: 'মুছুন', danger: true }
        ]
      : [
          { id: 'view', label: 'বিস্তারিত' },
          { id: 'copy', label: 'কপি করুন' }
        ],
    pageCount,
    columns,
    rows,
    filters = '',
    entityForm = ''
  } = opts;

  const thead = `              <thead>
                <tr>${
                  writable
                    ? `
                  <th><input type="checkbox" class="row-check" data-component="row-select" aria-label="সব নির্বাচন করুন" data-testid="${screen}-select-all"></th>`
                    : ''
                }
${columns.map((c) => sortableTh(c, screen, opts.defaultSort)).join('\n')}
                  <th></th>
                </tr>
              </thead>`;

  const tbody = `              <tbody>
${rows
  .map(
    (r) => `                <tr data-testid="${screen}-row" data-id="${r.id}">
${
  writable
    ? `                  <td><input type="checkbox" class="row-check" data-component="row-select" aria-label="${r.label} নির্বাচন করুন" data-testid="${screen}-row-select"></td>\n`
    : ''
}${r.cells.map((c) => `                  <td>${c}</td>`).join('\n')}
                  <td>
                    <div class="row-actions" data-component="row-actions" data-testid="${screen}-row-actions">
                      <button class="row-actions-trigger" aria-label="${r.label}-এর কার্যক্রম" data-testid="${screen}-row-actions-trigger">
                        ${I('more-horizontal').replace('icon-sm', 'icon-md')}
                      </button>
                      <div class="row-menu" hidden>
${rowActions
  .map(
    (a) => `                        <button class="row-menu-item${a.danger ? ' is-danger' : ''}" data-testid="${screen}-menu-${a.id}">${a.label}</button>`
  )
  .join('\n')}
                      </div>
                    </div>
                  </td>
                </tr>`
  )
  .join('\n')}
              </tbody>`;

  // Each admin page emits its own clearance rule, scoped to the page-unique
  // ${screen}-pane class already on the listing card. A shared-class rule would
  // have to live in components.css; a repeated custom selector would trip the
  // cross-page duplication gate — so it stays page-scoped.
  const style = `  .${screen}-pane { padding-bottom: env(safe-area-inset-bottom, 0px); }`;

  return { style, content: `        <div class="card ${screen}-pane" style="padding:0;overflow:hidden">
          <div class="card-header listing-head" style="padding:var(--space-lg);margin:0">
            <div>
              <h2 class="t-title-md" data-testid="${screen}-heading">${heading}</h2>
              <p class="t-caption" data-testid="${screen}-count">${count}</p>
            </div>
            <div class="listing-filters">
              <button class="btn btn-secondary btn-sm" data-testid="${screen}-export">
                ${I('download')}
                রপ্তানি
              </button>${
    writable
      ? `
              <button class="btn btn-primary btn-sm" data-testid="${screen}-create">
                ${I('plus')}
                ${createLabel}
              </button>`
      : ''
  }
            </div>
          </div>

          <div class="listing-body">
            <div class="search" data-component="search-bar">
              ${I('search')}
              <input class="input" type="search" placeholder="${searchPlaceholder}" aria-label="${heading} খুঁজুন" data-testid="${screen}-search">
            </div>
${
  filters
    ? `
            <div class="listing-filters" style="margin-top:var(--space-md)">
${filters}
            </div>`
    : ''
}
          </div>
${
  writable
    ? `
          <div class="bulk-bar" data-component="bulk-actions" hidden data-testid="${screen}-bulk-bar">
            <span class="t-body-sm" data-testid="${screen}-bulk-count">৩ জন নির্বাচিত</span>
            <button class="btn btn-secondary btn-sm" data-testid="${screen}-bulk-action">
              সামূহিক কাজ
            </button>
            <button class="btn btn-danger btn-sm" data-testid="${screen}-bulk-delete">
              মুছুন
            </button>
          </div>`
    : ''
}

          <div class="table-scroll">
            <table class="table" data-listing="${writable ? 'writable' : 'readonly'}" data-component="data-table" data-testid="${screen}-table">
${thead}
${tbody}
            </table>
          </div>

          <div style="padding:var(--space-lg)">
            <div class="pagination" data-testid="${screen}-pagination">
              <button class="btn btn-secondary btn-sm" data-testid="${screen}-page-prev" disabled>
                ${I('chevron-left')}
                আগের
              </button>
              <span class="t-caption" data-testid="${screen}-page-info">পৃষ্ঠা ১ / ${pageCount}</span>
              <button class="btn btn-secondary btn-sm" data-testid="${screen}-page-next">
                পরের
                ${I('chevron-right')}
              </button>
            </div>
          </div>
        </div>
${
  writable
    ? `
        <!-- ONE shared modal serves BOTH create and edit — only the prefilled values differ -->
        <div class="modal-scrim" hidden data-testid="${screen}-modal-scrim"></div>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="${screen}-modal-title" hidden data-component="entity-form-modal" data-testid="${screen}-modal">
          <div class="modal-header">
            <h2 class="modal-title" id="${screen}-modal-title" data-testid="${screen}-modal-title">${createLabel}</h2>
            <button class="modal-close" data-testid="${screen}-modal-close" aria-label="বন্ধ করুন">
              ${I('x').replace('icon-sm', 'icon-md')}
            </button>
          </div>
          <div class="modal-body">
            <form class="form-grid" data-component="form">
${entityForm}
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-testid="${screen}-modal-cancel">বাতিল</button>
            <button class="btn btn-primary" data-testid="${screen}-modal-save">সংরক্ষণ</button>
          </div>
        </div>`
    : ''
}` };
}

const f = (id, label, control, help = '') => `              <div class="field">
                <label class="label" for="${id}">${label}</label>
                ${control}${help ? `\n                <p class="help-text">${help}</p>` : ''}
              </div>`;
const input = (id, type = 'text', extra = '') =>
  `<input class="input" id="${id}" type="${type}" ${extra} data-testid="${id}">`;
const select = (id, opts) =>
  `<select class="input" id="${id}" data-testid="${id}">${opts
    .map((o) => `<option${o.sel ? ' selected' : ''}>${o.t}</option>`)
    .join('')}</select>`;

const CLASSES = [
  { t: 'প্রথম' },
  { t: 'দ্বিতীয়' },
  { t: 'তৃতীয়' },
  { t: 'চতুর্থ', sel: true },
  { t: 'পঞ্চম' }
];

const STATUS = (label, mod) =>
  `<span class="badge${mod ? ' badge-' + mod : ''}">${label}</span>`;

/* ---------- the 11 authored admin pages ---------- */

export default [
  /* 01 — the only admin screen that is not a records list */
  {
    file: '01-dashboard.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'dashboard',
    title: 'ড্যাশবোর্ড',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .dash-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-md); }
  @media (max-width: 900px) { .dash-kpis { grid-template-columns: repeat(2, 1fr); } }
  .dash-kpi { display: flex; flex-direction: column; gap: var(--space-xs); }
  .dash-cols { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-md); margin-top: var(--space-md); }
  @media (max-width: 900px) { .dash-cols { grid-template-columns: 1fr; } }
  .dash-activity { display: flex; gap: var(--space-sm); align-items: flex-start; padding: var(--space-md) 0; }
  .dash-activity + .dash-activity { border-top: var(--border-w) solid var(--c-hairline); }
  .dash-activity-text { display: flex; flex-direction: column; gap: var(--space-xxs); min-width: 0; }
  .dash-split { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); margin-top: var(--space-md); }
  @media (max-width: 900px) { .dash-split { grid-template-columns: 1fr; } }
  .dash-split-item { display: flex; flex-direction: column; gap: var(--space-xs); }
  /* notch / home-indicator clearance — this page's own layout class */
  .dash-pane { padding-bottom: env(safe-area-inset-bottom, var(--space-xxl)); }`,
    content: `
        <div class="dash-pane">
        <div class="dash-kpis">
          <div class="card dash-kpi" data-component="kpi">
            <p class="t-caption" data-testid="dash-kpi-students-label">শিক্ষার্থী</p>
            <p class="t-display-md" data-testid="dash-kpi-students">১,২৪৮</p>
            <span class="badge badge-success" data-testid="dash-kpi-students-delta">+৪২ এ মাসে</span>
          </div>
          <div class="card dash-kpi" data-component="kpi">
            <p class="t-caption" data-testid="dash-kpi-active-label">দৈনিক সক্রিয়</p>
            <p class="t-display-md" data-testid="dash-kpi-active">৩৮৬</p>
            <span class="badge badge-success" data-testid="dash-kpi-active-delta">+১৮ গতকালের চেয়ে</span>
          </div>
          <div class="card dash-kpi" data-component="kpi">
            <p class="t-caption" data-testid="dash-kpi-pass-label">গড় উত্তীর্ণ</p>
            <p class="t-display-md" data-testid="dash-kpi-pass">৬৮%</p>
            <span class="badge badge-warning" data-testid="dash-kpi-pass-delta">−২ পয়েন্ট</span>
          </div>
          <div class="card dash-kpi" data-component="kpi">
            <p class="t-caption" data-testid="dash-kpi-sub-label">সক্রিয় সাবস্ক্রিপশন</p>
            <p class="t-display-md" data-testid="dash-kpi-sub">২৮৩</p>
            <span class="badge badge-success" data-testid="dash-kpi-sub-delta">+৯ এ মাসে</span>
          </div>
        </div>

        <div class="dash-cols">
          <section class="card" data-component="chart" aria-labelledby="dash-chart-label">
            <div class="listing-head">
              <p class="t-body t-semibold" id="dash-chart-label" data-testid="dash-chart-label">সাপ্তাহিক সক্রিয় ব্যবহারকারী</p>
              <span class="t-caption" data-testid="dash-chart-unit">গত ৭ দিন</span>
            </div>
            <div class="chart" style="margin-top:var(--space-md)" role="img" aria-label="গত ৭ দিনের সক্রিয় ব্যবহারকারীর চার্ট">
              <div class="chart-col"><div class="bar" style="height:58%" data-testid="dash-bar"></div><span class="bar-label" data-testid="dash-bar-label">রবি</span></div>
              <div class="chart-col"><div class="bar" style="height:82%" data-testid="dash-bar"></div><span class="bar-label" data-testid="dash-bar-label">সোম</span></div>
              <div class="chart-col"><div class="bar" style="height:64%" data-testid="dash-bar"></div><span class="bar-label" data-testid="dash-bar-label">মঙ্গল</span></div>
              <div class="chart-col"><div class="bar" style="height:91%" data-testid="dash-bar"></div><span class="bar-label" data-testid="dash-bar-label">বুধ</span></div>
              <div class="chart-col"><div class="bar" style="height:76%" data-testid="dash-bar"></div><span class="bar-label" data-testid="dash-bar-label">বৃহঃ</span></div>
              <div class="chart-col"><div class="bar" style="height:100%" data-testid="dash-bar"></div><span class="bar-label" data-testid="dash-bar-label">শুক্র</span></div>
              <div class="chart-col"><div class="bar" style="height:70%" data-testid="dash-bar"></div><span class="bar-label" data-testid="dash-bar-label">আজ</span></div>
            </div>
          </section>

          <section class="card" data-component="list" aria-labelledby="dash-activity-label">
            <p class="t-body t-semibold" id="dash-activity-label" data-testid="dash-activity-label">সাম্প্রতিক কার্যক্রম</p>
            <div class="dash-activity">
              ${I('play-square').replace('icon-sm', 'icon-md')}
              <div class="dash-activity-text">
                <span class="t-body-sm" data-testid="dash-activity-text">নতুন ভিডিও যুক্ত হয়েছে — গণিত অধ্যায় ৪</span>
                <span class="t-caption" data-testid="dash-activity-meta">২ ঘণ্টা আগে · শিক্ষক</span>
              </div>
            </div>
            <div class="dash-activity">
              ${I('users').replace('icon-sm', 'icon-md')}
              <div class="dash-activity-text">
                <span class="t-body-sm" data-testid="dash-activity-text">৬ জন নতুন শিক্ষার্থী যুক্ত হয়েছে</span>
                <span class="t-caption" data-testid="dash-activity-meta">৪ ঘণ্টা আগে · স্বয়ংক্রিয়</span>
              </div>
            </div>
            <div class="dash-activity">
              ${I('refresh-cw').replace('icon-sm', 'icon-md')}
              <div class="dash-activity-text">
                <span class="t-body-sm" data-testid="dash-activity-text">১৮ জন শিক্ষার্থীর রিমিডিয়াল তালিকাভুক্ত</span>
                <span class="t-caption" data-testid="dash-activity-meta">আজ সকাল · স্বয়ংক্রিয়</span>
              </div>
            </div>
          </section>
        </div>

        <section class="card" data-component="list" aria-labelledby="dash-split-label" style="margin-top:var(--space-md)">
          <p class="t-body t-semibold" id="dash-split-label" data-testid="dash-split-label">এ মাসের সারাংশ</p>
          <div class="dash-split">
            <div class="dash-split-item">
              <span class="t-caption" data-testid="dash-split-label-x">প্রকাশিত কনটেন্ট</span>
              <span class="t-title-md" data-testid="dash-split-value">৩৯৪</span>
              <span class="t-caption" data-testid="dash-split-meta">১৮ টি খসড়া</span>
            </div>
            <div class="dash-split-item">
              <span class="t-caption" data-testid="dash-split-label-x">তৈরি পরীক্ষা</span>
              <span class="t-title-md" data-testid="dash-split-value">৩৪</span>
              <span class="t-caption" data-testid="dash-split-meta">৯ টি চলছে</span>
            </div>
            <div class="dash-split-item">
              <span class="t-caption" data-testid="dash-split-label-x">পেমেন্ট সমস্যা</span>
              <span class="t-title-md" data-testid="dash-split-value">৩</span>
              <span class="t-caption" data-testid="dash-split-meta">২ টি মুলতবি</span>
            </div>
          </div>
        </section>
        </div>`
  },

  /* 02 — students (writable) — the first admin screen; regenerated through the
   * same listing builder as its siblings so the group cannot drift. */
  {
    file: '02-students.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'students',
    title: 'শিক্ষার্থী',
    ...listing({
      screen: 'students',
      pageCount: '৫',
      heading: 'শিক্ষার্থী',
      count: 'মোট ১,২৪৮ জন',
      searchPlaceholder: 'নাম বা ইমেইল দিয়ে খুঁজুন',
      createLabel: 'নতুন শিক্ষার্থী',
      writable: true,
      defaultSort: 'displayName',
      filters: `              <span class="chip" data-testid="students-filter-class">
                চতুর্থ শ্রেণি
                <button class="chip-remove" data-testid="students-filter-class-remove" aria-label="ফিল্টার সরান">
                  ${I('x')}
                </button>
              </span>
              <span class="t-caption" data-testid="students-result-count">১২৪ জন পাওয়া গেছে</span>`,
      columns: [
        { key: 'name', label: 'নাম', sortable: true, sort: 'displayName' },
        { key: 'classNo', label: 'শ্রেণি', sortable: true, sort: 'classNo' },
        { key: 'parent', label: 'অভিভাবক' },
        { key: 'status', label: 'অবস্থা', sortable: true, sort: 'status' },
        { key: 'points', label: 'পয়েন্ট', sortable: true, sort: 'points' },
        { key: 'screenTime', label: 'আজকের ব্যবহার' },
        { key: 'lastActive', label: 'সর্বশেষ সক্রিয়তা', sortable: true, sort: 'lastActive' }
      ],
      rows: [
        {
          id: 'st-1',
          label: 'রাফিদ হাসান',
          cells: [
            `<div class="row"><span class="avatar" aria-hidden="true">র</span><span class="t-body-sm t-semibold truncate" title="রাফিদ হাসান">রাফিদ হাসান</span></div>`,
            `চতুর্থ`,
            `farhana@example.com`,
            STATUS('সক্রিয়', 'success'),
            `<span class="num">১,২৪০</span>`,
            `<span class="num">২৪ / ৬০ মিনিট</span>`,
            `৫ মিনিট আগে`
          ]
        },
        {
          id: 'st-2',
          label: 'নুসরাত জাহান',
          cells: [
            `<div class="row"><span class="avatar" aria-hidden="true">ন</span><span class="t-body-sm t-semibold truncate" title="নুসরাত জাহান">নুসরাত জাহান</span></div>`,
            `চতুর্থ`,
            `nasrin@example.com`,
            STATUS('সীমার কাছে', 'warning'),
            `<span class="num">৯৮০</span>`,
            `<span class="num">৫৮ / ৬০ মিনিট</span>`,
            `১ ঘণ্টা আগে`
          ]
        },
        {
          id: 'st-3',
          label: 'তানভীর আহমেদ',
          cells: [
            `<div class="row"><span class="avatar" aria-hidden="true">ত</span><span class="t-body-sm t-semibold truncate" title="তানভীর আহমেদ">তানভীর আহমেদ</span></div>`,
            `চতুর্থ`,
            `saiful@example.com`,
            STATUS('বিশ্রামে', null),
            `<span class="num">৬২০</span>`,
            `<span class="num">০ / ৬০ মিনিট</span>`,
            `গতকাল`
          ]
        }
      ],
      rowActions: [
        { id: 'view', label: 'বিস্তারিত' },
        { id: 'edit', label: 'সম্পাদনা' },
        { id: 'suspend', label: 'স্থগিত করুন', danger: true }
      ],
      entityForm: [
        f('students-f-parent', 'অভিভাবকের ইমেইল', input('students-f-parent', 'email', 'required'), 'এই ইমেইলে অ্যাকাউন্ট খুঁজে পাওয়া যেতে হবে।'),
        f('students-f-name', 'নাম', input('students-f-name', 'text', 'required')),
        f('students-f-class', 'শ্রেণি', select('students-f-class', CLASSES)),
        f('students-f-avatar', 'অ্যাভাটার', select('students-f-avatar', [
          { t: 'অ্যাভাটার ১', sel: true }, { t: 'অ্যাভাটার ২' }, { t: 'অ্যাভাটার ৩' }
        ])),
        f('students-f-pin', '৪ সংখ্যার পিন', input('students-f-pin', 'text', 'inputmode="numeric" maxlength="4"'), 'পিন কখনোই স্ক্রিনে দেখানো হয় না — অভিভাবকই শিক্ষার্থীকে বলবেন।')
      ].join('\n')
    })
  },

  /* 03 — parents (writable) */
  {
    file: '03-parents.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'parents',
    title: 'অভিভাবক',
    ...listing({
      screen: 'parents',
      pageCount: '১০',
      heading: 'অভিভাবক',
      count: 'মোট ৯৮২ জন',
      searchPlaceholder: 'নাম বা ইমেইল দিয়ে খুঁজুন',
      createLabel: 'নতুন অভিভাবক',
      writable: true,
      defaultSort: 'createdAt',
      filters: `              <span class="chip" data-testid="parents-filter-plan">
                পরিবার প্ল্যান
                <button class="chip-remove" data-testid="parents-filter-plan-remove" aria-label="ফিল্টার সরান">
                  ${I('x')}
                </button>
              </span>
              <span class="t-caption" data-testid="parents-result-count">২৪৮ জন পাওয়া গেছে</span>`,
      rowActions: [
        { id: 'view', label: 'বিস্তারিত' },
        { id: 'edit', label: 'সম্পাদনা' },
        { id: 'reset-password', label: 'পাসওয়ার্ড রিসেট' }
      ],
      // §3.6 family_code is the quote-on-a-support-call reference, so it leads
      // the table; the value follows the SB-FAM-YYYYMMDD-NNNN format.
      columns: [
        { key: 'family', label: 'পরিবার কোড', sortable: true, sort: 'familyCode' },
        { key: 'name', label: 'নাম', sortable: true, sort: 'displayName' },
        { key: 'email', label: 'ইমেইল', sortable: true, sort: 'email' },
        { key: 'children', label: 'সন্তান' },
        { key: 'plan', label: 'প্ল্যান', sortable: true, sort: 'plan' },
        { key: 'status', label: 'অবস্থা', sortable: true, sort: 'status' },
        { key: 'createdAt', label: 'তৈরির সময়', sortable: true, sort: 'createdAt' }
      ],
      rows: [
        {
          id: 'pa-1',
          label: 'ফারহানা রহমান',
          cells: [
            `<span class="t-code">SB-FAM-20260902-1041</span>`,
            `<div class="row"><span class="avatar" aria-hidden="true">ফ</span><span class="t-body-sm t-semibold truncate" title="ফারহানা রহমান">ফারহানা রহমান</span></div>`,
            `farhana@example.com`,
            `২ / ৩`,
            `পরিবার প্ল্যান`,
            STATUS('সক্রিয়', 'success'),
            `2026-09-02`
          ]
        },
        {
          id: 'pa-2',
          label: 'মোঃ সাইফুল ইসলাম',
          cells: [
            `<span class="t-code">SB-FAM-20260810-0177</span>`,
            `<div class="row"><span class="avatar" aria-hidden="true">স</span><span class="t-body-sm t-semibold truncate" title="মোঃ সাইফুল ইসলাম">মোঃ সাইফুল ইসলাম</span></div>`,
            `saiful@example.com`,
            `১ / ৩`,
            `পরিবার প্ল্যান`,
            STATUS('মেয়াদোত্তীর্ণ', 'warning'),
            `2026-08-10`
          ]
        },
        {
          id: 'pa-3',
          label: 'নাসরিন আক্তার',
          cells: [
            `<span class="t-code">SB-FAM-20260815-0392</span>`,
            `<div class="row"><span class="avatar" aria-hidden="true">ন</span><span class="t-body-sm t-semibold truncate" title="নাসরিন আক্তার">নাসরিন আক্তার</span></div>`,
            `nasrin@example.com`,
            `৩ / ৩`,
            `পরিবার প্ল্যান`,
            STATUS('সক্রিয়', 'success'),
            `2026-08-15`
          ]
        }
      ],
      entityForm: [
        f('parents-f-name', 'নাম', input('parents-f-name', 'text', 'required')),
        f('parents-f-email', 'ইমেইল', input('parents-f-email', 'email', 'required')),
        f('parents-f-plan', 'প্ল্যান', select('parents-f-plan', [
          { t: 'পরিবার প্ল্যান', sel: true },
          { t: 'ক্র্যাশ প্যাক' },
          { t: 'নিঃশুল্ক ট্রায়াল' }
        ])),
        f('parents-f-children', 'সন্তান সংখ্যা', input('parents-f-children', 'number', 'value="2" min="0" max="3"'), 'সর্বোচ্চ ৩ জন — বেশি হলে অনুমোদন লাগবে।')
      ].join('\n')
    })
  },

  /* 04 — teachers (writable, RBAC level column) */
  {
    file: '04-teachers.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'teachers',
    title: 'শিক্ষক',
    ...listing({
      screen: 'teachers',
      pageCount: '২',
      heading: 'শিক্ষক',
      count: 'মোট ৪৬ জন',
      searchPlaceholder: 'নাম বা বিষয় দিয়ে খুঁজুন',
      createLabel: 'নতুন শিক্ষক',
      writable: true,
      defaultSort: 'lastLogin',
      rowActions: [
        { id: 'view', label: 'বিস্তারিত' },
        { id: 'edit', label: 'সম্পাদনা' },
        { id: 'change-role', label: 'ভূমিকা বদল' }
      ],
      columns: [
        { key: 'name', label: 'নাম', sortable: true, sort: 'displayName' },
        { key: 'email', label: 'ইমেইল', sortable: true, sort: 'email' },
        { key: 'role', label: 'ভূমিকা', sortable: true, sort: 'role' },
        { key: 'contentCount', label: 'কনটেন্ট সংখ্যা' },
        { key: 'status', label: 'অবস্থা', sortable: true, sort: 'status' },
        { key: 'lastLogin', label: 'সর্বশেষ লগইন', sortable: true, sort: 'lastLogin' }
      ],
      rows: [
        {
          id: 'te-1',
          label: 'রুবেল মিয়া',
          cells: [
            `<div class="row"><span class="avatar" aria-hidden="true">র</span><span class="t-body-sm t-semibold truncate" title="রুবেল মিয়া">রুবেল মিয়া</span></div>`,
            `rubel@example.com`,
            `শিক্ষক`,
            `২৮`,
            STATUS('সক্রিয়', 'success'),
            `২ ঘণ্টা আগে`
          ]
        },
        {
          id: 'te-2',
          label: 'সাবিনা ইয়াসমিন',
          cells: [
            `<div class="row"><span class="avatar" aria-hidden="true">স</span><span class="t-body-sm t-semibold truncate" title="সাবিনা ইয়াসমিন">সাবিনা ইয়াসমিন</span></div>`,
            `sabina@example.com`,
            `শিক্ষক`,
            `১৭`,
            STATUS('সক্রিয়', 'success'),
            `গতকাল`
          ]
        },
        {
          id: 'te-3',
          label: 'তারেক হোসেন',
          cells: [
            `<div class="row"><span class="avatar" aria-hidden="true">ত</span><span class="t-body-sm t-semibold truncate" title="তারেক হোসেন">তারেক হোসেন</span></div>`,
            `tarek@example.com`,
            `শিক্ষক`,
            `০`,
            STATUS('অনুমোদন অপেক্ষা', 'warning'),
            `২ দিন আগে`
          ]
        }
      ],
      entityForm: [
        f('teachers-f-email', 'ইমেইল', input('teachers-f-email', 'email', 'required'), 'সঠিক ও অনন্য ইমেইল চাই।'),
        f('teachers-f-name', 'নাম', input('teachers-f-name', 'text', 'required'), 'নাম ২-৫০ অক্ষর হতে হবে।'),
        f('teachers-f-role', 'ভূমিকা', select('teachers-f-role', [
          { t: 'শিক্ষক', sel: true },
          { t: 'অ্যাডমিন' }
        ]), 'ভূমিকা বাছাই ছাড়া খালি রাখা যাবে না।'),
        f('teachers-f-password', 'অস্থায়ী পাসওয়ার্ড', input('teachers-f-password', 'text', 'required minlength="8"'), 'সর্বনিম্ন ৮ অক্ষর ও কমপক্ষে ১টি সংখ্যা।')
      ].join('\n')
    })
  },

  /* 05 — curriculum tree (readonly: no leaf create) */
  {
    file: '05-curriculum.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'curriculum',
    title: 'পাঠ্যক্রম',
    ...listing({
      screen: 'curriculum',
      pageCount: '৫',
      heading: 'পাঠ্যক্রম',
      count: '৫ শ্রেণি · ৬১০ টি অধ্যায়',
      searchPlaceholder: 'বিষয় বা অধ্যায় খুঁজুন',
      createLabel: 'নতুন অধ্যায়',
      writable: true,
      defaultSort: 'classNo',
      filters: `              <span class="chip" data-testid="curriculum-filter-class">
                চতুর্থ শ্রেণি
                <button class="chip-remove" data-testid="curriculum-filter-class-remove" aria-label="ফিল্টার সরান">
                  ${I('x')}
                </button>
              </span>
              <span class="t-caption" data-testid="curriculum-note">ক্রম ও টপিক ট্যাগ সরাসরি সম্পাদনা করা যায়</span>`,
      rowActions: [
        { id: 'edit', label: 'সম্পাদনা' },
        { id: 'move', label: 'সরান' },
        { id: 'archive', label: 'সংরক্ষণ' }
      ],
      columns: [
        { key: 'classNo', label: 'শ্রেণি', sortable: true, sort: 'classNo' },
        { key: 'subject', label: 'বিষয়', sortable: true, sort: 'subjectSlug' },
        { key: 'chapter', label: 'অধ্যায়', sortable: true, sort: 'title' },
        { key: 'order', label: 'ক্রম', sortable: true, sort: 'orderNo' },
        { key: 'topics', label: 'টপিক' },
        { key: 'contents', label: 'কনটেন্ট' },
        { key: 'status', label: 'অবস্থা', sortable: true, sort: 'status' }
      ],
      rows: [
        {
          id: 'cu-1',
          label: 'চতুর্থ শ্রেণি গণিত অধ্যায় ৪',
          cells: [
            `চতুর্থ`,
            `গণিত`,
            `ভগ্নাংশ চিহ্নিতকরণ`,
            `<span class="num">৪</span>`,
            `ভগ্নাংশ, চিহ্নিতকরণ`,
            `৩ টি`,
            STATUS('প্রকাশিত', 'success')
          ]
        },
        {
          id: 'cu-2',
          label: 'চতুর্থ শ্রেণি গণিত অধ্যায় ৫',
          cells: [
            `চতুর্থ`,
            `গণিত`,
            `ভগ্নাংশের যোগ`,
            `<span class="num">৫</span>`,
            `ভগ্নাংশ, যোগ`,
            `২ টি`,
            STATUS('প্রকাশিত', 'success')
          ]
        },
        {
          id: 'cu-3',
          label: 'চতুর্থ শ্রেণি ইংরেজি অধ্যায় ৩',
          cells: [
            `চতুর্থ`,
            `ইংরেজি`,
            `Sentence Building`,
            `<span class="num">৩</span>`,
            `বাক্য গঠন`,
            `১ টি`,
            STATUS('খসড়া', null)
          ]
        }
      ],
      entityForm: [
        f('curriculum-f-class', 'শ্রেণি', select('curriculum-f-class', CLASSES)),
        f('curriculum-f-subject', 'বিষয়', select('curriculum-f-subject', [
          { t: 'গণিত', sel: true },
          { t: 'বাংলা' },
          { t: 'ইংরেজি' },
          { t: 'বিজ্ঞান' }
        ])),
        f('curriculum-f-title', 'অধ্যায়ের শিরোনাম', input('curriculum-f-title', 'text', 'required minlength="2" maxlength="120"')),
        f('curriculum-f-order', 'ক্রম', input('curriculum-f-order', 'number', 'value="1" min="1"'), 'একই বিষয়ে এই ক্রম আগেই ব্যবহৃত হলে সেভ হবে না।'),
        f('curriculum-f-topics', 'টপিক ট্যাগ', input('curriculum-f-topics', 'text', 'placeholder="ভগ্নাংশ, চিহ্নিতকরণ"'), 'কমপক্ষে ১টি ট্যাগ চাই।')
      ].join('\n')
    })
  },

  /* 06 — learning content (writable + upload + rights attestation) */
  {
    file: '06-content.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'content',
    title: 'কনটেন্ট',
    ...listing({
      screen: 'content',
      pageCount: '১৭',
      heading: 'কনটেন্ট',
      count: 'মোট ৪১২ টি · ১৮ টি খসড়া',
      searchPlaceholder: 'শিরোনাম বা অধ্যায় দিয়ে খুঁজুন',
      createLabel: 'নতুন কনটেন্ট',
      writable: true,
      defaultSort: 'createdAt',
      filters: `              <span class="chip" data-testid="content-filter-type">
                ভিডিও
                <button class="chip-remove" data-testid="content-filter-type-remove" aria-label="ফিল্টার সরান">
                  ${I('x')}
                </button>
              </span>
              <span class="t-caption" data-testid="content-result-count">১৩২ টি পাওয়া গেছে</span>`,
      rowActions: [
        { id: 'preview', label: 'প্রিভিউ' },
        { id: 'publish', label: 'প্রকাশ করুন' },
        { id: 'archive', label: 'সংরক্ষণ' },
        { id: 'delete', label: 'মুছুন', danger: true }
      ],
      columns: [
        { key: 'title', label: 'শিরোনাম', sortable: true, sort: 'title' },
        { key: 'kind', label: 'ধরন', sortable: true, sort: 'kind' },
        { key: 'type', label: 'ফরম্যাট', sortable: true, sort: 'type' },
        { key: 'chapter', label: 'অধ্যায়' },
        { key: 'topics', label: 'টপিক' },
        { key: 'size', label: 'আকার' },
        { key: 'rights', label: 'অধিকার প্রমাণিত' },
        { key: 'status', label: 'অবস্থা', sortable: true, sort: 'status' },
        { key: 'uploadedBy', label: 'আপলোডকারী' }
      ],
      rows: [
        {
          id: 'co-1',
          label: 'ভগ্নাংশ চিহ্নিতকরণ',
          cells: [
            `ভগ্নাংশ চিহ্নিতকরণ`,
            `লেসন`,
            `ভিডিও`,
            `গণিত · অধ্যায় ৪`,
            `ভগ্নাংশ, চিহ্নিতকরণ`,
            `১২৪ MB`,
            `হ্যাঁ · রুবেল মিয়া`,
            STATUS('প্রকাশিত', 'success'),
            `রুবেল মিয়া`
          ]
        },
        {
          id: 'co-2',
          label: 'বাক্য গঠন',
          cells: [
            `বাক্য গঠন — ভিডিও পাঠ`,
            `লেসন`,
            `ভিডিও`,
            `ইংরেজি · অধ্যায় ৩`,
            `বাক্য গঠন`,
            `৯৬ MB`,
            `হ্যাঁ · সাবিনা ইয়াসমিন`,
            STATUS('সংরক্ষিত', 'warning'),
            `সাবিনা ইয়াসমিন`
          ]
        },
        {
          id: 'co-3',
          label: 'উদ্ভিদের অংশ',
          cells: [
            `উদ্ভিদের অংশ`,
            `লেসন`,
            `ভিডিও`,
            `বিজ্ঞান · অধ্যায় ২`,
            `উদ্ভিদ, গাছের অংশ`,
            `৩৮৬ MB`,
            STATUS('নেই', 'warning'),
            STATUS('খসড়া', null),
            `তারেক হোসেন`
          ]
        }
      ],
      entityForm: [
        f('content-f-file', 'ফাইল', input('content-f-file', 'file'), 'ভিডিও সর্বোচ্চ ৫০০ MB, পিডিএফ সর্বোচ্চ ২৫ MB।'),
        f('content-f-title', 'শিরোনাম', input('content-f-title', 'text', 'required minlength="2" maxlength="120"')),
        f('content-f-kind', 'ধরন', select('content-f-kind', [
          { t: 'লেসন', sel: true },
          { t: 'রিটেক' }
        ])),
        f('content-f-chapter', 'অধ্যায়', select('content-f-chapter', [
          { t: 'গণিত · অধ্যায় ৪', sel: true },
          { t: 'গণিত · অধ্যায় ৫' },
          { t: 'বিজ্ঞান · অধ্যায় ২' }
        ])),
        f('content-f-topics', 'টপিক ট্যাগ', input('content-f-topics', 'text', 'placeholder="ভগ্নাংশ, চিহ্নিতকরণ"'), 'রিটেক কনটেন্টের জন্য কমপক্ষে ১টি ট্যাগ বাধ্যতামূলক।'),
        f('content-f-rights', 'অধিকার ঘোষণা', `<input class="input" id="content-f-rights" type="checkbox" data-testid="content-f-rights">`, 'এই কনটেন্টটি নিজে তৈরি বা ব্যবহারের অনুমতি আছে এই ঘোষণা দিচ্ছি।')
      ].join('\n')
    })
  },

  /* 07 — question bank (writable) */
  {
    file: '07-questions.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'questions',
    title: 'প্রশ্নব্যাংক',
    ...listing({
      screen: 'questions',
      pageCount: '১২৬',
      heading: 'প্রশ্নব্যাংক',
      count: 'মোট ৩,১৪০ টি প্রশ্ন',
      searchPlaceholder: 'প্রশ্নের অংশ দিয়ে খুঁজুন',
      createLabel: 'নতুন প্রশ্ন',
      writable: true,
      defaultSort: 'subjectSlug',
      rowActions: [
        { id: 'edit', label: 'সম্পাদনা' },
        { id: 'duplicate', label: 'ডুপ্লিকেট' },
        { id: 'retire', label: 'অবসর দিন', danger: true }
      ],
      columns: [
        { key: 'text', label: 'প্রশ্ন' },
        { key: 'subject', label: 'বিষয়', sortable: true, sort: 'subjectSlug' },
        { key: 'chapter', label: 'অধ্যায়', sortable: true, sort: 'chapterTitle' },
        { key: 'topics', label: 'টপিক' },
        { key: 'difficulty', label: 'কঠিনতা', sortable: true, sort: 'difficulty' },
        { key: 'type', label: 'ধরন', sortable: true, sort: 'type' },
        { key: 'uses', label: 'ব্যবহার' }
      ],
      rows: [
        {
          id: 'qu-1',
          label: 'নিচের কোন অংশটি অর্ধেকের চেয়ে বড়?',
          cells: [
            `নিচের কোন অংশটি অর্ধেকের চেয়ে বড়?`,
            `গণিত`,
            `ভগ্নাংশ চিহ্নিতকরণ`,
            `ভগ্নাংশ, তুলনা`,
            STATUS('২', null),
            `বহুনির্বাচনী`,
            `১৪`
          ]
        },
        {
          id: 'qu-2',
          label: '২৫ এর ২০% কত?',
          cells: [
            `২৫ এর ২০% কত?`,
            `গণিত`,
            `শতকরা`,
            `শতকরা, অনুপাত`,
            STATUS('১', null),
            `বহুনির্বাচনী`,
            `৩১`
          ]
        },
        {
          id: 'qu-3',
          label: 'Choose the correct sentence.',
          cells: [
            `Choose the correct sentence.`,
            `ইংরেজি`,
            `Sentence Building`,
            `বাক্য গঠন`,
            STATUS('৩', null),
            `বহুনির্বাচনী`,
            `০`
          ]
        }
      ],
      entityForm: [
        f('questions-f-text', 'প্রশ্ন', `<input class="input" id="questions-f-text" type="text" required data-testid="questions-f-text">`),
        f('questions-f-type', 'ধরন', select('questions-f-type', [
          { t: 'বহুনির্বাচনী', sel: true },
          { t: 'সত্য/মিথ্যা' }
        ])),
        f('questions-f-difficulty', 'কঠিনতা', select('questions-f-difficulty', [
          { t: '১' }, { t: '২', sel: true }, { t: '৩' }
        ]), 'অ্যাডাপটিভ কুইজ ২ নম্বর থেকে শুরু করে।'),
        f('questions-f-subject', 'বিষয়', select('questions-f-subject', [
          { t: 'গণিত', sel: true }, { t: 'বাংলা' }, { t: 'ইংরেজি' }, { t: 'বিজ্ঞান' }
        ]))
      ].join('\n')
    })
  },

  /* 08 — term exams (writable) */
  {
    file: '08-exams.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'exams',
    title: 'পরীক্ষা',
    ...listing({
      screen: 'exams',
      pageCount: '২',
      heading: 'পরীক্ষা',
      count: 'মোট ৩৪ টি · ৯ টি চলছে',
      searchPlaceholder: 'পরীক্ষার নাম দিয়ে খুঁজুন',
      createLabel: 'নতুন পরীক্ষা',
      writable: true,
      defaultSort: 'windowOpensAt',
      rowActions: [
        { id: 'edit', label: 'সম্পাদনা' },
        { id: 'preview', label: 'প্রিভিউ' },
        { id: 'close', label: 'বন্ধ করুন' }
      ],
      columns: [
        { key: 'title', label: 'পরীক্ষার নাম', sortable: true, sort: 'title' },
        { key: 'classNo', label: 'শ্রেণি', sortable: true, sort: 'classNo' },
        { key: 'window', label: 'সময়কাল', sortable: true, sort: 'windowOpensAt' },
        { key: 'pass', label: 'উত্তীর্ণ সীমা', sortable: true, sort: 'passMark' },
        { key: 'questions', label: 'প্রশ্ন' },
        { key: 'attempts', label: 'চেষ্টা' },
        { key: 'passRate', label: 'উত্তীর্ণের হার', sortable: true, sort: 'passRate' },
        { key: 'status', label: 'অবস্থা', sortable: true, sort: 'status' }
      ],
      rows: [
        {
          id: 'ex-1',
          label: '১ম সাময়িক পরীক্ষা — চতুর্থ শ্রেণি',
          cells: [
            `১ম সাময়িক পরীক্ষা`,
            `চতুর্থ`,
            `১০–১৬ অক্টোবর ২০২৬`,
            `৬০%`,
            `<span class="num">৫০</span>`,
            `<span class="num">১,১৮০</span>`,
            `<span class="num">৭২%</span>`,
            STATUS('শেষ', 'success')
          ]
        },
        {
          id: 'ex-2',
          label: 'অর্ধবার্ষিক পরীক্ষা — চতুর্থ শ্রেণি',
          cells: [
            `অর্ধবার্ষিক পরীক্ষা`,
            `চতুর্থ`,
            `১২–২০ ডিসেম্বর ২০২৬`,
            `৬০%`,
            `<span class="num">৮০</span>`,
            `<span class="num">০</span>`,
            `<span class="num">—</span>`,
            STATUS('আসন্ন', null)
          ]
        },
        {
          id: 'ex-3',
          label: 'বার্ষিক পরীক্ষা — চতুর্থ শ্রেণি',
          cells: [
            `বার্ষিক পরীক্ষা`,
            `চতুর্থ`,
            `০৫–১৫ মে ২০২৭`,
            `৬০%`,
            `<span class="num">১০০</span>`,
            `<span class="num">০</span>`,
            `<span class="num">—</span>`,
            STATUS('আসন্ন', null)
          ]
        }
      ],
      entityForm: [
        f('exams-f-title', 'পরীক্ষার নাম', input('exams-f-title', 'text', 'required minlength="3" maxlength="120"')),
        f('exams-f-class', 'শ্রেণি', select('exams-f-class', CLASSES)),
        f('exams-f-type', 'ধরন', select('exams-f-type', [
          { t: 'সাময়িক', sel: true }, { t: 'অর্ধবার্ষিক' }, { t: 'বার্ষিক' }
        ])),
        f('exams-f-opens', 'শুরুর সময়', input('exams-f-opens', 'datetime-local', 'value="2026-10-10T10:00"')),
        f('exams-f-closes', 'শেষের সময়', input('exams-f-closes', 'datetime-local', 'value="2026-10-16T17:00"'), 'শেষের সময় শুরুর পরে হতে হবে।'),
        f('exams-f-pass', 'উত্তীর্ণ সীমা (শতকরা)', input('exams-f-pass', 'number', 'value="60" min="1" max="100"'), '১-১০০ এর মধ্যে দিন। চলমান পরীক্ষার সীমা বদলানো যাবে না।'),
        f('exams-f-count', 'প্রশ্ন সংখ্যা', input('exams-f-count', 'number', 'value="50" min="10" max="100"'), '১০-১০০ এর মধ্যে হতে হবে।')
      ].join('\n')
    })
  },

  /* 09 — remedial assignments (writable, AI-queued + teacher override) */
  {
    file: '09-remedial.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'remedial',
    title: 'রিমিডিয়াল',
    ...listing({
      screen: 'remedial',
      pageCount: '৫',
      heading: 'রিমিডিয়াল',
      count: 'মোট ১২৪ টি · ১৮ টি তালিকাভুক্ত',
      searchPlaceholder: 'শিক্ষার্থী বা অধ্যায় দিয়ে খুঁজুন',
      createLabel: 'নিজে থেকে সুপারিশ',
      writable: true,
      defaultSort: 'assignedAt',
      rowActions: [
        { id: 'view', label: 'বিস্তারিত' },
        { id: 'reassign', label: 'পুনরায় নিয়োগ' },
        { id: 'complete', label: 'সম্পন্ন' },
        { id: 'dismiss', label: 'বাতিল', danger: true }
      ],
      // No source filter here: the rows deliberately mix AI-queued and
      // teacher-override entries, and a chip claiming one source only would
      // contradict both of them.
      filters: `              <span class="t-caption" data-testid="remedial-source-note">
                AI সুপারিশ ও শিক্ষকের নিজের সুপারিশ — দুটোই একসাথে
              </span>`,
      columns: [
        { key: 'caseNo', label: 'কেস নং', sortable: true, sort: 'caseNo' },
        { key: 'student', label: 'শিক্ষার্থী', sortable: true, sort: 'studentId' },
        { key: 'subject', label: 'বিষয়', sortable: true, sort: 'subjectSlug' },
        { key: 'topic', label: 'টপিক' },
        { key: 'source', label: 'উৎস', sortable: true, sort: 'source' },
        { key: 'assignedAt', label: 'নির্ধারিত', sortable: true, sort: 'assignedAt' },
        { key: 'status', label: 'অবস্থা', sortable: true, sort: 'status' }
      ],
      rows: [
        {
          id: 're-1',
          label: 'রাফিদ হাসান — ভগ্নাংশের তুলনা',
          cells: [
            `<span class="t-code">SB-CASE-202610-0124</span>`,
            `<div class="row"><span class="avatar" aria-hidden="true">র</span><span class="t-body-sm t-semibold truncate">রাফিদ হাসান</span></div>`,
            `গণিত`,
            `ভগ্নাংশের তুলনা`,
            STATUS('AI', null),
            `2026-10-17`,
            STATUS('তালিকাভুক্ত', null)
          ]
        },
        {
          id: 're-2',
          label: 'নাফিসা রহমান — বাক্য গঠন',
          cells: [
            `<span class="t-code">SB-CASE-202610-0119</span>`,
            `<div class="row"><span class="avatar" aria-hidden="true">ন</span><span class="t-body-sm t-semibold truncate">নাফিসা রহমান</span></div>`,
            `ইংরেজি`,
            `বাক্য গঠন`,
            STATUS('শিক্ষক', 'primary'),
            `2026-10-16`,
            STATUS('চলছে', 'primary')
          ]
        },
        {
          id: 're-3',
          label: 'তানভীর আহমেদ — উদ্ভিদের অংশ',
          cells: [
            `<span class="t-code">SB-CASE-202610-0102</span>`,
            `<div class="row"><span class="avatar" aria-hidden="true">ত</span><span class="t-body-sm t-semibold truncate">তানভীর আহমেদ</span></div>`,
            `বিজ্ঞান`,
            `উদ্ভিদের অংশ`,
            STATUS('AI', null),
            `2026-10-15`,
            STATUS('উর্ধ্বতনে পাঠানো', 'warning')
          ]
        }
      ],
      entityForm: [
        f('remedial-f-student', 'শিক্ষার্থী', select('remedial-f-student', [
          { t: 'রাফিদ হাসান', sel: true }, { t: 'নাফিসা রহমান' }, { t: 'তানভীর আহমেদ' }
        ])),
        f('remedial-f-weakness', 'দুর্বলতা', select('remedial-f-weakness', [
          { t: 'গণিত · ভগ্নাংশের তুলনা', sel: true }, { t: 'ইংরেজি · বাক্য গঠন' }
        ])),
        f('remedial-f-content', 'পাঠ', select('remedial-f-content', [
          { t: 'ভগ্নাংশের তুলনা — সহজ ব্যাখ্যা', sel: true }, { t: 'ভগ্নাংশের যোগ — অনুশীলন' }
        ]), 'শিক্ষকের লাইব্রেরি থেকে বেছে নেওয়া হয় — স্বয়ংক্রিয়ভাবে লেখা হয় না।')
      ].join('\n')
    })
  },

  /* 10 — subscriptions + payments/MFS (writable) */
  {
    file: '10-subscriptions.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'subscriptions',
    title: 'সাবস্ক্রিপশন',
    ...listing({
      screen: 'subs',
      pageCount: '১২',
      heading: 'সাবস্ক্রিপশন',
      count: 'মোট ২৯১ টি · ৩ টি পেমেন্ট সমস্যা',
      searchPlaceholder: 'পরিবারের কোড বা নাম দিয়ে খুঁজুন',
      createLabel: 'নিজে থেকে সক্রিয় করুন',
      writable: true,
      defaultSort: 'createdAt',
      rowActions: [
        { id: 'view', label: 'বিস্তারিত' },
        { id: 'refund', label: 'ফেরত দিন' },
        { id: 'reconcile', label: 'মিলিয়ে নিন' }
      ],
      // This screen is payment-shaped (§3.6 payment_no leads, Status is the
      // payment enum অপেক্ষমাণ / সফল / ব্যর্থ / ফেরত — not the subscription enum).
      columns: [
        { key: 'paymentNo', label: 'পেমেন্ট নং', sortable: true, sort: 'paymentNo' },
        { key: 'family', label: 'পরিবার', sortable: true, sort: 'familyCode' },
        { key: 'plan', label: 'প্ল্যান', sortable: true, sort: 'plan' },
        { key: 'amount', label: 'পরিমাণ', sortable: true, sort: 'amount' },
        { key: 'method', label: 'মাধ্যম', sortable: true, sort: 'method' },
        { key: 'status', label: 'অবস্থা', sortable: true, sort: 'status' },
        { key: 'gatewayRef', label: 'গেটওয়ে রেফ' },
        { key: 'createdAt', label: 'তৈরির সময়', sortable: true, sort: 'createdAt' }
      ],
      rows: [
        {
          id: 'su-1',
          label: 'SB-FAM-20260902-1041 পরিবার প্ল্যান',
          cells: [
            `<span class="t-code">SB-PAY-20260925-4181</span>`,
            `<span class="t-code">SB-FAM-20260902-1041</span> · ফারহানা রহমান`,
            `পরিবার প্ল্যান`,
            `৳৩৯৯`,
            `বিকাশ`,
            STATUS('সফল', 'success'),
            `<span class="t-code">TRX418112345</span>`,
            `2026-09-25`
          ]
        },
        {
          id: 'su-2',
          label: 'SB-FAM-20260815-0392 ক্র্যাশ প্যাক',
          cells: [
            `<span class="t-code">SB-PAY-20260910-3921</span>`,
            `<span class="t-code">SB-FAM-20260815-0392</span> · নাসরিন আক্তার`,
            `ক্র্যাশ প্যাক`,
            `৳১৪৯`,
            `নগদ`,
            STATUS('সফল', 'success'),
            `<span class="t-code">TRX392112987</span>`,
            `2026-09-10`
          ]
        },
        {
          id: 'su-3',
          label: 'SB-FAM-20260810-0177 পরিবার প্ল্যান',
          cells: [
            `<span class="t-code">SB-PAY-20261016-0177</span>`,
            `<span class="t-code">SB-FAM-20260810-0177</span> · মোঃ সাইফুল ইসলাম`,
            `পরিবার প্ল্যান`,
            `৳৩৯৯`,
            `আপায়`,
            STATUS('ব্যর্থ', 'error'),
            `<span class="t-code">TRX01771016</span>`,
            `2026-10-16`
          ]
        }
      ],
      entityForm: [
        f('subs-f-family', 'পরিবারের কোড', input('subs-f-family', 'text', 'required placeholder="SB-FAM-YYYYMMDD-NNNN"'), '§৩.৬ ফরম্যাট: SB-FAM-YYYYMMDD-NNNN'),
        f('subs-f-plan', 'প্ল্যান', select('subs-f-plan', [
          { t: 'পরিবার প্ল্যান', sel: true }, { t: 'ক্র্যাশ প্যাক' }, { t: 'নিঃশুল্ক ট্রায়াল' }
        ])),
        f('subs-f-months', 'মেয়াদ (মাস)', input('subs-f-months', 'number', 'value="1" min="1" max="12"')),
        f('subs-f-reason', 'কারণ', `<input class="input" id="subs-f-reason" type="text" data-testid="subs-f-reason">`, 'অডিট লগে কারণ ছাড়া বদল থাকবে না।')
      ].join('\n')
    })
  },

  /* 11 — notification templates (writable) */
  {
    file: '11-notifications.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'notifications',
    title: 'নোটিফিকেশন',
    ...listing({
      screen: 'notifs',
      pageCount: '১',
      heading: 'নোটিফিকেশন',
      count: '১৪ টি টেমপ্লেট',
      searchPlaceholder: 'টেমপ্লেটের কুই দিয়ে খুঁজুন',
      createLabel: 'নতুন টেমপ্লেট',
      writable: true,
      defaultSort: 'key',
      rowActions: [
        { id: 'edit', label: 'সম্পাদনা' },
        { id: 'test-send', label: 'পরীক্ষামূলক পাঠান' }
      ],
      // Reference page: a template's channel set is derived from where it is
      // subscribed, so PRD lists Channels/Category/Mandatory/delivery stats —
      // not a title or a language select (every template carries bn AND en).
      columns: [
        { key: 'key', label: 'কুই', sortable: true, sort: 'key' },
        { key: 'category', label: 'ক্যাটাগরি', sortable: true, sort: 'category' },
        { key: 'channels', label: 'চ্যানেল' },
        { key: 'mandatory', label: 'বাধ্যতামূলক' },
        { key: 'sent', label: '৩০ দিনে পাঠানো' },
        { key: 'failureRate', label: 'ব্যর্থতার হার', sortable: true, sort: 'failureRate' }
      ],
      rows: [
        {
          id: 'no-1',
          label: 'weakness.detected',
          cells: [
            `<span class="t-code">weakness.detected</span>`,
            `দুর্বলতা`,
            `অ্যাপ · ইমেইল`,
            STATUS('না', null),
            `<span class="num">৪,১২০</span>`,
            `<span class="num">০.৪%</span>`
          ]
        },
        {
          id: 'no-2',
          label: 'exam.upcoming',
          cells: [
            `<span class="t-code">exam.upcoming</span>`,
            `পরীক্ষা`,
            `অ্যাপ · ইমেইল`,
            STATUS('না', null),
            `<span class="num">২,৮৬০</span>`,
            `<span class="num">০.২%</span>`
          ]
        },
        {
          id: 'no-3',
          label: 'screentime.blocked',
          cells: [
            `<span class="t-code">screentime.blocked</span>`,
            `স্ক্রিন টাইম`,
            `অ্যাপ`,
            STATUS('হ্যাঁ', 'primary'),
            `<span class="num">১,১৪০</span>`,
            `<span class="num">০.০%</span>`
          ]
        }
      ],
      entityForm: [
        f('notifs-f-key', 'কুই', input('notifs-f-key', 'text', 'required'), 'লোয়ারকেস স্নেক_কেস এবং অনন্য — যেমন weakness.detected'),
        f('notifs-f-category', 'ক্যাটাগরি', select('notifs-f-category', [
          { t: 'দুর্বলতা', sel: true }, { t: 'পরীক্ষা' }, { t: 'স্ক্রিন টাইম' }, { t: 'সাবস্ক্রিপশন' }
        ])),
        f('notifs-f-bn-subject', 'বাংলা বিষয়', input('notifs-f-bn-subject', 'text', 'required'), 'দেহে ব্যবহৃত সব ভ্যারিয়েবল বিষয়েও থাকতে হবে।'),
        f('notifs-f-bn-body', 'বাংলা দেহ', `<textarea class="input" id="notifs-f-bn-body" rows="4" data-testid="notifs-f-bn-body">{{student_name}}-এর দুর্বলতা শনাক্ত হয়েছে।</textarea>`),
        f('notifs-f-en-subject', 'ইংরেজি বিষয়', input('notifs-f-en-subject', 'text', 'required'), 'বাংলা ও ইংরেজি ভ্যারিয়েবল একই হতে হবে।'),
        f('notifs-f-en-body', 'ইংরেজি দেহ', `<textarea class="input" id="notifs-f-en-body" rows="4" data-testid="notifs-f-en-body">{{student_name}} has a detected weakness.</textarea>`)
      ].join('\n')
    })
  },

  /* 12 — audit log (readonly: no create) */
  {
    file: '12-audit.html',
    app: 'frontend-admin-dashboard',
    layout: 'AdminLayout',
    activeSide: 'audit',
    title: 'অডিট লগ',
    ...listing({
      screen: 'audit',
      pageCount: '৭৩৭',
      heading: 'অডিট লগ',
      count: 'মোট ১৮,৪০২ টি ঘটনা',
      searchPlaceholder: 'অ্যাক্টর বা এন্টিটি দিয়ে খুঁজুন',
      writable: false,
      defaultSort: 'createdAt',
      // The rows deliberately mix entity types, so the page cannot claim a
      // subscription filter; the caption carries the read-only + masking rule.
      filters: `              <span class="t-caption" data-testid="audit-note">পড়ার অনুমতি মাত্র · কোনো সম্পাদনা সম্ভব নয় · পাসওয়ার্ড ও পিনের মান মুছে ফেলা হয়</span>`,
      columns: [
        { key: 'createdAt', label: 'সময়', sortable: true, sort: 'createdAt' },
        { key: 'actor', label: 'অ্যাক্টর', sortable: true, sort: 'actorId' },
        { key: 'action', label: 'কাজ', sortable: true, sort: 'action' },
        { key: 'entity', label: 'এন্টিটি', sortable: true, sort: 'entityType' },
        { key: 'change', label: 'পরিবর্তন' },
        { key: 'ip', label: 'আইপি' }
      ],
      rows: [
        {
          id: 'au-1',
          label: 'পেমেন্ট ব্যর্থ SB-FAM-20260810-0177',
          cells: [
            `2026-10-16 21:03 <span class="t-caption">· গতকাল</span>`,
            `<span class="t-code">system</span> · সিস্টেম`,
            `update`,
            `<span class="t-code">subscription</span> <span class="t-caption">· SB-SUB-20260801-0177</span>`,
            `স্থিতি: সক্রিয় → মেয়াদোত্তীর্ণ`,
            `<span class="t-code">103.21.58.14</span>`
          ]
        },
        {
          id: 'au-2',
          label: 'কনটেন্ট প্রকাশ',
          cells: [
            `2026-10-17 11:05 <span class="t-caption">· আজ</span>`,
            `রুবেল মিয়া · শিক্ষক`,
            `publish`,
            `<span class="t-code">learningContent</span> <span class="t-caption">· ভগ্নাংশ চিহ্নিতকরণ</span>`,
            `স্থিতি: খসড়া → প্রকাশিত`,
            `<span class="t-code">103.21.58.7</span>`
          ]
        },
        {
          id: 'au-3',
          label: 'লিডারবোর্ড প্রদর্শন বদল',
          cells: [
            `2026-10-16 20:41 <span class="t-caption">· গতকাল</span>`,
            `ফারহানা রহমান · অভিভাবক`,
            `update`,
            `<span class="t-code">student</span> <span class="t-caption">· রাফিদ হাসান</span>`,
            `লিডারবোর্ডে প্রদর্শন: লুকানো → দেখানো`,
            `<span class="t-code">119.30.40.5</span>`
          ]
        },
        {
          id: 'au-4',
          label: 'প্যারেন্ট পিন রিসেট',
          cells: [
            `2026-10-15 09:12 <span class="t-caption">· ২ দিন আগে</span>`,
            `অ্যাডমিন ১ · অ্যাডমিন`,
            `reset`,
            `<span class="t-code">user</span> <span class="t-caption">· SB-FAM-20260810-0177</span>`,
            `<span class="t-code">parentPinHash</span>: •••••••• → ••••••••`,
            `<span class="t-code">103.21.58.2</span>`
          ]
        }
      ]
    })
  }
];
