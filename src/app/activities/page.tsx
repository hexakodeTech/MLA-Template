"use client";

import React, { useState } from "react";
import { Search, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { mockActivities } from "@/data/mockData";
import { ActivityCategory } from "@/types";

export default function ActivitiesPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories: Array<"All" | ActivityCategory> = [
    "All",
    "Community Engagements",
    "Public Inspections",
    "Cultural & Educational",
    "Official Delegations",
  ];

  const filteredActivities = mockActivities.filter((act) => {
    const matchesCategory =
      selectedCategory === "All" || act.category === selectedCategory;

    const fullText = (
      act.title.en +
      " " +
      act.title.ml +
      " " +
      act.description.en +
      " " +
      act.description.ml +
      " " +
      act.location.en +
      " " +
      act.location.ml
    ).toLowerCase();

    const matchesSearch = fullText.includes(searchQuery.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("navActivities") }]} />

      {/* Page Heading */}
      <div className="border-b border-warm-grey dark:border-[#41413B] pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="copper">
            {language === "ml" ? "പ്രവർത്തനങ്ങൾ" : "Public Engagements"}
          </Badge>
          <Badge variant="sample">
            {language === "ml" ? "മാതൃകാ രേഖകൾ" : "Demonstration Diary"}
          </Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-[#F4F1E9] tracking-tight">
          {language === "ml"
            ? "പൊതു പ്രവർത്തനങ്ങളും പരിപാടികളും"
            : "Public Activities & Engagements"}
        </h1>
        <p className="mt-4 text-slate dark:text-[#C6C5BD] text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          {language === "ml"
            ? "മണ്ഡലത്തിലെ ജനസമ്പർക്ക പരിപാടികൾ, ഔദ്യോഗിക പരിശോധനകൾ, സാംസ്കാരിക കൂട്ടായ്മകൾ എന്നിവയുടെ വിവരങ്ങൾ."
            : "Documented record of official visits, administrative inspections, public grievance hearings, and community events across the Palakkad constituency."}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate dark:text-[#A09F97] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "ml"
                  ? "പ്രവർത്തനങ്ങളും സ്ഥലങ്ങളും തിരയുക..."
                  : "Search activities, locations, or topics..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xs border border-warm-grey dark:border-[#41413B] text-sm bg-ivory/50 dark:bg-[#222320] focus:bg-white dark:focus:bg-[#191A18] focus:outline-none focus:ring-1 focus:ring-charcoal dark:focus:ring-[#D29A78] focus:border-charcoal dark:focus:border-[#D29A78] transition-colors text-charcoal dark:text-[#F4F1E9] placeholder-slate/50 dark:placeholder-[#A09F97]/50"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-wider px-3.5 py-2 rounded-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] shadow-xs"
                    : "bg-white dark:bg-[#222320] text-charcoal dark:text-[#C6C5BD] hover:bg-stone dark:hover:bg-[#343530] border border-warm-grey dark:border-[#41413B]"
                }`}
              >
                {cat === "All" ? t("allCategories") : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate dark:text-[#A09F97] pt-3 border-t border-warm-grey/60 dark:border-[#41413B]/60">
          <span>
            {language === "ml"
              ? `${filteredActivities.length} പ്രവർത്തനങ്ങൾ കണ്ടെത്തി`
              : `Showing ${filteredActivities.length} activity records`}
          </span>
          <span className="text-[11px] text-copper dark:text-[#D29A78] italic font-mono">
            * Editorial samples illustrating official timeline formatting
          </span>
        </div>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => (
            <ActivityCard key={act.id} activity={act} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-8 shadow-xs">
          <Calendar className="w-8 h-8 text-copper dark:text-[#D29A78] mx-auto mb-3" />
          <h3 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
            {language === "ml" ? "പ്രവർത്തനങ്ങൾ കണ്ടെത്താനായില്ല" : "No Activities Found"}
          </h3>
          <p className="text-xs text-slate dark:text-[#C6C5BD] mt-1">
            Try adjusting your search query or reset the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] underline transition-colors"
          >
            {language === "ml" ? "ഫിൽട്ടർ മാറ്റുക" : "Reset Filter"}
          </button>
        </div>
      )}
    </div>
  );
}
