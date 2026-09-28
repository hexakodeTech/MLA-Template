"use client";

import React from "react";
import { Eye, Keyboard, Sparkles, Monitor } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

export default function AccessibilityPage() {
  const { language, t } = useLanguage();

  return (
    <div className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-ivory dark:bg-[#111C18] text-charcoal dark:text-[#F5F2E9]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("accessibilityStatement") }]} />

      {/* Header */}
      <div className="border-b border-sage-border dark:border-[#35463C] pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="forest">Digital Inclusion</Badge>
          <Badge variant="sage">WCAG 2.1 AA Standards</Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal dark:text-[#F5F2E9] tracking-tight">
          {language === "ml" ? "പ്രവേശനക്ഷമത പ്രസ്താവന" : "Accessibility Statement"}
        </h1>
        <p className="mt-3 text-charcoal-muted dark:text-[#C3CDC4] text-sm sm:text-base leading-relaxed">
          Commitment to ensuring an inclusive, barrier-free digital experience for all constituents, regardless of ability or assistive device.
        </p>
      </div>

      {/* Main Statement */}
      <div className="bg-white dark:bg-[#182720] rounded-sm border border-sage-border dark:border-[#35463C] p-6 sm:p-8 shadow-xs space-y-8 text-sm text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-charcoal dark:text-[#F5F2E9]">
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
          <h2 className="font-display text-2xl text-charcoal dark:text-[#F5F2E9]">
            Implemented Accessibility Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xs bg-sage/25 dark:bg-[#21342A] border border-sage-border dark:border-[#35463C] space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-charcoal dark:text-[#F5F2E9]">
                <Keyboard className="w-4 h-4 text-forest dark:text-[#8CB99B]" />
                <span>Full Keyboard Operability</span>
              </div>
              <p className="text-xs text-charcoal-muted dark:text-[#C3CDC4]">
                All navigation menus, category filters, interactive modals, and forms can be navigated using Tab, Shift+Tab, Enter, and Escape keys.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-sage/25 dark:bg-[#21342A] border border-sage-border dark:border-[#35463C] space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-charcoal dark:text-[#F5F2E9]">
                <Eye className="w-4 h-4 text-forest dark:text-[#8CB99B]" />
                <span>High Color Contrast</span>
              </div>
              <p className="text-xs text-charcoal-muted dark:text-[#C3CDC4]">
                Text and interactive elements meet or exceed the minimum 4.5:1 contrast ratio against background surfaces for optimal legibility.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-sage/25 dark:bg-[#21342A] border border-sage-border dark:border-[#35463C] space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-charcoal dark:text-[#F5F2E9]">
                <Monitor className="w-4 h-4 text-forest dark:text-[#8CB99B]" />
                <span>Semantic Landmarks &amp; ARIA</span>
              </div>
              <p className="text-xs text-charcoal-muted dark:text-[#C3CDC4]">
                Clear landmarks (&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;) and descriptive ARIA attributes ensure seamless screen reader parsing.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-sage/25 dark:bg-[#21342A] border border-sage-border dark:border-[#35463C] space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-charcoal dark:text-[#F5F2E9]">
                <Sparkles className="w-4 h-4 text-forest dark:text-[#8CB99B]" />
                <span>Bilingual Unicode Typography</span>
              </div>
              <p className="text-xs text-charcoal-muted dark:text-[#C3CDC4]">
                Full support for Malayalam Unicode typography (Noto Sans Malayalam) preventing font distortion or truncation on mobile screens.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-charcoal dark:text-[#F5F2E9]">
            Testing &amp; Compliance Status
          </h2>
          <p>
            While core accessibility patterns (visible focus rings, form error association, aria labels, and responsive scaling) are baked into this prototype, comprehensive third-party automated and manual screen reader audits (e.g. NVDA, JAWS, VoiceOver) are scheduled prior to official public launch.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-charcoal dark:text-[#F5F2E9]">
            Feedback and Assistance
          </h2>
          <p>
            If you encounter any difficulty accessing information or utilizing any feature on this website, please report the issue to our technical team via the{" "}
            <a href="/contact" className="text-forest dark:text-[#8CB99B] font-semibold underline hover:text-forest-dark dark:hover:text-[#9dc4ab]">
              contact form
            </a>{" "}
            or email us with details of the assistive technology used.
          </p>
        </section>
      </div>
    </div>
  );
}
