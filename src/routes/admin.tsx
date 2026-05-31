import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
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
      toast.success("Account created. If email confirmation is required, check your inbox. The first signup becomes admin.");
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
        <section className="container mx-auto px-6 py-20 max-w-md">
          <h1 className="text-4xl font-display font-bold uppercase mb-2">Admin Portal</h1>
          <p className="text-steel-500 mb-8 text-sm">{mode === "signin" ? "Sign in to manage the website." : "Create your admin account (the first signup is automatically promoted to admin)."}</p>
          <form onSubmit={handleAuth} className="space-y-4">
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-white border border-steel-200 px-4 py-3" />
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6 chars)" minLength={6} className="w-full bg-white border border-steel-200 px-4 py-3" />
            <button disabled={busy} className="w-full bg-steel-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-spark hover:text-spark-foreground transition-colors disabled:opacity-50">
              {busy ? "…" : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-4 text-sm text-steel-500 hover:text-spark">
            {mode === "signin" ? "Need to create an admin account?" : "Already have an account? Sign in"}
          </button>
        </section>
      </SiteLayout>
    );
  }

  if (isAdmin === false) {
    return (
      <SiteLayout>
        <section className="container mx-auto px-6 py-20 max-w-md text-center">
          <h1 className="text-3xl font-display font-bold uppercase mb-4">Access Denied</h1>
          <p className="text-steel-500 mb-6">This account is not an admin.</p>
          <button onClick={signOut} className="bg-steel-900 text-white px-6 py-3 font-bold uppercase text-sm tracking-widest">Sign Out</button>
        </section>
      </SiteLayout>
    );
  }

  if (isAdmin === null) {
    return <SiteLayout><div className="py-32 text-center text-steel-500">Loading…</div></SiteLayout>;
  }

  return (
    <SiteLayout>
      <section className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold uppercase">Admin Dashboard</h1>
            <p className="text-steel-500 text-sm mt-2">Signed in as {session.user.email}</p>
          </div>
          <button onClick={signOut} className="text-sm font-bold uppercase tracking-widest border border-steel-200 px-4 py-2 hover:border-steel-900">Sign Out</button>
        </div>

        <div className="bg-steel-50 border border-steel-200 p-8 mb-8">
          <h2 className="text-xl font-display font-bold uppercase mb-3">Welcome 👷</h2>
          <p className="text-steel-600 text-sm leading-relaxed max-w-2xl">
            You're signed in as an admin. The full content management UI (gallery uploads, project CRUD, testimonials, settings)
            is wired into the database and will be added to this dashboard next. In the meantime, all public pages already
            read live data from your backend — adding rows in the backend updates the public site instantly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Gallery Images", desc: "Manage photos shown on /gallery" },
            { label: "Projects", desc: "Showcase completed projects" },
            { label: "Services", desc: "Edit the services list" },
            { label: "Testimonials", desc: "Add customer reviews" },
            { label: "Contact Info", desc: "Update phone, address, WhatsApp" },
            { label: "Hero & About", desc: "Edit homepage and about copy" },
            { label: "Statistics", desc: "Update animated counters" },
            { label: "Inquiries", desc: "View contact form submissions" },
          ].map((c) => (
            <div key={c.label} className="border border-steel-200 p-6">
              <h3 className="font-display font-bold uppercase text-sm mb-2">{c.label}</h3>
              <p className="text-xs text-steel-500">{c.desc}</p>
            </div>
          ))}
        </div>

        <Link to="/" className="inline-block mt-12 text-sm font-bold uppercase tracking-widest hover:text-spark">← Back to site</Link>
      </section>
    </SiteLayout>
  );
}
