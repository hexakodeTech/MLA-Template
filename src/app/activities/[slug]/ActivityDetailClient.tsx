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

  React.useEffect(() => {
    if (activity) {
      if (language === "ml" && activity.title.ml) {
        document.title = `${activity.title.ml} | ശ്രീ രമേഷ് പിഷാരടി`;
      } else {
        document.title = `${activity.title.en} | Shri Ramesh Pisharady`;
      }
    }
  }, [language, activity]);

  if (!activity) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4 bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
        <h1 className="font-display text-3xl text-charcoal dark:text-[#F4F1E9]">
          Activity Record Not Found
        </h1>
        <p className="text-slate dark:text-[#C6C5BD] text-sm mt-2">
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
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans bg-ivory dark:bg-[#191A18] text-charcoal dark:text-[#F4F1E9]">
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
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F4F1E9] hover:text-copper dark:hover:text-[#D29A78] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-copper dark:text-[#D29A78]" />
          <span>{language === "ml" ? "എല്ലാ പ്രവർത്തനങ്ങളിലേക്കും" : "Back to All Activities"}</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-warm-grey dark:border-[#41413B] pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="copper">{activity.category}</Badge>
          {activity.isSample && (
            <Badge variant="sample">
              {language === "ml" ? "മാതൃകാ ഡയറി" : "Demonstration Activity"}
            </Badge>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal dark:text-[#F4F1E9] leading-tight">
          {getLocalized(activity.title)}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate dark:text-[#A09F97] font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-copper dark:text-[#D29A78]" />
            <time dateTime={activity.date}>{activity.date}</time>
          </span>
          <span className="flex items-center gap-1.5 text-muted-blue dark:text-[#91A7B8] font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{getLocalized(activity.location)}</span>
          </span>
        </div>
      </header>

      {/* Main image */}
      {activity.imageUrl && (
        <div className="space-y-2">
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-stone dark:bg-[#222320] border border-warm-grey dark:border-[#41413B] shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activity.imageUrl}
              alt={getLocalized(activity.title)}
              className="w-full h-full object-cover"
            />
          </div>
          {activity.imageCaption && (
            <p className="text-xs text-slate dark:text-[#A09F97] italic text-center font-mono">
              {getLocalized(activity.imageCaption)}
            </p>
          )}
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <p className="text-lg sm:text-xl font-medium text-charcoal dark:text-[#F4F1E9] leading-relaxed border-l-4 border-copper dark:border-[#D29A78] pl-5 py-1 bg-stone/50 dark:bg-[#222320]/60 rounded-r-xs">
            {getLocalized(activity.description)}
          </p>

          <div className="text-base text-slate dark:text-[#C6C5BD] leading-relaxed space-y-4 whitespace-pre-line font-light">
            {activity.fullDetails ? getLocalized(activity.fullDetails) : getLocalized(activity.description)}
          </div>

          <div className="p-4 rounded-sm bg-copper/10 border border-copper/30 dark:border-[#D29A78]/30 text-xs text-charcoal dark:text-[#F4F1E9] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-copper dark:text-[#D29A78] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Office Verification Note:</strong> Official activity updates will be cleared and published by the representative&apos;s secretariat. No unauthorized claims are implied.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-6 space-y-3.5 text-xs shadow-xs">
            <h4 className="font-bold text-xs text-charcoal dark:text-[#F4F1E9] uppercase tracking-widest border-b border-warm-grey dark:border-[#41413B] pb-2">
              Event Particulars
            </h4>
            <div className="space-y-2 text-slate dark:text-[#C6C5BD]">
              <div className="flex justify-between py-1 border-b border-warm-grey/60 dark:border-[#41413B]/60">
                <span>Category:</span>
                <span className="font-semibold text-charcoal dark:text-[#F4F1E9]">{activity.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-grey/60 dark:border-[#41413B]/60">
                <span>Date:</span>
                <span className="font-mono text-charcoal dark:text-[#F4F1E9]">{activity.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-grey/60 dark:border-[#41413B]/60">
                <span>Location:</span>
                <span className="font-medium text-charcoal dark:text-[#F4F1E9]">{getLocalized(activity.location)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Office Log:</span>
                <span className="text-copper dark:text-[#D29A78] font-semibold">Active Record</span>
              </div>
            </div>
          </div>

          {/* Enquiry Card */}
          <div className="p-6 rounded-sm border border-warm-grey dark:border-[#41413B] bg-white dark:bg-[#2C2D29] space-y-3 shadow-xs">
            <h4 className="font-display text-lg text-charcoal dark:text-[#F4F1E9]">
              {language === "ml" ? "ഈ പരിപാടിയെക്കുറിച്ച് അന്വേഷണമുണ്ടോ?" : "Queries on this Engagement?"}
            </h4>
            <p className="text-xs text-slate dark:text-[#C6C5BD] leading-relaxed">
              {language === "ml"
                ? "കൂടുതൽ വിവരങ്ങൾക്കോ നിവേദനങ്ങൾക്കോ സെക്രട്ടേറിയറ്റുമായി നേരിട്ട് ബന്ധപ്പെടാം."
                : "Submit enquiries or constituent feedback regarding this public initiative to the secretariat desk."}
            </p>
            <Button href="/contact" variant="primary" size="sm" className="w-full">
              {language === "ml" ? "ഓഫീസുമായി ബന്ധപ്പെടുക" : "Contact Secretariat Desk"}
            </Button>
          </div>

          {/* Contextual Links to Constituency & News */}
          <div className="bg-white dark:bg-[#2C2D29] rounded-sm border border-warm-grey dark:border-[#41413B] p-5 space-y-3 text-xs shadow-xs">
            <h4 className="font-bold text-xs text-charcoal dark:text-[#F4F1E9] uppercase tracking-widest border-b border-warm-grey dark:border-[#41413B] pb-2">
              {language === "ml" ? "അനുബന്ധ വിവരങ്ങൾ" : "Related Portals"}
            </h4>
            <div className="space-y-2">
              <Link
                href="/constituency"
                className="group flex items-center justify-between text-xs text-slate dark:text-[#C6C5BD] hover:text-copper dark:hover:text-[#D29A78] transition-colors py-1"
              >
                <span>{language === "ml" ? "പാലക്കാട് മണ്ഡലം വിവരങ്ങൾ" : "Palakkad Constituency Profile"}</span>
                <span className="text-copper dark:text-[#D29A78] font-bold">→</span>
              </Link>
              <Link
                href="/news"
                className="group flex items-center justify-between text-xs text-slate dark:text-[#C6C5BD] hover:text-copper dark:hover:text-[#D29A78] transition-colors py-1 border-t border-warm-grey/40 dark:border-[#41413B]/40"
              >
                <span>{language === "ml" ? "ഔദ്യോഗിക അറിയിപ്പുകളും വാർത്തകളും" : "Official News & Releases"}</span>
                <span className="text-copper dark:text-[#D29A78] font-bold">→</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Related activities */}
      {relatedActivities.length > 0 && (
        <div className="pt-12 border-t border-warm-grey dark:border-[#41413B] space-y-6">
          <h3 className="font-display text-2xl text-charcoal dark:text-[#F4F1E9]">
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
