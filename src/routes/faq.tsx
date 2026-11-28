import { useSetting } from "../lib/editable-settings";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HelpCircle } from "lucide-react";
import { EmployerFaqContent } from "../components/site/EmployerFaqContent";




export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Your Crew" },
      { name: "description", content: "Answers to frequently asked questions about labour hire, finding workers, flexible staffing, payroll and workplace compliance at Your Crew." },
      { property: "og:title", content: "Frequently Asked Questions | Your Crew" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const title=useSetting("faq.hero.title");
  const introduction=useSetting("faq.hero.body");
  const image=useSetting("faq.hero.image");
  return (
    <div>
      <section className="bg-primary pb-16 pt-36 text-white md:pb-20 md:pt-44">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-widest text-accent"><HelpCircle className="h-5 w-5" aria-hidden="true" />Help centre</span>
            <h1 className="mt-5 text-5xl font-extrabold tracking-tight md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/80">{introduction}</p>
          </div>
          <img src={image} alt="Your Crew team discussing workforce questions" width={1200} height={800} fetchPriority="high" className="aspect-[3/2] w-full rounded-3xl object-cover shadow-lg" />
        </div>
      </section>
      <EmployerFaqContent />
    </div>
  );
}
