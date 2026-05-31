import { Link } from "@tanstack/react-router";
import type { ContactSettings } from "@/lib/cms";

export function Footer({ contact }: { contact: ContactSettings }) {
  return (
    <footer className="bg-steel-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-8 bg-spark grid place-items-center">
              <span className="text-steel-900 font-display font-bold text-xl leading-none">P</span>
            </div>
            <span className="font-display font-bold tracking-tight text-xl uppercase">
              Parameshwara Engineering
            </span>
          </div>
          <p className="text-steel-400 max-w-md">
            Quality welding, fabrication, and agricultural machinery repair — engineered with precision and built to last.
          </p>
        </div>
        <div>
          <h4 className="font-bold uppercase mb-5 tracking-widest text-spark text-xs">Visit</h4>
          <p className="text-steel-400 text-sm leading-relaxed">{contact.address}</p>
        </div>
        <div>
          <h4 className="font-bold uppercase mb-5 tracking-widest text-spark text-xs">Contact</h4>
          <a href={`tel:${contact.phone}`} className="block text-white font-bold mb-2 hover:text-spark transition-colors">
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="block text-steel-400 text-sm hover:text-white transition-colors">
            {contact.email}
          </a>
        </div>
      </div>
      <div className="container mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-steel-500 text-xs">
          © {new Date().getFullYear()} Parameshwara Engineering Works. All Rights Reserved.
        </p>
        <Link to="/admin" className="text-steel-500 text-xs hover:text-spark transition-colors">
          Admin Portal
        </Link>
      </div>
    </footer>
  );
}
