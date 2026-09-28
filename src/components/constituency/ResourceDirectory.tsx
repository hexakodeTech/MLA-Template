"use client";

import React, { useState } from "react";
import { Phone, MapPin, ExternalLink } from "lucide-react";
import { PublicResource } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface ResourceDirectoryProps {
  resources: PublicResource[];
  darkTheme?: boolean;
}

export const ResourceDirectory: React.FC<ResourceDirectoryProps> = ({
  resources,
  darkTheme = false,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const { getLocalized, language } = useLanguage();

  const categories = ["All", "Emergency", "Revenue", "Utilities", "Healthcare"];

  const filtered =
    selectedCat === "All"
      ? resources
      : resources.filter((r) => r.category === selectedCat);

  return (
    <div className="space-y-6 font-sans">
      {/* Category Filter */}
      <div className={`flex items-center justify-between flex-wrap gap-4 pb-3 border-b ${darkTheme ? "border-forest/40" : "border-sage-border dark:border-[#35463C]"}`}>
        <span className={`text-xs font-bold uppercase tracking-widest ${darkTheme ? "text-sage" : "text-charcoal-light dark:text-[#99A99D]"}`}>
          {language === "ml" ? "സേവന വിഭാഗം:" : "Service Category:"}
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded-xs font-semibold transition-all ${
                selectedCat === cat
                  ? darkTheme
                    ? "bg-sage text-charcoal shadow-xs"
                    : "bg-forest dark:bg-[#8CB99B] text-ivory dark:text-[#10231A] shadow-xs"
                  : darkTheme
                  ? "bg-forest-surface text-ivory/80 hover:bg-forest/50 border border-forest/50"
                  : "bg-sage/40 dark:bg-[#182720] text-charcoal dark:text-[#C3CDC4] hover:bg-sage dark:hover:bg-[#21342A] border border-sage-border dark:border-[#35463C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`rounded-sm border p-6 flex flex-col justify-between transition-all ${
              darkTheme
                ? "bg-forest-surface border-forest/40 text-ivory"
                : "bg-white dark:bg-[#182720] border-sage-border dark:border-[#35463C] text-charcoal dark:text-[#F5F2E9] hover:border-forest/40 dark:hover:border-[#8CB99B]/40"
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs ${
                  item.category === "Emergency"
                    ? "bg-terracotta text-white"
                    : darkTheme
                    ? "bg-forest/60 text-sage"
                    : "bg-sage/50 dark:bg-[#21342A] text-forest dark:text-[#8CB99B]"
                }`}>
                  {item.category}
                </span>
                <span className={`text-[11px] font-mono ${darkTheme ? "text-ivory/60" : "text-charcoal-light dark:text-[#99A99D]"}`}>
                  {getLocalized(item.department)}
                </span>
              </div>

              <h4 className="font-display text-xl leading-snug">
                {getLocalized(item.serviceName)}
              </h4>

              <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${darkTheme ? "text-ivory/80" : "text-charcoal-muted dark:text-[#C3CDC4]"}`}>
                {getLocalized(item.description)}
              </p>
            </div>

            <div className={`mt-5 pt-4 border-t space-y-2 text-xs ${darkTheme ? "border-forest/40" : "border-sage-border dark:border-[#35463C]"}`}>
              <div className={`flex items-center gap-2 font-mono font-bold p-2.5 rounded-xs ${
                darkTheme ? "bg-forest/40 text-ivory border border-forest/50" : "bg-sage/30 dark:bg-[#21342A] text-forest dark:text-[#8CB99B] border border-sage-border dark:border-[#35463C]"
              }`}>
                <Phone className="w-3.5 h-3.5 text-terracotta dark:text-[#E19A76] shrink-0" />
                <a href={`tel:${item.phone.split("/")[0].trim()}`} className="hover:underline">
                  {item.phone}
                </a>
              </div>

              {item.address && (
                <div className={`flex items-start gap-2 text-[11px] ${darkTheme ? "text-ivory/70" : "text-charcoal-light dark:text-[#99A99D]"}`}>
                  <MapPin className="w-3 h-3 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
                  <span>{getLocalized(item.address)}</span>
                </div>
              )}

              {item.portalUrl && (
                <div className="pt-1">
                  <a
                    href={item.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold hover:underline ${darkTheme ? "text-sage hover:text-ivory" : "text-forest dark:text-[#8CB99B] hover:text-forest-dark dark:hover:text-[#9dc4ab]"}`}
                  >
                    <span>{language === "ml" ? "ഔദ്യോഗിക പോർട്ടൽ" : "Official Portal"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
