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
      <div className="py-24 text-center max-w-xl mx-auto px-4 bg-ivory dark:bg-[#111C18] text-charcoal dark:text-[#F5F2E9]">
        <h1 className="font-display text-3xl text-charcoal dark:text-[#F5F2E9]">
          Announcement Not Found
        </h1>
        <p className="text-charcoal-muted dark:text-[#C3CDC4] text-sm mt-2">
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
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans bg-ivory dark:bg-[#111C18] text-charcoal dark:text-[#F5F2E9]">
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
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest dark:text-[#8CB99B] hover:text-forest-dark dark:hover:text-[#9dc4ab] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "ml" ? "എല്ലാ വാർത്തകളിലേക്കും" : "Back to All Announcements"}</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-sage-border dark:border-[#35463C] pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="forest">{article.category}</Badge>
          {article.isSample && (
            <Badge variant="sample">
              {language === "ml" ? "മാതൃകാ വാർത്ത" : "Demonstration Release"}
            </Badge>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal dark:text-[#F5F2E9] leading-tight">
          {getLocalized(article.title)}
        </h1>

        <div className="flex items-center gap-4 text-xs text-charcoal-light dark:text-[#99A99D] font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-terracotta dark:text-[#E19A76]" />
            <time dateTime={article.date}>{article.date}</time>
          </span>
          {article.sourceAttribution && (
            <>
              <span>•</span>
              <span className="text-charcoal-muted dark:text-[#C3CDC4]">Source: {article.sourceAttribution}</span>
            </>
          )}
        </div>
      </header>

      {/* Main Image & Caption */}
      {article.imageUrl && (
        <div className="space-y-2">
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-sage/30 dark:bg-[#182720] border border-sage-border dark:border-[#35463C] shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              alt={getLocalized(article.title)}
              className="w-full h-full object-cover"
            />
          </div>
          {article.imageCaption && (
            <p className="text-xs text-charcoal-light dark:text-[#99A99D] italic text-center font-mono">
              {getLocalized(article.imageCaption)}
            </p>
          )}
        </div>
      )}

      {/* Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          {/* Summary Lead */}
          <p className="text-lg sm:text-xl font-medium text-charcoal dark:text-[#F5F2E9] leading-relaxed border-l-4 border-forest dark:border-[#8CB99B] pl-5 py-1 bg-sage/20 dark:bg-[#182720]/60 rounded-r-xs">
            {getLocalized(article.summary)}
          </p>

          {/* Full Content */}
          <div className="text-base text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed space-y-4 whitespace-pre-line font-light">
            {getLocalized(article.content)}
          </div>

          {/* Prototype disclaimer box */}
          <div className="p-4 rounded-sm bg-terracotta-soft/30 dark:bg-terracotta/10 border border-terracotta/30 dark:border-[#E19A76]/30 text-xs text-charcoal dark:text-[#F5F2E9] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> This article is an editorial sample developed to showcase the website layout and content structure. Official news entries will be drafted and published following office clearance.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-sage/25 dark:bg-[#182720] rounded-sm border border-sage-border dark:border-[#35463C] p-6 space-y-3.5 text-xs">
            <h4 className="font-bold text-xs text-charcoal dark:text-[#F5F2E9] uppercase tracking-widest border-b border-sage-border dark:border-[#35463C] pb-2">
              Publication Metadata
            </h4>
            <div className="space-y-2 text-charcoal-muted dark:text-[#C3CDC4]">
              <div className="flex justify-between py-1 border-b border-sage-border/50 dark:border-[#35463C]/50">
                <span>Release Type:</span>
                <span className="font-semibold text-charcoal dark:text-[#F5F2E9]">{article.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sage-border/50 dark:border-[#35463C]/50">
                <span>Date:</span>
                <span className="font-mono text-charcoal dark:text-[#F5F2E9]">{article.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sage-border/50 dark:border-[#35463C]/50">
                <span>Issued by:</span>
                <span className="font-medium text-charcoal dark:text-[#F5F2E9]">{article.sourceAttribution || "Secretariat"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Status:</span>
                <span className="text-forest dark:text-[#8CB99B] font-bold">Verified Concept</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-sm border border-sage-border dark:border-[#35463C] bg-white dark:bg-[#182720] space-y-3">
            <h4 className="font-display text-lg text-charcoal dark:text-[#F5F2E9]">
              Have questions about this release?
            </h4>
            <p className="text-xs text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed">
              Submit your enquiry directly to the constituency desk for official clarification.
            </p>
            <Button href="/contact" variant="primary" size="sm" className="w-full">
              Contact Secretariat Desk
            </Button>
          </div>
        </aside>
      </div>

      {/* Related Announcements */}
      {relatedArticles.length > 0 && (
        <div className="pt-12 border-t border-sage-border dark:border-[#35463C] space-y-6">
          <h3 className="font-display text-2xl text-charcoal dark:text-[#F5F2E9]">
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
