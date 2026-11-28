import { useRequestDestination, useSetting } from "../../lib/editable-settings";
import { Link } from "@tanstack/react-router";
import logo from "../../assets/your-crew-logo.png";
import { useContentValue } from "../../lib/site-content";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/find-staff", label: "Find Staff" },
  { to: "/find-a-job", label: "Find a Job" },
  { to: "/news", label: "News" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navigation() {
  const requestTo=useRequestDestination();
  const compactLogo=useSetting("global.logo.size")==="compact";
  const [open, setOpen] = useState(false);
  const logoUrl = useContentValue("global.logo", logo);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-primary/90 shadow-[0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
      <nav className="container-x flex h-24 items-center justify-between gap-4 md:h-28">
        <Link
          to="/"
          aria-label="Your Crew home"
          className={"relative block shrink-0 overflow-hidden transition-transform duration-300 hover:scale-[1.03] "+(compactLogo?"h-[70px] w-[150px] md:h-20 md:w-[170px]":"h-[88px] w-[185px] md:h-[104px] md:w-[220px]")}
        >
          <img
            src={logoUrl}
            alt="Your Crew — Flexible Workforce Specialists"
            className={logoUrl === logo ? "absolute left-1/2 top-1/2 h-auto max-w-none -translate-x-1/2 -translate-y-[45%] "+(compactLogo?"w-[210px] md:w-[240px]":"w-[260px] md:w-[310px]") : "h-full w-full object-contain"}
          />
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="rounded-full px-3 py-2 text-lg font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-accent"
                activeProps={{
                  className: "bg-white/10 text-accent",
                }}
                activeOptions={{ exact: true }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden xl:block">
          <Link
            to={requestTo}
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-lg font-semibold text-primary shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-px hover:bg-accent/90"
          >
            Request Staff
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="grid h-11 w-11 place-items-center rounded-md text-white transition-colors hover:bg-white/10 xl:hidden"
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-primary/95 backdrop-blur-xl xl:hidden"
        >
          <ul className="container-x flex flex-col py-3">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-accent"
                  activeProps={{
                    className: "bg-white/5 text-accent",
                  }}
                  activeOptions={{ exact: true }}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="mt-2">
              <Link
                to={requestTo}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-accent px-5 py-3 text-center text-base font-semibold text-primary transition-colors hover:bg-accent/90"
              >
                Request Staff
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
