import Link from "next/link";
import homeData from "@/data/home.generated.json";
import { supportedLocales, type Locale, siteConfig } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { Planner } from "@/components/Planner";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import { metadataFor, absoluteUrl } from "@/lib/seo";
import { uiCopy } from "@/data/uiCopy";

export async function generateMetadata({params}:{params:Promise<{lang:string}>}){const {lang}=await params;const locale=lang as Locale;const d=getDictionary(locale);const copy=uiCopy[locale];return metadataFor({locale,title:`WorldTime Grid – ${copy.serviceName}`,description:d.heroText as string});}
export function generateStaticParams(){return supportedLocales.map(lang=>({lang}));}

export default async function Home({params}:{params:Promise<{lang:string}>}){const {lang}=await params;const locale=lang as Locale;const d=getDictionary(locale);const copy=uiCopy[locale];const sections=(homeData as Record<Locale,Array<{heading:string;paragraphs:string[]}>>)[locale];return <>
  <section className="hero"><div className="shell"><p className="eyebrow">WorldTime Grid</p><h1>{copy.serviceName}</h1><p className="lead">{d.heroText}</p><div className="button-row"><Link className="button" href={`/${locale}/planner/`}>{d.openPlanner}</Link><Link className="button-secondary" href={`/${locale}/guides/`}>{d.guides}</Link></div></div></section>
  <section className="section"><div className="shell"><h2>{d.recommendations}</h2><Planner locale={locale} compact/></div></section>
  <AdSlot slot={siteConfig.adSlots.home} label={copy.adLabel} />
  {sections.map((section,index)=><section className={`section ${index%2?"alt":""}`} key={section.heading}><div className="shell grid-2"><div><p className="eyebrow">{String(index+1).padStart(2,"0")}</p><h2>{section.heading}</h2></div><div>{section.paragraphs.map(p=><p key={p.slice(0,40)}>{p}</p>)}{index<15&&<Link href={`/${locale}/guides/`} className="button-secondary">{d.readGuide}</Link>}</div></div></section>)}
  <section className="section alt"><div className="shell"><h2>{d.faqHeading}</h2><div className="grid-3"><div className="card"><h3>IANA</h3><p>{d.limits}</p></div><div className="card"><h3>{d.savedLocally}</h3><p>{locale==="ko"?"계정 없이 브라우저에서 도시와 업무시간을 저장할 수 있습니다.":locale==="ja"?"アカウントなしで都市と勤務時間をブラウザに保存できます。":locale==="es"?"Guarda ciudades y horarios en el navegador sin una cuenta.":"Save cities and working hours in the browser without an account."}</p></div><div className="card"><h3>{d.fairness}</h3><p>{locale==="ko"?"한 지역에만 불편한 시간이 반복되지 않는지 여러 회차를 함께 확인합니다.":locale==="ja"?"一地域だけが不便な時間を繰り返さないよう複数回で確認します。":locale==="es"?"Revisa varias reuniones para no cargar siempre a la misma región.":"Review a sequence of meetings so the same region does not carry every inconvenient slot."}</p></div></div></div></section>
  <JsonLd data={{"@context":"https://schema.org","@graph":[{"@type":"WebSite",name:siteConfig.name,url:siteConfig.siteUrl,inLanguage:locale},{"@type":["WebApplication","SoftwareApplication"],name:`${siteConfig.name} – ${copy.serviceName}`,applicationCategory:"BusinessApplication",operatingSystem:"Any",url:absoluteUrl(locale),description:d.heroText,offers:{"@type":"Offer",price:"0",priceCurrency:"USD"},featureList:copy.featureList},{"@type":"Organization",name:siteConfig.name,url:siteConfig.siteUrl}]}}/>
</>}
