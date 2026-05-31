import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Square, Fence, Building2, Hammer, Cog, Tractor, Sun, Wheat, Wrench, Star, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { fetchServices, fetchSetting, fetchTestimonials, type HeroSettings, type StatsSettings } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-welding.jpg";

const HERO_FALLBACK: HeroSettings = {
  heading: "Precision Engineering. Quality Fabrication. Trusted Service.",
  subheading: "Professional Welding, Fabrication, Agricultural Machinery Repair and Engineering Solutions.",
};
const STATS_FALLBACK: StatsSettings = { projects: 1250, customers: 500, years: 25, machines: 800 };

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap, Square, Fence, Building2, Hammer, Cog, Tractor, Sun, Wheat, Wrench,
};

const WHY = [
  { title: "Skilled Workforce", body: "Certified welders and machinists with decades of combined field experience." },
  { title: "Quality Workmanship", body: "Every joint inspected. Every weld engineered for structural integrity." },
  { title: "Fast Service", body: "Quick turnaround for repairs — we know downtime costs you money." },
  { title: "Modern Equipment", body: "Industrial-grade welders, cutters, and precision machinery." },
  { title: "Affordable Pricing", body: "Transparent quotes. Fair rates for both farmers and industrial clients." },
  { title: "Trusted Experience", body: "25+ years serving the region. Hundreds of repeat customers." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parameshwara Engineering Works — Precision Welding & Fabrication" },
      { name: "description", content: "Welding, steel fabrication, gates, railings, and agricultural machinery repair. Industrial-grade engineering services since 1998." },
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
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const { data: testimonials = [] } = useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-steel-900 text-white">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Industrial welding" width={1920} height={1080} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-900 via-steel-900/70 to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">
            <span className="inline-block px-3 py-1 bg-spark text-spark-foreground font-bold text-xs uppercase tracking-widest mb-6">
              Established 1998
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8 uppercase">
              Precision <br /><span className="text-spark">Engineering.</span>
            </h1>
            <p className="text-steel-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              {hero.subheading}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/gallery" className="bg-spark text-spark-foreground px-8 py-4 font-bold uppercase tracking-wider text-base hover:scale-105 transition-transform inline-flex items-center gap-2">
                View Our Work <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="border-2 border-white/20 text-white px-8 py-4 font-bold uppercase tracking-wider text-base hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute right-[-12%] top-1/2 -translate-y-1/2 w-[55%] aspect-square hidden lg:block pointer-events-none">
          <div className="w-full h-full border border-white/5 rounded-full grid place-items-center spin-slow">
            <div className="w-4/5 h-4/5 border border-spark/15 rounded-full grid place-items-center">
              <div className="w-3/5 h-3/5 border border-white/5 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-spark py-10">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: stats.projects, l: "Projects Completed" },
            { v: stats.years, l: "Years Experience" },
            { v: stats.machines, l: "Machines Repaired" },
            { v: stats.customers, l: "Happy Customers" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-4xl md:text-5xl font-display font-bold text-steel-900">
                <Counter to={s.v} />
              </div>
              <div className="text-xs uppercase font-bold text-steel-900/60 tracking-wider mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="py-24 px-6 container mx-auto">
        <Reveal className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4">Core Capabilities</h2>
            <div className="w-20 h-2 bg-spark" />
          </div>
          <p className="text-steel-500 max-w-sm text-sm">Specialized engineering solutions for heavy industry and modern agriculture.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-steel-200 border border-steel-200">
          {services.slice(0, 9).map((s, i) => {
            const Icon = ICONS[s.icon ?? "Wrench"] ?? Wrench;
            return (
              <Reveal key={s.id} delay={i * 0.05} className="group bg-background p-10 hover:bg-steel-900 transition-colors cursor-default">
                <div className="size-12 bg-spark/10 group-hover:bg-spark grid place-items-center mb-6 transition-colors">
                  <Icon size={22} className="text-steel-900" />
                </div>
                <h3 className="text-xl font-display font-bold uppercase mb-3 group-hover:text-white">{s.name}</h3>
                <p className="text-steel-500 group-hover:text-steel-400 text-sm mb-6">{s.description}</p>
                <div className="h-1 w-0 group-hover:w-full bg-spark transition-all duration-500" />
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-10 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-spark transition-colors">
            View all services <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      {/* Why Choose Us */}
      <section className="bg-steel-50 border-y border-steel-200 py-24">
        <div className="container mx-auto px-6">
          <Reveal className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4">Why Choose Us</h2>
            <div className="w-20 h-2 bg-spark" />
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05} className="bg-white border border-steel-200 p-8 hover:border-spark transition-colors">
                <CheckCircle2 className="text-spark mb-4" size={24} />
                <h3 className="text-lg font-display font-bold uppercase mb-2">{w.title}</h3>
                <p className="text-steel-500 text-sm">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24 container mx-auto px-6">
          <Reveal className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4">What Clients Say</h2>
            <div className="w-20 h-2 bg-spark" />
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05} className="bg-steel-50 border border-steel-200 p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                    <Star key={k} size={16} className="fill-spark text-spark" />
                  ))}
                </div>
                <p className="text-steel-600 mb-6 italic">"{t.review}"</p>
                <p className="font-bold uppercase text-sm tracking-wider">— {t.customer_name}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-steel-900 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6">
              Ready to start your <span className="text-spark">next build?</span>
            </h2>
            <p className="text-steel-400 text-lg max-w-2xl mx-auto mb-10">
              Whether it's a custom gate, structural fabrication, or urgent machinery repair — let's talk.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-spark text-spark-foreground px-10 py-5 font-bold uppercase tracking-wider hover:scale-105 transition-transform">
              Request a Quote <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
