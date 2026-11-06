export type NewsArticle = { id: string; title: string; date: string; excerpt: string; body: string; published: boolean };

export function parseNews(raw: string): NewsArticle[] {
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter((a): a is NewsArticle => a && typeof a.id === "string" && typeof a.title === "string" && typeof a.date === "string" && typeof a.excerpt === "string" && typeof a.body === "string" && typeof a.published === "boolean");
  } catch { return []; }
}

export function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date + "T00:00:00Z"));
}

export const isPublishedArticle = (a: NewsArticle) => a.published && Boolean(a.title.trim()) && /^\d{4}-\d{2}-\d{2}$/.test(a.date) && Number.isFinite(Date.parse(a.date));
