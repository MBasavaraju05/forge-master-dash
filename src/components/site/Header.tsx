import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Languages, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const links = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function LangToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLang(lang === "en" ? "te" : "en")}
      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-widest rounded-xl border border-steel-200 text-steel-600 hover:border-spark hover:text-spark transition-all duration-300"
      aria-label={t("Telugu") + " / " + t("English")}
      title={lang === "en" ? "తెలుగు" : "English"}
    >
      <Languages size={14} />
      <span>{lang === "en" ? "తె" : "EN"}</span>
    </motion.button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-steel-200">
      <div className="container mx-auto px-6 h-18 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: -3 }}
            className="relative"
          >
            <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-steel-900">
              {t("Parameshwara")}
            </span>
            <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-spark">
              .
            </span>
          </motion.div>
          <div className="hidden sm:flex flex-col items-start border-l-2 border-spark pl-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-steel-700 leading-tight">{t("Engineering Works")}</span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-spark font-semibold">{t("Since 1984")}</span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-1 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-4 py-2 rounded-xl text-steel-600 hover:bg-spark/10 hover:text-spark transition-all duration-300"
              activeProps={{ className: "text-spark bg-spark/10" }}
            >
              {t(l.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-spark to-orange-500 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-spark/30 hover:scale-105 transition-all duration-300"
          >
            <Sparkles size={12} />
            {t("Get a Quote")}
          </Link>
          <button
            className="md:hidden p-2 rounded-xl hover:bg-steel-100 transition-colors text-steel-900"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-steel-200 overflow-hidden bg-white"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-medium py-3 px-4 rounded-xl text-steel-700 hover:bg-spark/10 hover:text-spark transition-colors"
                    activeProps={{ className: "text-spark bg-spark/10" }}
                  >
                    {t(l.label)}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="bg-gradient-to-r from-spark to-orange-500 text-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-center mt-3 rounded-xl"
              >
                {t("Get a Quote")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
