import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  HardHat,
  Factory,
  Wrench,
  Warehouse,
  Truck,
  Building2,
  Briefcase,
  Users,
  ClipboardList,
  ShieldCheck,
  Zap,
  Plus,
  Minus,
} from "lucide-react";
import findStaff from "../assets/find-staff.jpg";
import { Field } from "./index";

export const Route = createFileRoute("/find-staff")({
  head: () => ({
    meta: [
      { title: "Find Staff — Request Skilled Workers | Your Crew" },
      { name: "description", content: "Request skilled construction, manufacturing, maintenance and warehousing staff across Melbourne and Victoria. 24-hour response, fully screened workers." },
      { property: "og:title", content: "Find Staff — Your Crew" },
      { property: "og:url", content: "/find-staff" },
    ],
    links: [{ rel: "canonical", href: "/find-staff" }],
  }),
  component: FindStaff,
});

const workforce = [
  { icon: HardHat, label: "Construction" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Wrench, label: "Maintenance" },
  { icon: ClipboardList, label: "Administration" },
  { icon: Warehouse, label: "Warehousing" },
  { icon: Users, label: "Labourers" },
  { icon: Briefcase, label: "Trades" },
  { icon: Building2, label: "Professionals" },
];

const industries = ["Construction", "Civil", "Warehousing", "Manufacturing", "Maintenance", "Commercial", "Property", "Infrastructure"];

const faqs = [
  { q: "How quickly can you provide workers?", a: "Depending on your requirements, we can often provide skilled workers within 24 hours. For urgent requests, call us directly on 0451 267 768." },
  { q: "Do your workers have the necessary certifications?", a: "Yes — we carefully vet all workers to ensure they hold the required licences, tickets and industry experience for their role." },
  { q: "Can I hire for short-term and long-term projects?", a: "Absolutely. We offer flexible hiring — a single day, a few weeks, or ongoing long-term placements." },
  { q: "What areas do you service?", a: "We are Melbourne-based and service metro and regional Victoria, with interstate placements on request." },
];

function FindStaff() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-primary pt-32 pb-24 text-white md:pt-40 md:pb-32">
        <div className="absolute inset-0 -z-10">
          <img src={findStaff} alt="Hiring skilled workers" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary" />
        </div>
        <div className="container-x max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">For Employers</p>
          <h1 className="text-balance mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            The right workers on your site, when you need them.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Request skilled labour hire for construction, manufacturing, maintenance and more.
            Fully screened workers, 24-hour response, Victoria wide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#request" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/30">
              Request staff <ArrowRight className="h-4 w-4" />
            </a>
            <a href="tel:+61451267768" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white">
              Call 0451 267 768
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Why choose us</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">Reliable labour hire, without the hassle.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Zap, t: "Rapid response", d: "Workers on site in as little as 24 hours." },
              { icon: ShieldCheck, t: "Pre-screened", d: "All workers vetted with required licences and tickets." },
              { icon: Users, t: "Culture fit", d: "We match people to your site and your team, not just the role." },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-border bg-background p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-white">
                  <x.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-primary">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Industries</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">Trusted across every sector we serve.</h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {industries.map((i) => (
              <div key={i} className="rounded-2xl border border-border bg-white px-5 py-6 text-center text-sm font-semibold text-primary transition-colors hover:border-accent">
                {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Available workforce</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">Skilled people, ready to work.</h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {workforce.map((w, i) => (
              <motion.div
                key={w.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-accent"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white transition-colors group-hover:bg-accent">
                  <w.icon className="h-5 w-5" />
                </span>
                <p className="font-semibold text-primary">{w.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-x mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">FAQ</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">Frequently asked questions</h2>
          </div>
          <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-white">
            {faqs.map((f, i) => <FAQItem key={i} {...f} />)}
          </div>
        </div>
      </section>

      <section id="request" className="bg-white py-24 md:py-32">
        <div className="container-x mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Request staff</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">Tell us what you need.</h2>
            <p className="mt-4 text-muted-foreground">We'll come back to you within one business day.</p>
          </div>
          <RequestForm />
        </div>
      </section>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
      >
        <span className="font-semibold text-primary">{q}</span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{a}</p>
      </motion.div>
    </div>
  );
}

function RequestForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="mt-10 rounded-3xl border border-border bg-background p-8 md:p-12"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" name="company" required />
        <Field label="Contact name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Industry" name="industry" as="select">
          {["Construction", "Manufacturing", "Maintenance", "Warehousing", "Other"].map((o) => <option key={o}>{o}</option>)}
        </Field>
        <Field label="Workers needed" name="count" type="number" />
        <Field label="Site location" name="location" />
        <Field label="Start date" name="start" type="date" />
      </div>
      <div className="mt-4">
        <Field label="Tell us about the role" name="details" as="textarea" />
      </div>
      <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent">
        Request staff <ArrowRight className="h-4 w-4" />
      </button>
      {sent && <p className="mt-4 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent">Request received — our team will be in touch shortly.</p>}
    </form>
  );
}