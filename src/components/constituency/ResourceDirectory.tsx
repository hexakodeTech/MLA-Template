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
      <div className="flex items-center justify-between flex-wrap gap-4 pb-3 border-b border-warm-grey dark:border-[#41413B]">
        <span className="text-xs font-bold uppercase tracking-widest text-slate dark:text-[#A09F97]">
          {language === "ml" ? "സേവന വിഭാഗം:" : "Service Category:"}
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded-xs font-semibold transition-all ${
                selectedCat === cat
                  ? "bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] shadow-xs"
                  : "bg-white dark:bg-[#2C2D29] text-charcoal dark:text-[#C6C5BD] hover:bg-stone dark:hover:bg-[#343530] border border-warm-grey dark:border-[#41413B]"
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
            className="rounded-sm border p-6 flex flex-col justify-between transition-all bg-white dark:bg-[#2C2D29] border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9] hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs ${
                  item.category === "Emergency"
                    ? "bg-copper text-white"
                    : "bg-stone dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] border border-warm-grey dark:border-[#41413B]"
                }`}>
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-slate dark:text-[#A09F97]">
                  {getLocalized(item.department)}
                </span>
              </div>

              <h4 className="font-display text-xl leading-snug">
                {getLocalized(item.serviceName)}
              </h4>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate dark:text-[#C6C5BD]">
                {getLocalized(item.description)}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t space-y-2 text-xs border-warm-grey dark:border-[#41413B]">
              <div className="flex items-center gap-2 font-mono font-bold p-2.5 rounded-xs bg-stone/50 dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] border border-warm-grey dark:border-[#41413B]">
                <Phone className="w-3.5 h-3.5 text-copper dark:text-[#D29A78] shrink-0" />
                <a href={`tel:${item.phone.split("/")[0].trim()}`} className="hover:underline">
                  {item.phone}
                </a>
              </div>

              {item.address && (
                <div className="flex items-start gap-2 text-[11px] text-slate dark:text-[#A09F97]">
                  <MapPin className="w-3 h-3 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" />
                  <span>{getLocalized(item.address)}</span>
                </div>
              )}

              {item.portalUrl && (
                <div className="pt-1">
                  <a
                    href={item.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-blue dark:text-[#91A7B8] hover:underline"
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
