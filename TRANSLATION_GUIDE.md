# Translation guide

Four locale prefixes are statically generated: `en`, `ko`, `ja` and `es`. UI strings live in `src/data/i18n.ts`; guide content lives in `src/data/guides.generated.json`.

A translation must preserve the scheduling meaning, full dates, IANA names, warnings, accessibility labels and structured-data language. Do not translate IANA identifiers. Localized city names may appear next to the international English name, but the underlying zone remains unchanged.

When adding a locale, update `supportedLocales`, dictionaries, city labels, guide entries, static pages, the public-file generator, validation scripts and Playwright coverage. Rebuild to regenerate sitemap, feeds and hreflang.
