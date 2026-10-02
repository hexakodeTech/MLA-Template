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

  React.useEffect(() => {
    if (article) {
      if (language === "ml" && article.title.ml) {
        document.title = `${article.title.ml} | ശ്രീ രമേഷ് പിഷാരടി`;
      } else {
        document.title = `${article.title.en} | Shri Ramesh Pisharady`;
      }
    }
  }, [language, article]);

  if (!article) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4 bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
        <h1 className="font-display text-3xl text-charcoal dark:text-[#F4F1E9]">
          Announcement Not Found
        </h1>
        <p className="text-slate dark:text-[#C6C5BD] text-sm mt-2">
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
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
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
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-copper dark:text-[#D29A78]" />
          <span>{language === "ml" ? "എല്ലാ വാർത്തകളിലേക്കും" : "Back to All Announcements"}</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-warm-grey dark:border-[#41413B] pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="copper">{article.category}</Badge>
          {article.isSample && (
            <Badge variant="sample">
              {language === "ml" ? "മാതൃകാ വാർത്ത" : "Demonstration Release"}
            </Badge>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal dark:text-[#F4F1E9] leading-tight">
          {getLocalized(article.title)}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate dark:text-[#A09F97] font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
            <time dateTime={article.date}>{article.date}</time>
          </span>
          {article.sourceAttribution && (
            <>
              <span>•</span>
              <span className="text-slate dark:text-[#C6C5BD]">Source: {article.sourceAttribution}</span>
            </>
          )}
        </div>
      </header>

      {/* Main Image & Caption */}
      {article.imageUrl && (
        <div className="space-y-2">
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-stone dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              alt={getLocalized(article.title)}
              className="w-full h-full object-cover"
            />
          </div>
          {article.imageCaption && (
            <p className="text-xs text-slate dark:text-[#A09F97] italic text-center font-mono">
              {getLocalized(article.imageCaption)}
            </p>
          )}
        </div>
      )}

      {/* Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          {/* Summary Lead */}
          <p className="text-lg sm:text-xl font-medium text-charcoal dark:text-[#F4F1E9] leading-relaxed border-l-4 border-copper dark:border-[#D29A78] pl-5 py-1 bg-stone/50 dark:bg-[#222320]/60 rounded-r-xs">
            {getLocalized(article.summary)}
          </p>

          {/* Full Content */}
          <div className="text-base text-slate dark:text-[#C6C5BD] leading-relaxed space-y-4 whitespace-pre-line font-light">
            {getLocalized(article.content)}
          </div>

          {/* Prototype disclaimer box */}
          <div className="p-4 rounded-sm bg-copper/10 border border-copper/30 dark:border-[#D29A78]/30 text-xs text-charcoal dark:text-[#F4F1E9] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> This article is an editorial sample developed to showcase the website layout and content structure. Official news entries will be drafted and published following office clearance.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 space-y-3.5 text-xs shadow-xs">
            <h4 className="font-bold text-xs text-charcoal dark:text-[#F4F1E9] uppercase tracking-widest border-b border-warm-grey dark:border-[#41413B] pb-2">
              Publication Metadata
            </h4>
            <div className="space-y-2 text-slate dark:text-[#C6C5BD]">
              <div className="flex justify-between py-1 border-b border-warm-grey/60 dark:border-[#41413B]/60">
                <span>Release Type:</span>
                <span className="font-semibold text-charcoal dark:text-[#F4F1E9]">{article.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-grey/60 dark:border-[#41413B]/60">
                <span>Date:</span>
                <span className="font-mono text-charcoal dark:text-[#F4F1E9]">{article.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-grey/60 dark:border-[#41413B]/60">
                <span>Issued by:</span>
                <span className="font-medium text-charcoal dark:text-[#F4F1E9]">{article.sourceAttribution || "Secretariat"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Status:</span>
                <span className="text-copper dark:text-[#D29A78] font-bold">Verified Concept</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-sm border border-warm-grey dark:border-[#41413B] bg-white dark:bg-[#2C2D29] space-y-3 shadow-xs">
            <h4 className="font-display text-lg text-charcoal dark:text-[#F4F1E9]">
              Have questions about this release?
            </h4>
            <p className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed">
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
        <div className="pt-12 border-t border-warm-grey dark:border-[#41413B] space-y-6">
          <h3 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
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
