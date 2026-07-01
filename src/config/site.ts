export const supportedLocales = ["en", "ko", "ja", "es"] as const;
export type Locale = (typeof supportedLocales)[number];

function envText(value: string | undefined): string {
  return value?.trim() ?? "";
}

function envBoolean(value: string | undefined): boolean {
  return ["1", "true", "yes", "on"].includes(envText(value).toLowerCase());
}

function normalizeOrigin(value: string | undefined): string {
  const candidate = envText(value) || "https://example.com";
  return candidate.replace(/\/+$/, "");
}

const adsenseClient = envText(process.env.NEXT_PUBLIC_ADSENSE_CLIENT) || "ca-pub-9328837907414732";
const adsenseClientIsValid = /^ca-pub-\d{10,}$/.test(adsenseClient);

export const siteConfig = {
  name: "WorldTime Grid",
  description:
    "Compare time zones, find overlapping working hours, and schedule international meetings without confusion.",
  siteUrl: normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  contactEmail: envText(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  googleSiteVerification: envText(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
  locales: supportedLocales,
  defaultLocale: "en" as Locale,
  defaultCityIds: ["seoul", "new-york", "london"],
  defaultWorkHours: { start: "09:00", end: "18:00", lunchStart: "12:00", lunchEnd: "13:00" },
  adsenseClient,
  adsenseClientIsValid,
  adsenseScriptEnabled: envBoolean(process.env.NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED),
  adsenseManualAdsEnabled: envBoolean(process.env.NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED),
  showAdPlaceholders: envBoolean(process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS),
  googleCmpEnabled: envBoolean(process.env.NEXT_PUBLIC_GOOGLE_CMP_ENABLED),
  adSlots: {
    home: envText(process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT),
    guide: envText(process.env.NEXT_PUBLIC_ADSENSE_GUIDE_SLOT),
    content: envText(process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT),
    plannerBottom: envText(process.env.NEXT_PUBLIC_ADSENSE_PLANNER_BOTTOM_SLOT),
  },
} as const;

export const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  es: "Español",
};
