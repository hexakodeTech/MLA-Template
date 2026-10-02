import type { Metadata } from "next";
import { mockActivities } from "@/data/mockData";
import ActivityDetailClient from "./ActivityDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getActivityDetailSchema } from "@/components/seo/schema";

export async function generateStaticParams() {
  return mockActivities.map((item) => ({
    slug: item.slug,
  }));
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
      title: "Activity Record Not Found",
      description: "The requested public activity entry could not be found.",
    };
  }

  const ogImages = activity.imageUrl
    ? [
        {
          url: activity.imageUrl,
          width: 1200,
          height: 630,
          alt: activity.title.en,
        },
      ]
    : [
        {
          url: "/images/og-preview.png",
          width: 1200,
          height: 630,
          alt: activity.title.en,
        },
      ];

  return {
    title: activity.title.en,
    description: activity.description.en,
    openGraph: {
      type: "article",
      title: `${activity.title.en} | Shri Ramesh Pisharady`,
      description: activity.description.en,
      url: `/activities/${activity.slug}`,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${activity.title.en} | Shri Ramesh Pisharady`,
      description: activity.description.en,
      images: activity.imageUrl ? [activity.imageUrl] : ["/images/og-preview.png"],
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

  return (
    <>
      {activity && <JsonLd data={getActivityDetailSchema(activity)} />}
      <ActivityDetailClient />
    </>
  );
}
