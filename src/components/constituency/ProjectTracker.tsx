"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, Filter } from "lucide-react";
import { DevelopmentProject, ProjectStatus } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectTrackerProps {
  projects: DevelopmentProject[];
  darkTheme?: boolean;
}

export const ProjectTracker: React.FC<ProjectTrackerProps> = ({
  projects,
  darkTheme = false,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const { getLocalized, language } = useLanguage();

  const statusOptions = ["All", "Ongoing", "Completed", "In Planning"];

  const filteredProjects =
    selectedStatus === "All"
      ? projects
      : projects.filter((p) => p.status === selectedStatus);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18]">
            <CheckCircle2 className="w-3 h-3 text-copper dark:text-[#D29A78]" aria-hidden="true" />
            {language === "ml" ? "പൂർത്തിയായി" : "Completed"}
          </span>
        );
      case "Ongoing":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-copper text-white dark:bg-[#D29A78] dark:text-[#191A18]">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {language === "ml" ? "പുരോഗമിക്കുന്നു" : "Ongoing"}
          </span>
        );
      case "In Planning":
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-stone text-charcoal dark:bg-[#222320] dark:text-[#C6C5BD] border border-warm-grey dark:border-[#41413B]">
            <AlertTriangle className="w-3 h-3 text-slate dark:text-[#A09F97]" aria-hidden="true" />
            {language === "ml" ? "ആസൂത്രണം" : "In Planning"}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-3 border-b border-warm-grey dark:border-[#41413B]">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate dark:text-[#A09F97]">
            {language === "ml" ? "പദവി അനുസരിച്ച്:" : "Filter Status:"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {statusOptions.map((status) => (
            <button
              type="button"
              key={status}
              onClick={() => setSelectedStatus(status)}
              aria-pressed={selectedStatus === status}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal dark:focus-visible:ring-[#D29A78] focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#2C2D29] ${
                selectedStatus === status
                  ? "bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] shadow-xs"
                  : "bg-white dark:bg-[#2C2D29] text-charcoal dark:text-[#C6C5BD] hover:bg-stone dark:hover:bg-[#343530] border border-warm-grey dark:border-[#41413B]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Live Status Announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {language === "ml"
          ? `${selectedStatus} വിഭാഗത്തിൽ ${filteredProjects.length} പദ്ധതികൾ ലഭ്യമാണ്`
          : `Showing ${filteredProjects.length} projects for status ${selectedStatus}`}
      </div>

      {/* Projects List Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 shadow-xs">
          <p className="font-display text-xl text-charcoal dark:text-[#F4F1E9]">
            {language === "ml" ? "പദ്ധതികൾ ലഭ്യമല്ല" : "No Projects Found"}
          </p>
          <p className="text-xs text-slate dark:text-[#C6C5BD] mt-1">
            {language === "ml"
              ? "തിരഞ്ഞെടുത്ത വിഭാഗത്തിൽ വിവരങ്ങൾ ലഭ്യമല്ല."
              : "No development projects match the selected status filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-sm border p-6 flex flex-col justify-between transition-all bg-white dark:bg-[#2C2D29] border-warm-grey dark:border-[#41413B] text-charcoal dark:text-[#F4F1E9] hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-stone dark:bg-[#222320] text-charcoal dark:text-[#F4F1E9] border border-warm-grey dark:border-[#41413B]">
                    {project.sector}
                  </span>
                  {getStatusBadge(project.status)}
                </div>

                <h3 className="font-display text-xl leading-snug">
                  {getLocalized(project.title)}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate dark:text-[#C6C5BD]">
                  {getLocalized(project.description)}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t space-y-2 text-xs border-warm-grey dark:border-[#41413B] text-slate dark:text-[#A09F97]">
                <div className="flex items-center justify-between">
                  <span>{language === "ml" ? "മേഖല:" : "Location:"}</span>
                  <span className="font-semibold text-charcoal dark:text-[#F4F1E9]">
                    {getLocalized(project.location)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>{language === "ml" ? "തീയതി:" : "Sanction Date:"}</span>
                  <span className="font-mono">{project.sanctionDate}</span>
                </div>

                <div className="flex items-start justify-between gap-2 pt-1 border-t border-dashed border-warm-grey/60 dark:border-[#41413B]/60">
                  <span className="shrink-0">{language === "ml" ? "രേഖ:" : "Source:"}</span>
                  <span className="text-[11px] italic font-medium text-right truncate">
                    {project.sourceAttribution}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
