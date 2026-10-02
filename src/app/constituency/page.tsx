import type { Metadata } from "next";
import ConstituencyClient from "./ConstituencyClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getConstituencySchema } from "@/components/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Palakkad Constituency",
  description:
    "Explore information about the constituency, public resources, local information and constituency-related updates through the official representative portal.",
  alternates: {
    canonical: `${siteConfig.url}/constituency`,
  },
  openGraph: {
    type: "website",
    siteName: "Shri Ramesh Pisharady",
    title: "Palakkad Constituency | Shri Ramesh Pisharady",
    description:
      "Explore information about the constituency, public resources, local information and constituency-related updates through the official representative portal.",
    url: `${siteConfig.url}/constituency`,
    locale: "en_IN",
    alternateLocale: "ml_IN",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Palakkad Constituency | Shri Ramesh Pisharady",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palakkad Constituency | Shri Ramesh Pisharady",
    description:
      "Explore information about the constituency, public resources, local information and constituency-related updates through the official representative portal.",
    images: ["/images/og-preview.png"],
  },
};

export default function ConstituencyPage() {
  return (
    <>
      <JsonLd data={getConstituencySchema()} />
      <ConstituencyClient />
    </>
  );
}
