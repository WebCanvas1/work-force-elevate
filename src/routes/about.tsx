import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Handshake, Compass, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import aboutTeam from "../assets/about-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Your Crew — 22+ Years of Melbourne Labour Hire" },
      { name: "description", content: "Melbourne-based labour hire specialists with 22+ years matching skilled workers to construction, manufacturing and maintenance sites across Victoria." },
      { property: "og:title", content: "About Your Crew" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: ShieldCheck, title: "Reliability", desc: "We provide workers who show up on time and work with integrity." },
  { icon: Award, title: "Expertise", desc: "Our staff is highly trained, with deep understanding of the industries we serve." },
  { icon: Sparkles, title: "Flexibility", desc: "Hiring solutions tailored to your project, timeline and culture." },
];

const milestones = [
  { year: "2003", title: "Founded in Melbourne", desc: "Your Crew begins supplying construction labour across metro Melbourne." },
  { year: "2010", title: "Manufacturing expansion", desc: "New division launched to service Victoria's production and warehousing sector." },
  { year: "2017", title: "Maintenance division", desc: "Dedicated maintenance crews added for facilities and property partners." },
  { year: "2025", title: "1,800+ active workers", desc: "A trusted pool of screened workers deployed across Victoria every week." },
];

export default function About() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-primary pt-32 pb-24 text-white md:pt-40 md:pb-32">
        <div className="absolute inset-0 -z-10">
          <img src={aboutTeam} alt="Your Crew team" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary" />
        </div>
        <div className="container-x max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our Story</p>
          <h1 className="text-balance mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Building strong teams. Empowering Australian businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            For 22+ years, Your Crew has connected companies across construction, manufacturing and
            maintenance with skilled workers who fit their environment and culture.
          </p>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Mission & Vision</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
              More than staffing — lasting workforce solutions.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              At Your Crew, we believe in more than just staffing — we create lasting workforce
              solutions. Our values guide everything we do, ensuring we deliver skilled, reliable
              professionals who seamlessly integrate into your team and contribute to your success.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Our Melbourne-based team is nimble, responsive and just a phone call away. We come to
              you, listen to your needs and find the right people for your environment and culture.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["22+", "Years experience"],
              ["750+", "Projects delivered"],
              ["3,200+", "Workers placed"],
              ["1,800+", "Active workers"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-border bg-background p-6">
                <p className="text-3xl font-extrabold text-primary">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our Values</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
              The principles behind every placement.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-border bg-white p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Timeline</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
              22+ years of growth.
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-border bg-background p-8"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-accent">{m.year}</span>
                <h3 className="mt-2 text-xl font-bold text-primary">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Why businesses trust us</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
              We value our people, so they deliver their best for you.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                ["Experienced Team", "Melbourne specialists with 22+ years of staffing success."],
                ["Pre-screened Workers", "Fully vetted with the licences and tickets your site requires."],
                ["Flexible Options", "One-day hire through to ongoing workforce programs."],
                ["Quick & Hassle-free", "24-hour response and a partnership approach."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4 rounded-2xl border border-border bg-white p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                    <HeartHandshake className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-primary">{t}</p>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[Handshake, Compass, Award, ShieldCheck].map((I, i) => (
              <div key={i} className="rounded-3xl border border-border bg-primary p-8 text-white">
                <I className="h-8 w-8 text-accent" />
                <p className="mt-4 text-xs uppercase tracking-widest text-white/60">Pillar {i + 1}</p>
                <p className="mt-1 font-semibold">
                  {["Partnership", "Culture Fit", "Excellence", "Safety"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-white md:py-28">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl">
            Ready to build your dream team?
          </h2>
          <div className="flex gap-3">
            <Link to="/find-staff" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-primary">
              Request staff <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}