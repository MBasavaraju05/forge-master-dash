import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Layers, Fence, Building2, Wrench, Cog, Tractor, Sun, Wheat, Settings, Star, CheckCircle2, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { fetchServices, fetchSetting, fetchTestimonials, type HeroSettings, type StatsSettings } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/shop.png";

const HERO_FALLBACK: HeroSettings = {
  heading: "Sharanya's Welding Shop. Expert Craftsmanship. Trusted Expertise.",
  subheading: "40+ Years of Professional Welding, Fabrication, Agricultural Machinery Repair and Engineering Excellence.",
};
const STATS_FALLBACK: StatsSettings = { projects: 2000, customers: 3000, years: 40, machines: 1000 };

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap, Layers, Fence, Building2, Wrench, Cog, Tractor, Sun, Wheat, Settings,
};

const FALLBACK_SERVICES = [
  { id: "1", name: "Arc Welding", icon: "Zap", description: "Expert arc welding for structural steel, pipelines, and heavy-duty industrial joints." },
  { id: "2", name: "Steel Fabrication", icon: "Layers", description: "Custom steel fabrication for commercial and industrial projects — beams, frames, and structural components." },
  { id: "3", name: "Gates & Railings", icon: "Fence", description: "Decorative and security gates, railings, grills, and fencing for homes and businesses." },
  { id: "4", name: "Industrial Structures", icon: "Building2", description: "Large-scale structural fabrication for warehouses, sheds, and factory buildings." },
  { id: "5", name: "Custom Metal Works", icon: "Wrench", description: "Bespoke metalwork solutions — from custom furniture frames to specialized industrial parts." },
  { id: "6", name: "Machine Fabrication", icon: "Cog", description: "Precision fabrication of machine parts, assemblies, and custom equipment." },
  { id: "7", name: "Harvest Machine Repair", icon: "Tractor", description: "Complete repair and maintenance for harvesting machines — engine overhaul and seasonal servicing." },
  { id: "8", name: "Sunflower Machine Repair", icon: "Sun", description: "Specialized repair for sunflower processing and harvesting equipment." },
  { id: "9", name: "Agricultural Machinery", icon: "Wheat", description: "Full-service repair for tractors, tillers, threshers, and all agricultural equipment." },
];

