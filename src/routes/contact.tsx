import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { fetchSetting, type ContactSettings } from "@/lib/cms";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

const FALLBACK: ContactSettings = {
  phone: "+91 7416889997", whatsapp: "917416889997",
  email: "matambasavaraju90@gmail.com",
  address: "Near Krishnaveni ITI, Anasuyamma Colony, Undavelly Village, Alampur Taluka, Telangana 509153",
  maps_url: "https://www.google.com/maps/place/Parameshwara+Engineering+Works+Undavelly,+14-34,+Undavelly,+D.Burdipad,+Telangana+509153/data=!4m2!3m1!1s0x3bb5e587404cfebf:0xadaae89eb2961ea4",
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
      <section className="bg-steel-900 py-32 relative overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-spark/10 rounded-full blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <span className="text-spark text-xs font-bold uppercase tracking-widest mb-3 block">Get In Touch</span>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-4">{t("Contact")}</h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-spark to-orange-500 rounded-full" />
          </Reveal>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12">
        <Reveal direction="left">
          <h2 className="text-2xl font-display font-bold text-steel-900 mb-8">{t("Reach Out")}</h2>
          <div className="space-y-4">
            {[
              { href: `tel:${c.phone}`, icon: Phone, label: t("Phone"), value: c.phone },
              { href: `https://wa.me/${c.whatsapp.replace(/\D/g, "")}`, icon: MessageCircle, label: t("WhatsApp"), value: c.whatsapp },
              { href: `mailto:${c.email}`, icon: Mail, label: t("Email"), value: c.email },
              { href: c.maps_url, icon: MapPin, label: t("Workshop"), value: c.address },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ x: 4, scale: 1.01 }}
                className="flex items-start gap-4 card-3d p-5 group"
              >
                <div className="size-11 bg-spark/10 rounded-xl grid place-items-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-spark group-hover:to-orange-500 transition-all duration-500">
                  <item.icon size={18} className="text-spark group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-steel-500 mb-1">{item.label}</div>
                  <div className="font-bold text-steel-900">{item.value}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right">
          <form onSubmit={submit} className="card-3d p-8 space-y-5">
            <h2 className="text-2xl font-display font-bold text-steel-900 mb-2">{t("Send a Message")}</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-spark to-orange-500 rounded-full mb-6" />
            {[
              { key: "name", placeholder: t("Name *"), required: true, type: "text" },
              { key: "email", placeholder: t("Email"), required: false, type: "email" },
              { key: "phone", placeholder: t("Phone"), required: false, type: "text" },
            ].map((field) => (
              <input
                key={field.key}
                required={field.required}
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full bg-steel-50 border border-steel-200 text-steel-900 placeholder:text-steel-400 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-spark/30 focus:border-spark transition-all"
              />
            ))}
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t("How can we help? *")}
              rows={5}
              className="w-full bg-steel-50 border border-steel-200 text-steel-900 placeholder:text-steel-400 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-spark/30 focus:border-spark transition-all resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-gradient-to-r from-spark to-orange-500 text-white py-4 font-bold uppercase tracking-widest rounded-xl inline-flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-spark/20 transition-all"
            >
              <Send size={16} />
              {loading ? t("Sending…") : t("Send Message")}
            </motion.button>
          </form>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
