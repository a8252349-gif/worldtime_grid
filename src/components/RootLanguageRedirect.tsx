"use client";

import { useEffect } from "react";
import { detectPreferredLocale, LANGUAGE_CHOICE_KEY, LANGUAGE_STORAGE_KEY } from "@/lib/language";

export function RootLanguageRedirect() {
  useEffect(() => {
    let directChoice: string | null = null;
    let storedChoice: string | null = null;
    try {
      directChoice = localStorage.getItem(LANGUAGE_CHOICE_KEY);
      storedChoice = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      // Storage can be unavailable in strict privacy modes; browser language remains usable.
    }
    const locale = detectPreferredLocale({ directChoice, storedChoice, languages: navigator.languages, language: navigator.language });
    window.location.replace(`/${locale}/`);
  }, []);
  return null;
}
