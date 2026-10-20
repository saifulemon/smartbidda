// p1.mjs — assessment flow: lesson → quiz → result → retake → exams
export default [
  {
    file: '07-lesson.html',
    app: 'frontend',
    layout: 'StudentSubLayout',
    title: 'ভগ্নাংশ চিহ্নিতকরণ',
    backHref: '06-chapter-list.html',
    backTestId: 'lesson-back-appbar',
    titleTestId: 'lesson-title',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .lesson-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .lesson-video {
    position: relative;
    aspect-ratio: var(--aspect-video);
    background: var(--c-surface-soft);
    border-radius: var(--radius-lg);
    overflow: hidden;
    display: grid; place-items: center;
  }
  .lesson-play {
    position: absolute;
    inset: auto auto var(--space-md) var(--space-md);
    display: flex; align-items: center; gap: var(--space-sm);
  }
  .lesson-meta { display: flex; flex-wrap: wrap; gap: var(--space-sm); }
  .lesson-voice { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .lesson-voice-text { display: flex; gap: var(--space-sm); align-items: center; }
  .lesson-pdf { display: flex; align-items: center; gap: var(--space-md); }
  .lesson-pdf-thumb {
    width: 44px; height: 60px; flex-shrink: 0;
    background: var(--c-primary-soft); color: var(--c-ink);
    border: var(--border-w) solid var(--c-hairline);
    border-radius: var(--radius-sm);
    display: grid; place-items: center;
  }
  .lesson-pdf-body { flex: 1; min-width: 0; }
  .lesson-cta { width: 100%; }
`,
    content: `
      <div class="lesson-wrap">

        <div class="lesson-video" data-component="media">
          <div class="media-placeholder" data-component="media" role="img" aria-label="ভিডিও প্লেয়ার এলাকা">
            <i data-lucide="monitor-play" class="icon-lg" aria-hidden="true"></i>
            <p class="t-caption" data-testid="lesson-video-caption">ভিডিও প্লেয়ার এলাকা</p>
          </div>
          <div class="lesson-play">
            <button class="btn btn-primary btn-sm" data-testid="lesson-video-play">
              <i data-lucide="play" class="icon-sm"></i>
              চালান
            </button>
            <span class="t-caption" data-testid="lesson-video-time">১২:৪০</span>
          </div>
        </div>

        <div class="progress" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"
             aria-label="পাঠের অগ্রগতি">
          <div class="progress-fill" style="width:65%" data-testid="lesson-progress"></div>
        </div>
        <p class="t-caption" data-testid="lesson-progress-label">ভিডিওর ৬৫% দেখা হয়েছে</p>

        <div>
          <div class="row" style="justify-content:space-between">
            <span class="badge badge-primary" data-testid="lesson-subject">গণিত</span>
            <span class="t-caption" data-testid="lesson-chapter">অধ্যায় ৪</span>
          </div>
          <p class="t-title-lg" style="margin-top:var(--space-sm)" data-testid="lesson-title-text">ভগ্নাংশ চিহ্নিতকরণ</p>
          <p class="t-body-sm t-muted" style="margin-top:var(--space-xs)" data-testid="lesson-desc">
            ভগ্নাংশ চিহ্ন দেখে কোনটি বড়, কোনটি ছোট সেটি চিনতে হবে।
          </p>
          <div class="lesson-meta" style="margin-top:var(--space-md)">
            <span class="chip" data-testid="lesson-meta-duration"><i data-lucide="clock" class="icon-sm"></i> ১২ মিনিট</span>
            <span class="chip" data-testid="lesson-meta-class">চতুর্থ শ্রেণি</span>
          </div>
        </div>

        <section class="card" data-component="card" aria-labelledby="lesson-voice-heading">
          <div class="lesson-voice">
            <div class="lesson-voice-text">
              <i data-lucide="volume-2" class="icon-md" aria-hidden="true"></i>
              <div>
                <p class="t-body t-semibold" id="lesson-voice-heading" data-testid="lesson-voice-title">ভয়েস নির্দেশনা</p>
                <p class="t-caption" data-testid="lesson-voice-help">বাংলা কণ্ঠে পড়ে শোনাবে</p>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" data-testid="lesson-voice-toggle" aria-pressed="true">
              চালু আছে
            </button>
          </div>
        </section>

        <section class="card" data-component="media" aria-labelledby="lesson-pdf-title">
          <div class="lesson-pdf">
            <div class="lesson-pdf-thumb" role="img" aria-label="পাঠের পিডিএফ">
              <i data-lucide="file-text" class="icon-md" aria-hidden="true"></i>
            </div>
            <div class="lesson-pdf-body">
              <p class="t-body t-semibold" id="lesson-pdf-title" data-testid="lesson-pdf-title">পাঠের পিডিএফ</p>
              <p class="t-caption" data-testid="lesson-pdf-meta">২ পৃষ্ঠা · বাংলা</p>
            </div>
            <button class="btn btn-secondary btn-sm" data-testid="lesson-pdf-open">
              পড়ো
            </button>
          </div>
        </section>

        <!-- PRD L1496: "কুইজ শুরু করো" — hidden until ≥95% watched, disabled before
             threshold. 65% has been watched, so the row is rendered in its
             disabled state with the threshold spelled out. -->
        <div>
          <a class="btn btn-primary lesson-cta" href="08-quiz.html" aria-disabled="true"
             data-testid="lesson-cta-quiz">
            কুইজ শুরু করো
            <i data-lucide="arrow-right"></i>
          </a>
          <p class="t-caption t-muted" style="margin-top:var(--space-xs)" data-testid="lesson-cta-hint">
            ৯৫% দেখে ফেললেই কুইজ শুরু করা যাবে — এখন ৬৫% দেখা হয়েছে।
          </p>
        </div>

      </div>`
  },

  {
    file: '08-quiz.html',
    app: 'frontend',
    layout: 'StudentSubLayout',
    title: 'কুইজ',
    backHref: '07-lesson.html',
    backTestId: 'quiz-back-appbar',
    titleTestId: 'quiz-title',
    title: 'কুইজ',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .quiz-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .quiz-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .quiz-options { display: flex; flex-direction: column; gap: var(--space-md); padding: 0; }
  .quiz-option {
    display: flex; align-items: center; gap: var(--space-md);
    width: 100%;
    min-height: 64px;
    padding: var(--space-md) var(--space-lg);
    background: var(--c-surface);
    color: var(--c-body);
    border: var(--border-w) solid var(--c-hairline);
    border-radius: var(--radius-lg);
    text-align: left;
    cursor: pointer;
    font-family: var(--t-body-md-family);
    font-size: var(--t-body-lg-size);
    font-weight: var(--t-body-md-weight);
  }
  .quiz-option:hover { border-color: var(--c-primary); color: var(--c-ink); }
  .quiz-option[aria-pressed="true"] { background: var(--c-primary-soft); border-color: var(--c-primary); color: var(--c-ink); }
  .quiz-marker { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .quiz-timer {
    display: inline-flex; align-items: center; gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    background: var(--c-primary-soft); color: var(--c-ink);
    border-radius: var(--radius-pill);
    font-size: var(--t-caption-size); font-weight: var(--t-body-weight);
  }
  .quiz-dots { display: flex; gap: var(--space-sm); list-style: none; margin: 0; padding: 0; }
  .quiz-dot { width: 10px; height: 10px; border-radius: var(--radius-pill); background: var(--c-primary-soft); }
  .quiz-dot.is-done { background: var(--c-primary); }
  .quiz-dot.is-current { box-shadow: 0 0 0 3px var(--c-primary-soft); }
    .quiz-hint { display: flex; align-items: center; gap: var(--space-sm); }
`,
    content: `
      <div class="quiz-wrap">

        <div class="quiz-head">
          <span class="t-caption" data-testid="quiz-counter">প্রশ্ন ৩ / ১০</span>
          <span class="quiz-timer" role="timer" data-testid="quiz-timer">
            <i data-lucide="timer" class="icon-sm" aria-hidden="true"></i>
            ৪৮ সেকেন্ড বাকি
          </span>
        </div>

        <ol class="quiz-dots" role="group" aria-label="কুইজের অগ্রগতি" data-testid="quiz-dots">
          <li class="quiz-dot is-done" data-testid="quiz-dot" aria-label="প্রশ্ন 1"></li>
          <li class="quiz-dot is-done" data-testid="quiz-dot" aria-label="প্রশ্ন 2"></li>
          <li class="quiz-dot is-done is-current" data-testid="quiz-dot" aria-current="step" aria-label="প্রশ্ন 3"></li>
          <li class="quiz-dot " data-testid="quiz-dot" aria-label="প্রশ্ন 4"></li>
          <li class="quiz-dot " data-testid="quiz-dot" aria-label="প্রশ্ন 5"></li>
          <li class="quiz-dot " data-testid="quiz-dot" aria-label="প্রশ্ন 6"></li>
          <li class="quiz-dot " data-testid="quiz-dot" aria-label="প্রশ্ন 7"></li>
          <li class="quiz-dot " data-testid="quiz-dot" aria-label="প্রশ্ন 8"></li>
          <li class="quiz-dot " data-testid="quiz-dot" aria-label="প্রশ্ন 9"></li>
          <li class="quiz-dot " data-testid="quiz-dot" aria-label="প্রশ্ন 10"></li>
        </ol>

        <section aria-labelledby="quiz-question">
          <p class="t-caption" data-testid="quiz-subject">গণিত · অধ্যায় ৪</p>
          <p class="t-title-lg" id="quiz-question" style="margin-top:var(--space-xs)" data-testid="quiz-question">
            নিচের কোন অংশটি অর্ধেকের চেয়ে বড়?
          </p>
          <div class="quiz-hint" style="margin-top:var(--space-md)">
            <i data-lucide="image" class="icon-md" aria-hidden="true"></i>
            <span class="t-caption" data-testid="quiz-stimulus">ছবি: ভগ্নাংশের চিত্র</span>
          </div>
        </section>

        <div class="quiz-options" role="group" aria-label="উত্তরের বিকল্প">
          <button class="quiz-option" aria-pressed="false" data-testid="quiz-option">
            <span class="quiz-marker"><i data-lucide="circle" class="icon-sm" aria-hidden="true"></i></span>
            ১ / ৪
          </button>
          <button class="quiz-option" aria-pressed="true" data-testid="quiz-option" data-id="q3-b">
            <span class="quiz-marker"><i data-lucide="check-circle-2" class="icon-sm" aria-hidden="true"></i></span>
            ৩ / ৪
          </button>
          <button class="quiz-option" aria-pressed="false" data-testid="quiz-option">
            <span class="quiz-marker"><i data-lucide="circle" class="icon-sm" aria-hidden="true"></i></span>
            ১ / ৫
          </button>
          <button class="quiz-option" aria-pressed="false" data-testid="quiz-option">
            <span class="quiz-marker"><i data-lucide="circle" class="icon-sm" aria-hidden="true"></i></span>
            ২ / ৩
          </button>
        </div>

        <div class="card" data-component="card" data-testid="quiz-voice-panel">
          <div class="row">
            <i data-lucide="volume-2" class="icon-md" aria-hidden="true"></i>
            <span class="t-body-sm" data-testid="quiz-voice-label">প্রশ্নটি শুনে নিন</span>
            <button class="btn btn-ghost btn-sm" style="margin-left:auto" data-testid="quiz-voice-play">
              <i data-lucide="play" class="icon-sm"></i>
              শুনুন
            </button>
          </div>
        </div>

        <p class="t-caption" data-testid="quiz-auto-note">
          উত্তর দিলেই ০.৪ সেকেন্ড পরে পরের প্রশ্ন আসবে। শেষ প্রশ্নের উত্তর দেওয়া মাত্রই
          নিজে থেকেই জমা হয়ে যাবে — আলাদা করে জমা দিতে হবে না।
        </p>

      </div>`
  },

  {
    file: '09-quiz-result.html',
    app: 'frontend',
    layout: 'StudentSubLayout',
    title: 'কুইজের ফলাফল',
    backHref: '01-home.html',
    backTestId: 'quizres-back-appbar',
    titleTestId: 'quizres-title',
    title: 'ফলাফল',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .quizres-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .quizres-hero { text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-md); }
  .quizres-burst {
    display: grid; place-items: center;
    width: 120px; height: 120px;
    background: var(--c-primary-soft);
    border-radius: var(--radius-pill);
  }
  .quizres-score { display: flex; align-items: baseline; justify-content: center; gap: var(--space-sm); }
  .quizres-breakdown { display: flex; flex-direction: column; gap: var(--space-md); }
  .quizres-row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .quizres-actions { display: flex; flex-direction: column; gap: var(--space-md); }
`,
    content: `
      <div class="quizres-wrap">

        <div class="quizres-hero">
          <div class="quizres-burst" data-component="media">
            <i data-lucide="party-popper" class="icon-lg" aria-hidden="true"></i>
          </div>
          <p class="t-body-sm t-bold" data-testid="quizres-burst-points">+২৫ পয়েন্ট</p>
          <span class="badge badge-success" data-testid="quizres-status">উত্তীর্ণ</span>
          <p class="t-display-lg" data-testid="quizres-heading">দারুণ করেছ!</p>
          <p class="t-body-sm t-muted" data-testid="quizres-sub">ভগ্নাংশ চিহ্নিতকরণ · কুইজ</p>
        </div>

        <section class="card" data-component="kpi" aria-labelledby="quizres-score-label">
          <div class="quizres-score">
            <span class="t-display-xl" data-testid="quizres-score">৮০%</span>
            <span class="t-body-sm t-muted" data-testid="quizres-score-raw">৮ / ১০</span>
          </div>
          <p class="t-caption" id="quizres-score-label" style="margin-top:var(--space-xs)" data-testid="quizres-pass-note">
            উত্তীর্ণ হওয়ার জন্য প্রয়োজন ৬০%
          </p>
          <div class="progress" style="margin-top:var(--space-md)" role="progressbar"
               aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" aria-label="প্রাপ্ত নম্বর">
            <div class="progress-fill" style="width:80%" data-testid="quizres-bar"></div>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="quizres-breakdown-label">
          <p class="t-body t-semibold" id="quizres-breakdown-label" data-testid="quizres-breakdown-label">বিশ্লেষণ</p>
          <div class="quizres-breakdown" style="margin-top:var(--space-md)">
            <div class="quizres-row">
              <span class="t-body-sm" data-testid="quizres-correct">সঠিক উত্তর</span>
              <span class="t-body-sm t-bold" data-testid="quizres-correct-v">৮</span>
            </div>
            <div class="quizres-row">
              <span class="t-body-sm" data-testid="quizres-wrong">ভুল উত্তর</span>
              <span class="t-body-sm t-bold" data-testid="quizres-wrong-v">২</span>
            </div>
            <div class="quizres-row">
              <span class="t-body-sm" data-testid="quizres-time">সময় লেগেছে</span>
              <span class="t-body-sm t-bold" data-testid="quizres-time-v">৬ মিনিট ২০ সেকেন্ড</span>
            </div>
            <div class="quizres-row">
              <span class="t-body-sm" data-testid="quizres-points">পাওয়া পয়েন্ট</span>
              <span class="t-body-sm t-bold" data-testid="quizres-points-v">+২৫</span>
            </div>
          </div>
        </section>

        <div class="card" data-component="card" data-testid="quizres-weakness">
          <div class="row">
            <i data-lucide="target" class="icon-md" aria-hidden="true"></i>
            <div>
              <p class="t-body t-semibold" data-testid="quizres-weakness-title">দুর্বলতা শনাক্ত</p>
              <p class="t-caption" data-testid="quizres-weakness-body">ভগ্নাংশের তুলনা — ২ টি প্রশ্ন ভুল</p>
            </div>
          </div>
        </div>

        <div class="card" data-component="card" data-testid="quizres-voice">
          <div class="row">
            <i data-lucide="volume-2" class="icon-md" aria-hidden="true"></i>
            <span class="t-body-sm" data-testid="quizres-voice-label">ফলাফলের কণ্ঠস্বর</span>
            <button class="btn btn-ghost btn-sm" style="margin-left:auto" data-testid="quizres-voice-play">
              <i data-lucide="play" class="icon-sm"></i>
              শুনুন
            </button>
          </div>
        </div>

        <div class="quizres-actions">
          <a class="btn btn-primary" href="05-subject-list.html" style="width:100%" data-testid="quizres-next-lesson">
            পরের পড়ায় যাও
            <i data-lucide="arrow-right"></i>
          </a>
          <a class="btn btn-ghost" href="01-home.html" style="width:100%" data-testid="quizres-home">হোমে ফিরে যান</a>
        </div>

      </div>`
  },

  {
    file: '10-retake-class.html',
    app: 'frontend',
    layout: 'StudentSubLayout',
    title: 'আবার দেখুন',
    backHref: '09-quiz-result.html',
    backTestId: 'retake-back-appbar',
    titleTestId: 'retake-title',
    title: 'আবার দেখুন',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .retake-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .retake-top { display: flex; flex-direction: column; gap: var(--space-sm); }
  .retake-count { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-md); }
  .retake-card { display: flex; gap: var(--space-md); align-items: flex-start; }
  .retake-card-text { display: flex; flex-direction: column; gap: var(--space-xs); }
  .retake-actions { display: flex; flex-direction: column; gap: var(--space-md); }
`,
    content: `
      <div class="retake-wrap">

        <div class="retake-top">
          <span class="badge badge-primary" data-testid="retake-status">চলছে</span>
          <p class="t-title-lg" data-testid="retake-heading">ভগ্নাংশের তুলনা — আবার শিখি</p>
          <p class="t-body-sm t-muted" data-testid="retake-desc">
            এই পাঠে দুটো পরীক্ষায় ভগ্নাংশ নিয়ে ভুল হয়েছে, তাই আবার দেখে বোঝা দরকার।
          </p>
        </div>

        <section class="card" data-component="card" aria-labelledby="retake-cap-label">
          <div class="retake-count">
            <span class="t-body t-semibold" id="retake-cap-label" data-testid="retake-cap-label">অগ্রগতি</span>
            <span class="t-body-sm t-bold" data-testid="retake-cap-value">১ / ২ রিটেক শেষ</span>
          </div>
          <div class="progress" style="margin-top:var(--space-sm)" role="progressbar"
               aria-valuenow="1" aria-valuemin="0" aria-valuemax="2" aria-label="রিটেকের অগ্রগতি">
            <div class="progress-fill" style="width:50%" data-testid="retake-cap-bar"></div>
          </div>
          <p class="t-caption" style="margin-top:var(--space-sm)" data-testid="retake-cap-note">
            দুটির একটি শেষ হয়েছে — বাকিটা শেষ হলে রি-এক্সাম খুলবে।
          </p>
        </section>

        <div class="card" data-component="media">
          <div class="retake-card">
            <div class="media-placeholder" data-component="media" role="img" aria-label="রিমিডিয়াল ভিডিও এলাকা">
              <i data-lucide="video" class="icon-md" aria-hidden="true"></i>
              <p class="t-caption" data-testid="retake-media-caption">ভিডিও এলাকা</p>
            </div>
            <div class="retake-card-text">
              <span class="badge badge-primary" data-testid="retake-source">শিক্ষকের লাইব্রেরি</span>
              <p class="t-body t-semibold" data-testid="retake-title-text">ভগ্নাংশের তুলনা — সহজ ব্যাখ্যা</p>
              <p class="t-caption" data-testid="retake-meta">৪ মিনিট · বাংলা ভয়েস সহ</p>
            </div>
          </div>
        </div>

        <section class="card" data-component="media" aria-labelledby="retake-pdf-title">
          <div class="lesson-pdf">
            <div class="lesson-pdf-thumb" role="img" aria-label="রিটেকের পিডিএফ">
              <i data-lucide="file-text" class="icon-md" aria-hidden="true"></i>
            </div>
            <div class="lesson-pdf-body">
              <p class="t-body t-semibold" id="retake-pdf-title" data-testid="retake-pdf-title">রিটেক নোট</p>
              <p class="t-caption" data-testid="retake-pdf-meta">১ পৃষ্ঠা · বাংলা</p>
            </div>
            <button class="btn btn-secondary btn-sm" data-testid="retake-pdf-open">পড়ো</button>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="retake-check-label">
          <div class="retake-count">
            <span class="t-body t-semibold" id="retake-check-label" data-testid="retake-check-label">বোঝাপড়া যাচাই</span>
            <span class="t-body-sm t-bold" data-testid="retake-check-count">১ / ৩</span>
          </div>
          <p class="t-caption" style="margin-top:var(--space-sm)" data-testid="retake-check-q1">
            ১। ৩/৪ এর সমান কোনটি?
          </p>
          <div class="quiz-options" style="margin-top:var(--space-sm)">
            <button class="quiz-option" aria-pressed="true" data-testid="retake-check-option">
              <span class="quiz-marker"><i data-lucide="check-circle-2" class="icon-sm" aria-hidden="true"></i></span>
              ৬/৮
            </button>
            <button class="quiz-option" aria-pressed="false" data-testid="retake-check-option">
              <span class="quiz-marker"><i data-lucide="circle" class="icon-sm" aria-hidden="true"></i></span>
              ২/৩
            </button>
          </div>
          <p class="t-caption" style="margin-top:var(--space-sm)" data-testid="retake-check-note">
            সবগুলো প্রশ্নের উত্তর দিতে হবে — নইলে সম্পন্ন করা যাবে না।
          </p>
        </section>

        <div class="retake-actions">
          <!-- PRD L1734 Complete button: hidden until content consumed, disabled before
               threshold. The child is on question 1 of 3, so it is disabled. -->
          <button class="btn btn-primary" aria-disabled="true" style="width:100%" data-testid="retake-complete">
            <i data-lucide="check"></i>
            সম্পন্ন করুন
          </button>
          <!-- PRD L1815 Re-exam button: disabled until the retake is completed -->
          <a class="btn btn-secondary" href="11-exam-list.html" aria-disabled="true" style="width:100%" data-testid="retake-reexam">
            রি-এক্সাম
          </a>
          <a class="btn btn-ghost" href="01-home.html" style="width:100%" data-testid="retake-skip">হোমে ফিরে যান</a>
        </div>

      </div>`
  },

  {
    file: '11-exam-list.html',
    app: 'frontend',
    layout: 'StudentLayout',
    activeTab: 'exams',
    title: 'পরীক্ষা',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .exams-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .exam-card { display: flex; flex-direction: column; gap: var(--space-md); }
  .exam-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-md); }
  .exam-meta { display: flex; flex-wrap: wrap; gap: var(--space-sm); }
  .exam-window { display: flex; align-items: center; gap: var(--space-sm); }
