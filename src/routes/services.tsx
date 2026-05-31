import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Zap, Layers, Fence, Building2, Wrench, Cog, Tractor, Sun, Wheat, Settings, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { fetchServices } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";

const FALLBACK_SERVICES = [
  {
    id: "1", name: "Arc Welding", icon: "Zap",
    description: "Expert arc welding for structural steel, pipelines, and heavy-duty industrial joints. Precision welds that meet rigorous quality standards.",
  },
  {
    id: "2", name: "Steel Fabrication", icon: "Layers",
    description: "Custom steel fabrication for commercial and industrial projects — beams, frames, brackets, and structural components built to exact specifications.",
  },
  {
    id: "3", name: "Gates & Railings Manufacturing", icon: "Fence",
    description: "Decorative and security gates, railings, grills, and fencing. Designed for durability and aesthetic appeal for homes and businesses.",
  },
  {
    id: "4", name: "Industrial Structures Fabrication", icon: "Building2",
    description: "Large-scale structural fabrication for warehouses, sheds, factory buildings, and industrial frameworks. Engineered for strength and longevity.",
  },
  {
    id: "5", name: "Custom Metal Works", icon: "Wrench",
    description: "Bespoke metalwork solutions — from custom furniture frames to specialized industrial parts. If you can design it, we can build it.",
  },
  {
    id: "6", name: "Machine Fabrication", icon: "Cog",
    description: "Precision fabrication of machine parts, assemblies, and custom equipment. CNC-quality work with manual craftsmanship expertise.",
  },
  {
    id: "7", name: "Harvest Machine Repair & Servicing", icon: "Tractor",
    description: "Complete repair and maintenance for harvesting machines — engine overhaul, blade sharpening, belt replacement, and seasonal servicing.",
  },
  {
    id: "8", name: "Sunflower Machine Repair & Servicing", icon: "Sun",
    description: "Specialized repair for sunflower processing and harvesting equipment. Quick turnaround to minimize crop season downtime.",
  },
  {
    id: "9", name: "Agricultural Machinery Repair", icon: "Wheat",
    description: "Full-service repair for tractors, tillers, threshers, and all agricultural equipment. Field-ready machines when you need them most.",
  },
  {
    id: "10", name: "General Engineering Works", icon: "Settings",
    description: "Comprehensive engineering services — drilling, cutting, bending, threading, and assembly. Your one-stop workshop for all metal and mechanical needs.",
  },
];

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap, Layers, Fence, Building2, Wrench, Cog, Tractor, Sun, Wheat, Settings,
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Parameshwara Engineering Works" },
      { name: "description", content: "Arc welding, steel fabrication, gates & railings, industrial structures, machine repair, and more." },
      { property: "og:title", content: "Services — Parameshwara Engineering Works" },
      { property: "og:description", content: "Industrial welding and engineering capabilities." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useI18n();
  const { data: dbServices = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const services = dbServices.length > 0 ? dbServices : FALLBACK_SERVICES;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-steel-900 py-32 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-spark/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-orange-500/8 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <span className="text-spark text-xs font-bold uppercase tracking-widest mb-3 block">What We Offer</span>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-4">{t("Our Services")}</h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-spark to-orange-500 rounded-full mb-6" />
            <p className="text-steel-200 text-lg max-w-2xl leading-relaxed">
              {t("From precision arc welding to heavy agricultural machinery repair — we deliver industrial-grade engineering solutions with 25+ years of expertise.")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = ICON_MAP[s.icon ?? "Wrench"] ?? Wrench;
            return (
              <Reveal key={s.id} delay={i * 0.06} direction="scale">
                <motion.div
                  whileHover={{ y: -10, rotateX: 3, rotateY: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="card-3d p-8 group h-full flex flex-col"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    className="size-16 bg-spark/10 rounded-2xl grid place-items-center mb-6 group-hover:bg-gradient-to-br group-hover:from-spark group-hover:to-orange-500 transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-spark/20"
                  >
                    <Icon size={28} className="text-spark group-hover:text-white transition-colors duration-500" />
                  </motion.div>

                  {/* Title */}
                  <h2 className="text-xl font-display font-bold text-steel-900 mb-3 group-hover:text-spark transition-colors duration-300">
                    {t(s.name)}
                  </h2>

                  {/* Description */}
                  <p className="text-steel-500 text-sm leading-relaxed mb-6 flex-1">
                    {t(s.description)}
                  </p>

                  {/* CTA */}
                  <Link to="/contact">
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-spark hover:text-orange-600 transition-colors"
                    >
                      Get a Quote <ArrowRight size={14} />
                    </motion.span>
                  </Link>

                  {/* Bottom accent line */}
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-spark to-orange-500 transition-all duration-700 rounded-full mt-6" />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Workshop Highlights */}
      <section className="bg-steel-50 py-24">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="text-spark text-xs font-bold uppercase tracking-widest mb-3 block">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-steel-900 mb-4">{t("Workshop Highlights")}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-spark to-orange-500 rounded-full mx-auto" />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Welding & Fabrication",
              "Steel Structure Manufacturing",
              "Agricultural Machinery Repair",
              "Harvest Machine Maintenance",
              "Sunflower Machine Maintenance",
              "Custom Engineering Solutions",
              "Precision Metal Work",
              "Heavy-Duty Equipment Repair",
            ].map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="card-3d p-6 text-center group"
                >
                  <div className="size-3 bg-gradient-to-r from-spark to-orange-500 rounded-full mx-auto mb-4 group-hover:scale-150 transition-transform duration-300" />
                  <p className="text-sm font-bold text-steel-800">{t(item)}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-steel-900 mb-4">
              {t("Need a service?")} <span className="gradient-text">{t("Let's talk.")}</span>
            </h2>
            <p className="text-steel-500 max-w-xl mx-auto mb-10 leading-relaxed">
              {t("Get a free quote for any welding, fabrication, or repair work. We respond within 24 hours.")}
            </p>
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-spark to-orange-500 text-white px-10 py-4 font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-spark/20"
              >
                {t("Contact Us Now")} <ArrowRight size={18} />
              </motion.span>
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
