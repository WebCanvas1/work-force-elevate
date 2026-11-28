import { useSetting } from "../lib/editable-settings";
import { defaultNewsJson } from "../lib/sample-news";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useContentValue } from "../lib/site-content";
import { parseNews, formatNewsDate, isPublishedArticle, newsImageUrl } from "../lib/news";

export const Route = createFileRoute("/news_/$articleId")({ component: NewsArticle });
function NewsArticle() {
  const width=useSetting("news.article.width");
  const { articleId } = Route.useParams();
  const article = parseNews(useContentValue("news.articles", defaultNewsJson)).find(a=>a.id===articleId && isPublishedArticle(a));
  return <section className="pt-40 pb-24 md:pt-48"><div className={"container-x "+(width==="standard"?"max-w-3xl":"max-w-6xl")}>
    <Link to="/news" className="font-semibold text-primary hover:underline">← Back to News</Link>
    {article ? <article>
      <p className="mt-10 text-muted-foreground"><time dateTime={article.date}>{formatNewsDate(article.date)}</time></p>
      <h1 className="mt-4 text-4xl font-extrabold text-primary md:text-5xl">{article.title}</h1>
      <p className="mt-7 text-xl font-semibold text-primary">{article.excerpt}</p>
      {newsImageUrl(article.image) && <img src={newsImageUrl(article.image)} alt={article.imageAlt || article.title} width={1200} height={675} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />}
      <div className="mt-8 space-y-6 text-muted-foreground">{article.body.split(/\n\s*\n/).map((p,i)=><p key={i} className="whitespace-pre-line">{p}</p>)}</div>
    </article> : <><h1 className="mt-10 text-4xl font-bold text-primary">Article unavailable</h1><p className="mt-5">This story may have been removed or is not yet published.</p></>}
  </div></section>;
}
