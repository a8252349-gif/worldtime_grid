# Content quality audit

Release audit date: 2026-06-29

- 15 distinct guide intents per language; 60 detailed guide pages total.
- Every guide includes an original introduction, operational scenario, worked calculation, table, checklist, common mistakes, limitations, workflow guidance, at least five FAQs, three related guides, planner CTA, review date and unique SVG illustration data.
- Guide minimums measured by the release script: English 2,320 words, Spanish 2,653 words, Korean 6,161 characters excluding whitespace and Japanese 5,740 characters excluding whitespace.
- City-pair doorway pages are not generated. City combinations are handled inside the calculator.
- `scripts/check-content-quality.mjs`, `check-guide-length.mjs` and `check-duplicate-content.mjs` provide repeatable checks.
- Duplicate similarity uses the Jaccard index over unique normalized five-word shingles within each language. The release maximum is 13.34%, below the configured 15% threshold.
- Each locale exports 34 indexable pages; the sitemap contains 137 URLs including the language-neutral root.
- Advertising is disabled by default, no blank ad placeholders are shown, and interactive planner/share/download areas contain no ad slots.
- AdSense loading is consent-gated when the custom cookie choice is used. When Google CMP is enabled, the custom banner is suppressed.
