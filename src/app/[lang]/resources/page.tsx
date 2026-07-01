import Link from "next/link";
import type { Locale } from "@/config/site";
import { supportedLocales, siteConfig } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { metadataFor } from "@/lib/seo";
import { resourceCopy, type ResourceSlug } from "@/data/resourceCopy";
import { uiCopy } from "@/data/uiCopy";
import { AdSlot } from "@/components/AdSlot";

const toolSlugs: ResourceSlug[]=["time-converter","working-hours-overlap","dst-checker","date-line-visualizer","utc-offset-explainer"];
export function generateStaticParams(){return supportedLocales.map(lang=>({lang}));}
export async function generateMetadata({params}:{params:Promise<{lang:string}>}){const {lang}=await params;const locale=lang as Locale;const copy=resourceCopy[locale];return metadataFor({locale,path:"resources",title:copy.indexTitle,description:copy.indexDescription});}
export default async function Resources({params}:{params:Promise<{lang:string}>}){const {lang}=await params;const locale=lang as Locale;const d=getDictionary(locale);const copy=resourceCopy[locale];const ui=uiCopy[locale];return <><section className="hero"><div className="shell"><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.indexTitle}</h1><p className="lead">{copy.indexDescription}</p></div></section><section className="section"><div className="shell guide-list">{toolSlugs.map((slug,index)=>{const tool=copy.tools[slug];return <article className="card resource-card" key={slug}><p className="eyebrow">{copy.toolNumber(index+1)}</p><h2>{tool.title}</h2><p>{tool.description}</p><Link className="button-secondary" href={`/${locale}/resources/${slug}/`}>{d.select}</Link></article>})}</div></section><div className="shell"><AdSlot slot={siteConfig.adSlots.content} label={ui.adLabel}/></div></>}
