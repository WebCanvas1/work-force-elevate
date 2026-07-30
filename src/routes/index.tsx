import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  Quote,
  ChevronRight,
} from "lucide-react";

import heroImg from "../assets/hero-construction.jpg";
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
      <FloatingFeatures />
      <Services />
      <WhyUs />
      <Industries />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
      <LatestJobs />
      <ContactStrip />
    </div>
  );
}

function FloatingFeatures() {
  const items = [
    { icon: ShieldCheck, t: "Skilled Workers", d: "Pre-screened tradespeople ready for site." },
    { icon: Zap, t: "Fast Placements", d: "Workers deployed in as little as 24 hours." },
    { icon: MapPin, t: "Australia Wide", d: "Melbourne based, servicing statewide & interstate." },
  ];
  return (
    <section className="relative -mt-16 md:-mt-24 z-10">
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
                <p className="font-bold text-primary">{it.t}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{it.d}</p>
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
            Trusted for 22+ years across Victoria
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 max-w-3xl text-balance text-5xl font-extrabold leading-[1.04] tracking-tight text-primary sm:text-6xl lg:text-7xl"
          >
            Australia&apos;s Trusted{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-accent">Labour Hire</span>
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
            Partner.
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
            src={heroImg}
            alt="Skilled construction workers"
            className="absolute inset-0 h-full w-full rounded-[3rem] object-cover object-center shadow-2xl"
            width={900}
            height={1100}
          />

          <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/50 bg-white/90 p-5 shadow-xl backdrop-blur sm:bottom-8 sm:left-8 sm:right-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                <Zap className="h-5 w-5" />
              </span>

              <div>
                <p className="font-semibold text-primary">Rapid deployment</p>
                <p className="text-sm text-muted-foreground">
                  Workers on site in as little as 24 hours
                </p>
              </div>
            </div>
          </div>
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
    title: "Manufacturing",
    img: manufacturingImg,
    desc: "Keep production moving with experienced factory workers, forklift operators, machine operators and warehouse staff ready when you need them.",
    bullets: ["Machine Operators", "Forklift & Logistics", "Cleaners & Labourers", "Maintenance Technicians"],
  },
  {
    icon: Wrench,
    title: "Maintenance",
    img: maintenanceImg,
    desc: "Reliable maintenance professionals to help keep your properties, facilities and assets safe, functional and well maintained.",
    bullets: ["Handyman Services", "Plumbing & Electrical", "Landscaping & Grounds", "Emergency Repairs"],
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
            Workforce solutions for the industries that build Australia.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-5 text-lg text-muted-foreground">
            We take the stress out of hiring by matching you with pre-screened workers who fit your
            environment and culture.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <h3 className={`relative mt-6 text-xl font-bold ${featured ? "text-primary" : "text-primary"}`}>{s.title}</h3>
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
            Built on reliability, expertise and flexibility.
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

const industries = [
  { icon: HardHat, label: "Construction" },
  { icon: Truck, label: "Civil" },
  { icon: Warehouse, label: "Warehousing" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Wrench, label: "Maintenance" },
  { icon: Store, label: "Commercial" },
  { icon: HomeIcon, label: "Property" },
  { icon: Building2, label: "Infrastructure" },
];

function Industries() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Industries</p>
            <h2 className="text-balance mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
              Trusted across the sectors that keep Victoria moving.
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            From high-rise construction to precision manufacturing, our people arrive ready with the
            tickets, PPE and attitude your site expects.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {industries.map((i, idx) => (
            <motion.div
              key={i.label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: idx * 0.05 }}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white transition-colors group-hover:bg-accent">
                <i.icon className="h-5.5 w-5.5" />
              </span>
              <p className="text-base font-semibold text-primary">{i.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { title: "Tell us your needs", desc: "Reach out and we'll discuss your project, roles and timelines in detail." },
  { title: "We source skilled workers", desc: "We match your requirements, culture and site with the right people from our pool." },
  { title: "Workers are deployed", desc: "Fully inducted, PPE-ready workers arrive on site and get straight to work." },
  { title: "Ongoing support", desc: "We stay close, adjusting the crew as needs change through the life of the project." },
];

function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-24 text-primary md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">How it works</p>
          <h2 className="text-balance mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Four steps to the right crew on your site.
          </h2>
        </div>

        <ol className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-border bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent text-primary shadow-lg shadow-accent/20">
                  {[<HardHat key="a" className="h-6 w-6" />, <Users key="b" className="h-6 w-6" />, <ShieldCheck key="c" className="h-6 w-6" />, <Sparkles key="d" className="h-6 w-6" />][i]}
                </span>
                <span className="text-3xl font-extrabold text-primary/20">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/20 lg:block" />
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const quotes = [
  {
    q: "Your Crew consistently delivers reliable workers who fit our sites straight away. Their response time is unmatched.",
    a: "Site Manager, Tier-2 Builder",
  },
  {
    q: "We ramped up production for a major project in 48 hours thanks to their pool of pre-screened workers.",
    a: "Operations Lead, Manufacturing",
  },
  {
    q: "Their team listens, understands our culture and only sends people who match. A genuine partnership.",
    a: "HR Director, Commercial Fit-out",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);
  const q = quotes[i];
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-white p-10 shadow-sm md:p-16">
          <Quote className="h-10 w-10 text-accent" />
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-2xl font-medium leading-relaxed text-primary md:text-3xl"
          >
            "{q.q}"
          </motion.blockquote>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {q.a}
          </p>
          <div className="mt-8 flex gap-2">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-10 bg-accent" : "w-4 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
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
                Need reliable staff? Request workers today.
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

const jobs = [
  { title: "Formworker — CBD Project", cat: "Construction", loc: "Melbourne CBD", type: "Full time" },
  { title: "Forklift Operator", cat: "Manufacturing", loc: "Dandenong", type: "Ongoing" },
  { title: "General Labourer", cat: "Construction", loc: "Preston", type: "Casual" },
  { title: "Maintenance Technician", cat: "Maintenance", loc: "Laverton", type: "Full time" },
];

function LatestJobs() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Careers</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
              Latest opportunities
            </h2>
          </div>
          <Link
            to="/find-a-job"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent"
          >
            View all jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {jobs.map((j, i) => (
            <motion.div
              key={j.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="group grid gap-4 p-6 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-center"
            >
              <div>
                <p className="text-base font-semibold text-primary transition-colors group-hover:text-accent">{j.title}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{j.cat}</p>
              </div>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" /> {j.loc}
              </p>
              <p className="text-sm text-muted-foreground">{j.type}</p>
              <Link
                to="/find-a-job"
                className="inline-flex w-fit items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent"
              >
                Apply <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
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
            Quick enquiry
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
              <a href="mailto:info@yourcrew.com.au" className="font-semibold text-primary">info@yourcrew.com.au</a>
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
