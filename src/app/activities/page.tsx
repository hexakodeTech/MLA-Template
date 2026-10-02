import type { Metadata } from "next";
import ActivitiesClient from "./ActivitiesClient";

export const metadata: Metadata = {
  title: "Public Activities & Engagements",
  description:
    "Explore public activities, constituency engagements, meetings and community interactions featured on the official representative portal of Shri Ramesh Pisharady.",
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
};

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}
