import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, HardHat } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/find-staff", label: "Find Staff" },
  { to: "/find-a-job", label: "Find a Job" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-primary/95 shadow-[0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-lg">
      <nav className="container-x flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2.5 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent shadow-lg shadow-accent/25">
            <HardHat className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>

          <span className="text-lg font-bold tracking-tight">Your Crew</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="rounded-md px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
                activeProps={{ className: "text-white" }}
                activeOptions={{ exact: true }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/find-staff"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-accent/30 transition-all hover:-translate-y-px hover:bg-accent/90"
          >
            Request Staff
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-md text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-primary lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-white"
                  activeProps={{ className: "bg-white/5 text-white" }}
                  activeOptions={{ exact: true }}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="mt-2">
              <Link
                to="/find-staff"
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
