"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { ActivityItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/context/LanguageContext";

interface ActivityCardProps {
  activity: ActivityItem;
  featured?: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  featured = false,
}) => {
  const { getLocalized, language, t } = useLanguage();

  return (
    <article className="group bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] overflow-hidden flex flex-col justify-between hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 transition-all duration-300 shadow-xs hover:shadow-sm h-full">
      <div className="flex-1 flex flex-col">
        {/* Standardized 16:10 Aspect Ratio Image */}
        <div className="relative aspect-[16/10] bg-stone dark:bg-[#222320] overflow-hidden shrink-0">
          {activity.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activity.imageUrl}
              alt={getLocalized(activity.title)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              loading="lazy"
            />
          )}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            <Badge variant="copper">{activity.category}</Badge>
            {activity.isSample && <Badge variant="sample">Sample</Badge>}
            {featured && (
              <span className="bg-charcoal text-white dark:bg-[#F4F1E9] dark:text-[#191A18] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-xs">
                {language === "ml" ? "പ്രധാനം" : "Featured"}
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          {/* Metadata Row: Date & Location */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate dark:text-[#A09F97] font-mono mb-2.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-copper dark:text-[#D29A78] shrink-0" />
              <time dateTime={activity.date}>{activity.date}</time>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-muted-blue dark:text-[#91A7B8] truncate max-w-[170px]">
              <MapPin className="w-3.5 h-3.5 text-muted-blue dark:text-[#91A7B8] shrink-0" />
              <span className="truncate">{getLocalized(activity.location)}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors leading-snug line-clamp-2">
            <Link href={`/activities/${activity.slug}`}>
              {getLocalized(activity.title)}
            </Link>
          </h3>

          {/* Description: flex-1 ensures consistent vertical expansion */}
          <p className="text-xs sm:text-sm text-slate dark:text-[#C6C5BD] leading-relaxed line-clamp-3 mt-2.5 font-light flex-1">
            {getLocalized(activity.description)}
          </p>
        </div>
      </div>

      {/* Card Footer: Always pinned to bottom across all cards */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
        <div className="pt-4 border-t border-warm-grey/60 dark:border-[#41413B]/60 flex items-center justify-between">
          <Link
            href={`/activities/${activity.slug}`}
            aria-label={`${t("readMore")}: ${getLocalized(activity.title)}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors"
          >
            <span>{t("readMore")}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-copper dark:text-[#D29A78]" />
          </Link>
          <span className="text-[10px] text-slate dark:text-[#A09F97] font-mono">
            {language === "ml" ? "രേഖകൾ" : "Diary Log"}
          </span>
        </div>
      </div>
    </article>
  );
};
