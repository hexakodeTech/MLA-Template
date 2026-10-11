"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  const { language, t } = useLanguage();

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("navContact") }]} />

      {/* Header */}
      <div className="border-b border-warm-grey dark:border-[#41413B] pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="copper">
            {language === "ml" ? "സമ്പർക്കം" : "Official Communications"}
          </Badge>
          <Badge variant="default">
            {language === "ml" ? "സ്ഥിരീകരിച്ച വിവരങ്ങൾ" : "Verified Directory"}
          </Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-[#F4F1E9] tracking-tight">
          {language === "ml"
            ? "ഓഫീസുമായി ബന്ധപ്പെടുക"
            : "Get in Touch with the Office"}
        </h1>
        <p className="mt-4 text-slate dark:text-[#C6C5BD] text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          {language === "ml"
            ? "പാലക്കാട് നിയോജകമണ്ഡലം എം.എൽ.എ ശ്രീ രമേഷ് പിഷാരടിയുടെ ഓഫീസിലേക്കുള്ള ഔദ്യോഗിക ആശയവിനിമയ മാർഗ്ഗങ്ങൾ, സന്ദർശന വിവരങ്ങൾ, സമ്പർക്ക ഡെസ്ക്."
            : "Official contact directory, visiting schedules, and correspondence desk for the office of Shri Ramesh Pisharady, MLA in Palakkad."}
        </p>
      </div>

      {/* Main Grid: Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 sm:p-7 shadow-xs space-y-6">
            <h2 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9] border-b border-warm-grey dark:border-[#41413B] pb-3">
              {language === "ml" ? "ഔദ്യോഗിക മേൽവിലാസം" : "Secretariat Contact Directory"}
            </h2>

            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xs bg-stone dark:bg-[#222320] text-copper dark:text-[#D29A78] flex items-center justify-center shrink-0 border border-warm-grey dark:border-[#41413B]">
                <MapPin className="w-4 h-4 text-copper dark:text-[#D29A78]" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block">
                  {language === "ml" ? "ഔദ്യോഗിക വിലാസം" : "Official Legislative Address"}
                </span>
                <p className="text-slate dark:text-[#C6C5BD] mt-1 leading-relaxed">
                  {language === "ml" ? (
                    <>
                      റൂം നമ്പർ 701, ചന്ദ്രഗിരി ബ്ലോക്ക്
                      <br />
                      ലെജിസ്ലേറ്റേഴ്‌സ് ഹോസ്റ്റൽ (LH), വികാസ് ഭവൻ പി.ഒ.
                      <br />
                      തിരുവനന്തപുരം, കേരളം - പിൻ: 695033
                      <br />
                      <span className="text-[11px] text-copper dark:text-[#D29A78] font-semibold">
                        · പാലക്കാട് നിയോജകമണ്ഡലം (LAC 056) ഡെസ്ക്
                      </span>
                    </>
                  ) : (
                    <>
                      Room No. 701, Chandragiri Block
                      <br />
                      Legislators&apos; Hostel (LH), Vikas Bhavan P.O.
                      <br />
                      Thiruvananthapuram, Kerala – PIN: 695033
                      <br />
                      <span className="text-[11px] text-copper dark:text-[#D29A78] font-semibold">
                        · Palakkad Assembly Constituency (LAC 056) Desk
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-warm-grey/60 dark:border-[#41413B]/60">
              <div className="w-9 h-9 rounded-xs bg-stone dark:bg-[#222320] text-copper dark:text-[#D29A78] flex items-center justify-center shrink-0 border border-warm-grey dark:border-[#41413B]">
                <Phone className="w-4 h-4 text-copper dark:text-[#D29A78]" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block">
                  {language === "ml" ? "ഔദ്യോഗിക ഫോൺ നമ്പർ" : "Official Telephone"}
                </span>
                <a
                  href="tel:+919072678001"
                  className="font-mono text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] mt-1 block font-semibold transition-colors"
                >
                  +91 90726 78001
                </a>
                <p className="text-slate dark:text-[#C6C5BD] text-xs mt-0.5">
                  {language === "ml" ? "കേരള നിയമസഭാ ഡയറക്ടറി രേഖ" : "Kerala Legislative Assembly Directory"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-warm-grey/60 dark:border-[#41413B]/60">
              <div className="w-9 h-9 rounded-xs bg-stone dark:bg-[#222320] text-copper dark:text-[#D29A78] flex items-center justify-center shrink-0 border border-warm-grey dark:border-[#41413B]">
                <Mail className="w-4 h-4 text-copper dark:text-[#D29A78]" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block">
                  {language === "ml" ? "ഇമെയിൽ / പൗരസമ്പർക്കം" : "Electronic Correspondence"}
                </span>
                <p className="text-slate dark:text-[#C6C5BD] mt-1 leading-relaxed">
                  {language === "ml"
                    ? "കേരള നിയമസഭാ ഡയറക്ടറിയിൽ നേരിട്ടുള്ള ഇമെയിൽ വിലാസം പ്രസിദ്ധീകരിച്ചിട്ടില്ല. വിവരങ്ങൾക്കും ഔദ്യോഗിക കാര്യങ്ങൾക്കും ഔദ്യോഗിക ഫോൺ നമ്പർ (+91 90726 78001) വഴിയോ താഴെയുള്ള ഫോം മുഖേന കരട് തയ്യാറാക്കിയോ ബന്ധപ്പെടുക."
                    : "Direct email is not listed in the official Kerala Legislative Assembly directory. Constituents and citizens are requested to communicate via the verified telephone helpline (+91 90726 78001) or prepare a correspondence draft using the form below."}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-warm-grey/60 dark:border-[#41413B]/60">
              <div className="w-9 h-9 rounded-xs bg-stone dark:bg-[#222320] text-copper dark:text-[#D29A78] flex items-center justify-center shrink-0 border border-warm-grey dark:border-[#41413B]">
                <Clock className="w-4 h-4 text-copper dark:text-[#D29A78]" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-charcoal dark:text-[#F4F1E9] block">
                  {language === "ml" ? "ഓഫീസ് പ്രവർത്തന സമയം" : "Working & Visiting Hours"}
                </span>
                <p className="text-slate dark:text-[#C6C5BD] mt-1 leading-relaxed">
                  {language === "ml"
                    ? "പൊതുജന സന്ദർശനങ്ങളും നിവേദനങ്ങളും മുൻകൂട്ടിയുള്ള അനുമതി പ്രകാരം ക്രമീകരിക്കുന്നു. വിവരങ്ങൾക്കും അപ്പോയിന്റ്മെന്റുകൾക്കും ഹെൽപ്പ്‌ലൈൻ നമ്പറിൽ (+91 90726 78001) ബന്ധപ്പെടുക."
                    : "Public representations and office visits are scheduled by prior appointment. For appointment scheduling and official enquiries, please contact the helpline (+91 90726 78001)."}
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Direct Numbers Card */}
          <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-5 space-y-3 text-xs shadow-xs">
            <h3 className="font-bold text-charcoal dark:text-[#F4F1E9] uppercase tracking-wider text-xs">
              {language === "ml" ? "അടിയന്തിര നമ്പറുകൾ" : "Emergency Quick Dial"}
            </h3>
            <p className="text-slate dark:text-[#C6C5BD]">
              For emergency law &amp; order or fire response, contact round-the-clock control desks directly:
            </p>
            <div className="grid grid-cols-2 gap-2 text-charcoal dark:text-[#F4F1E9] font-semibold pt-1">
              <div className="bg-stone/50 dark:bg-[#222320] p-2.5 rounded-xs border border-warm-grey dark:border-[#41413B]">
                Police: <span className="text-copper dark:text-[#D29A78] font-bold">112</span>
              </div>
              <div className="bg-stone/50 dark:bg-[#222320] p-2.5 rounded-xs border border-warm-grey dark:border-[#41413B]">
                Fire: <span className="text-copper dark:text-[#D29A78] font-bold">101</span>
              </div>
              <div className="bg-stone/50 dark:bg-[#222320] p-2.5 rounded-xs border border-warm-grey dark:border-[#41413B]">
                Ambulance: <span className="text-copper dark:text-[#D29A78] font-bold">108</span>
              </div>
              <div className="bg-stone/50 dark:bg-[#222320] p-2.5 rounded-xs border border-warm-grey dark:border-[#41413B]">
                KSEB Outage: <span className="text-copper dark:text-[#D29A78] font-bold">1912</span>
              </div>
            </div>
          </div>

          {/* Contextual Links to Constituency & About */}
          <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-5 space-y-3 shadow-xs">
            <h3 className="font-bold text-charcoal dark:text-[#F4F1E9] uppercase tracking-wider text-xs">
              {language === "ml" ? "കൂടുതൽ വിവരങ്ങൾ" : "Related Information"}
            </h3>
            <div className="space-y-2">
              <Link
                href="/constituency"
                className="group flex items-center justify-between text-xs text-slate dark:text-[#C6C5BD] hover:text-copper dark:hover:text-[#D29A78] transition-colors p-2 rounded-xs hover:bg-stone/40 dark:hover:bg-[#222320]"
              >
                <span>{language === "ml" ? "പൂർണ്ണ സേവന ഡയറക്ടറിയും മണ്ഡലം വിവരങ്ങളും" : "Complete Civic Directory & Helpline Contacts"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0 ml-2 text-copper dark:text-[#D29A78]" />
              </Link>
              <Link
                href="/about"
                className="group flex items-center justify-between text-xs text-slate dark:text-[#C6C5BD] hover:text-copper dark:hover:text-[#D29A78] transition-colors p-2 rounded-xs hover:bg-stone/40 dark:hover:bg-[#222320]"
              >
                <span>{language === "ml" ? "പ്രതിനിധിയുടെ ചുമതലകളും വിവരങ്ങളും" : "Representative Profile & Responsibilities"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0 ml-2 text-copper dark:text-[#D29A78]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
