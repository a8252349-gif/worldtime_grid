# Environment and AdSense wiring audit

Date: 2026-07-01

## Fixed defects

1. Google Search Console verification now reads `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and emits one verification meta tag on the root page and every localized page.
2. The AdSense publisher ID now controls the account meta tag, script URL, manual units and generated `ads.txt`.
3. The four manual ad slot variables are connected to home, guide, content/resource and planner-bottom placements.
4. Manual ad units now queue the required `adsbygoogle.push({})` request after consent.
5. Google CMP mode loads the AdSense script immediately; custom-consent mode loads it only after acceptance.
6. The contact email, canonical origin, sitemap, robots, feeds, Open Graph and JSON-LD all use their build-time environment values.
7. Invalid environment combinations fail before the production build instead of silently producing a broken deployment.

## Verification results

- ESLint: passed, 0 warnings
- TypeScript strict: passed
- Vitest: 25/25 passed
- Production static export: passed
- Generated routes: 139
- Generated HTML files: 140
- Private package registry URLs: 0
- Internal link errors: 0
- Metadata duplicates: 0
- Search Console meta check: passed on 5 entry pages
- AdSense account meta: passed on root and localized pages
- `ads.txt` publisher match: passed
- Home ad slot: passed
- Guide ad slot: passed
- Content/resource ad slot: passed
- Planner-bottom ad slot: passed
- Full environment wiring audit: passed with all advertising options enabled
- Playwright definitions: 44 tests found
- Playwright browser execution: blocked by the current container policy (`ERR_BLOCKED_BY_ADMINISTRATOR` for localhost), not by an application assertion

## Tested active configuration

The audit used temporary non-production slot IDs and a temporary verification token. These values exist only in test commands and test fixtures; they are not hardcoded into the application configuration.
