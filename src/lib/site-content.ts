import { useEffect, useState, createElement } from "react";

/** Content overrides are downloaded from the protected CMS API. Public pages use their original copy as fallback. */
export type ContentMap = Record<string, string>;
let content: ContentMap = {};
const subscribers = new Set<() => void>();
export const getContent = () => content;
export const getValue = (key: string, fallback: string) => content[key] ?? fallback;
export const setContent = (next: ContentMap) => {
  content = next;
  subscribers.forEach(fn => fn());
};
export function useContentValue(key: string, fallback: string): string {
  const [,refresh] = useState(0);
  useEffect(() => {
    const callback = () => refresh(v => v + 1);
    subscribers.add(callback);
    return () => { subscribers.delete(callback); };
  }, []);
  return content[key] ?? fallback;
}
export async function loadPublicContent() {
  try {
    const res = await fetch("/api/site-content", { credentials: "same-origin" });
    if (res.ok) {
      const data = await res.json() as { content?: ContentMap };
      if (data.content && typeof data.content === "object") setContent(data.content);
    }
  } catch { /* Site stays functional if CMS is unavailable. */ }
}

/** Render a string through the CMS without changing the existing HTML structure. */
export function ContentText({ id, fallback }: { id: string; fallback: string }) {
  return createElement("span", { style: { display: "contents" } }, useContentValue(id, fallback));
}
export function ContentImage({ id, fallback, alt, className }: { id: string; fallback: string; alt: string; className?: string }) {
  const src = useContentValue(id, fallback);
  return createElement("img", { src, alt, className, loading: "lazy" });
}
