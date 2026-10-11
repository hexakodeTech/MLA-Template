"use client";

import React from "react";
import Image from "next/image";
import {
  Landmark,
  ShieldCheck,
  UserCheck,
  Building2,
  Clock,
  MapPin,
  Mail,
  Phone,
  Info,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { representativeProfile } from "@/data/mockData";

export default function AboutPage() {
  const { language, getLocalized, t } = useLanguage();

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: t("navAbout") }]} />

      {/* Page Header */}
      <div className="border-b border-warm-grey dark:border-[#41413B] pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="copper">
            {language === "ml" ? "പ്രതിനിധി പ്രൊഫൈൽ" : "Official Profile"}
          </Badge>
          <Badge variant="default">
            {language === "ml"
              ? "നിയമസഭാ സാമാജികൻ (എം.എൽ.എ)"
              : "Member of Legislative Assembly (MLA)"}
          </Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-[#F4F1E9] tracking-tight">
          {language === "ml" ? "ശ്രീ രമേഷ് പിഷാരടിയെക്കുറിച്ച്" : "About Shri Ramesh Pisharady"}
        </h1>
        <p className="mt-4 text-slate dark:text-[#C6C5BD] text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          {language === "ml"
            ? "പതിനാറാം കേരള നിയമസഭയിൽ പാലക്കാട് മണ്ഡലത്തെ പ്രതിനിധീകരിക്കുന്ന നിയമസഭാ സാമാജികൻ ശ്രീ രമേഷ് പിഷാരടിയുടെ ഔദ്യോഗിക ജീവചരിത്രവും പൊതുപ്രവർത്തന വിവരങ്ങളും."
            : "Official background, public service record, and legislative responsibilities of Shri Ramesh Pisharady, Member of the Kerala Legislative Assembly representing Palakkad Constituency (16th KLA)."}
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Official Portrait & Verification Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-3.5 shadow-xs">
            <div className="aspect-[3/4] rounded-xs overflow-hidden bg-stone dark:bg-[#222320] relative flex items-center justify-center">
              <Image
                src="/images/ramesh-pisharady-portrait.png"
                alt={
                  language === "ml"
                    ? "പാലക്കാട് നിയോജകമണ്ഡലത്തിന്റെ ജനപ്രതിനിധി ശ്രീ രമേഷ് പിഷാരടി, എം.എൽ.എ"
                    : "Shri Ramesh Pisharady, MLA representing Palakkad Constituency"
                }
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-top filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 right-3 bg-white/95 dark:bg-[#2C2D29]/95 backdrop-blur-xs border border-warm-grey dark:border-[#41413B] rounded-xs p-3 text-xs text-charcoal dark:text-[#F4F1E9]">
                <span className="font-bold text-copper dark:text-[#D29A78] block mb-0.5 uppercase tracking-wider text-[10px]">
                  {language === "ml" ? "ഔദ്യോഗിക ഛായാചിത്രം" : "Official Portrait"}
                </span>
                <span className="text-[11px] text-slate dark:text-[#C6C5BD]">
                  {language === "ml"
                    ? "പാലക്കാട് നിയോജകമണ്ഡലത്തിന്റെ ഔദ്യോഗിക ഛായാചിത്രം."
                    : "Official portrait of Shri Ramesh Pisharady, Palakkad Constituency."}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-display text-2xl">
                  {getLocalized(representativeProfile.name)}
                </p>
                <p className="text-xs text-white/80 font-mono mt-0.5">
                  {getLocalized(representativeProfile.designationStatus)}
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Credentials Card */}
          <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 space-y-3.5 text-xs shadow-xs">
            <h2 className="font-bold text-xs text-charcoal dark:text-[#F4F1E9] uppercase tracking-widest border-b border-warm-grey dark:border-[#41413B] pb-2">
              {language === "ml" ? "സ്ഥിരീകരിച്ച ഔദ്യോഗിക പദവികൾ" : "Verified Legislative Credentials"}
            </h2>
            <ul className="space-y-2 text-slate dark:text-[#C6C5BD] font-sans">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-copper dark:bg-[#D29A78] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-charcoal dark:text-[#F4F1E9]">{language === "ml" ? "നിയമസഭ:" : "Assembly:"}</strong>{" "}
                  16th Kerala Legislative Assembly
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-copper dark:bg-[#D29A78] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-charcoal dark:text-[#F4F1E9]">{language === "ml" ? "മണ്ഡലം:" : "Constituency:"}</strong>{" "}
                  Palakkad (LAC 056), Kerala
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-copper dark:bg-[#D29A78] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-charcoal dark:text-[#F4F1E9]">{language === "ml" ? "രാഷ്ട്രീയ പാർട്ടി:" : "Party Affiliation:"}</strong>{" "}
                  Indian National Congress (INC) / UDF
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-copper dark:bg-[#D29A78] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-charcoal dark:text-[#F4F1E9]">{language === "ml" ? "നിയമസഭാ സമിതി:" : "Committee Membership:"}</strong>{" "}
                  Committee on Official Language
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-copper dark:bg-[#D29A78] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-charcoal dark:text-[#F4F1E9]">{language === "ml" ? "ഔദ്യോഗിക ഫോൺ:" : "Official Phone:"}</strong>{" "}
                  +91 90726 78001 (Niyamasabha Directory)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Structured Biography & Roles */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section: Official Biography */}
          <section className="space-y-4">
            <h2 className="font-display text-3xl text-charcoal dark:text-[#F4F1E9]">
              {language === "ml" ? "ഔദ്യോഗിക ജീവചരിത്രം" : "Official Biography"}
            </h2>
            <div className="p-5 rounded-sm bg-stone/50 dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9] text-sm leading-relaxed space-y-3 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-copper dark:text-[#D29A78]">
                <ShieldCheck className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0" aria-hidden="true" />
                <span>
                  {language === "ml"
                    ? "സ്ഥിരീകരിച്ച പൊതുവിവര രേഖ"
                    : "Verified Public Record · Kerala Niyamasabha"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate dark:text-[#C6C5BD] leading-relaxed">
                {language === "ml"
                  ? "1981 ഒക്ടോബർ 1-ന് ടി.വി. ബാലകൃഷ്ണ പിഷാരടിയുടെയും രമ ബി. പിഷാരടിയുടെയും മകനായി ജനിച്ചു. തലയോലപ്പറമ്പ് ദേവസ്വം ബോർഡ് കോളേജിൽ നിന്നും പ്രീ-ഡിഗ്രി വിദ്യാഭ്യാസം പൂർത്തിയാക്കി. മലയാള ചലച്ചിത്ര-ടെലിവിഷൻ രംഗങ്ങളിൽ നടൻ, സംവിധായകൻ, ടെലിവിഷൻ അവതാരകൻ എന്നീ നിലകളിൽ ജനപ്രീതി നേടി."
                  : "Born on October 1, 1981 to T.V. Balakrishna Pisharody and Rema B. Pisharody in Kerala. Completed pre-degree education at Devaswom Board College, Thalayolaparambu. Rose to widespread prominence in Malayalam cinema and television as a celebrated actor, filmmaker, and television presenter."}
              </p>
              <p className="text-xs sm:text-sm text-slate dark:text-[#C6C5BD] leading-relaxed">
                {language === "ml"
                  ? "2021 ഫെബ്രുവരിയിൽ രമേശ് ചെന്നിത്തല നയിച്ച ഐശ്വര്യ കേരള യാത്രയിലൂടെയാണ് സജീവ രാഷ്ട്രീയത്തിലേക്ക് പ്രവേശിച്ചത്. 2026-ലെ കേരള നിയമസഭാ തിരഞ്ഞെടുപ്പിൽ യു.ഡി.എഫ് സ്ഥാനാർത്ഥിയായി പാലക്കാട് നിയോജകമണ്ഡലത്തിൽ നിന്ന് മത്സരിച്ച് വിജയിച്ച് നിയമസഭാ സാമാജികനായി (എം.എൽ.എ) ചുമതലയേറ്റു. കേരള നിയമസഭയുടെ ഔദ്യോഗിക ഭാഷാ സമിതി അംഗമായി സേവനമനുഷ്ഠിക്കുന്നു."
                  : "Formally entered active politics in February 2021 during the Aishwarya Kerala Yatra. In the 2026 Kerala Legislative Assembly elections, contested as the United Democratic Front (UDF) candidate for the Palakkad constituency, winning the mandate and assuming office as MLA in May 2026. Serves as a member of the Kerala Legislative Assembly Committee on Official Language."}
              </p>
            </div>
            <p className="text-slate dark:text-[#C6C5BD] text-base leading-relaxed font-light">
              {language === "ml"
                ? "പാലക്കാടിന്റെ കാർഷിക പൈതൃകം കാത്തുസൂക്ഷിക്കുന്നതിനൊപ്പം ശുദ്ധജല വിതരണം, അടിസ്ഥാന ഗതാഗതം, ആരോഗ്യ സൗകര്യങ്ങൾ എന്നിവ മെച്ചപ്പെടുത്തുന്നതിനും ജനങ്ങളുടെ നിവേദനങ്ങൾ വേഗത്തിൽ പരിഹരിക്കുന്നതിനും പ്രതിജ്ഞാബദ്ധമായി ഓഫീസ് പ്രവർത്തിക്കുന്നു."
                : "Dedicated to the comprehensive civic and economic development of Palakkad, strengthening agricultural irrigation, upgrading primary healthcare, expanding road transport links, and ensuring transparent grievance redressal for all constituents."}
            </p>
          </section>

          {/* Section: Public Role and Responsibilities */}
          <section className="space-y-4 pt-6 border-t border-warm-grey dark:border-[#41413B]">
            <h2 className="font-display text-2xl sm:text-3xl text-charcoal dark:text-[#F4F1E9]">
              {language === "ml"
                ? "പൊതു ചുമതലകളും പ്രവർത്തനങ്ങളും"
                : "Public Role & Institutional Responsibilities"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-sm bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-xs bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg text-charcoal dark:text-[#F4F1E9]">
                  {language === "ml" ? "ജനസമ്പർക്കവും പരാതി പരിഹാരവും" : "Constituency Grievance Redressal"}
                </h3>
                <p className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed">
                  {language === "ml"
                    ? "പൊതുജനങ്ങളിൽ നിന്നും നിവേദനങ്ങൾ സ്വീകരിച്ച് ബന്ധപ്പെട്ട വകുപ്പുകളിലേക്ക് ശുപാർശ ചെയ്യുകയും പരിഹാരം ഉറപ്പാക്കുകയും ചെയ്യുന്നു."
                    : "Direct reception and automated tracking of constituent representations across civic utilities, land revenue, and public health."}
                </p>
              </div>

              <div className="p-5 rounded-sm bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-xs bg-stone text-charcoal dark:bg-[#222320] dark:text-[#F4F1E9] border border-warm-grey dark:border-[#41413B] flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg text-charcoal dark:text-[#F4F1E9]">
                  {language === "ml" ? "വികസന പദ്ധതി മേൽനോട്ടം" : "Infrastructure Review & Liaison"}
                </h3>
                <p className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed">
                  {language === "ml"
                    ? "ജലസേചനം, റോഡുകൾ, ആശുപത്രികൾ തുടങ്ങിയ പ്രധാന പൊതു നിർമ്മാണ പദ്ധതികളുടെ പുരോഗതി വിലയിരുത്തുന്നു."
                    : "Periodic on-site inspections of state and district public works to eliminate administrative hurdles and reduce implementation delays."}
                </p>
              </div>

              <div className="p-5 rounded-sm bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-xs bg-copper text-white dark:bg-[#D29A78] dark:text-[#191A18] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg text-charcoal dark:text-[#F4F1E9]">
                  {language === "ml" ? "കാർഷിക-ഗ്രാമീണ ക്ഷേമം" : "Agrarian Support Services"}
                </h3>
                <p className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed">
                  {language === "ml"
                    ? "നെൽകൃഷി സംഭരണം, ജലവിതരണം, സബ്‌സിഡികൾ എന്നിവ കർഷകരിലേക്ക് എത്തിക്കാൻ കൃഷി വകുപ്പുമായി ചേർന്ന് പ്രവർത്തിക്കുന്നു."
                    : "Coordinating seasonal paddy procurement, crop insurance claims, and irrigation schedules with regional Krishi Bhavans."}
                </p>
              </div>

              <div className="p-5 rounded-sm bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-xs bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] flex items-center justify-center font-bold">
                  <Landmark className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg text-charcoal dark:text-[#F4F1E9]">
                  {language === "ml" ? "സാംസ്കാരിക പൈതൃക സംരക്ഷണം" : "Heritage & Youth Engagement"}
                </h3>
                <p className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed">
                  {language === "ml"
                    ? "പാലക്കാടിന്റെ പരമ്പരാഗത കലാരൂപങ്ങളെയും ചരിത്ര സ്മാരകങ്ങളെയും പുതിയ തലമുറയ്ക്ക് പരിചയപ്പെടുത്തുന്ന പരിപാടികൾ."
                    : "Promoting traditional folk arts, historical monuments, and sporting youth forums throughout the Palakkad gap."}
                </p>
              </div>
            </div>
          </section>

          {/* Section: Official Office Information */}
          <section className="space-y-4 pt-6 border-t border-warm-grey dark:border-[#41413B]">
            <h2 className="font-display text-2xl sm:text-3xl text-charcoal dark:text-[#F4F1E9]">
              {language === "ml" ? "ഓഫീസ് പ്രവർത്തന വിവരങ്ങൾ" : "Official Office Information"}
            </h2>
            <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 space-y-4 text-xs sm:text-sm shadow-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-charcoal dark:text-[#F4F1E9] block uppercase tracking-wider text-xs">
                    {language === "ml" ? "വിലാസം:" : "Constituency Secretariat:"}
                  </span>
                  <p className="text-slate dark:text-[#C6C5BD] mt-1 leading-relaxed">
                    {getLocalized(representativeProfile.officeAddress)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-warm-grey/60 dark:border-[#41413B]/60">
                <Clock className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-charcoal dark:text-[#F4F1E9] block uppercase tracking-wider text-xs">
                    {language === "ml" ? "സന്ദർശന സമയം:" : "Office & Visiting Hours:"}
                  </span>
                  <p className="text-slate dark:text-[#C6C5BD] mt-1">
                    {getLocalized(representativeProfile.officeHours)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-warm-grey/60 dark:border-[#41413B]/60">
                <Phone className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-charcoal dark:text-[#F4F1E9] block uppercase tracking-wider text-xs">
                    {language === "ml" ? "ഔദ്യോഗിക ഫോൺ നമ്പർ:" : "Official Telephone:"}
                  </span>
                  <a
                    href="tel:+919072678001"
                    className="text-slate dark:text-[#C6C5BD] hover:text-copper dark:hover:text-[#D29A78] mt-1 font-mono text-xs block transition-colors"
                  >
                    {representativeProfile.officePhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-warm-grey/60 dark:border-[#41413B]/60">
                <Mail className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-charcoal dark:text-[#F4F1E9] block uppercase tracking-wider text-xs">
                    {language === "ml" ? "ഇമെയിൽ:" : "Electronic Correspondence:"}
                  </span>
                  <p className="text-slate dark:text-[#C6C5BD] mt-1 font-mono text-xs">
                    {representativeProfile.officeEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4 text-white dark:text-[#191A18]" aria-hidden="true" />}
              >
                {language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Contact the Secretariat"}
              </Button>
              <Button
                href="/constituency"
                variant="outline"
                size="md"
              >
                {language === "ml" ? "മണ്ഡല വിവരങ്ങൾ കാണുക" : "View Constituency Profile"}
              </Button>
              <Button
                href="/activities"
                variant="outline"
                size="md"
              >
                {language === "ml" ? "പൊതു പ്രവർത്തനങ്ങൾ" : "Public Engagements"}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
