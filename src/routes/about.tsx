import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Phone, Award, Clock, Shield } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { fetchSetting, type AboutSettings } from "@/lib/cms";
import { useI18n } from "@/lib/i18n";
import sharannayaImg from "@/assets/sharanayyapic.png";
import sureshImg from "@/assets/sureshpic.png";
import rammayaImg from "@/assets/rammaya.jpeg";

const FALLBACK: AboutSettings = {
  intro: "Parameshwara Engineering Works has been a trusted partner for industrial welding and fabrication since 1984.",
  history: "Founded in 1984 in a modest workshop in Undavelly village, we've grown into a full-service engineering operation serving farmers, industries, and businesses across Telangana. What started as a one-man welding shop has evolved into a trusted name with 40+ years of unmatched expertise.",
  mission: "Deliver precision-engineered fabrication and reliable repair services that keep farms running and industries growing.",
  vision: "To be the most trusted engineering workshop in the region — where quality meets affordability.",
  values: "Quality. Integrity. Punctuality. Craftsmanship.",
};

const TEAM_EN = [
  {
    name: "Sharannaya",
    role: "Founder & Master Craftsman",
    phone: "7416889997",
    image: sharannayaImg,
    description: "The heart and soul of Parameshwara Engineering Works. Sharannaya may not hold an engineering degree, but his hands carry 40+ years of wisdom that no textbook can teach. Self-taught and battle-tested, he mastered welding, fabrication, and machinery repair through pure dedication and relentless practice. His precision rivals any certified engineer — clients often say his work speaks louder than any qualification. He built this workshop from nothing in 1984 and turned it into the most trusted name in the region.",
    icon: Award,
  },
  {
    name: "Ramayya",
    role: "Senior Engineer & Trusted Veteran",
    phone: "9542313220",
    image: rammayaImg,
    description: "A pillar of this workshop since day one. Ramayya has been with Parameshwara Engineering Works from the very beginning — over 40 years of dedicated service. His mastery over arc welding, steel fabrication, and heavy machinery repair is legendary. Farmers and factory owners alike trust him with their most critical equipment. Reliable, skilled, and irreplaceable.",
    icon: Shield,
  },
  {
    name: "Suresh",
    role: "Lead Technician & Rising Star",
    phone: "9346551048",
    image: sureshImg,
    description: "The emerging force of the workshop. With 8 years of intensive experience, Suresh brings youthful energy, bold problem-solving, and modern techniques to the team. Specializing in harvest machine repair and custom fabrication, he handles complex jobs with speed and confidence. Strong, dedicated, and rapidly becoming one of the best in the field.",
    icon: Clock,
  },
];

