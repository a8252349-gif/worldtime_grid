"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, supportedLocales, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { uiCopy } from "@/data/uiCopy";
import { LANGUAGE_CHOICE_KEY, LANGUAGE_STORAGE_KEY, switchLocalePath } from "@/lib/language";

export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const copy = uiCopy[locale];
  const pathname = usePathname() || `/${locale}/`;
  const remember = (code: Locale) => {
    try {
      localStorage.setItem(LANGUAGE_CHOICE_KEY, code);
      localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    } catch {
      // Navigation still works when storage is unavailable.
    }
  };
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href={`/${locale}/`} aria-label={`${d.home} – WorldTime Grid`}>
          <span className="brand-mark" aria-hidden="true">WG</span>
          <span className="brand-copy"><strong>WorldTime Grid</strong><small>{copy.serviceName}</small></span>
        </Link>
        <nav aria-label={copy.primaryNavigation} className="main-nav">
          <Link href={`/${locale}/planner/`}>{d.planner}</Link>
          <Link href={`/${locale}/resources/`}>{d.resources}</Link>
          <Link href={`/${locale}/guides/`}>{d.guides}</Link>
          <Link href={`/${locale}/how-it-works/`}>{d.how}</Link>
        </nav>
        <details className="language-picker">
          <summary aria-label={copy.languageMenu}>{localeNames[locale]}</summary>
          <div className="language-menu">
            {supportedLocales.map((code) => <Link key={code} href={switchLocalePath(pathname, code)} hrefLang={code} lang={code} onClick={() => remember(code)}>{localeNames[code]}</Link>)}
          </div>
        </details>
      </div>
    </header>
  );
}
