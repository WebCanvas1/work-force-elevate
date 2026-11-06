import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Newspaper } from "lucide-react";
import { ContentText, useContentValue } from "../lib/site-content";
import { parseNews, formatNewsDate, isPublishedArticle } from "../lib/news";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [{ title: "News | Your Crew" }, { name: "description", content: "News and updates from Your Crew across Melbourne and Victoria." }] }),
  component: News,
});

function News() {
  const articles = parseNews(useContentValue("news.articles", "[]")).filter(isPublishedArticle).sort((a,b) => b.date.localeCompare(a.date));
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [limit, setLimit] = useState(9);
  const filtered = articles.filter(a => `${a.title} ${a.excerpt}`.toLowerCase().includes(search.toLowerCase()));
  if (sort === "oldest") filtered.reverse();
  return <div>
    <section className="bg-primary pt-40 pb-16 text-white md:pt-48 md:pb-20"><div className="container-x">
      <p className="font-semibold uppercase tracking-widest text-accent">Your Crew updates</p>
      <h1 className="mt-4 text-5xl font-extrabold md:text-6xl"><ContentText id="news.title" fallback="News" /></h1>
      <p className="mt-6 max-w-2xl text-white/90"><ContentText id="news.intro" fallback="The latest news, stories and updates from Your Crew." /></p>
    </div></section>
    <section className="bg-surface py-16 md:py-24"><div className="container-x">
      {articles.length > 0 ? <>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <label className="grid w-full gap-2 font-semibold text-primary sm:max-w-md">Search news<input type="search" value={search} onChange={e => {setSearch(e.target.value);setLimit(9);}} placeholder="Search articles" className="rounded-xl border border-border bg-white px-4 py-3 font-medium" /></label>
          <label className="grid gap-2 font-semibold text-primary">Sort by<select value={sort} onChange={e => {setSort(e.target.value);setLimit(9);}} className="rounded-xl border border-border bg-white px-4 py-3 font-medium"><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
        </div>
        <p className="mt-8 text-muted-foreground" role="status">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.slice(0,limit).map(a => <article key={a.id} className="flex flex-col rounded-2xl border border-border bg-white p-7 shadow-sm">
          <p className="font-semibold text-muted-foreground">News · <time dateTime={a.date}>{formatNewsDate(a.date)}</time></p>
          <h2 className="mt-5 text-2xl font-bold text-primary"><Link to="/news/$articleId" params={{articleId:a.id}} className="hover:underline">{a.title}</Link></h2>
          <p className="mt-4 flex-1 text-muted-foreground">{a.excerpt}</p>
          <Link to="/news/$articleId" params={{articleId:a.id}} className="mt-7 inline-flex items-center gap-2 font-semibold text-primary" aria-label={`Read full story: ${a.title}`}>Read full story <ArrowRight className="h-5 w-5" /></Link>
        </article>)}</div>
        {filtered.length === 0 && <p className="py-12">No articles match your search. Try another keyword.</p>}
        {limit < filtered.length && <button onClick={()=>setLimit(n=>n+9)} className="mx-auto mt-12 block rounded-full bg-primary px-8 py-4 font-semibold text-white">Load more articles</button>}
      </> : <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-white p-10 text-center">
        <Newspaper className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
        <h2 className="mt-5 text-3xl font-bold text-primary">News is on its way</h2>
        <p className="mt-4 text-muted-foreground">Check back soon for the latest stories and updates from Your Crew.</p>
        <Link to="/contact" className="mt-7 inline-flex rounded-full bg-primary px-7 py-3 font-semibold text-white">Get in touch</Link>
      </div>}
    </div></section>
  </div>;
}
