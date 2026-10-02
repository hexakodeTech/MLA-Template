import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockActivities } from "@/data/mockData";
import ActivityDetailClient from "./ActivityDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getActivityDetailSchema } from "@/components/seo/schema";
import { siteConfig } from "@/config/site";

export async function generateStaticParams() {
  return mockActivities.map((item) => ({
    slug: item.slug,
  }));
}

/**
 * Safely resolves an activity image URL to an absolute production URL.
 * - Accepts both absolute and relative image URLs.
 * - Converts relative URLs to absolute production URLs using siteConfig.url.
 * - Preserves valid external image URLs.
 * - Falls back to /images/og-preview.png if missing or malformed.
 */
function getAbsoluteActivityImageUrl(imageUrl?: string | null): string {
  if (!imageUrl || typeof imageUrl !== "string") {
    return `${siteConfig.url}/images/og-preview.png`;
  }

  const trimmed = imageUrl.trim();
  if (!trimmed) {
    return `${siteConfig.url}/images/og-preview.png`;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${siteConfig.url}${normalizedPath}`;
}

/**
 * Deterministically retrieves a concise meta description from activity data.
 * Priority:
 * 1. activity.description.en
 * 2. Formatted fallback from existing activity.fullDetails.en
 * 3. Verified safe default portal notice (no fabricated facts)
 */
function getActivityMetaDescription(activity: (typeof mockActivities)[number]): string {
  const desc = activity.description?.en?.trim();
  if (desc) {
    return desc;
  }

  const fullDetails = activity.fullDetails?.en;
  if (fullDetails && typeof fullDetails === "string") {
    const cleaned = fullDetails
      .replace(/\r?\n|\r/g, " ")
      .replace(/[*_#`[\]]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (cleaned) {
      return cleaned.length > 160 ? `${cleaned.slice(0, 157)}...` : cleaned;
    }
  }

  return "Public representative activity and community engagement record of Shri Ramesh Pisharady.";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activity = mockActivities.find((item) => item.slug === slug);

  if (!activity) {
    return {
      title: {
        absolute: "Activity Record Not Found | Shri Ramesh Pisharady",
      },
      description: "The requested public activity entry could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle = `${activity.title.en} | Shri Ramesh Pisharady`;
  const description = getActivityMetaDescription(activity);
  const canonicalUrl = `${siteConfig.url}/activities/${activity.slug}`;
  const absoluteImageUrl = getAbsoluteActivityImageUrl(activity.imageUrl);

  return {
    title: {
      absolute: pageTitle,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: "Shri Ramesh Pisharady",
      locale: "en_IN",
      publishedTime: activity.date,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: activity.title.en,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = mockActivities.find((item) => item.slug === slug);

  if (!activity) {
    notFound();
  }

  return (
    <>
      <JsonLd data={getActivityDetailSchema(activity)} />
      <ActivityDetailClient />
    </>
  );
}
