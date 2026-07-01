# Test report: environment wiring release

## Commands completed

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run audit
npm run check:env
npm run check:ads
npx playwright test --list
```

## Results

- ESLint: passed
- TypeScript: passed
- Unit tests: 25 passed across 5 files
- Build: 139 static routes generated
- Content and SEO audit: passed
- Environment audit in approval mode: passed
- Environment audit with AdSense script, Google CMP and all four manual slots enabled: passed
- Playwright: 44 desktop/mobile scenarios discovered

The browser runner could not navigate to the local test server because this execution environment blocks Chromium localhost requests with `ERR_BLOCKED_BY_ADMINISTRATOR`. The generated site and static checks were available and passed; run `npm run test:e2e` on a normal local machine or CI runner for browser execution.
