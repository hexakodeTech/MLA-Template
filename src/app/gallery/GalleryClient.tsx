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
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("navGallery") }]} />

      {/* Page Heading */}
      <div className="border-b border-warm-grey dark:border-[#41413B] pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="copper">
            {language === "ml" ? "ചിത്രശാല" : "Official Photo Gallery"}
          </Badge>
          <Badge variant="sample">
            {language === "ml" ? "മാതൃകാ ചിത്രങ്ങൾ" : "Photographic Placeholders"}
          </Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-[#F4F1E9] tracking-tight">
          {language === "ml"
            ? "മണ്ഡലത്തിലെ നിമിഷങ്ങൾ (ചിത്രശാല)"
            : "Moments from the Constituency"}
        </h1>
        <p className="mt-4 text-slate dark:text-[#C6C5BD] text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          {language === "ml"
            ? "ഔദ്യോഗിക പരിപാടികൾ, പൊതു സന്ദർശനങ്ങൾ, വികസന സ്ഥലങ്ങൾ, പാലക്കാടിന്റെ പൈതൃക കാഴ്ചകൾ എന്നിവയുടെ ചിത്രശേഖരം."
            : "Photographic record documenting public meetings, official walkthroughs, infrastructure inspections, and the cultural landscape of Palakkad."}
        </p>

        {/* Prototype notice */}
        <div className="mt-6 p-4 rounded-sm bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] text-xs text-charcoal dark:text-[#F4F1E9] flex items-start gap-2.5 max-w-3xl shadow-xs">
          <Info className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" />
          <p className="leading-relaxed text-slate dark:text-[#C6C5BD]">
            <strong className="text-charcoal dark:text-[#F4F1E9]">Sample Asset Notice:</strong> The images currently featured in this prototype are high-quality illustrative placeholders selected to demonstrate the responsive grid and lightbox viewing capabilities. Approved official media will be incorporated prior to launch.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-warm-grey dark:border-[#41413B]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-copper dark:text-[#D29A78]" />
          <span className="text-xs font-bold text-slate dark:text-[#A09F97] uppercase tracking-wider">
            {language === "ml" ? "വിഭാഗം തിരഞ്ഞെടുക്കുക:" : "Filter by Album:"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] shadow-xs"
                  : "bg-white dark:bg-[#2C2D29] text-charcoal dark:text-[#C6C5BD] hover:bg-stone dark:hover:bg-[#343530] border border-warm-grey dark:border-[#41413B]"
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
            className="group relative rounded-sm overflow-hidden bg-white dark:bg-[#2C2D29] border border-warm-grey dark:border-[#41413B] shadow-xs hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 transition-all duration-300 cursor-pointer flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
          >
            <div className="relative aspect-[4/3] bg-stone dark:bg-[#222320] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={getLocalized(item.altText)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white dark:bg-[#2C2D29] text-charcoal dark:text-[#F4F1E9] border border-warm-grey dark:border-[#41413B] px-2.5 py-0.5 rounded-xs">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">
                Click to expand view
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-base text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors line-clamp-1">
                  {getLocalized(item.title)}
                </h3>
                <p className="mt-1 text-xs text-slate dark:text-[#C6C5BD] line-clamp-2 leading-relaxed">
                  {item.caption ? getLocalized(item.caption) : getLocalized(item.altText)}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-warm-grey/60 dark:border-[#41413B]/60 flex items-center justify-between text-xs text-slate dark:text-[#A09F97]">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3 h-3 text-copper dark:text-[#D29A78]" />
                  {item.date}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1 text-[11px] truncate max-w-[140px] text-muted-blue dark:text-[#91A7B8] font-medium">
                    <MapPin className="w-3 h-3 shrink-0" />
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
