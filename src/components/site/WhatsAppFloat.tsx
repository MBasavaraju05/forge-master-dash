import { MessageCircle } from "lucide-react";

export function WhatsAppFloat({ number }: { number: string }) {
  if (!number) return null;
  const cleaned = number.replace(/[^0-9]/g, "");
  return (
    <a
      href={`https://wa.me/${cleaned}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 size-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg hover:scale-110 transition-transform"
    >
      <MessageCircle size={26} />
      <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping" />
    </a>
  );
}
