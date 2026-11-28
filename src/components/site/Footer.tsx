import { SocialLinks } from "./SocialLinks";
import { contactServices } from "../../lib/contact-services";
import { Link } from "@tanstack/react-router";
import { ContentText } from "../../lib/site-content";
import { FooterContact } from "./FooterContact";
import { HardHat, Phone, Mail, MapPin } from "lucide-react";


export function Footer() {
  return (
    <footer className="bg-primary text-white/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent">
              <HardHat className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="text-lg font-bold"><ContentText id="global.company" fallback="Your Crew" /></span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Labour hire and workforce solutions across Melbourne and Victoria — 22+ years supplying
            skilled construction, manufacturing and maintenance staff.
          </p>
          <div className="mt-5"><SocialLinks /></div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About Us"],
              ["/find-staff", "Find Staff"],
              ["/find-a-job", "Find a Job"],
              ["/news", "News"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {contactServices.map((service) => (
              <li key={service.id}>
                <Link to="/find-staff" className="transition-colors hover:text-white">
                  <ContentText id={`contact.service.${service.id}.title`} fallback={service.title} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <FooterContact kind="phone" />
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <FooterContact kind="email" />
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>Melbourne, Victoria — servicing statewide</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Your Crew Pty Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}