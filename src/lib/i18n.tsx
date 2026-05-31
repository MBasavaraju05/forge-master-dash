import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "te";

const TE: Record<string, string> = {
  // Header / nav
  "Home": "హోమ్",
  "Services": "సేవలు",
  "Gallery": "గ్యాలరీ",
  "Projects": "ప్రాజెక్టులు",
  "About": "మా గురించి",
  "Contact": "సంప్రదించండి",
  "Get a Quote": "కోట్ పొందండి",
  "Parameshwara": "పరమేశ్వర",
  "Engineering Works": "ఇంజినీరింగ్ వర్క్స్",
  "Since 1984": "1984 నుండి",
  "English": "ఇంగ్లీష్",
  "Telugu": "తెలుగు",

  // Home hero
  "Established 1984": "1984లో స్థాపించబడింది",
  "Established 1998": "1984లో స్థాపించబడింది",
  "Precision": "ఖచ్చితత్వం",
  "Engineering.": "ఇంజినీరింగ్.",
  "Precision Engineering. Quality Fabrication. Trusted Service.":
    "ఖచ్చితమైన ఇంజినీరింగ్. నాణ్యమైన ఫాబ్రికేషన్. విశ్వసనీయ సేవ.",
  "Professional Welding, Fabrication, Agricultural Machinery Repair and Engineering Solutions.":
    "ప్రొఫెషనల్ వెల్డింగ్, ఫాబ్రికేషన్, వ్యవసాయ యంత్రాల మరమ్మత్తు మరియు ఇంజినీరింగ్ పరిష్కారాలు.",
  "View Our Work": "మా పనిని చూడండి",
  "Contact Us": "మమ్మల్ని సంప్రదించండి",

  // Stats
  "Projects Completed": "పూర్తైన ప్రాజెక్టులు",
  "Years Experience": "సంవత్సరాల అనుభవం",
  "Machines Repaired": "మరమ్మత్తు చేయబడిన యంత్రాలు",
  "Happy Customers": "సంతృప్తి చెందిన కస్టమర్లు",

  // Sections
  "Core Capabilities": "ప్రధాన సామర్థ్యాలు",
  "Specialized engineering solutions for heavy industry and modern agriculture.":
    "భారీ పరిశ్రమ మరియు ఆధునిక వ్యవసాయం కోసం ప్రత్యేక ఇంజినీరింగ్ పరిష్కారాలు.",
  "View all services": "అన్ని సేవలు చూడండి",
  "Why Choose Us": "మమ్మల్ని ఎందుకు ఎంచుకోవాలి",
  "What Clients Say": "క్లయింట్లు ఏమి చెబుతున్నారు",
  "Ready to start your": "మీ తదుపరి బిల్డ్ను",
  "next build?": "ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?",
  "Whether it's a custom gate, structural fabrication, or urgent machinery repair — let's talk.":
    "కస్టమ్ గేట్, స్ట్రక్చరల్ ఫాబ్రికేషన్ లేదా అత్యవసర యంత్ర మరమ్మత్తు అయినా — మాట్లాడుదాం.",
  "Request a Quote": "కోట్ అభ్యర్థించండి",

  // Why choose us
  "Skilled Workforce": "నైపుణ్యం కలిగిన శ్రామిక శక్తి",
  "Certified welders and machinists with decades of combined field experience.":
    "దశాబ్దాల ఉమ్మడి ఫీల్డ్ అనుభవంతో సర్టిఫైడ్ వెల్డర్లు మరియు మెషినిస్టులు.",
  "Quality Workmanship": "నాణ్యమైన పని నైపుణ్యం",
  "Every joint inspected. Every weld engineered for structural integrity.":
    "ప్రతి జాయింట్ పరిశీలించబడుతుంది. ప్రతి వెల్డ్ నిర్మాణ సమగ్రత కోసం రూపొందించబడింది.",
  "Fast Service": "వేగవంతమైన సేవ",
  "Quick turnaround for repairs — we know downtime costs you money.":
    "మరమ్మత్తులకు వేగవంతమైన టర్నరౌండ్ — డౌన్టైమ్ మీకు ఖర్చు అని మాకు తెలుసు.",
  "Modern Equipment": "ఆధునిక పరికరాలు",
  "Industrial-grade welders, cutters, and precision machinery.":
    "పారిశ్రామిక-స్థాయి వెల్డర్లు, కట్టర్లు మరియు ఖచ్చితమైన యంత్రాలు.",
  "Affordable Pricing": "సరసమైన ధర",
  "Transparent quotes. Fair rates for both farmers and industrial clients.":
    "పారదర్శక కోట్లు. రైతులు మరియు పారిశ్రామిక క్లయింట్లకు సరసమైన రేట్లు.",
  "Trusted Experience": "విశ్వసనీయ అనుభవం",
  "40+ years serving the region. Hundreds of repeat customers.":
    "40+ సంవత్సరాలుగా ప్రాంతానికి సేవలు. వందలాది రిపీట్ కస్టమర్లు.",
  "25+ years serving the region. Hundreds of repeat customers.":
    "40+ సంవత్సరాలుగా ప్రాంతానికి సేవలు. వందలాది రిపీట్ కస్టమర్లు.",

  // Services
  "Arc Welding": "ఆర్క్ వెల్డింగ్",
  "Steel Fabrication": "స్టీల్ ఫాబ్రికేషన్",
  "Gates & Railings Manufacturing": "గేట్లు & రెయిలింగ్ల తయారీ",
  "Gates & Railings": "గేట్లు & రెయిలింగ్లు",
  "Industrial Structures Fabrication": "పారిశ్రామిక నిర్మాణాల ఫాబ్రికేషన్",
  "Industrial Structures": "పారిశ్రామిక నిర్మాణాలు",
  "Custom Metal Works": "కస్టమ్ మెటల్ వర్క్స్",
  "Machine Fabrication": "మెషిన్ ఫాబ్రికేషన్",
  "Harvest Machine Repair & Servicing": "హార్వెస్ట్ మెషిన్ మరమ్మత్తు & సర్వీసింగ్",
  "Harvest Machine Repair": "హార్వెస్ట్ మెషిన్ మరమ్మత్తు",
  "Sunflower Machine Repair & Servicing": "సన్‌ఫ్లవర్ మెషిన్ మరమ్మత్తు & సర్వీసింగ్",
  "Sunflower Machine Repair": "సన్‌ఫ్లవర్ మెషిన్ మరమ్మత్తు",
  "Agricultural Machinery Repair": "వ్యవసాయ యంత్రాల మరమ్మత్తు",
  "Agricultural Machinery": "వ్యవసాయ యంత్రాలు",
  "General Engineering Works": "జనరల్ ఇంజినీరింగ్ వర్క్స్",

  // Service descriptions
  "Expert MIG, TIG, and stick welding for structural steel, pipelines, and heavy-duty industrial joints. Precision welds that meet rigorous quality standards.":
    "స్ట్రక్చరల్ స్టీల్, పైప్‌లైన్లు మరియు హెవీ-డ్యూటీ పారిశ్రామిక జాయింట్ల కోసం నిపుణ MIG, TIG మరియు స్టిక్ వెల్డింగ్.",
  "Expert MIG, TIG, and stick welding for structural steel, pipelines, and heavy-duty industrial joints.":
    "స్ట్రక్చరల్ స్టీల్, పైప్‌లైన్లు మరియు హెవీ-డ్యూటీ పారిశ్రామిక జాయింట్ల కోసం నిపుణ MIG, TIG మరియు స్టిక్ వెల్డింగ్.",
  "Custom steel fabrication for commercial and industrial projects — beams, frames, brackets, and structural components built to exact specifications.":
    "వాణిజ్య మరియు పారిశ్రామిక ప్రాజెక్టుల కోసం కస్టమ్ స్టీల్ ఫాబ్రికేషన్ — బీమ్లు, ఫ్రేమ్లు, బ్రాకెట్లు.",
  "Custom steel fabrication for commercial and industrial projects — beams, frames, and structural components.":
    "వాణిజ్య మరియు పారిశ్రామిక ప్రాజెక్టుల కోసం కస్టమ్ స్టీల్ ఫాబ్రికేషన్ — బీమ్లు, ఫ్రేమ్లు.",
  "Decorative and security gates, railings, grills, and fencing. Designed for durability and aesthetic appeal for homes and businesses.":
    "అలంకార మరియు భద్రతా గేట్లు, రెయిలింగ్లు, గ్రిల్లు మరియు ఫెన్సింగ్. ఇళ్ళు మరియు వ్యాపారాల కోసం.",
  "Decorative and security gates, railings, grills, and fencing for homes and businesses.":
    "ఇళ్ళు మరియు వ్యాపారాల కోసం అలంకార మరియు భద్రతా గేట్లు, రెయిలింగ్లు.",
  "Large-scale structural fabrication for warehouses, sheds, factory buildings, and industrial frameworks. Engineered for strength and longevity.":
    "గోదాములు, షెడ్లు, ఫ్యాక్టరీ భవనాలు కోసం పెద్ద-స్థాయి నిర్మాణ ఫాబ్రికేషన్.",
  "Large-scale structural fabrication for warehouses, sheds, and factory buildings.":
    "గోదాములు, షెడ్లు, ఫ్యాక్టరీ భవనాలు కోసం పెద్ద-స్థాయి నిర్మాణ ఫాబ్రికేషన్.",
  "Bespoke metalwork solutions — from custom furniture frames to specialized industrial parts. If you can design it, we can build it.":
    "కస్టమ్ ఫర్నిచర్ ఫ్రేమ్ల నుండి ప్రత్యేక పారిశ్రామిక భాగాల వరకు — మీరు డిజైన్ చేస్తే, మేము నిర్మిస్తాము.",
  "Bespoke metalwork solutions — from custom furniture frames to specialized industrial parts.":
    "కస్టమ్ ఫర్నిచర్ ఫ్రేమ్ల నుండి ప్రత్యేక పారిశ్రామిక భాగాల వరకు.",
  "Precision fabrication of machine parts, assemblies, and custom equipment. CNC-quality work with manual craftsmanship expertise.":
    "మెషిన్ భాగాలు, అసెంబ్లీలు మరియు కస్టమ్ పరికరాల ఖచ్చితమైన ఫాబ్రికేషన్.",
  "Precision fabrication of machine parts, assemblies, and custom equipment.":
    "మెషిన్ భాగాలు, అసెంబ్లీలు మరియు కస్టమ్ పరికరాల ఖచ్చితమైన ఫాబ్రికేషన్.",
  "Complete repair and maintenance for harvesting machines — engine overhaul, blade sharpening, belt replacement, and seasonal servicing.":
    "హార్వెస్టింగ్ మెషీన్ల పూర్తి మరమ్మత్తు — ఇంజిన్ ఓవర్హాల్, బ్లేడ్ షార్పెనింగ్, సీజనల్ సర్వీసింగ్.",
  "Complete repair and maintenance for harvesting machines — engine overhaul and seasonal servicing.":
    "హార్వెస్టింగ్ మెషీన్ల పూర్తి మరమ్మత్తు — ఇంజిన్ ఓవర్హాల్ మరియు సీజనల్ సర్వీసింగ్.",
  "Specialized repair for sunflower processing and harvesting equipment. Quick turnaround to minimize crop season downtime.":
    "సన్‌ఫ్లవర్ ప్రాసెసింగ్ మరియు హార్వెస్టింగ్ పరికరాల ప్రత్యేక మరమ్మత్తు.",
  "Specialized repair for sunflower processing and harvesting equipment.":
    "సన్‌ఫ్లవర్ ప్రాసెసింగ్ మరియు హార్వెస్టింగ్ పరికరాల ప్రత్యేక మరమ్మత్తు.",
  "Full-service repair for tractors, tillers, threshers, and all agricultural equipment. Field-ready machines when you need them most.":
    "ట్రాక్టర్లు, టిల్లర్లు, థ్రెషర్లు మరియు అన్ని వ్యవసాయ పరికరాల పూర్తి-సేవ మరమ్మత్తు.",
  "Full-service repair for tractors, tillers, threshers, and all agricultural equipment.":
    "ట్రాక్టర్లు, టిల్లర్లు, థ్రెషర్లు మరియు అన్ని వ్యవసాయ పరికరాల పూర్తి-సేవ మరమ్మత్తు.",
  "Comprehensive engineering services — drilling, cutting, bending, threading, and assembly. Your one-stop workshop for all metal and mechanical needs.":
    "సమగ్ర ఇంజినీరింగ్ సేవలు — డ్రిల్లింగ్, కటింగ్, బెండింగ్, థ్రెడింగ్ మరియు అసెంబ్లీ.",

  // Services page extras
  "From precision arc welding to heavy agricultural machinery repair — we deliver industrial-grade engineering solutions with 25+ years of expertise.":
    "ఖచ్చితమైన ఆర్క్ వెల్డింగ్ నుండి భారీ వ్యవసాయ యంత్ర మరమ్మత్తు వరకు — 40+ సంవత్సరాల నైపుణ్యంతో పారిశ్రామిక-స్థాయి ఇంజినీరింగ్ పరిష్కారాలు.",
  "From precision arc welding to heavy agricultural machinery repair — we deliver industrial-grade engineering solutions with 40+ years of expertise.":
    "ఖచ్చితమైన ఆర్క్ వెల్డింగ్ నుండి భారీ వ్యవసాయ యంత్ర మరమ్మత్తు వరకు — 40+ సంవత్సరాల నైపుణ్యంతో పారిశ్రామిక-స్థాయి ఇంజినీరింగ్ పరిష్కారాలు.",
  "Workshop Highlights": "వర్క్‌షాప్ ముఖ్యాంశాలు",
  "Welding & Fabrication": "వెల్డింగ్ & ఫాబ్రికేషన్",
  "Steel Structure Manufacturing": "స్టీల్ స్ట్రక్చర్ తయారీ",

  "Harvest Machine Maintenance": "హార్వెస్ట్ మెషిన్ నిర్వహణ",
  "Sunflower Machine Maintenance": "సన్‌ఫ్లవర్ మెషిన్ నిర్వహణ",
  "Custom Engineering Solutions": "కస్టమ్ ఇంజినీరింగ్ పరిష్కారాలు",
  "Precision Metal Work": "ఖచ్చితమైన మెటల్ వర్క్",
  "Heavy-Duty Equipment Repair": "హెవీ-డ్యూటీ పరికరాల మరమ్మత్తు",
  "Need a service?": "సేవ కావాలా?",
  "Let's talk.": "మాట్లాడుదాం.",
  "Get a free quote for any welding, fabrication, or repair work. We respond within 24 hours.":
    "ఏదైనా వెల్డింగ్, ఫాబ్రికేషన్ లేదా మరమ్మత్తు పనికి ఉచిత కోట్ పొందండి. 24 గంటల్లో స్పందిస్తాము.",
  "Contact Us Now": "ఇప్పుడు సంప్రదించండి",

  // Gallery
  "Browse our completed projects — welding, fabrication, gates, and machinery work.":
    "మా పూర్తైన ప్రాజెక్టులను బ్రౌజ్ చేయండి — వెల్డింగ్, ఫాబ్రికేషన్, గేట్లు మరియు యంత్ర పని.",
  "No results found.": "ఫలితాలు కనుగొనబడలేదు.",
  "No media yet. Check back soon!": "ఇంకా మీడియా లేదు. త్వరలో తిరిగి చూడండి!",

  // Pages titles
  "Our Services": "మా సేవలు",
  "Our Works": "మా పనులు",
  "Completed Projects": "పూర్తైన ప్రాజెక్టులు",
  "About Us": "మా గురించి",

  // About
  "Parameshwara Engineering Works has been a trusted partner for industrial welding and fabrication since 1984.":
    "పరమేశ్వర ఇంజినీరింగ్ వర్క్స్ 1984 నుండి పారిశ్రామిక వెల్డింగ్ మరియు ఫాబ్రికేషన్ కోసం విశ్వసనీయ భాగస్వామి.",
  "Parameshwara Engineering Works has been a trusted partner for industrial welding and fabrication since 1998.":
    "పరమేశ్వర ఇంజినీరింగ్ వర్క్స్ 1984 నుండి పారిశ్రామిక వెల్డింగ్ మరియు ఫాబ్రికేషన్ కోసం విశ్వసనీయ భాగస్వామి.",
  "Founded in 1984 in a modest workshop, we've grown into a full-service engineering operation.":
    "1984లో ఒక చిన్న వర్క్‌షాప్‌లో స్థాపించబడి, మేము పూర్తి-సేవ ఇంజినీరింగ్ ఆపరేషన్‌గా ఎదిగాము.",
  "Founded in 1998 in a modest workshop, we've grown into a full-service engineering operation.":
    "1984లో ఒక చిన్న వర్క్‌షాప్‌లో స్థాపించబడి, మేము పూర్తి-సేవ ఇంజినీరింగ్ ఆపరేషన్‌గా ఎదిగాము.",
  "Deliver precision-engineered fabrication and reliable repair services.":
    "ఖచ్చితమైన-ఇంజినీర్డ్ ఫాబ్రికేషన్ మరియు నమ్మకమైన మరమ్మత్తు సేవలను అందించడం.",
  "To be the most trusted engineering workshop in the region.":
    "ప్రాంతంలో అత్యంత విశ్వసనీయ ఇంజినీరింగ్ వర్క్‌షాప్‌గా ఉండటం.",
  "Quality. Integrity. Punctuality. Craftsmanship.":
    "నాణ్యత. సమగ్రత. సమయపాలన. నైపుణ్యం.",

  // Empty states
  "No images yet. Add some from the admin dashboard.":
    "ఇంకా చిత్రాలు లేవు. అడ్మిన్ డాష్బోర్డ్ నుండి కొన్ని జోడించండి.",
  "No projects yet. Add some from the admin dashboard.":
    "ఇంకా ప్రాజెక్టులు లేవు. అడ్మిన్ డాష్బోర్డ్ నుండి కొన్ని జోడించండి.",
  "Completed": "పూర్తైనది",

  // About blocks
  "History": "చరిత్ర",
  "Mission": "లక్ష్యం",
  "Vision": "దృష్టి",
  "Values": "విలువలు",

  // Contact
  "Reach Out": "మమ్మల్ని చేరుకోండి",
  "Phone": "ఫోన్",
  "WhatsApp": "వాట్సాప్",
  "Email": "ఇమెయిల్",
  "Workshop": "వర్క్షాప్",
  "Send a Message": "సందేశం పంపండి",
  "Name *": "పేరు *",
  "How can we help? *": "మేము ఎలా సహాయపడగలము? *",
  "Sending…": "పంపుతోంది…",
  "Send Message": "సందేశం పంపండి",
  "Message sent — we'll be in touch shortly.":
    "సందేశం పంపబడింది — మేము త్వరలో సంప్రదిస్తాము.",

  // Footer
  "Visit": "సందర్శించండి",
  "Quality welding, fabrication, and agricultural machinery repair — engineered with precision and built to last.":
    "నాణ్యమైన వెల్డింగ్, ఫాబ్రికేషన్ మరియు వ్యవసాయ యంత్ర మరమ్మత్తు — ఖచ్చితత్వంతో రూపొందించబడింది మరియు ఎక్కువ కాలం మన్నికగా నిర్మించబడింది.",
  "All Rights Reserved.": "అన్ని హక్కులూ ప్రత్యేకించబడ్డాయి.",
  "Admin Portal": "అడ్మిన్ పోర్టల్",

  // Admin
  "Sign in to manage the website.": "వెబ్సైట్ను నిర్వహించడానికి సైన్ ఇన్ చేయండి.",
  "Create your admin account (the first signup is automatically promoted to admin).":
    "మీ అడ్మిన్ ఖాతాను సృష్టించండి (మొదటి సైన్అప్ స్వయంచాలకంగా అడ్మిన్గా ప్రమోట్ అవుతుంది).",
  "Create your admin account (first signup = admin).":
    "మీ అడ్మిన్ ఖాతాను సృష్టించండి (మొదటి సైన్అప్ = అడ్మిన్).",
  "Sign In": "సైన్ ఇన్",
  "Create Account": "ఖాతాను సృష్టించండి",
  "Need to create an admin account?": "అడ్మిన్ ఖాతా సృష్టించాలా?",
  "Already have an account? Sign in": "ఇప్పటికే ఖాతా ఉందా? సైన్ ఇన్ చేయండి",
  "Access Denied": "ప్రవేశం నిరాకరించబడింది",
  "This account is not an admin.": "ఈ ఖాతా అడ్మిన్ కాదు.",
  "Sign Out": "సైన్ అవుట్",
  "Loading…": "లోడ్ అవుతోంది…",
  "Admin Dashboard": "అడ్మిన్ డాష్బోర్డ్",
  "Welcome": "స్వాగతం",
  "← Back to site": "← సైట్కి తిరిగి",
  "Gallery Manager": "గ్యాలరీ మేనేజర్",
  "Our Story": "మా కథ",
  "Our People": "మా జనాలు",
  "The Team Behind The Work": "పని వెనుక ఉన్న జట్టు",
  "40+ years of trust.": "40+ సంవత్సరాల నమ్మకం.",
  "Let's build together.": "కలిసి నిర్మిద్దాం.",
  "Visit our workshop or call us today for a free consultation.": "ఉచిత సంప్రదింపు కోసం ఈరోజు మా వర్క్షాప్ను సందర్శించండి లేదా కాల్ చేయండి.",
};

const DICT: Record<Lang, Record<string, string>> = { en: {}, te: TE };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: string) => string };
const I18nContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "te" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const value = useMemo<Ctx>(() => ({
    lang,
    setLang: (l) => {
      setLangState(l);
      try { localStorage.setItem("lang", l); } catch {}
      if (typeof document !== "undefined") document.documentElement.lang = l;
    },
    t: (s) => (lang === "en" ? s : DICT.te[s] ?? s),
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) return { lang: "en" as Lang, setLang: () => {}, t: (s: string) => s };
  return ctx;
}

export function useT() {
  return useI18n().t;
}
