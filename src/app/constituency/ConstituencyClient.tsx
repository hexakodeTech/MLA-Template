"use client";

import React from "react";
import Link from "next/link";
import { Info, ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ProjectTracker } from "@/components/constituency/ProjectTracker";
import { ResourceDirectory } from "@/components/constituency/ResourceDirectory";
import {
  mockProjects,
  publicResources,
  palakkadTaluks,
  constituencyLocalBodies,
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
            {language === "ml" ? "മണ്ഡല വിവരങ്ങൾ · LAC 056" : "Constituency Information Hub · LAC 056"}
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
            ? "പാലക്കാട് നിയമസഭാ മണ്ഡലത്തിന്റെ (LAC 056) ഭരണപരമായ ഘടന, തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങൾ, ഔദ്യോഗിക പൗരസേവന ഡയറക്ടറി എന്നിവ ഇവിടെ ലഭ്യമാണ്."
            : "Verified electoral profile, administrative composition (LAC 056), public works transparency, and official citizen service directories for Palakkad."}
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
                ? "ചരിത്രപ്രസിദ്ധമായ പാലക്കാട് കോട്ട (കോട്ടമൈതാനം), പൈതൃക ഗ്രാമമായ കൽപ്പാത്തി, ഗവ. വിക്ടോറിയ കോളേജ് എന്നിവ നിയോജകമണ്ഡലത്തിന്റെ പ്രധാന അടയാളങ്ങളാണ്. കൽപ്പാത്തിപ്പുഴയുടെ തീരങ്ങളും സാംസ്കാരിക കേന്ദ്രങ്ങളും മണ്ഡലത്തിന്റെ പൈതൃകം വിളിച്ചോതുന്നു."
                : "From the historic granite ramparts of Palakkad Fort and the timeless agraharams of Kalpathy Heritage Village to esteemed educational institutions like Government Victoria College, the constituency blends enduring cultural traditions with modern civic life along the Kalpathy and Bharathapuzha river basins."}
            </p>

            <div className="p-4 rounded-sm bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] text-xs text-charcoal dark:text-[#F4F1E9] flex items-start gap-3 shadow-xs">
              <Info className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-slate dark:text-[#C6C5BD]">
                {language === "ml" ? (
                  <span>
                    <strong className="text-charcoal dark:text-[#F4F1E9]">ഔദ്യോഗിക സ്ഥിതിവിവരക്കണക്കുകൾ:</strong> ജനസംഖ്യാശാസ്‌ത്രപരവും ഭരണപരവുമായ വിവരങ്ങൾ ഡിലിമിറ്റേഷൻ കമ്മീഷൻ ഉത്തരവ് (2008), ചീഫ് ഇലക്ടറൽ ഓഫീസർ കേരളം, റവന്യൂ വകുപ്പ് എന്നിവയുടെ ഔദ്യോഗിക ഗസറ്റ് രേഖകളെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്.
                  </span>
                ) : (
                  <span>
                    <strong className="text-charcoal dark:text-[#F4F1E9]">Official Public Records:</strong> All electoral, administrative, and geographic boundary data are compiled from the Delimitation Commission of India (Order 2008), Chief Electoral Officer (CEO Kerala), and official Government of Kerala Revenue gazettes.
                  </span>
                )}
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

      {/* SECTION 2: OFFICIAL CONSTITUENCY COMPOSITION (LAC 056) */}
      <section aria-labelledby="constituency-composition-heading" className="space-y-6 pt-6 border-t border-warm-grey dark:border-[#41413B]">
        <div className="max-w-3xl">
          <Badge variant="copper" className="mb-2">
            {language === "ml" ? "നിയോജകമണ്ഡല ഘടന (LAC 056)" : "Assembly Constituency Composition (LAC 056)"}
          </Badge>
          <h2
            id="constituency-composition-heading"
            className="font-display text-3xl sm:text-4xl text-charcoal dark:text-[#F4F1E9]"
          >
            {language === "ml" ? "തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങൾ" : "Local Self-Government Segments"}
          </h2>
          <p className="text-slate dark:text-[#C6C5BD] text-sm mt-1 leading-relaxed">
            {language === "ml"
              ? "ഡിലിമിറ്റേഷൻ കമ്മീഷൻ ഓഫ് ഇന്ത്യ (ഉത്തരവ് 2008), ചീഫ് ഇലക്ടറൽ ഓഫീസർ കേരളം എന്നിവ പ്രകാരം പാലക്കാട് നിയമസഭാ മണ്ഡലത്തിൽ (LAC 056) ഉൾപ്പെടുന്ന ഒരു നഗരസഭയും മൂന്ന് ഗ്രാമപഞ്ചായത്തുകളും:"
              : "As defined under the Delimitation Commission of India (Order 2008) and Chief Electoral Officer (CEO Kerala), Palakkad Assembly Constituency (LAC 056) comprises 1 Municipality and 3 Grama Panchayats across Palakkad and Alathur Taluks:"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {constituencyLocalBodies.map((body) => (
            <div
              key={body.id}
              className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-5 shadow-xs hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-copper/10 dark:bg-[#D29A78]/10 text-copper dark:text-[#D29A78] border border-copper/20 dark:border-[#D29A78]/20">
                    {getLocalized(body.bodyType)}
                  </span>
                  <span className="text-[10px] font-mono text-slate dark:text-[#A09F97] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-copper dark:text-[#D29A78]" aria-hidden="true" />
                    {getLocalized(body.taluk)}
                  </span>
                </div>
                <h3 className="font-display text-lg text-charcoal dark:text-[#F4F1E9]">
                  {getLocalized(body.name)}
                </h3>
                <p className="text-xs text-slate dark:text-[#C6C5BD] mt-2 leading-relaxed">
                  {getLocalized(body.description)}
                </p>
              </div>
              <div className="pt-2 border-t border-warm-grey/60 dark:border-[#41413B]/60 text-[10px] text-slate dark:text-[#A09F97] font-mono">
                {body.officialNotification}
              </div>
            </div>
          ))}
        </div>

        {/* Wider District Taluks Context */}
        <div className="pt-6 border-t border-dashed border-warm-grey dark:border-[#41413B] space-y-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-slate dark:text-[#A09F97] block">
              {language === "ml" ? "റവന്യൂ ജില്ലാ പശ്ചാത്തലം" : "Palakkad Revenue District Context"}
            </span>
            <h3 className="font-display text-xl sm:text-2xl text-charcoal dark:text-[#F4F1E9] mt-1">
              {language === "ml" ? "റവന്യൂ താലൂക്കുകൾ" : "Administrative Revenue Taluks"}
            </h3>
            <p className="text-xs text-slate dark:text-[#C6C5BD] mt-1 leading-relaxed">
              {language === "ml"
                ? "പാലക്കാട് റവന്യൂ ജില്ലയിൽ ആകെ 6 താലൂക്കുകളും 12 നിയമസഭാ മണ്ഡലങ്ങളുമുണ്ട്. മുകളിൽ വ്യക്തമാക്കിയതുപോലെ പാലക്കാട് നിയമസഭാ മണ്ഡലം (LAC 056) പാലക്കാട്, ആലത്തൂർ താലൂക്കുകളിലെ നിർദ്ദിഷ്ട മേഖലകളെയാണ് ഉൾക്കൊള്ളുന്നത്."
                : "Palakkad Revenue District encompasses 6 revenue taluks and 12 Assembly constituencies. For administrative context, the district taluk headquarters and civic cores are outlined below:"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {palakkadTaluks.map((taluk) => (
              <div
                key={taluk.headquarters}
                className="bg-stone/30 dark:bg-[#222320] rounded-sm border border-warm-grey dark:border-[#41413B] p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display text-base text-charcoal dark:text-[#F4F1E9]">
                      {getLocalized(taluk.name)}
                    </h4>
                    <span className="text-[10px] font-mono uppercase bg-stone dark:bg-[#2C2D29] text-charcoal dark:text-[#F4F1E9] border border-warm-grey dark:border-[#41413B] px-1.5 py-0.5 rounded-xs font-semibold">
                      District Taluk
                    </span>
                  </div>
                  <div className="text-xs text-slate dark:text-[#A09F97] mb-2">
                    Headquarters: <strong className="text-charcoal dark:text-[#F4F1E9] font-semibold">{taluk.headquarters}</strong>
                  </div>
                  <p className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed border-t border-warm-grey/60 dark:border-[#41413B]/60 pt-2">
                    {taluk.features}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
              ? "നിയമസഭാ മണ്ഡലത്തിലെ പൊതുമരാമത്ത്, അടിസ്ഥാന സൗകര്യ പദ്ധതികൾ ഔദ്യോഗിക ഭരണാനുമതിക്ക് ശേഷം ഇവിടെ പ്രസിദ്ധീകരിക്കുന്നു. അൺവെരിഫൈഡ് അല്ലെങ്കിൽ മാതൃകാ ഡാറ്റകൾ പൂർണ്ണമായും ഒഴിവാക്കിയിരിക്കുന്നു."
              : "Documented public infrastructure and constituency initiatives are published following formal departmental administrative sanctions and gazetted notifications. In accordance with public transparency standards, unverified sample entries are not listed."}
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

      {/* SECTION 5: RELATED CONSTITUENCY PORTALS & ENGAGEMENTS */}
      <section aria-labelledby="related-portals-heading" className="pt-8 border-t border-warm-grey dark:border-[#41413B] space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block">
            {language === "ml" ? "മണ്ഡലവുമായി ബന്ധപ്പെട്ടവ" : "Connected Portals"}
          </span>
          <h2
            id="related-portals-heading"
            className="font-display text-2xl sm:text-3xl text-charcoal dark:text-[#F4F1E9]"
          >
            {language === "ml" ? "കൂടുതൽ വിവരങ്ങളും സേവനങ്ങളും" : "Explore More Civic Resources"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/activities"
            className="group p-5 bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 transition-all flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-copper dark:text-[#D29A78] font-bold uppercase tracking-wider mb-2">
                <span>{language === "ml" ? "പ്രവർത്തനങ്ങൾ" : "Activities"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors">
                {language === "ml" ? "പൊതു പ്രവർത്തനങ്ങൾ" : "Public Engagements"}
              </h3>
              <p className="text-xs text-slate dark:text-[#C6C5BD] mt-2 leading-relaxed">
                {language === "ml" ? "മണ്ഡലത്തിലെ അവലോകന യോഗങ്ങളും സന്ദർശനങ്ങളും." : "On-site inspections, grama sabhas, and official delegations."}
              </p>
            </div>
          </Link>

          <Link
            href="/news"
            className="group p-5 bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 transition-all flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-copper dark:text-[#D29A78] font-bold uppercase tracking-wider mb-2">
                <span>{language === "ml" ? "അറിയിപ്പുകൾ" : "Announcements"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors">
                {language === "ml" ? "വാർത്തകളും അറിയിപ്പുകളും" : "News & Advisories"}
              </h3>
              <p className="text-xs text-slate dark:text-[#C6C5BD] mt-2 leading-relaxed">
                {language === "ml" ? "ഔദ്യോഗിക പത്രക്കുറിപ്പുകളും പ്രധാന അറിയിപ്പുകളും." : "Latest public statements, visiting hours, and advisories."}
              </p>
            </div>
          </Link>

          <Link
            href="/gallery"
            className="group p-5 bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 transition-all flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-copper dark:text-[#D29A78] font-bold uppercase tracking-wider mb-2">
                <span>{language === "ml" ? "ചിത്രശാല" : "Photo Gallery"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors">
                {language === "ml" ? "പാലക്കാടിന്റെ ചിത്രശാല" : "Visual Highlights"}
              </h3>
              <p className="text-xs text-slate dark:text-[#C6C5BD] mt-2 leading-relaxed">
                {language === "ml" ? "മണ്ഡലത്തിലെ വികസന കാഴ്ചകളും പൊതു നിമിഷങ്ങളും." : "Photographic records from community events and visits."}
              </p>
            </div>
          </Link>

          <Link
            href="/contact"
            className="group p-5 bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 transition-all flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-copper dark:text-[#D29A78] font-bold uppercase tracking-wider mb-2">
                <span>{language === "ml" ? "സമ്പർക്കം" : "Secretariat"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors">
                {language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Contact the Office"}
              </h3>
              <p className="text-xs text-slate dark:text-[#C6C5BD] mt-2 leading-relaxed">
                {language === "ml" ? "പരാതികളും നിവേദനങ്ങളും നേരിട്ട് സമർപ്പിക്കുക." : "Submit civic representations and request visiting appointments."}
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
