"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  PhoneCall,
  Clock,
  MapPin,
  Info,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { NewsCard } from "@/components/news/NewsCard";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { Lightbox } from "@/components/gallery/Lightbox";
import { ProjectTracker } from "@/components/constituency/ProjectTracker";
import { ResourceDirectory } from "@/components/constituency/ResourceDirectory";
import {
  representativeProfile,
  mockNews,
  mockActivities,
  mockGallery,
  mockProjects,
  publicResources,
} from "@/data/mockData";

export default function HomePage() {
  const { language, getLocalized, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [constituencyTab, setConstituencyTab] = useState<"projects" | "directory">("projects");

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const leadNews = mockNews[0];
  const sideNews = mockNews.slice(1, 4);

  const featuredActivity = mockActivities[0];
  const supportingActivities = mockActivities.slice(1, 3);

  return (
    <div className="flex flex-col font-sans bg-ivory text-charcoal dark:bg-[#191A18] dark:text-[#F4F1E9]">
      {/* =========================================================================
          1. HERO SECTION — MODERN INDIAN EDITORIAL
          ========================================================================= */}
      <section
        aria-labelledby="hero-heading"
        className="relative bg-ivory dark:bg-[#191A18] pt-10 pb-20 lg:pt-16 lg:pb-32 overflow-hidden border-b border-warm-grey dark:border-[#41413B]"
      >
        {/* Soft, neutral ambient background animation */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-stone/60 dark:bg-[#222320]/60 blur-3xl pointer-events-none animate-ambient-1"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-stone/40 dark:bg-[#2C2D29]/40 blur-3xl pointer-events-none animate-ambient-2"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] rounded-full bg-copper/5 dark:bg-[#D29A78]/5 blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Large Editorial Typography & Clear Paths */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-copper dark:text-[#D29A78]">
                  {language === "ml"
                    ? "പാലക്കാട് മണ്ഡലം · കേരളം"
                    : "Palakkad Constituency · Kerala"}
                </span>
                <span className="text-warm-grey dark:text-[#41413B]">•</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate dark:text-[#A09F97]">
                  {language === "ml" ? "ഔദ്യോഗിക പോർട്ടൽ" : "Public Information"}
                </span>
              </div>

              {/* Large, Confident Headline with Editorial Rhythm */}
              <h1
                id="hero-heading"
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-charcoal dark:text-[#F4F1E9] leading-[1.08] tracking-tight"
              >
                A Connected Constituency <br />
                <span className="text-charcoal/80 dark:text-[#F4F1E9]/80 italic font-normal">Starts with Information.</span>
              </h1>

              {/* Supporting Paragraph */}
              <p className="text-slate dark:text-[#C6C5BD] text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-light">
                {t("heroDescription")}
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="/about"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4 text-white dark:text-[#191A18] group-hover:translate-x-1 transition-transform" />}
                  iconPosition="right"
                >
                  {language === "ml" ? "പ്രതിനിധിയെക്കുറിച്ച് വായിക്കുക →" : "ABOUT THE REPRESENTATIVE →"}
                </Button>
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  icon={<PhoneCall className="w-4 h-4 text-charcoal dark:text-[#F4F1E9]" />}
                  iconPosition="left"
                >
                  {language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "CONTACT THE OFFICE"}
                </Button>
              </div>

              {/* Quick Regional Facts Bar */}
              <div className="pt-8 border-t border-warm-grey dark:border-[#41413B] grid grid-cols-3 gap-6">
                <div>
                  <span className="block font-display text-xl sm:text-2xl text-charcoal dark:text-[#F4F1E9]">
                    Palakkad
                  </span>
                  <span className="text-[11px] text-slate dark:text-[#A09F97] font-semibold uppercase tracking-wider">
                    {language === "ml" ? "മണ്ഡല പ്രദേശം" : "Agrarian Heartland"}
                  </span>
                </div>
                <div>
                  <span className="block font-display text-xl sm:text-2xl text-charcoal dark:text-[#F4F1E9]">
                    Direct Desk
                  </span>
                  <span className="text-[11px] text-slate dark:text-[#A09F97] font-semibold uppercase tracking-wider">
                    {language === "ml" ? "പരാതി പരിഹാരം" : "Citizen Service"}
                  </span>
                </div>
                <div>
                  <span className="block font-display text-xl sm:text-2xl text-copper dark:text-[#D29A78]">
                    Verified
                  </span>
                  <span className="text-[11px] text-slate dark:text-[#A09F97] font-semibold uppercase tracking-wider">
                    {language === "ml" ? "അറിയിപ്പുകൾ" : "Public Notices"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Dominant Editorial Photograph & Neutral Frame */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md sm:max-w-lg">
                {/* Background Architectural Neutral Block */}
                <div
                  aria-hidden="true"
                  className="absolute -top-4 -right-4 w-full h-full bg-stone/80 dark:bg-[#222320] rounded-sm -z-10"
                />

                <div className="relative bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-3.5 shadow-sm overflow-hidden">
                  <div className="relative aspect-[3/4] rounded-xs overflow-hidden bg-stone dark:bg-[#222320] flex flex-col justify-end">
                    {/* Placeholder Photographic Portrait */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                      alt="Representative Official Portrait Placeholder"
                      className="w-full h-full object-cover filter contrast-105 opacity-90"
                    />

                    {/* Neutral Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Floating Editorial Notice */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-white/95 dark:bg-[#2C2D29]/95 backdrop-blur-sm border border-warm-grey dark:border-[#41413B] rounded-xs px-3 py-2 text-xs flex items-center gap-2 shadow-xs">
                        <Info className="w-3.5 h-3.5 text-copper dark:text-[#D29A78] shrink-0" />
                        <span className="text-[11px] font-semibold text-charcoal dark:text-[#F4F1E9]">
                          Temporary portrait placeholder · Awaiting approved asset
                        </span>
                      </div>
                    </div>

                    {/* Editorial Subject Card at Bottom */}
                    <div className="relative z-10 p-6 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal bg-white px-2 py-0.5 rounded-xs inline-block mb-1.5 font-sans font-semibold">
                        {language === "ml" ? "ജനപ്രതിനിധി" : "Public Representative"}
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl text-white leading-tight">
                        {getLocalized(representativeProfile.name)}
                      </h2>
                      <p className="text-xs text-white/80 font-mono mt-1">
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

      {/* =========================================================================
          2. INTRODUCTION SECTION — REFINED EDITORIAL
          ========================================================================= */}
      <section
        aria-labelledby="welcome-heading"
        className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-b border-warm-grey dark:border-[#41413B]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: Uppercase Editorial Label */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block">
              A Public Information Portal
            </span>
            <div className="w-12 h-0.5 bg-copper dark:bg-[#D29A78] mt-2"></div>
            <p className="text-xs text-slate dark:text-[#A09F97] font-mono pt-3">
              Office of Shri Ramesh Pisharady · Palakkad
            </p>
          </div>

          {/* Right: Large Headline, Flowing Paragraph, and Link */}
          <div className="lg:col-span-8 space-y-6">
            <h2
              id="welcome-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal dark:text-[#F4F1E9] leading-tight tracking-tight"
            >
              {t("welcomeHeading")}
            </h2>

            <p className="text-slate dark:text-[#C6C5BD] text-base sm:text-lg leading-relaxed font-light">
              {t("welcomeDescription")}
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] transition-colors group"
              >
                <span>EXPLORE THE WEBSITE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-copper dark:text-[#D29A78]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ABOUT SECTION — EDITORIAL PROFILE
          ========================================================================= */}
      <section
        aria-labelledby="about-preview-heading"
        className="py-16 sm:py-24 bg-stone/40 dark:bg-[#222320]/60 border-b border-warm-grey dark:border-[#41413B]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Editorial Portrait & Vertical Line */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white dark:bg-[#2C2D29] p-3 rounded-sm border border-warm-grey dark:border-[#41413B] shadow-xs">
                <div className="aspect-[4/5] rounded-xs bg-stone dark:bg-[#222320] overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                    alt="Representative Portrait"
                    className="w-full h-full object-cover filter contrast-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-display text-xl">{getLocalized(representativeProfile.name)}</p>
                    <p className="text-xs text-white/80 font-mono">Palakkad Constituency, Kerala</p>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate dark:text-[#A09F97] font-mono mt-2.5 text-center">
                Official approved portrait will be updated upon secretarial confirmation.
              </p>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block">
                About the Representative
              </span>

              <h2
                id="about-preview-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal dark:text-[#F4F1E9] leading-tight"
              >
                A Closer Look at <br />
                <span className="text-charcoal/80 dark:text-[#F4F1E9]/80 font-normal italic">Shri Ramesh Pisharady</span>
              </h2>

              <p className="text-slate dark:text-[#C6C5BD] text-base sm:text-lg leading-relaxed font-light">
                {getLocalized(representativeProfile.officialBioNotice)}
              </p>

              {/* Confirmed Concise Facts */}
              <div className="bg-white dark:bg-[#2C2D29] p-6 rounded-sm border border-warm-grey dark:border-[#41413B] space-y-3 text-xs sm:text-sm shadow-xs">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper dark:bg-[#D29A78] mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-charcoal dark:text-[#F4F1E9] block">Constituency:</strong>
                    <span className="text-slate dark:text-[#C6C5BD]">Palakkad, Kerala, India (Gateway to the Western Ghats)</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2 border-t border-warm-grey/60 dark:border-[#41413B]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper dark:bg-[#D29A78] mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-charcoal dark:text-[#F4F1E9] block">Public Liaison:</strong>
                    <span className="text-slate dark:text-[#C6C5BD]">Active Citizen Redressal &amp; Infrastructure Oversight Desk</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2 border-t border-warm-grey/60 dark:border-[#41413B]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper dark:bg-[#D29A78] mt-2 shrink-0"></span>
                  <div>
                    <strong className="text-charcoal dark:text-[#F4F1E9] block">Official Verification:</strong>
                    <span className="text-slate dark:text-[#C6C5BD]">All policy and biographical data cleared by representative secretariat.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] transition-colors group"
                >
                  <span>READ COMPLETE OVERVIEW</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-copper dark:text-[#D29A78]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. NEWS & ANNOUNCEMENTS — MAGAZINE-STYLE LAYOUT
          ========================================================================= */}
      <section
        aria-labelledby="news-heading"
        className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-b border-warm-grey dark:border-[#41413B]"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-warm-grey dark:border-[#41413B]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block mb-1">
              Latest Updates
            </span>
            <h2
              id="news-heading"
              className="font-display text-3xl sm:text-4xl text-charcoal dark:text-[#F4F1E9]"
            >
              News &amp; Announcements
            </h2>
            <p className="text-xs sm:text-sm text-slate dark:text-[#C6C5BD] mt-1">
              Official notices, public meetings, constituency updates and information published by the office.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] shrink-0 transition-colors"
          >
            <span>View All Updates</span>
            <ArrowRight className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
          </Link>
        </div>

        {/* Magazine Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Dominant Lead Article on Left */}
          <div className="lg:col-span-7">
            {leadNews && <NewsCard item={leadNews} featured />}
          </div>

          {/* Compact Vertical Stack of Supporting Articles on Right */}
          <div className="lg:col-span-5 bg-white dark:bg-[#2C2D29] p-6 sm:p-7 rounded-sm border border-warm-grey dark:border-[#41413B] space-y-1 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-widest text-slate dark:text-[#A09F97] block pb-3 border-b border-warm-grey dark:border-[#41413B]">
              Recent Notices &amp; Bulletins
            </span>
            {sideNews.map((item) => (
              <NewsCard key={item.id} item={item} compact />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CONSTITUENCY SECTION — INFORMATION HUB (Neutral Warm Surface)
          ========================================================================= */}
      <section
        aria-labelledby="constituency-heading"
        className="py-16 sm:py-24 bg-stone/50 dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9] border-b border-warm-grey dark:border-[#41413B]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-warm-grey dark:border-[#41413B]">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block mb-1">
                Constituency Hub
              </span>
              <h2
                id="constituency-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal dark:text-[#F4F1E9]"
              >
                Your Constituency at a Glance
              </h2>
              <p className="text-sm text-slate dark:text-[#C6C5BD] mt-2 font-light leading-relaxed">
                Explore constituency information, public resources and documented updates on local projects. Find relevant links and information to help you access public services.
              </p>
            </div>

            {/* Interactive Switcher between Projects and Public Directory */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#2C2D29] p-1.5 rounded-sm border border-warm-grey dark:border-[#41413B] shrink-0">
              <button
                onClick={() => setConstituencyTab("projects")}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xs transition-all ${
                  constituencyTab === "projects"
                    ? "bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] shadow-xs"
                    : "text-slate hover:text-charcoal dark:text-[#C6C5BD] dark:hover:text-[#F4F1E9]"
                }`}
              >
                Development Projects
              </button>
              <button
                onClick={() => setConstituencyTab("directory")}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xs transition-all ${
                  constituencyTab === "directory"
                    ? "bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] shadow-xs"
                    : "text-slate hover:text-charcoal dark:text-[#C6C5BD] dark:hover:text-[#F4F1E9]"
                }`}
              >
                Public Resources
              </button>
            </div>
          </div>

          {/* Active Tab Panel */}
          <div>
            {constituencyTab === "projects" ? (
              <ProjectTracker projects={mockProjects} />
            ) : (
              <ResourceDirectory resources={publicResources} />
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-warm-grey dark:border-[#41413B] flex justify-end">
            <Link
              href="/constituency"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-muted-blue dark:text-[#91A7B8] hover:underline transition-colors group"
            >
              <span>Explore Complete Constituency Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. PUBLIC ACTIVITIES — VISUAL STORYTELLING
          ========================================================================= */}
      <section
        aria-labelledby="activities-heading"
        className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-b border-warm-grey dark:border-[#41413B]"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-warm-grey dark:border-[#41413B]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block mb-1">
              Public Engagements
            </span>
            <h2
              id="activities-heading"
              className="font-display text-3xl sm:text-4xl text-charcoal dark:text-[#F4F1E9]"
            >
              Public Activities &amp; Engagements
            </h2>
            <p className="text-xs sm:text-sm text-slate dark:text-[#C6C5BD] mt-1">
              Find updates about public meetings, official visits, community events and other activities published by the office.
            </p>
          </div>

          <Link
            href="/activities"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] shrink-0 transition-colors"
          >
            <span>View All Activities</span>
            <ArrowRight className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
          </Link>
        </div>

        {/* Asymmetrical Grid: 1 Featured Activity + 2 Supporting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            {featuredActivity && <ActivityCard activity={featuredActivity} featured />}
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            {supportingActivities.map((act) => (
              <ActivityCard key={act.id} activity={act} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. PHOTO GALLERY — EDITORIAL GRID
          ========================================================================= */}
      <section
        aria-labelledby="gallery-heading"
        className="py-16 sm:py-24 bg-stone/40 dark:bg-[#222320]/60 border-b border-warm-grey dark:border-[#41413B]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-warm-grey dark:border-[#41413B]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block mb-1">
                Visual Documentation
              </span>
              <h2
                id="gallery-heading"
                className="font-display text-3xl sm:text-4xl text-charcoal dark:text-[#F4F1E9]"
              >
                Moments from the Constituency
              </h2>
              <p className="text-xs sm:text-sm text-slate dark:text-[#C6C5BD] mt-1">
                Curated photographic impressions documenting public meetings, visits, civic infrastructure and Palakkad landscapes.
              </p>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] shrink-0 transition-colors"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
            </Link>
          </div>

          {/* Asymmetrical Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Large Lead Photo */}
            <div
              onClick={() => openLightbox(0)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(0);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View photo: ${getLocalized(mockGallery[0].title)}`}
              className="sm:col-span-2 lg:col-span-7 group relative aspect-[16/11] rounded-sm overflow-hidden bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mockGallery[0].imageUrl}
                alt={getLocalized(mockGallery[0].altText)}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white dark:bg-[#2C2D29] text-charcoal dark:text-[#F4F1E9] px-2.5 py-0.5 rounded-xs border border-warm-grey dark:border-[#41413B]">
                  {mockGallery[0].category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-display text-xl sm:text-2xl leading-snug">
                  {getLocalized(mockGallery[0].title)}
                </p>
                <div className="flex items-center justify-between text-xs text-white/80 mt-1 font-mono">
                  <span>{mockGallery[0].date}</span>
                  <span className="text-[#D29A78] group-hover:underline">Click to expand</span>
                </div>
              </div>
            </div>

            {/* Smaller Stacked Photos on Right */}
            <div className="sm:col-span-2 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {mockGallery.slice(1, 3).map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx + 1)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(idx + 1);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View photo: ${getLocalized(item.title)}`}
                  className="group relative aspect-[16/10] rounded-sm overflow-hidden bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={getLocalized(item.altText)}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-display text-base leading-snug line-clamp-1">
                      {getLocalized(item.title)}
                    </p>
                    <span className="text-[10px] text-white/70 font-mono">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

      {/* =========================================================================
          8. CONTACT SECTION — WARM IVORY AND OPEN
          ========================================================================= */}
      <section
        aria-labelledby="contact-heading"
        className="py-16 sm:py-24 bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Heading & Office Particulars */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block mb-1">
                  Connect Directly
                </span>
                <h2
                  id="contact-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal dark:text-[#F4F1E9] leading-tight"
                >
                  Get in Touch <br />
                  <span className="text-slate dark:text-[#C6C5BD] font-normal italic">with the Office</span>
                </h2>
                <p className="text-sm text-slate dark:text-[#C6C5BD] mt-3 font-light leading-relaxed">
                  For official enquiries, use the verified contact details below or submit an enquiry through the office&apos;s contact form.
                </p>
              </div>

              {/* Verified Contact Details Box */}
              <div className="bg-white dark:bg-[#2C2D29] p-6 rounded-sm border border-warm-grey dark:border-[#41413B] space-y-5 text-xs text-charcoal dark:text-[#F4F1E9] shadow-xs">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wider block text-charcoal dark:text-[#F4F1E9]">Office Address</span>
                    <span className="text-slate dark:text-[#C6C5BD] leading-relaxed block mt-0.5">
                      [To be confirmed] · Constituency Office of Shri Ramesh Pisharady, Palakkad District, Kerala – PIN: 678001
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-warm-grey/60 dark:border-[#41413B]/60">
                  <PhoneCall className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wider block text-charcoal dark:text-[#F4F1E9]">Phone</span>
                    <span className="text-slate dark:text-[#C6C5BD] block mt-0.5">[Verified office number to be added] · Demo: +91 491 2500000</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-warm-grey/60 dark:border-[#41413B]/60">
                  <Compass className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wider block text-charcoal dark:text-[#F4F1E9]">Email</span>
                    <span className="text-slate dark:text-[#C6C5BD] block mt-0.5">office.pisharady@demo.gov.in (Official email placeholder)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-warm-grey/60 dark:border-[#41413B]/60">
                  <Clock className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wider block text-charcoal dark:text-[#F4F1E9]">Office Hours</span>
                    <span className="text-slate dark:text-[#C6C5BD] block mt-0.5">Mon – Fri: 09:30 AM – 05:00 PM [To be confirmed]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Clean Warm Ivory / White Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
