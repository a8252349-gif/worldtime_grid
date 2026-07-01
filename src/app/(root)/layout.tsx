import type { Metadata } from "next";
import "../globals.css";
import { siteConfig } from "@/config/site";
import { AdSenseLoader } from "@/components/AdSenseLoader";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "WorldTime Grid", template: "%s | WorldTime Grid" },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.siteUrl,
    languages: {
      en: `${siteConfig.siteUrl}/en/`,
      ko: `${siteConfig.siteUrl}/ko/`,
      ja: `${siteConfig.siteUrl}/ja/`,
      es: `${siteConfig.siteUrl}/es/`,
      "x-default": siteConfig.siteUrl,
    },
  },
  robots: { index: true, follow: true },
  verification: siteConfig.googleSiteVerification
    ? { google: siteConfig.googleSiteVerification }
    : undefined,
  other: siteConfig.adsenseClientIsValid
    ? { "google-adsense-account": siteConfig.adsenseClient }
    : undefined,
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<AdSenseLoader /></body>
    </html>
  );
}
