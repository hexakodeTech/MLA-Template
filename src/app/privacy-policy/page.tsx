import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getWebPageSchema } from "@/components/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy explaining how information is handled when using the official representative portal of Shri Ramesh Pisharady.",
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
  openGraph: {
    type: "website",
    siteName: "Shri Ramesh Pisharady",
    title: "Privacy Policy | Shri Ramesh Pisharady",
    description:
      "Read the privacy policy explaining how information is handled when using the official representative portal of Shri Ramesh Pisharady.",
    url: `${siteConfig.url}/privacy-policy`,
    locale: "en_IN",
    alternateLocale: "ml_IN",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy | Shri Ramesh Pisharady",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Shri Ramesh Pisharady",
    description:
      "Read the privacy policy explaining how information is handled when using the official representative portal of Shri Ramesh Pisharady.",
    images: ["/images/og-preview.png"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={getWebPageSchema({
          title: "Privacy Policy",
          alternateName: "സ്വകാര്യതാ നയം | ശ്രീ രമേഷ് പിഷാരടി",
          description:
            "Read the privacy policy explaining how information is handled when using the official representative portal of Shri Ramesh Pisharady.",
          path: "/privacy-policy",
          breadcrumbName: "Privacy Policy",
        })}
      />
      <PrivacyPolicyClient />
    </>
  );
}
