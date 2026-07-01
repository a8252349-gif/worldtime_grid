# WorldTime Grid

WorldTime Grid is a production-ready, browser-based time zone meeting planner built with Next.js App Router and static export. It compares up to ten cities, evaluates working-hour overlap, applies date-specific IANA time-zone rules, exports ICS files, creates shareable URLs, and stores optional preferences only in the browser.

Supported languages:

- English — Time Zone Meeting Planner
- 한국어 — 시간대 회의 플래너
- 日本語 — タイムゾーン会議プランナー
- Español — Planificador de reuniones por zonas horarias

## Requirements

- Node.js 20.9 or later, or Node.js 22 LTS
- npm with access to `https://registry.npmjs.org/`

## Local setup

```bash
cp .env.example .env.local
npm ci --no-audit --no-fund
npm run dev
```

## Validation and production build

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run audit
npm run test:e2e
```

The production files are generated in `out/`. No application server, account system or database is required.

## Configuration

Edit `src/config/site.ts` for brand defaults. Set `NEXT_PUBLIC_SITE_URL` to the final canonical origin and `NEXT_PUBLIC_CONTACT_EMAIL` only when a public contact address is available. Advertising remains disabled until the relevant environment flags are deliberately enabled.

The root path detects a previously selected language first, then stored preference, `navigator.languages`, and `navigator.language`. Direct localized URLs do not redirect again.

## Documentation

- `FINAL_AUDIT.md` — final implementation and release results
- `TEST_REPORT.md` — test commands and environment limitations
- `KEYWORD_RESEARCH.md` — localized search-language research
- `SEO_KEYWORD_MAP.md` — route-level search-intent ownership
- `TIME_ZONE_METHOD.md` — time-zone calculation method and limitations

## Google Search Console verification

Set the token value only, not the full meta tag:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-token
```

Because this is a static export, redeploy after changing the variable. The generated root and localized pages include `<meta name="google-site-verification" ...>` in `<head>`.


## Render environment wiring

All public settings are read at build time. After changing a Render environment variable, trigger a new deploy. The production configuration is validated before static generation, and `npm run check:env` verifies the resulting HTML.

See `ENVIRONMENT_WIRING_FIX.md` and `ADSENSE_SETUP.md` for the complete mapping and approval/production advertising modes.
