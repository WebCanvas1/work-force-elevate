import { useEffect, useState, createElement } from "react";

/** Content overrides are downloaded from the protected CMS API. Public pages use their original copy as fallback. */
export type ContentMap = Record<string, string>;
let content: ContentMap = {};
const subscribers = new Set<() => void>();
export const getContent = () => content;
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
export function EditableText({ id, children, as: Tag = "span", ...props }: {
  id: string; children: string; as?: keyof React.JSX.IntrinsicElements; className?: string;
}) {
  const value = useContentValue(id, children);
  return createElement(Tag, props, value);
}
