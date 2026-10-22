import { useEffect, useMemo, useState } from "react";
import { Save, Eye, Image as ImageIcon, LayoutDashboard, Settings, FileText, LogOut, RotateCcw, Search, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { setContent, type ContentMap } from "../../lib/site-content";
import { parseSections, sectionKey, type SiteSection, type SectionKind } from "./DynamicSections";
import homeImage from "../../assets/hero-construction.jpg";
import aboutImage from "../../assets/about-team.jpg";
import staffImage from "../../assets/find-staff.jpg";
import jobsImage from "../../assets/find-job.jpg";
import logoImage from "../../assets/your-crew-logo.png";

type Field = { id: string; label: string; type?: "text" | "textarea" | "image"; hint?: string };
type Group = { id: string; title: string; description: string; fields: Field[]; page: string };
const groups: Group[] = [
  { id:"home", title:"Homepage", description:"Edit the main landing page and its sections.", page:"/", fields:[
    {id:"home.hero.badge",label:"Top badge"},
    {id:"home.hero.lead",label:"Hero headline – first line"},
    {id:"home.hero.emphasis",label:"Highlighted headline"},
    {id:"home.hero.end",label:"Hero headline – ending"},
    {id:"home.hero.image",label:"Hero photograph",type:"image"},
    {id:"home.services.title",label:"Services section heading"},
    {id:"home.why.title",label:"Why choose us heading"},
    {id:"home.industries.title",label:"Industries heading"},
    {id:"home.process.title",label:"How it works heading"},
    {id:"home.cta.title",label:"Call to action heading"},
    {id:"home.jobs.title",label:"Jobs section heading"},
    {id:"home.contact.title",label:"Enquiry heading"}
  ]},
  { id:"about",title:"About Us",description:"Update company information and introductory sections.",page:"/about", fields:[
    {id:"about.hero.title",label:"About page headline",type:"textarea"},
    {id:"about.hero.image",label:"Hero background image",type:"image"},
    {id:"about.mission.title",label:"Mission heading"},
    {id:"about.values.title",label:"Values heading"},
    {id:"about.timeline.title",label:"Timeline heading"},
    {id:"about.trust.title",label:"Why trust us heading"},
    {id:"about.cta.title",label:"Closing call to action"}
  ]},
  {id:"staff",title:"Find Staff",description:"Manage employer-facing page headings and photo.",page:"/find-staff",fields:[
    {id:"staff.hero.title",label:"Page headline",type:"textarea"},
    {id:"staff.hero.image",label:"Banner photograph",type:"image"},
    {id:"staff.benefits.title",label:"Benefits heading"},
    {id:"staff.industries.title",label:"Industries heading"},
    {id:"staff.workforce.title",label:"Workforce heading"},
    {id:"staff.faq.title",label:"FAQ heading"},
    {id:"staff.form.title",label:"Staff request heading"}
  ]},
  {id:"jobs",title:"Find a Job",description:"Manage candidate-facing page headings and photo.",page:"/find-a-job",fields:[
    {id:"jobs.hero.title",label:"Page headline",type:"textarea"},
    {id:"jobs.hero.image",label:"Banner photograph",type:"image"},
    {id:"jobs.benefits.title",label:"Benefits heading"},
    {id:"jobs.openings.title",label:"Job openings heading"},
    {id:"jobs.register.title",label:"Registration heading"}
  ]},
  {id:"contact",title:"Contact",description:"Edit the contact page introductory copy.",page:"/contact",fields:[
    {id:"contact.hero.title",label:"Contact page headline",type:"textarea"},
    {id:"contact.info.title",label:"Company information heading"},
    {id:"contact.form.title",label:"Contact form heading"}
  ]},
  {id:"settings",title:"Website Settings",description:"Company branding, navigation logo and contact details.",page:"/",fields:[
    {id:"global.company",label:"Footer company name"},
    {id:"global.logo",label:"Website logo",type:"image"},
    {id:"global.phone",label:"Contact phone"},
    {id:"global.email",label:"Contact email"}
  ]}
];
const builtInDefaults: ContentMap = {...{"home.hero.badge":"Trusted for 22+ years across Victoria","home.hero.lead":"Australia’s Trusted","home.hero.emphasis":"Labour Hire","home.hero.end":"Partner.","home.services.title":"Workforce solutions for the industries that build Australia.","home.why.title":"Built on reliability, expertise and flexibility.","home.industries.title":"Trusted across the sectors that keep Victoria moving.","home.process.title":"Four steps to the right crew on your site.","home.cta.title":"Need reliable staff? Request workers today.","home.jobs.title":"Latest opportunities","home.contact.title":"Quick enquiry","about.hero.title":"Building strong teams. Empowering Australian businesses.","about.mission.title":"More than staffing — lasting workforce solutions.","about.values.title":"The principles behind every placement.","about.timeline.title":"22+ years of growth.","about.trust.title":"We value our people, so they deliver their best for you.","about.cta.title":"Ready to build your dream team?","staff.hero.title":"The right workers on your site, when you need them.","staff.benefits.title":"Reliable labour hire, without the hassle.","staff.industries.title":"Trusted across every sector we serve.","staff.workforce.title":"Skilled people, ready to work.","staff.faq.title":"Frequently asked questions","staff.form.title":"Tell us what you need.","jobs.hero.title":"Work with a crew that has your back.","jobs.benefits.title":"Benefits of joining Your Crew.","jobs.openings.title":"Current opportunities","jobs.register.title":"Register with Your Crew.","contact.hero.title":"Let’s build your dream team.","contact.info.title":"Company information","contact.form.title":"Send a message","global.company":"Your Crew","global.phone":"0451 267 768","global.email":"info@yourcrew.com.au"},
  "home.hero.image":homeImage,"about.hero.image":aboutImage,"staff.hero.image":staffImage,
  "jobs.hero.image":jobsImage,"global.logo":logoImage
};
const pretty = (id: string) => id.split(".").slice(1).join(" ");
const preview = (page: string) => `#${page}`;
export function AdminDashboard() {
  const [tab,setTab]=useState("home");
  const [draft,setDraft]=useState<ContentMap>({});
  const [original,setOriginal]=useState<ContentMap>({});
  const [defaults,setDefaults]=useState<ContentMap>(builtInDefaults);
  const [loggedIn,setLoggedIn]=useState(false);
  const [ready,setReady]=useState(false);
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  const [status,setStatus]=useState("");
  const [query,setQuery]=useState("");
  const [showPreview,setShowPreview]=useState(false);
  const [editorMode,setEditorMode]=useState<"fields"|"sections">("fields");
  const selected=groups.find(g=>g.id===tab) || groups[0];
  const sections=parseSections(draft[sectionKey(tab)]??"[]");
  const setSections=(items:SiteSection[])=>setDraft(prev=>({...prev,[sectionKey(tab)]:JSON.stringify(items)}));
  const changeSection=(id:string,patch:Partial<SiteSection>)=>setSections(sections.map(s=>s.id===id?{...s,...patch}:s));
  const addSection=(kind:SectionKind)=>setSections([...sections,{id:crypto.randomUUID(),kind,title:"New "+kind+" section",body:"",items:kind==="cards"||kind==="faq"||kind==="stats"?[{title:"Item 1",body:"Description"}]:[]}]);
  const moveSection=(index:number,delta:number)=>{const next=[...sections];const other=index+delta;if(other<0||other>=next.length)return;[next[index],next[other]]=[next[other],next[index]];setSections(next)};
  const dirty=JSON.stringify(draft)!==JSON.stringify(original);
  const changedCount=Object.keys({...draft,...original}).filter(k=>(draft[k]??defaults[k]??"")!==(original[k]??defaults[k]??"")).length;
  useEffect(()=>{void (async()=>{
    try {
      const response=await fetch("/api/admin/session",{credentials:"same-origin"});
      if(response.ok) {setLoggedIn(true);await refresh();}
    } catch {setError("CMS backend is not responding. Check the hosting configuration.");}
    finally {setReady(true);}
  })()},[]);
  async function refresh() {
    const response=await fetch("/api/admin/content",{credentials:"same-origin"});
    if(!response.ok) throw new Error("Unable to load website content");
    const data=await response.json() as {content?:ContentMap;defaults?:ContentMap};
    const values=data.content||{};
    setOriginal(values);setDraft(values);setDefaults({...builtInDefaults,...(data.defaults||{})});
  }
  async function signIn(e: React.FormEvent){
    e.preventDefault();setBusy(true);setError("");
    try {
      const response=await fetch("/api/admin/login",{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json"},body:JSON.stringify({password})});
      if(!response.ok){
        const data=await response.json().catch(()=>({})) as {error?:string};
        throw new Error(data.error || (response.status===401?"Incorrect password":`Unable to log in (HTTP ${response.status})`));
      }
      setLoggedIn(true);setPassword("");await refresh();
    } catch(e){setError((e as Error).message)} finally{setBusy(false)}
  }
  async function logout() {
    await fetch("/api/admin/logout",{method:"POST",credentials:"same-origin"}).catch(()=>{});
    setLoggedIn(false);setDraft({});setOriginal({});
  }
  async function save(){
    setBusy(true);setError("");setStatus("");
    try {
      const response=await fetch("/api/admin/content",{method:"PUT",credentials:"same-origin",headers:{"content-type":"application/json"},body:JSON.stringify({content:draft})});
      const data=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error((data as {error?:string}).error||"Unable to publish changes");
      setOriginal({...draft});setContent(draft);setStatus("All changes published successfully.");
    } catch(e){setError((e as Error).message)} finally{setBusy(false)}
  }
  async function upload(file:File,id:string){
    if(file.size>5*1024*1024){setError("Please choose an image smaller than 5 MB.");return}
    if(!file.type.startsWith("image/")){setError("Only image files can be uploaded.");return}
    setBusy(true);setError("");
    try {
      const body=new FormData();body.append("file",file);
      const response=await fetch("/api/admin/upload",{method:"POST",credentials:"same-origin",body});
      const data=await response.json() as {url?:string;error?:string};
      if(!response.ok || !data.url)throw new Error(data.error||"Image upload failed");
      setDraft(prev=>({...prev,[id]:data.url!}));setStatus("Image uploaded. Click Publish Changes to use it on your website.");
    }catch(e){setError((e as Error).message)}finally{setBusy(false)}
  }
  const filtered=useMemo(()=>selected.fields.filter(f=>!query||`${f.label} ${f.id}`.toLowerCase().includes(query.toLowerCase())),[selected,query]);
  if(!ready)return <div className="cms-login"><p>Loading website editor…</p></div>;
  if(!loggedIn)return <div className="cms-login"><form onSubmit={signIn} className="cms-login-card"><div className="cms-logo">W</div><h1>Website Administration</h1><p>Sign in to manage your Work-Force Elevate website.</p><label>Administrator password<input autoFocus type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>{error&&<div role="alert" className="cms-error">{error}</div>}<button disabled={busy} type="submit">{busy?"Signing in…":"Sign in to dashboard"}</button><small>Protected access is configured in Cloudflare. There is no default password.</small><a href="#/">← Back to website</a></form></div>;
  return <div className="cms-app">
    <aside className="cms-sidebar"><div className="cms-brand"><span className="cms-logo">W</span><span>Website Editor<small>Work-Force Elevate</small></span></div><p className="cms-section-title">CONTENT MANAGEMENT</p><nav aria-label="Admin navigation">{groups.map(g=><button key={g.id} type="button" className={tab===g.id?"active":""} onClick={()=>{setTab(g.id);setEditorMode("fields");setQuery("");setStatus("");setShowPreview(false)}}>{g.id==="settings"?<Settings size={18}/>:g.id==="home"?<LayoutDashboard size={18}/>:<FileText size={18}/>} {g.title}</button>)}</nav><div className="cms-sidebar-bottom"><a href="#/" target="_blank" rel="noreferrer"><ExternalLink size={17}/> View website</a><button onClick={logout}><LogOut size={17}/> Sign out</button></div></aside>
    <div className="cms-workspace"><header className="cms-topbar"><div><h1>{selected.title}</h1><span>{selected.description}</span></div><div className="cms-actions"><button className="cms-ghost" onClick={()=>setShowPreview(v=>!v)}><Eye size={17}/> {showPreview?"Hide preview":"Preview"}</button><button className="cms-save" disabled={!dirty||busy} onClick={save}><Save size={17}/>{busy?"Working…":"Publish changes"}</button></div></header>
    <div className="cms-content"><div className="cms-welcome"><div><p className="cms-eyebrow">SITE CONTENT</p><h2>{selected.title} editor</h2><p>Make changes in the fields below, preview your page, then publish when you're ready.</p></div><span className={dirty?"cms-pill unsaved":"cms-pill"}>{dirty?`${changedCount} unpublished change${changedCount===1?"":"s"}`:"All changes published"}</span></div>
    {error&&<div className="cms-error" role="alert"><AlertCircle size={17}/>{error}</div>}
    {status&&<div className="cms-success" role="status"><CheckCircle2 size={18}/>{status}</div>}
    {showPreview&&<div className="cms-preview"><div><strong>Live website preview</strong><a href={preview(selected.page)} target="_blank" rel="noreferrer">Open in new tab <ExternalLink size={14}/></a></div><iframe title="Website preview" src={preview(selected.page)}/></div>}
    {tab!=="settings"&&<div className="cms-editor-tabs"><button type="button" className={editorMode==="fields"?"active":""} onClick={()=>setEditorMode("fields")}>Edit existing content</button><button type="button" className={editorMode==="sections"?"active":""} onClick={()=>setEditorMode("sections")}>Page builder ({sections.length})</button></div>}
    {editorMode==="sections"&&tab!=="settings"?<div className="cms-builder"><div className="cms-builder-intro"><h3>Custom sections</h3><p>Add sections below the existing page content. Reorder, hide, duplicate or remove them. Publish when ready.</p><label>Add a section <select defaultValue="" onChange={e=>{if(e.target.value)addSection(e.target.value as SectionKind);e.target.value=""}}><option value="" disabled>Choose a layout…</option>{(["text","image","cards","faq","cta","video","stats"] as SectionKind[]).map(kind=><option key={kind} value={kind}>{kind.charAt(0).toUpperCase()+kind.slice(1)}</option>)}</select></label></div>{sections.length===0&&<div className="cms-builder-empty">No custom sections yet. Choose a layout above to add one.</div>}{sections.map((s,i)=><article className="cms-builder-section" key={s.id}><div className="cms-builder-toolbar"><strong>{i+1}. {s.title||"Untitled section"}</strong><span>{s.kind}</span><div><button disabled={i===0} onClick={()=>moveSection(i,-1)} aria-label="Move up">↑</button><button disabled={i===sections.length-1} onClick={()=>moveSection(i,1)} aria-label="Move down">↓</button><button onClick={()=>changeSection(s.id,{hidden:!s.hidden})}>{s.hidden?"Show":"Hide"}</button><button onClick={()=>setSections([...sections.slice(0,i+1),{...s,id:crypto.randomUUID(),title:s.title+" (copy)"},...sections.slice(i+1)])}>Duplicate</button><button onClick={()=>{if(window.confirm("Delete this section?"))setSections(sections.filter(x=>x.id!==s.id))}}>Delete</button></div></div><div className="cms-builder-body"><label>Heading<input value={s.title} onChange={e=>changeSection(s.id,{title:e.target.value})}/></label><label>Description<textarea rows={4} value={s.body} onChange={e=>changeSection(s.id,{body:e.target.value})}/></label>{(["image","text","cta"] as string[]).includes(s.kind)&&<label>Image URL (optional)<input value={s.image||""} onChange={e=>changeSection(s.id,{image:e.target.value})}/><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={async e=>{const file=e.target.files?.[0];if(!file)return;const id="section-image."+s.id;await upload(file,id);e.target.value=""}}/><small>Use the upload option, then publish. The uploaded image will be applied automatically.</small></label>}{(s.kind==="cta"||s.kind==="text"||s.kind==="image")&&<><label>Button label<input value={s.buttonText||""} onChange={e=>changeSection(s.id,{buttonText:e.target.value})}/></label><label>Button URL<input value={s.buttonUrl||""} onChange={e=>changeSection(s.id,{buttonUrl:e.target.value})} placeholder="/contact"/></label></>}{s.kind==="video"&&<label>Embed URL (YouTube or Vimeo)<input value={s.buttonUrl||""} onChange={e=>changeSection(s.id,{buttonUrl:e.target.value})} placeholder="https://www.youtube.com/embed/…"/></label>}{(s.kind==="cards"||s.kind==="faq"||s.kind==="stats")&&<div className="cms-builder-items"><strong>Items</strong>{(s.items||[]).map((item,j)=><div key={j}><input aria-label={"Item "+(j+1)+" title"} placeholder="Item title" value={item.title} onChange={e=>changeSection(s.id,{items:(s.items||[]).map((v,k)=>k===j?{...v,title:e.target.value}:v)})}/><textarea aria-label={"Item "+(j+1)+" description"} placeholder="Description" rows={2} value={item.body} onChange={e=>changeSection(s.id,{items:(s.items||[]).map((v,k)=>k===j?{...v,body:e.target.value}:v)})}/><button onClick={()=>changeSection(s.id,{items:(s.items||[]).filter((_,k)=>k!==j)})}>Remove item</button></div>)}<button onClick={()=>changeSection(s.id,{items:[...(s.items||[]),{title:"New item",body:""}]})}>+ Add item</button></div>}</div></article>)}</div>:<>
    <div className="cms-edit-heading"><h3>Editable sections <small>{filtered.length} editable fields</small></h3><label><Search size={16}/><input placeholder="Search fields…" value={query} onChange={e=>setQuery(e.target.value)}/></label></div>
    <div className="cms-fields">{filtered.map(field=>{
      const current=original[field.id]??defaults[field.id]??"";
      const next=draft[field.id]??defaults[field.id]??"";
      const modified=current!==next;
      return <section className={modified?"cms-field cms-field-modified":"cms-field"} key={field.id}>
        <div className="cms-field-head"><label htmlFor={field.id}>{field.label}</label>{modified&&<span className="cms-change-label">Unpublished change</span>}</div>
        <div className="cms-current"><span className="cms-field-caption">CURRENTLY ON YOUR WEBSITE</span>{field.type==="image"?<div className="cms-current-image">{current?<img src={current} alt={field.label+" currently live"}/>:<span>No image set</span>}</div>:<p>{current||"No content set"}</p>}</div>
        <label className="cms-field-caption cms-edit-label" htmlFor={field.id}>{field.type==="image"?"REPLACEMENT IMAGE":"EDIT CONTENT"}</label>
        {field.type==="image"?<><div className="cms-image-preview">{next?<img src={next} alt={"New "+field.label}/>:<ImageIcon size={35}/>}</div><div className="cms-image-actions"><label className="cms-upload">Choose new image<input type="file" hidden accept="image/jpeg,image/png,image/webp,image/gif" onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file,field.id);e.target.value=""}}/></label><input id={field.id} aria-label={"Image URL for "+field.label} placeholder="Or paste an image URL" value={next} onChange={e=>setDraft(p=>({...p,[field.id]:e.target.value}))}/></div></>:field.type==="textarea"?<textarea id={field.id} rows={3} value={next} onChange={e=>setDraft(p=>({...p,[field.id]:e.target.value}))}/>:<input id={field.id} value={next} onChange={e=>setDraft(p=>({...p,[field.id]:e.target.value}))}/>}
        <div className="cms-field-footer"><span>{modified?"Your website will not change until you publish.":"Showing the current published content above."}</span><div className="cms-field-buttons"><button type="button" disabled={!modified} onClick={()=>setDraft(p=>({...p,[field.id]:current}))}>Undo edit</button><button type="button" onClick={()=>setDraft(p=>{const n={...p};delete n[field.id];return n})}><RotateCcw size={13}/> Use original</button></div></div>
      </section>;
    })}</div>
</>
    <div className="cms-bottom-save"><span>{dirty?"You have unpublished changes.":"Your content is saved."}</span><button className="cms-save" disabled={!dirty||busy} onClick={save}><Save size={16}/> Publish changes</button></div>
    </div></div>
  </div>;
}