const TEAM_TE = [
  {
    name: "శరణయ్య",
    role: "వ్యవస్థాపకుడు & మాస్టర్ క్రాఫ్ట్స్మన్",
    phone: "7416889997",
    image: sharannayaImg,
    description: "పరమేశ్వర ఇంజినీరింగ్ వర్క్స్ యొక్క హృదయం మరియు ఆత్మ. శరణయ్య ఇంజినీరింగ్ డిగ్రీ లేకపోయినా, ఆయన చేతుల్లో 40+ సంవత్సరాల అనుభవ జ్ఞానం ఉంది — ఏ పుస్తకం నేర్పించలేనిది. స్వయంగా నేర్చుకుని, అంకితభావం మరియు నిరంతర అభ్యాసం ద్వారా వెల్డింగ్, ఫాబ్రికేషన్ మరియు యంత్ర మరమ్మత్తులో నైపుణ్యం సాధించారు. ఆయన ఖచ్చితత్వం ఏ సర్టిఫైడ్ ఇంజినీర్కు తీసిపోదు. 1984లో శూన్యం నుండి ఈ వర్క్షాప్ను నిర్మించి ప్రాంతంలో అత్యంత విశ్వసనీయ పేరుగా మార్చారు.",
    icon: Award,
  },
  {
    name: "రామయ్య",
    role: "సీనియర్ ఇంజినీర్ & విశ్వసనీయ అనుభవి",
    phone: "9542313220",
    image: rammayaImg,
    description: "మొదటి రోజు నుండి ఈ వర్క్షాప్కు స్తంభం. రామయ్య పరమేశ్వర ఇంజినీరింగ్ వర్క్స్తో మొదటి నుండి ఉన్నారు — 40+ సంవత్సరాల అంకిత సేవ. ఆర్క్ వెల్డింగ్, స్టీల్ ఫాబ్రికేషన్ మరియు భారీ యంత్ర మరమ్మత్తులో ఆయన నైపుణ్యం అద్భుతం. రైతులు మరియు ఫ్యాక్టరీ యజమానులు తమ అత్యంత కీలకమైన పరికరాలను ఆయనకు అప్పగిస్తారు. నమ్మదగిన, నైపుణ్యం కలిగిన మరియు భర్తీ చేయలేని వ్యక్తి.",
    icon: Shield,
  },
  {
    name: "సురేష్",
    role: "లీడ్ టెక్నీషియన్ & ఉదయిస్తున్న తార",
    phone: "9346551048",
    image: sureshImg,
    description: "వర్క్షాప్ యొక్క ఉదయిస్తున్న శక్తి. 8 సంవత్సరాల తీవ్రమైన అనుభవంతో, సురేష్ యువ శక్తి, ధైర్యమైన సమస్య-పరిష్కారం మరియు ఆధునిక పద్ధతులను జట్టుకు తీసుకువస్తాడు. హార్వెస్ట్ మెషిన్ మరమ్మత్తు మరియు కస్టమ్ ఫాబ్రికేషన్లో ప్రత్యేకత కలిగి, సంక్లిష్ట పనులను వేగంగా మరియు నమ్మకంగా నిర్వహిస్తాడు. బలమైన, అంకితమైన మరియు రంగంలో అత్యుత్తమంగా మారుతున్నాడు.",
    icon: Clock,
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Parameshwara Engineering Works" },
      { name: "description", content: "Workshop history, mission, vision, and values of Parameshwara Engineering Works. Est. 1984." },
      { property: "og:title", content: "About Parameshwara Engineering Works" },
      { property: "og:description", content: "40+ years of precision engineering and fabrication." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useI18n();
  const { data: about = FALLBACK } = useQuery({ queryKey: ["settings", "about"], queryFn: () => fetchSetting("about", FALLBACK) });
  const TEAM = lang === "te" ? TEAM_TE : TEAM_EN;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-steel-900 py-28 relative overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-spark/8 rounded-full blur-[140px]" />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <span className="text-spark text-xs font-bold uppercase tracking-widest mb-3 block">{t("Our Story")}</span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">{t("About Us")}</h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-spark to-orange-500 rounded-full mb-8" />
            <p className="text-steel-200 text-xl max-w-3xl leading-relaxed">{t(about.intro)}</p>
          </Reveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal className="mb-16">
            <div className="flex items-start gap-6">
              <div className="w-1 bg-gradient-to-b from-spark to-orange-500 rounded-full shrink-0 self-stretch" />
              <div>
                <span className="text-spark text-xs font-bold uppercase tracking-widest">{t("History")}</span>
                <h2 className="font-display text-3xl font-bold text-steel-900 mt-2 mb-4">Our Journey Since 1984</h2>
                <p className="text-steel-600 text-lg leading-relaxed">{t(about.history)}</p>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Reveal delay={0.1} direction="left">
              <div className="border-t-4 border-spark pt-6">
                <span className="text-spark text-xs font-bold uppercase tracking-widest">{t("Mission")}</span>
                <p className="text-steel-700 text-lg leading-relaxed mt-3">{t(about.mission)}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2} direction="right">
              <div className="border-t-4 border-orange-500 pt-6">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">{t("Vision")}</span>
                <p className="text-steel-700 text-lg leading-relaxed mt-3">{t(about.vision)}</p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="bg-steel-50 rounded-2xl p-8 text-center">
              <span className="text-spark text-xs font-bold uppercase tracking-widest">{t("Values")}</span>
              <p className="font-display text-2xl md:text-3xl font-bold text-steel-900 mt-3">{t(about.values)}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-steel-50">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="text-spark text-xs font-bold uppercase tracking-widest mb-3 block">{t("Our People")}</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-steel-900 mb-4">{t("The Team Behind The Work")}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-spark to-orange-500 rounded-full mx-auto" />
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TEAM.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.15} direction="up">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-steel-200/50 border border-steel-100 h-full flex flex-col"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <h3 className="font-display font-bold text-white text-xl">{person.name}</h3>
                      <p className="text-spark text-xs font-bold uppercase tracking-wider">{person.role}</p>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <person.icon size={16} className="text-spark" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-steel-400">{person.role}</span>
                    </div>
                    <p className="text-steel-600 text-sm leading-relaxed flex-1">{person.description}</p>
                    <a
                      href={`tel:+91${person.phone}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-steel-900 hover:text-spark transition-colors"
                    >
                      <Phone size={14} className="text-spark" />
                      +91 {person.phone}
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-steel-900 mb-4">
              {t("40+ years of trust.")} <span className="gradient-text">{t("Let's build together.")}</span>
            </h2>
            <p className="text-steel-500 max-w-lg mx-auto mb-8">
              {t("Visit our workshop or call us today for a free consultation.")}
            </p>
            <a href="tel:+917416889997">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-spark to-orange-500 text-white px-8 py-4 font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-spark/20"
              >
                <Phone size={16} />
                Call Now: +91 7416889997
              </motion.span>
            </a>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
