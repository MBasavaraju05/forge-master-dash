import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { fetchServices } from "@/lib/cms";
import * as Icons from "lucide-react";

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
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  return (
    <SiteLayout>
      <section className="bg-steel-900 text-white py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-4">Our Services</h1>
          <div className="w-20 h-2 bg-spark" />
        </div>
      </section>
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-steel-200 border border-steel-200">
          {services.map((s, i) => {
            const Icon = (Icons as any)[s.icon ?? "Wrench"] ?? Icons.Wrench;
            return (
              <Reveal key={s.id} delay={i * 0.04} className="group bg-background p-10 hover:bg-steel-900 transition-colors">
                <div className="size-12 bg-spark/10 group-hover:bg-spark grid place-items-center mb-6 transition-colors">
                  <Icon size={22} className="text-steel-900" />
                </div>
                <h2 className="text-xl font-display font-bold uppercase mb-3 group-hover:text-white">{s.name}</h2>
                <p className="text-steel-500 group-hover:text-steel-400 text-sm">{s.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
