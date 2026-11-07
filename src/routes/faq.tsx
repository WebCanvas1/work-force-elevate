import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HelpCircle } from "lucide-react";
import { staffFaqs } from "../components/site/FaqSection";
import { ContentText } from "../lib/site-content";

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
  return (
    <div>
      <section className="bg-primary pb-16 pt-40 text-white md:pb-20 md:pt-48">
        <div className="container-x text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            <HelpCircle className="h-5 w-5" /> Help centre
          </span>
          <h1 className="mt-5 text-5xl font-extrabold tracking-tight md:text-6xl">FAQ</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            Find answers to commonly asked questions about Your Crew services.
          </p>
        </div>
      </section>
      <section className="bg-surface py-16 md:py-24" aria-label="Frequently asked questions">
        <div className="container-x max-w-5xl">
          <nav aria-label="FAQ categories" className="mb-12 flex flex-wrap justify-center gap-3">
            {staffFaqs.map(group => (
              <a key={group.id} href={`#faq-${group.id}`}
                className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white">
                {group.title}
              </a>
            ))}
          </nav>
          <div className="space-y-14">
            {staffFaqs.map(group => (
              <section key={group.id} id={`faq-${group.id}`} className="scroll-mt-36">
                <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl">{group.title}</h2>
                <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  {group.items.map((item, index) => (
                    <details key={item.q} className="group px-5 md:px-8">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-base font-semibold text-primary marker:hidden md:text-lg [&::-webkit-details-marker]:hidden">
                        <span><ContentText id={`staff.faq.${group.id}.${index}.question`} fallback={item.q} /></span>
                        <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-xl text-primary group-open:bg-primary group-open:text-white">
                          <span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span>
                        </span>
                      </summary>
                      <div className="whitespace-pre-line pb-7 pr-8 leading-7 text-muted-foreground">
                        <ContentText id={`staff.faq.${group.id}.${index}.answer`} fallback={item.a} />
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-primary py-16 text-white md:py-20">
        <div className="container-x flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Still have questions?</h2>
            <p className="mt-3 text-white/75">Our friendly team is here to help you find the right workforce solution.</p>
          </div>
          <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-primary transition-transform hover:-translate-y-0.5">
            Get in touch <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
