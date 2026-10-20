// states.mjs — render one <page>.states.html sibling per route page.
//
// Route pages carry ONLY the happy path (SKILL step 4). Every PRD state
// screen, error message and edge case lands here, in frames that are each a
// separate state — never co-rendered. Content comes from gen/states.json,
// which extract_states.py pulls straight out of the PRD; nothing on this
// sheet is authored prose except the per-kind label and the frame chrome.
//
// The PRD writes two languages in one cell: the Bangla string the screen
// shows, and the English instruction telling the builder what to do with it.
// Only the Bangla half is printed — the English half would ship through the
// 1:1 conversion.
import { writeFile, readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';

const BASE = new URL('../base/', import.meta.url).pathname;
const S = JSON.parse(readFileSync(new URL('./states.json', import.meta.url), 'utf8'));

// Route pages are a mix of generated (gen/*.mjs) and hand-written (01-06), so
// a states sheet is derived from the RENDERED sibling rather than re-rendered:
// same chrome, same body markers, same stylesheet links — only the <title>,
// the body's dev-states marker, the page-local <style> and the <main>
// contents change. Deriving also keeps the chrome byte-identical to its route
// page by construction, and dropping the page-local <style> is required: an
// identical selector in two files is the duplicated-component FAIL.
const styleBlock = `  /* state sheet — every class below is shared (styles/components.css) */`;

// PRD category / error-type names are English spec prose; the frame label is
// the one thing on the sheet a reader sees before the Bangla copy, so it is
// translated here (closed sets — extract_states.py reports any new one).
const CAT = {
  'Zero data': 'খালি তথ্য', 'Filter combination': 'ফিল্টার', 'Filter empty': 'ফিল্টার খালি',
  'Max capacity': 'সর্বোচ্চ সীমা', 'Offline': 'অফলাইন', 'Screen-time exhausted': 'স্ক্রিন টাইম শেষ',
  'Lockout': 'লকআউট', 'Bulk operation': 'বাল্ক অপারেশন', 'Concurrent edit': 'একসাথে সম্পাদনা',
  'FK dependency': 'সংযুক্ত রেকর্ড', 'Concurrent access': 'একাধিক ডিভাইস',
  'Self-demotion': 'নিজের ভূমিকা', 'Order collision': 'অর্ডার সংঘাত',
  'Entitlement lapse': 'সাবস্ক্রিপশন শেষ', 'Retake pending': 'রিটেক বাকি',
  'Oversized upload': 'বড় ফাইল', 'Missing attestation': 'ভিডিও সমর্থন নেই',
  'Missing VO asset': 'ভয়েস অ্যাসেট নেই', 'VO asset missing': 'ভয়েস অ্যাসেট নেই',
  'Tier coverage': 'টিয়ার সমস্যা', 'Threshold change mid-exam': 'পাস মান বদল',
  'Insufficient questions': 'প্রশ্ন কম', 'Perfect score': 'নিখুঁত নম্বর',
  'Escalation': 'এস্কেলেশন', 'Escalated': 'এস্কেলেশন', 'Stuck PENDING': 'পেন্ডিং আটকে',
  'Variable parity': 'ভ্যারিয়েবল মিল', 'No re-exam yet': 'রি-এক্সাম নেই',
  'Self opted out': 'নিজের নাম লুকানো', 'All earned': 'সব ব্যাজ শেষ',
  'Nudge cap': 'নাডজ সীমা', 'Low sample': 'কম নমুনা', 'Immediate effect': 'তাৎক্ষণিক প্রভাব',
  'Abandoned': 'পরিত্যক্ত', 'Duplicate webhook': 'ডুপ্লিকেট ওয়েবহুক',
  'Refund with active period': 'সক্রিয় সময়ে ফেরত', 'Mandatory edit': 'বাধ্যতামূলক সম্পাদনা',
  'Sensitive fields': 'সংবেদনশীল তথ্য', 'Retention': 'মেয়াদ',
};
const ERR = {
  'Network error': 'ইন্টারনেট সংযোগ', 'Server error': 'সার্ভার ত্রুটি',
  'Permission denied': 'অনুমতি নেই', 'Validation error': 'ভ্যালিডেশন',
  'Rate limit': 'সীমা ছাড়িয়েছে', 'Duplicate': 'দ্বিতীয়বার', 'Limit reached': 'সীমা পূর্ণ',
  'Not found': 'পাওয়া যায়নি', 'Conflict': 'দ্বন্দ্ব', 'Insufficient data': 'তথ্য অপ্রতুল',
  'Gateway failure': 'পেমেন্ট গেটওয়ে', 'Session expired': 'সেশন শেষ',
};

// Strings the PRD names in a component table or an interaction, which the
// §3 / §7 / §8 pull cannot reach — parked here rather than dropped. The note
// under each is Bangla like everything else on the sheet: it ships.
const EXTRA = {
  '14-leaderboard.html': [
    { label: 'অপ্ট-আউট নোটিশ', ui: 'তুমি লিডারবোর্ডে দেখাচ্ছো না',
      note: 'অপ্ট-আউট করলে এই নোটিশ দেখা যায় — ভিত্তিপর্দায় শুধু প্রবেশের সময়' },
    { label: 'লোড হচ্ছে', loading: true },
  ],
  '15-rewards.html': [
    { label: 'সাম্প্রতিক পয়েন্ট · খালি', ui: 'এখনো কিছু নেই',
      note: 'সাম্প্রতিক পয়েন্ট তালিকায় কিছু না থাকলে' },
  ],
  '23-subscription.html': [
    { label: 'পেমেন্ট যাচাই', ui: 'পেমেন্ট যাচাই হচ্ছে...', spinner: true,
      note: 'গেটওয়ে থেকে ফল ফিরে আসার আগ পর্যন্ত' },
  ],
  '24-parent-settings.html': [
    { label: 'সন্তান যোগ করো · নিষ্ক্রিয়', disabledBtn: 'সন্তান যোগ করো',
      note: '৩ জন সন্তান যোগ হলে বোতামটি এভাবেই নিষ্ক্রিয় থাকে' },
  ],
};

const SKEL = `            <div class="skeleton" style="height:16px;width:72%"></div>
            <div class="skeleton" style="height:16px;width:100%"></div>
            <div class="skeleton" style="height:16px;width:54%"></div>`;

function card(n, route, kind, label, body) {
  return `        <section class="card" data-component="card" aria-labelledby="st-${n}-label">
          <div class="stcard-head">
            <span class="stcard-kind" data-testid="st-kind">${kind}</span>
            <code class="t-code" data-testid="st-ref">${route}</code>
          </div>
          <p class="t-body t-semibold" id="st-${n}-label" data-testid="st-label">${label}</p>
          <div class="stcard-body" data-testid="st-frame">
${body}
          </div>
        </section>`;
}

function build(file) {
  const d = S[file];
  const route = d.route;
  const seen = new Set();
  const out = [];
  let n = 0;
  // two strings that differ only by a trailing ellipsis / danda are the same
  // state — `পেমেন্ট যাচাই হচ্ছে...` (component) and its edge row would otherwise
  // render twice, once without the spinner that is the whole point of the frame
  const norm = (s) => s.replace(/[.…\s।]+$/, '');
  const push = (kind, label, body, key) => {
    if (key) {
      key = norm(key);
      if (seen.has(key)) return;
      seen.add(key);
    }
    out.push(card(++n, route, kind, label, body));
  };

  const scr = d.screens || {};
  if (scr.loading && scr.loading.raw && !/N\/A/i.test(scr.loading.raw)) {
    push('লোডিং', 'লোড হচ্ছে', SKEL, '__loading');
  }
  // Admin pages carry no §3 State Screens — the PRD defers loading/empty/error
  // for all 12 to an admin-standards.md that was never delivered (L2971), so
  // only the copy-free skeleton ships here; the empty/error copy for listings
  // whose own Edge Cases name no Bangla string stays a recorded PRD gap.
  if (d.kind === 'admin') {
    push('লোডিং', 'লোড হচ্ছে', SKEL, '__loading');
  }
  if (scr.empty && scr.empty.ui) {
    push('খালি', 'কিছু নেই',
      `            <div class="empty-state" data-testid="st-empty">
              <p class="t-body">${scr.empty.ui}</p>
            </div>`, scr.empty.ui);
  }
  if (scr.error && scr.error.ui) {
    const retry = /আবার চেষ্টা করো/.test(scr.error.ui) ? '' :
      `\n            <button class="btn btn-secondary" data-testid="st-retry" style="align-self:flex-start">আবার চেষ্টা করো</button>`;
    push('ত্রুটি', 'লোড করা যায়নি',
      `            <p class="t-body" data-testid="st-error">${scr.error.ui}</p>` + retry,
      scr.error.ui);
  }

  if (d.errors && d.errors.length) {
    const rows = d.errors
      .map((e) => `            <div class="strow">
              <span class="t-caption" data-testid="st-err-kind">${ERR[e.type] || 'ত্রুটি'}</span>
              <span class="t-body-sm" data-testid="st-err-msg">${e.message}</span>
            </div>`)
      .join('\n');
    push('ত্রুটি বার্তা', 'কোন অবস্থায় কী দেখাবে', rows, '__errors');
  }

  for (const x of EXTRA[file] || []) {
    if (x.loading) {
      push('লোডিং', x.label || 'লোড হচ্ছে', SKEL, '__loading');
      continue;
    }
    if (x.disabledBtn) {
      push('বিশেষ অবস্থা', x.label,
        `            <button class="btn btn-primary" disabled data-testid="st-disabled">${x.disabledBtn}</button>
            <p class="t-caption t-muted" data-testid="st-note">${x.note}</p>`, x.disabledBtn);
      continue;
    }
    const spin = x.spinner
      ? `            <span class="spinner" role="status" aria-label="যাচাই হচ্ছে" data-testid="st-spinner"></span>
` : '';
    const note = x.note
      ? `\n            <p class="t-caption t-muted" data-testid="st-note">${x.note}</p>` : '';
    push('বিশেষ অবস্থা', x.label,
      `${spin}            <p class="t-body" data-testid="st-extra">${x.ui}</p>` + note, x.ui);
  }

  // edge rows last: where an edge and an extra describe the same state the
  // extra's frame (spinner / disabled control) is the richer one and its key
  // already claimed this one
  for (const e of d.edges || []) {
    push('এজকেস', CAT[e.category] || 'অবস্থা',
      `            <p class="t-body" data-testid="st-edge">${e.ui}</p>`, e.ui);
  }

  const intro = `        <div class="stnote" data-testid="st-intro">
          <i data-lucide="layers" class="icon-md" aria-hidden="true"></i>
          <p class="t-caption">প্রতিটি কার্ড একটি আলাদা অবস্থা · একসাথে কখনও দেখানো হবে না</p>
        </div>`;

  return `        <div class="stwrap" data-testid="st-wrap">
${intro}

${out.join('\n\n')}
        </div>`;
}

// --- derive a sheet from its rendered sibling ---------------------------
let written = 0;
for (const [file, d] of Object.entries(S)) {
  const app = d.kind === 'admin' ? 'frontend-admin-dashboard' : 'frontend';
  const src = `${BASE}${app}/${file}`;
  let html;
  try {
    html = await readFile(src, 'utf8');
  } catch {
    throw new Error(`route page missing — run gen/run.mjs first: ${app}/${file}`);
  }

  const title = html.match(/<title>([^<]*?) — স্মার্টবিদ্যা<\/title>/);
  if (!title) throw new Error('no <title> in ' + file);
  html = html.replace(title[0], `<title>${title[1]} · অবস্থা — স্মার্টবিদ্যা</title>`);

  if (!html.includes('<body data-app=')) throw new Error('no body markers in ' + file);
  html = html.replace('<body data-app=', '<body data-component="dev-states" data-app=');

  // page-local <style> out — its selectors would otherwise appear in two files
  html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${styleBlock}\n</style>`);

  const main = /(<main\b[^>]*>)([\s\S]*?)(<\/main>)/;
  if (!main.test(html)) throw new Error('no <main> in ' + file);
  html = html.replace(main, (_m, open, _old, close) => `${open}\n${build(file)}\n${close}`);

  const stem = file.replace(/\.html$/, '');
  await writeFile(`${BASE}${app}/${stem}.states.html`, html, 'utf8');
  written++;
}
console.log(`states: ${written} sheets written`);

