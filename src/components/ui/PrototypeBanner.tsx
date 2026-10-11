"use client";

import React, { useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const PrototypeBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { language } = useLanguage();

  if (dismissed) return null;

  return (
    <aside
      aria-label={language === "ml" ? "പ്രോട്ടോടൈപ്പ് അവതരണ അറിയിപ്പ്" : "Prototype Presentation Notice"}
      className="bg-charcoal text-[#F4F1E9] dark:bg-[#191A18] dark:text-[#F4F1E9] border-b border-[#41413B] text-xs py-2 px-4 transition-all relative z-50 font-sans"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-copper text-white font-semibold px-2 py-0.5 rounded-xs uppercase tracking-wider text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            {language === "ml" ? "ഔദ്യോഗിക പോർട്ടൽ" : "Official Portal"}
          </span>
          <p className="text-[#C6C5BD] text-[11px] sm:text-xs">
            {language === "ml" ? (
              <span>
                <strong>ശ്രീ രമേഷ് പിഷാരടി എം.എൽ.എ (പാലക്കാട്):</strong> ഔദ്യോഗിക പ്രതിനിധി പോർട്ടൽ. നിയമസഭാ വിവരങ്ങളും ജനക്ഷേമ പദ്ധതികളും സമ്പർക്ക ഡെസ്കും.
              </span>
            ) : (
              <span>
                <strong>Shri Ramesh Pisharady MLA (Palakkad):</strong> Official Representative Portal. Verified legislative records, constituency initiatives, and public liaison desk.
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={language === "ml" ? "അറിയിപ്പ് ഒഴിവാക്കുക" : "Dismiss notice"}
          className="text-ivory/60 hover:text-ivory p-1 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D29A78] focus-visible:ring-offset-1 focus-visible:ring-offset-charcoal dark:focus-visible:ring-offset-[#191A18] shrink-0"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
};
