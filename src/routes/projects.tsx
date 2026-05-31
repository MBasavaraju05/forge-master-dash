import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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
  const { data: projects = [] } = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
  return (
    <SiteLayout>
      <section className="bg-steel-900 text-white py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-4">Completed Projects</h1>
          <div className="w-20 h-2 bg-spark" />
        </div>
      </section>
      <section className="container mx-auto px-6 py-20">
        {projects.length === 0 ? (
          <p className="text-center text-steel-500 py-24">No projects yet. Add some from the admin dashboard.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05} className="bg-white border border-steel-200 overflow-hidden group">
                {p.image_url && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image_url} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-spark">{p.category}</span>
                  <h2 className="text-xl font-display font-bold uppercase mt-2 mb-2">{p.name}</h2>
                  {p.description && <p className="text-steel-500 text-sm mb-4">{p.description}</p>}
                  {p.completion_date && (
                    <p className="text-xs text-steel-400">Completed {new Date(p.completion_date).toLocaleDateString()}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
