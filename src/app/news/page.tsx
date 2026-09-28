"use client";

import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { NewsCard } from "@/components/news/NewsCard";
import { mockNews } from "@/data/mockData";
import { NewsCategory } from "@/types";

export default function NewsPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories: Array<"All" | NewsCategory> = [
    "All",
    "Official Announcements",
    "Public Meetings",
    "Constituency News",
    "Office Notices",
  ];

  const featuredNews = mockNews.find((n) => n.isFeatured) || mockNews[0];

  const filteredNews = mockNews.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const titleText = (
      item.title.en +
      " " +
      item.title.ml +
      " " +
      item.summary.en +
      " " +
      item.summary.ml
    ).toLowerCase();

    const matchesSearch = titleText.includes(searchQuery.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: t("navNews") }]} />

      {/* Page Heading */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="navy">
            {language === "ml" ? "അറിയിപ്പുകൾ" : "Public Releases"}
          </Badge>
          <Badge variant="sample">
            {language === "ml" ? "മാതൃകാ ഡാറ്റ" : "Sample Announcements"}
          </Badge>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-navy-950 tracking-tight">
          {language === "ml"
            ? "വാർത്തകളും ഔദ്യോഗിക അറിയിപ്പുകളും"
            : "News & Announcements"}
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
          {language === "ml"
            ? "ഓഫീസിൽ നിന്നുള്ള ഔദ്യോഗിക പത്രക്കുറിപ്പുകൾ, യോഗ തീയതികൾ, പൊതു അറിയിപ്പുകൾ എന്നിവ ഇവിടെ പ്രസിദ്ധീകരിക്കുന്നു."
            : "Central repository of official notices, public meeting schedules, civic advisories, and administrative releases from the representative's office."}
        </p>
      </div>

      {/* Featured News Announcement Area */}
      {featuredNews && selectedCategory === "All" && !searchQuery && (
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {language === "ml" ? "പ്രധാന അറിയിപ്പ്" : "Featured Official Release"}
          </span>
          <NewsCard item={featuredNews} featured />
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 transition-colors"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-2 rounded-lg font-medium transition-all ${
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

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            {language === "ml"
              ? `${filteredNews.length} അറിയിപ്പുകൾ കണ്ടെത്തി`
              : `Showing ${filteredNews.length} releases`}
          </span>
          <span className="text-[11px] text-amber-700 italic">
            * All entries are structured demonstration samples
          </span>
        </div>
      </div>

      {/* News Cards Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
          <Bell className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-navy-950">
            {language === "ml" ? "അറിയിപ്പുകൾ ലഭ്യമല്ല" : "No Announcements Found"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === "ml"
              ? "നിങ്ങൾ നൽകിയ വാക്കുകളുമായി പൊരുത്തപ്പെടുന്ന അറിയിപ്പുകൾ കണ്ടെത്താനായില്ല."
              : "Try adjusting your search criteria or selecting a different category."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 text-xs font-semibold text-navy-900 hover:underline"
          >
            {language === "ml" ? "ഫിൽട്ടറുകൾ ഒഴിവാക്കുക" : "Reset Filters"}
          </button>
        </div>
      )}
    </div>
  );
}
