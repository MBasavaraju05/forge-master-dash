import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { fetchSetting, type AboutSettings } from "@/lib/cms";

const FALLBACK: AboutSettings = {
  intro: "Parameshwara Engineering Works has been a trusted partner for industrial welding and fabrication since 1998.",
  history: "Founded in 1998 in a modest workshop, we've grown into a full-service engineering operation.",
  mission: "Deliver precision-engineered fabrication and reliable repair services.",
  vision: "To be the most trusted engineering workshop in the region.",
  values: "Quality. Integrity. Punctuality. Craftsmanship.",
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Parameshwara Engineering Works" },
      { name: "description", content: "Workshop history, mission, vision, and values of Parameshwara Engineering Works." },
      { property: "og:title", content: "About Parameshwara Engineering Works" },
      { property: "og:description", content: "25+ years of precision engineering and fabrication." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data: about = FALLBACK } = useQuery({ queryKey: ["settings", "about"], queryFn: () => fetchSetting("about", FALLBACK) });
  const blocks = [
    { label: "History", body: about.history },
    { label: "Mission", body: about.mission },
    { label: "Vision", body: about.vision },
    { label: "Values", body: about.values },
  ];
  return (
    <SiteLayout>
      <section className="bg-steel-900 text-white py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-4">About Us</h1>
          <div className="w-20 h-2 bg-spark mb-8" />
          <p className="text-steel-400 text-xl max-w-3xl">{about.intro}</p>
        </div>
      </section>
      <section className="container mx-auto px-6 py-20">
        <div className="space-y-12 max-w-4xl">
          {blocks.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.05} className="grid md:grid-cols-[180px_1fr] gap-6 border-b border-steel-200 pb-12">
              <div className="text-xs font-bold uppercase tracking-widest text-spark">{b.label}</div>
              <p className="text-lg text-steel-600 leading-relaxed">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
