# Design gate proof

Written by `design/scripts/gate-proof.mjs`. Regenerate after ANY edit to the delivery —
`--check` treats a proof older than the newest design file as no proof at all.

result: PASS
checks_failing: 0
files_covered: 160
newest_file: manifest.json

_Every check passes._

<details><summary>raw verify-all output</summary>

```
===== contract =====
contract lint: PASS

===== consistency =====
consistency: 0 fail, 0 warn across 72 pages · vocabulary: styles/components.css

===== contrast =====
contrast-check: 0 fail, 0 warn across 6 theme(s)

===== links =====
checked 144 delivery file(s); skipped 24 in concepts/ · base/vary/ · preview/ (working material, not shipped — DESIGN_SCOPE=all to include)
PASS — 1260 internal links across 144 files, 0 broken

===== icons =====
icon-check · .claude-project/smartbidda/design — 0 page(s) with inline-svg / non-Lucide icons (of 144)

===== listing =====
listing-check: 0 incomplete of 22 marked listing(s) (2 read-only, 20 writable) · 0 unmarked listing(s)

===== copy =====
copy-lint · 72 route page(s) · enum dictionary 0 (raw-enum SKIPPED — pass --enums)

  PASS  dev-identifier   0 hit(s) · 0 file(s) — 개발자 식별자
  PASS  doc-reference    0 hit(s) · 0 file(s) — 내부 문서 참조
  PASS  raw-enum         0 hit(s) · 0 file(s) — 영문 enum 노출
  WARN  explanatory     10 hit(s) · 10 file(s) [certain 3 / suspect 7 · report-only, pass --strict-prose to block] — 설명 문장
        base/frontend/03-signup.html  "ইতিমধ্যে অ্যাকাউন্ট আছে?"
        base/frontend/10-retake-class.html  "১। ৩/৪ এর সমান কোনটি?"
        frontend/03-signup.html  "ইতিমধ্যে অ্যাকাউন্ট আছে?"

copy-lint · 10 hit(s) across 10 file(s) · 0 blocking

===== viewport =====
viewport-check · 72 route page(s)

  PASS  fixed-frame      0/72 file(s) — fixed-px device frame (width: 390px …) — page cannot fit any other screen
  PASS  fixed-height     0/72 file(s) — fixed-px page height (height: 844px …) — content below the fold is unreachable
  PASS  clip-overflow    0/72 file(s) — overflow:hidden on the page container — the page cannot scroll
  PASS  static-vh        0/72 file(s) — 100vh — mobile browsers size vh to the SMALL viewport; use 100dvh
  PASS  no-safe-area     0/72 file(s) — no env(safe-area-inset-*) — content runs under the notch / home bar

viewport-check · 0/72 page(s) violate at least one rule

===== surface =====
surface-check · 36 screen(s) · 37 declared write(s) · ledger 0 row(s)

  PASS  declaration       0
  PASS  orphan-write      0
  PASS  silent-write      0
  SKIP  ledger-reach      0  SKIP — no --ledger given
  SKIP  actor-reach       0  SKIP — no --ledger given
  SKIP  impact-complete   0  SKIP — no --ledger given

surface-check · 0 failure(s)

===== verify-all summary · .claude-project/smartbidda/design =====
  PASS  contract
  PASS  consistency
  PASS  contrast
  PASS  links
  PASS  icons
  PASS  listing
  PASS  copy
  PASS  viewport
  PASS  surface

0 gate(s) failed
```
</details>
