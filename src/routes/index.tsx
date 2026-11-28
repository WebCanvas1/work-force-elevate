import { contactServices } from "../lib/contact-services";
import officeImg from "../assets/your-crew-recruitment.jpg";
import { ContentVisibility } from "../components/site/ContentVisibility";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  HardHat,
  Factory,
  Wrench,
  Users,
  Zap,
  ShieldCheck,
  Sparkles,
  MapPin,
  Truck,
  Building2,
  Warehouse,
  Store,
  Home as HomeIcon,
  Phone,
  Mail,
  Check,
  ChevronRight,
} from "lucide-react";

import certificationsImg from "../assets/certifications.png";
import heroImg from "../assets/hero-construction.jpg";
import { homeProcessSteps } from "../lib/home-process";
import { ContentImage, ContentText, useContentValue } from "../lib/site-content";
import constructionImg from "../assets/service-construction.jpg";
import manufacturingImg from "../assets/service-manufacturing.jpg";
import maintenanceImg from "../assets/service-maintenance.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Crew — Melbourne Labour Hire & Workforce Solutions" },
      {
        name: "description",
        content:
          "Australia's trusted labour hire partner. Skilled construction, manufacturing and maintenance workers, deployed fast across Melbourne and Victoria.",
      },
      { property: "og:title", content: "Your Crew — Melbourne Labour Hire & Workforce Solutions" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Your Crew",
          description:
            "Labour hire and workforce solutions across Melbourne and Victoria.",
          telephone: "+61451267768",
          areaServed: "Victoria, Australia",
          address: { "@type": "PostalAddress", addressLocality: "Melbourne", addressRegion: "VIC", addressCountry: "AU" },
        }),
      },
    ],
  }),
  component: Index,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Index() {
  return (
    <div>
      <Hero />
      <ContentVisibility id="home.features.visible"><WorkforceFeatures /></ContentVisibility>
      <Services />
      <WhyUs />
      <ContentVisibility id="home.certifications.visible"><Certifications /></ContentVisibility>
      <ContentVisibility id="home.process.visible"><HowItWorks /></ContentVisibility>
      <CTABanner />
      <ContactStrip />
    </div>
  );
}

