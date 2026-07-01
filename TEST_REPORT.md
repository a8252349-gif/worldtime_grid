# Test report

Release audit date: 2026-06-30

## Dependency installation

| Verification | Result |
|---|---|
| Main clean install | `npm ci --no-audit --no-fund` completed with 464 packages in 25.89 seconds. |
| Fresh-directory install | A source-only copy with no `node_modules`, `.next` or prior npm cache completed `npm ci --no-audit --no-fund` with 465 packages in 29.78 seconds. |
| Lockfile registry | 0 private, localhost or internal tarball URLs. Public tarballs resolve to `https://registry.npmjs.org/`. |
| Lockfile retained | `package-lock.json` is committed and included in the release archive. |

The artifact environment routes outbound package traffic through an administrator-controlled network layer. Verification therefore used a new empty cache and npm's registry-host replacement mode while confirming that the committed `.npmrc` and every lockfile tarball URL point to the public npm registry.

## Completed checks

| Check | Result | Detail |
|---|---|---|
| ESLint | Passed | `eslint . --max-warnings=0` returned zero errors and zero warnings. |
| TypeScript | Passed | Strict `tsc --noEmit` completed successfully. |
| Vitest | Passed | 13/13 tests passed: 5 time/ICS tests, 7 language-routing tests and 1 React render warning test for the relative slider. |
| Production build | Passed | Next.js static export generated 139 routes and 140 HTML files. |
| Content structure | Passed | All 60 guide records contain the required scenario, table, checklist, mistakes, limitations, workflow, FAQ, related links, CTA, review date and SVG data. |
| Guide length | Passed | Minimums: EN 2,320 words, ES 2,653 words, KO 6,161 non-space characters, JA 5,740 non-space characters. |
| Duplicate-content check | Passed | Maximum normalized five-word shingle Jaccard similarity: 13.34%; threshold: 15%. |
| Internal links | Passed | Checked across 140 exported HTML files; 0 broken internal links. |
| Language purity | Passed | Korean, Japanese and Spanish static HTML passed the mixed-language checks, including common UI labels and JSON-LD. |
| Public-copy check | Passed | No environment-variable, Render, GitHub, TODO, build-report or operator instruction text was found on public pages. |
| Metadata uniqueness | Passed | 136 localized indexable titles and descriptions were unique. |
| Orphan pages | Passed | 0 orphaned localized pages among 136 checked pages. |
| hreflang | Passed | Four locales plus x-default verified in the export. |
| Sitemap | Passed | 137 canonical URLs matched exported routes. |
| Empty ad areas | Passed | No pre-approval ad markup or visible placeholder area was emitted. |
| Time-zone results | Passed | Seoul, New York and London seasonal offsets plus international date-line relation verified. |

## Playwright suite

The repository defines 17 end-to-end scenarios across desktop Chromium and Pixel 7 mobile, producing 34 discovered tests. Coverage includes:

- root redirect for Korean, Japanese, Spanish and unsupported browser languages;
- stored-language priority;
- same-route language switching on tools and guides;
- localStorage persistence;
- relative slider click, pointer drag and keyboard behavior;
- React console warning and error capture;
- share URL restoration and ICS download;
- absence of developer-facing public copy;
- localized home and resource routes.

`npx playwright test --list` discovers all 34 tests. Full execution cannot complete in this artifact sandbox because its administrator-managed Chromium blocks local HTTP navigation with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. The failure occurs before application assertions run. In a normal local or CI environment:

```bash
npx playwright install chromium
npm run test:e2e
```

## Repeat the release audit

```bash
npm ci --no-audit --no-fund
npm run lint
npm run typecheck
npm run test
npm run build
npm run audit
npm run test:e2e
```

## 2026-06-30 – 전체 도시 삭제 기능

- 도시 검색창 옆 전체 삭제 버튼 추가
- 빈 도시 목록 localStorage 저장 및 새로고침 유지 로직 검증 코드 추가
- 예시 도시 3개 복원 버튼 추가
- Playwright 시나리오 2개 프로젝트(데스크톱/모바일)에 추가, 총 40개 테스트 인식
- 현재 작업 환경에서는 Chromium의 localhost 및 사설 IP 접속이 관리자 정책으로 차단되어 브라우저 실행은 불가
- ESLint, TypeScript, Vitest 22개, 정적 빌드 및 전체 감사 통과
