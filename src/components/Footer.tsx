import Link from "next/link";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { uiCopy } from "@/data/uiCopy";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const copy = uiCopy[locale];
  const links = [
    ["about", d.about], ["contact", d.contact], ["privacy", d.privacy], ["terms", d.terms], ["cookie-policy", d.cookies],
    ["accessibility", d.accessibility], ["editorial-policy", d.editorial], ["time-calculation-methodology", d.methodology], ["faq", d.faq]
  ];
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><strong>WorldTime Grid</strong><p>{copy.serviceName}</p><p>{d.tagline}</p><p className="small">© 2026 WorldTime Grid</p></div>
        <nav aria-label={copy.footerNavigation} className="footer-links">
          {links.map(([path,label]) => <Link key={path} href={`/${locale}/${path}/`}>{label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
