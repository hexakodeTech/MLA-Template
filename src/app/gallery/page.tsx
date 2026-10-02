import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photographs and visual highlights from public activities, constituency engagements and events featured on the official representative portal of Shri Ramesh Pisharady.",
  openGraph: {
    type: "website",
    title: "Gallery | Shri Ramesh Pisharady",
    description:
      "Browse photographs and visual highlights from public activities, constituency engagements and events featured on the official representative portal of Shri Ramesh Pisharady.",
    url: "/gallery",
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
  return <GalleryClient />;
}
