"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Compass,
  Home,
  Image as ImageIcon,
  Newspaper,
  PhoneCall,
  User,
  Info,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function NotFoundClient() {
  const { language, t } = useLanguage();
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        router.push("/");
      }
    }
  };

  const primaryDestinations = [
    {
      href: "/",
      title: language === "ml" ? "ഹോം" : "Home",
      description:
        language === "ml"
          ? "പോർട്ടൽ അവലോകനവും പ്രധാന അറിയിപ്പുകളും"
          : "Portal overview, highlights and official desk",
      icon: Home,
    },
    {
      href: "/about",
      title: language === "ml" ? "പ്രതിനിധിയെക്കുറിച്ച്" : "About the Representative",
      description:
        language === "ml"
          ? "ജനപ്രതിനിധിയുടെ വിവരങ്ങളും ഔദ്യോഗിക പശ്ചാത്തലവും"
          : "Representative background, responsibilities & vision",
      icon: User,
    },
    {
      href: "/news",
      title: language === "ml" ? "വാർത്തകളും അറിയിപ്പുകളും" : "News & Bulletins",
      description:
        language === "ml"
          ? "ഔദ്യോഗിക പത്രക്കുറിപ്പുകളും പൊതു അറിയിപ്പുകളും"
          : "Official press releases, verified circulars & notices",
      icon: Newspaper,
    },
    {
      href: "/constituency",
      title: language === "ml" ? "മണ്ഡലം വിവരങ്ങൾ" : "Constituency Hub",
      description:
        language === "ml"
          ? "വികസന പദ്ധതി ട്രാക്കറും പൗരസേവന ഡയറക്ടറിയും"
          : "Development project tracker & civic directory",
      icon: Building2,
    },
    {
      href: "/activities",
      title: language === "ml" ? "പൊതു പ്രവർത്തനങ്ങൾ" : "Activities & Engagements",
      description:
        language === "ml"
          ? "ഫീൽഡ് സന്ദർശനങ്ങളും ജനസമ്പർക്ക പരിപാടികളും"
          : "Public hearings, inspections & community initiatives",
      icon: Calendar,
    },
    {
      href: "/gallery",
      title: language === "ml" ? "ചിത്രശാല" : "Photo Gallery",
      description:
        language === "ml"
          ? "മണ്ഡലത്തിലെ പരിപാടികളുടെ ഫോട്ടോ ശേഖരം"
          : "Photographic archives from across Palakkad",
      icon: ImageIcon,
    },
    {
      href: "/contact",
      title: language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Contact Desk",
      description:
        language === "ml"
          ? "പരാതി പരിഹാരവും പൊതു അന്വേഷണ സമർപ്പണവും"
          : "Direct communication desk, queries & grievances",
      icon: PhoneCall,
    },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full animate-notfound-enter space-y-10">
      {/* Accessible Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          {
            label: language === "ml" ? "404 - പേജ് കണ്ടെത്താനായില്ല" : "404 - Page Not Found",
          },
        ]}
      />

      {/* Main Branded 404 Visual Showcase Card */}
      <section
        aria-labelledby="not-found-heading"
        className="relative bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] rounded-sm p-6 sm:p-10 md:p-14 shadow-xs text-center overflow-hidden max-w-3xl mx-auto"
      >
        {/* Subtle Architectural Corner Block for Depth */}
        <div
          aria-hidden="true"
          className="absolute -top-12 -right-12 w-32 h-32 bg-stone/40 dark:bg-[#222320]/60 rounded-full blur-xl pointer-events-none"
        />

        {/* Card Header Strip */}
        <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-warm-grey/60 dark:border-[#41413B]/60 text-xs font-mono text-slate dark:text-[#A09F97]">
          <Badge variant="copper">HTTP 404</Badge>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal/70 dark:text-[#F4F1E9]/70">
            {t("notFoundNotice")}
          </span>
        </div>

        {/* Branded 404 Typography Display */}
        <div className="relative py-2 sm:py-4 flex items-center justify-center select-none">
          {/* Subtle Watermark Layer */}
          <span
            aria-hidden="true"
            className="font-display text-8xl sm:text-9xl md:text-[140px] text-charcoal/[0.04] dark:text-[#F4F1E9]/[0.05] tracking-widest absolute pointer-events-none scale-110 sm:scale-125"
          >
            404
          </span>
          {/* Foreground Crisp Serif Number */}
          <span className="relative font-display text-6xl sm:text-7xl md:text-8xl text-charcoal dark:text-[#F4F1E9] tracking-tight">
            404
          </span>
        </div>

        {/* Centered Editorial Accent Rule */}
        <div className="w-14 h-0.5 bg-copper dark:bg-[#D29A78] mx-auto my-4 sm:my-5" aria-hidden="true" />

        {/* Main H1 Heading */}
        <h1
          id="not-found-heading"
          className="font-display text-2xl sm:text-3xl md:text-4xl text-charcoal dark:text-[#F4F1E9] tracking-tight"
        >
          {t("notFoundTitle")}
        </h1>

        {/* Warm, Professional Explanation */}
        <p className="mt-3 text-slate dark:text-[#C6C5BD] text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
          {t("notFoundDescription")}
        </p>

        {/* Primary and Secondary Recovery Action Buttons */}
        <div className="mt-8 pt-6 border-t border-warm-grey/60 dark:border-[#41413B]/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Button
            href="/"
            variant="primary"
            size="md"
            icon={<Home className="w-4 h-4 text-white dark:text-[#191A18]" aria-hidden="true" />}
            iconPosition="left"
            aria-label={
              language === "ml"
                ? "ഹോം പേജിലേക്ക് മടങ്ങുക: പ്രധാന പേജിലേക്ക് പോവുക"
                : "Return to Home: Navigate to the portal homepage"
            }
          >
            {t("notFoundReturnHome")}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleGoBack}
            icon={<ArrowLeft className="w-4 h-4 text-charcoal dark:text-[#F4F1E9]" aria-hidden="true" />}
            iconPosition="left"
            aria-label={
              language === "ml"
                ? "മുൻപത്തെ പേജിലേക്ക് മടങ്ങുക: ബ്രൗസർ ഹിസ്റ്ററിയിലെ മുൻപത്തെ പേജിലേക്ക് പോവുക"
                : "Go Back: Return to your previously visited page"
            }
          >
            {t("notFoundGoBack")}
          </Button>
        </div>
      </section>

      {/* Helpful Navigation Section: Primary Destinations */}
      <section
        aria-labelledby="helpful-links-heading"
        className="max-w-5xl mx-auto w-full pt-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-warm-grey dark:border-[#41413B]">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-copper dark:text-[#D29A78] shrink-0" aria-hidden="true" />
            <div>
              <h2
                id="helpful-links-heading"
                className="font-display text-xl sm:text-2xl text-charcoal dark:text-[#F4F1E9]"
              >
                {t("notFoundHelpfulHeading")}
              </h2>
              <p className="text-xs sm:text-sm text-slate dark:text-[#C6C5BD] mt-0.5">
                {t("notFoundHelpfulSubheading")}
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-copper dark:text-[#D29A78] hover:underline rounded-xs p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
          >
            <span>{language === "ml" ? "സഹായ ഡെസ്ക്" : "Need Assistance?"}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Responsive Grid of Verified Portal Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {primaryDestinations.map((dest) => {
            const Icon = dest.icon;
            return (
              <Link
                key={dest.href}
                href={dest.href}
                aria-label={`${dest.title}: ${dest.description}`}
                className="group bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-5 flex flex-col justify-between hover:border-charcoal/50 dark:hover:border-[#D29A78] hover:shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-xs bg-stone dark:bg-[#222320] border border-warm-grey/60 dark:border-[#41413B] flex items-center justify-center text-copper dark:text-[#D29A78] transition-colors group-hover:bg-copper/10 dark:group-hover:bg-[#D29A78]/15">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors">
                      {dest.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate dark:text-[#C6C5BD] leading-relaxed line-clamp-2">
                      {dest.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-warm-grey/50 dark:border-[#41413B]/50 flex items-center justify-between text-xs font-semibold text-charcoal/80 dark:text-[#F4F1E9]/80 group-hover:text-copper dark:group-hover:text-[#D29A78]">
                  <span>{language === "ml" ? "സന്ദർശിക്കുക" : "Visit Section"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Direct Helpline & Secretariat Desk Callout */}
        <div className="mt-6 p-4 rounded-xs border border-warm-grey dark:border-[#41413B] bg-stone/40 dark:bg-[#222320]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate dark:text-[#C6C5BD]">
            <Info className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0" aria-hidden="true" />
            <span>
              {language === "ml"
                ? "നിർദ്ദിഷ്ട സേവനങ്ങളെയോ വികസന വിവരങ്ങളെയോ കുറിച്ച് സംശയങ്ങളുണ്ടെങ്കിൽ ഓഫീസുമായി ബന്ധപ്പെടുക."
                : "Looking for specific public services or documented initiatives? Contact the constituency office."}
            </span>
          </div>
          <Link
            href="/contact"
            className="font-bold text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] underline shrink-0 rounded-xs p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
          >
            {language === "ml" ? "സമ്പർക്ക ഡയറക്ടറി കാണുക →" : "View Contact Directory →"}
          </Link>
        </div>
      </section>
    </div>
  );
}
