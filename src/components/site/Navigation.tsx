import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, HardHat } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/find-staff", label: "Find Staff" },
  { to: "/find-a-job", label: "Find a Job" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navigation({ transparentOnTop = true }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-primary/95 backdrop-blur-lg shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2.5 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent shadow-lg shadow-accent/25">
            <HardHat className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="text-lg font-bold tracking-tight">Your Crew</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-md px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
                activeProps={{ className: "text-white" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/find-staff"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-accent/30 transition-all hover:translate-y-[-1px] hover:bg-accent/90"
          >
            Request Staff
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-md text-white lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-primary lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                to="/find-staff"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-accent px-5 py-3 text-center text-base font-semibold text-primary"
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