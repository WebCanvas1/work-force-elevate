import { useContentValue } from "../../lib/site-content";
import { safeWebUrl } from "../../lib/editable-settings";

const SOCIALS = [
  {
    label: "LinkedIn", key: "linkedin", fallback: "https://www.linkedin.com/company/your-crew-pty-ltd/",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45z",
  },
  {
    label: "Facebook", key: "facebook", fallback: "https://www.facebook.com/yourcrewaustralia",
    path: "M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.2-1.5 1.5-1.5h1.6V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.7V14h2.7v8h3.1z",
  },
  {
    label: "Instagram", key: "instagram", fallback: "",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.9.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.9-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8zm4.7-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0z",
  },
];

function SocialIcon({social}:{social:typeof SOCIALS[number]}) {
  const value=useContentValue(`global.social.${social.key}`,social.fallback);
  const href=safeWebUrl(value,"");
  if(!href)return null;
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-accent hover:text-accent">
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d={social.path}/></svg>
  </a>;
}
export function SocialLinks() {return <div className="flex flex-wrap gap-3" aria-label="Follow Your Crew">{SOCIALS.map(s=><SocialIcon key={s.key} social={s}/>)}</div>;}
