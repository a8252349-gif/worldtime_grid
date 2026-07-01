# AdSense setup

The project now reads every AdSense environment variable from `src/config/site.ts` and applies it during the static build.

## Always present

When `NEXT_PUBLIC_ADSENSE_CLIENT` is valid, every generated page includes:

```html
<meta name="google-adsense-account" content="ca-pub-...">
```

`public/ads.txt` is regenerated from the same publisher ID during `npm run build`, so the publisher ID cannot silently drift between the HTML and `ads.txt`.

## Environment variables

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-9328837907414732
NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED=false
NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED=false
NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=false
NEXT_PUBLIC_GOOGLE_CMP_ENABLED=false
NEXT_PUBLIC_ADSENSE_HOME_SLOT=
NEXT_PUBLIC_ADSENSE_GUIDE_SLOT=
NEXT_PUBLIC_ADSENSE_CONTENT_SLOT=
NEXT_PUBLIC_ADSENSE_PLANNER_BOTTOM_SLOT=
```

All changes require a new Render build because this is a statically exported Next.js site.

## Approval stage

Keep the publisher ID configured. The AdSense account meta tag and `ads.txt` remain available even when the advertising script is disabled.

```env
NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED=false
NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED=false
NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=false
```

If AdSense specifically requires its JavaScript snippet to load and Google CMP is already configured, use:

```env
NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED=true
NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED=false
NEXT_PUBLIC_GOOGLE_CMP_ENABLED=true
```

When Google CMP is not enabled, the project displays its own consent banner and loads the AdSense script only after the visitor accepts optional advertising cookies.

## Manual ads after approval

Create the ad units in AdSense, copy only each numeric slot ID, and configure:

```env
NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED=true
NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED=true
NEXT_PUBLIC_GOOGLE_CMP_ENABLED=true
NEXT_PUBLIC_ADSENSE_HOME_SLOT=1111111111
NEXT_PUBLIC_ADSENSE_GUIDE_SLOT=2222222222
NEXT_PUBLIC_ADSENSE_CONTENT_SLOT=3333333333
NEXT_PUBLIC_ADSENSE_PLANNER_BOTTOM_SLOT=4444444444
```

Placements:

- `HOME_SLOT`: localized home pages
- `GUIDE_SLOT`: guide detail pages
- `CONTENT_SLOT`: resources and selected informational pages
- `PLANNER_BOTTOM_SLOT`: below the planner methodology section, away from timeline and download controls

Each manual unit now runs the required `adsbygoogle.push({})` request after consent and script availability. Invalid or missing numeric slot IDs do not render an empty unit.

## Placeholders

`NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true` is only for layout testing. Keep it `false` on the public site so visitors do not see empty advertising boxes.

## Verification

Run after a production build:

```bash
npm run check:env
npm run check:ads
```

The checks verify the account meta tag, publisher ID in `ads.txt`, script wiring, and all configured manual slot IDs in exported HTML.
