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
      aria-label="Prototype Presentation Notice"
      className="bg-navy-950 text-white border-b border-navy-800 text-xs py-2 px-4 transition-all relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 font-semibold px-2 py-0.5 rounded border border-gold-500/30 uppercase tracking-wider text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            HexaKode Prototype
          </span>
          <p className="text-slate-200">
            {language === "ml" ? (
              <span>
                <strong>ക്ലയന്റ് അവതരണ മാതൃക:</strong> ശ്രീ രമേഷ് പിഷാരടിയുടെ ഔദ്യോഗിക പോർട്ടൽ മാതൃക. വിവരങ്ങൾ ഓഫീസിന്റെ അന്തിമ സ്ഥിരീകരണത്തിന് വിധേയമാണ്.
              </span>
            ) : (
              <span>
                <strong>Official Proposal &amp; Working Prototype:</strong> Designed &amp; developed by <strong>HexaKode</strong>. Unverified contact, biographical, and project details are structured placeholders awaiting official office confirmation.
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="text-slate-400 hover:text-white p-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-white shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
