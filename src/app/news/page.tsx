import type { Metadata } from "next";
import NewsClient from "./NewsClient";
import { mockNews } from "@/data/mockData";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNewsListingSchema } from "@/components/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "News & Announcements",
  description:
    "Read the latest news, public notices and announcements from the official representative portal of Shri Ramesh Pisharady.",
  alternates: {
    canonical: `${siteConfig.url}/news`,
  },
  openGraph: {
    type: "website",
    siteName: "Shri Ramesh Pisharady",
    title: "News & Announcements | Shri Ramesh Pisharady",
    description:
      "Read the latest news, public notices and announcements from the official representative portal of Shri Ramesh Pisharady.",
    url: `${siteConfig.url}/news`,
    locale: "en_IN",
    alternateLocale: "ml_IN",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "News & Announcements | Shri Ramesh Pisharady",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Announcements | Shri Ramesh Pisharady",
    description:
      "Read the latest news, public notices and announcements from the official representative portal of Shri Ramesh Pisharady.",
    images: ["/images/og-preview.png"],
  },
};

export default function NewsPage() {
  return (
    <>
      <JsonLd data={getNewsListingSchema(mockNews)} />
      <NewsClient />
    </>
  );
}
