"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { NewsItem } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/context/LanguageContext";

interface NewsCardProps {
  item: NewsItem;
  featured?: boolean;
  compact?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  item,
  featured = false,
  compact = false,
}) => {
  const { getLocalized, t } = useLanguage();

  if (compact) {
    return (
      <article className="group py-4.5 border-b border-warm-grey dark:border-[#41413B] first:pt-0 last:border-b-0 flex items-start gap-4">
        {item.imageUrl && (
          <div className="w-20 sm:w-24 aspect-[4/3] rounded-xs bg-stone dark:bg-[#222320] overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={getLocalized(item.title)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-copper dark:text-[#D29A78]">
              {item.category}
            </span>
            <span className="text-[10px] text-slate dark:text-[#A09F97] font-mono">• {item.date}</span>
          </div>
          <h4 className="font-display text-base sm:text-lg text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors line-clamp-2 leading-snug">
            <Link href={`/news/${item.slug}`} className="focus:outline-none focus:underline">
              {getLocalized(item.title)}
            </Link>
          </h4>
        </div>
      </article>
    );
  }

  if (featured) {
    return (
      <article className="group bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 transition-all duration-300">
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[280px] bg-stone dark:bg-[#222320] overflow-hidden">
          {item.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={getLocalized(item.title)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              loading="lazy"
            />
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="copper">{item.category}</Badge>
            {item.isSample && <Badge variant="sample">Sample</Badge>}
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate dark:text-[#A09F97] font-mono mb-2">
              <Calendar className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
              <time dateTime={item.date}>{item.date}</time>
              {item.sourceAttribution && (
                <>
                  <span>•</span>
                  <span className="text-slate dark:text-[#A09F97] truncate">{item.sourceAttribution}</span>
                </>
              )}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors leading-tight">
              <Link href={`/news/${item.slug}`} className="focus:outline-none focus:underline">
                {getLocalized(item.title)}
              </Link>
            </h3>

            <p className="mt-3 text-sm text-slate dark:text-[#C6C5BD] leading-relaxed line-clamp-4">
              {getLocalized(item.summary)}
            </p>
          </div>

          <div className="pt-4 border-t border-warm-grey dark:border-[#41413B] flex items-center justify-between">
            <Link
              href={`/news/${item.slug}`}
              aria-label={`${t("readMore")}: ${getLocalized(item.title)}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors"
            >
              <span>{t("readMore")}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-copper dark:text-[#D29A78]" />
            </Link>

            {item.isSample && (
              <span className="text-[10px] text-copper dark:text-[#D29A78] bg-copper/10 px-2 py-0.5 rounded-xs font-mono">
                Sample Release
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Standard Editorial Card
  return (
    <article className="group bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] overflow-hidden flex flex-col justify-between hover:border-slate/40 dark:hover:border-[#C6C5BD]/40 transition-all duration-300">
      <div>
        <div className="relative aspect-[16/10] bg-stone dark:bg-[#222320] overflow-hidden">
          {item.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={getLocalized(item.title)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              loading="lazy"
            />
          )}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            <Badge variant="copper">{item.category}</Badge>
            {item.isSample && <Badge variant="sample">Sample</Badge>}
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-2.5">
          <div className="flex items-center gap-2 text-xs text-slate dark:text-[#A09F97] font-mono">
            <Calendar className="w-3 h-3 text-copper dark:text-[#D29A78]" />
            <time dateTime={item.date}>{item.date}</time>
          </div>

          <h3 className="font-display text-xl text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors leading-snug line-clamp-2">
            <Link href={`/news/${item.slug}`} className="focus:outline-none focus:underline">
              {getLocalized(item.title)}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate dark:text-[#C6C5BD] leading-relaxed line-clamp-3">
            {getLocalized(item.summary)}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-warm-grey/50 dark:border-[#41413B]/50 mt-4">
        <Link
          href={`/news/${item.slug}`}
          aria-label={`${t("readMore")}: ${getLocalized(item.title)}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] group-hover:text-copper dark:group-hover:text-[#D29A78] transition-colors"
        >
          <span>{t("readMore")}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-copper dark:text-[#D29A78]" />
        </Link>
        <span className="text-[10px] text-slate dark:text-[#A09F97] font-mono">Official Notice</span>
      </div>
    </article>
  );
};
