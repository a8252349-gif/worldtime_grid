import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { siteConfig, supportedLocales, type Locale } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { AdSenseLoader } from "@/components/AdSenseLoader";
import { getDictionary } from "@/data/i18n";

export const dynamicParams = false;
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "WorldTime Grid", template: "%s | WorldTime Grid" },
  description: siteConfig.description,
  verification: siteConfig.googleSiteVerification
    ? { google: siteConfig.googleSiteVerification }
    : undefined,
  icons: { icon: "/favicon.svg" },
};

export function generateStaticParams() {
  return supportedLocales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!supportedLocales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;
  const d = getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main-content">{d.skipToContent}</a>
        <Header locale={locale} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
        <CookieBanner locale={locale} />
        <AdSenseLoader />
      </body>
    </html>
  );
}
