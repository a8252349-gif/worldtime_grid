import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "WorldTime Grid", template: "%s | WorldTime Grid" },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.siteUrl,
    languages: {
      en: `${siteConfig.siteUrl.replace(/\/$/, "")}/en/`,
      ko: `${siteConfig.siteUrl.replace(/\/$/, "")}/ko/`,
      ja: `${siteConfig.siteUrl.replace(/\/$/, "")}/ja/`,
      es: `${siteConfig.siteUrl.replace(/\/$/, "")}/es/`,
      "x-default": siteConfig.siteUrl,
    },
  },
  robots: { index: true, follow: true },
  verification: siteConfig.googleSiteVerification
    ? { google: siteConfig.googleSiteVerification }
    : undefined,
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}{siteConfig.adsenseScriptEnabled && <Script async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`} />}</body></html>;
}
