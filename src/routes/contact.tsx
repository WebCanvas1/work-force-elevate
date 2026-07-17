import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Field } from "./index";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Your Crew — Melbourne Labour Hire" },
      { name: "description", content: "Get in touch with Your Crew. Melbourne-based labour hire team, ready to help with your workforce needs. Call, email or send a message." },
      { property: "og:title", content: "Contact Your Crew" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div>
      <section className="bg-primary pt-32 pb-16 text-white md:pt-40 md:pb-20">
        <div className="container-x max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
          <h1 className="text-balance mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Let's build your dream team.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Call, email or send a message — our Melbourne team responds within one business day.
          </p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="rounded-3xl border border-border bg-white p-8 md:p-10">
              <h2 className="text-2xl font-bold text-primary">Company information</h2>
              <ul className="mt-6 space-y-5">
                <ContactRow icon={Phone} label="Phone" value="0451 267 768" href="tel:+61451267768" />
                <ContactRow icon={Mail} label="Email" value="info@yourcrew.com.au" href="mailto:info@yourcrew.com.au" />
                <ContactRow icon={MapPin} label="Office" value="Melbourne, Victoria — servicing statewide" />
                <ContactRow icon={Clock} label="Business hours" value="Mon – Fri, 7:00am – 6:00pm" />
              </ul>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-border">
              <iframe
                title="Melbourne map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=144.85%2C-37.87%2C145.05%2C-37.76&layer=mapnik"
                className="h-80 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}

function ContactRow({ icon: I, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const body = <span className="font-semibold text-primary">{value}</span>;
  return (
    <li className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-white">
        <I className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-0.5">{href ? <a href={href} className="hover:text-accent">{body}</a> : body}</p>
      </div>
    </li>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10"
    >
      <h2 className="text-2xl font-bold text-primary">Send a message</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
        <Field label="Phone" name="phone" type="tel" />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="mt-4">
        <Field label="Message" name="message" as="textarea" required />
      </div>
      <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white hover:bg-accent">
        Submit <ArrowRight className="h-4 w-4" />
      </button>
      {sent && <p className="mt-4 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent">Message sent — we'll be in touch shortly.</p>}
    </form>
  );
}