import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { fetchGallery, GALLERY_CATEGORIES, type GalleryProject } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Works Gallery — Parameshwara Engineering Works" },
      { name: "description", content: "Photos and videos of completed welding, fabrication, gates, railings, and machinery repair projects." },
      { property: "og:title", content: "Works Gallery" },
      { property: "og:description", content: "See our recent welding and fabrication projects." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function isVideo(url: string) {
  return !!url.match(/\.(mp4|mov|webm|avi)$/i);
}

function GalleryPage() {
  const { t } = useI18n();
  const [cat, setCat] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [lightboxProject, setLightboxProject] = useState<GalleryProject | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { data: projects = [] } = useQuery({ queryKey: ["gallery", cat], queryFn: () => fetchGallery(cat) });

  const filtered = useMemo(() => {
    if (!search.trim()) return projects;
    const q = search.toLowerCase();
    return projects.filter(
      (project) =>
        (project.title?.toLowerCase().includes(q)) ||
        (project.description?.toLowerCase().includes(q)) ||
        project.category.toLowerCase().includes(q)
    );
  }, [projects, search]);

  const currentMedia = lightboxProject?.media?.[lightboxIndex];

  const nextMedia = () => {
    if (lightboxProject && lightboxIndex < lightboxProject.media.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevMedia = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-steel-900 py-28 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-spark/10 rounded-full blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">{t("Gallery")}</h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-spark to-orange-500 rounded-full mb-6" />
            <p className="text-steel-200 text-lg max-w-xl">
              {t("Browse our completed projects — welding, fabrication, gates, and machinery work.")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Search */}
      <section className="container mx-auto px-6 py-10">
        <div className="relative max-w-md mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, description..."
            className="w-full bg-steel-50 border border-steel-200 text-steel-900 placeholder:text-steel-400 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-spark/30 focus:border-spark transition-all"
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-steel-500 text-lg">{t("No results found.")}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const firstMedia = project.media?.[0];
              const mediaCount = project.media?.length || 0;
              const hasVideo = project.media?.some(m => isVideo(m.image_url));
              
              return (
                <Reveal key={project.id} delay={i * 0.03} direction="scale">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => { setLightboxProject(project); setLightboxIndex(0); }}
                    className="card-3d overflow-hidden cursor-pointer group h-full flex flex-col"
                  >
                    {/* Media Preview */}
                    {firstMedia && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {isVideo(firstMedia.image_url) ? (
                          <video src={firstMedia.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" muted preload="metadata" playsInline />
                        ) : (
                          <img src={firstMedia.image_url} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        )}

                        {/* Play indicator if first is video */}
                        {isVideo(firstMedia.image_url) && (
                          <div className="absolute inset-0 grid place-items-center">
                            <div className="size-14 bg-white/20 backdrop-blur-sm rounded-full grid place-items-center border border-white/30 group-hover:bg-spark/80 group-hover:border-spark transition-all duration-500">
                              <Play size={20} className="text-white ml-0.5" fill="white" />
                            </div>
                          </div>
                        )}

                        {/* Media count badge */}
                        <div className="absolute top-3 right-3 bg-steel-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                          {mediaCount} {mediaCount === 1 ? "file" : "files"}
                        </div>
                      </div>
                    )}

                    {/* Info */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-steel-900 text-sm mb-1 group-hover:text-spark transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-steel-400 text-xs uppercase tracking-wider mb-2">{project.category}</p>
                      {project.description && (
                        <p className="text-steel-500 text-xs leading-relaxed flex-1">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      {/* Lightbox with carousel */}
      <AnimatePresence>
        {lightboxProject && currentMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-steel-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
            onClick={() => setLightboxProject(null)}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-6 right-6 text-white p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors z-10"
              onClick={() => setLightboxProject(null)}
            >
              <X size={24} />
            </motion.button>

            {/* Media display */}
            <div className="relative max-w-4xl w-full">
              <AnimatePresence mode="wait">
                {isVideo(currentMedia.image_url) ? (
                  <motion.video
                    key={lightboxIndex}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    src={currentMedia.image_url}
                    controls
                    autoPlay
                    className="max-h-[70vh] max-w-full mx-auto rounded-2xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <motion.img
                    key={lightboxIndex}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    src={currentMedia.image_url}
                    alt={lightboxProject.title}
                    className="max-h-[70vh] max-w-full mx-auto object-contain rounded-2xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </AnimatePresence>

              {/* Navigation arrows */}
              {lightboxProject.media.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                    disabled={lightboxIndex === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                    disabled={lightboxIndex === lightboxProject.media.length - 1}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </>
              )}
            </div>

            {/* Counter and info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white font-bold text-xl mb-1">{lightboxProject.title}</p>
              {lightboxProject.description && (
                <p className="text-white/60 text-sm mb-3">{lightboxProject.description}</p>
              )}
              {lightboxProject.media.length > 1 && (
                <p className="text-white/50 text-xs uppercase tracking-wider">
                  {lightboxIndex + 1} / {lightboxProject.media.length}
                </p>
              )}
            </motion.div>

            {/* Thumbnail strip */}
            {lightboxProject.media.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex gap-2 justify-center flex-wrap max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {lightboxProject.media.map((item, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all ${
                      idx === lightboxIndex ? "ring-2 ring-spark" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {isVideo(item.image_url) ? (
                      <>
                        <video src={item.image_url} className="w-full h-full object-cover" muted preload="metadata" />
                        <div className="absolute inset-0 grid place-items-center">
                          <Play size={12} className="text-white ml-0.5" fill="white" />
                        </div>
                      </>
                    ) : (
                      <img src={item.image_url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}
