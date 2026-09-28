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

  if (featured) {
    return (
      <article className="group bg-white dark:bg-[#182720] rounded-sm border border-sage-border dark:border-[#35463C] overflow-hidden grid grid-cols-1 md:grid-cols-12 hover:border-forest/40 dark:hover:border-[#8CB99B]/40 transition-all duration-300">
        <div className="md:col-span-6 relative aspect-[16/10] md:aspect-auto min-h-[260px] bg-sage/30 dark:bg-[#111C18] overflow-hidden">
          {activity.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activity.imageUrl}
              alt={getLocalized(activity.title)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              loading="lazy"
            />
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="forest">{activity.category}</Badge>
            {activity.isSample && <Badge variant="sample">Sample</Badge>}
          </div>
        </div>

        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-light dark:text-[#99A99D] font-mono mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-terracotta dark:text-[#E19A76]" />
                <time dateTime={activity.date}>{activity.date}</time>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-forest dark:text-[#8CB99B] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-forest dark:text-[#8CB99B]" />
                <span className="truncate">{getLocalized(activity.location)}</span>
              </span>
            </div>

            <h3 className="font-display text-2xl text-charcoal dark:text-[#F5F2E9] group-hover:text-forest dark:group-hover:text-[#8CB99B] transition-colors leading-tight">
              <Link href={`/activities/${activity.slug}`}>
                {getLocalized(activity.title)}
              </Link>
            </h3>

            <p className="mt-3 text-sm text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed line-clamp-3">
              {getLocalized(activity.description)}
            </p>
          </div>

          <div className="pt-4 border-t border-sage-border dark:border-[#35463C] flex items-center justify-between">
            <Link
              href={`/activities/${activity.slug}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-forest dark:text-[#8CB99B] group-hover:text-forest-dark dark:group-hover:text-[#9dc4ab] transition-colors"
            >
              <span>{t("readMore")}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-[11px] text-charcoal-light dark:text-[#99A99D] font-mono">
              {language === "ml" ? "രേഖകൾ" : "Diary Log"}
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white dark:bg-[#182720] rounded-sm border border-sage-border dark:border-[#35463C] overflow-hidden flex flex-col justify-between hover:border-forest/40 dark:hover:border-[#8CB99B]/40 transition-all duration-300">
      <div>
        <div className="relative aspect-[16/10] bg-sage/30 dark:bg-[#111C18] overflow-hidden">
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
            <Badge variant="forest">{activity.category}</Badge>
            {activity.isSample && <Badge variant="sample">Sample</Badge>}
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-charcoal-light dark:text-[#99A99D] font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-terracotta dark:text-[#E19A76]" />
              <time dateTime={activity.date}>{activity.date}</time>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-forest dark:text-[#8CB99B] truncate max-w-[150px]">
              <MapPin className="w-3 h-3 text-forest dark:text-[#8CB99B]" />
              <span>{getLocalized(activity.location)}</span>
            </span>
          </div>

          <h3 className="font-display text-xl text-charcoal dark:text-[#F5F2E9] group-hover:text-forest dark:group-hover:text-[#8CB99B] transition-colors leading-snug line-clamp-2">
            <Link href={`/activities/${activity.slug}`}>
              {getLocalized(activity.title)}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed line-clamp-3">
            {getLocalized(activity.description)}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-sage-border/50 dark:border-[#35463C]/50 mt-4">
        <Link
          href={`/activities/${activity.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest dark:text-[#8CB99B] group-hover:text-forest-dark dark:group-hover:text-[#9dc4ab] transition-colors"
        >
          <span>{t("readMore")}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <span className="text-[10px] text-charcoal-light dark:text-[#99A99D] font-mono">Constituency Tour</span>
      </div>
    </article>
  );
};
