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
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t("navActivities") }]} />

      {/* Page Heading */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="green">
            {language === "ml" ? "പ്രവർത്തനങ്ങൾ" : "Public Engagements"}
          </Badge>
          <Badge variant="sample">
            {language === "ml" ? "മാതൃകാ രേഖകൾ" : "Demonstration Diary"}
          </Badge>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-navy-950 tracking-tight">
          {language === "ml"
            ? "പൊതു പ്രവർത്തനങ്ങളും പരിപാടികളും"
            : "Public Activities & Engagements"}
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
          {language === "ml"
            ? "മണ്ഡലത്തിലെ ജനസമ്പർക്ക പരിപാടികൾ, ഔദ്യോഗിക പരിശോധനകൾ, സാംസ്കാരിക കൂട്ടായ്മകൾ എന്നിവയുടെ വിവരങ്ങൾ."
            : "Documented record of official visits, administrative inspections, public grievance hearings, and community events across the Palakkad constituency."}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "ml"
                  ? "പ്രവർത്തനങ്ങളും സ്ഥലങ്ങളും തിരയുക..."
                  : "Search activities, locations, or topics..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-forest-800 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat === "All" ? t("allCategories") : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            {language === "ml"
              ? `${filteredActivities.length} പ്രവർത്തനങ്ങൾ കണ്ടെത്തി`
              : `Showing ${filteredActivities.length} activity records`}
          </span>
          <span className="text-[11px] text-amber-700 italic">
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
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
          <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-navy-950">
            {language === "ml" ? "പ്രവർത്തനങ്ങൾ കണ്ടെത്താനായില്ല" : "No Activities Found"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or reset the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 text-xs font-semibold text-forest-800 hover:underline"
          >
            {language === "ml" ? "ഫിൽട്ടർ മാറ്റുക" : "Reset Filter"}
          </button>
        </div>
      )}
    </div>
  );
}
