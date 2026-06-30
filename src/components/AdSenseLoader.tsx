"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { siteConfig } from "@/config/site";

const CONSENT_EVENT = "wtg-cookie-choice";

export function AdSenseLoader() {
  const [allowed, setAllowed] = useState(siteConfig.googleCmpEnabled);

  useEffect(() => {
    if (!siteConfig.adsenseScriptEnabled) return;
    if (siteConfig.googleCmpEnabled) return;
    const readChoice = () => setAllowed(localStorage.getItem(CONSENT_EVENT) === "accepted");
    queueMicrotask(readChoice);
    window.addEventListener(CONSENT_EVENT, readChoice);
    return () => window.removeEventListener(CONSENT_EVENT, readChoice);
  }, []);

  if (!siteConfig.adsenseScriptEnabled || !allowed) return null;
  return <Script async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`} />;
}
