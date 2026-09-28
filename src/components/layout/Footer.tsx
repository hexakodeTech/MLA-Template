"use client";

import React from "react";
import Link from "next/link";
import { Landmark, Mail, Phone, MapPin, Clock, ShieldAlert, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer
      aria-label="Site Footer"
      className="bg-navy-950 text-slate-300 border-t border-navy-900 mt-auto text-sm"
    >
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Website Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-navy-800 text-gold-400 flex items-center justify-center font-bold text-lg border border-navy-700">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-serif font-bold text-lg tracking-tight">
                  Ramesh Pisharady
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {language === "ml"
                    ? "ജനപ്രതിനിധി ഔദ്യോഗിക വെബ്സൈറ്റ്"
                    : "Official Representative Portal"}
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              {language === "ml"
                ? "പൊതുജനങ്ങളിലേക്ക് ഔദ്യോഗിക അറിയിപ്പുകളും മണ്ഡല വിവരങ്ങളും എത്തിക്കുന്നതിനുള്ള സമഗ്രമായ വിവര വിനിമയ സംവിധാനം."
                : "A centralized public information and constituency portal providing verified announcements, civic resources, and direct communication channels with the representative office."}
            </p>

            <div className="p-3 bg-navy-900/80 rounded border border-navy-800 text-xs text-slate-300">
              <span className="font-semibold text-gold-400 flex items-center gap-1.5 mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                {language === "ml" ? "മാതൃകാ പോർട്ടൽ" : "Prototype Concept"}
              </span>
              <p className="text-[11px] text-slate-400 leading-normal">
                {language === "ml"
                  ? "ഈ വെബ്സൈറ്റ് ഹെക്സാകോഡ് (HexaKode) നിർമ്മിച്ച സാങ്കേതിക മാതൃകയാണ്. ഔദ്യോഗിക രേഖകൾ ഓഫീസിന്റെ സ്ഥിരീകരണത്തിന് വിധേയമാണ്."
                  : "Commissioned website proposal and functional prototype built by HexaKode. Bio and contact details are temporary placeholders."}
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider text-xs border-b border-navy-800 pb-2">
              {language === "ml" ? "പ്രധാന ലിങ്കുകൾ" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between py-1"
                >
                  <span>{t("navHome")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between py-1"
                >
                  <span>{t("navAbout")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between py-1"
                >
                  <span>{t("navNews")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/constituency"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between py-1"
                >
                  <span>{t("navConstituency")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/activities"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between py-1"
                >
                  <span>{t("navActivities")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between py-1"
                >
                  <span>{t("navGallery")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between py-1"
                >
                  <span>{t("navContact")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Office Contact Details */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs border-b border-navy-800 pb-2">
              {language === "ml" ? "ഓഫീസ് വിവരങ്ങൾ" : "Office Contact"}
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {language === "ml" ? "മണ്ഡലം ഓഫീസ്" : "Constituency Office"}
                  </span>
                  <span className="text-slate-400 leading-relaxed block">
                    [Address to be confirmed by office]
                    <br />
                    Palakkad District, Kerala – PIN: 678001
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {language === "ml" ? "ഫോൺ നമ്പർ" : "Official Telephone"}
                  </span>
                  <span className="text-slate-400 block">[Verified office number to be added]</span>
                  <span className="text-[11px] text-slate-500 font-mono">Demo: +91 491 2500000</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {language === "ml" ? "ഔദ്യോഗിക ഇമെയിൽ" : "Official Email"}
                  </span>
                  <span className="text-slate-400 block">[Official email pending confirmation]</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    office.pisharady@demo.gov.in
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {language === "ml" ? "ഓഫീസ് സമയം" : "Working Hours"}
                  </span>
                  <span className="text-slate-400 block">
                    Mon – Fri: 09:30 AM – 05:00 PM [Tentative]
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Legal & Verification Policy */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs border-b border-navy-800 pb-2">
              {language === "ml" ? "നിയമപരമായ വിവരങ്ങൾ" : "Legal & Standards"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between py-1"
                >
                  <span>{t("privacyPolicy")}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between py-1"
                >
                  <span>{t("accessibilityStatement")}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-navy-900">
              <span className="text-xs font-semibold text-slate-400 block mb-1">
                {language === "ml" ? "സോഷ്യൽ മീഡിയ പ്രസ്താവന" : "Social Media Notice"}
              </span>
              <p className="text-[11px] text-slate-400 leading-normal">
                {language === "ml"
                  ? "ഔദ്യോഗിക സോഷ്യൽ മീഡിയ അക്കൗണ്ടുകൾ ഓഫീസ് സ്ഥിരീകരിച്ച ശേഷം മാത്രമേ ഈ പോർട്ടലിൽ നൽകുകയുള്ളൂ."
                  : "Official social media handles will be linked once verified and authorized by the representative's secretariat."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-navy-900 bg-navy-950/90 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-center sm:text-left">{t("copyright")}</p>
          <div className="flex items-center gap-2 text-center sm:text-right">
            <span className="text-slate-400">
              Website Designed &amp; Developed by{" "}
              <strong className="text-slate-200 font-semibold tracking-wide">
                HexaKode
              </strong>
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-forest-600"></span>
            <span className="text-[10px] text-slate-400">Prototype v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
