import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { fetchGallery, GALLERY_CATEGORIES, type GalleryImage } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Works Gallery — Parameshwara Engineering Works" },
      { name: "description", content: "Photos of completed welding, fabrication, gates, railings, and machinery repair projects." },
      { property: "og:title", content: "Works Gallery" },
      { property: "og:description", content: "See our recent welding and fabrication projects." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [cat, setCat] = useState<string>("all");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const { data: images = [] } = useQuery({ queryKey: ["gallery", cat], queryFn: () => fetchGallery(cat) });

  return (
    <SiteLayout>
      <section className="bg-steel-900 text-white py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-4">Our Works</h1>
          <div className="w-20 h-2 bg-spark" />
        </div>
      </section>
      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {GALLERY_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-colors ${
                cat === c ? "bg-steel-900 text-white border-steel-900" : "border-steel-200 text-steel-500 hover:border-steel-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {images.length === 0 ? (
          <div className="py-24 text-center text-steel-500">
            <p className="text-lg">No images yet. Add some from the admin dashboard.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setLightbox(img)}
                className="mb-4 block w-full overflow-hidden group relative break-inside-avoid"
              >
                <img src={img.image_url} alt={img.title ?? "Gallery image"} loading="lazy" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                {img.title && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-steel-900/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-bold uppercase text-sm tracking-wider">{img.title}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-steel-900/95 grid place-items-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-white p-2" onClick={() => setLightbox(null)}>
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              src={lightbox.image_url} alt={lightbox.title ?? ""}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}
