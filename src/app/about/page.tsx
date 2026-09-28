"use client";

import React from "react";
import {
  Landmark,
  ShieldCheck,
  UserCheck,
  Building2,
  Clock,
  MapPin,
  Mail,
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
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-ivory dark:bg-[#111C18] text-charcoal dark:text-[#F5F2E9]">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: t("navAbout") }]} />

      {/* Page Header */}
      <div className="border-b border-sage-border dark:border-[#35463C] pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="forest">
            {language === "ml" ? "പ്രതിനിധി പ്രൊഫൈൽ" : "Official Profile"}
          </Badge>
          <Badge variant="sample">
            {language === "ml"
              ? "ഔദ്യോഗിക അംഗീകാരത്തിന് കാത്തിരിക്കുന്നു"
              : "Pending Office Approval"}
          </Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-[#F5F2E9] tracking-tight">
          {language === "ml" ? "ശ്രീ രമേഷ് പിഷാരടിയെക്കുറിച്ച്" : "About Shri Ramesh Pisharady"}
        </h1>
        <p className="mt-4 text-charcoal-muted dark:text-[#C3CDC4] text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          {language === "ml"
            ? "പാലക്കാട് മണ്ഡലത്തിലെ ജനങ്ങൾക്ക് സേവനമെത്തിക്കുന്നതിനായുള്ള ഔദ്യോഗിക വിവര ശേഖരം. അംഗീകൃത ജീവചരിത്രവും സംഘടനാ ചുമതലകളും ഉടൻ ചേർക്കുന്നതാണ്."
            : "Official background and public service responsibilities for the representative of Palakkad Constituency. Approved institutional biography will be published upon official confirmation."}
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Official Portrait & Verification Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#182720] rounded-sm border border-sage-border dark:border-[#35463C] p-3.5 shadow-xs">
            <div className="aspect-[3/4] rounded-xs overflow-hidden bg-sage/30 dark:bg-[#111C18] relative flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                alt="Representative Portrait Placeholder"
                className="w-full h-full object-cover filter contrast-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 right-3 bg-ivory/95 dark:bg-[#182720]/95 backdrop-blur-xs border border-sage-border dark:border-[#35463C] rounded-xs p-3 text-xs text-charcoal dark:text-[#F5F2E9]">
                <span className="font-bold text-terracotta dark:text-[#E19A76] block mb-0.5 uppercase tracking-wider text-[10px]">
                  {language === "ml" ? "മാതൃകാ ഛായാചിത്രം" : "Approved Portrait Notice"}
                </span>
                <span className="text-[11px] text-charcoal-muted dark:text-[#C3CDC4]">
                  {language === "ml"
                    ? "ഓഫീസ് സ്ഥിരീകരിച്ച ഔദ്യോഗിക ചിത്രം ഇവിടെ നൽകുന്നതാണ്."
                    : "High-resolution approved office portrait will replace this placeholder asset."}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-ivory dark:text-[#F5F2E9]">
                <p className="font-display text-2xl">
                  {getLocalized(representativeProfile.name)}
                </p>
                <p className="text-xs text-ivory/80 dark:text-[#C3CDC4] font-mono mt-0.5">
                  {getLocalized(representativeProfile.designationStatus)}
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Credentials Card */}
          <div className="bg-sage/25 dark:bg-[#182720] rounded-sm border border-sage-border dark:border-[#35463C] p-6 space-y-3.5 text-xs">
            <h3 className="font-bold text-xs text-charcoal dark:text-[#F5F2E9] uppercase tracking-widest border-b border-sage-border dark:border-[#35463C] pb-2">
              {language === "ml" ? "സ്ഥിരീകരണ പദവി" : "Verification & Office Status"}
            </h3>
            <ul className="space-y-2 text-charcoal-muted dark:text-[#C3CDC4] font-sans">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest dark:bg-[#8CB99B] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-charcoal dark:text-[#F5F2E9]">{language === "ml" ? "മണ്ഡലം:" : "Constituency:"}</strong>{" "}
                  Palakkad, Kerala, India
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest dark:bg-[#8CB99B] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-charcoal dark:text-[#F5F2E9]">{language === "ml" ? "ഓഫീസ് നിലവാരം:" : "Office Status:"}</strong> Active
                  Grievance &amp; Citizen Liaison Desk
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest dark:bg-[#8CB99B] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-charcoal dark:text-[#F5F2E9]">{language === "ml" ? "ഡിജിറ്റൽ പോർട്ടൽ:" : "Portal Phase:"}</strong> Prototype
                  Concept commissioned by HexaKode
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Structured Biography & Roles */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section: Official Biography Placeholder */}
          <section className="space-y-4">
            <h2 className="font-display text-3xl text-charcoal dark:text-[#F5F2E9]">
              {language === "ml" ? "ഔദ്യോഗിക ജീവചരിത്രം" : "Official Biography"}
            </h2>
            <div className="p-5 rounded-sm bg-terracotta-soft/30 dark:bg-terracotta/10 border border-terracotta/30 dark:border-[#E19A76]/30 text-charcoal dark:text-[#F5F2E9] text-sm leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-terracotta dark:text-[#E19A76]">
                <Info className="w-4 h-4 text-terracotta dark:text-[#E19A76] shrink-0" />
                <span>
                  {language === "ml"
                    ? "ഓഫീസ് ജീവചരിത്ര രേഖ"
                    : "Awaiting Verified Biography from the Office"}
                </span>
              </div>
              <p className="text-xs text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed">
                {language === "ml"
                  ? "ശ്രീ രമേഷ് പിഷാരടിയുടെ ഔദ്യോഗിക ജീവചരിത്രം, വിദ്യാഭ്യാസ പശ്ചാത്തലം, പൊതുപ്രവർത്തന നാൾവഴികൾ എന്നിവ ഓഫീസ് അനുമതി ലഭിക്കുന്ന മുറയ്ക്ക് ഇവിടെ പ്രസിദ്ധീകരിക്കും. തെറ്റായതോ സ്ഥിരീകരിക്കാത്തതോ ആയ വിവരങ്ങൾ ഒഴിവാക്കാനാണ് ഈ ക്രമീകരണം."
                  : "Official biography to be provided by the office. This website concept strictly refrains from fabricating personal histories, educational degrees, election claims, or political affiliations without verified documentation from the representative's authorized office."}
              </p>
            </div>
            <p className="text-charcoal-muted dark:text-[#C3CDC4] text-base leading-relaxed font-light">
              {language === "ml"
                ? "പാലക്കാടിന്റെ സമഗ്ര വികസനത്തിനും ജനങ്ങളുടെ ആവശ്യങ്ങൾ കൃത്യമായി സർക്കാരിലേക്ക് എത്തിക്കുന്നതിനുമുള്ള പ്രതിബദ്ധതയോടെയാണ് ഓഫീസ് പ്രവർത്തിക്കുന്നത്."
                : "Dedicated to the sustainable development of Palakkad, strengthening rural and urban infrastructure, supporting agrarian communities, and ensuring that public petitions receive swift and accountable attention."}
            </p>
          </section>

          {/* Section: Public Role and Responsibilities */}
          <section className="space-y-4 pt-6 border-t border-sage-border dark:border-[#35463C]">
            <h2 className="font-display text-2xl sm:text-3xl text-charcoal dark:text-[#F5F2E9]">
              {language === "ml"
                ? "പൊതു ചുമതലകളും പ്രവർത്തനങ്ങളും"
                : "Public Role & Institutional Responsibilities"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-sm bg-white dark:bg-[#182720] border border-sage-border dark:border-[#35463C] space-y-2">
                <div className="w-8 h-8 rounded-xs bg-forest dark:bg-[#8CB99B] text-ivory dark:text-[#10231A] flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h4 className="font-display text-lg text-charcoal dark:text-[#F5F2E9]">
                  {language === "ml" ? "ജനസമ്പർക്കവും പരാതി പരിഹാരവും" : "Constituency Grievance Redressal"}
                </h4>
                <p className="text-xs text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed">
                  {language === "ml"
                    ? "പൊതുജനങ്ങളിൽ നിന്നും നിവേദനങ്ങൾ സ്വീകരിച്ച് ബന്ധപ്പെട്ട വകുപ്പുകളിലേക്ക് ശുപാർശ ചെയ്യുകയും പരിഹാരം ഉറപ്പാക്കുകയും ചെയ്യുന്നു."
                    : "Direct reception and automated tracking of constituent representations across civic utilities, land revenue, and public health."}
                </p>
              </div>

              <div className="p-5 rounded-sm bg-white dark:bg-[#182720] border border-sage-border dark:border-[#35463C] space-y-2">
                <div className="w-8 h-8 rounded-xs bg-sage-dark dark:bg-[#53675A] text-charcoal dark:text-[#F5F2E9] flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <h4 className="font-display text-lg text-charcoal dark:text-[#F5F2E9]">
                  {language === "ml" ? "വികസന പദ്ധതി മേൽനോട്ടം" : "Infrastructure Review & Liaison"}
                </h4>
                <p className="text-xs text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed">
                  {language === "ml"
                    ? "ജലസേചനം, റോഡുകൾ, ആശുപത്രികൾ തുടങ്ങിയ പ്രധാന പൊതു നിർമ്മാണ പദ്ധതികളുടെ പുരോഗതി വിലയിരുത്തുന്നു."
                    : "Periodic on-site inspections of state and district public works to eliminate administrative hurdles and reduce implementation delays."}
                </p>
              </div>

              <div className="p-5 rounded-sm bg-white dark:bg-[#182720] border border-sage-border dark:border-[#35463C] space-y-2">
                <div className="w-8 h-8 rounded-xs bg-terracotta text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-display text-lg text-charcoal dark:text-[#F5F2E9]">
                  {language === "ml" ? "കാർഷിക-ഗ്രാമീണ ക്ഷേമം" : "Agrarian Support Services"}
                </h4>
                <p className="text-xs text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed">
                  {language === "ml"
                    ? "നെൽകൃഷി സംഭരണം, ജലവിതരണം, സബ്‌സിഡികൾ എന്നിവ കർഷകരിലേക്ക് എത്തിക്കാൻ കൃഷി വകുപ്പുമായി ചേർന്ന് പ്രവർത്തിക്കുന്നു."
                    : "Coordinating seasonal paddy procurement, crop insurance claims, and irrigation schedules with regional Krishi Bhavans."}
                </p>
              </div>

              <div className="p-5 rounded-sm bg-white dark:bg-[#182720] border border-sage-border dark:border-[#35463C] space-y-2">
                <div className="w-8 h-8 rounded-xs bg-charcoal dark:bg-[#21342A] text-ivory dark:text-[#F5F2E9] flex items-center justify-center font-bold">
                  <Landmark className="w-4 h-4" />
                </div>
                <h4 className="font-display text-lg text-charcoal dark:text-[#F5F2E9]">
                  {language === "ml" ? "സാംസ്കാരിക പൈതൃക സംരക്ഷണം" : "Heritage & Youth Engagement"}
                </h4>
                <p className="text-xs text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed">
                  {language === "ml"
                    ? "പാലക്കാടിന്റെ പരമ്പരാഗത കലാരൂപങ്ങളെയും ചരിത്ര സ്മാരകങ്ങളെയും പുതിയ തലമുറയ്ക്ക് പരിചയപ്പെടുത്തുന്ന പരിപാടികൾ."
                    : "Promoting traditional folk arts, historical monuments, and sporting youth forums throughout the Palakkad gap."}
                </p>
              </div>
            </div>
          </section>

          {/* Section: Official Office Information */}
          <section className="space-y-4 pt-6 border-t border-sage-border dark:border-[#35463C]">
            <h2 className="font-display text-2xl sm:text-3xl text-charcoal dark:text-[#F5F2E9]">
              {language === "ml" ? "ഓഫീസ് പ്രവർത്തന വിവരങ്ങൾ" : "Official Office Information"}
            </h2>
            <div className="bg-white dark:bg-[#182720] rounded-sm border border-sage-border dark:border-[#35463C] p-6 space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal dark:text-[#F5F2E9] block uppercase tracking-wider text-xs">
                    {language === "ml" ? "വിലാസം:" : "Constituency Secretariat:"}
                  </span>
                  <p className="text-charcoal-muted dark:text-[#C3CDC4] mt-1 leading-relaxed">
                    {getLocalized(representativeProfile.officeAddress)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-sage-border/50 dark:border-[#35463C]/50">
                <Clock className="w-4 h-4 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal dark:text-[#F5F2E9] block uppercase tracking-wider text-xs">
                    {language === "ml" ? "സന്ദർശന സമയം:" : "Office & Visiting Hours:"}
                  </span>
                  <p className="text-charcoal-muted dark:text-[#C3CDC4] mt-1">
                    {getLocalized(representativeProfile.officeHours)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-sage-border/50 dark:border-[#35463C]/50">
                <Mail className="w-4 h-4 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal dark:text-[#F5F2E9] block uppercase tracking-wider text-xs">
                    {language === "ml" ? "ഇമെയിൽ:" : "Electronic Correspondence:"}
                  </span>
                  <p className="text-charcoal-muted dark:text-[#C3CDC4] mt-1 font-mono text-xs">
                    {representativeProfile.officeEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4 text-ivory dark:text-[#10231A]" />}
              >
                {language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Contact the Secretariat"}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
