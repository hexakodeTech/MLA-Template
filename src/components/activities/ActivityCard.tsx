"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { ActivityItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/context/LanguageContext";

interface ActivityCardProps {
  activity: ActivityItem;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { getLocalized, language, t } = useLanguage();

  return (
    <article className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col">
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        {activity.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activity.imageUrl}
            alt={getLocalized(activity.title)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs">
            Activity Photograph Placeholder
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <Badge variant="green">{activity.category}</Badge>
          {activity.isSample && (
            <Badge variant="sample">
              {language === "ml" ? "മാതൃക" : "Sample"}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mb-2">
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-gold-500" />
              <time dateTime={activity.date}>{activity.date}</time>
            </span>
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-forest-600" />
              <span className="truncate">{getLocalized(activity.location)}</span>
            </span>
          </div>

          <h3 className="font-serif font-bold text-base text-navy-950 group-hover:text-navy-700 transition-colors line-clamp-2">
            <Link href={`/activities/${activity.slug}`}>
              {getLocalized(activity.title)}
            </Link>
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {getLocalized(activity.description)}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/activities/${activity.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 group-hover:text-gold-600 transition-colors"
          >
            <span>{t("readMore")}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[10px] text-slate-400">
            {language === "ml" ? "വിശദാംശങ്ങൾ" : "Details"}
          </span>
        </div>
      </div>
    </article>
  );
};
