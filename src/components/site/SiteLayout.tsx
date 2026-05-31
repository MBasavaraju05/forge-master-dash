import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { fetchSetting, type ContactSettings } from "@/lib/cms";

const FALLBACK: ContactSettings = {
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "info@parameshwaraworks.com",
  address: "Industrial Area, Phase II, Hubli, Karnataka, India",
  maps_url: "https://www.google.com/maps?q=Hubli,Karnataka",
};

export function SiteLayout({ children }: { children: ReactNode }) {
  const { data: contact = FALLBACK } = useQuery({
    queryKey: ["settings", "contact"],
    queryFn: () => fetchSetting<ContactSettings>("contact", FALLBACK),
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer contact={contact} />
      <WhatsAppFloat number={contact.whatsapp} />
    </div>
  );
}
