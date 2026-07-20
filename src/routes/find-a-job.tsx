import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check, Briefcase, MapPin, Clock, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";
import findJob from "../assets/find-job.jpg";
import { Field } from "./index";

export const Route = createFileRoute("/find-a-job")({
  head: () => ({
    meta: [
      { title: "Find a Job — Construction & Trades Careers | Your Crew" },
      { name: "description", content: "Register with Your Crew and get matched with construction, manufacturing, maintenance and trades jobs across Melbourne and Victoria." },
      { property: "og:title", content: "Find a Job — Your Crew" },
      { property: "og:url", content: "/find-a-job" },
    ],
    links: [{ rel: "canonical", href: "/find-a-job" }],
  }),
  component: FindAJob,
});

const benefits = [
  { icon: Briefcase, t: "Consistent work", d: "Ongoing placements across Melbourne and regional Victoria." },
  { icon: TrendingUp, t: "Career growth", d: "Move between projects, sectors and skill levels with our support." },
  { icon: ShieldCheck, t: "Safety first", d: "Sites we place you on take safety, PPE and inductions seriously." },
  { icon: Sparkles, t: "Great crews", d: "Join teams and companies with strong culture and management." },
];

const categories = ["Construction", "Manufacturing", "Maintenance", "Warehousing", "Trades", "Administration"];

const jobs = [
  { title: "Experienced Formworker", loc: "Melbourne CBD", type: "Full time", rate: "$45/hr" },
  { title: "Forklift Operator (LF)", loc: "Dandenong", type: "Ongoing casual", rate: "$38/hr" },
  { title: "General Labourer", loc: "Preston", type: "Casual", rate: "$34/hr" },
  { title: "Maintenance Technician", loc: "Laverton", type: "Full time", rate: "$52/hr" },
  { title: "EWP Operator", loc: "Docklands", type: "Contract", rate: "$46/hr" },
  { title: "Site Foreperson", loc: "Cheltenham", type: "Full time", rate: "$65/hr" },
];

function FindAJob() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-primary pt-32 pb-24 text-white md:pt-40 md:pb-32">
        <div className="absolute inset-0 -z-10">
          <img src={findJob} alt="Skilled worker on site" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary" />
        </div>
        <div className="container-x max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">For Job Seekers</p>
          <h1 className="text-balance mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Work with a crew that has your back.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Register today and get matched with meaningful work on great sites across Victoria —
            construction, manufacturing, maintenance, trades and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#register" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-primary shadow-lg shadow-accent/30">
              Register now <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#jobs" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white">
              Browse current jobs
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Why work with us</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">Benefits of joining Your Crew.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.t} className="rounded-3xl border border-border bg-background p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white"><b.icon className="h-5 w-5" /></span>
                <h3 className="mt-6 text-lg font-bold text-primary">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="jobs" className="bg-background py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Opportunities</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">Current opportunities</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span key={c} className="rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-primary">{c}</span>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {jobs.map((j, i) => (
              <motion.div
                key={j.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6"
              >
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-primary">{j.title}</p>
                  <p className="mt-1.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-accent" />{j.loc}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-accent" />{j.type}</span>
                    <span className="font-semibold text-accent">{j.rate}</span>
                  </p>
                </div>
                <a href="#register" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-accent">
                  Apply <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="bg-white py-24 md:py-32">
        <div className="container-x mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Registration</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">Register with Your Crew.</h2>
            <p className="mt-4 text-muted-foreground">Complete the form below and our team will be in touch.</p>
          </div>
          <MultiStepForm />
        </div>
      </section>
    </div>
  );
}

const licences = ["White Card", "Forklift", "Working at Heights", "EWP", "Other Tickets"];

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [licData, setLicData] = useState<Record<string, boolean>>({});
  const steps = ["Personal", "Experience", "Availability"];

  if (done) {
    return (
      <div className="mt-10 rounded-3xl border border-border bg-background p-12 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-primary">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-6 text-2xl font-bold text-primary">Registration successful.</h3>
        <p className="mt-2 text-muted-foreground">We'll contact you shortly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (step < steps.length - 1) setStep((s) => s + 1);
        else setDone(true);
      }}
      className="mt-10 rounded-3xl border border-border bg-background p-8 md:p-12"
    >
      <div className="mb-8 flex items-center gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-3">
            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${i <= step ? "bg-accent text-primary" : "bg-border text-muted-foreground"}`}>
              {i + 1}
            </div>
            <span className={`hidden text-sm font-semibold sm:inline ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded ${i < step ? "bg-accent" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" name="firstName" required />
          <Field label="Last name" name="lastName" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" required />
          <div className="sm:col-span-2"><Field label="Address" name="address" /></div>
          <Field label="Preferred job type" name="jobType" as="select">
            {["Full time", "Part time", "Casual", "Contract"].map((o) => <option key={o}>{o}</option>)}
          </Field>
          <Field label="Preferred location" name="prefLocation" />
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-4">
          <Field label="Industry" name="industry" as="select">
            {["Construction", "Manufacturing", "Maintenance", "Warehousing", "Trades", "Administration"].map((o) => <option key={o}>{o}</option>)}
          </Field>
          <Field label="Years of experience" name="experience" type="number" />
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Licences & tickets</p>
            <div className="flex flex-wrap gap-2">
              {licences.map((l) => {
                const on = !!licData[l];
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLicData((d) => ({ ...d, [l]: !on }))}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${on ? "border-accent bg-accent text-primary" : "border-border bg-white text-primary hover:border-accent"}`}
                  >
                    {on && <Check className="mr-1 inline h-3.5 w-3.5" />}{l}
                  </button>
                );
              })}
            </div>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resume upload</span>
            <input type="file" name="resume" className="w-full rounded-xl border border-dashed border-border bg-white px-4 py-8 text-sm" />
          </label>
          <Field label="Cover letter" name="cover" as="textarea" />
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Availability" name="availability" as="select">
            {["Immediately", "Within 1 week", "Within 2 weeks", "Within a month"].map((o) => <option key={o}>{o}</option>)}
          </Field>
          <Field label="Own transport" name="transport" as="select">
            {["Yes", "No"].map((o) => <option key={o}>{o}</option>)}
          </Field>
          <div className="sm:col-span-2"><Field label="Anything else we should know?" name="notes" as="textarea" /></div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-primary">
            Back
          </button>
        ) : <span />}
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-accent">
          {step === steps.length - 1 ? "Submit" : "Continue"} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}