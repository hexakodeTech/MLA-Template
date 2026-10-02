import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { mockGallery } from "@/data/mockData";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGallerySchema } from "@/components/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photographs and visual highlights from public activities, constituency engagements and events featured on the official representative portal of Shri Ramesh Pisharady.",
  alternates: {
    canonical: `${siteConfig.url}/gallery`,
  },
  openGraph: {
    type: "website",
    siteName: "Shri Ramesh Pisharady",
    title: "Gallery | Shri Ramesh Pisharady",
    description:
      "Browse photographs and visual highlights from public activities, constituency engagements and events featured on the official representative portal of Shri Ramesh Pisharady.",
    url: `${siteConfig.url}/gallery`,
    locale: "en_IN",
    alternateLocale: "ml_IN",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Gallery | Shri Ramesh Pisharady",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Shri Ramesh Pisharady",
    description:
      "Browse photographs and visual highlights from public activities, constituency engagements and events featured on the official representative portal of Shri Ramesh Pisharady.",
    images: ["/images/og-preview.png"],
  },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={getGallerySchema(mockGallery)} />
      <GalleryClient />
    </>
  );
}
