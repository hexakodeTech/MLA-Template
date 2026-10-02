import type { Metadata } from "next";
import ActivitiesClient from "./ActivitiesClient";
import { mockActivities } from "@/data/mockData";
import { JsonLd } from "@/components/seo/JsonLd";
import { getActivitiesListingSchema } from "@/components/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Public Activities & Engagements",
  description:
    "Explore public activities, constituency engagements, meetings and community interactions featured on the official representative portal of Shri Ramesh Pisharady.",
  alternates: {
    canonical: `${siteConfig.url}/activities`,
  },
  openGraph: {
    type: "website",
    title: "Public Activities & Engagements | Shri Ramesh Pisharady",
    description:
      "Explore public activities, constituency engagements, meetings and community interactions featured on the official representative portal of Shri Ramesh Pisharady.",
    url: "/activities",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Public Activities & Engagements | Shri Ramesh Pisharady",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Public Activities & Engagements | Shri Ramesh Pisharady",
    description:
      "Explore public activities, constituency engagements, meetings and community interactions featured on the official representative portal of Shri Ramesh Pisharady.",
    images: ["/images/og-preview.png"],
  },
};

export default function ActivitiesPage() {
  return (
    <>
      <JsonLd data={getActivitiesListingSchema(mockActivities)} />
      <ActivitiesClient />
    </>
  );
}
