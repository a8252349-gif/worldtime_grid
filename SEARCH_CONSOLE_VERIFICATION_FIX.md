# Search Console verification fix

- Added `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the central site configuration.
- Added Next.js Metadata `verification.google` to both the root and localized layouts.
- The verification tag is now emitted in the static HTML `<head>` for `/`, `/en/`, `/ko/`, `/ja/`, and `/es/`.
- Added a generated-HTML verification script.
- Updated `.env.example`, README, and deployment documentation.

After setting the token in Render, trigger a fresh deploy.
