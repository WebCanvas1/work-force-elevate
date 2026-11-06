import { parseNews, type NewsArticle } from "../../lib/news";

export function NewsEditor({value,onChange}:{value:string;onChange:(value:string)=>void}) {
  const articles=parseNews(value);
  const update=(id:string,patch:Partial<NewsArticle>)=>onChange(JSON.stringify(articles.map(a=>a.id===id?{...a,...patch}:a)));
  return <div className="cms-builder">
    <div className="cms-builder-intro"><h3>News articles</h3><p>Add articles below. Only articles marked Published appear on the website after you save.</p><button type="button" className="cms-upload" onClick={()=>onChange(JSON.stringify([...articles,{id:crypto.randomUUID(),title:"",date:new Intl.DateTimeFormat("en-CA",{timeZone:"Australia/Sydney",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()),excerpt:"",body:"",published:false}]))}>+ Add article</button></div>
    {articles.map(a=><article key={a.id} className="cms-builder-section"><div className="cms-builder-toolbar"><strong>{a.title||"New article"}</strong><div><button type="button" onClick={()=>{if(window.confirm("Delete this article?"))onChange(JSON.stringify(articles.filter(x=>x.id!==a.id)))}}>Delete article</button></div></div><div className="cms-builder-body">
      <label>Title<input value={a.title} onChange={e=>update(a.id,{title:e.target.value})}/></label>
      <label>Publication date<input type="date" value={a.date} onChange={e=>update(a.id,{date:e.target.value})}/></label>
      <label>Summary<textarea rows={3} value={a.excerpt} onChange={e=>update(a.id,{excerpt:e.target.value})}/></label>
      <label>Article text (separate paragraphs with a blank line)<textarea rows={10} value={a.body} onChange={e=>update(a.id,{body:e.target.value})}/></label>
      <label><span><input type="checkbox" style={{width:"auto"}} checked={a.published} onChange={e=>update(a.id,{published:e.target.checked})}/> Published</span></label>
    </div></article>)}
  </div>;
}
