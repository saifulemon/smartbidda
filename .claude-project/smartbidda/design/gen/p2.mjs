// p2.mjs — rewards/settings + parent login, dashboard, progress
export default [
  {
    file: '14-leaderboard.html',
    app: 'frontend',
    layout: 'StudentLayout',
    activeTab: 'leaderboard',
    title: 'লিডারবোর্ড',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .lb-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .lb-scopes { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
  .lb-podium { display: flex; align-items: flex-end; justify-content: center; gap: var(--space-md); }
  .lb-podium-cell { display: flex; flex-direction: column; align-items: center; gap: var(--space-xs); flex: 1; }
  .lb-podium-rank {
    display: grid; place-items: center;
    width: 100%; min-height: 84px;
    background: var(--c-primary-soft);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }
  .lb-podium-cell.is-first .lb-podium-rank { min-height: 120px; background: var(--c-primary-soft); }
  .lb-list { display: flex; flex-direction: column; padding: 0; }
  .lb-row { display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md) 0; }
  .lb-rank { width: 28px; text-align: center; flex-shrink: 0; }
  .lb-name { flex: 1; min-width: 0; }
  .lb-privacy { display: flex; align-items: flex-start; gap: var(--space-sm); }
  .lb-row.is-me { background: var(--c-primary-soft); border-radius: var(--radius-md); padding: var(--space-md) var(--space-sm); }
  /* PRD: "My-rank bar | Sticky bottom: #{rank} · {points}" */
  .lb-myrank {
    position: sticky; bottom: 0; z-index: 2;
    display: flex; align-items: center; justify-content: space-between; gap: var(--space-md);
    padding: var(--space-md);
    background: var(--c-primary); color: var(--c-on-primary);
    border-radius: var(--radius-md);
  }
`,
    content: `
      <div class="lb-wrap">

        <div>
          <p class="t-title-lg" data-testid="lb-heading">লিডারবোর্ড</p>
          <p class="t-body-sm t-muted" data-testid="lb-sub">পয়েন্ট অনুযায়ী · সব সময়</p>
        </div>

        <div>
          <div class="lb-scopes" role="group" aria-label="শ্রেণি">
            <button class="chip" aria-pressed="false" data-testid="lb-class-1">১</button>
            <button class="chip" aria-pressed="false" data-testid="lb-class-2">২</button>
            <button class="chip" aria-pressed="false" data-testid="lb-class-3">৩</button>
            <button class="chip" aria-pressed="true" data-testid="lb-class-4">৪</button>
            <button class="chip" aria-pressed="false" data-testid="lb-class-5">৫</button>
          </div>
        </div>

        <section class="card" data-component="list" aria-label="শীর্ষ তিন">
          <div class="lb-podium">
            <div class="lb-podium-cell">
              <span class="avatar avatar-lg" aria-hidden="true">স</span>
              <span class="t-body-sm t-semibold truncate" data-testid="lb-podium-name">সাদিয়া</span>
              <span class="t-caption" data-testid="lb-podium-class">চতুর্থ শ্রেণি</span>
              <div class="lb-podium-rank"><span class="t-title-md" data-testid="lb-podium-rank">২</span></div>
            </div>
            <div class="lb-podium-cell is-first">
              <span class="badge badge-primary" data-testid="lb-first-crown"><i data-lucide="crown" class="icon-sm"></i> ১ম</span>
              <span class="avatar avatar-xl" aria-hidden="true">ম</span>
              <span class="t-body-sm t-semibold truncate" data-testid="lb-podium-name">মাবুল</span>
              <span class="t-caption" data-testid="lb-podium-class">চতুর্থ শ্রেণি</span>
              <div class="lb-podium-rank"><span class="t-title-md" data-testid="lb-podium-rank">১</span></div>
            </div>
            <div class="lb-podium-cell">
              <span class="avatar avatar-lg" aria-hidden="true">ত</span>
              <span class="t-body-sm t-semibold truncate" data-testid="lb-podium-name">তানজিলা</span>
              <span class="t-caption" data-testid="lb-podium-class">চতুর্থ শ্রেণি</span>
              <div class="lb-podium-rank"><span class="t-title-md" data-testid="lb-podium-rank">৩</span></div>
            </div>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="lb-list-label">
          <p class="t-body t-semibold" id="lb-list-label" data-testid="lb-list-label">৪ থেকে ১০০</p>
          <div class="lb-list">
            <div class="lb-row is-me" data-testid="lb-row">
              <span class="lb-rank t-body-sm t-bold" data-testid="lb-rank">৪</span>
              <span class="avatar" aria-hidden="true">র</span>
              <div class="lb-name">
                <p class="t-body-sm t-semibold truncate" data-testid="lb-name">রাফিদ</p>
                <p class="t-caption" data-testid="lb-class">চতুর্থ শ্রেণি</p>
              </div>
              <span class="t-body-sm t-bold" data-testid="lb-points">১,২৪০</span>
            </div>
            <div class="lb-row" data-testid="lb-row">
              <span class="lb-rank t-body-sm t-bold" data-testid="lb-rank">৫</span>
              <span class="avatar" aria-hidden="true">আ</span>
              <div class="lb-name">
                <p class="t-body-sm t-semibold truncate" data-testid="lb-name">আরিশা</p>
                <p class="t-caption" data-testid="lb-class">চতুর্থ শ্রেণি</p>
              </div>
              <span class="t-body-sm t-bold" data-testid="lb-points">১,১৯০</span>
            </div>
            <div class="lb-row" data-testid="lb-row">
              <span class="lb-rank t-body-sm t-bold" data-testid="lb-rank">৬</span>
              <span class="avatar" aria-hidden="true">ন</span>
              <div class="lb-name">
                <p class="t-body-sm t-semibold truncate" data-testid="lb-name">নাফিসা</p>
                <p class="t-caption" data-testid="lb-class">চতুর্থ শ্রেণি</p>
              </div>
              <span class="t-body-sm t-bold" data-testid="lb-points">১,১০৫</span>
            </div>
          </div>
          <a class="btn btn-secondary" href="#" style="width:100%;margin-top:var(--space-md)" data-testid="lb-more">
            আরও দেখুন
          </a>
        </section>

        <div class="lb-myrank" data-testid="lb-myrank">
          <span class="t-body-sm" data-testid="lb-myrank-label">আমার অবস্থান</span>
          <span class="t-body-sm t-semibold" data-testid="lb-myrank-text">#৪ · ১,২৪০</span>
        </div>

        <div class="card" data-component="card">
          <div class="lb-privacy">
            <i data-lucide="shield-check" class="icon-md" aria-hidden="true"></i>
            <div>
              <p class="t-body t-semibold" data-testid="lb-privacy-title">নিরাপদ তালিকা</p>
              <p class="t-caption" data-testid="lb-privacy-body">
                শুধু প্রদর্শন নাম ও শ্রেণি দেখা যায় — কোনো ছবি বা ব্যক্তিগত তথ্য নয়। অভিভাবক চাইলে নাম লুকানো যাবে।
              </p>
            </div>
          </div>
        </div>

      </div>`
  },

  {
    file: '15-rewards.html',
    app: 'frontend',
    layout: 'StudentLayout',
    activeTab: 'rewards',
    title: 'পুরস্কার',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .rw-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .rw-balance { display: flex; align-items: center; gap: var(--space-md); }
  .rw-balance-text { display: flex; flex-direction: column; gap: var(--space-xxs); }
  .rw-streak { display: flex; flex-direction: column; gap: var(--space-sm); }
  .rw-days { display: flex; gap: var(--space-xs); }
  .rw-day {
    display: flex; flex-direction: column; align-items: center; gap: var(--space-xxs);
    flex: 1;
    padding: var(--space-sm) 0;
    background: var(--c-surface-soft);
    border-radius: var(--radius-md);
  }
  .rw-day.is-done { background: var(--c-primary-soft); }
  .rw-badges { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); }
  @media (max-width: 600px) { .rw-badges { grid-template-columns: repeat(2, 1fr); } }
  .rw-badge {
    display: flex; flex-direction: column; align-items: center; gap: var(--space-xs);
    padding: var(--space-md) var(--space-sm);
    text-align: center;
    background: var(--c-surface);
    border: var(--border-w) solid var(--c-hairline);
    border-radius: var(--radius-lg);
  }
  .rw-badge.is-locked { background: var(--c-surface-soft); color: var(--c-muted); }
  .rw-badge-mark {
    display: grid; place-items: center;
    width: 56px; height: 56px;
    background: var(--c-primary-soft);
    border-radius: var(--radius-pill);
  }
  .rw-badge.is-locked .rw-badge-mark { background: var(--c-hairline); }
`,
    content: `
      <div class="rw-wrap">

        <section class="card" data-component="kpi" aria-labelledby="rw-balance-label">
          <div class="rw-balance">
            <span class="rw-badge-mark"><i data-lucide="star" class="icon-md" aria-hidden="true"></i></span>
            <div class="rw-balance-text">
              <span class="t-caption" id="rw-balance-label" data-testid="rw-balance-label">মোট পয়েন্ট</span>
              <span class="t-display-lg" data-testid="rw-balance">১,২৪০</span>
            </div>
            <span class="badge badge-primary" style="margin-left:auto" data-testid="rw-rank">লিডারবোর্ডে ৪</span>
          </div>
        </section>

        <section class="card" data-component="card" aria-labelledby="rw-streak-label">
          <div class="rw-streak">
            <div class="row" style="justify-content:space-between">
              <p class="t-body t-semibold" id="rw-streak-label" data-testid="rw-streak-label">ধারাবাহিকতা</p>
              <span class="badge badge-warning" data-testid="rw-streak-count"><i data-lucide="flame" class="icon-sm"></i> ৫ দিন</span>
            </div>
            <div class="rw-days">
              <div class="rw-day"><i data-lucide="minus" class="icon-sm" aria-hidden="true"></i><span class="t-caption" data-testid="rw-day">রবি</span></div>
              <div class="rw-day is-done"><i data-lucide="check" class="icon-sm" aria-hidden="true"></i><span class="t-caption" data-testid="rw-day">সোম</span></div>
              <div class="rw-day is-done"><i data-lucide="check" class="icon-sm" aria-hidden="true"></i><span class="t-caption" data-testid="rw-day">মঙ্গল</span></div>
              <div class="rw-day is-done"><i data-lucide="check" class="icon-sm" aria-hidden="true"></i><span class="t-caption" data-testid="rw-day">বুধ</span></div>
              <div class="rw-day is-done"><i data-lucide="check" class="icon-sm" aria-hidden="true"></i><span class="t-caption" data-testid="rw-day">বৃহঃ</span></div>
              <div class="rw-day is-done"><i data-lucide="check" class="icon-sm" aria-hidden="true"></i><span class="t-caption" data-testid="rw-day">শুক্র</span></div>
              <div class="rw-day"><i data-lucide="clock-4" class="icon-sm" aria-hidden="true"></i><span class="t-caption" data-testid="rw-day">আজ</span></div>
            </div>
            <p class="t-caption" data-testid="rw-streak-next">আর ৫ দিন ধরলে পরের পদক আনলক হবে</p>
          </div>
        </section>

        <section aria-labelledby="rw-badges-label">
          <div class="row" style="justify-content:space-between;margin-bottom:var(--space-md)">
            <p class="t-body t-semibold" id="rw-badges-label" data-testid="rw-badges-label">পদক</p>
            <span class="t-caption" data-testid="rw-badges-count">৭ / ১২ অর্জিত</span>
          </div>
          <div class="rw-badges">
            <div class="rw-badge" data-testid="rw-badge">
              <span class="rw-badge-mark"><i data-lucide="star" class="icon-md" aria-hidden="true"></i></span>
              <span class="t-caption t-semibold" data-testid="rw-badge-name">প্রথম কুইজ</span>
              <span class="badge badge-success" data-testid="rw-badge-status">অর্জিত</span>
            </div>
            <div class="rw-badge" data-testid="rw-badge">
              <span class="rw-badge-mark"><i data-lucide="flame" class="icon-md" aria-hidden="true"></i></span>
              <span class="t-caption t-semibold" data-testid="rw-badge-name">৫ দিন ধারা</span>
              <span class="badge badge-success" data-testid="rw-badge-status">অর্জিত</span>
            </div>
            <div class="rw-badge" data-testid="rw-badge">
              <span class="rw-badge-mark"><i data-lucide="target" class="icon-md" aria-hidden="true"></i></span>
              <span class="t-caption t-semibold" data-testid="rw-badge-name">১০০ শত প্রাপ্ত</span>
              <span class="badge badge-success" data-testid="rw-badge-status">অর্জিত</span>
            </div>
            <div class="rw-badge is-locked" data-testid="rw-badge">
              <span class="rw-badge-mark"><i data-lucide="lock" class="icon-md" aria-hidden="true"></i></span>
              <span class="t-caption t-semibold" data-testid="rw-badge-name">গণিত বিশারদ</span>
              <span class="badge" data-testid="rw-badge-status">৮ / ১০ অধ্যায়</span>
            </div>
            <div class="rw-badge is-locked" data-testid="rw-badge">
              <span class="rw-badge-mark"><i data-lucide="lock" class="icon-md" aria-hidden="true"></i></span>
              <span class="t-caption t-semibold" data-testid="rw-badge-name">১০ দিন ধারা</span>
              <span class="badge" data-testid="rw-badge-status">৫ / ১০ দিন</span>
            </div>
            <div class="rw-badge is-locked" data-testid="rw-badge">
              <span class="rw-badge-mark"><i data-lucide="lock" class="icon-md" aria-hidden="true"></i></span>
              <span class="t-caption t-semibold" data-testid="rw-badge-name">পরীক্ষার শীর্ষ</span>
              <span class="badge" data-testid="rw-badge-status">২০ শতাংশ বাকি</span>
            </div>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="rw-recent-label">
          <p class="t-body t-semibold" id="rw-recent-label" data-testid="rw-recent-label">সাম্প্রতিক পয়েন্ট</p>
          <div class="row" style="justify-content:space-between;margin-top:var(--space-md)">
            <div>
              <p class="t-body-sm" data-testid="rw-recent-title">কুইজ: ভগ্নাংশ চিহ্নিতকরণ</p>
              <p class="t-caption" data-testid="rw-recent-date">আজ · ১৭ অক্টোবর ২০২৬</p>
            </div>
            <span class="badge badge-success" data-testid="rw-recent-points">+২৫</span>
          </div>
          <div class="row" style="justify-content:space-between;margin-top:var(--space-sm);border-top:var(--border-w) solid var(--c-hairline);padding-top:var(--space-sm)">
            <div>
              <p class="t-body-sm" data-testid="rw-recent-title">কুইজ: সংখ্যারেখা</p>
              <p class="t-caption" data-testid="rw-recent-date">১৬ অক্টোবর ২০২৬</p>
            </div>
            <span class="badge badge-success" data-testid="rw-recent-points">+২৫</span>
          </div>
        </section>

        <div class="card" data-component="card">
          <div class="row">
            <i data-lucide="gift" class="icon-md" aria-hidden="true"></i>
            <div>
              <p class="t-body t-semibold" data-testid="rw-quest-title">আজকের লক্ষ্য</p>
              <p class="t-caption" data-testid="rw-quest-body">একটি কুইজ দিলে +২৫ পয়েন্ট</p>
            </div>
            <a class="btn btn-primary btn-sm" href="05-subject-list.html" style="margin-left:auto" data-testid="rw-quest-cta">শুরু</a>
          </div>
        </div>

      </div>`
  },

  {
    file: '16-settings.html',
    app: 'frontend',
    layout: 'StudentSubLayout',
    title: 'সেটিংস',
    backHref: '01-home.html',
    backTestId: 'settings-back-appbar',
    titleTestId: 'settings-title',
    title: 'সেটিংস',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .set-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .set-row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .set-row-text { display: flex; flex-direction: column; gap: var(--space-xxs); min-width: 0; }
  .set-row-left { display: flex; align-items: center; gap: var(--space-md); min-width: 0; }
`,
    content: `
      <div class="set-wrap">

        <section class="card" data-component="list" aria-labelledby="set-lang-label">
          <p class="t-body t-semibold" id="set-lang-label" style="margin-bottom:var(--space-md)" data-testid="set-lang-label">ভাষা</p>
          <div class="set-row">
            <div class="set-row-left">
              <i data-lucide="languages" class="icon-md" aria-hidden="true"></i>
              <div class="set-row-text">
                <span class="t-body-sm t-semibold" data-testid="set-lang-name">অ্যাপের ভাষা</span>
                <span class="t-caption" data-testid="set-lang-help">পাঠের ব্যাখ্যা সবসময় বাংলায় থাকবে</span>
              </div>
            </div>
            <div class="segmented" role="group" aria-label="অ্যাপের ভাষা" data-testid="set-lang-segment">
              <button class="segment" type="button" aria-pressed="true" data-testid="set-lang-option">বাংলা</button>
              <button class="segment" type="button" aria-pressed="false" data-testid="set-lang-option">English</button>
            </div>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="set-font-label">
          <p class="t-body t-semibold" id="set-font-label" style="margin-bottom:var(--space-md)" data-testid="set-font-label">অক্ষরের আকার</p>
          <div class="set-row">
            <div class="set-row-left">
              <i data-lucide="type" class="icon-md" aria-hidden="true"></i>
              <div class="set-row-text">
                <span class="t-body-sm t-semibold" data-testid="set-font-name">লেখার আকার</span>
                <span class="t-caption" data-testid="set-font-help">ছোট, মাঝারি বা বড় — বদলালে পুরো অ্যাপে লাগবে</span>
              </div>
            </div>
            <div role="group" aria-label="লেখার আকার" style="display:flex;gap:var(--space-xs)" data-testid="set-font-size">
              <button class="chip" type="button" aria-pressed="false" data-testid="set-font-sm">ছোট</button>
              <button class="chip" type="button" aria-pressed="true" data-testid="set-font-md">মাঝারি</button>
              <button class="chip" type="button" aria-pressed="false" data-testid="set-font-lg">বড়</button>
            </div>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="set-voice-label">
          <p class="t-body t-semibold" id="set-voice-label" style="margin-bottom:var(--space-md)" data-testid="set-voice-label">শব্দ</p>
          <div class="set-row" style="margin-bottom:var(--space-lg)">
            <div class="set-row-left">
              <i data-lucide="volume-2" class="icon-md" aria-hidden="true"></i>
              <div class="set-row-text">
                <span class="t-body-sm t-semibold" data-testid="set-voice-name">ভয়েস নির্দেশনা</span>
                <span class="t-caption" data-testid="set-voice-help">প্রশ্ন ও ব্যাখ্যা কণ্ঠে পড়ে শোনাবে</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" aria-pressed="true" data-testid="set-voice-toggle">চালু</button>
          </div>
          <div class="set-row">
            <div class="set-row-left">
              <i data-lucide="music" class="icon-md" aria-hidden="true"></i>
              <div class="set-row-text">
                <span class="t-body-sm t-semibold" data-testid="set-sound-name">সব শব্দ বন্ধ</span>
                <span class="t-caption" data-testid="set-sound-help">কণ্ঠস্বর, ফলাফল ও অ্যানিমেশন — সব শব্দ একসাথে বন্ধ হয়ে যাবে</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" aria-pressed="true" data-testid="set-sound-toggle">চালু</button>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="set-account-label">
          <p class="t-body t-semibold" id="set-account-label" style="margin-bottom:var(--space-md)" data-testid="set-account-label">অ্যাকাউন্ট</p>
          <div class="set-row" style="margin-bottom:var(--space-lg)">
            <div class="set-row-left">
              <span class="avatar" aria-hidden="true">র</span>
              <div class="set-row-text">
                <span class="t-body-sm t-semibold" data-testid="set-profile-name">রাফিদ হাসান</span>
                <span class="t-caption" data-testid="set-profile-class">চতুর্থ শ্রেণি · SB-FAM-20260902-1041</span>
              </div>
            </div>
            <a class="btn btn-ghost btn-sm" href="04-onboarding.html" data-testid="set-profile-edit">বদলান</a>
          </div>
          <a class="set-row" href="#" data-testid="set-parent-link">
            <span class="set-row-left">
              <i data-lucide="phone" class="icon-md" aria-hidden="true"></i>
              <span class="t-body-sm" data-testid="set-parent-link-label">মাকে বলি</span>
            </span>
            <i data-lucide="chevron-right" class="icon-sm" aria-hidden="true"></i>
          </a>
          <a class="set-row" href="02-login.html" data-testid="set-logout">
            <span class="set-row-left">
              <i data-lucide="log-out" class="icon-md" aria-hidden="true"></i>
              <span class="t-body-sm" data-testid="set-logout-label">লগ আউট</span>
            </span>
            <i data-lucide="chevron-right" class="icon-sm" aria-hidden="true"></i>
          </a>
        </section>

        <p class="t-caption" data-testid="set-version">স্মার্টবিদ্যা সংস্করণ ১.০.০</p>

      </div>`
  },

  {
    file: '17-parent-login.html',
    app: 'frontend',
    layout: 'PinLayout',
    title: 'অভিভাবক প্রবেশ',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .plogin-wrap {
    min-height: 100dvh;
    display: flex; flex-direction: column;
    justify-content: center;
    gap: var(--space-xl);
    padding: var(--space-xl) var(--space-lg);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xl));
  }
  .plogin-head { text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-sm); }
  .plogin-mark {
    display: grid; place-items: center;
    width: 72px; height: 72px;
    background: var(--c-primary-soft);
    border-radius: var(--radius-pill);
  }
  .plogin-dots { display: flex; justify-content: center; gap: var(--space-md); }
  .plogin-dot {
    width: 16px; height: 16px;
    background: var(--c-surface-soft);
    border: var(--border-w) solid var(--c-hairline-strong);
    border-radius: var(--radius-pill);
  }
  .plogin-dot.is-filled { background: var(--c-primary); border-color: var(--c-primary); }
  .plogin-keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md); }
  .plogin-key {
    display: grid; place-items: center;
    min-height: 56px;
    background: var(--c-surface);
    border: var(--border-w) solid var(--c-hairline);
    border-radius: var(--radius-lg);
    font-family: var(--t-button-family);
    font-size: var(--t-title-lg-size);
    font-weight: var(--t-button-weight);
    color: var(--c-ink);
    cursor: pointer;
  }
  .plogin-key:hover { background: var(--c-surface-soft); }
  .plogin-key.is-ghost { background: transparent; border-color: transparent; }
  .plogin-foot { display: flex; flex-direction: column; gap: var(--space-md); }
  .plogin-expander {
    display: flex; align-items: center; gap: var(--space-sm);
    width: 100%; padding: 0;
    background: transparent; border: 0;
    color: var(--c-ink); cursor: pointer;
    font-family: var(--t-body-md-family);
  }
  .plogin-fields { display: flex; flex-direction: column; gap: var(--space-md); }
  `,
    content: `
      <div class="plogin-wrap">

        <div class="plogin-head">
          <span class="plogin-mark" data-component="media"><i data-lucide="shield" class="icon-lg" aria-hidden="true"></i></span>
          <p class="t-title-lg" data-testid="plogin-heading">অভিভাবক প্রবেশ</p>
          <p class="t-body-sm t-muted" data-testid="plogin-sub">৬ সংখ্যার পিন দিয়ে ঢুকুন</p>
        </div>

        <div class="plogin-dots" role="group" aria-label="পিনের অঙ্ক" aria-describedby="plogin-hint">
          <span class="plogin-dot is-filled" data-testid="plogin-dot"></span>
          <span class="plogin-dot is-filled" data-testid="plogin-dot"></span>
          <span class="plogin-dot is-filled" data-testid="plogin-dot"></span>
          <span class="plogin-dot" data-testid="plogin-dot"></span>
          <span class="plogin-dot" data-testid="plogin-dot"></span>
          <span class="plogin-dot" data-testid="plogin-dot"></span>
        </div>
        <p class="t-caption" id="plogin-hint" style="text-align:center" data-testid="plogin-hint">
          ভুল হলে আবার দিতে পারবেন — ৩ বার ভুল হলে ১০ মিনিট বন্ধ থাকবে
        </p>

        <div class="plogin-keys" role="group" aria-label="সংখ্যা নির্বাচন">
          <button class="plogin-key" data-testid="plogin-key">১</button>
          <button class="plogin-key" data-testid="plogin-key">২</button>
          <button class="plogin-key" data-testid="plogin-key">৩</button>
          <button class="plogin-key" data-testid="plogin-key">৪</button>
          <button class="plogin-key" data-testid="plogin-key">৫</button>
          <button class="plogin-key" data-testid="plogin-key">৬</button>
          <button class="plogin-key" data-testid="plogin-key">৭</button>
          <button class="plogin-key" data-testid="plogin-key">৮</button>
          <button class="plogin-key" data-testid="plogin-key">৯</button>
          <button class="plogin-key is-ghost" data-testid="plogin-key-blank" aria-hidden="true" disabled></button>
          <button class="plogin-key" data-testid="plogin-key">০</button>
          <button class="plogin-key" data-testid="plogin-key-delete" aria-label="মুছুন">
            <i data-lucide="delete" class="icon-md"></i>
          </button>
        </div>

        <div class="plogin-foot">
          <button class="btn btn-primary" style="width:100%" data-testid="plogin-submit">প্যারেন্ট মোডে ঢোকো</button>
          <!-- PRD L2269: Email/password fallback | collapsed "পিন মনে নেই?" expander |
               expanded shows the form with inline errors (L2286 parentPin is the pin row) -->
          <section class="card" data-component="form" aria-labelledby="plogin-fallback-label">
            <button class="plogin-expander" type="button" aria-expanded="true" aria-controls="plogin-fallback"
                    data-testid="plogin-fallback-toggle">
              <i data-lucide="key-round" class="icon-sm" aria-hidden="true"></i>
              <span class="t-body-sm t-semibold" id="plogin-fallback-label">পিন মনে নেই?</span>
              <i data-lucide="chevron-up" class="icon-sm" style="margin-left:auto" aria-hidden="true"></i>
            </button>
            <div id="plogin-fallback" class="plogin-fields" style="margin-top:var(--space-md)">
              <label class="plogin-field">
                <span class="t-caption" data-testid="plogin-email-label">ইমেইল</span>
                <input class="input" type="email" autocomplete="email" data-testid="plogin-email-input">
              </label>
              <label class="plogin-field">
                <span class="t-caption" data-testid="plogin-pass-label">পাসওয়ার্ড</span>
                <input class="input" type="password" autocomplete="current-password" data-testid="plogin-pass-input">
              </label>
            </div>
          </section>
        </div>

      </div>`
  },

  {
    file: '18-parent-dashboard.html',
    app: 'frontend',
    layout: 'ParentLayout',
    activeTab: 'dashboard',
    title: 'অভিভাবক ড্যাশবোর্ড',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .pd-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .pd-switch { display: flex; gap: var(--space-sm); overflow-x: auto; padding-bottom: var(--space-xxs); }
  .pd-summary { display: flex; flex-direction: column; gap: var(--space-md); }
  .pd-summary-row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .pd-child { display: flex; flex-direction: column; gap: var(--space-md); }
  .pd-child-head { display: flex; align-items: center; gap: var(--space-md); }
  .pd-child-id { display: flex; flex-direction: column; gap: var(--space-xxs); min-width: 0; }
  .pd-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-sm); }
  .pd-stat { text-align: center; padding: var(--space-sm); background: var(--c-surface-soft); border-radius: var(--radius-md); }
  .pd-actions { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
`,
    content: `
      <div class="pd-wrap">

        <div class="pd-switch" role="group" aria-label="সন্তান নির্বাচন">
          <button class="chip" aria-pressed="true" data-testid="pd-switch-rafid">রাফিদ</button>
          <button class="chip" aria-pressed="false" data-testid="pd-switch-mahin">মাহিন</button>
          <button class="chip" data-testid="pd-switch-add"><i data-lucide="plus" class="icon-sm"></i> যোগ করুন</button>
        </div>

        <div class="card" data-component="card">
          <div class="pd-child-head">
            <span class="avatar avatar-lg" aria-hidden="true">র</span>
            <div class="pd-child-id">
              <p class="t-title-md" data-testid="pd-child-name">রাফিদ হাসান</p>
              <p class="t-caption" data-testid="pd-child-class">চতুর্থ শ্রেণি · SB-FAM-20260902-1041</p>
            </div>
            <span class="badge badge-success" style="margin-left:auto" data-testid="pd-child-status">সক্রিয়</span>
          </div>

          <div class="pd-stats" style="margin-top:var(--space-md)">
            <div class="pd-stat">
              <p class="t-caption" data-testid="pd-stat-lessons-label">পাঠ</p>
              <p class="t-title-md" data-testid="pd-stat-lessons">১২</p>
            </div>
            <div class="pd-stat">
              <p class="t-caption" data-testid="pd-stat-score-label">গড়</p>
              <p class="t-title-md" data-testid="pd-stat-score">৭২%</p>
            </div>
            <div class="pd-stat">
              <p class="t-caption" data-testid="pd-stat-streak-label">ধারা</p>
              <p class="t-title-md" data-testid="pd-stat-streak">৫ দিন</p>
            </div>
          </div>
        </div>

        <!-- PRD L2345: Subject score grid | per-subject latest % | tap → /parent/progress -->
        <section class="card" data-component="kpi" aria-labelledby="pd-scores-label">
          <div class="pd-summary-row">
            <p class="t-body t-semibold" id="pd-scores-label" data-testid="pd-scores-label">বিষয়ভিত্তিক নম্বর</p>
            <a class="t-caption" href="19-parent-progress.html" data-testid="pd-scores-all">সব দেখুন</a>
          </div>
          <div class="pd-stats" style="margin-top:var(--space-md)">
            <div class="pd-stat">
              <p class="t-caption" data-testid="pd-score-subject">গণিত</p>
              <p class="t-title-md" data-testid="pd-score-v">৭৮%</p>
            </div>
            <div class="pd-stat">
              <p class="t-caption" data-testid="pd-score-subject">বাংলা</p>
              <p class="t-title-md" data-testid="pd-score-v">৭২%</p>
            </div>
            <div class="pd-stat">
              <p class="t-caption" data-testid="pd-score-subject">ইংরেজি</p>
              <p class="t-title-md" data-testid="pd-score-v">৫৮%</p>
            </div>
          </div>
        </section>

        <!-- PRD L2347: Nudge button | মনে করিয়ে দাও | disabled after 5/day (L2394) -->
        <button class="btn btn-primary" style="width:100%" data-testid="pd-nudge">
          <i data-lucide="bell-ring"></i>
          মনে করিয়ে দাও
        </button>

        <section class="card" data-component="card" aria-labelledby="pd-time-label">
          <div class="pd-summary-row">
            <p class="t-body t-semibold" id="pd-time-label" data-testid="pd-time-label">আজকের স্ক্রিন টাইম</p>
            <p class="t-body-sm t-bold" data-testid="pd-time-value">২৪ / ৬০ মিনিট</p>
          </div>
          <div class="progress" style="margin-top:var(--space-sm)" role="progressbar"
               aria-valuenow="24" aria-valuemin="0" aria-valuemax="60" aria-label="আজকের স্ক্রিন টাইম">
            <div class="progress-fill" style="width:40%" data-testid="pd-time-bar"></div>
          </div>
          <p class="t-caption" style="margin-top:var(--space-sm)" data-testid="pd-time-note">
            আরও ৩৬ মিনিট বাকি · সীমা পরিবর্তন করা যাবে
          </p>
          <a class="btn btn-secondary" href="21-screen-time.html" style="width:100%;margin-top:var(--space-md)" data-testid="pd-time-cta">
            <i data-lucide="timer"></i>
            স্ক্রিন টাইম নিয়ন্ত্রণ
          </a>
        </section>

        <!-- PRD L2346: Forecast card | প্রাক্কলন: {band} + revision chapters | tap → /parent/analytics -->
        <section class="card" data-component="card" aria-labelledby="pd-forecast-label">
          <div class="pd-summary-row">
            <p class="t-body t-semibold" id="pd-forecast-label" data-testid="pd-forecast-label">প্রাক্কলন: মাঝারি</p>
            <span class="badge badge-warning" data-testid="pd-forecast-badge">৬৮%</span>
          </div>
          <p class="t-caption" style="margin-top:var(--space-sm)" data-testid="pd-forecast-revision">
            পুনরাবৃত্তির অধ্যায়: ভগ্নাংশের তুলনা, বাক্য গঠন
          </p>
          <a class="btn btn-secondary" href="20-parent-analytics.html" style="width:100%;margin-top:var(--space-md)" data-testid="pd-forecast-cta">
            <i data-lucide="sparkles"></i>
            বিশ্লেষণ দেখুন
          </a>
        </section>

        <section class="card" data-component="list" aria-labelledby="pd-alerts-label">
          <div class="pd-summary-row">
            <p class="t-body t-semibold" id="pd-alerts-label" data-testid="pd-alerts-label">সাম্প্রতিক সতর্কতা</p>
            <a class="t-caption" href="22-alerts.html" data-testid="pd-alerts-all">সব দেখুন</a>
          </div>
          <div class="pd-summary" style="margin-top:var(--space-md)">
            <div class="pd-summary-row">
              <div class="pd-child-id">
                <p class="t-body-sm" data-testid="pd-alert-title">ইংরেজিতে দুর্বলতা</p>
                <p class="t-caption" data-testid="pd-alert-meta">আজ · রিমিডিয়াল পাঠ সুপারিশ করা হয়েছে</p>
              </div>
              <span class="badge badge-warning" data-testid="pd-alert-badge">মনোযোগ</span>
            </div>
            <div class="pd-summary-row">
              <div class="pd-child-id">
                <p class="t-body-sm" data-testid="pd-alert-title">১ম সাময়িকের ফলাফল</p>
                <p class="t-caption" data-testid="pd-alert-meta">১৬ অক্টোবর · প্রকাশিত হয়েছে</p>
              </div>
              <span class="badge badge-primary" data-testid="pd-alert-badge">পরীক্ষা</span>
            </div>
          </div>
        </section>

        <div class="pd-actions">
          <a class="btn btn-primary" href="19-parent-progress.html" style="flex:1;min-width:140px" data-testid="pd-action-progress">
            <i data-lucide="trending-up"></i>
            অগ্রগতি দেখুন
          </a>
          <a class="btn btn-secondary" href="20-parent-analytics.html" style="flex:1;min-width:140px" data-testid="pd-action-analytics">
            <i data-lucide="sparkles"></i>
            বিশ্লেষণ
          </a>
          <a class="btn btn-secondary" href="23-subscription.html" style="flex:1;min-width:140px" data-testid="pd-action-subscription">
            <i data-lucide="credit-card"></i>
            সাবস্ক্রিপশন
          </a>
        </div>

        <p class="t-caption" data-testid="pd-quota">পরিবারে যুক্ত ২ / ৩ সন্তান</p>

      </div>`
  },

  {
    file: '19-parent-progress.html',
    app: 'frontend',
    layout: 'ParentLayout',
    activeTab: 'progress',
    title: 'অগ্রগতি',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .pp-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .pp-switch { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
  .pp-overall { display: flex; flex-direction: column; gap: var(--space-md); }
  .pp-overall-head { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-md); }
  .pp-subject { display: flex; flex-direction: column; gap: var(--space-xs); }
  .pp-subject-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .pp-subject-meta { display: flex; align-items: center; gap: var(--space-sm); }
  .pp-weak { display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-md) 0; }
  .pp-weak-text { display: flex; flex-direction: column; gap: var(--space-xxs); min-width: 0; flex: 1; }
`,
    content: `
      <div class="pp-wrap">

        <div class="pp-switch" role="group" aria-label="সন্তান নির্বাচন">
          <button class="chip" aria-pressed="true" data-testid="pp-switch-rafid">রাফিদ</button>
          <button class="chip" aria-pressed="false" data-testid="pp-switch-mahin">মাহিন</button>
        </div>

        <section class="card" data-component="card" aria-labelledby="pp-overall-label">
          <div class="pp-overall">
            <div class="pp-overall-head">
              <p class="t-body t-semibold" id="pp-overall-label" data-testid="pp-overall-label">সামগ্রিক অগ্রগতি</p>
              <p class="t-display-md" data-testid="pp-overall-value">৩৬%</p>
            </div>
            <div class="progress" role="progressbar" aria-valuenow="36" aria-valuemin="0" aria-valuemax="100"
                 aria-label="সামগ্রিক অগ্রগতি">
              <div class="progress-fill" style="width:35%" data-testid="pp-overall-bar"></div>
            </div>
            <p class="t-caption" data-testid="pp-overall-note">চতুর্থ শ্রেণির ১২২ টি অধ্যায়ের মধ্যে ৪৩ টি শেষ</p>
          </div>
        </section>

        <div class="pd-switch" role="group" aria-label="বিষয় নির্বাচন">
          <button class="chip" aria-pressed="true" data-testid="pp-subject-tab">গণিত</button>
          <button class="chip" aria-pressed="false" data-testid="pp-subject-tab">বাংলা</button>
          <button class="chip" aria-pressed="false" data-testid="pp-subject-tab">ইংরেজি</button>
          <button class="chip" aria-pressed="false" data-testid="pp-subject-tab">বিজ্ঞান</button>
        </div>

        <section class="card" data-component="list" aria-labelledby="pp-chapters-label">
          <p class="t-body t-semibold" id="pp-chapters-label" data-testid="pp-chapters-label">অধ্যায়ভিত্তিক দক্ষতা</p>
          <p class="t-caption t-muted" data-testid="pp-chapters-note">গণিত · ১৮ টি অধ্যায়ের মধ্যে ৩ টি শেষ</p>
          <div class="pp-subject" style="margin-bottom:var(--space-md)">
            <div class="pp-subject-head">
              <span class="t-body-sm t-semibold" data-testid="pp-chapter-name">সংখ্যা পদ্ধতি</span>
              <span class="t-body-sm t-bold" data-testid="pp-chapter-mastery">১০০%</span>
            </div>
            <div class="pp-subject-meta" style="margin-top:var(--space-xxs)">
              <span class="badge badge badge-success" data-testid="pp-chapter-state">শেষ</span>
              <span class="t-caption" data-testid="pp-chapter-expand">টপিক দেখতে সরান</span>
            </div>
          </div>
          <div class="pp-subject" style="margin-bottom:var(--space-md)">
            <div class="pp-subject-head">
              <span class="t-body-sm t-semibold" data-testid="pp-chapter-name">যোগ-বিয়োগ গুণ-ভাগ</span>
              <span class="t-body-sm t-bold" data-testid="pp-chapter-mastery">১০০%</span>
            </div>
            <div class="pp-subject-meta" style="margin-top:var(--space-xxs)">
              <span class="badge badge badge-success" data-testid="pp-chapter-state">শেষ</span>
              <span class="t-caption" data-testid="pp-chapter-expand">টপিক দেখতে সরান</span>
            </div>
          </div>
          <div class="pp-subject" style="margin-bottom:var(--space-md)">
            <div class="pp-subject-head">
              <span class="t-body-sm t-semibold" data-testid="pp-chapter-name">সংখ্যারেখা</span>
              <span class="t-body-sm t-bold" data-testid="pp-chapter-mastery">১০০%</span>
            </div>
            <div class="pp-subject-meta" style="margin-top:var(--space-xxs)">
              <span class="badge badge badge-success" data-testid="pp-chapter-state">শেষ</span>
              <span class="t-caption" data-testid="pp-chapter-expand">টপিক দেখতে সরান</span>
            </div>
          </div>
          <div class="pp-subject" style="margin-bottom:var(--space-md)">
            <div class="pp-subject-head">
              <span class="t-body-sm t-semibold" data-testid="pp-chapter-name">ভগ্নাংশ চিহ্নিতকরণ</span>
              <span class="t-body-sm t-bold" data-testid="pp-chapter-mastery">৬৫%</span>
            </div>
            <div class="pp-subject-meta" style="margin-top:var(--space-xxs)">
              <span class="badge badge badge-warning" data-testid="pp-chapter-state">রিটেক প্রয়োজন</span>
              <span class="t-caption" data-testid="pp-chapter-expand">টপিক দেখতে সরান</span>
            </div>
          </div>
          <div class="pp-subject" style="margin-bottom:var(--space-md)">
            <div class="pp-subject-head">
              <span class="t-body-sm t-semibold" data-testid="pp-chapter-name">ভগ্নাংশের যোগ</span>
              <span class="t-body-sm t-bold" data-testid="pp-chapter-mastery">০%</span>
            </div>
            <div class="pp-subject-meta" style="margin-top:var(--space-xxs)">
              <span class="badge badge" data-testid="pp-chapter-state">শুরু হয়নি</span>
              <span class="t-caption" data-testid="pp-chapter-expand">টপিক দেখতে সরান</span>
            </div>
          </div>
          <div class="pp-subject" style="margin-bottom:var(--space-md)">
            <div class="pp-subject-head">
              <span class="t-body-sm t-semibold" data-testid="pp-chapter-name">ভগ্নাংশের বিয়োগ</span>
              <span class="t-body-sm t-bold" data-testid="pp-chapter-mastery">০%</span>
            </div>
            <div class="pp-subject-meta" style="margin-top:var(--space-xxs)">
              <span class="badge badge" data-testid="pp-chapter-state">শুরু হয়নি</span>
              <span class="t-caption" data-testid="pp-chapter-expand">টপিক দেখতে সরান</span>
            </div>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="pp-topics-label">
          <p class="t-body t-semibold" id="pp-topics-label" data-testid="pp-topics-label">টপিকভিত্তিক নম্বর</p>
          <p class="t-caption t-muted" data-testid="pp-topics-note">কম নম্বর আগে দেখানো হয়েছে</p>
          <div style="margin-top:var(--space-md)">
          <div class="pp-subject" style="margin-bottom:var(--space-md)">
            <div class="pp-subject-head">
              <span class="t-body-sm t-semibold" data-testid="pp-topic-name">ভগ্নাংশের তুলনা</span>
              <span class="t-body-sm t-bold" data-testid="pp-topic-v">৪৮%</span>
            </div>
            <div class="progress is-sm" role="progressbar" aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"
                 aria-label="ভগ্নাংশের তুলনা-এর নম্বর">
              <div class="progress-fill is-warning" style="width:48%" data-testid="pp-topic-bar"></div>
            </div>
          </div>
          <div class="pp-subject" style="margin-bottom:var(--space-md)">
            <div class="pp-subject-head">
              <span class="t-body-sm t-semibold" data-testid="pp-topic-name">ভগ্নাংশ চিহ্নিতকরণ</span>
              <span class="t-body-sm t-bold" data-testid="pp-topic-v">৭২%</span>
            </div>
            <div class="progress is-sm" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"
                 aria-label="ভগ্নাংশ চিহ্নিতকরণ-এর নম্বর">
              <div class="progress-fill" style="width:72%" data-testid="pp-topic-bar"></div>
            </div>
          </div>
          <div class="pp-subject" style="margin-bottom:var(--space-md)">
            <div class="pp-subject-head">
              <span class="t-body-sm t-semibold" data-testid="pp-topic-name">জ্যামিতিক আকৃতি</span>
              <span class="t-body-sm t-bold" data-testid="pp-topic-v">৭৫%</span>
            </div>
            <div class="progress is-sm" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                 aria-label="জ্যামিতিক আকৃতি-এর নম্বর">
              <div class="progress-fill" style="width:75%" data-testid="pp-topic-bar"></div>
            </div>
            <span class="t-caption" data-testid="pp-topic-low">কম প্রশ্নের উপর ভিত্তি করে — আরও প্রশ্ন দিলে ঠিক হবে</span>
          </div>
          <div class="pp-subject" style="margin-bottom:var(--space-md)">
            <div class="pp-subject-head">
              <span class="t-body-sm t-semibold" data-testid="pp-topic-name">সংখ্যারেখা</span>
              <span class="t-body-sm t-bold" data-testid="pp-topic-v">৮০%</span>
            </div>
            <div class="progress is-sm" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
                 aria-label="সংখ্যারেখা-এর নম্বর">
              <div class="progress-fill" style="width:80%" data-testid="pp-topic-bar"></div>
            </div>
          </div>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="pp-weak-label">
          <p class="t-body t-semibold" id="pp-weak-label" data-testid="pp-weak-label">শনাক্ত দুর্বলতা</p>
          <div class="pp-weak" data-testid="pp-weak-row">
            <i data-lucide="target" class="icon-md" aria-hidden="true"></i>
            <div class="pp-weak-text">
              <span class="t-body-sm t-semibold" data-testid="pp-weak-name">ভগ্নাংশের তুলনা</span>
              <span class="t-caption" data-testid="pp-weak-meta">গণিত · ২ বার ভুল</span>
            </div>
            <a class="btn btn-secondary btn-sm" href="10-retake-class.html" data-testid="pp-weak-cta">দেখুন</a>
          </div>
          <div class="pp-weak" data-testid="pp-weak-row">
            <i data-lucide="target" class="icon-md" aria-hidden="true"></i>
            <div class="pp-weak-text">
              <span class="t-body-sm t-semibold" data-testid="pp-weak-name">বাক্য গঠন</span>
              <span class="t-caption" data-testid="pp-weak-meta">ইংরেজি · ২ বার ভুল</span>
            </div>
            <a class="btn btn-secondary btn-sm" href="10-retake-class.html" data-testid="pp-weak-cta">দেখুন</a>
          </div>
        </section>
        <section class="card" data-component="chart" aria-labelledby="pp-compare-label">
          <p class="t-body t-semibold" id="pp-compare-label" data-testid="pp-compare-label">পুনরুদ্ধারের তুলনা</p>
          <p class="t-caption t-muted" data-testid="pp-compare-note">রি-এক্সাম দেওয়া হয়নি, তাই একটিমাত্র বার দেখানো হয়েছে।</p>
          <div class="pp-subject-head" style="margin-top:var(--space-md)">
            <span class="t-body-sm" data-testid="pp-compare-name">১ম সাময়িক · ১৬ অক্টোবর ২০২৬</span>
            <span class="t-body-sm t-bold" data-testid="pp-compare-v">৬৯%</span>
          </div>
          <div class="progress" style="margin-top:var(--space-sm)" role="progressbar" aria-valuenow="69"
               aria-valuemin="0" aria-valuemax="100" aria-label="১ম সাময়িকের নম্বর">
            <div class="progress-fill" style="width:69%" data-testid="pp-compare-bar"></div>
          </div>
          <button class="btn btn-secondary" style="width:100%;margin-top:var(--space-md)" data-testid="pp-print">
            <i data-lucide="printer"></i>
            প্রিন্ট
          </button>
        </section>

        <section class="card" data-component="list" aria-labelledby="pp-timeline-label">
          <p class="t-body t-semibold" id="pp-timeline-label" data-testid="pp-timeline-label">সময়রেখা</p>
          <div class="pp-weak" style="margin-top:var(--space-md)">
            <i data-lucide="clipboard-check" class="icon-md" aria-hidden="true"></i>
            <div class="pp-weak-text">
              <span class="t-body-sm t-semibold" data-testid="pp-timeline-name">১ম সাময়িক পরীক্ষা</span>
              <span class="t-caption" data-testid="pp-timeline-meta">১৬ অক্টোবর ২০২৬ · ৬৯%</span>
            </div>
            <span class="badge badge-success" data-testid="pp-timeline-status">উত্তীর্ণ</span>
          </div>
          <div class="pp-weak">
            <i data-lucide="circle-help" class="icon-md" aria-hidden="true"></i>
            <div class="pp-weak-text">
              <span class="t-body-sm t-semibold" data-testid="pp-timeline-name">কুইজ: ভগ্নাংশ চিহ্নিতকরণ</span>
              <span class="t-caption" data-testid="pp-timeline-meta">১৭ অক্টোবর ২০২৬ · ৮০%</span>
            </div>
            <span class="badge badge-success" data-testid="pp-timeline-status">উত্তীর্ণ</span>
          </div>
          <div class="pp-weak">
            <i data-lucide="circle-help" class="icon-md" aria-hidden="true"></i>
            <div class="pp-weak-text">
              <span class="t-body-sm t-semibold" data-testid="pp-timeline-name">কুইজ: সংখ্যারেখা</span>
              <span class="t-caption" data-testid="pp-timeline-meta">১৬ অক্টোবর ২০২৬ · ১০০%</span>
            </div>
            <span class="badge badge-success" data-testid="pp-timeline-status">উত্তীর্ণ</span>
          </div>
        </section>
<a class="btn btn-primary" href="20-parent-analytics.html" style="width:100%" data-testid="pp-analytics-cta">
          <i data-lucide="sparkles"></i>
          বিশ্লেষণ ও সুপারিশ
        </a>

      </div>`
  }
];
