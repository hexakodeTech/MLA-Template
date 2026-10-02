"use client";

import React from "react";
import Link from "next/link";
import {
  Eye,
  Keyboard,
  Sparkles,
  Monitor,
  Accessibility,
  Sliders,
  SunMoon,
  BookOpen,
  Activity,
  Compass,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

export default function AccessibilityPage() {
  const { language, t } = useLanguage();

  return (
    <div className="py-10 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("accessibilityStatement") }]} />

      {/* Header */}
      <div className="border-b border-warm-grey dark:border-[#41413B] pb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="charcoal">Digital Inclusion</Badge>
          <Badge variant="stone">Targeting WCAG 2.2 AA</Badge>
          <Badge variant="copper">Built-in Accessibility Menu</Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-charcoal dark:text-[#F4F1E9] tracking-tight">
          {language === "ml" ? "പ്രവേശനക്ഷമത പ്രസ്താവന" : "Accessibility Statement"}
        </h1>
        <p className="mt-3 text-slate dark:text-[#C6C5BD] text-sm sm:text-base leading-relaxed">
          Our commitment to ensuring an inclusive, barrier-free digital experience for all constituents, regardless of ability, device, or assistive technology.
        </p>
        <p className="mt-2 text-xs text-slate/80 dark:text-[#A09F97]">
          Last reviewed: September 2026 (Prototype Architecture Evaluation)
        </p>
      </div>

      {/* Main Statement & Menu Guidance */}
      <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 sm:p-8 shadow-xs space-y-8 text-sm text-slate dark:text-[#C6C5BD] leading-relaxed">
        {/* Commitment */}
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
            Our Commitment &amp; Standards
          </h2>
          <p>
            The Office of Shri Ramesh Pisharady and its technology partner HexaKode are dedicated to ensuring that digital public services, representative updates, and constituency information are fully accessible to all citizens, including individuals with visual, auditory, cognitive, or physical impairments.
          </p>
          <p>
            This portal is engineered following the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA guidelines. We believe accessibility is an essential civic right, not an optional convenience.
          </p>
          <div className="p-3.5 rounded-xs bg-stone/60 dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] text-xs">
            <span className="font-bold text-charcoal dark:text-[#F4F1E9]">Please note: </span>
            The website&apos;s custom accessibility menu supplements—rather than replaces—the operating system and browser assistive technologies you may already rely upon (such as native screen readers, browser zoom, or high-contrast system themes).
          </div>
        </section>

        {/* Using the Accessibility Menu */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-xs bg-copper/10 dark:bg-[#D29A78]/15 text-copper dark:text-[#D29A78]">
              <Accessibility className="w-5 h-5" />
            </div>
            <h2 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
              How to Use the Accessibility Menu
            </h2>
          </div>
          <p>
            Visitors can customize their reading and navigation experience at any time using the dedicated Accessibility Menu in the top navigation bar.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>
              <strong>Shortcut Key:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-stone dark:bg-[#191A18] border border-warm-grey dark:border-[#41413B] font-mono text-xs">Alt + A</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-stone dark:bg-[#191A18] border border-warm-grey dark:border-[#41413B] font-mono text-xs">Option + A</kbd> on macOS) to instantly open or close the menu.
            </li>
            <li>
              <strong>Mouse / Touch:</strong> Click or tap the accessibility figure icon in the header bar.
            </li>
            <li>
              <strong>Persistence:</strong> Selected preferences are safely saved in your browser&apos;s local storage and automatically applied across all page views.
            </li>
            <li>
              <strong>Reset:</strong> Individual categories or all preferences can be reset to defaults at any time using the reset buttons.
            </li>
          </ul>
        </section>

        {/* Implemented Accessibility Menu Features */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
            Customization Features in the Menu
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xs bg-stone/60 dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-charcoal dark:text-[#F4F1E9]">
                <Sliders className="w-4 h-4 text-copper dark:text-[#D29A78]" />
                <span>Text Size Scaling (80% to 150%)</span>
              </div>
              <p className="text-xs text-slate dark:text-[#C6C5BD]">
                Adjusts typography size proportionally across headlines, body paragraphs, and interactive labels without breaking responsive layouts.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-stone/60 dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-charcoal dark:text-[#F4F1E9]">
                <SunMoon className="w-4 h-4 text-copper dark:text-[#D29A78]" />
                <span>High Contrast &amp; Grayscale</span>
              </div>
              <p className="text-xs text-slate dark:text-[#C6C5BD]">
                Increases contrast boundaries, darkens text, or enables a clean monochrome mode to assist users with photophobia or color vision deficiencies.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-stone/60 dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-charcoal dark:text-[#F4F1E9]">
                <BookOpen className="w-4 h-4 text-copper dark:text-[#D29A78]" />
                <span>Reading Aids (Spacing &amp; Underlines)</span>
              </div>
              <p className="text-xs text-slate dark:text-[#C6C5BD]">
                Configurable line height (1.5x, 1.75x, 2.0x), letter spacing, and persistent hyperlinks underlining to support readers with dyslexia.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-stone/60 dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-charcoal dark:text-[#F4F1E9]">
                <Activity className="w-4 h-4 text-copper dark:text-[#D29A78]" />
                <span>Reduce Motion &amp; Transparency</span>
              </div>
              <p className="text-xs text-slate dark:text-[#C6C5BD]">
                Halts subtle background ambient drifting animations and replaces translucent blur panels with solid surfaces for vestibular safety.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-stone/60 dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-charcoal dark:text-[#F4F1E9]">
                <Compass className="w-4 h-4 text-copper dark:text-[#D29A78]" />
                <span>Highlight Keyboard Focus</span>
              </div>
              <p className="text-xs text-slate dark:text-[#C6C5BD]">
                Strengthens focus outlines with high-visibility copper/charcoal rings and drop-shadows to track active controls without a mouse.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-stone/60 dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-charcoal dark:text-[#F4F1E9]">
                <Sparkles className="w-4 h-4 text-copper dark:text-[#D29A78]" />
                <span>Bilingual Unicode Typography</span>
              </div>
              <p className="text-xs text-slate dark:text-[#C6C5BD]">
                Tested with Malayalam Unicode fonts (Noto Sans Malayalam) to maintain legible glyph rendering and correct ligatures across all screen sizes.
              </p>
            </div>
          </div>
        </section>

        {/* Keyboard Navigation Guidance */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-copper dark:text-[#D29A78]" />
            <h2 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
              Keyboard Navigation Guidance
            </h2>
          </div>
          <p>
            The entire portal can be operated without a mouse. Standard keyboard commands include:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-warm-grey dark:border-[#41413B] rounded-xs">
              <thead className="bg-stone/80 dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] border-b border-warm-grey dark:border-[#41413B]">
                <tr>
                  <th className="p-2.5 font-bold">Key / Combination</th>
                  <th className="p-2.5 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-grey/60 dark:divide-[#41413B]/60 text-slate dark:text-[#C6C5BD]">
                <tr>
                  <td className="p-2.5 font-mono font-bold text-charcoal dark:text-[#F4F1E9]">Tab</td>
                  <td className="p-2.5">Move to the next interactive button, link, or input field</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-charcoal dark:text-[#F4F1E9]">Shift + Tab</td>
                  <td className="p-2.5">Move to the previous interactive element</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-charcoal dark:text-[#F4F1E9]">Enter / Space</td>
                  <td className="p-2.5">Activate a button, open links, or toggle switch settings</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-charcoal dark:text-[#F4F1E9]">Escape (Esc)</td>
                  <td className="p-2.5">Close open dropdown menus, modals, or image lightboxes</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-charcoal dark:text-[#F4F1E9]">Alt + A</td>
                  <td className="p-2.5">Directly toggle the Accessibility Settings panel</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-charcoal dark:text-[#F4F1E9]">Skip Link</td>
                  <td className="p-2.5">Press Tab on first load to bypass header navigation and skip to main content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Compliance and Audit Status */}
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
            Testing &amp; Compliance Status
          </h2>
          <p>
            While core accessibility patterns (semantic HTML5 landmarks, visible focus rings, form error association, aria labels, and responsive scaling) are implemented in this prototype, formal third-party automated and manual screen reader audits (NVDA, JAWS, VoiceOver) are scheduled prior to official public commissioning.
          </p>
          <p>
            We do not claim full compliance until an independent formal audit is conducted and documented.
          </p>
        </section>

        {/* Feedback and Contact */}
        <section className="space-y-3">
          <h2 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
            Feedback and Assistance
          </h2>
          <p>
            If you encounter any difficulty accessing information or utilizing any feature on this website, please report the issue to our technical team via the{" "}
            <Link href="/contact" className="text-copper dark:text-[#D29A78] font-semibold underline hover:text-charcoal dark:hover:text-[#F4F1E9] transition-colors">
              contact form
            </Link>{" "}
            or email us with details of the assistive technology used and the page URL.
          </p>
        </section>
      </div>
    </div>
  );
}
