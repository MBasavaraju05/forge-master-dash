import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { fetchSetting, type ContactSettings } from "@/lib/cms";

const FALLBACK: ContactSettings = {
  phone: "+91 7416889997",
  whatsapp: "917416889997",
  email: "matambasavaraju90@gmail.com",
  address: "Near Krishnaveni ITI, Anasuyamma Colony, Undavelly Village, Alampur Taluka, Telangana 509153",
  maps_url: "https://www.google.com/maps/place/Parameshwara+Engineering+Works+Undavelly,+14-34,+Undavelly,+D.Burdipad,+Telangana+509153/data=!4m2!3m1!1s0x3bb5e587404cfebf:0xadaae89eb2961ea4",
};

export function SiteLayout({ children }: { children: ReactNode }) {
  const { data: contact = FALLBACK } = useQuery({
    queryKey: ["settings", "contact"],
    queryFn: () => fetchSetting<ContactSettings>("contact", FALLBACK),
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer contact={contact} />
      <WhatsAppFloat number={contact.whatsapp} />
    </div>
  );
}
