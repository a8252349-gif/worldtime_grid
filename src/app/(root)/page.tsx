import Link from "next/link";
import { RootLanguageRedirect } from "@/components/RootLanguageRedirect";
import { localeNames, supportedLocales } from "@/config/site";

export default function RootPage() {
  return <main className="root-redirect" aria-busy="true">
    <RootLanguageRedirect />
    <noscript>
      <div className="shell root-noscript">
        <p>Choose a language:</p>
        <div className="button-row">{supportedLocales.map((locale) => <Link className="button-secondary" key={locale} href={`/${locale}/`}>{localeNames[locale]}</Link>)}</div>
      </div>
    </noscript>
  </main>;
}
