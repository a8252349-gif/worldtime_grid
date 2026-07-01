# Deployment

## Render Static Site

1. Push this directory to a Git repository.
2. Create a Render **Static Site** or use `render.yaml`.
3. Build command: `npm ci --no-audit --no-fund && npm run build`.
4. Publish directory: `out`.
5. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin without a trailing slash.
6. Set `NEXT_PUBLIC_CONTACT_EMAIL` only when a public contact address is ready.
7. Leave all AdSense enable flags set to `false` until approval and consent configuration are complete.

The repository includes `.npmrc` pointing to the public npm registry. The committed lockfile contains public `https://registry.npmjs.org/` tarball URLs only.

## Cloudflare DNS

Point the selected hostname to the Render hostname using the record Render provides. Enable HTTPS, then update `NEXT_PUBLIC_SITE_URL` and rebuild so canonical URLs, hreflang, Open Graph URLs, JSON-LD, sitemap files, feeds and robots use the production origin.

The origin is deliberately not hardcoded into components. Until a WorldTime Grid production domain is selected, `.env.example` uses `https://example.com` as a replaceable placeholder.

Static export does not use Next.js server functions, route middleware, API routes or image optimization. All planner and calculator logic runs in the browser.


## Google Search Console

Add the token from the HTML tag verification method as a build environment variable:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-token
```

Enter only the `content` value, save it, and trigger a fresh deploy. Verify that page source contains `google-site-verification` before clicking Verify in Search Console.
