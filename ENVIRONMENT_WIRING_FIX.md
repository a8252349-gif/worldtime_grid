# Environment wiring fix

This release connects all Render environment variables to actual generated output and runtime behavior.

## Connected settings

- `NEXT_PUBLIC_SITE_URL`: canonical URLs, hreflang, Open Graph URLs, JSON-LD, sitemap, feeds and robots
- `NEXT_PUBLIC_CONTACT_EMAIL`: localized contact pages
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: Google Search Console meta tag on root and localized pages
- `NEXT_PUBLIC_ADSENSE_CLIENT`: AdSense account meta tag, script URL, manual units and generated `ads.txt`
- `NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED`: controls AdSense JavaScript loading
- `NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED`: controls manual ad-unit rendering and requests
- `NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS`: controls layout-only placeholders
- `NEXT_PUBLIC_GOOGLE_CMP_ENABLED`: switches between Google CMP and the built-in consent banner
- all four AdSense slot variables: connected to distinct page placements

## Reliability changes

- Boolean values accept `true`, `1`, `yes` or `on`, ignoring case and surrounding whitespace.
- The production origin is normalized without a trailing slash.
- Invalid publisher IDs and non-numeric slot IDs are rejected at build time.
- Manual ads cannot be enabled while the AdSense script is disabled.
- Search Console rejects accidental full `<meta>` tags and accepts only the verification token.
- A new exported-HTML audit checks every configured value after build.
