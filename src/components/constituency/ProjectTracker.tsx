"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, Filter } from "lucide-react";
import { DevelopmentProject, ProjectStatus } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectTrackerProps {
  projects: DevelopmentProject[];
}

export const ProjectTracker: React.FC<ProjectTrackerProps> = ({ projects }) => {
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
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {language === "ml" ? "പൂർത്തിയായി" : "Completed"}
          </span>
        );
      case "Ongoing":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            <Clock className="w-3.5 h-3.5" />
            {language === "ml" ? "പുരോഗമിക്കുന്നു" : "Ongoing"}
          </span>
        );
      case "In Planning":
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            {language === "ml" ? "പദ്ധതി ആസൂത്രണം" : "In Planning"}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-navy-900" />
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            {language === "ml" ? "പദവി അനുസരിച്ച് കാണുക:" : "Filter by Status:"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedStatus === status
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <span className="text-[11px] font-semibold text-navy-800 bg-navy-50 px-2 py-0.5 rounded border border-navy-100 uppercase tracking-wider">
                  {project.sector}
                </span>
                {getStatusBadge(project.status)}
              </div>

              <h4 className="font-serif font-bold text-base text-navy-950 leading-snug">
                {getLocalized(project.title)}
              </h4>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {getLocalized(project.description)}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>{language === "ml" ? "മേഖല / സ്ഥലം:" : "Location:"}</span>
                <span className="font-medium text-slate-800 text-right">
                  {getLocalized(project.location)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>{language === "ml" ? "അനുമതി തീയതി:" : "Sanction Date:"}</span>
                <span className="font-mono text-slate-700">{project.sanctionDate}</span>
              </div>

              <div className="flex items-start justify-between text-slate-500 gap-2 pt-1 border-t border-slate-50">
                <span className="shrink-0">{language === "ml" ? "ഉറവിടം:" : "Source:"}</span>
                <span className="text-[11px] text-slate-600 text-right italic font-medium">
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
