import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-steel-900/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-8 bg-steel-900 grid place-items-center group-hover:bg-spark transition-colors">
            <span className="text-spark group-hover:text-steel-900 font-display font-bold text-xl leading-none">P</span>
          </div>
          <span className="font-display font-bold tracking-tight text-base uppercase hidden sm:block">
            Parameshwara
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="hover:text-spark transition-colors"
              activeProps={{ className: "text-spark" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:inline-flex bg-steel-900 text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-spark hover:text-steel-900 transition-all"
          >
            Get a Quote
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-steel-900/5 bg-background">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-wider py-2"
                activeProps={{ className: "text-spark" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="bg-steel-900 text-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-center mt-2"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
