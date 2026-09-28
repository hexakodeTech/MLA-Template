"use client";

import React from "react";
import { Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

export default function PrivacyPolicyPage() {
  const { language, t } = useLanguage();

  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("privacyPolicy") }]} />

      {/* Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="navy">Legal &amp; Governance</Badge>
          <Badge variant="sample">Draft Policy for Review</Badge>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-navy-950 tracking-tight">
          {language === "ml" ? "സ്വകാര്യതാ നയം (കരട് രേഖ)" : "Privacy Policy (Draft for Legal Review)"}
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
          Prototype governance framework outlining intended principles for constituent privacy, enquiry handling, and data safety.
        </p>
      </div>

      {/* Draft Disclaimer Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-amber-950">Draft Policy Notice</h4>
          <p className="mt-1 text-xs text-amber-800 leading-relaxed">
            This document is an architectural draft prepared by HexaKode for client evaluation. Actual statutory data retention timelines, server hosting jurisdictions, and data processing workflows will be formally finalized by the office legal advisors prior to public launch.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-lg text-navy-950">
            1. Purpose of the Website
          </h2>
          <p>
            The website is designed exclusively as an informational and constituent service platform for the office of Shri Ramesh Pisharady. It serves to disseminate verified announcements, facilitate civic enquiry submissions, and provide documented updates regarding constituency public works.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-lg text-navy-950">
            2. Information Collected via Enquiries
          </h2>
          <p>
            When constituents submit an enquiry or petition via the official contact form, the following details are submitted voluntarily:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
            <li>Full Name</li>
            <li>Contact Phone Number</li>
            <li>Email Address</li>
            <li>Subject and narrative details of the civic query or petition</li>
          </ul>
          <p className="text-xs text-slate-500 italic mt-2">
            No sensitive personal financial data, banking information, or Aadhaar biometric records are solicited or collected on this platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-lg text-navy-950">
            3. Use of Information
          </h2>
          <p>
            Information provided by citizens is strictly utilized for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
            <li>Responding to citizen queries and grievances</li>
            <li>Routing official petitions to relevant government or municipal departments</li>
            <li>Verifying the authenticity of public representations</li>
          </ul>
          <p>
            Constituent information is never sold, leased, or commercially disseminated to third-party commercial advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-lg text-navy-950">
            4. Cookies and Analytical Tracking
          </h2>
          <p>
            The prototype website does not deploy invasive tracking pixels, behavioral advertising beacons, or third-party profiling cookies. Baseline technical logs (such as HTTP server headers and response codes) are maintained solely for security audit and performance diagnostics.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-lg text-navy-950">
            5. Contact and Grievance Officer
          </h2>
          <p>
            Questions regarding data privacy practices or requests to review submitted enquiry records may be directed to the designated Secretariat liaison upon formal confirmation of office contact particulars.
          </p>
        </section>
      </div>
    </div>
  );
}
