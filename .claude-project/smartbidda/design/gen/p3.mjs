// p3.mjs — parent analytics, screen-time, alerts, subscription, settings
export default [
  {
    file: '20-parent-analytics.html',
    app: 'frontend',
    layout: 'ParentLayout',
    activeTab: 'progress',
    title: 'বিশ্লেষণ',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .pa-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .pa-switch { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
  .pa-forecast { display: flex; flex-direction: column; gap: var(--space-md); }
  .pa-forecast-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .pa-forecast-bar { display: flex; align-items: baseline; gap: var(--space-sm); }
  .pa-suggest { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-md) 0; }
  .pa-suggest + .pa-suggest { border-top: var(--border-w) solid var(--c-hairline); }
  .pa-suggest-head { display: flex; gap: var(--space-sm); align-items: flex-start; }
  .pa-suggest-text { display: flex; flex-direction: column; gap: var(--space-xxs); min-width: 0; flex: 1; }
  .pa-period { display: flex; gap: var(--space-xs); flex-wrap: wrap; }
  .pa-why-row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .pa-disclaimer { display: flex; gap: var(--space-sm); align-items: flex-start; }
`,
    content: `
      <div class="pa-wrap">

        <div class="pa-switch" role="group" aria-label="সন্তান নির্বাচন">
          <button class="chip" aria-pressed="true" data-testid="pa-switch-rafid">রাফিদ</button>
          <button class="chip" aria-pressed="false" data-testid="pa-switch-mahin">মাহিন</button>
        </div>

        <div>
          <p class="t-title-lg" data-testid="pa-heading">বিশ্লেষণ</p>
          <p class="t-body-sm t-muted" data-testid="pa-sub">গত ৩০ দিন · ১৭ সেপ্টেম্বর – ১৭ অক্টোবর ২০২৬</p>
        </div>

        <section class="card" data-component="card" aria-labelledby="pa-forecast-label">
          <div class="pa-forecast">
            <div class="pa-forecast-head">
              <p class="t-body t-semibold" id="pa-forecast-label" data-testid="pa-forecast-label">পরীক্ষার প্রস্তুতি</p>
              <span class="badge badge-warning" data-testid="pa-forecast-badge">মাঝারি</span>
            </div>
            <div class="pa-forecast-bar">
              <span class="t-display-lg" data-testid="pa-forecast-value">৬৮%</span>
              <span class="t-body-sm t-muted" data-testid="pa-forecast-note">অনুমানিত ফলাফল</span>
            </div>
            <div class="progress" role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"
                 aria-label="প্রস্তুতির অনুমান">
              <div class="progress-fill is-warning" style="width:68%" data-testid="pa-forecast-bar"></div>
            </div>
            <p class="t-caption" data-testid="pa-forecast-detail">
              ইংরেজি ও বিজ্ঞানে নম্বর না বাড়লে বার্ষিকে কঠিন হবে
            </p>
            <p class="t-caption t-muted" data-testid="pa-forecast-confidence">নির্ভরযোগ্যতা ৮৬%</p>
          </div>
        </section>

        <section class="card" data-component="card" aria-labelledby="pa-why-label">
          <p class="t-body t-semibold" id="pa-why-label" data-testid="pa-why-label">কেন এই প্রাক্কলন</p>
          <div style="display:flex;flex-direction:column;gap:var(--space-sm);margin-top:var(--space-md)">
            <div class="pa-why-row">
              <span class="t-body-sm" data-testid="pa-why-item">গত ১৪ দিনের কুইজ স্কোর</span>
              <span class="t-body-sm t-bold" data-testid="pa-why-v">৪২ টি প্রশ্নের নামান্তর</span>
            </div>
            <div class="pa-why-row">
              <span class="t-body-sm" data-testid="pa-why-item">সম্পন্ন অধ্যায়</span>
              <span class="t-body-sm t-bold" data-testid="pa-why-v">৪৩ টি</span>
            </div>
            <div class="pa-why-row">
              <span class="t-body-sm" data-testid="pa-why-item">সম্পন্ন পরীক্ষা</span>
              <span class="t-body-sm t-bold" data-testid="pa-why-v">১ টি</span>
            </div>
            <div class="pa-why-row">
              <span class="t-body-sm" data-testid="pa-why-item">চলমান রিটেক পাঠ</span>
              <span class="t-body-sm t-bold" data-testid="pa-why-v">১ টি</span>
            </div>
          </div>
        </section>

        <section class="card" data-component="card" aria-labelledby="pa-suggest-label">
          <p class="t-body t-semibold" id="pa-suggest-label" data-testid="pa-suggest-label">সুপারিশ</p>

          <div class="pa-suggest" data-testid="pa-suggest-item">
            <div class="pa-suggest-head">
              <i data-lucide="refresh-cw" class="icon-md" aria-hidden="true"></i>
              <div class="pa-suggest-text">
                <p class="t-body-sm t-semibold" data-testid="pa-suggest-title">ইংরেজি বাক্য গঠন</p>
                <p class="t-caption" data-testid="pa-suggest-body">শিক্ষকের লাইব্রেরি থেকে একটি পাঠ নির্বাচন করা হয়েছে · ৫ মিনিট</p>
              </div>
              <span class="badge badge-warning" data-testid="pa-suggest-priority">জরুরি</span>
            </div>
            <a class="btn btn-secondary btn-sm" href="10-retake-class.html" data-testid="pa-suggest-cta">পাঠ দেখুন</a>
          </div>

          <div class="pa-suggest" data-testid="pa-suggest-item">
            <div class="pa-suggest-head">
              <i data-lucide="flask-conical" class="icon-md" aria-hidden="true"></i>
              <div class="pa-suggest-text">
                <p class="t-body-sm t-semibold" data-testid="pa-suggest-title">বিজ্ঞান · উদ্ভিদের অংশ</p>
                <p class="t-caption" data-testid="pa-suggest-body">এই অধ্যায়ের কুইজ এখনো দেওয়া হয়নি</p>
              </div>
              <span class="badge" data-testid="pa-suggest-priority">সাধারণ</span>
            </div>
            <a class="btn btn-secondary btn-sm" href="06-chapter-list.html" data-testid="pa-suggest-cta">অধ্যায় দেখুন</a>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="pa-activity-label">
          <div class="pa-forecast-head">
            <p class="t-body t-semibold" id="pa-activity-label" data-testid="pa-activity-label">দৈনিক কুইজ স্কোর</p>
            <div class="pa-period" role="group" aria-label="সময়কাল">
              <button class="chip" aria-pressed="false" data-testid="pa-period-7">৭ দিন</button>
              <button class="chip" aria-pressed="true" data-testid="pa-period-14">১৪ দিন</button>
              <button class="chip" aria-pressed="false" data-testid="pa-period-30">৩০ দিন</button>
            </div>
          </div>
          <div class="chart" style="margin-top:var(--space-md)" data-component="chart" role="img"
               aria-label="গত ১৪ দিনের দৈনিক কুইজ স্কোর">
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৫৪</span><span class="bar" style="height:54px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">৪</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৬২</span><span class="bar" style="height:62px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">৫</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৪৯</span><span class="bar" style="height:49px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">৬</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৫৮</span><span class="bar" style="height:58px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">৭</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৬৬</span><span class="bar" style="height:66px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">৮</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৬১</span><span class="bar" style="height:61px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">৯</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৭০</span><span class="bar" style="height:70px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">১০</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৫৯</span><span class="bar" style="height:59px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">১১</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৬৩</span><span class="bar" style="height:63px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">১২</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৬৮</span><span class="bar" style="height:68px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">১৩</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৫৭</span><span class="bar" style="height:57px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">১৪</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৭২</span><span class="bar" style="height:72px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">১৫</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৬৫</span><span class="bar" style="height:65px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">১৬</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="pa-day-value">৬৯</span><span class="bar" style="height:69px" data-testid="pa-day-bar"></span><span class="t-caption bar-label" data-testid="pa-day">আজ</span></div>
          </div>
          <p class="t-caption" style="margin-top:var(--space-sm)" data-testid="pa-activity-unit">
            অক্টোবর · শতাংশ (%) · বারে মাউস রাখলে তারিখ ও নম্বর দেখাবে
          </p>
        </section>

        <div class="card" data-component="card">
          <div class="pa-disclaimer">
            <i data-lucide="info" class="icon-md" aria-hidden="true"></i>
            <p class="t-caption" data-testid="pa-disclaimer">
              এই অনুমান সন্তানের কুইজ ও পরীক্ষার হিসাবে তৈরি। শিক্ষকের মতামতের সাথে মিলিয়ে দেখুন।
            </p>
          </div>
        </div>

      </div>`
  },

  {
    file: '21-screen-time.html',
    app: 'frontend',
    layout: 'ParentLayout',
    activeTab: 'screentime',
    title: 'স্ক্রিন টাইম',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .st-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .st-switch { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
  .st-now { display: flex; flex-direction: column; gap: var(--space-md); }
  .st-now-head { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-md); }
  .st-limit { display: flex; flex-direction: column; gap: var(--space-md); }
  .st-limit-values { display: flex; justify-content: space-between; }
  .st-presets { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
  .st-actions { display: flex; flex-direction: column; gap: var(--space-md); }
    .st-blocked { display: flex; gap: var(--space-sm); align-items: flex-start; }
`,
    content: `
      <div class="st-wrap">

        <div class="st-switch" role="group" aria-label="সন্তান নির্বাচন">
          <button class="chip" aria-pressed="true" data-testid="st-switch-rafid">রাফিদ</button>
          <button class="chip" aria-pressed="false" data-testid="st-switch-mahin">মাহিন</button>
        </div>

        <section class="card" data-component="card" aria-labelledby="st-now-label">
          <div class="st-now">
            <div class="st-now-head">
              <p class="t-body t-semibold" id="st-now-label" data-testid="st-now-label">আজ ব্যবহার হয়েছে</p>
              <span class="badge badge-success" data-testid="st-now-status">সীমার মধ্যে</span>
            </div>
            <p class="t-display-lg" data-testid="st-now-value">২৪ মিনিট</p>
            <div class="progress" role="progressbar" aria-valuenow="24" aria-valuemin="0" aria-valuemax="60"
                 aria-label="আজকের ব্যবহার">
              <div class="progress-fill" style="width:40%" data-testid="st-now-bar"></div>
            </div>
            <p class="t-caption" data-testid="st-now-note">দৈনিক সীমা ৬০ মিনিট · আরও ৩৬ মিনিট বাকি</p>
          </div>
        </section>

        <section class="card" data-component="card" aria-labelledby="st-limit-label">
          <div class="st-limit">
            <div class="row" style="justify-content:space-between">
              <p class="t-body t-semibold" id="st-limit-label" data-testid="st-limit-label">দৈনিক সীমা</p>
              <span class="t-body-sm t-bold" data-testid="st-limit-value">৬০ মিনিট</span>
            </div>
            <input class="input" type="range" min="0" max="240" step="15" value="60"
                   aria-label="দৈনিক স্ক্রিন টাইম সীমা" data-testid="st-limit-slider">
            <div class="st-limit-values">
              <span class="t-caption" data-testid="st-limit-min">০ মিনিট</span>
              <span class="t-caption" data-testid="st-limit-max">২৪০ মিনিট</span>
            </div>
            <div class="st-presets" role="group" aria-label="দ্রুত সীমা">
              <button class="chip" data-testid="st-preset-30">৩০ মিনিট</button>
              <button class="chip" aria-pressed="true" data-testid="st-preset-60">৬০ মিনিট</button>
              <button class="chip" data-testid="st-preset-90">৯০ মিনিট</button>
              <button class="chip" data-testid="st-preset-none">কোনো সীমা নেই</button>
            </div>
            <p class="t-caption" data-testid="st-limit-help">
              সীমা শেষ হলে অ্যাপ বন্ধ হয়ে যাবে — শিক্ষার কনটেন্ট ছাড়া কিছুই দেখা যাবে না।
            </p>
          </div>
        </section>

        <section class="card" data-component="card" aria-labelledby="st-usage-label">
          <p class="t-body t-semibold" id="st-usage-label" style="margin-bottom:var(--space-md)" data-testid="st-usage-label">গত ৭ দিন</p>
          <div class="chart" data-component="chart" role="img"
               aria-label="গত ৭ দিনের স্ক্রিন টাইম">
            <div class="chart-col"><span class="t-caption" data-testid="st-week-value">৩২</span><span class="bar" style="height:45px" data-testid="st-week-bar"></span><span class="t-caption bar-label" data-testid="st-week-day">রবি</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="st-week-value">৪৮</span><span class="bar" style="height:67px" data-testid="st-week-bar"></span><span class="t-caption bar-label" data-testid="st-week-day">সোম</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="st-week-value">৫৬</span><span class="bar" style="height:78px" data-testid="st-week-bar"></span><span class="t-caption bar-label" data-testid="st-week-day">মঙ্গল</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="st-week-value">৩৮</span><span class="bar" style="height:53px" data-testid="st-week-bar"></span><span class="t-caption bar-label" data-testid="st-week-day">বুধ</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="st-week-value">৬০</span><span class="bar" style="height:84px" data-testid="st-week-bar"></span><span class="t-caption bar-label" data-testid="st-week-day">বৃহঃ</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="st-week-value">৪৮</span><span class="bar" style="height:67px" data-testid="st-week-bar"></span><span class="t-caption bar-label" data-testid="st-week-day">শুক্র</span></div>
            <div class="chart-col"><span class="t-caption" data-testid="st-week-value">২৪</span><span class="bar" style="height:34px" data-testid="st-week-bar"></span><span class="t-caption bar-label" data-testid="st-week-day">আজ</span></div>
          </div>
        </section>

        <section class="card" data-component="card" aria-labelledby="st-ext-label">
          <div class="row">
            <i data-lucide="clock-4" class="icon-md" aria-hidden="true"></i>
            <div>
              <p class="t-body t-semibold" id="st-ext-label" data-testid="st-ext-label">অতিরিক্ত সময় দিন</p>
              <p class="t-caption" data-testid="st-ext-body">১৫ মিনিট · একবারই দেওয়া যাবে</p>
            </div>
          </div>
          <button class="btn btn-secondary" style="width:100%;margin-top:var(--space-md)" data-testid="st-ext-cta">
            ১৫ মিনিট বাড়াও
          </button>
        </section>

        <section class="card" data-component="card" aria-labelledby="st-blocked-label">
          <div class="st-blocked">
            <i data-lucide="shield-check" class="icon-md" aria-hidden="true"></i>
            <div>
              <p class="t-body t-semibold" id="st-blocked-label" data-testid="st-blocked-label">ব্লকের অবস্থা</p>
              <p class="t-caption" data-testid="st-blocked-note">
                আজ সীমা ৬০ মিনিট — এখন ২৪ মিনিট হয়েছে, তাই ব্লক করা নেই। সীমা পূর্ণ হলে
                সার্ভার থেকেই বন্ধ হয়ে যায় এবং দেখায় — সন্তান এখন ব্লক করা আছে।
              </p>
            </div>
          </div>
        </section>

      </div>`
  },

  {
    file: '22-alerts.html',
    app: 'frontend',
    layout: 'ParentLayout',
    activeTab: 'alerts',
    title: 'অ্যালার্ট',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .al-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .al-filters { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
  .al-item { display: flex; gap: var(--space-md); align-items: flex-start; padding: var(--space-md) 0; }
  .al-item + .al-item { border-top: var(--border-w) solid var(--c-hairline); }
  .al-icon {
    display: grid; place-items: center; flex-shrink: 0;
    width: 40px; height: 40px;
    background: var(--c-surface-soft);
    border-radius: var(--radius-pill);
  }
  .al-text { display: flex; flex-direction: column; gap: var(--space-xxs); min-width: 0; flex: 1; }
  .al-head { display: flex; align-items: center; gap: var(--space-sm); }
  .al-prefs { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); padding: var(--space-md) 0; }
  .al-prefs + .al-prefs { border-top: var(--border-w) solid var(--c-hairline); }
  .al-prefs-text { display: flex; flex-direction: column; gap: var(--space-xxs); min-width: 0; }
`,
    content: `
      <div class="al-wrap">

        <div>
          <div class="al-head">
            <p class="t-title-lg" data-testid="al-heading">অ্যালার্ট</p>
            <span class="badge badge-primary" data-testid="al-unread">৩ টি নতুন</span>
          </div>
          <p class="t-body-sm t-muted" data-testid="al-sub">শেষ ৭ দিন · ১২ টি বার্তা</p>
        </div>

        <div class="al-filters" role="group" aria-label="বার্তার ধরন">
          <button class="chip" aria-pressed="true" data-testid="al-filter-all">সব</button>
          <button class="chip" aria-pressed="false" data-testid="al-filter-result">ফলাফল</button>
          <button class="chip" aria-pressed="false" data-testid="al-filter-weakness">দুর্বলতা</button>
          <button class="chip" aria-pressed="false" data-testid="al-filter-payment">পেমেন্ট</button>
          <button class="chip" aria-pressed="false" data-testid="al-filter-other">অন্যান্য</button>
        </div>

        <button class="btn btn-secondary btn-sm" type="button" data-testid="al-markall">সব পড়া হয়েছে</button>

        <section class="card" data-component="list" aria-labelledby="al-list-label">
          <p class="t-body t-semibold" id="al-list-label" style="margin-bottom:var(--space-sm)" data-testid="al-list-label">বার্তা</p>

          <div class="al-item" data-testid="al-item">
            <span class="al-icon"><i data-lucide="target" class="icon-md" aria-hidden="true"></i></span>
            <div class="al-text">
              <div class="al-head">
                <span class="t-body-sm t-semibold" data-testid="al-title">ইংরেজিতে দুর্বলতা</span>
                <span class="badge badge-warning" data-testid="al-badge">দুর্বলতা</span>
                <span data-testid="al-unread-dot" aria-hidden="true" style="width:8px;height:8px;border-radius:var(--radius-pill);background:var(--c-primary);flex-shrink:0;margin-left:auto"></span>
              </div>
              <p class="t-caption" data-testid="al-body">বাক্য গঠনে ২ বার ভুল · রিমিডিয়াল পাঠ সুপারিশ করা হয়েছে</p>
              <p class="t-caption" data-testid="al-meta">আজ · রাফিদ</p>
            </div>
          </div>

          <div class="al-item" data-testid="al-item">
            <span class="al-icon"><i data-lucide="timer" class="icon-md" aria-hidden="true"></i></span>
            <div class="al-text">
              <div class="al-head">
                <span class="t-body-sm t-semibold" data-testid="al-title">স্ক্রিন টাইম শেষ</span>
                <span class="badge" data-testid="al-badge">অন্যান্য</span>
                <span data-testid="al-unread-dot" aria-hidden="true" style="width:8px;height:8px;border-radius:var(--radius-pill);background:var(--c-primary);flex-shrink:0;margin-left:auto"></span>
              </div>
              <p class="t-caption" data-testid="al-body">বৃহস্পতিবার ৬০ মিনিট পূর্ণ হয়েছে</p>
              <p class="t-caption" data-testid="al-meta">১৫ অক্টোবর · রাফিদ</p>
            </div>
          </div>

          <div class="al-item" data-testid="al-item">
            <span class="al-icon"><i data-lucide="file-text" class="icon-md" aria-hidden="true"></i></span>
            <div class="al-text">
              <div class="al-head">
                <span class="t-body-sm t-semibold" data-testid="al-title">১ম সাময়িক পরীক্ষা</span>
                <span class="badge badge-primary" data-testid="al-badge">ফলাফল</span>
                <span data-testid="al-unread-dot" aria-hidden="true" style="width:8px;height:8px;border-radius:var(--radius-pill);background:var(--c-primary);flex-shrink:0;margin-left:auto"></span>
              </div>
              <p class="t-caption" data-testid="al-body">১০–১৬ অক্টোবর · ফলাফল প্রকাশিত</p>
              <p class="t-caption" data-testid="al-meta">১৪ অক্টোবর · সকল সন্তান</p>
            </div>
          </div>
        </section>

        <button class="btn btn-secondary" type="button" style="width:100%" data-testid="al-more">আরও দেখুন</button>


      </div>`
  },

  {
    file: '23-subscription.html',
    app: 'frontend',
    layout: 'ParentLayout',
    activeTab: 'dashboard',
    title: 'সাবস্ক্রিপশন',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .sb-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .sb-plan { display: flex; flex-direction: column; gap: var(--space-md); }
  .sb-plan-head { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-md); }
  .sb-price { display: flex; align-items: baseline; gap: var(--space-sm); }
  .sb-features { display: flex; flex-direction: column; gap: var(--space-sm); }
  .sb-feature { display: flex; gap: var(--space-sm); align-items: flex-start; }
  .sb-packs { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-md); }
  @media (max-width: 600px) { .sb-packs { grid-template-columns: 1fr; } }
  .sb-pack { display: flex; flex-direction: column; gap: var(--space-sm); }
  .sb-methods { display: flex; flex-direction: column; gap: var(--space-sm); }
  .sb-method { display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md) 0; }
  .sb-method + .sb-method { border-top: var(--border-w) solid var(--c-hairline); }
  .sb-method-mark {
    display: grid; place-items: center; flex-shrink: 0;
    width: 44px; height: 44px;
    background: var(--c-surface-soft);
    border-radius: var(--radius-md);
  }
  .sb-method-text { display: flex; flex-direction: column; gap: var(--space-xxs); flex: 1; min-width: 0; }
  .sb-invoice { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); padding: var(--space-md) 0; }
  .sb-invoice + .sb-invoice { border-top: var(--border-w) solid var(--c-hairline); }
`,
    content: `
      <div class="sb-wrap">

        <section class="card" data-component="card" aria-labelledby="sb-current-label">
          <div class="sb-plan">
            <div class="sb-plan-head">
              <div>
                <span class="badge badge-success" data-testid="sb-status">সক্রিয়</span>
                <p class="t-title-md" id="sb-current-label" style="margin-top:var(--space-xs)" data-testid="sb-plan-name">পরিবার প্ল্যান</p>
              </div>
              <span class="t-caption" data-testid="sb-plan-expiry">২৫ অক্টোবর পর্যন্ত</span>
            </div>
            <div class="sb-price">
              <span class="t-display-md" data-testid="sb-price">৳৩৯৯</span>
              <span class="t-body-sm t-muted" data-testid="sb-price-cycle">/ মাস</span>
            </div>
            <div class="progress" role="progressbar" aria-valuenow="22" aria-valuemin="0" aria-valuemax="30"
                 aria-label="চলতি মাসের বাকি দিন">
              <div class="progress-fill" style="width:73%" data-testid="sb-cycle-bar"></div>
            </div>
            <p class="t-caption" data-testid="sb-cycle-note">৩০ দিনের মধ্যে ২২ দিন শেষ · স্বয়ংক্রিয় নবায়ন</p>
            <p class="t-caption t-muted" data-testid="sb-sub-no">সাবস্ক্রিপশন নং <span class="t-code">SB-SUB-20260901-1041</span></p>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="sb-included-label">
          <p class="t-body t-semibold" id="sb-included-label" style="margin-bottom:var(--space-md)" data-testid="sb-included-label">যা যা থাকছে</p>
          <div class="sb-features">
            <div class="sb-feature">
              <i data-lucide="check-circle-2" class="icon-sm" aria-hidden="true"></i>
              <span class="t-body-sm" data-testid="sb-feature">সর্বোচ্চ ৩ জন সন্তান</span>
            </div>
            <div class="sb-feature">
              <i data-lucide="check-circle-2" class="icon-sm" aria-hidden="true"></i>
              <span class="t-body-sm" data-testid="sb-feature">সব বিষয় ও পরীক্ষা</span>
            </div>
            <div class="sb-feature">
              <i data-lucide="check-circle-2" class="icon-sm" aria-hidden="true"></i>
              <span class="t-body-sm" data-testid="sb-feature">বিশ্লেষণ ও রিমিডিয়াল পাঠ</span>
            </div>
            <div class="sb-feature">
              <i data-lucide="check-circle-2" class="icon-sm" aria-hidden="true"></i>
              <span class="t-body-sm" data-testid="sb-feature">বাংলা ভয়েস সহ পাঠ</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="sb-plans-label">
          <p class="t-body t-semibold" id="sb-plans-label" style="margin-bottom:var(--space-md)" data-testid="sb-plans-label">প্ল্যান বেছে নিন</p>
          <div class="sb-packs">
            <article class="card sb-pack" data-component="card" data-testid="sb-plan">
              <span class="badge badge-primary" data-testid="sb-plan-tag">নির্বাচিত</span>
              <p class="t-body t-semibold" data-testid="sb-plan-name">মাসিক</p>
              <p class="t-display-sm" data-testid="sb-plan-price">৳৩৯৯</p>
              <p class="t-caption" data-testid="sb-plan-body">প্রতি মাসে · যেকোনো সময় বাতিল করা যায়</p>
            </article>
            <article class="card sb-pack" data-component="card" data-testid="sb-plan">
              <span class="badge badge-warning" data-testid="sb-plan-tag">২৭% সাশ্রয়</span>
              <p class="t-body t-semibold" data-testid="sb-plan-name">বার্ষিক</p>
              <p class="t-display-sm" data-testid="sb-plan-price">৳৩,৪৯৯</p>
              <p class="t-caption" data-testid="sb-plan-body">১২ মাস · ৳১,২৮৯ কম দিতে হবে</p>
            </article>
          </div>
        </section>

        <section aria-labelledby="sb-packs-label">
          <p class="t-body t-semibold" id="sb-packs-label" style="margin-bottom:var(--space-md)" data-testid="sb-packs-label">ক্র্যাশ প্যাক</p>
          <div class="sb-packs">
            <article class="card sb-pack" data-component="card" data-testid="sb-pack">
              <span class="badge badge-primary" data-testid="sb-pack-tag">পরীক্ষার আগে</span>
              <p class="t-body t-semibold" data-testid="sb-pack-name">১ম সাময়িক প্যাক</p>
              <p class="t-display-sm" data-testid="sb-pack-price">৳১৪৯</p>
              <p class="t-caption" data-testid="sb-pack-body">১৫ দিন · প্রতি বিষয়ে ২ টি বিশেষ পাঠ</p>
              <button class="btn btn-primary btn-sm" data-testid="sb-pack-cta">কিনুন</button>
            </article>
            <article class="card sb-pack" data-component="card" data-testid="sb-pack">
              <span class="badge" data-testid="sb-pack-tag">বার্ষিক</span>
              <p class="t-body t-semibold" data-testid="sb-pack-name">বার্ষিক ক্র্যাশ প্যাক</p>
              <p class="t-display-sm" data-testid="sb-pack-price">৳২৯৯</p>
              <p class="t-caption" data-testid="sb-pack-body">৩০ দিন · সব বিষয়ের পুনরাবৃত্তি</p>
              <button class="btn btn-secondary btn-sm" data-testid="sb-pack-cta">কিনুন</button>
            </article>
          </div>
        </section>

        <section class="card" data-component="card" aria-labelledby="sb-methods-label">
          <p class="t-body t-semibold" id="sb-methods-label" style="margin-bottom:var(--space-sm)" data-testid="sb-methods-label">পেমেন্ট মাধ্যম</p>
          <div class="sb-methods">
            <div class="sb-method">
              <span class="sb-method-mark"><i data-lucide="smartphone" class="icon-md" aria-hidden="true"></i></span>
              <div class="sb-method-text">
                <span class="t-body-sm t-semibold" data-testid="sb-method-name">বিকাশ</span>
                <span class="t-caption" data-testid="sb-method-help">নম্বর দিয়ে পেমেন্ট</span>
              </div>
              <button class="btn btn-ghost btn-sm" aria-pressed="true" data-testid="sb-method-cta">নির্বাচিত</button>
            </div>
            <div class="sb-method">
              <span class="sb-method-mark"><i data-lucide="smartphone" class="icon-md" aria-hidden="true"></i></span>
              <div class="sb-method-text">
                <span class="t-body-sm t-semibold" data-testid="sb-method-name">নগদ</span>
                <span class="t-caption" data-testid="sb-method-help">নম্বর দিয়ে পেমেন্ট</span>
              </div>
              <button class="btn btn-ghost btn-sm" data-testid="sb-method-cta">বেছে নিন</button>
            </div>
            <div class="sb-method">
              <span class="sb-method-mark"><i data-lucide="smartphone" class="icon-md" aria-hidden="true"></i></span>
              <div class="sb-method-text">
                <span class="t-body-sm t-semibold" data-testid="sb-method-name">আপায়</span>
                <span class="t-caption" data-testid="sb-method-help">মোবাইল ব্যাংকিং</span>
              </div>
              <button class="btn btn-ghost btn-sm" data-testid="sb-method-cta">বেছে নিন</button>
            </div>
            <div class="sb-method">
              <span class="sb-method-mark"><i data-lucide="credit-card" class="icon-md" aria-hidden="true"></i></span>
              <div class="sb-method-text">
                <span class="t-body-sm t-semibold" data-testid="sb-method-name">কার্ড</span>
                <span class="t-caption" data-testid="sb-method-help">ভিসা / মাস্টারকার্ড</span>
              </div>
              <button class="btn btn-ghost btn-sm" data-testid="sb-method-cta">বেছে নিন</button>
            </div>
          </div>
          <p class="t-caption" style="margin-top:var(--space-sm)" data-testid="sb-method-note">
            সব লেনদেন SSLCommerz দিয়ে হয় — বিকাশ, নগদ, আপায় ও কার্ড গ্রহণযোগ্য।
          </p>
        </section>

        <!-- PRD L2734 Pay button: পেমেন্ট করুন (৳{n}); price comes from .plans[] (L2768) -->
        <button class="btn btn-primary" style="width:100%;margin-top:var(--space-lg)" data-testid="sb-pay">
          পেমেন্ট করুন (৳৩৯৯)
          <i data-lucide="arrow-right"></i>
        </button>

        <section class="card" data-component="list" aria-labelledby="sb-invoices-label">
          <p class="t-body t-semibold" id="sb-invoices-label" style="margin-bottom:var(--space-sm)" data-testid="sb-invoices-label">পেমেন্ট ইতিহাস</p>
          <div class="sb-invoice" data-testid="sb-invoice">
            <div>
              <p class="t-body-sm" data-testid="sb-invoice-title">পরিবার প্ল্যান · ১ মাস</p>
              <p class="t-caption" data-testid="sb-invoice-meta">২৫ সেপ্টেম্বর ২০২৬ · বিকাশ</p>
              <p class="t-caption t-muted" data-testid="sb-invoice-no">পেমেন্ট নং <span class="t-code">SB-PAY-20260925-4181</span></p>
            </div>
            <div style="text-align:right">
              <p class="t-body-sm t-bold" data-testid="sb-invoice-amount">৳৩৯৯</p>
              <span class="badge badge-success" data-testid="sb-invoice-status">সফল</span>
            </div>
          </div>
        </section>

      </div>`
  },

  {
    file: '24-parent-settings.html',
    app: 'frontend',
    layout: 'ParentLayout',
    activeTab: 'settings',
    title: 'সেটিংস',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .pset-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .pset-row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); padding: var(--space-md) 0; }
  .pset-row + .pset-row { border-top: var(--border-w) solid var(--c-hairline); }
  .pset-left { display: flex; align-items: center; gap: var(--space-md); min-width: 0; }
  .pset-text { display: flex; flex-direction: column; gap: var(--space-xxs); min-width: 0; }
  .pset-child { display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md) 0; }
  .pset-child + .pset-child { border-top: var(--border-w) solid var(--c-hairline); }
  .pset-child-text { display: flex; flex-direction: column; gap: var(--space-xxs); min-width: 0; flex: 1; }
  .pset-add { display: flex; align-items: center; justify-content: center; gap: var(--space-sm); width: 100%; }
