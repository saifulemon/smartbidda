#!/usr/bin/env python3
"""extract_states.py — pull every PRD state screen / error row / edge case per route
into gen/states.json, keyed by the design file it belongs to.

Route headings are the PRD's own (`#### Route: ...` and `### Admin Page: ...`);
the route -> file map is the design's file naming, kept here (one place) rather
than duplicated into every page definition.
"""
import json
import re
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
PRD = ROOT / 'prd' / 'smartbidda_PRD.md'

ROUTE_FILE = {
    '/auth/login': '02-login.html',
    '/auth/signup': '03-signup.html',
    '/': '01-home.html',
    '/onboarding': '04-onboarding.html',
    '/learn': '05-subject-list.html',
    '/learn/:classNo/:subjectSlug': '06-chapter-list.html',
    '/learn/:classNo/:subjectSlug/:chapterSlug': '07-lesson.html',
    '/quiz/:sessionId': '08-quiz.html',
    '/quiz/:sessionId/result': '09-quiz-result.html',
    '/retake/:retakeId': '10-retake-class.html',
    '/exams': '11-exam-list.html',
    '/exams/:examId': '12-exam.html',
    '/exams/:examId/result': '13-exam-result.html',
    '/leaderboard': '14-leaderboard.html',
    '/rewards': '15-rewards.html',
    '/settings': '16-settings.html',
    '/parent/login': '17-parent-login.html',
    '/parent': '18-parent-dashboard.html',
    '/parent/progress': '19-parent-progress.html',
    '/parent/analytics': '20-parent-analytics.html',
    '/parent/screen-time': '21-screen-time.html',
    '/parent/alerts': '22-alerts.html',
    '/parent/subscription': '23-subscription.html',
    '/parent/settings': '24-parent-settings.html',
}

ADMIN_FILE = {
    'Dashboard Home': '01-dashboard.html',
    'Students': '02-students.html',
    'Parents': '03-parents.html',
    'Teachers & Admins': '04-teachers.html',
    'Curriculum': '05-curriculum.html',
    'Content Library': '06-content.html',
    'Question Bank': '07-questions.html',
    'Term Exams': '08-exams.html',
    'Remedial Assignments': '09-remedial.html',
    'Subscriptions & Payments': '10-subscriptions.html',
    'Notification Templates': '11-notifications.html',
    'Audit Log': '12-audit.html',
}


def split_after(text, marker, stop):
    """Text between `marker` and the next `stop` heading (or end)."""
    i = text.find(marker)
    if i < 0:
        return ''
    i += len(marker)
    j = text.find(stop, i)
    return text[i:j] if j >= 0 else text[i:]


def table_rows(block, skip_header=()):
    """Markdown table body rows -> list of cell lists.

    Header and `---` separator rows are dropped wherever they appear, not just
    at the top: a cell of all dashes is a separator whether or not the header
    was recognised, and one that slipped through showed up as a data row with
    the category "----------" on all 36 pages.
    """
    rows = []
    for line in block.split('\n'):
        if not line.strip().startswith('|'):
            if rows:
                break
            continue
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        if all(set(c) <= set('-: ') for c in cells):
            continue  # separator
        rows.append(cells)
    rows = [r for r in rows if r and r[0] not in skip_header]
    return rows[1:] if rows else []


def strip_code(s):
    """`text` -> text; keep the text (Bangla inside is what the sheet shows)."""
    return re.sub(r'`([^`]+)`', r'\1', s).strip()


BANGLA = re.compile(r'[ঀ-৿]')


def bangla_ui(s):
    """The Bangla UI sentence at the head of a State Screens bullet.

    The PRD writes e.g. `এখনো কোনো পরীক্ষা দেওয়া হয়নি। + back CTA` — the Bangla
    sentence is the string the screen shows, the trailing English is instruction
    for the builder. Printing the instruction would ship English prose through
    the 1:1 conversion, so cut at the first ASCII word.
    """
    if not s or not BANGLA.search(s):
        return ''
    m = re.match(r'^(.*?[ঀ-৿0-9০-৯।?,.\s%-]*[।?!]|[ঀ-৿0-9০-৯].*?)(?=\s+[A-Za-z]|\s*\+|$)',
                 s.strip())
    out = (m.group(1) if m else s).strip()
    out = re.sub(r'\s*\+\s*(back|retry|CTA|spinner|redirect|immediate).*$', '', out,
                 flags=re.I).strip()
    out = re.sub(r'\s*\+\s*.*$', '', out).strip()
    return out if BANGLA.search(out) else ''


