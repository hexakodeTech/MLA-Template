import type { Metadata } from "next";
import AccessibilityClient from "./AccessibilityClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getWebPageSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Learn about the accessibility features and support available on the official representative portal of Shri Ramesh Pisharady.",
  openGraph: {
    type: "website",
    title: "Accessibility | Shri Ramesh Pisharady",
    description:
      "Learn about the accessibility features and support available on the official representative portal of Shri Ramesh Pisharady.",
    url: "/accessibility",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Accessibility | Shri Ramesh Pisharady",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessibility | Shri Ramesh Pisharady",
    description:
      "Learn about the accessibility features and support available on the official representative portal of Shri Ramesh Pisharady.",
    images: ["/images/og-preview.png"],
  },
};

export default function AccessibilityPage() {
  return (
    <>
      <JsonLd
        data={getWebPageSchema({
          title: "Accessibility",
          description:
            "Learn about the accessibility features and support available on the official representative portal of Shri Ramesh Pisharady.",
          path: "/accessibility",
          breadcrumbName: "Accessibility",
        })}
      />
      <AccessibilityClient />
    </>
  );
}