`,
    content: `
      <div class="pset-wrap">

        <section class="card" data-component="card" aria-labelledby="pset-account-label">
          <div class="pset-row">
            <div class="pset-left">
              <span class="avatar avatar-lg" aria-hidden="true">ফ</span>
              <div class="pset-text">
                <span class="t-body t-semibold" data-testid="pset-account-name">ফারহানা রহমান</span>
                <span class="t-caption" data-testid="pset-account-email"><span class="t-code">SB-FAM-20260902-1041</span> · farhana@example.com</span>
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" data-testid="pset-account-edit">সম্পাদনা</button>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="pset-children-label">
          <p class="t-body t-semibold" id="pset-children-label" style="margin-bottom:var(--space-sm)" data-testid="pset-children-label">যুক্ত সন্তান</p>

          <div class="pset-child" data-testid="pset-child">
            <span class="avatar" aria-hidden="true">র</span>
            <div class="pset-child-text">
              <span class="t-body-sm t-semibold" data-testid="pset-child-name">রাফিদ হাসান</span>
              <span class="t-caption" data-testid="pset-child-meta">চতুর্থ শ্রেণি</span>
            </div>
            <button class="btn btn-ghost btn-sm" data-testid="pset-child-remove" aria-label="রাফিদ হাসানকে মুছুন">
              <i data-lucide="trash-2" class="icon-md" aria-hidden="true"></i>
            </button>
          </div>

          <div class="pset-child" data-testid="pset-child">
            <span class="avatar" aria-hidden="true">ম</span>
            <div class="pset-child-text">
              <span class="t-body-sm t-semibold" data-testid="pset-child-name">মাহিন হাসান</span>
              <span class="t-caption" data-testid="pset-child-meta">দ্বিতীয় শ্রেণি</span>
            </div>
            <button class="btn btn-ghost btn-sm" data-testid="pset-child-remove" aria-label="মাহিন হাসানকে মুছুন">
              <i data-lucide="trash-2" class="icon-md" aria-hidden="true"></i>
            </button>
          </div>

          <button class="btn btn-secondary pset-add" style="margin-top:var(--space-md)" data-testid="pset-child-add">
            <i data-lucide="plus"></i>
            সন্তান যোগ করো
          </button>
          <p class="t-caption" style="margin-top:var(--space-sm)" data-testid="pset-child-quota">
            ২ / ৩ ব্যবহৃত · সর্বোচ্চ ৩ জন সন্তান যোগ করা যায়
          </p>
        </section>

        <section class="card" data-component="list" aria-labelledby="pset-security-label">
          <p class="t-body t-semibold" id="pset-security-label" style="margin-bottom:var(--space-sm)" data-testid="pset-security-label">নিরাপত্তা</p>

          <div class="pset-row">
            <div class="pset-left">
              <i data-lucide="key-round" class="icon-md" aria-hidden="true"></i>
              <div class="pset-text">
                <span class="t-body-sm t-semibold" data-testid="pset-pin-title">৬ সংখ্যার পিন</span>
                <span class="t-caption" data-testid="pset-pin-help">৩ ধাপ: বর্তমান → নতুন → নিশ্চিত</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" data-testid="pset-pin-change">বদলান</button>
          </div>

          </section>

        <section class="card" data-component="list" aria-labelledby="pset-privacy-label">
          <p class="t-body t-semibold" id="pset-privacy-label" style="margin-bottom:var(--space-sm)" data-testid="pset-privacy-label">লিডারবোর্ড প্রদর্শন</p>
          <p class="t-caption" data-testid="pset-privacy-help">প্রতি সন্তান আলাদাকরে · ডিফল্টে নাম লুকানো থাকে</p>

          <div class="pset-row">
            <div class="pset-left">
              <i data-lucide="eye-off" class="icon-md" aria-hidden="true"></i>
              <div class="pset-text">
                <span class="t-body-sm t-semibold" data-testid="pset-board-child">রাফিদ হাসান</span>
                <span class="t-caption" data-testid="pset-board-help">লিডারবোর্ডে নাম লুকান</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" aria-pressed="false" data-testid="pset-board-toggle">বন্ধ</button>
          </div>

          <div class="pset-row">
            <div class="pset-left">
              <i data-lucide="eye-off" class="icon-md" aria-hidden="true"></i>
              <div class="pset-text">
                <span class="t-body-sm t-semibold" data-testid="pset-board-child">মাহিন হাসান</span>
                <span class="t-caption" data-testid="pset-board-help">লিডারবোর্ডে নাম লুকান</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" aria-pressed="true" data-testid="pset-board-toggle">চালু</button>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="pset-notif-label">
          <p class="t-body t-semibold" id="pset-notif-label" style="margin-bottom:var(--space-sm)" data-testid="pset-notif-label">কোন বার্তা পাবেন</p>
          <p class="t-caption" data-testid="pset-notif-help">বাধ্যতামূলকগুলো বন্ধ করা যায় না — দুর্বলতা না জানালে এই অ্যাপটি কেন কিনেছেন তা কেউ জানতে পারবে না। রাত ১০টা থেকে সকাল ৬টার মধ্যে ইমেইল বা পুশ যায় না।</p>

          <div class="pset-row">
            <div class="pset-left">
              <div class="pset-text">
                <span class="t-body-sm t-semibold" data-testid="pset-notif-result-title">পরীক্ষার ফলাফল</span>
                <span class="t-caption" data-testid="pset-notif-result-help">বাধ্যতামূলক · অ্যাপ ও ইমেইল</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" aria-pressed="true" disabled data-testid="pset-notif-result-toggle">চালু</button>
          </div>

          <div class="pset-row">
            <div class="pset-left">
              <div class="pset-text">
                <span class="t-body-sm t-semibold" data-testid="pset-notif-weak-title">দুর্বলতা ও রিটেক</span>
                <span class="t-caption" data-testid="pset-notif-weak-help">বাধ্যতামূলক · অ্যাপ ও ইমেইল</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" aria-pressed="true" disabled data-testid="pset-notif-weak-toggle">চালু</button>
          </div>

          <div class="pset-row">
            <div class="pset-left">
              <div class="pset-text">
                <span class="t-body-sm t-semibold" data-testid="pset-notif-pay-title">পেমেন্ট ও সাবস্ক্রিপশন</span>
                <span class="t-caption" data-testid="pset-notif-pay-help">বাধ্যতামূলক · অ্যাপ ও ইমেইল</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" aria-pressed="true" disabled data-testid="pset-notif-pay-toggle">চালু</button>
          </div>

          <div class="pset-row">
            <div class="pset-left">
              <div class="pset-text">
                <span class="t-body-sm t-semibold" data-testid="pset-notif-remind-title">অনুশীলনের স্মারক</span>
                <span class="t-caption" data-testid="pset-notif-remind-help">আপনি বদলাতে পারবেন · অ্যাপ ও পুশ</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" aria-pressed="true" data-testid="pset-notif-remind-toggle">চালু</button>
          </div>

          <div class="pset-row">
            <div class="pset-left">
              <div class="pset-text">
                <span class="t-body-sm t-semibold" data-testid="pset-notif-promo-title">প্রচারণা</span>
                <span class="t-caption" data-testid="pset-notif-promo-help">আপনি বদলাতে পারবেন · ডিফল্টে বন্ধ</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" aria-pressed="false" data-testid="pset-notif-promo-toggle">বন্ধ</button>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="pset-lang-label">
          <p class="t-body t-semibold" id="pset-lang-label" style="margin-bottom:var(--space-md)" data-testid="pset-lang-label">ভাষা</p>
          <div class="pset-row">
            <div class="pset-left">
              <i data-lucide="languages" class="icon-md" aria-hidden="true"></i>
              <div class="pset-text">
                <span class="t-body-sm t-semibold" data-testid="pset-lang-name">অ্যাপের ভাষা</span>
                <span class="t-caption" data-testid="pset-lang-help">পাঠের ব্যাখ্যা সবসময় বাংলায় থাকবে</span>
              </div>
            </div>
            <div class="segmented" role="group" aria-label="অ্যাপের ভাষা" data-testid="pset-lang-segment">
              <button class="segment" type="button" aria-pressed="true" data-testid="pset-lang-option">বাংলা</button>
              <button class="segment" type="button" aria-pressed="false" data-testid="pset-lang-option">English</button>
            </div>
          </div>
        </section>

        <button class="btn btn-secondary" data-testid="pset-logout" style="width:100%">
          <i data-lucide="log-out"></i>
          লগ আউট
        </button>

        <!-- PRD L2839: Tap remove child | Confirm dialog -->
        <div class="modal-scrim" hidden data-testid="pset-remove-scrim"></div>
        <div class="modal modal-sm" role="dialog" aria-modal="true" aria-labelledby="pset-remove-title" hidden data-testid="pset-remove-modal">
          <div class="modal-header">
            <h2 class="modal-title" id="pset-remove-title" data-testid="pset-remove-title">সন্তান মুছে দেবেন?</h2>
            <button class="modal-close" data-testid="pset-remove-close" aria-label="বন্ধ করুন">
              <i data-lucide="x"></i>
            </button>
          </div>
          <div class="modal-body">
            <p class="t-body-sm" data-testid="pset-remove-body">রাফিদ হাসান · চতুর্থ শ্রেণি</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-testid="pset-remove-cancel">না</button>
            <button class="btn btn-danger" data-testid="pset-remove-confirm">মুছে ফেলুন</button>
          </div>
        </div>

      </div>`
  }
];
