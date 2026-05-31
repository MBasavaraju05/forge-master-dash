import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppFloat({ number }: { number: string }) {
  if (!number) return null;
  const cleaned = number.replace(/[^0-9]/g, "");
  return (
    <motion.a
      href={`https://wa.me/${cleaned}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 size-14 rounded-2xl bg-[#25D366] text-white grid place-items-center shadow-lg shadow-[#25D366]/30"
    >
      <MessageCircle size={26} />
      <span className="absolute -inset-1 rounded-2xl bg-[#25D366] opacity-30 animate-ping" />
    </motion.a>
  );
}
