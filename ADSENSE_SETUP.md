# AdSense setup

The publisher metadata and `ads.txt` are included. Approval-stage defaults intentionally load no ad script and render no empty advertising boxes.

## Before approval

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-9328837907414732
NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED=false
NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED=false
NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=false
NEXT_PUBLIC_GOOGLE_CMP_ENABLED=false
```

The `google-adsense-account` meta value remains present. Tools, calendar download controls, share controls and interactive timelines have no adjacent advertising placements.

## After approval

Enable the script only after the final domain is approved and consent is configured. For manual ads, provide non-empty slot values and set `NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED=true`. Keep planner routes excluded from Auto ads:

- `/en/planner/`
- `/ko/planner/`
- `/ja/planner/`
- `/es/planner/`

If Google CMP is enabled, set `NEXT_PUBLIC_GOOGLE_CMP_ENABLED=true`; the custom banner will not appear. Avoid sticky units that cover the timeline on mobile.
