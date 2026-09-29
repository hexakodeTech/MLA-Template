"use client";

import React from "react";
import { Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ProjectTracker } from "@/components/constituency/ProjectTracker";
import { ResourceDirectory } from "@/components/constituency/ResourceDirectory";
import {
  mockProjects,
  publicResources,
  palakkadTaluks,
} from "@/data/mockData";

export default function ConstituencyPage() {
  const { language, getLocalized, t } = useLanguage();

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 font-sans bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("navConstituency") }]} />

      {/* Page Header */}
      <div className="border-b border-warm-grey dark:border-[#41413B] pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="copper">
            {language === "ml" ? "മണ്ഡല വിവരങ്ങൾ" : "Constituency Information Hub"}
          </Badge>
          <Badge variant="stone">Palakkad, Kerala</Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-[#F4F1E9] tracking-tight">
          {language === "ml"
            ? "പാലക്കാട് മണ്ഡലം വിവരങ്ങൾ"
            : "Palakkad Constituency Information Hub"}
        </h1>
        <p className="mt-4 text-slate dark:text-[#C6C5BD] text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          {language === "ml"
            ? "മണ്ഡലത്തിന്റെ ഭൂമിശാസ്ത്രം, ഭരണപരമായ താലൂക്കുകൾ, അംഗീകൃത വികസന പദ്ധതികൾ, അവശ്യ പൊതുജന സേവന നമ്പറുകൾ എന്നിവ ഇവിടെ ലഭ്യമാണ്."
            : "Verified regional profile, administrative divisions, documented development initiatives, and official citizen service directories for Palakkad."}
        </p>
      </div>

      {/* SECTION 1: CONSTITUENCY REGIONAL OVERVIEW */}
      <section aria-labelledby="constituency-geography" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block">
              {language === "ml" ? "ഭൂമിശാസ്ത്രവും പൈതൃകവും" : "Geography & Heritage"}
            </span>
            <h2
              id="constituency-geography"
              className="font-display text-3xl sm:text-4xl text-charcoal dark:text-[#F4F1E9]"
            >
              {language === "ml"
                ? "കേരളത്തിന്റെ കവാടവും നെല്ലറയും"
                : "The Gateway & Granary of Kerala"}
            </h2>
            <p className="text-slate dark:text-[#C6C5BD] text-base leading-relaxed font-light">
              {language === "ml"
                ? "പശ്ചിമഘട്ടത്തിലെ പ്രകൃതിദത്ത വിടവായ പാലക്കാട് ചുരം (Palakkad Gap) വഴിയാണ് ജില്ല സ്ഥിതി ചെയ്യുന്നത്. വിശാലമായ നെൽപ്പാടങ്ങളും ഭാരതപ്പുഴയും കൽപ്പാത്തിയും ചേർന്നതാണ് ഈ നാടിന്റെ പച്ചപ്പ്."
                : "Framed by the prominent 30-kilometer Palakkad Gap in the Western Ghats, Palakkad stands as Kerala's historical gateway to the Deccan plateau and its largest agrarian contributor. It is celebrated for its lush paddy fields, palm-fringed village horizons, and the cultural basin of the Bharatapuzha (Nila)."}
            </p>
            <p className="text-slate dark:text-[#C6C5BD] text-base leading-relaxed font-light">
              {language === "ml"
                ? "ചരിത്രപ്രസിദ്ധമായ പാലക്കാട് കോട്ട, മലമ്പുഴ അണക്കെട്ട്, വിക്ടോറിയ കോളേജ്, കൊല്ലങ്കോട് പൈതൃകം എന്നിവ മണ്ഡലത്തിന്റെ അഭിമാനമാണ്."
                : "From the granite ramparts of Palakkad Fort and the vital reservoir waters of Malampuzha to historic educational institutions like Government Victoria College, the region blends rich cultural legacy with modern civic aspirations."}
            </p>

            <div className="p-4 rounded-sm bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] text-xs text-charcoal dark:text-[#F4F1E9] flex items-start gap-3 shadow-xs">
              <Info className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" />
              <p className="text-slate dark:text-[#C6C5BD]">
                <strong className="text-charcoal dark:text-[#F4F1E9]">Data Accuracy Note:</strong> All demographic, geographic, and administrative references adhere to verified public domain records. Official demographic census sheets will be formally attached upon office confirmation.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-xs border border-warm-grey dark:border-[#41413B] bg-stone dark:bg-[#222320]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                alt="Palakkad green landscape"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="font-display block text-lg">
                  {language === "ml" ? "പാലക്കാടൻ ഭൂപ്രകൃതി" : "Scenic Palakkad Plains"}
                </span>
                <span className="text-white/80 text-[11px] font-mono">
                  Paddy fields stretching toward Western Ghats foothills
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ADMINISTRATIVE TALUKS DIRECTORY */}
      <section aria-labelledby="taluks-heading" className="space-y-6">
        <div className="max-w-2xl">
          <Badge variant="copper" className="mb-2">
            {language === "ml" ? "ഭരണ സംവിധാനം" : "Administrative Divisions"}
          </Badge>
          <h2
            id="taluks-heading"
            className="font-display text-3xl sm:text-4xl text-charcoal dark:text-[#F4F1E9]"
          >
            {language === "ml" ? "പ്രധാന താലൂക്കുകൾ" : "Key Regional Taluks"}
          </h2>
          <p className="text-slate dark:text-[#C6C5BD] text-sm mt-1">
            {language === "ml"
              ? "പാലക്കാട് ജില്ലയിലെ പ്രധാന ഭരണ-റവന്യൂ താലൂക്കുകളും അവയുടെ സവിശേഷതകളും."
              : "Administrative taluks and civic centers serving residents across the constituency."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {palakkadTaluks.map((taluk) => (
            <div
              key={taluk.headquarters}
              className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 shadow-xs hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl text-charcoal dark:text-[#F4F1E9]">
                    {getLocalized(taluk.name)}
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-stone dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] border border-warm-grey dark:border-[#41413B] px-2 py-0.5 rounded-xs font-semibold">
                    Taluk HQ
                  </span>
                </div>
                <div className="text-xs text-slate dark:text-[#A09F97] mb-2">
                  Headquarters: <strong className="text-charcoal dark:text-[#F4F1E9] font-semibold">{taluk.headquarters}</strong>
                </div>
                <p className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed border-t border-warm-grey dark:border-[#41413B] pt-2.5">
                  {taluk.features}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: DOCUMENTED DEVELOPMENT PROJECTS */}
      <section id="projects" aria-labelledby="projects-heading" className="space-y-6 pt-6 border-t border-warm-grey dark:border-[#41413B]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="copper">
              {language === "ml" ? "പദ്ധതി നിരീക്ഷണം" : "Project Transparency"}
            </Badge>
            <span className="text-xs text-slate dark:text-[#A09F97] font-mono font-semibold">Public Works Accountability</span>
          </div>
          <h2
            id="projects-heading"
            className="font-display text-3xl sm:text-4xl text-charcoal dark:text-[#F4F1E9]"
          >
            {language === "ml"
              ? "അംഗീകൃത വികസന പദ്ധതികൾ"
              : "Documented Development Projects"}
          </h2>
          <p className="text-slate dark:text-[#C6C5BD] text-sm mt-1 max-w-3xl leading-relaxed">
            {language === "ml"
              ? "മണ്ഡലത്തിൽ നടപ്പാക്കപ്പെടുന്ന അടിസ്ഥാന സൗകര്യ പദ്ധതികളുടെ പുരോഗതി, അനുമതി തീയതി, ഉത്തരവാദിത്തപ്പെട്ട വകുപ്പുകൾ എന്നിവയുടെ ഔദ്യോഗിക വിവരങ്ങൾ."
              : "Track documented development works including water networks, transportation infrastructure, and healthcare modernization with verified source attributions."}
          </p>
        </div>

        <ProjectTracker projects={mockProjects} />
      </section>

      {/* SECTION 4: PUBLIC SERVICE RESOURCES & HELPLINE DIRECTORY */}
      <section id="resources" aria-labelledby="resources-heading" className="space-y-6 pt-6 border-t border-warm-grey dark:border-[#41413B]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="copper">
              {language === "ml" ? "സേവന ഡയറക്ടറി" : "Citizen Helpline & Services"}
            </Badge>
            <span className="text-xs text-slate dark:text-[#A09F97] font-mono font-semibold">Verified Civic Contacts</span>
          </div>
          <h2
            id="resources-heading"
            className="font-display text-3xl sm:text-4xl text-charcoal dark:text-[#F4F1E9]"
          >
            {language === "ml" ? "അവശ്യ പൊതുജന സേവനങ്ങൾ" : "Public Service Directory"}
          </h2>
          <p className="text-slate dark:text-[#C6C5BD] text-sm mt-1 max-w-3xl leading-relaxed">
            {language === "ml"
              ? "ജില്ലാ കളക്ടറേറ്റ്, പോലീസ്, അഗ്നിരക്ഷാ സേന, വാട്ടർ അതോറിറ്റി, കെ.എസ്.ഇ.ബി എന്നിവയുടെ പരിശോധിച്ച ഫോൺ നമ്പറുകളും വിലാസങ്ങളും."
              : "Direct access numbers and official locations for essential administrative, utility, healthcare, and emergency services in Palakkad."}
          </p>
        </div>

        <ResourceDirectory resources={publicResources} />
      </section>
    </div>
  );
}
