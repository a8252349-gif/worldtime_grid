import Link from "next/link";
import type { Locale } from "@/config/site";
import { supportedLocales } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { getGuides } from "@/lib/content";
import { metadataFor } from "@/lib/seo";
import { resourceCopy } from "@/data/resourceCopy";

export function generateStaticParams(){return supportedLocales.map(lang=>({lang}));}
export async function generateMetadata({params}:{params:Promise<{lang:string}>}){const {lang}=await params;const locale=lang as Locale;return metadataFor({locale,path:"guides",title:{en:"Global Scheduling Guides",ko:"국제 회의시간 가이드",ja:"国際会議時間ガイド",es:"Guías para reuniones internacionales"}[locale],description:locale==="ko"?"시간대 변환, 서머타임, 반복회의, 날짜 변경선과 공정한 국제 일정 조정에 관한 심층 가이드입니다.":locale==="ja"?"タイムゾーン、夏時間、定例会議、日付変更線、公平な国際日程の詳しいガイドです。":locale==="es"?"Guías detalladas sobre zonas horarias, horario de verano, recurrencias, línea de fecha y planificación justa.":"In-depth guides to time zones, daylight saving, recurring meetings, the date line and fair global scheduling."});}
export default async function GuidesPage({params}:{params:Promise<{lang:string}>}){const {lang}=await params;const locale=lang as Locale;const d=getDictionary(locale);const copy=resourceCopy[locale];const guides=getGuides(locale);return <><section className="hero"><div className="shell"><p className="eyebrow">{copy.guideIndexEyebrow}</p><h1>{d.guides}</h1><p className="lead">{copy.guideIndexDescription}</p></div></section><section className="section"><div className="shell guide-list">{guides.map((guide,index)=><article className="card resource-card" key={guide.slug}><p className="eyebrow">{copy.guideNumber(index+1)}</p><h2>{guide.title}</h2><p>{guide.description}</p><p className="small">{d.updated}: {guide.updated}</p><Link className="button-secondary" href={`/${locale}/guides/${guide.slug}/`}>{d.readGuide}</Link></article>)}</div></section></>}
