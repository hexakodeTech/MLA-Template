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
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, featured = false }) => {
  const { getLocalized, language, t } = useLanguage();

  return (
    <article
      className={`group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col ${
        featured ? "md:grid md:grid-cols-12 md:gap-6" : ""
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative bg-slate-100 overflow-hidden ${
          featured ? "md:col-span-5 aspect-[16/10] md:aspect-auto" : "aspect-[16/10]"
        }`}
      >
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={getLocalized(item.title)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs">
            Official Media Placeholder
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <Badge variant="navy">{item.category}</Badge>
          {item.isSample && (
            <Badge variant="sample">
              {language === "ml" ? "മാതൃക" : "Sample"}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={`p-5 flex-1 flex flex-col justify-between ${
          featured ? "md:col-span-7 md:p-6" : ""
        }`}
      >
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
            <Calendar className="w-3.5 h-3.5 text-gold-500" />
            <time dateTime={item.date}>{item.date}</time>
            {item.sourceAttribution && (
              <>
                <span>•</span>
                <span className="text-slate-400 truncate">{item.sourceAttribution}</span>
              </>
            )}
          </div>

          <h3
            className={`font-serif font-bold text-navy-950 group-hover:text-navy-700 transition-colors line-clamp-2 ${
              featured ? "text-xl md:text-2xl" : "text-base"
            }`}
          >
            <Link href={`/news/${item.slug}`} className="focus:outline-none focus:underline">
              {getLocalized(item.title)}
            </Link>
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {getLocalized(item.summary)}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/news/${item.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 group-hover:text-gold-600 transition-colors"
          >
            <span>{t("readMore")}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {item.isSample && (
            <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Demo Entry
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
