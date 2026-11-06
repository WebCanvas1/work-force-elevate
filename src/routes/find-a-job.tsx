import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { FaqSection, jobFaqs } from "../components/site/FaqSection";
import { WorkforceOneEmbed } from "../components/site/WorkforceOneEmbed";
import { ContentText, useContentValue } from "../lib/site-content";
import { jobPageCopy, jobBenefits } from "../lib/job-page-content";
import recruitmentPhoto from "../assets/your-crew-recruitment.jpg";

export const Route = createFileRoute("/find-a-job")({
  head: () => ({
    meta: [
      { title: "Find a Job — Work with Your Crew" },
      { name: "description", content: "Join Your Crew for regular casual work in manufacturing, construction and facilities maintenance. Browse jobs and register with Workforce One." },
      { property: "og:title", content: "Find a Job — Your Crew" },
    ],
    links: [{ rel: "canonical", href: "/find-a-job" }],
  }),
  component: FindAJob,
});

function jumpTo(id: string) {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  section?.focus({ preventScroll: true });
}

function Copy({ id }: { id: keyof typeof jobPageCopy }) {
  return <ContentText id={id} fallback={jobPageCopy[id]} />;
}

function FindAJob() {
  const photo = useContentValue("jobs.hero.image", recruitmentPhoto);
  return <div>
    <section className="bg-primary pt-36 pb-16 text-white md:pt-44 md:pb-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="font-semibold uppercase tracking-widest text-accent">Work with Your Crew</p>
          <h1 className="mt-4 text-5xl font-extrabold md:text-6xl"><Copy id="jobs.hero.title" /></h1>
          <p className="mt-7 text-xl font-semibold text-white"><Copy id="jobs.hero.intro" /></p>
          <p className="mt-5 text-white/90"><Copy id="jobs.hero.body" /></p>
          <p className="mt-5 text-white/90"><Copy id="jobs.hero.invitation" /></p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={()=>jumpTo("jobs")} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-primary">Browse current jobs <ArrowRight className="h-5 w-5" /></button>
            <button type="button" onClick={()=>jumpTo("register")} className="rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white">Create an account</button>
          </div>
        </div>
        <img src={photo} alt="Your Crew recruitment team meeting with a candidate" width={2200} height={1468} className="aspect-[3/2] w-full rounded-3xl object-cover shadow-xl" fetchPriority="high" />
      </div>
    </section>

    <section className="bg-white py-20 md:py-24"><div className="container-x">
      <h2 className="text-4xl font-bold text-primary md:text-5xl"><Copy id="jobs.benefits.title" /></h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{jobBenefits.map((b,i)=><div key={b.title} className="rounded-2xl border border-border bg-surface p-7">
        <Check className="mb-5 h-8 w-8 rounded-full bg-accent p-1 text-primary" aria-hidden="true" />
        <h3 className="text-2xl font-bold text-primary"><ContentText id={`jobs.benefit.${i}.title`} fallback={b.title} /></h3>
        <p className="mt-3 text-muted-foreground"><ContentText id={`jobs.benefit.${i}.body`} fallback={b.body} /></p>
      </div>)}</div>
    </div></section>

    <section className="bg-surface py-20 md:py-24"><div className="container-x">
      <h2 className="max-w-3xl text-4xl font-bold text-primary md:text-5xl"><Copy id="jobs.steps.title" /></h2>
      <p className="mt-5 max-w-3xl text-muted-foreground"><Copy id="jobs.steps.intro" /></p>
      <ol className="mt-10 grid gap-6 md:grid-cols-3">{[
        {title:"Create an account",body:"Click here to get started. Here you can save your CV and upload your licences and certificates.",target:"register"},
        {title:"Search and apply",body:"Apply for roles.",target:"jobs"},
        {title:"Get job alerts",body:"By creating an account, you will be notified of new jobs first.",target:"register"},
      ].map((step,i)=><li key={step.title} className="rounded-2xl border border-border bg-white p-7">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-primary font-bold text-white">{i+1}</span>
        <h3 className="mt-5 text-2xl font-bold text-primary"><button type="button" onClick={()=>jumpTo(step.target)} className="text-left underline decoration-accent underline-offset-4">{step.title}</button></h3>
        <p className="mt-3 text-muted-foreground">{step.body}</p>
      </li>)}</ol>
    </div></section>

    <section id="jobs" tabIndex={-1} className="bg-white py-20 md:py-24"><div className="container-x">
      <h2 className="mb-7 text-4xl font-bold text-primary md:text-5xl"><Copy id="jobs.openings.title" /></h2>
      <WorkforceOneEmbed kind="jobs" />
    </div></section>

    <section id="register" tabIndex={-1} className="bg-surface py-20 md:py-24"><div className="container-x">
      <h2 className="mb-7 text-4xl font-bold text-primary md:text-5xl"><Copy id="jobs.register.title" /></h2>
      <WorkforceOneEmbed kind="registration" />
    </div></section>

    <section className="bg-primary py-16 text-white"><div className="container-x">
      <h2 className="max-w-3xl text-3xl font-bold md:text-4xl"><Copy id="jobs.contact.title" /></h2>
      <p className="mt-6">Please contact our recruitment team by emailing <a href="mailto:recruit@yourcrew.com.au" className="font-semibold text-accent underline underline-offset-4">recruit@yourcrew.com.au</a> or by phoning <a href="tel:+61391081102" className="whitespace-nowrap font-semibold text-accent underline underline-offset-4">03 9108 1102</a>.</p>
    </div></section>
    <FaqSection audience="jobs" groups={jobFaqs} />
  </div>;
}
