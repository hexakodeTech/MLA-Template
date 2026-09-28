"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Info,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockActivities } from "@/data/mockData";
import { ActivityCard } from "@/components/activities/ActivityCard";

export default function ActivityDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, getLocalized, t } = useLanguage();

  const activity = mockActivities.find((item) => item.slug === slug);

  if (!activity) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4 bg-ivory dark:bg-[#111C18] text-charcoal dark:text-[#F5F2E9]">
        <h1 className="font-display text-3xl text-charcoal dark:text-[#F5F2E9]">
          Activity Record Not Found
        </h1>
        <p className="text-charcoal-muted dark:text-[#C3CDC4] text-sm mt-2">
          The requested public activity entry could not be found.
        </p>
        <div className="mt-6">
          <Button href="/activities" variant="primary" size="md">
            Return to Activities
          </Button>
        </div>
      </div>
    );
  }

  const relatedActivities = mockActivities
    .filter((item) => item.id !== activity.id)
    .slice(0, 2);

  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans bg-ivory dark:bg-[#111C18] text-charcoal dark:text-[#F5F2E9]">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: t("navActivities"), href: "/activities" },
          { label: getLocalized(activity.title) },
        ]}
      />

      {/* Back button */}
      <div>
        <Link
          href="/activities"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest dark:text-[#8CB99B] hover:text-forest-dark dark:hover:text-[#9dc4ab] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "ml" ? "എല്ലാ പ്രവർത്തനങ്ങളിലേക്കും" : "Back to All Activities"}</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-sage-border dark:border-[#35463C] pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="forest">{activity.category}</Badge>
          {activity.isSample && (
            <Badge variant="sample">
              {language === "ml" ? "മാതൃകാ ഡയറി" : "Demonstration Activity"}
            </Badge>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal dark:text-[#F5F2E9] leading-tight">
          {getLocalized(activity.title)}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-light dark:text-[#99A99D] font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-terracotta dark:text-[#E19A76]" />
            <time dateTime={activity.date}>{activity.date}</time>
          </span>
          <span className="flex items-center gap-1.5 text-forest dark:text-[#8CB99B] font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{getLocalized(activity.location)}</span>
          </span>
        </div>
      </header>

      {/* Main image */}
      {activity.imageUrl && (
        <div className="space-y-2">
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-sage/30 dark:bg-[#182720] border border-sage-border dark:border-[#35463C] shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activity.imageUrl}
              alt={getLocalized(activity.title)}
              className="w-full h-full object-cover"
            />
          </div>
          {activity.imageCaption && (
            <p className="text-xs text-charcoal-light dark:text-[#99A99D] italic text-center font-mono">
              {getLocalized(activity.imageCaption)}
            </p>
          )}
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <p className="text-lg sm:text-xl font-medium text-charcoal dark:text-[#F5F2E9] leading-relaxed border-l-4 border-forest dark:border-[#8CB99B] pl-5 py-1 bg-sage/20 dark:bg-[#182720]/60 rounded-r-xs">
            {getLocalized(activity.description)}
          </p>

          <div className="text-base text-charcoal-muted dark:text-[#C3CDC4] leading-relaxed space-y-4 whitespace-pre-line font-light">
            {activity.fullDetails ? getLocalized(activity.fullDetails) : getLocalized(activity.description)}
          </div>

          <div className="p-4 rounded-sm bg-terracotta-soft/30 dark:bg-terracotta/10 border border-terracotta/30 dark:border-[#E19A76]/30 text-xs text-charcoal dark:text-[#F5F2E9] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-terracotta dark:text-[#E19A76] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Office Verification Note:</strong> Official activity updates will be cleared and published by the representative&apos;s secretariat. No unauthorized claims are implied.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-sage/25 dark:bg-[#182720] rounded-sm border border-sage-border dark:border-[#35463C] p-6 space-y-3.5 text-xs">
            <h4 className="font-bold text-xs text-charcoal dark:text-[#F5F2E9] uppercase tracking-widest border-b border-sage-border dark:border-[#35463C] pb-2">
              Event Particulars
            </h4>
            <div className="space-y-2 text-charcoal-muted dark:text-[#C3CDC4]">
              <div className="flex justify-between py-1 border-b border-sage-border/50 dark:border-[#35463C]/50">
                <span>Category:</span>
                <span className="font-semibold text-charcoal dark:text-[#F5F2E9]">{activity.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sage-border/50 dark:border-[#35463C]/50">
                <span>Date:</span>
                <span className="font-mono text-charcoal dark:text-[#F5F2E9]">{activity.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sage-border/50 dark:border-[#35463C]/50">
                <span>Location:</span>
                <span className="font-medium text-charcoal dark:text-[#F5F2E9]">{getLocalized(activity.location)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Office Log:</span>
                <span className="text-forest dark:text-[#8CB99B] font-semibold">Active Record</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related activities */}
      {relatedActivities.length > 0 && (
        <div className="pt-12 border-t border-sage-border dark:border-[#35463C] space-y-6">
          <h3 className="font-display text-2xl text-charcoal dark:text-[#F5F2E9]">
            {language === "ml" ? "മറ്റ് പരിപാടികൾ" : "Other Public Engagements"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedActivities.map((rel) => (
              <ActivityCard key={rel.id} activity={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