function WorkforceFeatures() {
  const items = [
    { icon: ShieldCheck, t: "Skilled Workers", d: "Pre-screened tradespeople ready for site." },
    { icon: Zap, t: "Fast Placements", d: "Workers deployed in as little as 24 hours." },
    { icon: MapPin, t: "Australia Wide", d: "Melbourne based, servicing statewide & interstate." },
  ];
  return (
    <section className="bg-surface py-10 md:py-12">
      <div className="container-x">
        <div className="grid gap-5 rounded-3xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(14,45,79,0.35)] ring-1 ring-border sm:grid-cols-3 md:p-6">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-surface"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                <it.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-bold text-primary"><ContentText id={`home.features.${i}.title`} fallback={it.t} /></p>
                <p className="mt-0.5 text-sm text-muted-foreground"><ContentText id={`home.features.${i}.body`} fallback={it.d} /></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f7f3e8] pt-24 text-primary md:pt-28">
      <div className="container-x grid min-h-[720px] gap-12 py-16 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:py-20">
        {/* Left content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <ContentText id="home.hero.badge" fallback="Trusted for 22+ years across Victoria" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 max-w-3xl text-balance text-5xl font-extrabold leading-[1.04] tracking-tight text-primary sm:text-6xl lg:text-7xl"
          >
            <ContentText id="home.hero.lead" fallback="Australia’s Trusted" />{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-accent"><ContentText id="home.hero.emphasis" fallback="Labour Hire" /></span>
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                className="absolute inset-x-0 -bottom-2 h-3 w-full text-accent/45"
              >
                <path
                  d="M2 8 C 80 2, 220 2, 298 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            <ContentText id="home.hero.end" fallback="Partner." />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Your Crew supplies skilled construction, manufacturing and maintenance workers across
            Melbourne and Victoria — screened, reliable, and ready to work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/find-staff"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-accent/90"
            >
              Find Staff
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              to="/find-a-job"
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-all hover:border-accent hover:text-accent"
            >
              Find a Job
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted-foreground"
          >
            {["Fully screened workers", "24-hour response", "Melbourne based", "Victoria wide"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-accent" />
                  {item}
                </div>
              ),
            )}
          </motion.div>
        </div>

        {/* Right-side image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[620px]"
        >
          <div className="absolute inset-6 rounded-[3rem] bg-primary/10" />

          <img
            src={useContentValue("home.hero.image",heroImg)}
            alt="Skilled construction workers"
            className="absolute inset-0 h-full w-full rounded-[3rem] object-cover object-center shadow-2xl"
            width={900}
            height={1100}
          />

        </motion.div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: HardHat,
    title: "Construction Labour Hire",
    img: constructionImg,
    desc: "Qualified labourers, carpenters, formworkers, concreters, machine operators and site support across Melbourne and regional Victoria.",
    bullets: ["Site Managers & Forepersons", "Skilled Tradespersons", "General Labourers", "Site Admin Support"],
  },
  {
    icon: Factory,
    title: "Manufacturing Labour Hire",
    img: manufacturingImg,
    desc: "Keep production moving with experienced factory workers, forklift operators, machine operators and warehouse staff ready when you need them.",
    bullets: ["Machine Operators", "Forklift & Logistics", "Cleaners & Labourers", "Maintenance Technicians"],
  },
  {
    icon: Wrench,
    title: "Property Maintenance Staff",
    img: maintenanceImg,
    desc: "Reliable maintenance professionals to help keep your properties, facilities and assets safe, functional and well maintained.",
    bullets: ["Handyman Services", "Plumbing & Electrical", "Landscaping & Grounds", "Emergency Repairs"],
  },
  {
    icon: Users,
    title: "Office Support Staff",
    img: officeImg,
    desc: "Reliable office and administration support to help keep your business running smoothly.",
    bullets: ["Reception & Customer Support", "Office Administration", "Data Entry", "Accounts & Payroll Support"],
  },
];

function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p {...fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Services
          </motion.p>
          <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="text-balance mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
            <ContentText id="home.services.title" fallback="Workforce solutions for the industries that build Australia." />
          </motion.h2>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-5 text-lg text-muted-foreground">
            We take the stress out of hiring by matching you with pre-screened workers who fit your
            environment and culture.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const featured = i === 1;
            return (
              <motion.article
                key={s.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-[28px] p-8 shadow-sm ring-1 transition-all hover:-translate-y-1 hover:shadow-2xl ${
                  featured
                    ? "bg-accent ring-accent text-primary"
                    : "bg-white ring-border"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-2 -bottom-6 select-none text-[9rem] font-extrabold leading-none tracking-tighter ${
                    featured ? "text-primary/10" : "text-primary/[0.06]"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`relative grid h-14 w-14 place-items-center rounded-2xl ${
                    featured ? "bg-primary text-accent" : "bg-primary/5 text-primary"
                  }`}
                >
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className={`relative mt-6 text-xl font-bold ${featured ? "text-primary" : "text-primary"}`}><ContentText id={`contact.service.${contactServices[i].id}.title`} fallback={s.title} /></h3>
                <p className={`relative mt-3 text-sm leading-relaxed ${featured ? "text-primary/80" : "text-muted-foreground"}`}>{s.desc}</p>
                <ul className="relative mt-5 space-y-2 text-sm">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${featured ? "bg-primary" : "bg-accent"}`} />
                      <span className={featured ? "text-primary/90" : "text-foreground/85"}>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/find-staff"
                  className={`relative mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                    featured
                      ? "bg-primary text-accent hover:bg-primary/90"
                      : "bg-primary/5 text-primary hover:bg-primary hover:text-accent"
                  }`}
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const whys = [
  { icon: Users, title: "Experienced Team", desc: "Melbourne-based specialists with 22+ years matching people to sites." },
  { icon: HardHat, title: "Skilled Workforce", desc: "Pre-screened tradespeople and labourers ready to contribute from day one." },
  { icon: Zap, title: "Rapid Placements", desc: "Workers on site in as little as 24 hours for urgent requests." },
  { icon: Sparkles, title: "Flexible Solutions", desc: "From one-day labour hire to ongoing, tailored workforce programs." },
  { icon: MapPin, title: "National Support", desc: "Melbourne base, Victoria-wide coverage, and interstate on request." },
  { icon: ShieldCheck, title: "Safety Focus", desc: "Full compliance, inductions and licensing — safety is non-negotiable." },
];

function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-white py-24 text-primary md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Why Your Crew</p>
          <h2 className="text-balance mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            <ContentText id="home.why.title" fallback="Built on reliability, expertise and flexibility." />
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We deliver skilled, reliable professionals who seamlessly integrate into your team.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whys.map((w, i) => (
            <motion.div
              key={w.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="group rounded-2xl border border-border bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-primary">
                <w.icon className="h-5.5 w-5.5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-primary">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationImage({index,title,offset}:{index:number;title:string;offset:string}) {
  const image=useContentValue(`home.certification.${index+1}.image`,"");
  return image ? <img src={image} alt={title} loading="lazy" className="h-full w-full object-contain" /> : <img src={certificationsImg} alt={title} loading="lazy" width={1276} height={418} className="absolute max-w-none" style={{width:"332.2917%",height:"108.8542%",top:"-2.34375%",left:offset}} />;
}

function Certifications() {
  const certificates = [
    { title: "Labour Hire Authority certified", offset: "-9.6354%" },
    { title: "Your Crew 2015 Enterprise Agreement for Manufacturing Workers", offset: "-115.8854%" },
    { title: "Your Crew 2024 Enterprise Agreement for On Site Construction Workers", offset: "-222.1354%" },
  ];
  return (
    <section aria-label="Certifications and enterprise agreements" className="bg-surface py-16 md:py-24">
      <div className="container-x">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {certificates.map((certificate,i) => (
            <div key={certificate.title} className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden">
              <CertificationImage index={i} title={certificate.title} offset={certificate.offset} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="bg-white py-20 text-primary md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">How it works</p>
          <h2 id="how-it-works-heading" className="text-balance mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            <ContentText id="home.process.title" fallback="Four steps to the right crew on your site." />
          </h2>
        </div>
        <ol className="mx-auto mt-12 grid max-w-6xl items-stretch gap-8 md:grid-cols-2">
          {homeProcessSteps.map((step, i) => (
            <li key={step.title} className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
              <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                <ContentImage id={`home.process.step.${i + 1}.image`} fallback={step.image} alt={step.alt} className="h-full w-full object-cover" />
                <span aria-hidden="true" className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-accent text-xl font-extrabold text-primary shadow-md">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex-1 p-6 md:p-8">
                <h3 className="text-2xl font-bold leading-snug text-primary"><span className="sr-only">Step {i + 1}: </span><ContentText id={`home.process.step.${i + 1}.title`} fallback={step.title} /></h3>
                <p className="mt-3 leading-relaxed text-muted-foreground"><ContentText id={`home.process.step.${i + 1}.description`} fallback={step.desc} /></p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-white pb-24 md:pb-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-white md:p-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                <ContentText id="home.cta.title" fallback="Need reliable staff? Request workers today." />
              </h2>
              <p className="mt-4 max-w-xl text-white/70">
                Tell us what you need and our Melbourne team will contact you within one business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-primary shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+61451267768"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> 0451 267 768
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Get in touch</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
            <ContentText id="home.contact.title" fallback="Quick enquiry" />
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Send us a quick message and we'll get back to you within one business day.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white"><Phone className="h-4 w-4" /></span>
              <a href="tel:+61451267768" className="font-semibold text-primary">0451 267 768</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white"><Mail className="h-4 w-4" /></span>
              <a href="mailto:sales@yourcrew.com.au" className="font-semibold text-primary">sales@yourcrew.com.au</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white"><MapPin className="h-4 w-4" /></span>
              <span className="font-semibold text-primary">Melbourne, Victoria — servicing statewide</span>
            </li>
          </ul>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Melbourne map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=144.85%2C-37.87%2C145.05%2C-37.76&layer=mapnik"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <QuickForm />
      </div>
    </section>
  );
}

function QuickForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" />
        <Field label="Last name" name="lastName" />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <div className="mt-4">
        <Field label="Message" name="message" as="textarea" />
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent"
      >
        Send message <ArrowRight className="h-4 w-4" />
      </button>
      {sent && (
        <p className="mt-4 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent">
          Thanks — we've received your message and will be in touch within one business day.
        </p>
      )}
    </form>
  );
}

export function Field({
  label,
  name,
  type = "text",
  as = "input",
  required,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea" | "select";
  required?: boolean;
} & Record<string, unknown>) {
  const cls =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea name={name} rows={4} required={required} className={cls} {...(rest as Record<string, unknown>)} />
      ) : as === "select" ? (
        <select name={name} required={required} className={cls} {...(rest as Record<string, unknown>)} />
      ) : (
        <input name={name} type={type} required={required} className={cls} {...(rest as Record<string, unknown>)} />
      )}
    </label>
  );
}
