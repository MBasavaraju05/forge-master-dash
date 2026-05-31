import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "te";

// Telugu translations keyed by the English source string.
// Components call t("Some English") and get the Telugu when lang === "te".
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
  "English": "ఇంగ్లీష్",
  "Telugu": "తెలుగు",

  // Home hero
  "Established 1998": "1998లో స్థాపించబడింది",
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
  "Ready to start your": "మీ తదుపరి బిల్డ్‌ను",
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
    "మరమ్మత్తులకు వేగవంతమైన టర్నరౌండ్ — డౌన్‌టైమ్ మీకు ఖర్చు అని మాకు తెలుసు.",
  "Modern Equipment": "ఆధునిక పరికరాలు",
  "Industrial-grade welders, cutters, and precision machinery.":
    "పారిశ్రామిక-స్థాయి వెల్డర్లు, కట్టర్లు మరియు ఖచ్చితమైన యంత్రాలు.",
  "Affordable Pricing": "సరసమైన ధర",
  "Transparent quotes. Fair rates for both farmers and industrial clients.":
    "పారదర్శక కోట్‌లు. రైతులు మరియు పారిశ్రామిక క్లయింట్లకు సరసమైన రేట్లు.",
  "Trusted Experience": "విశ్వసనీయ అనుభవం",
  "25+ years serving the region. Hundreds of repeat customers.":
    "25+ సంవత్సరాలుగా ప్రాంతానికి సేవలు. వందలాది రిపీట్ కస్టమర్లు.",

  // Pages titles
  "Our Services": "మా సేవలు",
  "Our Works": "మా పనులు",
  "Completed Projects": "పూర్తైన ప్రాజెక్టులు",
  "About Us": "మా గురించి",

  // Empty states
  "No images yet. Add some from the admin dashboard.":
    "ఇంకా చిత్రాలు లేవు. అడ్మిన్ డాష్‌బోర్డ్ నుండి కొన్ని జోడించండి.",
  "No projects yet. Add some from the admin dashboard.":
    "ఇంకా ప్రాజెక్టులు లేవు. అడ్మిన్ డాష్‌బోర్డ్ నుండి కొన్ని జోడించండి.",
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
  "Workshop": "వర్క్‌షాప్",
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
  "Sign in to manage the website.": "వెబ్‌సైట్‌ను నిర్వహించడానికి సైన్ ఇన్ చేయండి.",
  "Create your admin account (the first signup is automatically promoted to admin).":
    "మీ అడ్మిన్ ఖాతాను సృష్టించండి (మొదటి సైన్అప్ స్వయంచాలకంగా అడ్మిన్‌గా ప్రమోట్ అవుతుంది).",
  "Sign In": "సైన్ ఇన్",
  "Create Account": "ఖాతాను సృష్టించండి",
  "Need to create an admin account?": "అడ్మిన్ ఖాతా సృష్టించాలా?",
  "Already have an account? Sign in": "ఇప్పటికే ఖాతా ఉందా? సైన్ ఇన్ చేయండి",
  "Access Denied": "ప్రవేశం నిరాకరించబడింది",
  "This account is not an admin.": "ఈ ఖాతా అడ్మిన్ కాదు.",
  "Sign Out": "సైన్ అవుట్",
  "Loading…": "లోడ్ అవుతోంది…",
  "Admin Dashboard": "అడ్మిన్ డాష్‌బోర్డ్",
  "Welcome": "స్వాగతం",
  "← Back to site": "← సైట్‌కి తిరిగి",
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
