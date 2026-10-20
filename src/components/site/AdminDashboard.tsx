import { useEffect, useMemo, useState } from "react";
import { Save, Eye, Image as ImageIcon, LayoutDashboard, Settings, FileText, LogOut, RotateCcw, Search, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { setContent, type ContentMap } from "../../lib/site-content";

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
const pretty = (id: string) => id.split(".").slice(1).join(" ");
const preview = (page: string) => `#${page}`;
export function AdminDashboard() {
  const [tab,setTab]=useState("home");
  const [draft,setDraft]=useState<ContentMap>({});
  const [original,setOriginal]=useState<ContentMap>({});
  const [defaults,setDefaults]=useState<ContentMap>({});
  const [loggedIn,setLoggedIn]=useState(false);
  const [ready,setReady]=useState(false);
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  const [status,setStatus]=useState("");
  const [query,setQuery]=useState("");
  const [showPreview,setShowPreview]=useState(false);
  const selected=groups.find(g=>g.id===tab) || groups[0];
  const dirty=JSON.stringify(draft)!==JSON.stringify(original);
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
    setOriginal(values);setDraft(values);setDefaults(data.defaults||{});
  }
  async function signIn(e: React.FormEvent){
    e.preventDefault();setBusy(true);setError("");
    try {
      const response=await fetch("/api/admin/login",{method:"POST",credentials:"same-origin",headers:{"content-type":"application/json"},body:JSON.stringify({password})});
      if(!response.ok)throw new Error(response.status===401?"Incorrect password":"Unable to log in");
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
    <aside className="cms-sidebar"><div className="cms-brand"><span className="cms-logo">W</span><span>Website Editor<small>Work-Force Elevate</small></span></div><p className="cms-section-title">CONTENT MANAGEMENT</p><nav aria-label="Admin navigation">{groups.map(g=><button key={g.id} type="button" className={tab===g.id?"active":""} onClick={()=>{setTab(g.id);setQuery("");setStatus("");setShowPreview(false)}}>{g.id==="settings"?<Settings size={18}/>:g.id==="home"?<LayoutDashboard size={18}/>:<FileText size={18}/>} {g.title}</button>)}</nav><div className="cms-sidebar-bottom"><a href="#/" target="_blank" rel="noreferrer"><ExternalLink size={17}/> View website</a><button onClick={logout}><LogOut size={17}/> Sign out</button></div></aside>
    <div className="cms-workspace"><header className="cms-topbar"><div><h1>{selected.title}</h1><span>{selected.description}</span></div><div className="cms-actions"><button className="cms-ghost" onClick={()=>setShowPreview(v=>!v)}><Eye size={17}/> {showPreview?"Hide preview":"Preview"}</button><button className="cms-save" disabled={!dirty||busy} onClick={save}><Save size={17}/>{busy?"Working…":"Publish changes"}</button></div></header>
    <div className="cms-content"><div className="cms-welcome"><div><p className="cms-eyebrow">SITE CONTENT</p><h2>Edit {selected.title}</h2><p>Make changes in the fields below, preview your page, then publish when you're ready.</p></div><span className={dirty?"cms-pill unsaved":"cms-pill"}>{dirty?"Unsaved changes":"Up to date"}</span></div>
    {error&&<div className="cms-error" role="alert"><AlertCircle size={17}/>{error}</div>}
    {status&&<div className="cms-success" role="status"><CheckCircle2 size={18}/>{status}</div>}
    {showPreview&&<div className="cms-preview"><div><strong>Live website preview</strong><a href={preview(selected.page)} target="_blank" rel="noreferrer">Open in new tab <ExternalLink size={14}/></a></div><iframe title="Website preview" src={preview(selected.page)}/></div>}
    <div className="cms-edit-heading"><h3>Page Content <small>{filtered.length} editable fields</small></h3><label><Search size={16}/><input placeholder="Search fields…" value={query} onChange={e=>setQuery(e.target.value)}/></label></div>
    <div className="cms-fields">{filtered.map(field=><div className="cms-field" key={field.id}><div className="cms-field-head"><label htmlFor={field.id}>{field.label}</label><small>{pretty(field.id)}</small></div>{field.type==="image"?<><div className="cms-image-preview">{draft[field.id]||defaults[field.id]?<img src={draft[field.id]||defaults[field.id]} alt={field.label}/>:<ImageIcon size={35}/>}</div><div className="cms-image-actions"><label className="cms-upload">Upload image<input type="file" hidden accept="image/*" onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file,field.id);e.target.value=""}}/></label><input id={field.id} placeholder="Or enter image URL" value={draft[field.id]??defaults[field.id]??""} onChange={e=>setDraft(p=>({...p,[field.id]:e.target.value}))}/></div></>:field.type==="textarea"?<textarea id={field.id} rows={3} value={draft[field.id]??defaults[field.id]??""} onChange={e=>setDraft(p=>({...p,[field.id]:e.target.value}))}/>:<input id={field.id} value={draft[field.id]??defaults[field.id]??""} onChange={e=>setDraft(p=>({...p,[field.id]:e.target.value}))}/>}<div className="cms-field-footer"><span>{field.hint||"Updates will appear after publishing."}</span><button type="button" onClick={()=>setDraft(p=>{const n={...p};delete n[field.id];return n})}><RotateCcw size={13}/> Restore default</button></div></div>)}</div>
    <div className="cms-bottom-save"><span>{dirty?"You have unpublished changes.":"Your content is saved."}</span><button className="cms-save" disabled={!dirty||busy} onClick={save}><Save size={16}/> Publish changes</button></div>
    </div></div>
  </div>;
}
