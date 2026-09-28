"use client";

import React from "react";
import { Eye, Keyboard, Sparkles, Monitor } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

export default function AccessibilityPage() {
  const { language, t } = useLanguage();

  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("accessibilityStatement") }]} />

      {/* Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="green">Digital Inclusion</Badge>
          <Badge variant="navy">WCAG 2.1 AA Standards</Badge>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight">
          {language === "ml" ? "പ്രവേശനക്ഷമത പ്രസ്താവന" : "Accessibility Statement"}
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
          Commitment to ensuring an inclusive, barrier-free digital experience for all constituents, regardless of ability or assistive device.
        </p>
      </div>

      {/* Main Statement */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-lg text-navy-950">
            Our Commitment
          </h2>
          <p>
            The Office of Shri Ramesh Pisharady and its technology partner HexaKode are dedicated to ensuring that digital government services and public information are accessible to all citizens, including individuals with visual, auditory, cognitive, or motor impairments.
          </p>
          <p>
            This website is engineered to conform with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA specifications and adheres to modern semantic HTML5 architecture.
          </p>
        </section>

        {/* Technical Accessibility Features */}
        <section className="space-y-4">
          <h2 className="font-serif font-bold text-lg text-navy-950">
            Implemented Accessibility Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-sand-100/70 border border-sand-200 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-navy-950">
                <Keyboard className="w-4 h-4 text-forest-700" />
                <span>Full Keyboard Operability</span>
              </div>
              <p className="text-xs text-slate-600">
                All navigation menus, category filters, interactive modals, and forms can be navigated using Tab, Shift+Tab, Enter, and Escape keys.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sand-100/70 border border-sand-200 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-navy-950">
                <Eye className="w-4 h-4 text-forest-700" />
                <span>High Color Contrast</span>
              </div>
              <p className="text-xs text-slate-600">
                Text and interactive elements meet or exceed the minimum 4.5:1 contrast ratio against background surfaces for optimal legibility.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sand-100/70 border border-sand-200 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-navy-950">
                <Monitor className="w-4 h-4 text-forest-700" />
                <span>Semantic Landmarks &amp; ARIA</span>
              </div>
              <p className="text-xs text-slate-600">
                Clear landmarks (&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;) and descriptive ARIA attributes ensure seamless screen reader parsing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sand-100/70 border border-sand-200 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-navy-950">
                <Sparkles className="w-4 h-4 text-forest-700" />
                <span>Bilingual Unicode Typography</span>
              </div>
              <p className="text-xs text-slate-600">
                Full support for Malayalam Unicode typography (Noto Sans Malayalam) preventing font distortion or truncation on mobile screens.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-lg text-navy-950">
            Testing &amp; Compliance Status
          </h2>
          <p>
            While core accessibility patterns (visible focus rings, form error association, aria labels, and responsive scaling) are baked into this prototype, comprehensive third-party automated and manual screen reader audits (e.g. NVDA, JAWS, VoiceOver) are scheduled prior to official public launch.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-lg text-navy-950">
            Feedback and Assistance
          </h2>
          <p>
            If you encounter any difficulty accessing information or utilizing any feature on this website, please report the issue to our technical team via the{" "}
            <a href="/contact" className="text-navy-900 font-semibold underline">
              contact form
            </a>{" "}
            or email us with details of the assistive technology used.
          </p>
        </section>
      </div>
    </div>
  );
}
