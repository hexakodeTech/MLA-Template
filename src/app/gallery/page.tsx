"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Info, Filter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Lightbox } from "@/components/gallery/Lightbox";
import { mockGallery } from "@/data/mockData";
import { GalleryCategory } from "@/types";

export default function GalleryPage() {
  const { language, getLocalized, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories: GalleryCategory[] = [
    "All",
    "Public Meetings",
    "Constituency Visits",
    "Cultural Events",
    "Development Sites",
  ];

  const filteredGallery =
    selectedCategory === "All"
      ? mockGallery
      : mockGallery.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("navGallery") }]} />

      {/* Page Heading */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="gold">
            {language === "ml" ? "ചിത്രശാല" : "Official Photo Gallery"}
          </Badge>
          <Badge variant="sample">
            {language === "ml" ? "മാതൃകാ ചിത്രങ്ങൾ" : "Photographic Placeholders"}
          </Badge>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-navy-950 tracking-tight">
          {language === "ml"
            ? "മണ്ഡലത്തിലെ നിമിഷങ്ങൾ (ചിത്രശാല)"
            : "Moments from the Constituency"}
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
          {language === "ml"
            ? "ഔദ്യോഗിക പരിപാടികൾ, പൊതു സന്ദർശനങ്ങൾ, വികസന സ്ഥലങ്ങൾ, പാലക്കാടിന്റെ പൈതൃക കാഴ്ചകൾ എന്നിവയുടെ ചിത്രശേഖരം."
            : "Photographic record documenting public meetings, official walkthroughs, infrastructure inspections, and the cultural landscape of Palakkad."}
        </p>

        {/* Prototype notice */}
        <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5 max-w-3xl">
          <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Sample Asset Notice:</strong> The images currently featured in this prototype are high-quality illustrative placeholders selected to demonstrate the responsive grid and lightbox viewing capabilities. Approved official media will be incorporated prior to launch.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-navy-900" />
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            {language === "ml" ? "വിഭാഗം തിരഞ്ഞെടുക്കുക:" : "Filter by Album:"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat === "All" ? t("allCategories") : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View photo in lightbox: ${getLocalized(item.title)}`}
            className="group relative rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
          >
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={getLocalized(item.altText)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-semibold bg-white/95 text-navy-950 px-2.5 py-0.5 rounded shadow">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">
                Click to expand view
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-navy-950 group-hover:text-navy-700 transition-colors line-clamp-1">
                  {getLocalized(item.title)}
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.caption ? getLocalized(item.caption) : getLocalized(item.altText)}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3 h-3 text-gold-500" />
                  {item.date}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1 text-[11px] truncate max-w-[140px]">
                    <MapPin className="w-3 h-3 text-forest-600 shrink-0" />
                    <span>{getLocalized(item.location)}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Viewer */}
      <Lightbox
        items={filteredGallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
