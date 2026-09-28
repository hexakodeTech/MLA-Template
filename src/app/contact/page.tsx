"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  const { language, t } = useLanguage();

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-ivory dark:bg-[#111C18] text-charcoal dark:text-[#F5F2E9]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("navContact") }]} />

      {/* Header */}
      <div className="border-b border-sage-border dark:border-[#35463C] pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="forest">
            {language === "ml" ? "സമ്പർക്കം" : "Official Communications"}
          </Badge>
          <Badge variant="sample">
            {language === "ml" ? "സ്ഥിരീകരണത്തിന് വിധേയം" : "Placeholders Awaiting Confirmation"}
          </Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-[#F5F2E9] tracking-tight">
          {language === "ml"
            ? "ഓഫീസുമായി ബന്ധപ്പെടുക"
            : "Get in Touch with the Office"}
        </h1>
        <p className="mt-4 text-charcoal-muted dark:text-[#C3CDC4] text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          {language === "ml"
            ? "ശ്രീ രമേഷ് പിഷാരടിയുടെ മണ്ഡലം ഓഫീസിലേക്കുള്ള ഔദ്യോഗിക ആശയവിനിമയ മാർഗ്ഗങ്ങൾ, സന്ദർശന വിവരങ്ങൾ, പൊതു പരാതി സമർപ്പണം."
            : "Official contact directory, visiting schedules, and online enquiry submission channels for the office of Shri Ramesh Pisharady in Palakkad."}
        </p>
      </div>

      {/* Main Grid: Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#182720] rounded-sm border border-sage-border dark:border-[#35463C] p-6 sm:p-7 shadow-xs space-y-6">
            <h2 className="font-display text-2xl text-charcoal dark:text-[#F5F2E9] border-b border-sage-border dark:border-[#35463C] pb-3">
              {language === "ml" ? "ഔദ്യോഗിക മേൽവിലാസം" : "Secretariat Contact Directory"}
            </h2>

            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xs bg-forest/10 dark:bg-[#21342A] text-forest dark:text-[#8CB99B] flex items-center justify-center shrink-0 border border-forest/20 dark:border-[#35463C]">
                <MapPin className="w-4 h-4 text-forest dark:text-[#8CB99B]" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-charcoal dark:text-[#F5F2E9] block">
                  {language === "ml" ? "മണ്ഡലം ഓഫീസ് വിലാസം" : "Constituency Office Address"}
                </span>
                <p className="text-charcoal-muted dark:text-[#C3CDC4] mt-1 leading-relaxed">
                  [To be confirmed by the office]
                  <br />
                  Office of Shri Ramesh Pisharady
                  <br />
                  Palakkad District, Kerala – PIN: 678001
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-sage-border dark:border-[#35463C]">
              <div className="w-9 h-9 rounded-xs bg-forest/10 dark:bg-[#21342A] text-forest dark:text-[#8CB99B] flex items-center justify-center shrink-0 border border-forest/20 dark:border-[#35463C]">
                <Phone className="w-4 h-4 text-forest dark:text-[#8CB99B]" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-charcoal dark:text-[#F5F2E9] block">
                  {language === "ml" ? "ഔദ്യോഗിക ഫോൺ നമ്പർ" : "Official Telephone"}
                </span>
                <p className="text-charcoal-muted dark:text-[#C3CDC4] mt-0.5">
                  [Verified official telephone to be published]
                </p>
                <p className="font-mono text-charcoal dark:text-[#F5F2E9] mt-1">Demo: +91 491 2500000</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-sage-border dark:border-[#35463C]">
              <div className="w-9 h-9 rounded-xs bg-forest/10 dark:bg-[#21342A] text-forest dark:text-[#8CB99B] flex items-center justify-center shrink-0 border border-forest/20 dark:border-[#35463C]">
                <Mail className="w-4 h-4 text-forest dark:text-[#8CB99B]" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-charcoal dark:text-[#F5F2E9] block">
                  {language === "ml" ? "ഇമെയിൽ വിലാസം" : "Official Email"}
                </span>
                <p className="text-charcoal-muted dark:text-[#C3CDC4] mt-0.5">
                  [Official electronic mail to be updated]
                </p>
                <p className="font-mono text-charcoal dark:text-[#F5F2E9] mt-1">
                  office.pisharady@demo.gov.in
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-sage-border dark:border-[#35463C]">
              <div className="w-9 h-9 rounded-xs bg-forest/10 dark:bg-[#21342A] text-forest dark:text-[#8CB99B] flex items-center justify-center shrink-0 border border-forest/20 dark:border-[#35463C]">
                <Clock className="w-4 h-4 text-forest dark:text-[#8CB99B]" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-charcoal dark:text-[#F5F2E9] block">
                  {language === "ml" ? "ഓഫീസ് പ്രവർത്തന സമയം" : "Working & Visiting Hours"}
                </span>
                <p className="text-charcoal-muted dark:text-[#C3CDC4] mt-1 leading-relaxed">
                  Monday to Friday: 09:30 AM – 05:00 PM
                  <br />
                  <span className="text-charcoal-light dark:text-[#99A99D] text-xs">
                    (Public Visiting Hours: 10:00 AM – 01:00 PM [Tentative])
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Direct Numbers Card */}
          <div className="bg-sage/25 dark:bg-[#182720] rounded-sm border border-sage-border dark:border-[#35463C] p-5 space-y-3 text-xs">
            <h3 className="font-bold text-charcoal dark:text-[#F5F2E9] uppercase tracking-wider text-xs">
              {language === "ml" ? "അടിയന്തിര നമ്പറുകൾ" : "Emergency Quick Dial"}
            </h3>
            <p className="text-charcoal-muted dark:text-[#C3CDC4]">
              For emergency law &amp; order or fire response, contact round-the-clock control desks directly:
            </p>
            <div className="grid grid-cols-2 gap-2 text-charcoal dark:text-[#F5F2E9] font-semibold pt-1">
              <div className="bg-white dark:bg-[#21342A] p-2.5 rounded-xs border border-sage-border dark:border-[#35463C]">
                Police: <span className="text-forest dark:text-[#8CB99B] font-bold">112</span>
              </div>
              <div className="bg-white dark:bg-[#21342A] p-2.5 rounded-xs border border-sage-border dark:border-[#35463C]">
                Fire: <span className="text-forest dark:text-[#8CB99B] font-bold">101</span>
              </div>
              <div className="bg-white dark:bg-[#21342A] p-2.5 rounded-xs border border-sage-border dark:border-[#35463C]">
                Ambulance: <span className="text-forest dark:text-[#8CB99B] font-bold">108</span>
              </div>
              <div className="bg-white dark:bg-[#21342A] p-2.5 rounded-xs border border-sage-border dark:border-[#35463C]">
                KSEB Outage: <span className="text-forest dark:text-[#8CB99B] font-bold">1912</span>
              </div>
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
