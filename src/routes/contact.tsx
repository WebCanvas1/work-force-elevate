import { useSetting, safeMapUrl, safeWebUrl, editableDefaults } from "../lib/editable-settings";
import { ContentVisibility } from "../components/site/ContentVisibility";
import { contactServices } from "../lib/contact-services";
import { ContentImage, ContentText, useContentValue } from "../lib/site-content";
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
  const phone=useContentValue("global.phone","0451 267 768");
  const email=useContentValue("global.email","sales@yourcrew.com.au");
  const officeLabel=useSetting("contact.office.label");
  const officeAddress=useSetting("contact.office.address");
  const mapUrl=safeMapUrl(useSetting("contact.office.map"));
  const directions=safeWebUrl(useSetting("contact.office.directions"),editableDefaults["contact.office.directions"]);
  const directionsLabel=useSetting("contact.office.maplabel");
  const hours=useSetting("contact.hours");
  const servicesPosition=useSetting("contact.services.position");
  const serviceTiles=(<ContentVisibility id="contact.services.visible">      <section aria-label="Our staffing services" className="bg-white py-12 md:py-16">
        <div className="container-x grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {contactServices.map(service => (
            <ServiceTile key={service.id} service={service} />
          ))}
        </div>
      </section></ContentVisibility>);
  return (
    <div>
      <section className="bg-primary pt-32 pb-16 text-white md:pt-40 md:pb-20">
        <div className="container-x max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
          <h1 className="text-balance mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            <ContentText id="contact.hero.title" fallback="Let’s build your dream team." />
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Call, email or send a message — our Melbourne team responds within one business day.
          </p>
        </div>
      </section>

      {servicesPosition==="before" && serviceTiles}
      <section className="bg-background py-12 md:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="rounded-3xl border border-border bg-white p-8 md:p-10">
              <h2 className="text-2xl font-bold text-primary"><ContentText id="contact.info.title" fallback="Company information" /></h2>
              <ul className="mt-6 space-y-5">
                <ContactRow icon={Phone} label="Phone" value={phone} href={"tel:"+phone.replace(/[^+0-9]/g,"")} />
                <ContactRow icon={Mail} label="Email" value={email} href={"mailto:"+email} />
                <ContactRow icon={MapPin} label={officeLabel} value={officeAddress} href={directions} />
                <ContactRow icon={Clock} label="Business hours" value={hours} />
              </ul>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-border">
              <iframe
                title="Waterman Eastland — Melbourne Office, Ringwood"
                src={mapUrl}
                className="h-80 w-full"
                loading="lazy"
              />
              <a href={directions} target="_blank" rel="noopener noreferrer" className="block border-t border-border bg-white px-5 py-4 font-semibold text-primary underline underline-offset-4">{directionsLabel}</a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
      {servicesPosition!=="before" && serviceTiles}


    </div>
  );
}

function ServiceTile({service}:{service:typeof contactServices[number]}) {
  const configuredUrl=useContentValue(`contact.service.${service.id}.url`,"");
  const href=safeWebUrl(configuredUrl,"");
  const Wrapper=href?"a":"article";
  return <Wrapper href={href||undefined} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
    <div className="aspect-[16/10] overflow-hidden bg-surface"><ContentImage id={`contact.service.${service.id}.image`} fallback={service.image} alt={service.alt} className="h-full w-full object-cover" /></div>
    <div className="flex flex-1 items-center gap-3 bg-primary p-5 text-white"><h2 className="text-xl font-bold leading-snug"><ContentText id={`contact.service.${service.id}.title`} fallback={service.title} /></h2></div>
  </Wrapper>;
}

function ContactRow({ icon: I, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const body = <span className="whitespace-pre-line font-semibold text-primary">{value}</span>;
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
      <h2 className="text-2xl font-bold text-primary"><ContentText id="contact.form.title" fallback="Send a message" /></h2>
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