def bangla_ui_any(s):
    """Every Bangla fragment in a PRD cell — edges mix prose with the real string
    (`Empty table + কোনো শিক্ষার্থী নেই`). Strip the English instruction words,
    keep the Bangla; return '' when nothing Bangla is left (that row is builder
    prose, not a string the screen ever shows)."""
    if not s or not BANGLA.search(s):
        return ''
    t = re.sub(r'\b[A-Za-z][A-Za-z0-9]*(?:[.:/_-][A-Za-z0-9]+)*\b', ' ', s)
    t = re.sub(r'\s+', ' ', t).strip(' \t+·|/-–—:;')
    t = t.strip('.,')
    # drop any leading non-Bangla leftovers from the English half — `30s timeout
    # + পেমেন্ট সম্পন্ন হয়নি।` cleaned to `30 ; পেমেন্ট...` above.
    t = re.sub(r'^[^ঀ-৿]+', '', t).strip()
    return t if BANGLA.search(t) else ''


def url(section):
    """`**URL:** /admin/students` — the PRD's own URL, when it names one."""
    m = re.search(r'\*\*URL:\*\*\s*`([^`]+)`', section)
    return m.group(1).strip() if m else ''


def states_block(text):
    block = split_after(text, '**3. State Screens**', '**4.')
    out = {}
    for key in ('Loading', 'Empty', 'Error'):
        m = re.search(r'-\s*\*\*%s:\*\*\s*(.+)' % key, block)
        if m:
            raw = strip_code(m.group(1)).strip()
            out[key.lower()] = {'raw': raw, 'ui': bangla_ui(raw)}
    return out


def errors_block(text):
    block = split_after(text, '**7. Error Handling**', '**8.')
    rows = []
    for cells in table_rows(block):
        if len(cells) >= 5:
            rows.append({'type': strip_code(cells[0]),
                         'message': bangla_ui_any(strip_code(cells[3])),
                         'recovery': strip_code(cells[4])})
    return [r for r in rows if r['message']]


def edges_block(text, marker='**8. Edge Cases**', stop='**9.'):
    block = split_after(text, marker, stop)
    rows = []
    for cells in table_rows(block):
        if len(cells) >= 4 and cells[0] != '#':
            rows.append({'category': strip_code(cells[1]),
                         'scenario': strip_code(cells[2]),
                         'ui': bangla_ui_any(strip_code(cells[3])) or
                               bangla_ui_any(strip_code(cells[2]))})
    return [r for r in rows if r['ui']]


def main():
    text = PRD.read_text(encoding='utf8')
    out = {}

    # --- frontend routes -------------------------------------------------
    heads = [(m.start(), m.group(1))
             for m in re.finditer(r'^#### Route: `([^`]+)`', text, re.M)]
    for idx, (pos, route) in enumerate(heads):
        end = heads[idx + 1][0] if idx + 1 < len(heads) else len(text)
        sec = text[pos:end]
        f = ROUTE_FILE.get(route)
        if not f:
            raise SystemExit('unmapped route: %s' % route)
        out[f] = {'route': route, 'kind': 'route',
                  'screens': states_block(sec),
                  'errors': errors_block(sec),
                  'edges': edges_block(sec)}

    # --- admin pages -----------------------------------------------------
    heads = [(m.start(), m.group(1))
             for m in re.finditer(r'^### Admin Page: (.+)$', text, re.M)]
    for idx, (pos, name) in enumerate(heads):
        end = heads[idx + 1][0] if idx + 1 < len(heads) else len(text)
        sec = text[pos:end]
        f = ADMIN_FILE.get(name.strip())
        if not f:
            raise SystemExit('unmapped admin page: %s' % name)
        out[f] = {'route': url(sec) or '/admin/', 'kind': 'admin',
                  'screens': {},
                  'errors': [],
                  'edges': edges_block(sec, '**Edge Cases**', '\n---')}

    dst = pathlib.Path(__file__).with_name('states.json')
    dst.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf8')

    cats, empty = {}, []
    for f, d in sorted(out.items()):
        s = d['screens']
        load_raw = s.get('loading', {}).get('raw', '')
        frames = int(bool(load_raw) and 'N/A' not in load_raw)
        frames += sum(1 for k in ('empty', 'error') if s.get(k, {}).get('ui'))
        frames += len(d['errors']) + len(d['edges'])
        if not frames:
            empty.append(f)
        for e in d['edges']:
            cats[e['category']] = cats.get(e['category'], 0) + 1
    print('wrote %s — %d pages' % (dst.name, len(out)))
    print('categories needing a Bangla label: %d' % len(cats))
    print(json.dumps(cats, ensure_ascii=False, indent=1))
    print('pages with zero renderable frames:', empty or 'none')
    for f in ('11-exam-list.html', '14-leaderboard.html', '23-subscription.html',
              '02-students.html'):
        print('---', f, json.dumps(out[f], ensure_ascii=False)[:700])


if __name__ == '__main__':
    main()
