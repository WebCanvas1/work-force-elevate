import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSetting } from "../../lib/editable-settings";
import { SocialLinks } from "./SocialLinks";
export function KeepInTouch() {
  const title=useSetting("global.keep.title");
  const body=useSetting("global.keep.body");
  const button=useSetting("global.keep.button");
  const show=useSetting("global.keep.visible")!=="false";
  if(!show)return null;
  return <section aria-label="Keep in touch" className="border-b border-white/20 bg-primary py-12 text-white md:py-16">
    <div className="container-x flex flex-col justify-between gap-8 md:flex-row md:items-center">
      <div className="max-w-2xl"><h2 className="text-3xl font-bold md:text-4xl">{title}</h2><p className="mt-4 text-white/85">{body}</p><div className="mt-6"><SocialLinks /></div></div>
      <Link to="/contact" className="inline-flex w-fit shrink-0 items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 font-bold text-primary hover:bg-accent/90">{button}<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
    </div>
  </section>;
}
