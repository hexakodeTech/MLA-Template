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
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-forest text-ivory">
            <CheckCircle2 className="w-3 h-3" />
            {language === "ml" ? "പൂർത്തിയായി" : "Completed"}
          </span>
        );
      case "Ongoing":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-terracotta text-white">
            <Clock className="w-3 h-3" />
            {language === "ml" ? "പുരോഗമിക്കുന്നു" : "Ongoing"}
          </span>
        );
      case "In Planning":
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-sage-dark text-charcoal">
            <AlertTriangle className="w-3 h-3" />
            {language === "ml" ? "ആസൂത്രണം" : "In Planning"}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Filter Tabs */}
      <div className={`flex items-center justify-between flex-wrap gap-4 pb-3 border-b ${darkTheme ? "border-forest/40" : "border-sage-border dark:border-[#35463C]"}`}>
        <div className="flex items-center gap-2">
          <Filter className={`w-3.5 h-3.5 ${darkTheme ? "text-sage" : "text-forest dark:text-[#8CB99B]"}`} />
          <span className={`text-xs font-bold uppercase tracking-widest ${darkTheme ? "text-sage" : "text-charcoal-light dark:text-[#99A99D]"}`}>
            {language === "ml" ? "പദവി അനുസരിച്ച്:" : "Filter Status:"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded-xs font-semibold transition-all ${
                selectedStatus === status
                  ? darkTheme
                    ? "bg-sage text-charcoal shadow-xs"
                    : "bg-forest dark:bg-[#8CB99B] text-ivory dark:text-[#10231A] shadow-xs"
                  : darkTheme
                  ? "bg-forest-surface text-ivory/80 hover:bg-forest/50 border border-forest/50"
                  : "bg-sage/40 dark:bg-[#182720] text-charcoal dark:text-[#C3CDC4] hover:bg-sage dark:hover:bg-[#21342A] border border-sage-border dark:border-[#35463C]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`rounded-sm border p-6 flex flex-col justify-between transition-all ${
              darkTheme
                ? "bg-forest-surface border-forest/40 text-ivory"
                : "bg-white dark:bg-[#182720] border-sage-border dark:border-[#35463C] text-charcoal dark:text-[#F5F2E9] hover:border-forest/40 dark:hover:border-[#8CB99B]/40"
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs ${
                  darkTheme
                    ? "bg-forest/60 text-sage border border-forest"
                    : "bg-sage/40 dark:bg-[#21342A] text-forest dark:text-[#8CB99B] border border-sage-border dark:border-[#35463C]"
                }`}>
                  {project.sector}
                </span>
                {getStatusBadge(project.status)}
              </div>

              <h4 className="font-display text-xl leading-snug">
                {getLocalized(project.title)}
              </h4>

              <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${darkTheme ? "text-ivory/80" : "text-charcoal-muted dark:text-[#C3CDC4]"}`}>
                {getLocalized(project.description)}
              </p>
            </div>

            <div className={`mt-5 pt-4 border-t space-y-2 text-xs ${darkTheme ? "border-forest/40 text-ivory/70" : "border-sage-border dark:border-[#35463C] text-charcoal-light dark:text-[#99A99D]"}`}>
              <div className="flex items-center justify-between">
                <span>{language === "ml" ? "മേഖല:" : "Location:"}</span>
                <span className={`font-semibold ${darkTheme ? "text-ivory" : "text-charcoal dark:text-[#F5F2E9]"}`}>
                  {getLocalized(project.location)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>{language === "ml" ? "തീയതി:" : "Sanction Date:"}</span>
                <span className="font-mono">{project.sanctionDate}</span>
              </div>

              <div className={`flex items-start justify-between gap-2 pt-1 border-t border-dashed ${darkTheme ? "border-forest/30" : "border-sage-border/40 dark:border-[#35463C]/60"}`}>
                <span className="shrink-0">{language === "ml" ? "രേഖ:" : "Source:"}</span>
                <span className="text-[11px] italic font-medium text-right truncate">
                  {project.sourceAttribution}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
