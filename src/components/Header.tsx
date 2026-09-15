"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, supportedLocales, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { uiCopy } from "@/data/uiCopy";
import { LANGUAGE_CHOICE_KEY, LANGUAGE_STORAGE_KEY, switchLocalePath } from "@/lib/language";

type IconName = "planner" | "resources" | "guides" | "how";
function Icon({ name }: { name: IconName }) {
  const s = { width: 15, height: 15, marginRight: 5, verticalAlign: "-2px" } as const;
  if (name === "planner") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={s}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
  if (name === "resources") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={s}><rect x="5" y="4" width="14" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>;
  if (name === "guides") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={s}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5zM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5A2.5 2.5 0 0 1 20 21.5z"/></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={s}><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/></svg>;
}

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
          <Link href={`/${locale}/planner/`}><Icon name="planner" />{d.planner}</Link>
          <Link href={`/${locale}/resources/`}><Icon name="resources" />{d.resources}</Link>
          <Link href={`/${locale}/guides/`}><Icon name="guides" />{d.guides}</Link>
          <Link href={`/${locale}/how-it-works/`}><Icon name="how" />{d.how}</Link>
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
