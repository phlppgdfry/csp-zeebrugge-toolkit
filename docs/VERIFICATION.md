# Closeout audit — 24 November 2026

The gate replay controls remain disabled while its report loads. A missing report produces an explained failure state. Landing navigation, approval/blocking, batch impact and CSV content are browser-tested.

6 Chromium browser checks passed across 1440×1000 desktop and 390×844 mobile emulation. No uncaught page errors or horizontal page overflow were observed. The full five-project set contains 20 browser checks. Current npm audit: zero known vulnerabilities. Local Markdown links resolve. Browser plugin not available; validation used Playwright. Physical devices, Safari and production terminal/ERP integrations are outside this synthetic portfolio acceptance scope.

# Verification — 24 November 2026

The primary walkthrough follows a gate transaction through the actual Groovy GateTransactionInterceptor, a shared batch dashboard and CSV/JSON reporting. Six synthetic lookup fixtures produce two approvals and four blocks. The browser replays generated decisions; it does not issue real gate commands.

Current checks: production build, functional browser flows on desktop/mobile, CSV/download contents and no uncaught browser errors. PDF source reconciliation and gate-validator checks run in their respective CI pipelines. Updated screenshots are actual renders of the production artifacts.

## Earlier release evidence

# Verification record

Portfolio refresh · 8 November 2026

- `gradle test --console=plain`: all 28 Spock specifications passed locally.
- Python regression test generates three PNG charts, a dwell-alert CSV and KPI
  JSON, and reconciles alert rows with the breach count. Passed.
- Fixed the report generator's unnormalised hourly weights, which previously
  caused NumPy to reject the distribution before generating any report.
- Inline dashboard JavaScript syntax check passed.
- Chromium: blocked-booking filter, empty search and filtered CSV passed.
- Landing page links and actual preview image checked. VBS desktop/mobile fit
  and zero uncaught JavaScript errors checked.
- Oracle SQL and licensed Navis production integration were not executed.

## Browser evidence

Desktop screenshots use a 1440 × 1040 viewport; mobile screenshots use 390 × 844.
These are actual Chromium captures of the built applications, not design mockups.
Screenshots show sample data. External map, chart-library or weather availability
can vary independently of the application.

- [Desktop capture](screenshots/desktop.png)
- [Mobile capture](screenshots/mobile.png)
- [Local commands and demo boundary](PORTFOLIO.md)

The public deployment is built from the committed source by
`.github/workflows/portfolio-pages.yml`. Review its Actions run for the exact
commit and deployment result; this note is not a claim of production integration
certification, a full accessibility audit or a penetration test.

## Final review — 15 November 2026

The published demo was rechecked in Chromium using Playwright at 1440 × 1040
and 390 × 844. Page identity, meaningful content, absence of framework overlays,
working user interactions and CSV contents all passed. No uncaught JavaScript
errors or page-level horizontal overflow were observed. Desktop and mobile
screenshots were refreshed from the published demo.

The exact routes, viewports and interaction checks are recorded in
[the machine-readable final review](verification/final-review.json).
The finalized source is preserved by the `portfolio-2026-11-15` release tag.
