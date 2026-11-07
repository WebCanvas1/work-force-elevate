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
  return (
    <div>
      <section className="bg-primary pb-16 pt-40 text-white md:pb-20 md:pt-48">
        <div className="container-x text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            <HelpCircle className="h-5 w-5" /> Help centre
          </span>
          <h1 className="mt-5 text-5xl font-extrabold tracking-tight md:text-6xl">FAQ</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            Find answers to commonly asked questions about Your Crew services
          </p>
        </div>
      </section>
      <EmployerFaqContent />
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
