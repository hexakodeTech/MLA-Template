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
      className="bg-forest-dark text-ivory dark:bg-[#10231A] dark:text-[#F5F2E9] border-b border-forest/40 dark:border-[#35463C] text-xs py-2 px-4 transition-all relative z-50 font-sans"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-terracotta text-white font-semibold px-2 py-0.5 rounded-xs uppercase tracking-wider text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            HexaKode Prototype
          </span>
          <p className="text-ivory/90 text-[11px] sm:text-xs">
            {language === "ml" ? (
              <span>
                <strong>ഔദ്യോഗിക വെബ്സൈറ്റ് മാതൃക:</strong> ക്ലയന്റ് അവതരണത്തിനായി തയ്യാറാക്കിയത്. ജീവചരിത്രവും സമ്പർക്ക വിവരങ്ങളും ഓഫീസിന്റെ സ്ഥിരീകരണത്തിന് കാത്തിരിക്കുന്നു.
              </span>
            ) : (
              <span>
                <strong>Official Proposal &amp; Working Concept:</strong> Commissioned by <strong>HexaKode</strong>. Content fields are structured placeholders awaiting official office confirmation.
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="text-ivory/60 hover:text-ivory p-1 rounded-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ivory shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
