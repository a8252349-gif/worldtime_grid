# Localized city search and language cleanup

Updated: 2026-06-30

## Changes

- Expanded the searchable location index from 32 manually listed cities to 418 unique IANA city/region time zones.
- Added CLDR-derived city and country names for English, Korean, Japanese and Spanish.
- Search now matches localized city names, country names, English names, IANA identifiers, aliases, spacing differences and accent-free input.
- Already-selected cities remain visible in search results with a localized “already added” status instead of appearing missing.
- Removed the previous eight-result truncation; all matching locations are available in a scrollable result panel.
- Removed untranslated English planning phrases from Korean, Japanese and Spanish home and guide content.
- Localized the guide index metadata title.
- Strengthened the language-purity checker to reject the previously leaked English phrases in localized content.

## Verification

- ESLint: passed with zero warnings
- TypeScript strict check: passed
- Vitest: 22 tests passed
- Static export: 139 routes generated
- Internal links: 0 errors across 140 HTML files
- Language purity: passed
- Localized search tests include 서울, ソウル, Seúl, 도쿄, 東京, Nueva York and 상하이

## Browser test environment

Playwright discovered 38 desktop/mobile tests, but this workspace blocks Chromium access to localhost with `ERR_BLOCKED_BY_ADMINISTRATOR`. The failure occurs before application code is loaded. Run `npm run test:e2e` in a normal local or CI environment for full browser execution.
