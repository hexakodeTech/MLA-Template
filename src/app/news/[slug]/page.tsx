"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  Info,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NewsCard } from "@/components/news/NewsCard";
import { mockNews } from "@/data/mockData";

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, getLocalized, t } = useLanguage();

  const article = mockNews.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h1 className="font-serif font-bold text-2xl text-navy-950">
          Announcement Not Found
        </h1>
        <p className="text-slate-600 text-sm mt-2">
          The requested news announcement could not be located.
        </p>
        <div className="mt-6">
          <Button href="/news" variant="primary" size="md">
            Return to Announcements
          </Button>
        </div>
      </div>
    );
  }

  const relatedArticles = mockNews
    .filter((item) => item.id !== article.id)
    .slice(0, 2);

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: t("navNews"), href: "/news" },
          { label: getLocalized(article.title) },
        ]}
      />

      {/* Back button */}
      <div>
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "ml" ? "എല്ലാ വാർത്തകളിലേക്കും" : "Back to All Announcements"}</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="navy">{article.category}</Badge>
          {article.isSample && (
            <Badge variant="sample">
              {language === "ml" ? "മാതൃകാ വാർത്ത" : "Demonstration Release"}
            </Badge>
          )}
        </div>

        <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-navy-950 leading-tight">
          {getLocalized(article.title)}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold-500" />
            <time dateTime={article.date}>{article.date}</time>
          </span>
          {article.sourceAttribution && (
            <>
              <span>•</span>
              <span className="text-slate-600">Source: {article.sourceAttribution}</span>
            </>
          )}
        </div>
      </header>

      {/* Main Image & Caption */}
      {article.imageUrl && (
        <div className="space-y-2">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              alt={getLocalized(article.title)}
              className="w-full h-full object-cover"
            />
          </div>
          {article.imageCaption && (
            <p className="text-xs text-slate-500 italic text-center">
              {getLocalized(article.imageCaption)}
            </p>
          )}
        </div>
      )}

      {/* Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Summary Lead */}
          <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed border-l-4 border-navy-900 pl-4 py-1 bg-slate-50 rounded-r">
            {getLocalized(article.summary)}
          </p>

          {/* Full Content */}
          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
            {getLocalized(article.content)}
          </div>

          {/* Prototype disclaimer box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> This article is an editorial sample developed to showcase the website layout and content structure. Official news entries will be drafted and published following office clearance.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-sand-100 rounded-xl border border-sand-300 p-5 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-navy-950 uppercase tracking-wider text-xs">
              Publication Metadata
            </h4>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between py-1 border-b border-sand-200">
                <span>Release Type:</span>
                <span className="font-semibold text-slate-900">{article.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sand-200">
                <span>Date:</span>
                <span className="font-mono text-slate-900">{article.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sand-200">
                <span>Issued by:</span>
                <span className="font-medium text-slate-900">{article.sourceAttribution || "Secretariat"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Status:</span>
                <span className="text-emerald-700 font-semibold">Verified Prototype</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
            <h4 className="font-serif font-bold text-sm text-navy-950">
              Have questions about this release?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit your enquiry directly to the constituency desk for official clarification.
            </p>
            <Button href="/contact" variant="primary" size="sm" className="w-full">
              Contact Constituency Desk
            </Button>
          </div>
        </aside>
      </div>

      {/* Related Announcements */}
      {relatedArticles.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
          <h3 className="font-serif font-bold text-xl text-navy-950">
            {language === "ml" ? "ബന്ധപ്പെട്ട മറ്റ് അറിയിപ്പുകൾ" : "Related Announcements"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <NewsCard key={rel.id} item={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
