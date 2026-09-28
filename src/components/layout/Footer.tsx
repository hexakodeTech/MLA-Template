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
      className="bg-forest-dark text-ivory dark:bg-[#10231A] dark:text-[#F5F2E9] border-t border-forest/40 dark:border-[#35463C] mt-auto text-sm font-sans"
    >
      {/* Top Editorial Banner */}
      <div className="border-b border-forest/30 dark:border-[#35463C]/80 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-col leading-none">
                <span className="font-display text-3xl sm:text-4xl text-ivory dark:text-[#F5F2E9] tracking-tight">
                  RAMESH PISHARADY
                </span>
                <span className="text-xs font-semibold tracking-widest text-sage dark:text-[#8CB99B] uppercase mt-1">
                  {language === "ml"
                    ? "പാലക്കാട് മണ്ഡലം ഔദ്യോഗിക വിവര പോർട്ടൽ"
                    : "Palakkad Constituency · Official Representative Portal"}
                </span>
              </div>
              <p className="text-sm text-ivory/80 dark:text-[#C3CDC4] leading-relaxed max-w-xl">
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
                icon={<ArrowUpRight className="w-4 h-4" />}
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
            <h4 className="text-xs font-bold uppercase tracking-widest text-sage dark:text-[#8CB99B] border-b border-forest/40 dark:border-[#35463C] pb-2">
              {language === "ml" ? "പോർട്ടൽ ദൗത്യം" : "Portal Standards"}
            </h4>
            <p className="text-xs leading-relaxed text-ivory/80 dark:text-[#C3CDC4]">
              {language === "ml"
                ? "പൊതുജനങ്ങളിലേക്ക് കൃത്യമായ വിവരങ്ങൾ എത്തിക്കുന്നതിനും മണ്ഡലത്തിലെ വികസന പുരോഗതി സുതാര്യമായി പങ്കുവെക്കുന്നതിനും വേണ്ടി സജ്ജമാക്കിയത്."
                : "Engineered to deliver high editorial clarity, accessibility, and public accountability for citizens across Palakkad, Chittur, Alathur, Ottapalam, Mannarkkad, and Pattambi."}
            </p>
            <div className="p-3 bg-forest-surface dark:bg-[#182720] rounded-xs border border-forest/50 dark:border-[#35463C] text-[11px] text-ivory/70 dark:text-[#99A99D] leading-normal flex items-start gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
              <span>
                <strong>Client Presentation Concept:</strong> Commissioned by HexaKode. Bio and contact particulars await final secretarial clearance.
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sage dark:text-[#8CB99B] border-b border-forest/40 dark:border-[#35463C] pb-2">
              {language === "ml" ? "പ്രധാന ലിങ്കുകൾ" : "Navigation"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-sage dark:hover:text-[#8CB99B] text-ivory/90 dark:text-[#F5F2E9] transition-colors flex items-center justify-between py-0.5">
                  <span>{t("navHome")}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sage dark:hover:text-[#8CB99B] text-ivory/90 dark:text-[#F5F2E9] transition-colors flex items-center justify-between py-0.5">
                  <span>{t("navAbout")}</span>
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-sage dark:hover:text-[#8CB99B] text-ivory/90 dark:text-[#F5F2E9] transition-colors flex items-center justify-between py-0.5">
                  <span>{t("navNews")}</span>
                </Link>
              </li>
              <li>
                <Link href="/constituency" className="hover:text-sage dark:hover:text-[#8CB99B] text-ivory/90 dark:text-[#F5F2E9] transition-colors flex items-center justify-between py-0.5">
                  <span>{t("navConstituency")}</span>
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-sage dark:hover:text-[#8CB99B] text-ivory/90 dark:text-[#F5F2E9] transition-colors flex items-center justify-between py-0.5">
                  <span>{t("navActivities")}</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-sage dark:hover:text-[#8CB99B] text-ivory/90 dark:text-[#F5F2E9] transition-colors flex items-center justify-between py-0.5">
                  <span>{t("navGallery")}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sage dark:hover:text-[#8CB99B] text-ivory/90 dark:text-[#F5F2E9] transition-colors flex items-center justify-between py-0.5">
                  <span>{t("navContact")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Office Contact */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sage dark:text-[#8CB99B] border-b border-forest/40 dark:border-[#35463C] pb-2">
              {language === "ml" ? "ഓഫീസ് വിലാസം" : "Office Particulars"}
            </h4>
            <div className="space-y-3 text-xs text-ivory/90 dark:text-[#F5F2E9]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-ivory dark:text-[#F5F2E9]">Constituency Secretariat</span>
                  <span className="text-ivory/70 dark:text-[#C3CDC4] leading-relaxed block">
                    [Address awaiting office confirmation] · Palakkad District, Kerala – PIN: 678001
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-ivory dark:text-[#F5F2E9]">Telephone Desk</span>
                  <span className="text-ivory/70 dark:text-[#C3CDC4] block">[Official phone to be published] · Demo: +91 491 2500000</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-ivory dark:text-[#F5F2E9]">Electronic Mail</span>
                  <span className="text-ivory/70 dark:text-[#C3CDC4] block">office.pisharady@demo.gov.in (Placeholder)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-ivory dark:text-[#F5F2E9]">Visiting Hours</span>
                  <span className="text-ivory/70 dark:text-[#C3CDC4] block">Mon – Fri: 09:30 AM – 05:00 PM (Public Hearings: 10:00 AM – 01:00 PM)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer Bar */}
      <div className="border-t border-forest/30 dark:border-[#35463C]/80 bg-forest-surface dark:bg-[#0c1a14] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/75 dark:text-[#C3CDC4]">
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
            <span>{t("copyright")}</span>
            <span className="hidden sm:inline text-forest/80 dark:text-[#35463C]">•</span>
            <Link href="/privacy-policy" className="hover:text-ivory dark:hover:text-[#F5F2E9] underline underline-offset-2">
              {t("privacyPolicy")}
            </Link>
            <span className="hidden sm:inline text-forest/80 dark:text-[#35463C]">•</span>
            <Link href="/accessibility" className="hover:text-ivory dark:hover:text-[#F5F2E9] underline underline-offset-2">
              {t("accessibilityStatement")}
            </Link>
          </div>

          <div className="flex items-center gap-2 text-center sm:text-right">
            <span>
              Website Designed &amp; Developed by{" "}
              <strong className="text-ivory dark:text-[#F5F2E9] font-bold tracking-wide">HexaKode</strong>
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-terracotta dark:bg-[#E19A76]"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
