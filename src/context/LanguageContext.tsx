"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
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

  // Loading Screen
  loadingTitle: {
    en: "Activities in the Constituency",
    ml: "മണ്ഡലത്തിലെ പ്രവർത്തനങ്ങൾ",
  },
  loadingDescription: {
    en: "Loading updates, public activities and constituency information.",
    ml: "വികസന അറിയിപ്പുകളും പൊതുപ്രവർത്തനങ്ങളും ലഭ്യമാക്കുന്നു.",
  },
  loadingBadge: {
    en: "Official Representative Portal",
    ml: "ഔദ്യോഗിക പ്രതിനിധി പോർട്ടൽ",
  },
  loadingProgress: {
    en: "Loading progress",
    ml: "ലോഡിംഗ് പുരോഗതി",
  },

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

  // 404 Not Found Page
  notFoundTitle: {
    en: "Page Not Found",
    ml: "പേജ് കണ്ടെത്താനായില്ല",
  },
  notFoundNotice: {
    en: "Official Notice",
    ml: "ഔദ്യോഗിക അറിയിപ്പ്",
  },
  notFoundDescription: {
    en: "The page you're looking for may have moved, been removed, or is no longer available. Please verify the web address or navigate using the verified links below.",
    ml: "നിങ്ങൾ തിരയുന്ന വെബ് പേജ് മാറ്റപ്പെടുകയോ നീക്കം ചെയ്യപ്പെടുകയോ ചെയ്തിരിക്കാം, അല്ലെങ്കിൽ ഇപ്പോൾ ലഭ്യമല്ല. ദയവായി വെബ് വിലാസം പരിശോധിക്കുക അല്ലെങ്കിൽ താഴെ നൽകിയിരിക്കുന്ന ലിങ്കുകൾ ഉപയോഗിക്കുക.",
  },
  notFoundReturnHome: {
    en: "Return to Home",
    ml: "ഹോം പേജിലേക്ക് മടങ്ങുക",
  },
  notFoundGoBack: {
    en: "Go Back",
    ml: "മുൻപത്തെ പേജിലേക്ക്",
  },
  notFoundHelpfulHeading: {
    en: "You May Also Want to Visit",
    ml: "പ്രധാന വിഭാഗങ്ങൾ സന്ദർശിക്കുക",
  },
  notFoundHelpfulSubheading: {
    en: "Access verified portals, documented projects, and official secretariat communication channels.",
    ml: "ഔദ്യോഗിക വാർത്തകൾ, മണ്ഡല പദ്ധതികൾ, പൗരസേവനങ്ങൾ എന്നിവ എളുപ്പത്തിൽ കണ്ടെത്തുക.",
  },

  // Empty States: News
  emptyNewsTitle: { en: "No Announcements Found", ml: "അറിയിപ്പുകൾ കണ്ടെത്താനായില്ല" },
  emptyNewsInitialTitle: { en: "No Announcements Published Yet", ml: "അറിയിപ്പുകൾ ഇതുവരെ പ്രസിദ്ധീകരിച്ചിട്ടില്ല" },
  emptyNewsInitialDesc: {
    en: "Official press releases and circulars will be published here upon verification by the representative's office.",
    ml: "ഓഫീസിന്റെ സ്ഥിരീകരണത്തിന് ശേഷം ഔദ്യോഗിക പത്രക്കുറിപ്പുകളും അറിയിപ്പുകളും ഇവിടെ പ്രസിദ്ധീകരിക്കുന്നതാണ്.",
  },
  emptyNewsSearchDesc: {
    en: "No announcements matched your search query.",
    ml: "നിങ്ങൾ തിരഞ്ഞ വാക്കുകളുമായി പൊരുത്തപ്പെടുന്ന അറിയിപ്പുകൾ കണ്ടെത്താനായില്ല.",
  },
  emptyNewsCategoryDesc: {
    en: "No announcements are currently published under this category.",
    ml: "തിരഞ്ഞെടുത്ത വിഭാഗത്തിൽ ഇപ്പോൾ അറിയിപ്പുകൾ ലഭ്യമല്ല.",
  },
  emptyNewsCombinedDesc: {
    en: "No announcements matched your search query in this category.",
    ml: "തിരഞ്ഞെടുത്ത വിഭാഗത്തിൽ ഈ വാക്കുകളുമായി പൊരുത്തപ്പെടുന്ന അറിയിപ്പുകൾ കണ്ടെത്താനായില്ല.",
  },
  emptyNewsReset: { en: "Reset Filters", ml: "ഫിൽട്ടറുകൾ ഒഴിവാക്കുക" },
  emptyNewsClearSearch: { en: "Clear Search", ml: "തിരച്ചിൽ ഒഴിവാക്കുക" },

  // Empty States: Activities
  emptyActivitiesTitle: { en: "No Activities Found", ml: "പ്രവർത്തനങ്ങൾ കണ്ടെത്താനായില്ല" },
  emptyActivitiesInitialTitle: { en: "No Activities Scheduled Yet", ml: "പ്രവർത്തനങ്ങൾ ഇതുവരെ രേഖപ്പെടുത്തിയിട്ടില്ല" },
  emptyActivitiesInitialDesc: {
    en: "Public meetings, on-site inspections, and official visits will be documented here once scheduled.",
    ml: "ഔദ്യോഗിക സന്ദർശനങ്ങളും ജനസമ്പർക്ക പരിപാടികളും തീരുമാനിക്കുന്ന മുറയ്ക്ക് ഇവിടെ പ്രസിദ്ധീകരിക്കും.",
  },
  emptyActivitiesSearchDesc: {
    en: "No activities matched your search query.",
    ml: "നിങ്ങൾ തിരഞ്ഞ വാക്കുകളുമായി പൊരുത്തപ്പെടുന്ന പ്രവർത്തനങ്ങൾ കണ്ടെത്താനായില്ല.",
  },
  emptyActivitiesCategoryDesc: {
    en: "No activities are currently listed under this category.",
    ml: "തിരഞ്ഞെടുത്ത വിഭാഗത്തിൽ ഇപ്പോൾ പ്രവർത്തനങ്ങൾ ലഭ്യമല്ല.",
  },
  emptyActivitiesCombinedDesc: {
    en: "No activities matched your search query in this category.",
    ml: "തിരഞ്ഞെടുത്ത വിഭാഗത്തിൽ ഈ വാക്കുകളുമായി പൊരുത്തപ്പെടുന്ന പ്രവർത്തനങ്ങൾ കണ്ടെത്താനായില്ല.",
  },
  emptyActivitiesReset: { en: "Reset Filter", ml: "ഫിൽട്ടർ മാറ്റുക" },
  emptyActivitiesClearSearch: { en: "Clear Search", ml: "തിരച്ചിൽ ഒഴിവാക്കുക" },

  // Empty States: Gallery
  emptyGalleryTitle: { en: "No Photographs Found", ml: "ചിത്രങ്ങൾ കണ്ടെത്താനായില്ല" },
  emptyGalleryInitialTitle: { en: "Photo Gallery in Preparation", ml: "ചിത്രശേഖരം തയ്യാറാക്കുന്നു" },
  emptyGalleryInitialDesc: {
    en: "Approved photographs documenting public meetings and constituency walkthroughs will be cataloged here.",
    ml: "ഔദ്യോഗിക പരിപാടികളുടെയും സന്ദർശനങ്ങളുടെയും ചിത്രങ്ങൾ ഉടൻ ചേർക്കുന്നതാണ്.",
  },
  emptyGalleryCategoryDesc: {
    en: "No photographs found in the selected album.",
    ml: "തിരഞ്ഞെടുത്ത ആൽബത്തിൽ ചിത്രങ്ങൾ ലഭ്യമല്ല.",
  },
  emptyGalleryReset: { en: "Show All Photos", ml: "എല്ലാ ചിത്രങ്ങളും കാണുക" },

  // Empty States: Projects
  emptyProjectsTitle: { en: "No Projects Found", ml: "പദ്ധതികൾ ലഭ്യമല്ല" },
  emptyProjectsInitialTitle: { en: "No Development Projects Recorded Yet", ml: "പദ്ധതികൾ ഇതുവരെ രേഖപ്പെടുത്തിയിട്ടില്ല" },
  emptyProjectsInitialDesc: {
    en: "Verified public works and infrastructure projects will appear here following official sanction.",
    ml: "അംഗീകൃത വികസന പദ്ധതികളുടെ വിവരങ്ങൾ ഔദ്യോഗിക അനുമതി ലഭിച്ച ശേഷം ഇവിടെ ഉൾപ്പെടുത്തും.",
  },
  emptyProjectsFilterDesc: {
    en: "No projects match the selected status filter.",
    ml: "തിരഞ്ഞെടുത്ത പദവിയിൽ പദ്ധതികൾ കണ്ടെത്താനായില്ല.",
  },
  emptyProjectsReset: { en: "Show All Projects", ml: "എല്ലാ പദ്ധതികളും കാണുക" },

  // Empty States: Resources
  emptyResourcesTitle: { en: "No Services Found", ml: "സേവനങ്ങൾ ലഭ്യമല്ല" },
  emptyResourcesInitialTitle: { en: "No Public Resources Listed Yet", ml: "സേവനങ്ങൾ ഇതുവരെ ലിസ്റ്റ് ചെയ്തിട്ടില്ല" },
  emptyResourcesInitialDesc: {
    en: "Verified administrative, helpline, and utility contacts are currently being cataloged.",
    ml: "അവശ്യ സർവീസ് നമ്പറുകളും വിലാസങ്ങളും പരിശോധിച്ചു വരികയാണ്.",
  },
  emptyResourcesFilterDesc: {
    en: "No services match the selected service category.",
    ml: "തിരഞ്ഞെടുത്ത വിഭാഗത്തിൽ സേവനങ്ങൾ കണ്ടെത്താനായില്ല.",
  },
  emptyResourcesReset: { en: "Show All Services", ml: "എല്ലാ സേവനങ്ങളും കാണുക" },

  // Empty States: Media & Fallbacks
  emptyImageError: { en: "Photograph Unavailable", ml: "ചിത്രം ലഭ്യമല്ല" },
  emptyImageFailedDesc: {
    en: "The photograph could not be loaded from the server.",
    ml: "ചിത്രം സെർവറിൽ നിന്ന് ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല.",
  },
  emptyImageRetry: { en: "Retry Loading", ml: "വീണ്ടും ശ്രമിക്കുക" },

  // Detail Pages Not-Found
  announcementNotFoundTitle: { en: "Announcement Not Found", ml: "അറിയിപ്പ് കണ്ടെത്താനായില്ല" },
  announcementNotFoundDesc: {
    en: "The requested news announcement could not be located.",
    ml: "നിങ്ങൾ ആവശ്യപ്പെട്ട വാർത്താ അറിയിപ്പ് കണ്ടെത്താനായില്ല.",
  },
  returnToAnnouncements: { en: "Return to Announcements", ml: "വാർത്തകളിലേക്ക് മടങ്ങുക" },
  contactSecretariatDesk: { en: "Contact Secretariat Desk", ml: "സെക്രട്ടേറിയറ്റ് ഡെസ്കുമായി ബന്ധപ്പെടുക" },

  activityNotFoundTitle: { en: "Activity Record Not Found", ml: "പ്രവർത്തന രേഖ കണ്ടെത്താനായില്ല" },
  activityNotFoundDesc: {
    en: "The requested public activity entry could not be found.",
    ml: "നിങ്ങൾ ആവശ്യപ്പെട്ട പ്രവർത്തന വിവരങ്ങൾ കണ്ടെത്താനായില്ല.",
  },
  returnToActivities: { en: "Return to Activities", ml: "പ്രവർത്തനങ്ങളിലേക്ക് മടങ്ങുക" },

  // System & Segment Error Boundaries
  errorGenericBadge: { en: "Application Notice", ml: "ആപ്ലിക്കേഷൻ അറിയിപ്പ്" },
  errorGenericTitle: { en: "Something Went Wrong", ml: "അപ്രതീക്ഷിതമായ ഒരു പിശക് സംഭവിച്ചു" },
  errorGenericDesc: {
    en: "The application encountered a problem while processing this page. Your details are safe.",
    ml: "ഈ പേജ് ലോഡ് ചെയ്യുന്നതിൽ തടസ്സം നേരിട്ടു. നിങ്ങളുടെ വിവരങ്ങൾ സുരക്ഷിതമാണ്.",
  },
  errorTryAgain: { en: "Try Again", ml: "വീണ്ടും ശ്രമിക്കുക" },
  errorReturnHome: { en: "Return to Home", ml: "ഹോം പേജിലേക്ക് മടങ്ങുക" },

  errorNewsTitle: { en: "Unable to Load Announcements", ml: "വാർത്തകൾ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല" },
  errorNewsDesc: {
    en: "A temporary issue prevented loading the official announcements. Please try again.",
    ml: "വാർത്തകളും അറിയിപ്പുകളും ലഭ്യമാക്കുന്നതിൽ തടസ്സം നേരിട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
  },
  errorActivitiesTitle: { en: "Unable to Load Activities", ml: "പ്രവർത്തനങ്ങൾ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല" },
  errorActivitiesDesc: {
    en: "A temporary issue prevented loading the public activity records. Please try again.",
    ml: "പ്രവർത്തന രേഖകൾ ലഭ്യമാക്കുന്നതിൽ തടസ്സം നേരിട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
  },
  errorGalleryTitle: { en: "Unable to Load Photo Gallery", ml: "ഫോട്ടോ ഗാലറി ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല" },
  errorGalleryDesc: {
    en: "A temporary issue prevented loading the photographic archives. Please try again.",
    ml: "ചിത്ര ശേഖരം ലഭ്യമാക്കുന്നതിൽ തടസ്സം നേരിട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
  },
  errorConstituencyTitle: { en: "Unable to Load Constituency Hub", ml: "മണ്ഡലം വിവരങ്ങൾ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല" },
  errorConstituencyDesc: {
    en: "A temporary issue prevented loading constituency project and resource records. Please try again.",
    ml: "വികസന പദ്ധതികളും പൊതുസേവന വിവരങ്ങളും ലഭ്യമാക്കുന്നതിൽ തടസ്സം നേരിട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
  },
  errorContactTitle: { en: "Unable to Load Contact Desk", ml: "ഓഫീസ് ഡെസ്ക് ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല" },
  errorContactDesc: {
    en: "A temporary issue prevented initializing the communication desk. Please try again.",
    ml: "സമ്പർക്ക ഫോമുകൾ തയ്യാറാക്കുന്നതിൽ തടസ്സം നേരിട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
  },
  errorNetworkTitle: { en: "Network Connection Issue", ml: "നെറ്റ്‌വർക്ക് തകരാർ" },
  errorNetworkDesc: {
    en: "Please check your internet connection and try again.",
    ml: "ദയവായി ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.",
  },
};

export const LANGUAGE_STORAGE_KEY = "website_language";
export const LEGACY_LANGUAGE_STORAGE_KEY = "site_lang";

export const getSavedLanguage = (): Language => {
  if (typeof window !== "undefined") {
    try {
      const saved =
        localStorage.getItem(LANGUAGE_STORAGE_KEY) ||
        localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY);
      if (saved === "en" || saved === "ml") return saved;
      const domLang = document.documentElement.getAttribute("data-lang");
      if (domLang === "en" || domLang === "ml") return domLang;
    } catch {
      // fallback
    }
  }
  return "en";
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [, startTransition] = useTransition();

  // Restore saved language preference after client hydration
  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(LANGUAGE_STORAGE_KEY) ||
        localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY);
      if (saved === "en" || saved === "ml") {
        setLanguageState(saved);
        document.documentElement.lang = saved;
        document.documentElement.setAttribute("data-lang", saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    startTransition(() => {
      setLanguageState(lang);
    });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        localStorage.setItem(LEGACY_LANGUAGE_STORAGE_KEY, lang);
        document.documentElement.lang = lang;
        document.documentElement.setAttribute("data-lang", lang);
      } catch {
        // ignore storage errors
      }
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
