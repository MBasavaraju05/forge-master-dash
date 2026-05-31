import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Search } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { fetchGallery, GALLERY_CATEGORIES, type GalleryImage } from "@/lib/cms";
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

function isVideo(item: GalleryImage) {
  return !!item.image_url.match(/\.(mp4|mov|webm|avi)$/i);
}

function GalleryPage() {
  const { t } = useI18n();
  const [cat, setCat] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const { data: images = [] } = useQuery({ queryKey: ["gallery", cat], queryFn: () => fetchGallery(cat) });

  const filtered = useMemo(() => {
    if (!search.trim()) return images;
    const q = search.toLowerCase();
    return images.filter(
      (item) =>
        (item.title?.toLowerCase().includes(q)) ||
        (item.description?.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [images, search]);

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

      {/* Search + Filters */}
      <section className="container mx-auto px-6 py-10">
        {/* Search */}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item, i) => {
              const vid = isVideo(item);
              return (
                <Reveal key={item.id} delay={i * 0.03} direction="scale">
                  <motion.div
                    whileHover={{ y: -8, rotateX: 2, rotateY: -1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setLightbox(item)}
                    className="card-3d overflow-hidden cursor-pointer group h-full flex flex-col"
                  >
                    {/* Media */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {vid ? (
                        <video src={item.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" muted preload="metadata" playsInline />
                      ) : (
                        <img src={item.image_url} alt={item.title ?? "Gallery"} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      )}

                      {/* Video play icon */}
                      {vid && (
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="size-14 bg-white/20 backdrop-blur-sm rounded-full grid place-items-center border border-white/30 group-hover:bg-spark/80 group-hover:border-spark transition-all duration-500">
                            <Play size={20} className="text-white ml-0.5" fill="white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5 flex-1 flex flex-col">
                      {item.title && (
                        <h3 className="font-display font-bold text-steel-900 text-sm mb-1 group-hover:text-spark transition-colors">
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p className="text-steel-500 text-xs leading-relaxed flex-1">
                          {item.description}
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-steel-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-6 right-6 text-white p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={24} />
            </motion.button>

            {isVideo(lightbox) ? (
              <motion.video
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={lightbox.image_url}
                controls
                autoPlay
                className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={lightbox.image_url}
                alt={lightbox.title ?? ""}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            )}

            {/* Caption below media */}
            {(lightbox.title || lightbox.description) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                {lightbox.title && <p className="text-white font-bold text-lg">{lightbox.title}</p>}
                {lightbox.description && <p className="text-white/60 text-sm mt-1">{lightbox.description}</p>}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}
