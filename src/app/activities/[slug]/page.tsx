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
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h1 className="font-serif font-bold text-2xl text-navy-950">
          Activity Record Not Found
        </h1>
        <p className="text-slate-600 text-sm mt-2">
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
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "ml" ? "എല്ലാ പ്രവർത്തനങ്ങളിലേക്കും" : "Back to All Activities"}</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="green">{activity.category}</Badge>
          {activity.isSample && (
            <Badge variant="sample">
              {language === "ml" ? "മാതൃകാ ഡയറി" : "Demonstration Activity"}
            </Badge>
          )}
        </div>

        <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-navy-950 leading-tight">
          {getLocalized(activity.title)}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold-500" />
            <time dateTime={activity.date}>{activity.date}</time>
          </span>
          <span className="flex items-center gap-1.5 text-forest-700">
            <MapPin className="w-3.5 h-3.5" />
            <span>{getLocalized(activity.location)}</span>
          </span>
        </div>
      </header>

      {/* Main image */}
      {activity.imageUrl && (
        <div className="space-y-2">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activity.imageUrl}
              alt={getLocalized(activity.title)}
              className="w-full h-full object-cover"
            />
          </div>
          {activity.imageCaption && (
            <p className="text-xs text-slate-500 italic text-center">
              {getLocalized(activity.imageCaption)}
            </p>
          )}
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed border-l-4 border-forest-700 pl-4 py-1 bg-forest-50/50 rounded-r">
            {getLocalized(activity.description)}
          </p>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
            {activity.fullDetails ? getLocalized(activity.fullDetails) : getLocalized(activity.description)}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Office Verification Note:</strong> Official activity updates will be cleared and published by the representative&apos;s secretariat. No unauthorized claims are implied.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-sand-100 rounded-xl border border-sand-300 p-5 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-navy-950 uppercase tracking-wider text-xs">
              Event Particulars
            </h4>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between py-1 border-b border-sand-200">
                <span>Category:</span>
                <span className="font-semibold text-slate-900">{activity.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sand-200">
                <span>Date:</span>
                <span className="font-mono text-slate-900">{activity.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sand-200">
                <span>Location:</span>
                <span className="font-medium text-slate-900">{getLocalized(activity.location)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Office Log:</span>
                <span className="text-emerald-700 font-semibold">Active Record</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related activities */}
      {relatedActivities.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
          <h3 className="font-serif font-bold text-xl text-navy-950">
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
