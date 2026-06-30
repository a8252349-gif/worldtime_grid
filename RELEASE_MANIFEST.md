# Release manifest

- Project: WorldTime Grid
- Release date: 2026-06-30
- Framework: Next.js 16.2.9, React 19.2.7, TypeScript strict
- Node requirement: 20.9+ or 22 LTS
- Public npm registry URLs in lockfile: all package tarballs
- Internal/private package URLs: 0
- Export: 139 static routes, 140 HTML files, 137 sitemap URLs
- Locales: en, ko, ja, es
- Localized indexable pages checked: 136
- Guides: 15 per locale, 60 total
- Browser tools: 5
- Unit tests: 13 passed
- Playwright definitions: 34 discovered across desktop and mobile projects
- Language purity: passed
- Public developer-copy audit: passed
- Duplicate localized titles/descriptions: 0
- Orphan localized pages: 0
- Content similarity maximum: 13.34% five-word Jaccard, threshold 15%
- Internal link errors: 0 across 140 HTML files
- Time-zone audit: passed
- Render build command: `npm ci --no-audit --no-fund && npm run build`
- Render publish directory: `out`

The archive excludes `node_modules`, `.next`, Playwright reports and temporary test output. It includes the complete source, official-registry lockfile, tests, documentation and verified `out` static export.

## 1.0.2

- 현재 선택 도시 전체 삭제
- 빈 도시 목록 새로고침 유지
- 예시 도시 3개 복원
- 기본 설정 복원과 도시 전체 삭제 기능 명칭 분리
