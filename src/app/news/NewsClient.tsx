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
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: t("navNews") }]} />

      {/* Page Heading */}
      <div className="border-b border-warm-grey dark:border-[#41413B] pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="copper">
            {language === "ml" ? "അറിയിപ്പുകൾ" : "Official Releases"}
          </Badge>
          <Badge variant="sample">
            {language === "ml" ? "മാതൃകാ ഡാറ്റ" : "Sample Announcements"}
          </Badge>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-[#F4F1E9] tracking-tight">
          {language === "ml"
            ? "വാർത്തകളും ഔദ്യോഗിക അറിയിപ്പുകളും"
            : "News & Announcements"}
        </h1>
        <p className="mt-4 text-slate dark:text-[#C6C5BD] text-base sm:text-lg max-w-3xl leading-relaxed font-light">
          {language === "ml"
            ? "ഓഫീസിൽ നിന്നുള്ള ഔദ്യോഗിക പത്രക്കുറിപ്പുകൾ, യോഗ തീയതികൾ, പൊതു അറിയിപ്പുകൾ എന്നിവ ഇവിടെ പ്രസിദ്ധീകരിക്കുന്നു."
            : "Central repository of official notices, public meeting schedules, civic advisories, and administrative releases from the representative's office."}
        </p>
      </div>

      {/* Featured Lead Announcement */}
      {featuredNews && selectedCategory === "All" && !searchQuery && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-copper dark:text-[#D29A78] block">
            {language === "ml" ? "പ്രധാന അറിയിപ്പ്" : "Featured Lead Story"}
          </h2>
          <NewsCard item={featuredNews} featured />
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate dark:text-[#A09F97] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              id="news-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              aria-describedby="news-search-help"
              className="w-full pl-10 pr-4 py-2.5 rounded-xs border border-warm-grey dark:border-[#41413B] text-sm bg-ivory/50 dark:bg-[#222320] focus:bg-white dark:focus:bg-[#191A18] focus:outline-none focus:ring-2 focus:ring-charcoal dark:focus:ring-[#D29A78] focus:border-charcoal dark:focus:border-[#D29A78] transition-colors text-charcoal dark:text-[#F4F1E9] placeholder-slate/50 dark:placeholder-[#A09F97]/50"
            />
            <p id="news-search-help" className="sr-only">
              {language === "ml"
                ? "തലക്കെട്ട്, വിവരണം അല്ലെങ്കിൽ വിഭാഗം എന്നിവ പ്രകാരം വാർത്തകൾ തിരയുക"
                : "Search news by headline, summary, or category keywords"}
            </p>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-wider px-3.5 py-2 rounded-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78] focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#2C2D29] ${
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

        {/* Results Counter */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="flex items-center justify-between text-xs text-slate dark:text-[#A09F97] pt-3 border-t border-warm-grey/60 dark:border-[#41413B]/60"
        >
          <span>
            {language === "ml"
              ? `${filteredNews.length} അറിയിപ്പുകൾ ലഭ്യമാണ്`
              : `Showing ${filteredNews.length} releases`}
          </span>
          <span className="text-[11px] text-copper dark:text-[#D29A78] italic font-mono">
            * All entries are structured demonstration samples
          </span>
        </div>
      </div>

      {/* News Content Area */}
      {filteredNews.length > 0 ? (
        <section aria-label={language === "ml" ? "വാർത്താ ലേഖനങ്ങൾ" : "News Articles"}>
          <h2 className="sr-only">
            {language === "ml" ? "വാർത്താ ലേഖനങ്ങളുടെ പട്ടിക" : "News Articles Directory"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : (
        <div
          role="status"
          aria-live="polite"
          className="text-center py-20 bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-8 shadow-xs"
        >
          <Bell className="w-8 h-8 text-copper dark:text-[#D29A78] mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
            {mockNews.length === 0
              ? t("emptyNewsInitialTitle")
              : t("emptyNewsTitle")}
          </h2>
          <p className="text-xs text-slate dark:text-[#C6C5BD] mt-1 max-w-md mx-auto">
            {mockNews.length === 0
              ? t("emptyNewsInitialDesc")
              : searchQuery.trim().length > 0 && selectedCategory !== "All"
              ? t("emptyNewsCombinedDesc")
              : searchQuery.trim().length > 0
              ? t("emptyNewsSearchDesc")
              : t("emptyNewsCategoryDesc")}
          </p>
          {mockNews.length > 0 && (
            <div className="mt-4 flex items-center justify-center gap-3">
              {searchQuery.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] underline transition-colors rounded-xs p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
                >
                  {t("emptyNewsClearSearch")}
                </button>
              )}
              {selectedCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] underline transition-colors rounded-xs p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78]"
                >
                  {t("emptyNewsReset")}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
