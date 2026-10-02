import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAboutSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: {
    absolute: "About Shri Ramesh Pisharady | Official Representative Portal",
  },
  description:
    "Learn more about Shri Ramesh Pisharady, his public profile, role and work, and explore information available through the official representative portal.",
  openGraph: {
    type: "website",
    title: "About Shri Ramesh Pisharady | Official Representative Portal",
    description:
      "Learn more about Shri Ramesh Pisharady, his public profile, role and work, and explore information available through the official representative portal.",
    url: "/about",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "About Shri Ramesh Pisharady | Official Representative Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Shri Ramesh Pisharady | Official Representative Portal",
    description:
      "Learn more about Shri Ramesh Pisharady, his public profile, role and work, and explore information available through the official representative portal.",
    images: ["/images/og-preview.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={getAboutSchema()} />
      <AboutClient />
    </>
  );
}
