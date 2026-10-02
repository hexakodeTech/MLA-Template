import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockActivities } from "@/data/mockData";
import ActivityDetailClient from "./ActivityDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getActivityDetailSchema } from "@/components/seo/schema";
import { getActivityMetadata } from "@/components/seo/metadata";

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

  return getActivityMetadata(activity, "en");
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