`,
    content: `
      <div class="exams-wrap">

        <div>
          <p class="t-title-lg" data-testid="exams-heading">পরীক্ষা</p>
          <p class="t-body-sm t-muted" data-testid="exams-sub">চতুর্থ শ্রেণি · ২০২৬ সাল</p>
        </div>

        <section aria-label="চলমান ও আসন্ন পরীক্ষা">

          <article class="card card-interactive exam-card" data-component="card" data-testid="exams-item">
            <div class="exam-card-head">
              <div>
                <p class="t-title-md" data-testid="exams-item-title">১ম সাময়িক পরীক্ষা</p>
                <p class="t-caption" data-testid="exams-item-sub">গণিত · বাংলা · ইংরেজি</p>
              </div>
              <span class="badge badge-success" data-testid="exams-item-status">উত্তীর্ণ</span>
            </div>
            <div class="exam-meta">
              <span class="chip" data-testid="exams-item-date"><i data-lucide="calendar" class="icon-sm"></i> ১০–১৬ অক্টোবর ২০২৬</span>
              <span class="chip" data-testid="exams-item-pass">উত্তীর্ণ ৬০%</span>
              <span class="chip" data-testid="exams-item-time">১ ঘণ্টা</span>
            </div>
            <div class="exam-window">
              <i data-lucide="check-circle-2" class="icon-sm" aria-hidden="true"></i>
              <span class="t-body-sm" data-testid="exams-item-window">ফলাফল প্রকাশিত হয়েছে</span>
              <span class="t-caption t-muted" data-testid="exams-item-score">· সর্বশেষ ফলাফল ৬৯%</span>
            </div>
            <div class="progress is-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                 aria-label="পরীক্ষার অগ্রগতি">
              <div class="progress-fill" style="width:100%" data-testid="exams-item-progress"></div>
            </div>
            <p class="t-caption" data-testid="exams-item-progress-label">৩ / ৩ বিষয় দেওয়া হয়েছে</p>
            <a class="btn btn-primary" href="13-exam-result.html" data-testid="exams-item-cta">ফলাফল দেখুন</a>
          </article>

          <article class="card card-interactive exam-card" style="margin-top:var(--space-lg)" data-component="card" data-testid="exams-item">
            <div class="exam-card-head">
              <div>
                <p class="t-title-md" data-testid="exams-item-title">অর্ধবার্ষিক পরীক্ষা</p>
                <p class="t-caption" data-testid="exams-item-sub">সকল বিষয়</p>
              </div>
              <span class="badge" data-testid="exams-item-status">আসন্ন</span>
            </div>
            <div class="exam-meta">
              <span class="chip" data-testid="exams-item-date"><i data-lucide="calendar" class="icon-sm"></i> ১২–২০ ডিসেম্বর ২০২৬</span>
              <span class="chip" data-testid="exams-item-pass">উত্তীর্ণ ৬০%</span>
              <span class="chip" data-testid="exams-item-time">২ ঘণ্টা</span>
            </div>
            <div class="exam-window">
              <i data-lucide="calendar-clock" class="icon-sm" aria-hidden="true"></i>
              <span class="t-body-sm" data-testid="exams-item-window">৫৬ দিন পরে শুরু</span>
            </div>
            <p class="t-body-sm t-muted" data-testid="exams-item-locked">শুরুর আগে প্রস্তুতির পাঠ দেখা যাবে</p>
            <button class="btn btn-primary" aria-disabled="true" style="width:100%" data-testid="exams-item-start">শুরু করো</button>
          </article>

        </section>

        <article class="card card-interactive exam-card" style="margin-top:var(--space-lg)" data-component="card" data-testid="exams-item">
          <div class="exam-card-head">
            <div>
              <p class="t-title-md" data-testid="exams-item-title">বার্ষিক পরীক্ষা</p>
              <p class="t-caption" data-testid="exams-item-sub">সকল বিষয়</p>
            </div>
            <span class="badge" data-testid="exams-item-status">আসন্ন</span>
          </div>
          <div class="exam-meta">
            <span class="chip" data-testid="exams-item-date"><i data-lucide="calendar" class="icon-sm"></i> ০৫–১৫ মে ২০২৭</span>
            <span class="chip" data-testid="exams-item-pass">উত্তীর্ণ ৬০%</span>
            <span class="chip" data-testid="exams-item-time">২ ঘণ্টা</span>
          </div>
          <div class="exam-window">
            <i data-lucide="calendar-clock" class="icon-sm" aria-hidden="true"></i>
            <span class="t-body-sm" data-testid="exams-item-window">২০০ দিন পরে শুরু</span>
          </div>
          <!-- PRD L1813: Start button is greyed when the exam is upcoming -->
          <button class="btn btn-primary" aria-disabled="true" style="width:100%" data-testid="exams-item-start">শুরু করো</button>
        </article>

      </div>`
  },

  {
    file: '12-exam.html',
    app: 'frontend',
    layout: 'StudentSubLayout',
    title: '১ম সাময়িক পরীক্ষা',
    backHref: '11-exam-list.html',
    backTestId: 'exam-back-appbar',
    titleTestId: 'exam-title',
    title: 'পরীক্ষা',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .exam-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .exam-status { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .exam-timer {
    display: inline-flex; align-items: center; gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    background: var(--c-primary-soft); color: var(--c-ink);
    border-radius: var(--radius-pill);
    font-size: var(--t-caption-size); font-weight: var(--t-body-weight);
  }
  .exam-nav-flag { background: color-mix(in srgb, var(--c-warning) 12%, var(--c-canvas)); border-color: var(--c-warning); }
  .exam-saved { display: flex; align-items: center; gap: var(--space-xs); }
  .exam-nav { display: flex; flex-wrap: wrap; gap: var(--space-sm); }
  .exam-q { display: flex; flex-direction: column; gap: var(--space-md); }
  .exam-options { display: flex; flex-direction: column; gap: var(--space-md); padding: 0; }
  .exam-choice {
    display: flex; align-items: center; gap: var(--space-md);
    width: 100%; min-height: 64px;
    padding: var(--space-md) var(--space-lg);
    background: var(--c-surface); color: var(--c-body);
    border: var(--border-w) solid var(--c-hairline);
    border-radius: var(--radius-lg);
    text-align: left; cursor: pointer;
    font-family: var(--t-body-md-family);
    font-size: var(--t-body-lg-size);
    font-weight: var(--t-body-md-weight);
  }
  .exam-choice[aria-pressed="true"] { background: var(--c-primary-soft); border-color: var(--c-primary); color: var(--c-ink); }
  .exam-foot { display: flex; gap: var(--space-md); }
`,
    content: `
      <div class="exam-wrap">

        <div class="exam-status">
          <span class="t-caption" data-testid="exam-counter">প্রশ্ন ২ / ৫০</span>
          <span class="exam-timer" role="timer" data-testid="exam-timer">
            <i data-lucide="timer" class="icon-sm" aria-hidden="true"></i>
            ৫৭:৩২
          </span>
          <span class="exam-saved t-caption" data-testid="exam-saved">
            <i data-lucide="check-circle-2" class="icon-sm" aria-hidden="true"></i>
            সংরক্ষিত হয়েছে
          </span>
        </div>

        <div class="progress" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="100"
             aria-label="পরীক্ষার অগ্রগতি">
          <div class="progress-fill" style="width:4%" data-testid="exam-bar"></div>
        </div>

        <div class="exam-nav" role="group" aria-label="প্রশ্ন নেভিগেশন">
          <button class="chip" aria-pressed="true" data-testid="exam-nav-q1">১</button>
          <button class="chip exam-nav-flag" aria-pressed="true" data-testid="exam-nav-q2">২</button>
          <button class="chip" data-testid="exam-nav-q3">৩</button>
          <button class="chip" data-testid="exam-nav-q4">৪</button>
          <button class="chip" data-testid="exam-nav-q5">৫</button>
          <button class="chip" data-testid="exam-nav-more">+৪৫</button>
        </div>

        <section class="exam-q" aria-labelledby="exam-question">
          <div class="row">
            <span class="badge badge-primary" data-testid="exam-subject">গণিত</span>
            <span class="t-caption" data-testid="exam-qtype">বহুনির্বাচনী</span>
          </div>
          <p class="t-title-lg" id="exam-question" data-testid="exam-question">
            ২৫ এর ২০% কত?
          </p>
        </section>

        <div class="exam-options" role="group" aria-label="উত্তরের বিকল্প">
          <button class="exam-choice" aria-pressed="false" data-testid="exam-option">৫</button>
          <button class="exam-choice" aria-pressed="true" data-testid="exam-option" data-id="q2-b">৪</button>
          <button class="exam-choice" aria-pressed="false" data-testid="exam-option">৬</button>
          <button class="exam-choice" aria-pressed="false" data-testid="exam-option">১০</button>
        </div>

        <div class="card" data-component="card" data-testid="exam-note">
          <div class="row">
            <i data-lucide="info" class="icon-md" aria-hidden="true"></i>
            <p class="t-caption" data-testid="exam-note-text">
              উত্তর নির্বাচন করলে নিজে থেকে সংরক্ষণ হবে। পরে ফিরে এসে বদলাতে পারবে।
            </p>
          </div>
        </div>

        <div class="exam-foot">
          <button class="btn btn-secondary" style="flex:1" data-testid="exam-prev">
            <i data-lucide="chevron-left"></i>
            আগের
          </button>
          <button class="btn btn-primary" style="flex:1" data-testid="exam-next">
            পরের প্রশ্ন
            <i data-lucide="chevron-right"></i>
          </button>
        </div>
        <button class="btn btn-secondary" aria-pressed="false" data-testid="exam-flag">
          <i data-lucide="flag" class="icon-sm"></i>
          ফ্ল্যাগ
        </button>
        <button class="btn btn-primary" data-testid="exam-submit">জমা দাও</button>

      </div>`
  },

  {
    file: '13-exam-result.html',
    app: 'frontend',
    layout: 'StudentSubLayout',
    title: 'পরীক্ষার ফলাফল',
    backHref: '11-exam-list.html',
    backTestId: 'examres-back-appbar',
    titleTestId: 'examres-title',
    title: 'ফলাফল',
    style: `
  /* page-local layout only — every colour / size / radius / shadow is a token */
  .examres-wrap {
    display: flex; flex-direction: column;
    gap: var(--space-lg);
    padding: var(--space-lg) 0 var(--space-xxl);
    /* notch / home-indicator clearance — this page's own layout class */
    padding-bottom: env(safe-area-inset-bottom, var(--space-xxl));
    max-width: 760px;
  }
  .examres-head { display: flex; flex-direction: column; gap: var(--space-sm); }
  .examres-compare { display: flex; flex-direction: column; gap: var(--space-md); }
  .examres-compare-row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .examres-subjects { display: flex; flex-direction: column; gap: var(--space-md); }
  .examres-subject-row { display: flex; flex-direction: column; gap: var(--space-xs); }
  .examres-subject-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
  .examres-actions { display: flex; flex-direction: column; gap: var(--space-md); }
`,
    content: `
      <div class="examres-wrap">

        <div class="examres-head">
          <span class="badge badge-success" data-testid="examres-status">উত্তীর্ণ</span>
          <p class="t-display-lg" data-testid="examres-heading">১ম সাময়িক পরীক্ষা</p>
          <p class="t-body-sm t-muted" data-testid="examres-date">চতুর্থ শ্রেণি · ১৬ অক্টোবর ২০২৬</p>
        </div>

        <section class="card" data-component="kpi" aria-label="ফলাফল">
          <div class="row" style="justify-content:center;gap:var(--space-lg)">
            <div style="text-align:center">
              <p class="t-caption" data-testid="examres-score-label">প্রাপ্ত</p>
              <p class="t-display-lg" data-testid="examres-score">৬৯%</p>
            </div>
            <div style="text-align:center">
              <p class="t-caption" data-testid="examres-pass-label">উত্তীর্ণ</p>
              <p class="t-display-md" data-testid="examres-pass">৬০%</p>
            </div>
            <div style="text-align:center">
              <p class="t-caption" data-testid="examres-rank-label">শ্রেণি অবস্থান</p>
              <p class="t-display-md" data-testid="examres-rank">১৮তম</p>
            </div>
          </div>
        </section>

        <!-- 3.6: a term exam attempt is support-quotable; the UUID never shows -->
        <p class="t-caption t-muted" style="text-align:center" data-testid="examres-attempt-no">
          প্রচেষ্টা নং <span class="t-code">SB-EXM-20261016-0487</span>
        </p>

        <section class="card" data-component="card" aria-labelledby="examres-compare-label">
          <p class="t-body t-semibold" id="examres-compare-label" data-testid="examres-compare-label">সামগ্রিক নম্বর</p>
          <p class="t-caption t-muted" data-testid="examres-compare-note">
            রি-এক্সাম দেওয়া হয়নি, তাই একটিমাত্র বার দেখানো হচ্ছে।
          </p>
          <div class="examres-compare" style="margin-top:var(--space-md)">
            <div class="examres-compare-row">
              <span class="t-body-sm" data-testid="examres-before">১ম সাময়িক · ১৬ অক্টোবর ২০২৬</span>
              <span class="t-body-sm t-bold" data-testid="examres-before-v">৬৯%</span>
            </div>
            <div class="progress" role="progressbar" aria-valuenow="69" aria-valuemin="0" aria-valuemax="100"
                 aria-label="এই পরীক্ষার নম্বর">
              <div class="progress-fill" style="width:69%" data-testid="examres-bar"></div>
            </div>
          </div>
        </section>

        <section class="card" data-component="list" aria-labelledby="examres-subjects-label">
          <p class="t-body t-semibold" id="examres-subjects-label" data-testid="examres-subjects-label">পাঠভিত্তিক নম্বর</p>
          <p class="t-caption t-muted" data-testid="examres-subjects-note">কম পাওয়া বিষয় আগে দেখানো হচ্ছে।</p>
          <div class="examres-subjects" style="margin-top:var(--space-md)">
            <div class="examres-subject-row">
              <div class="examres-subject-head">
                <span class="t-body-sm" data-testid="examres-topic-name">ভগ্নাংশের তুলনা · গণিত</span>
                <span class="t-body-sm t-bold" data-testid="examres-topic-v">৪৮%</span>
              </div>
              <div class="progress is-sm" role="progressbar" aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"
                   aria-label="গণিত নম্বর">
                <div class="progress-fill is-warning" style="width:48%" data-testid="examres-topic-bar"></div>
              </div>
            </div>
            <div class="examres-subject-row">
              <div class="examres-subject-head">
                <span class="t-body-sm" data-testid="examres-topic-name">বাক্য গঠন · ইংরেজি</span>
                <span class="t-body-sm t-bold" data-testid="examres-topic-v">৫৮%</span>
              </div>
              <div class="progress is-sm" role="progressbar" aria-valuenow="58" aria-valuemin="0" aria-valuemax="100"
                   aria-label="ই ং র ে জ ি নম্বর">
                <div class="progress-fill is-warning" style="width:58%" data-testid="examres-topic-bar"></div>
              </div>
            </div>
            <div class="examres-subject-row">
              <div class="examres-subject-head">
                <span class="t-body-sm" data-testid="examres-topic-name">বাংলা ব্যাকরণ · বাংলা</span>
                <span class="t-body-sm t-bold" data-testid="examres-topic-v">৬৪%</span>
              </div>
              <div class="progress is-sm" role="progressbar" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100"
                   aria-label="ব া ং ল া নম্বর">
                <div class="progress-fill" style="width:64%" data-testid="examres-topic-bar"></div>
              </div>
            </div>
            <div class="examres-subject-row">
              <div class="examres-subject-head">
                <span class="t-body-sm" data-testid="examres-topic-name">ভগ্নাংশচিহ্নিতকরণ · গণিত</span>
                <span class="t-body-sm t-bold" data-testid="examres-topic-v">৭২%</span>
              </div>
              <div class="progress is-sm" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"
                   aria-label="গ ণ ি ত নম্বর">
                <div class="progress-fill" style="width:72%" data-testid="examres-topic-bar"></div>
              </div>
            </div>
            <div class="examres-subject-row">
              <div class="examres-subject-head">
                <span class="t-body-sm" data-testid="examres-topic-name">মৌখিক প্রকাশ · গণিত</span>
                <span class="t-body-sm t-bold" data-testid="examres-topic-v">৮২%</span>
              </div>
              <div class="progress is-sm" role="progressbar" aria-valuenow="82" aria-valuemin="0" aria-valuemax="100"
                   aria-label="গ ণ ি ত নম্বর">
                <div class="progress-fill" style="width:82%" data-testid="examres-topic-bar"></div>
              </div>
            </div>
          </div>
        </section>
        <!-- PRD L1973: Weak-topic list — topic names + retake status, hidden when none -->
        <section class="card" data-component="list" aria-labelledby="examres-weak-label">
          <p class="t-body t-semibold" id="examres-weak-label" data-testid="examres-weak-label">দুর্বল পাঠ</p>
          <div class="examres-subjects" style="margin-top:var(--space-md)">
            <div class="examres-subject-row">
              <div class="examres-subject-head">
                <span class="t-body-sm" data-testid="examres-weak-name">ভগ্নাংশের তুলনা</span>
                <span class="badge badge-warning" data-testid="examres-weak-status">রিটেক প্রয়োজন</span>
              </div>
              <p class="t-caption" data-testid="examres-weak-meta">গণিত · ৪৮% · উত্তীর্ণের নিচে ১২ পয়েন্ট</p>
            </div>
            <div class="examres-subject-row">
              <div class="examres-subject-head">
                <span class="t-body-sm" data-testid="examres-weak-name">বাক্য গঠন</span>
                <span class="badge badge-warning" data-testid="examres-weak-status">রিটেক প্রয়োজন</span>
              </div>
              <p class="t-caption" data-testid="examres-weak-meta">ইংরেজি · ৫৮% · উত্তীর্ণের নিচে ২ পয়েন্ট</p>
            </div>
          </div>
          <!-- PRD L1816: a pending retake blocks the re-exam and routes here -->
          <a class="btn btn-secondary" href="10-retake-class.html" style="width:100%;margin-top:var(--space-md)" data-testid="examres-weak-retake">
            রিটেক ক্লাসে যান
            <i data-lucide="arrow-right"></i>
          </a>
        </section>

        <div class="examres-actions">
          <a class="btn btn-primary" href="06-chapter-list.html" style="width:100%" data-testid="examres-next">
            পরের পড়ায় যাও
            <i data-lucide="arrow-right"></i>
          </a>
          <button class="btn btn-secondary" style="width:100%" data-testid="examres-print">
            <i data-lucide="printer"></i>
            প্রিন্ট
          </button>
          <a class="btn btn-ghost" href="01-home.html" style="width:100%" data-testid="examres-home">হোমে ফিরে যান</a>
        </div>

      </div>`
  }
];
