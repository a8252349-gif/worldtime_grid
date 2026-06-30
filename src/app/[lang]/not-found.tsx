"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { supportedLocales, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export default function LocalizedNotFound() {
  const params = useParams<{ lang?: string }>();
  const locale = supportedLocales.includes(params.lang as Locale) ? (params.lang as Locale) : "en";
  const d = getDictionary(locale);
  const copy = {
    en: ["Page not found", "The requested page does not exist or may have moved.", "Return home"],
    ko: ["페이지를 찾을 수 없습니다", "요청한 페이지가 없거나 주소가 변경되었습니다.", "홈으로 돌아가기"],
    ja: ["ページが見つかりません", "指定されたページは存在しないか、移動した可能性があります。", "ホームへ戻る"],
    es: ["Página no encontrada", "La página solicitada no existe o puede haberse movido.", "Volver al inicio"],
  } as const;
  return <section className="not-found"><p className="eyebrow">404</p><h1>{copy[locale][0]}</h1><p>{copy[locale][1]}</p><Link className="button" href={`/${locale}/`}>{copy[locale][2]}</Link><p className="small">{d.tagline}</p></section>;
}
