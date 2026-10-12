"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail, Clock, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer
      aria-label="Site Footer"
      className="bg-[#242522] text-[#F4F1E9] dark:bg-[#161715] dark:text-[#F4F1E9] border-t border-[#41413B] mt-auto text-sm font-sans"
    >
      {/* Top Editorial Banner */}
      <div className="border-b border-[#41413B] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-col leading-none">
                <span className="font-display text-3xl sm:text-4xl text-[#F4F1E9] tracking-tight">
                  RAMESH PISHARADY
                </span>
                <span className="text-xs font-semibold tracking-widest text-[#D29A78] uppercase mt-1">
                  {language === "ml"
                    ? "പാലക്കാട് മണ്ഡലം ഔദ്യോഗിക വിവര പോർട്ടൽ"
                    : "Palakkad Constituency · Official Representative Portal"}
                </span>
              </div>
              <p className="text-sm text-[#C6C5BD] leading-relaxed max-w-xl">
                {language === "ml"
                  ? "ഔദ്യോഗിക അറിയിപ്പുകൾ, പൊതു വിവരങ്ങൾ, വികസന പദ്ധതികൾ എന്നിവ ലഭ്യമാക്കാനുള്ള ജനസമ്പർക്ക വേദി."
                  : "A dedicated public information service providing verified announcements, civic resources, and direct communication channels with the representative office."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <Button
                href="/contact"
                variant="outline-light"
                size="md"
                icon={<ArrowUpRight className="w-4 h-4" aria-hidden="true" />}
              >
                {language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Contact the Secretariat"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Purpose & Prototype Note */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#D29A78] border-b border-[#41413B] pb-2">
              {language === "ml" ? "പോർട്ടൽ ദൗത്യം" : "Portal Standards"}
            </h2>
            <p className="text-xs leading-relaxed text-[#C6C5BD]">
              {language === "ml"
                ? "പൊതുജനങ്ങളിലേക്ക് കൃത്യമായ വിവരങ്ങൾ എത്തിക്കുന്നതിനും മണ്ഡലത്തിലെ വികസന പുരോഗതി സുതാര്യമായി പങ്കുവെക്കുന്നതിനും വേണ്ടി സജ്ജമാക്കിയത്."
                : "Engineered to deliver high editorial clarity, accessibility, and public accountability for citizens across Palakkad, Chittur, Alathur, Ottapalam, Mannarkkad, and Pattambi."}
            </p>
            <div className="p-3 bg-[#2C2D29] rounded-xs border border-[#41413B] text-[11px] text-[#C6C5BD] leading-normal flex items-start gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Official Legislative Service:</strong> Office of Shri Ramesh Pisharady, MLA representing Palakkad (16th Kerala Legislative Assembly).
              </span>
            </div>

            {/* Verified Public Figure Profiles */}
            <div className="pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D29A78] block mb-1.5">
                {language === "ml" ? "പബ്ലിക് മീഡിയ പ്രൊഫൈലുകൾ" : "Public & Artist Profiles"}
              </span>
              <p className="text-[11px] text-[#A09F97] mb-2 leading-relaxed">
                {language === "ml"
                  ? "കലാ-പൊതുപ്രവർത്തന ചാനലുകൾ (ഔദ്യോഗിക ഭരണപരമായ പരാതികൾക്കല്ല)"
                  : "Public figure & creative channels (not for official constituent petitions)"}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.instagram.com/rameshpisharody/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#2C2D29] hover:bg-[#383934] text-[#F4F1E9] hover:text-[#D29A78] text-xs rounded-xs border border-[#41413B] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D29A78]"
                  aria-label="Instagram Profile @rameshpisharody (opens in new tab)"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/RameshPisharodyofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#2C2D29] hover:bg-[#383934] text-[#F4F1E9] hover:text-[#D29A78] text-xs rounded-xs border border-[#41413B] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D29A78]"
                  aria-label="Facebook Page @RameshPisharodyofficial (opens in new tab)"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#D29A78] border-b border-[#41413B] pb-2">
              {language === "ml" ? "പ്രധാന ലിങ്കുകൾ" : "Navigation"}
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#D29A78] text-[#C6C5BD] transition-colors flex items-center justify-between py-0.5 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]">
                  <span>{t("navHome")}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D29A78] text-[#C6C5BD] transition-colors flex items-center justify-between py-0.5 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]">
                  <span>{t("navAbout")}</span>
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#D29A78] text-[#C6C5BD] transition-colors flex items-center justify-between py-0.5 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]">
                  <span>{t("navNews")}</span>
                </Link>
              </li>
              <li>
                <Link href="/constituency" className="hover:text-[#D29A78] text-[#C6C5BD] transition-colors flex items-center justify-between py-0.5 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]">
                  <span>{t("navConstituency")}</span>
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-[#D29A78] text-[#C6C5BD] transition-colors flex items-center justify-between py-0.5 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]">
                  <span>{t("navActivities")}</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#D29A78] text-[#C6C5BD] transition-colors flex items-center justify-between py-0.5 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]">
                  <span>{t("navGallery")}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D29A78] text-[#C6C5BD] transition-colors flex items-center justify-between py-0.5 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]">
                  <span>{t("navContact")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Office Contact */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#D29A78] border-b border-[#41413B] pb-2">
              {language === "ml" ? "ഓഫീസ് വിലാസം" : "Office Particulars"}
            </h2>
            <div className="space-y-3 text-xs text-[#F4F1E9]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold block text-[#F4F1E9]">
                    {language === "ml" ? "മണ്ഡലം ഓഫീസ് വിലാസം" : "Constituency Office Address"}
                  </span>
                  <span className="text-[#C6C5BD] leading-relaxed block">
                    {language === "ml"
                      ? "6, പാലക്കാട്-ചിറ്റൂർ റോഡ്, ദുർഗ്ഗ നഗർ, കിണത്തുപറമ്പ്, മണപ്പുള്ളിക്കാവ്, പാലക്കാട്, കേരളം - പിൻ: 678013"
                      : "6, Palakkad-Chittur Road, Durga Nagar, Kenathuparambu, Manapullikavu, Palakkad, Kerala – PIN: 678013"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold block text-[#F4F1E9]">
                    {language === "ml" ? "ഔദ്യോഗിക ഫോൺ നമ്പർ" : "Official Telephone"}
                  </span>
                  <a href="tel:+919072678001" className="text-[#F4F1E9] hover:text-[#D29A78] block font-mono font-semibold transition-colors">
                    +91 90726 78001
                  </a>
                  <span className="text-[#A09F97] text-[11px] block">
                    {language === "ml" ? "കേരള നിയമസഭാ ഡയറക്ടറി രേഖ" : "Kerala Legislative Assembly Directory"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold block text-[#F4F1E9]">
                    {language === "ml" ? "ഇലക്ട്രോണിക് സമ്പർക്കം" : "Electronic Correspondence"}
                  </span>
                  <span className="text-[#C6C5BD] block leading-relaxed">
                    {language === "ml"
                      ? "നിയമസഭാ ഡയറക്ടറിയിൽ നേരിട്ടുള്ള ഇമെയിൽ ലഭ്യമല്ല · ഹെൽപ്പ്‌ലൈൻ: +91 90726 78001"
                      : "Direct email not listed in Assembly Directory · Enquiries via Helpline: +91 90726 78001"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D29A78] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold block text-[#F4F1E9]">
                    {language === "ml" ? "സന്ദർശന സമയം" : "Visiting & Public Hours"}
                  </span>
                  <span className="text-[#C6C5BD] block leading-relaxed">
                    {language === "ml"
                      ? "മുൻകൂട്ടിയുള്ള അനുമതി പ്രകാരം · ഔദ്യോഗിക ഹെൽപ്പ്‌ലൈൻ (+91 90726 78001) മുഖേന"
                      : "By prior appointment · Enquiries via official helpline (+91 90726 78001)"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer Bar */}
      <div className="border-t border-[#41413B] bg-[#1C1D1A] dark:bg-[#121311] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C6C5BD]">
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
            <span>{t("copyright")}</span>
            <span className="hidden sm:inline text-[#41413B]">•</span>
            <Link href="/privacy-policy" className="hover:text-[#F4F1E9] underline underline-offset-2 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]">
              {t("privacyPolicy")}
            </Link>
            <span className="hidden sm:inline text-[#41413B]">•</span>
            <Link href="/accessibility" className="hover:text-[#F4F1E9] underline underline-offset-2 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78]">
              {t("accessibilityStatement")}
            </Link>
          </div>

          <div className="flex items-center gap-2 text-center sm:text-right">
            <span>
              Website Designed &amp; Developed by{" "}
              <strong className="text-[#F4F1E9] font-bold tracking-wide">HexaKode</strong>
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D29A78]"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
