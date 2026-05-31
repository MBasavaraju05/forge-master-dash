import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { fetchSetting, type ContactSettings } from "@/lib/cms";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

const FALLBACK: ContactSettings = {
  phone: "+91 98765 43210", whatsapp: "919876543210",
  email: "info@parameshwaraworks.com",
  address: "Industrial Area, Phase II, Hubli, Karnataka, India",
  maps_url: "https://www.google.com/maps?q=Hubli,Karnataka",
};

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Parameshwara Engineering Works" },
      { name: "description", content: "Reach our workshop for welding, fabrication, and machinery repair quotes." },
      { property: "og:title", content: "Contact Us" },
      { property: "og:description", content: "Get in touch for a quote." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const { data: c = FALLBACK } = useQuery({ queryKey: ["settings", "contact"], queryFn: () => fetchSetting("contact", FALLBACK) });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.from("inquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
      type: "contact",
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("Message sent — we'll be in touch shortly."));
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <SiteLayout>
      <section className="bg-steel-900 text-white py-24">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-4">{t("Contact")}</h1>
          <div className="w-20 h-2 bg-spark" />
        </div>
      </section>
      <section className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-display font-bold uppercase mb-8">{t("Reach Out")}</h2>
          <div className="space-y-6">
            <a href={`tel:${c.phone}`} className="flex items-start gap-4 group">
              <div className="size-10 bg-steel-900 text-spark grid place-items-center shrink-0"><Phone size={18} /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-steel-500 mb-1">{t("Phone")}</div>
                <div className="font-bold group-hover:text-spark transition-colors">{c.phone}</div>
              </div>
            </a>
            <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
              <div className="size-10 bg-steel-900 text-spark grid place-items-center shrink-0"><MessageCircle size={18} /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-steel-500 mb-1">{t("WhatsApp")}</div>
                <div className="font-bold group-hover:text-spark transition-colors">{c.whatsapp}</div>
              </div>
            </a>
            <a href={`mailto:${c.email}`} className="flex items-start gap-4 group">
              <div className="size-10 bg-steel-900 text-spark grid place-items-center shrink-0"><Mail size={18} /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-steel-500 mb-1">{t("Email")}</div>
                <div className="font-bold group-hover:text-spark transition-colors">{c.email}</div>
              </div>
            </a>
            <a href={c.maps_url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
              <div className="size-10 bg-steel-900 text-spark grid place-items-center shrink-0"><MapPin size={18} /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-steel-500 mb-1">{t("Workshop")}</div>
                <div className="font-bold group-hover:text-spark transition-colors">{c.address}</div>
              </div>
            </a>
          </div>
        </div>
        <form onSubmit={submit} className="bg-steel-50 border border-steel-200 p-8 space-y-4">
          <h2 className="text-2xl font-display font-bold uppercase mb-6">{t("Send a Message")}</h2>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("Name *")} className="w-full bg-white border border-steel-200 px-4 py-3" />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t("Email")} type="email" className="w-full bg-white border border-steel-200 px-4 py-3" />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={t("Phone")} className="w-full bg-white border border-steel-200 px-4 py-3" />
          <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t("How can we help? *")} rows={5} className="w-full bg-white border border-steel-200 px-4 py-3" />
          <button disabled={loading} className="w-full bg-steel-900 text-white py-4 font-bold uppercase tracking-widest hover:bg-spark hover:text-spark-foreground transition-colors disabled:opacity-50">
            {loading ? t("Sending…") : t("Send Message")}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}
