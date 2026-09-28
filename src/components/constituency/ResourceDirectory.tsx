"use client";

import React, { useState } from "react";
import { Phone, MapPin, ExternalLink } from "lucide-react";
import { PublicResource } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface ResourceDirectoryProps {
  resources: PublicResource[];
}

export const ResourceDirectory: React.FC<ResourceDirectoryProps> = ({ resources }) => {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const { getLocalized, language } = useLanguage();

  const categories = ["All", "Emergency", "Revenue", "Utilities", "Healthcare"];

  const filtered =
    selectedCat === "All"
      ? resources
      : resources.filter((r) => r.category === selectedCat);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
          {language === "ml" ? "സേവന വിഭാഗം:" : "Service Category:"}
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedCat === cat
                  ? "bg-forest-800 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-200 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {getLocalized(item.department)}
                </span>
              </div>

              <h4 className="font-serif font-bold text-base text-navy-950">
                {getLocalized(item.serviceName)}
              </h4>

              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {getLocalized(item.description)}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-navy-900 font-semibold bg-slate-50 p-2 rounded border border-slate-100">
                <Phone className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                <a href={`tel:${item.phone.split("/")[0].trim()}`} className="hover:underline">
                  {item.phone}
                </a>
              </div>

              {item.address && (
                <div className="flex items-start gap-2 text-slate-500 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{getLocalized(item.address)}</span>
                </div>
              )}

              {item.portalUrl && (
                <div className="pt-1">
                  <a
                    href={item.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-navy-800 hover:text-navy-950 font-medium hover:underline"
                  >
                    <span>{language === "ml" ? "ഔദ്യോഗിക പോർട്ടൽ" : "Official Department Portal"}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
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
