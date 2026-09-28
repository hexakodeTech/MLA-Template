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
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("navContact") }]} />

      {/* Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="navy">
            {language === "ml" ? "സമ്പർക്കം" : "Official Communications"}
          </Badge>
          <Badge variant="sample">
            {language === "ml" ? "സ്ഥിരീകരണത്തിന് വിധേയം" : "Placeholders Awaiting Confirmation"}
          </Badge>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-navy-950 tracking-tight">
          {language === "ml"
            ? "ഓഫീസുമായി ബന്ധപ്പെടുക"
            : "Get in Touch with the Office"}
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
          {language === "ml"
            ? "ശ്രീ രമേഷ് പിഷാരടിയുടെ മണ്ഡലം ഓഫീസിലേക്കുള്ള ഔദ്യോഗിക ആശയവിനിമയ മാർഗ്ഗങ്ങൾ, സന്ദർശന വിവരങ്ങൾ, പൊതു പരാതി സമർപ്പണം."
            : "Official contact directory, visiting schedules, and online enquiry submission channels for the office of Shri Ramesh Pisharady in Palakkad."}
        </p>
      </div>

      {/* Main Grid: Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
            <h2 className="font-serif font-bold text-xl text-navy-950 border-b border-slate-100 pb-3">
              {language === "ml" ? "ഔദ്യോഗിക മേൽവിലാസം" : "Secretariat Contact Directory"}
            </h2>

            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 border border-navy-100">
                <MapPin className="w-4 h-4 text-forest-700" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-navy-950 block">
                  {language === "ml" ? "മണ്ഡലം ഓഫീസ് വിലാസം" : "Constituency Office Address"}
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  [To be confirmed by the office]
                  <br />
                  Office of Shri Ramesh Pisharady
                  <br />
                  Palakkad District, Kerala – PIN: 678001
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 border border-navy-100">
                <Phone className="w-4 h-4 text-forest-700" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-navy-950 block">
                  {language === "ml" ? "ഔദ്യോഗിക ഫോൺ നമ്പർ" : "Official Telephone"}
                </span>
                <p className="text-slate-500 mt-0.5">
                  [Verified official telephone to be published]
                </p>
                <p className="font-mono text-slate-700 mt-1">Demo: +91 491 2500000</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 border border-navy-100">
                <Mail className="w-4 h-4 text-forest-700" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-navy-950 block">
                  {language === "ml" ? "ഇമെയിൽ വിലാസം" : "Official Email"}
                </span>
                <p className="text-slate-500 mt-0.5">
                  [Official electronic mail to be updated]
                </p>
                <p className="font-mono text-slate-700 mt-1">
                  office.pisharady@demo.gov.in
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center shrink-0 border border-navy-100">
                <Clock className="w-4 h-4 text-forest-700" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-navy-950 block">
                  {language === "ml" ? "ഓഫീസ് പ്രവർത്തന സമയം" : "Working & Visiting Hours"}
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  Monday to Friday: 09:30 AM – 05:00 PM
                  <br />
                  <span className="text-slate-500 text-xs">
                    (Public Visiting Hours: 10:00 AM – 01:00 PM [Tentative])
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Direct Numbers Card */}
          <div className="bg-sand-100 rounded-xl border border-sand-300 p-5 space-y-3 text-xs">
            <h3 className="font-serif font-bold text-navy-950 uppercase tracking-wider text-xs">
              {language === "ml" ? "അടിയന്തിര നമ്പറുകൾ" : "Emergency Quick Dial"}
            </h3>
            <p className="text-slate-600">
              For emergency law &amp; order or fire response, contact round-the-clock control desks directly:
            </p>
            <div className="grid grid-cols-2 gap-2 text-slate-800 font-semibold pt-1">
              <div className="bg-white p-2 rounded border border-sand-300">
                Police Emergency: <span className="text-navy-900">112</span>
              </div>
              <div className="bg-white p-2 rounded border border-sand-300">
                Fire &amp; Rescue: <span className="text-navy-900">101</span>
              </div>
              <div className="bg-white p-2 rounded border border-sand-300">
                Ambulance: <span className="text-navy-900">108</span>
              </div>
              <div className="bg-white p-2 rounded border border-sand-300">
                KSEB Outage: <span className="text-navy-900">1912</span>
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
