import type { Metadata } from "next";
import { mockActivities } from "@/data/mockData";
import ActivityDetailClient from "./ActivityDetailClient";

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
    };
  }

  return {
    title: activity.title.en,
    description: activity.description.en,
  };
}

export default function ActivityDetailPage() {
  return <ActivityDetailClient />;
}
