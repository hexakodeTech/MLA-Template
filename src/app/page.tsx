"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  Compass,
  PhoneCall,
  ChevronRight,
  Info,
  Clock,
  Building,
  FileCheck,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { NewsCard } from "@/components/news/NewsCard";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { Lightbox } from "@/components/gallery/Lightbox";
import {
  representativeProfile,
  mockNews,
  mockActivities,
  mockGallery,
} from "@/data/mockData";

export default function HomePage() {
  const { language, getLocalized, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col gap-16 lg:gap-24 pb-16">
      {/* SECTION 2: HERO SECTION */}
      <section
        aria-labelledby="hero-heading"
        className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden"
      >
        {/* Subtle background ornamentation */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-forest-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800/80 border border-navy-700/80 text-gold-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
                <span>
                  {language === "ml"
                    ? "പാലക്കാട് മണ്ഡലം ഔദ്യോഗിക വിവര പോർട്ടൽ"
                    : "Palakkad Constituency Official Information Portal"}
                </span>
              </div>

              <h1
                id="hero-heading"
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
              >
                {t("heroHeadline")}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {t("heroDescription")}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Button
                  href="/about"
                  variant="gold"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4 text-navy-950" />}
                >
                  {t("heroCtaPrimary")}
                </Button>
                <Button
                  href="/contact"
                  variant="outline-light"
                  size="lg"
                  icon={<PhoneCall className="w-4 h-4 text-slate-300" />}
                  iconPosition="left"
                >
                  {t("heroCtaSecondary")}
                </Button>
              </div>

              {/* Key Quick Indicators */}
              <div className="pt-6 border-t border-navy-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="block font-serif text-lg sm:text-xl font-bold text-white">
                    Palakkad
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {language === "ml" ? "കേരളത്തിന്റെ നെല്ലറ" : "Constituency Region"}
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-lg sm:text-xl font-bold text-gold-400">
                    Direct Desk
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {language === "ml" ? "പൊതു പരാതി പരിഹാരം" : "Citizen Redressal"}
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-lg sm:text-xl font-bold text-emerald-400">
                    Verified
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {language === "ml" ? "ഔദ്യോഗിക അറിയിപ്പുകൾ" : "Public Notices"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="relative bg-navy-800 rounded-2xl border-2 border-navy-700/80 p-3 shadow-2xl overflow-hidden group">
                  {/* Decorative Border Frame */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-navy-700 flex flex-col justify-end">
                    {/* Placeholder Photographic Asset */}
                    <img
                      src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                      alt="Representative Official Portrait Placeholder"
                      className="w-full h-full object-cover grayscale contrast-105 opacity-80"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>

                    {/* Temporary Placeholder Badge Overlay */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-navy-950/90 backdrop-blur-md border border-navy-700 rounded-lg p-2.5 text-xs text-slate-300 flex items-start gap-2 shadow-lg">
                        <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-white">
                            {language === "ml"
                              ? "മാതൃകാ ഛായാചിത്രം"
                              : "Official Portrait Placeholder"}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Approved portrait will be placed here upon office confirmation.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Details at Bottom of Portrait */}
                    <div className="relative z-10 p-5 text-white">
                      <Badge variant="gold" size="sm" className="mb-2">
                        {language === "ml" ? "ജനപ്രതിനിധി" : "Public Representative"}
                      </Badge>
                      <h2 className="font-serif font-bold text-2xl tracking-tight text-white">
                        {getLocalized(representativeProfile.name)}
                      </h2>
                      <p className="text-xs text-slate-300 mt-1 font-medium">
                        {getLocalized(representativeProfile.constituencyName)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WELCOME SECTION */}
      <section
        aria-labelledby="welcome-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-forest-800 uppercase tracking-wider block">
              {language === "ml" ? "ആമുഖം" : "Institutional Introduction"}
            </span>

            <h2
              id="welcome-heading"
              className="font-serif font-bold text-2xl sm:text-3xl text-navy-950 tracking-tight"
            >
              {t("welcomeHeading")}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t("welcomeDescription")}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Button
                href="/about"
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4 text-navy-900" />}
              >
                {language === "ml" ? "ഓഫീസ് ദൗത്യം വായിക്കുക" : "Learn About the Office & Mission"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ABOUT THE REPRESENTATIVE */}
      <section
        aria-labelledby="about-preview-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Portrait Placeholder Box */}
          <div className="lg:col-span-5">
            <div className="bg-sand-100 rounded-2xl border border-sand-300 p-4 relative">
              <div className="aspect-[4/3] rounded-xl bg-slate-200 overflow-hidden relative flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                  alt="Representative profile representation"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-navy-950/20 backdrop-blur-[1px]"></div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 rounded-lg p-2.5 text-xs border border-slate-200 shadow">
                  <span className="font-semibold text-navy-950 block">
                    {getLocalized(representativeProfile.name)}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {getLocalized(representativeProfile.designationStatus)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Structured Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2">
              <Badge variant="navy">{language === "ml" ? "പ്രൊഫൈൽ" : "Representative Profile"}</Badge>
              <Badge variant="sample">
                {language === "ml" ? "അംഗീകാരത്തിന് വിധേയം" : "Official Approval Pending"}
              </Badge>
            </div>

            <h2
              id="about-preview-heading"
              className="font-serif font-bold text-2xl sm:text-3xl text-navy-950"
            >
              {language === "ml" ? "ശ്രീ രമേഷ് പിഷാരടിയെക്കുറിച്ച്" : "About Shri Ramesh Pisharady"}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {getLocalized(representativeProfile.officialBioNotice)}
            </p>

            <div className="bg-sand-100/80 rounded-xl p-4 border border-sand-200 text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-navy-900">
                {language === "ml" ? "പ്രവർത്തന മുൻഗണനകൾ:" : "Key Representative Commitments:"}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-600 shrink-0"></span>
                  <span>
                    {language === "ml" ? "സുതാര്യമായ പരാതി പരിഹാരം" : "Transparent Grievance Handling"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-600 shrink-0"></span>
                  <span>
                    {language === "ml" ? "ശുദ്ധജല, റോഡ് അടിസ്ഥാന വികസനം" : "Water & Transport Connectivity"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-600 shrink-0"></span>
                  <span>
                    {language === "ml" ? "കാർഷിക ക്ഷേമ ഏകോപനം" : "Agrarian Support & Welfare"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-600 shrink-0"></span>
                  <span>
                    {language === "ml" ? "സാംസ്കാരിക പൈതൃക സംരക്ഷണം" : "Heritage & Cultural Promotion"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Button
                href="/about"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4 text-gold-400" />}
              >
                {t("readMore")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LATEST UPDATES (NEWS & ANNOUNCEMENTS) */}
      <section
        aria-labelledby="news-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="navy">{t("navNews")}</Badge>
              <span className="text-xs text-slate-500 font-medium">Stay Informed</span>
            </div>
            <h2
              id="news-heading"
              className="font-serif font-bold text-2xl sm:text-3xl text-navy-950"
            >
              {language === "ml" ? "ഏറ്റവും പുതിയ അറിയിപ്പുകൾ" : "Official News & Announcements"}
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              {language === "ml"
                ? "ഓഫീസിൽ നിന്നുള്ള ഔദ്യോഗിക പത്രക്കുറിപ്പുകൾ, യോഗ വിവരങ്ങൾ, പൊതു അറിയിപ്പുകൾ."
                : "Official notices, public meeting announcements, constituency updates and verified administrative releases."}
            </p>
          </div>

          <Button
            href="/news"
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            {t("viewAllUpdates")}
          </Button>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNews.slice(0, 3).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* SECTION 6: CONSTITUENCY INFORMATION */}
      <section
        aria-labelledby="constituency-overview-heading"
        className="bg-sand-100/70 border-y border-sand-200 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <Badge variant="green" className="mb-2">
              {language === "ml" ? "മണ്ഡലം ഒറ്റനോട്ടത്തിൽ" : "Constituency Overview"}
            </Badge>
            <h2
              id="constituency-overview-heading"
              className="font-serif font-bold text-2xl sm:text-3xl text-navy-950"
            >
              {language === "ml"
                ? "നിങ്ങളുടെ മണ്ഡലം ഒറ്റനോട്ടത്തിൽ"
                : "Your Constituency at a Glance"}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              {language === "ml"
                ? "പാലക്കാട് മണ്ഡലത്തിന്റെ വിവരങ്ങൾ, വികസന പദ്ധതികൾ, സർക്കാർ ഹെൽപ്പ്‌ലൈനുകൾ എന്നിവ ഇവിടെ ലഭ്യമാണ്."
                : "Explore constituency information, public resources and documented updates on local projects. Find verified contacts to help access public services."}
            </p>
          </div>

          {/* Suggested 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Constituency Profile */}
            <Card hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-navy-950">
                  {language === "ml" ? "മണ്ഡല പ്രൊഫൈൽ" : "Constituency Profile"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {language === "ml"
                    ? "പാലക്കാടിന്റെ ഭൂപ്രകൃതി, താലൂക്കുകൾ, കാർഷിക പൈതൃകം, പ്രധാന കേന്ദ്രങ്ങൾ എന്നിവയുടെ സമഗ്ര വിവരണം."
                    : "Geographical overview, taluk administrative divisions, agricultural background and heritage landmarks of Palakkad."}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  href="/constituency"
                  className="text-xs font-semibold text-navy-900 hover:text-gold-600 flex items-center gap-1"
                >
                  <span>{language === "ml" ? "വിശദമായി കാണുക" : "View Profile"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>

            {/* Card 2: Public Service Resources */}
            <Card hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-forest-800 text-white flex items-center justify-center mb-4">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-navy-950">
                  {language === "ml" ? "പൊതുജന സേവനങ്ങൾ" : "Public Service Resources"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {language === "ml"
                    ? "കളക്ടറേറ്റ്, താലൂക്ക് ഓഫീസുകൾ, വാട്ടർ അതോറിറ്റി, കെ.എസ്.ഇ.ബി എന്നിവയുടെ ഡയറക്ടറി."
                    : "Verified directory of District Collectorate, Taluk Offices, KSEB, Water Authority and civic service desks."}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  href="/constituency#resources"
                  className="text-xs font-semibold text-navy-900 hover:text-gold-600 flex items-center gap-1"
                >
                  <span>{language === "ml" ? "ഡയറക്ടറി പരിശോധിക്കുക" : "Explore Directory"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>

            {/* Card 3: Development Projects */}
            <Card hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-gold-500 text-navy-950 flex items-center justify-center mb-4">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-navy-950">
                  {language === "ml" ? "വികസന പദ്ധതികൾ" : "Development Projects"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {language === "ml"
                    ? "കുടിവെള്ള പദ്ധതികൾ, ഗ്രാമീണ റോഡുകൾ, ആരോഗ്യ കേന്ദ്രങ്ങളുടെ നവീകരണം എന്നിവയുടെ ഔദ്യോഗിക സ്ഥിതിവിവരം."
                    : "Documented status of sanctioned infrastructure projects with official source attributions and timelines."}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  href="/constituency#projects"
                  className="text-xs font-semibold text-navy-900 hover:text-gold-600 flex items-center gap-1"
                >
                  <span>{language === "ml" ? "പദ്ധതികൾ കാണുക" : "Track Projects"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>

            {/* Card 4: Important Contacts */}
            <Card hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center mb-4">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-navy-950">
                  {language === "ml" ? "പ്രധാന നമ്പറുകൾ" : "Important Contacts"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {language === "ml"
                    ? "അടിയന്തിര സഹായ ലൈനുകൾ, പോലീസ്, ഫയർ സർവീസ്, ആശുപത്രി കൺട്രോൾ റൂമുകൾ."
                    : "Immediate contact numbers for 24x7 emergencies, police, fire & rescue, and district health units."}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-navy-900 hover:text-gold-600 flex items-center gap-1"
                >
                  <span>{language === "ml" ? "ബന്ധപ്പെടുക" : "Find Contacts"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 7: PUBLIC ACTIVITIES */}
      <section
        aria-labelledby="activities-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="green">{t("navActivities")}</Badge>
              <span className="text-xs text-slate-500 font-medium">
                Stay Connected with Official Activities
              </span>
            </div>
            <h2
              id="activities-heading"
              className="font-serif font-bold text-2xl sm:text-3xl text-navy-950"
            >
              {language === "ml"
                ? "പൊതു പരിപാടികളും ഇടപെടലുകളും"
                : "Public Activities & Engagements"}
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              {language === "ml"
                ? "ഔദ്യോഗിക സന്ദർശനങ്ങൾ, പരിശോധനകൾ, ജനസമ്പർക്ക പരിപാടികൾ എന്നിവയുടെ വിവരങ്ങൾ."
                : "Official updates on public meetings, hospital visits, civic hearings and community events conducted across Palakkad."}
            </p>
          </div>

          <Button
            href="/activities"
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            {t("viewAllActivities")}
          </Button>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockActivities.slice(0, 3).map((act) => (
            <ActivityCard key={act.id} activity={act} />
          ))}
        </div>
      </section>

      {/* SECTION 8: GALLERY (MOMENTS FROM THE CONSTITUENCY) */}
      <section
        aria-labelledby="gallery-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="gold">{t("navGallery")}</Badge>
              <span className="text-xs text-slate-500 font-medium">
                Visual Documentation
              </span>
            </div>
            <h2
              id="gallery-heading"
              className="font-serif font-bold text-2xl sm:text-3xl text-navy-950"
            >
              {language === "ml" ? "മണ്ഡലത്തിലെ നിമിഷങ്ങൾ" : "Moments from the Constituency"}
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              {language === "ml"
                ? "ഔദ്യോഗിക പരിപാടികൾ, പൈതൃക കേന്ദ്രങ്ങൾ, വികസന സ്ഥലങ്ങൾ എന്നിവയുടെ ചിത്രങ്ങൾ."
                : "Photographs documenting official meetings, visits, community assemblies and local landscape in Palakkad."}
            </p>
          </div>

          <Button
            href="/gallery"
            variant="outline"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            {t("viewAllGallery")}
          </Button>
        </div>

        {/* Clickable Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockGallery.slice(0, 6).map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View photograph: ${getLocalized(item.title)}`}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={getLocalized(item.altText)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-semibold bg-white/90 text-navy-950 px-2 py-0.5 rounded shadow">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-serif font-semibold text-sm line-clamp-1">
                  {getLocalized(item.title)}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-300 mt-1">
                  <span>{item.date}</span>
                  <span className="text-gold-400 group-hover:underline">Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          items={mockGallery}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      </section>

      {/* SECTION 9: CONTACT */}
      <section
        aria-labelledby="contact-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Office Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <Badge variant="navy" className="mb-2">
                {language === "ml" ? "ബന്ധപ്പെടുക" : "Official Enquiry"}
              </Badge>
              <h2
                id="contact-heading"
                className="font-serif font-bold text-2xl sm:text-3xl text-navy-950"
              >
                {language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Get in Touch with the Office"}
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {language === "ml"
                  ? "ഔദ്യോഗിക ആവശ്യങ്ങൾക്കും നിവേദനങ്ങൾക്കും താഴെ പറയുന്ന മാർഗ്ഗങ്ങളിലൂടെ ഓഫീസുമായി ബന്ധപ്പെടാം."
                  : "Find verified office contact details and the appropriate channels for submitting your queries, petitions, and communications."}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-navy-950">
                    {language === "ml" ? "ഓഫീസ് വിലാസം" : "Office Address"}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    [To be confirmed by office]
                    <br />
                    Constituency Office of Shri Ramesh Pisharady
                    <br />
                    Palakkad District, Kerala – PIN: 678001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <PhoneCall className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-navy-950">
                    {language === "ml" ? "ഫോൺ നമ്പർ" : "Official Phone"}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    [Verified office number to be updated]
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    Demo: +91 491 2500000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Landmark className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-navy-950">
                    {language === "ml" ? "ഔദ്യോഗിക ഇമെയിൽ" : "Official Email"}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    [Official email awaiting confirmation]
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    office.pisharady@demo.gov.in
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Clock className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-navy-950">
                    {language === "ml" ? "ഓഫീസ് സമയം" : "Office Hours"}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Monday to Friday: 09:30 AM – 05:00 PM
                    <br />
                    <span className="text-[11px] text-slate-400">
                      (Public Hearings: 10:00 AM – 01:00 PM [Tentative])
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
