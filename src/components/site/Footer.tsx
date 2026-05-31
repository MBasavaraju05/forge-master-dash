import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ContactSettings } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";

export function Footer({ contact }: { contact: ContactSettings }) {
  const { t } = useI18n();
  return (
    <footer className="bg-steel-900 text-white pt-24 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold tracking-tight text-lg text-white">
                  Parameshwara Engineering Works
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-steel-400 font-medium">Precision • Quality • Since 1984</span>
              </div>
            </motion.div>
            <p className="text-steel-400 max-w-md leading-relaxed">
              {t("Quality welding, fabrication, and agricultural machinery repair — engineered with precision and built to last.")}
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase mb-5 tracking-widest text-spark text-xs">{t("Visit")}</h4>
            <p className="text-steel-400 text-sm leading-relaxed">{contact.address}</p>
          </div>
          <div>
            <h4 className="font-bold uppercase mb-5 tracking-widest text-spark text-xs">{t("Contact")}</h4>
            <a href={`tel:${contact.phone}`} className="block text-white font-bold mb-2 hover:text-spark transition-colors duration-300">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="block text-steel-400 text-sm hover:text-white transition-colors duration-300">
              {contact.email}
            </a>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-steel-500 text-xs">
            © {new Date().getFullYear()} Parameshwara Engineering Works. {t("All Rights Reserved.")}
          </p>
          <Link to="/admin" className="text-steel-500 text-xs hover:text-spark transition-colors duration-300">
            {t("Admin Portal")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
