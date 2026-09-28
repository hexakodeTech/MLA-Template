"use client";

import React, { createContext, useContext, useState, useTransition } from "react";
import { Language, LocalizedString } from "@/types";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  getLocalized: (item: LocalizedString | undefined) => string;
  t: (key: string) => string;
}

const translations: Record<string, { en: string; ml: string }> = {
  // Navigation
  navHome: { en: "Home", ml: "ഹോം" },
  navAbout: { en: "About", ml: "പ്രതിനിധിയെക്കുറിച്ച്" },
  navNews: { en: "News & Announcements", ml: "വാർത്തകളും അറിയിപ്പുകളും" },
  navConstituency: { en: "Constituency", ml: "മണ്ഡലം വിവരങ്ങൾ" },
  navActivities: { en: "Activities", ml: "പൊതു പ്രവർത്തനങ്ങൾ" },
  navGallery: { en: "Gallery", ml: "ചിത്രശാല" },
  navContact: { en: "Contact", ml: "ബന്ധപ്പെടുക" },

  // Header & Badges
  prototypeNotice: {
    en: "Official Website Prototype — Prepared by HexaKode for Client Review",
    ml: "ഔദ്യോഗിക വെബ്സൈറ്റ് മാതൃക — ക്ലയന്റ് റിവ്യൂവിനായി ഹെക്സാകോഡ് തയ്യാറാക്കിയത്",
  },
  tagline: {
    en: "Official Representative Portal Concept",
    ml: "ജനപ്രതിനിധി പോർട്ടൽ മാതൃക",
  },
  repTitle: {
    en: "Office of Shri Ramesh Pisharady",
    ml: "ശ്രീ രമേഷ് പിഷാരടിയുടെ ഓഫീസ്",
  },
  sampleContentNotice: {
    en: "Sample Prototype Entry — Awaiting Official Office Verification",
    ml: "മാതൃകാ വിവരം — ഔദ്യോഗിക അംഗീകാരത്തിന് കാത്തിരിക്കുന്നു",
  },

  // Hero
  heroHeadline: {
    en: "A Connected Constituency Starts with Information.",
    ml: "വിവരങ്ങളിലൂടെ സുതാര്യമായ ഒരു ജനസമ്പർക്ക മണ്ഡലം.",
  },
  heroDescription: {
    en: "Find official updates, constituency information and ways to reach the office of Shri Ramesh Pisharady.",
    ml: "ശ്രീ രമേഷ് പിഷാരടിയുടെ ഓഫീസിൽ നിന്നുള്ള ഔദ്യോഗിക അറിയിപ്പുകളും മണ്ഡല വിവരങ്ങളും ലഭ്യമാക്കുക.",
  },
  heroCtaPrimary: {
    en: "About the Representative",
    ml: "പ്രതിനിധിയെക്കുറിച്ച് വായിക്കുക",
  },
  heroCtaSecondary: {
    en: "Contact the Office",
    ml: "ഓഫീസുമായി ബന്ധപ്പെടുക",
  },

  // Welcome section
  welcomeHeading: {
    en: "Welcome to the Official Website",
    ml: "ഔദ്യോഗിക വെബ്സൈറ്റിലേക്ക് സ്വാഗതം",
  },
  welcomeDescription: {
    en: "This website is a central source for official announcements, public information and updates from the office. Explore the latest notices, learn about the constituency and find verified contact information.",
    ml: "ഓഫീസിൽ നിന്നുള്ള ഔദ്യോഗിക വാർത്തകൾ, പൊതു വിവരങ്ങൾ, വികസന അറിയിപ്പുകൾ എന്നിവ പൊതുജനങ്ങളിലെത്തിക്കുന്നതിനുള്ള പോർട്ടൽ.",
  },

  // Common UI
  readMore: { en: "Read More", ml: "കൂടുതൽ വായിക്കുക" },
  viewAll: { en: "View All", ml: "എല്ലാം കാണുക" },
  viewAllUpdates: { en: "View All Updates", ml: "എല്ലാ വാർത്തകളും കാണുക" },
  viewAllActivities: { en: "View All Activities", ml: "എല്ലാ പ്രവർത്തനങ്ങളും കാണുക" },
  viewAllGallery: { en: "Explore Full Gallery", ml: "മുഴുവൻ ചിത്രങ്ങളും കാണുക" },
  verifiedBadge: { en: "Official Verification Pending", ml: "ഓഫീസ് സ്ഥിരീകരണത്തിന് വിധേയം" },
  publishedOn: { en: "Published on", ml: "പ്രസിദ്ധീകരിച്ച തീയതി" },
  location: { en: "Location", ml: "സ്ഥലം" },
  category: { en: "Category", ml: "വിഭാഗം" },
  backToHome: { en: "Back to Home", ml: "തിരികെ ഹോമിലേക്ക്" },
  searchPlaceholder: { en: "Search updates and notices...", ml: "അറിയിപ്പുകൾ തിരയുക..." },
  allCategories: { en: "All Categories", ml: "എല്ലാ വിഭാഗങ്ങളും" },

  // Footer
  copyright: {
    en: "© 2026 Office of Shri Ramesh Pisharady. All rights reserved.",
    ml: "© 2026 ശ്രീ രമേഷ് പിഷാരടിയുടെ ഓഫീസ്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.",
  },
  developerCredit: {
    en: "Website Concept Designed & Developed by HexaKode",
    ml: "വെബ്സൈറ്റ് രൂപകൽപ്പനയും നിർമ്മാണവും: ഹെക്സാകോഡ് (HexaKode)",
  },
  privacyPolicy: { en: "Privacy Policy", ml: "സ്വകാര്യതാ നയം" },
  accessibilityStatement: { en: "Accessibility Statement", ml: "പ്രവേശനക്ഷമത പ്രസ്താവന" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("site_lang");
      if (saved === "en" || saved === "ml") return saved;
    }
    return "en";
  });
  const [, startTransition] = useTransition();

  const handleSetLanguage = (lang: Language) => {
    startTransition(() => {
      setLanguageState(lang);
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("site_lang", lang);
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ml" : "en";
    handleSetLanguage(nextLang);
  };

  const getLocalized = (item: LocalizedString | undefined): string => {
    if (!item) return "";
    if (language === "ml") {
      return item.ml && item.ml.trim() !== "" ? item.ml : item.en;
    }
    return item.en;
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry.en;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        toggleLanguage,
        getLocalized,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
