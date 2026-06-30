import type { Locale } from "@/config/site";
import { supportedLocales } from "@/config/site";
import { metadataFor } from "@/lib/seo";
import { Planner } from "@/components/Planner";
import { resourceCopy } from "@/data/resourceCopy";
export function generateStaticParams(){return supportedLocales.map(lang=>({lang}));}
export async function generateMetadata({params}:{params:Promise<{lang:string}>}){const {lang}=await params;const locale=lang as Locale;const copy=resourceCopy[locale].tools["working-hours-overlap"];return metadataFor({locale,path:"resources/working-hours-overlap",title:copy.title,description:copy.description});}
export default async function ToolPage({params}:{params:Promise<{lang:string}>}){const {lang}=await params;const locale=lang as Locale;const pageCopy=resourceCopy[locale];const copy=pageCopy.tools["working-hours-overlap"];return <><section className="hero"><div className="shell"><p className="eyebrow">{pageCopy.eyebrow}</p><h1>{copy.title}</h1><p className="lead">{copy.description}</p></div></section><section className="section"><div className="shell"><Planner locale={locale} compact/></div></section><section className="section alt"><div className="prose"><h2>{pageCopy.methodTitle}</h2><p>{pageCopy.methodParagraph}</p><p>{pageCopy.privacyParagraph}</p></div></section></>;}
