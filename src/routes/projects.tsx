import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { fetchProjects } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Completed Projects — Parameshwara Engineering Works" },
      { name: "description", content: "A showcase of completed welding and fabrication projects." },
      { property: "og:title", content: "Completed Projects" },
      { property: "og:description", content: "Recent engineering and fabrication projects delivered." },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t } = useI18n();
  const { data: projects = [] } = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
  return (
    <SiteLayout>
      <section className="bg-steel-900 py-32 relative overflow-hidden">
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-spark/8 rounded-full blur-[140px]" />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <span className="text-spark text-xs font-bold uppercase tracking-widest mb-3 block">Showcase</span>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-4">{t("Completed Projects")}</h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-spark to-orange-500 rounded-full" />
          </Reveal>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        {projects.length === 0 ? (
          <p className="text-center text-steel-500 py-24">{t("No projects yet. Add some from the admin dashboard.")}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06} direction="scale">
                <motion.div
                  whileHover={{ y: -8, rotateX: 2, rotateY: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="card-3d overflow-hidden group h-full"
                >
                  {p.image_url && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={p.image_url} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  )}
                  <div className="p-7">
                    <span className="text-xs font-bold uppercase tracking-widest text-spark">{p.category ? t(p.category) : ""}</span>
                    <h2 className="text-xl font-display font-bold text-steel-900 mt-2 mb-2 group-hover:text-spark transition-colors duration-300">{t(p.name)}</h2>
                    {p.description && <p className="text-steel-500 text-sm leading-relaxed mb-4">{t(p.description)}</p>}
                    {p.completion_date && (
                      <p className="text-xs text-steel-400">{t("Completed")} {new Date(p.completion_date).toLocaleDateString()}</p>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
