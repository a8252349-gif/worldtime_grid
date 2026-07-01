import { notFound } from "next/navigation";
import { supportedLocales, type Locale, siteConfig } from "@/config/site";
import { getStaticPage, staticPageKeys, type StaticPageKey } from "@/data/staticPages";
import { uiCopy } from "@/data/uiCopy";
import { metadataFor } from "@/lib/seo";
import { AdSlot } from "@/components/AdSlot";

export function generateStaticParams(){return supportedLocales.flatMap(lang=>staticPageKeys.map(page=>({lang,page})));}
export async function generateMetadata({params}:{params:Promise<{lang:string;page:string}>}){const {lang,page}=await params;if(!staticPageKeys.includes(page as StaticPageKey))return{};const content=getStaticPage(lang as Locale,page as StaticPageKey);return metadataFor({locale:lang as Locale,title:content.title,description:content.description,path:page});}

export default async function StaticPage({params}:{params:Promise<{lang:string;page:string}>}){
  const {lang,page}=await params;
  if(!staticPageKeys.includes(page as StaticPageKey))notFound();
  const locale=lang as Locale;
  const content=getStaticPage(locale,page as StaticPageKey);
  const copy=uiCopy[locale];
  return <article className="prose"><p className="eyebrow">WorldTime Grid</p><h1>{content.title}</h1><p className="lead">{content.description}</p>{content.sections.map((section,index)=><section key={section.heading}><h2>{index+1}. {section.heading}</h2>{section.paragraphs.map(p=><p key={p.slice(0,40)}>{p}</p>)}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}{page==="contact"&&<div className="note">{siteConfig.contactEmail?<a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>:copy.contactUnavailable}</div>}{!["contact","privacy","terms","cookie-policy"].includes(page)&&<AdSlot slot={siteConfig.adSlots.content} label={copy.adLabel}/>}<p className="small">{copy.lastUpdated}: 2026-06-30</p></article>;
}
