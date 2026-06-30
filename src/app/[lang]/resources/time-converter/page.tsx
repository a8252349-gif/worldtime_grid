import type { Locale } from "@/config/site";
import { supportedLocales } from "@/config/site";
import { metadataFor } from "@/lib/seo";
import { SingleConverter } from "@/components/UtilityTools";
import { resourceCopy } from "@/data/resourceCopy";
export function generateStaticParams(){return supportedLocales.map(lang=>({lang}));}
export async function generateMetadata({params}:{params:Promise<{lang:string}>}){const {lang}=await params;const locale=lang as Locale;const copy=resourceCopy[locale].tools["time-converter"];return metadataFor({locale,path:"resources/time-converter",title:copy.title,description:copy.description});}
export default async function ToolPage({params}:{params:Promise<{lang:string}>}){const {lang}=await params;const locale=lang as Locale;const pageCopy=resourceCopy[locale];const copy=pageCopy.tools["time-converter"];return <><section className="hero"><div className="shell"><p className="eyebrow">{pageCopy.eyebrow}</p><h1>{copy.title}</h1><p className="lead">{copy.description}</p></div></section><section className="section"><div className="shell"><SingleConverter locale={locale}/></div></section><section className="section alt"><div className="prose"><h2>{pageCopy.methodTitle}</h2><p>{pageCopy.methodParagraph}</p><p>{pageCopy.privacyParagraph}</p></div></section></>;}
