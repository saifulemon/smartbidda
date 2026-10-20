#!/usr/bin/env node
/**
 * fix-shell-chrome.mjs — make data-shell chrome byte-identical within each
 * (app, layout) group, as shell-check.mjs requires.
 *
 * Two repairs, applied ONLY inside a data-shell block (never in content):
 *
 *  1. bottomnav / sidebar: remove the per-page `is-on` class from the active
 *     nav element (the one carrying aria-current="page"). shell-check's
 *     normalize() strips aria-current but NOT is-on, so toggling is-on per page
 *     makes the shared chrome un-collapsible. Active styling now keys off
 *     [aria-current="page"] in components.css (added alongside the .is-on rule).
 *
 *  2. topbar: unify the back + title testids to ONE name per element. The
 *     contract says shared chrome belongs to the Layout, so its testids do too.
 *     The back testid must END in "-back" so shell-check's href-normalization
 *     rule fires (it blanks href when href precedes a testid ending in -back),
 *     letting each route keep its own destination while the chrome stays equal.
 *     The title's varying TEXT is already blanked via its data-slot.
 *
 * Idempotent — safe to re-run.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('usage: fix-shell-chrome.mjs <dir>'); process.exit(2); }

const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8'));
const screens = (manifest.screens || []).filter((s) => s && s.file);

// Balanced-tag extractor → { start, end, text } of the named data-shell block.
const extractSpan = (html, name) => {
  const marker = new RegExp(`<([a-zA-Z][\\w-]*)\\b[^>]*\\bdata-shell=["']${name}["'][^>]*>`, 'i');
  const m = marker.exec(html);
  if (!m) return null;
  const tag = m[1];
  const start = m.index;
  if (/\/>\s*$/.test(m[0])) return { start, end: start + m[0].length, text: m[0] };
  const open = new RegExp(`<${tag}\\b`, 'gi');
  const close = new RegExp(`</${tag}\\s*>`, 'gi');
  let depth = 0, cursor = start;
  for (;;) {
    open.lastIndex = cursor; close.lastIndex = cursor;
    const o = open.exec(html); const c = close.exec(html);
    if (!c) return { start, end: html.length, text: html.slice(start) };
    if (o && o.index < c.index) { depth++; cursor = o.index + 1; continue; }
    depth--; cursor = c.index + 1;
    if (depth === 0) return { start, end: c.index + c[0].length, text: html.slice(start, c.index + c[0].length) };
  }
};

// Drop `is-on` from the class of the element that also has aria-current="page",
// collapsing leftover whitespace so it matches its inactive siblings exactly.
const fixIsOn = (block) =>
  block.replace(/(<[a-z][^>]*\bclass=")([^"]*)("[^>]*\baria-current=["']page["'])/gi,
    (_m, pre, cls, post) => pre + cls.replace(/\bis-on\b/g, '').replace(/\s+/g, ' ').trim() + post);

// Unify the appbar back + title testids (chrome testids belong to the Layout).
const fixTopbar = (block) =>
  block
    .replace(/(<a\b[^>]*\bclass=["'][^"']*\bksr-back\b[^"']*["'][^>]*\bdata-testid=")[^"]*(")/gi, '$1sub-back$2')
    .replace(/(<span\b[^>]*\bclass=["'][^"']*\bksr-appbar-title\b[^"']*["'][^>]*\bdata-testid=")[^"]*(")/gi, '$1sub-title$2');

let changed = 0;
for (const s of screens) {
  const file = path.join(dir, s.file);
  if (!existsSync(file)) continue;
  let html = await readFile(file, 'utf8');
  const orig = html;
  for (const name of ['bottomnav', 'sidebar', 'topbar']) {
    const span = extractSpan(html, name);
    if (!span) continue;
    let fixed = span.text;
    if (name === 'bottomnav' || name === 'sidebar') fixed = fixIsOn(fixed);
    if (name === 'topbar') fixed = fixTopbar(fixed);
    if (fixed !== span.text) html = html.slice(0, span.start) + fixed + html.slice(span.end);
  }
  if (html !== orig) { await writeFile(file, html); changed++; }
}
console.log(`fix-shell-chrome: ${changed} file(s) updated`);
