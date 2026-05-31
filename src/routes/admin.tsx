import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Image, Video, X, Plus, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { fetchGallery, GALLERY_CATEGORIES } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Parameshwara Engineering Works" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { t } = useI18n();
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user?.id) { setIsAdmin(null); return; }
    supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. If email confirmation is required, check your inbox.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return toast.error(error.message);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  if (!session) {
    return (
      <SiteLayout>
        <section className="min-h-[80vh] flex items-center justify-center px-6 py-20">
          <Reveal>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-3d p-10 w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-bold text-steel-900">{t("Admin Portal")}</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-steel-400 font-medium mt-1">Parameshwara Engineering Works • Est. 1984</p>
                <p className="text-steel-500 mt-3 text-sm">
                  {mode === "signin" ? t("Sign in to manage the website.") : t("Create your admin account (first signup = admin).")}
                </p>
              </div>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-1.5">{t("Email")}</label>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                    className="w-full bg-steel-50 border border-steel-200 text-steel-900 placeholder:text-steel-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-spark/30 focus:border-spark transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-1.5">Password</label>
                  <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" minLength={6}
                    className="w-full bg-steel-50 border border-steel-200 text-steel-900 placeholder:text-steel-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-spark/30 focus:border-spark transition-all" />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={busy}
                  className="w-full bg-gradient-to-r from-spark to-orange-500 text-white py-3.5 font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-spark/20 disabled:opacity-50 text-sm">
                  {busy ? "…" : mode === "signin" ? t("Sign In") : t("Create Account")}
                </motion.button>
              </form>
              <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-6 text-sm text-steel-500 hover:text-spark transition-colors w-full text-center">
                {mode === "signin" ? t("Need to create an admin account?") : t("Already have an account? Sign in")}
              </button>
            </motion.div>
          </Reveal>
        </section>
      </SiteLayout>
    );
  }

  if (isAdmin === false) {
    return (
      <SiteLayout>
        <section className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="card-3d p-10 text-center max-w-md">
            <h1 className="text-3xl font-display font-bold text-steel-900 mb-4">{t("Access Denied")}</h1>
            <p className="text-steel-500 mb-6">{t("This account is not an admin.")}</p>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={signOut}
              className="bg-steel-900 text-white px-6 py-3 font-bold uppercase text-sm tracking-widest rounded-xl">{t("Sign Out")}</motion.button>
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (isAdmin === null) {
    return <SiteLayout><div className="py-32 text-center text-steel-500">{t("Loading…")}</div></SiteLayout>;
  }

  return (
    <SiteLayout>
      <section className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold text-steel-900">{t("Admin Dashboard")}</h1>
            <p className="text-steel-500 text-sm mt-1">{session.user.email}</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={signOut}
            className="text-sm font-bold uppercase tracking-widest border border-steel-200 px-4 py-2 rounded-xl text-steel-600 hover:border-spark hover:text-spark transition-all">
            {t("Sign Out")}
          </motion.button>
        </div>
        <GalleryManager />
        <Link to="/" className="inline-block mt-12 text-sm font-bold uppercase tracking-widest text-spark hover:text-orange-600 transition-colors">
          {t("← Back to site")}
        </Link>
      </section>
    </SiteLayout>
  );
}

// ─── Gallery Manager ─────────────────────────────────────────────────────────

function GalleryManager() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("welding");
  const [showUpload, setShowUpload] = useState(false);

  const { data: items = [], isLoading } = useQuery({ queryKey: ["gallery", "all"], queryFn: () => fetchGallery("all") });

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const files = fileRef.current?.files;
    if (!files || files.length === 0) { toast.error("Select at least one file"); return; }

    setUploading(true);
    let uploaded = 0;

    for (const file of Array.from(files)) {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      if (!isVideo && !isImage) { toast.error(`${file.name} is not supported`); continue; }

      const ext = file.name.split(".").pop();
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadErr } = await supabase.storage.from("site-media").upload(path, file);
      if (uploadErr) { toast.error(`Upload failed: ${uploadErr.message}`); continue; }

      const { data: urlData } = supabase.storage.from("site-media").getPublicUrl(path);

      const { error: dbErr } = await supabase.from("gallery_images").insert({
        title: title || file.name.replace(/\.[^.]+$/, ""),
        description: description || null,
        category,
        image_url: urlData.publicUrl,
        storage_path: path,
      });
      if (dbErr) { toast.error(dbErr.message); continue; }
      uploaded++;
    }

    setUploading(false);
    if (uploaded > 0) {
      toast.success(`${uploaded} file(s) uploaded!`);
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      setTitle("");
      setDescription("");
      setShowUpload(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleDelete(id: string, storagePath: string | null) {
    if (!confirm("Delete this item?")) return;
    if (storagePath) await supabase.storage.from("site-media").remove([storagePath]);
    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    queryClient.invalidateQueries({ queryKey: ["gallery"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-steel-900">📸 {t("Gallery Manager")}</h2>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowUpload(!showUpload)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-spark to-orange-500 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-spark/20">
          {showUpload ? <X size={14} /> : <Plus size={14} />}
          {showUpload ? "Close" : "Upload Media"}
        </motion.button>
      </div>

      <AnimatePresence>
        {showUpload && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            onSubmit={handleUpload} className="card-3d p-6 mb-8 overflow-hidden">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-steel-700 mb-1.5">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Steel Gate Project"
                  className="w-full bg-steel-50 border border-steel-200 text-steel-900 placeholder:text-steel-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-spark/30 focus:border-spark transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-steel-700 mb-1.5">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-steel-50 border border-steel-200 text-steel-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-spark/30 focus:border-spark transition-all">
                  {GALLERY_CATEGORIES.filter(c => c !== "all").map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-steel-700 mb-1.5">Description (optional)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of this work…" rows={2}
                className="w-full bg-steel-50 border border-steel-200 text-steel-900 placeholder:text-steel-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-spark/30 focus:border-spark transition-all resize-none" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-steel-700 mb-1.5">Files (images & videos)</label>
              <input ref={fileRef} type="file" multiple accept="image/*,video/*"
                className="w-full bg-steel-50 border-2 border-dashed border-steel-300 text-steel-900 rounded-xl px-4 py-8 text-sm text-center cursor-pointer hover:border-spark transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-spark/10 file:text-spark" />
              <p className="text-xs text-steel-400 mt-1.5">JPG, PNG, WebP, MP4, MOV, WebM. Multiple files allowed.</p>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={uploading} type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-spark to-orange-500 text-white px-6 py-3 font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-spark/20 disabled:opacity-50 text-sm">
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {uploading ? "Uploading…" : "Upload Files"}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="py-16 text-center text-steel-500">Loading gallery…</div>
      ) : items.length === 0 ? (
        <div className="card-3d p-12 text-center">
          <Image size={48} className="text-steel-300 mx-auto mb-4" />
          <p className="text-steel-500">No media uploaded yet. Click "Upload Media" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const isVideo = !!item.image_url.match(/\.(mp4|mov|webm|avi)$/i);
            return (
              <motion.div key={item.id} whileHover={{ y: -4, scale: 1.02 }} className="card-3d overflow-hidden group relative">
                {isVideo ? (
                  <video src={item.image_url} className="w-full aspect-square object-cover" muted preload="metadata" />
                ) : (
                  <img src={item.image_url} alt={item.title ?? ""} className="w-full aspect-square object-cover" loading="lazy" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-steel-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      {item.title && <p className="text-white text-xs font-bold truncate">{item.title}</p>}
                      <p className="text-white/60 text-[10px]">{item.category}</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(item.id, item.storage_path)}
                      className="size-8 bg-red-500/90 rounded-lg grid place-items-center text-white hover:bg-red-600 transition-colors">
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