const WHY = [
  { title: "Skilled Workforce", body: "Certified welders and machinists with decades of combined field experience." },
  { title: "Quality Workmanship", body: "Every joint inspected. Every weld engineered for structural integrity." },
  { title: "Fast Service", body: "Quick turnaround for repairs — we know downtime costs you money." },
  { title: "Modern Equipment", body: "Industrial-grade welders, cutters, and precision machinery." },
  { title: "Affordable Pricing", body: "Transparent quotes. Fair rates for both farmers and industrial clients." },
  { title: "Trusted Experience", body: "40+ years serving the region. Hundreds of repeat customers." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parameshwara Engineering Works — Precision Welding & Fabrication" },
      { name: "description", content: "Welding, steel fabrication, gates, railings, and agricultural machinery repair. Industrial-grade engineering services since 1984. Sharannaya — 7416889997." },
      { property: "og:title", content: "Parameshwara Engineering Works" },
      { property: "og:description", content: "Precision welding, fabrication, and agricultural machinery repair." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();
  const { data: hero = HERO_FALLBACK } = useQuery({ queryKey: ["settings", "hero"], queryFn: () => fetchSetting("hero", HERO_FALLBACK) });
  const { data: stats = STATS_FALLBACK } = useQuery({ queryKey: ["settings", "stats"], queryFn: () => fetchSetting("stats", STATS_FALLBACK) });
  const { data: dbServices = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const services = dbServices.length > 0 ? dbServices : FALLBACK_SERVICES;
  const { data: testimonials = [] } = useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-steel-900">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Sharanya's Welding Shop" width={1920} height={1080} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-900 via-steel-900/80 to-steel-900/40" />
        </div>

        <div className="container mx-auto px-6 relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-spark mb-8"
            >
              <Sparkles size={12} />
              {t("Established 1984")}
            </motion.span>

            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-8 text-white">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="block"
              >
                {t("Sharanya's")}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="block text-spark"
              >
                {t("Welding Shop")}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-steel-200 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
            >
              {t(hero.subheading)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/gallery">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-spark to-orange-500 text-white px-8 py-4 font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-spark/30"
                >
                  {t("View Our Work")} <ArrowRight size={18} />
                </motion.span>
              </Link>
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-wider text-sm rounded-xl"
                >
                  {t("Contact Us")}
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative rings */}
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[50%] aspect-square hidden lg:block pointer-events-none opacity-20">
          <div className="w-full h-full border border-white/10 rounded-full grid place-items-center spin-slow">
            <div className="w-4/5 h-4/5 border border-spark/20 rounded-full grid place-items-center">
              <div className="w-3/5 h-3/5 border border-white/5 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16 bg-steel-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: stats.projects, l: "Projects Completed", icon: "🏗️" },
              { v: stats.years, l: "Years Experience", icon: "⏳" },
              { v: stats.machines, l: "Machines Repaired", icon: "⚙️" },
              { v: stats.customers, l: "Happy Customers", icon: "🤝" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="card-3d p-8 text-center"
                >
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="text-4xl md:text-5xl font-display font-bold gradient-text">
                    <Counter to={s.v} />
                  </div>
                  <div className="text-xs uppercase font-bold text-steel-500 tracking-wider mt-2">{t(s.l)}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-20">
            <div>
              <span className="text-spark text-xs font-bold uppercase tracking-widest mb-3 block">What We Do</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-steel-900 mb-4">{t("Core Capabilities")}</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-spark to-orange-500 rounded-full" />
            </div>
            <p className="text-steel-500 max-w-sm text-sm leading-relaxed">{t("Specialized engineering solutions for heavy industry and modern agriculture.")}</p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 9).map((s, i) => {
              const Icon = ICONS[s.icon ?? "Wrench"] ?? Wrench;
              return (
                <Reveal key={s.id} delay={i * 0.06} direction="scale">
                  <motion.div
                    whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="card-3d p-8 group cursor-default h-full"
                  >
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className="size-14 bg-spark/10 rounded-xl grid place-items-center mb-6 group-hover:bg-gradient-to-br group-hover:from-spark group-hover:to-orange-500 transition-all duration-500"
                    >
                      <Icon size={24} className="text-spark group-hover:text-white transition-colors duration-500" />
                    </motion.div>
                    <h3 className="text-xl font-display font-bold text-steel-900 mb-3">{t(s.name)}</h3>
                    <p className="text-steel-500 text-sm leading-relaxed mb-6">{t(s.description)}</p>
                    <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-spark to-orange-500 transition-all duration-700 rounded-full" />
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-14 text-center">
            <Link to="/services">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-spark hover:text-orange-600 transition-colors duration-300"
              >
                {t("View all services")} <ArrowRight size={16} />
              </motion.span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-28 bg-steel-50">
        <div className="container mx-auto px-6">
          <Reveal className="mb-20 text-center">
            <span className="text-spark text-xs font-bold uppercase tracking-widest mb-3 block">Our Advantage</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-steel-900 mb-4">{t("Why Choose Us")}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-spark to-orange-500 rounded-full mx-auto" />
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="card-3d p-8 group"
                >
                  <motion.div whileHover={{ rotate: 10 }}>
                    <CheckCircle2 className="text-spark mb-5" size={28} />
                  </motion.div>
                  <h3 className="text-lg font-display font-bold text-steel-900 mb-3">{t(w.title)}</h3>
                  <p className="text-steel-500 text-sm leading-relaxed">{t(w.body)}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-28">
          <div className="container mx-auto px-6">
            <Reveal className="mb-20 text-center">
              <span className="text-spark text-xs font-bold uppercase tracking-widest mb-3 block">Testimonials</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-steel-900 mb-4">{t("What Clients Say")}</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-spark to-orange-500 rounded-full mx-auto" />
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial, i) => (
                <Reveal key={testimonial.id} delay={i * 0.1} direction="scale">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="card-3d p-8"
                  >
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: testimonial.rating ?? 5 }).map((_, k) => (
                        <Star key={k} size={16} className="fill-spark text-spark" />
                      ))}
                    </div>
                    <p className="text-steel-600 mb-6 italic leading-relaxed">"{testimonial.review}"</p>
                    <p className="font-bold text-sm tracking-wider text-steel-900">— {testimonial.customer_name}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-32 bg-steel-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spark/10 rounded-full blur-[150px]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              {t("Ready to start your")} <br />
              <span className="text-spark">{t("next build?")}</span>
            </h2>
            <p className="text-steel-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              {t("Whether it's a custom gate, structural fabrication, or urgent machinery repair — let's talk.")}
            </p>
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-spark to-orange-500 text-white px-12 py-5 font-bold uppercase tracking-wider text-base rounded-xl shadow-lg shadow-spark/30"
              >
                {t("Request a Quote")} <ArrowRight size={20} />
              </motion.span>
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
