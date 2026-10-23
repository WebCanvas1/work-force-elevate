import { useContentValue } from "../../lib/site-content";
import { useRouterState } from "@tanstack/react-router";

export type SectionKind = "text"|"image"|"cards"|"faq"|"cta"|"video"|"stats";
export type SiteSection = {id:string;kind:SectionKind;title:string;body:string;image?:string;buttonText?:string;buttonUrl?:string;items?:{title:string;body:string}[];hidden?:boolean};
export const sectionKey = (page:string) => "sections."+page;
export function parseSections(raw:string):SiteSection[]{
 try {
  const data=JSON.parse(raw);
  if(!Array.isArray(data))return [];
  return data.filter((s):s is SiteSection=>s&&typeof s.id==="string"&&["text","image","cards","faq","cta","video","stats"].includes(s.kind)&&typeof s.title==="string").slice(0,40);
 }catch{return []}
}
function safeLink(url?:string){if(!url)return "";if(url.startsWith("/")&&!url.startsWith("//"))return url;try{const parsed=new URL(url);return ["https:","http:","mailto:","tel:"].includes(parsed.protocol)?url:""}catch{return ""}}
function safeImage(url?:string){if(!url)return "";if(url.startsWith("/")&&!url.startsWith("//"))return url;try{const parsed=new URL(url);return ["https:","http:"].includes(parsed.protocol)?url:""}catch{return ""}}
function SectionView({s}:{s:SiteSection}){
 const items=(s.items||[]).slice(0,16);
 const image=safeImage(s.image);
 const link=safeLink(s.buttonUrl);
 const title=<h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">{s.title}</h2>;
 const body=s.body&&<p className="mt-5 max-w-3xl whitespace-pre-line text-lg leading-relaxed text-muted-foreground">{s.body}</p>;
 const button=s.buttonText&&link&&<a href={link} className="mt-7 inline-flex rounded-full bg-accent px-7 py-3 font-bold text-primary hover:opacity-90">{s.buttonText}</a>;
 return <section className="py-16 md:py-24" data-cms-section={s.id}><div className="container-x">
  {s.kind==="image"?<div className="grid gap-10 items-center md:grid-cols-2"><div>{title}{body}{button}</div>{image&&<img className="w-full rounded-3xl object-cover shadow-lg max-h-[520px]" src={image} alt={s.title} loading="lazy"/>}</div>:
  s.kind==="cards"||s.kind==="stats"?<>{title}{body}<div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((item,i)=><article key={i} className="rounded-2xl border border-border bg-white p-7 shadow-sm"><h3 className="text-xl font-bold text-primary">{item.title}</h3><p className="mt-3 whitespace-pre-line text-muted-foreground">{item.body}</p></article>)}</div>{button}</>:
  s.kind==="faq"?<>{title}{body}<div className="mt-8 space-y-3">{items.map((item,i)=><details key={i} className="rounded-xl border border-border bg-white p-5"><summary className="cursor-pointer font-semibold text-primary">{item.title}</summary><p className="mt-3 whitespace-pre-line text-muted-foreground">{item.body}</p></details>)}</div></>:
  s.kind==="video"?<>{title}{body}{s.buttonUrl&&/^https:\/\/(www\.)?(youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/|player\.vimeo\.com\/video\/)/.test(s.buttonUrl)&&<iframe className="mt-8 aspect-video w-full rounded-2xl" src={s.buttonUrl} title={s.title} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"/>}</>:
  <>{title}{body}{s.image&&<img src={s.image} alt={s.title} loading="lazy" className="mt-8 max-h-[520px] w-full rounded-2xl object-cover"/>}{button}</>}
 </div></section>;
}
export function DynamicSections(){
 const pathname=useRouterState({select:s=>s.location.pathname});
 const page=pathname==="/about"?"about":pathname==="/find-staff"?"staff":pathname==="/find-a-job"?"jobs":pathname==="/contact"?"contact":"home";
 const raw=useContentValue(sectionKey(page),"[]");
 return <>{parseSections(raw).filter(s=>!s.hidden).map(s=><SectionView key={s.id} s={s}/>)}</>;
}
