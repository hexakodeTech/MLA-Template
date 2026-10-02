import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContactSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: "Contact the Office",
  description:
    "Find official office contact information and submit enquiries through the official representative portal of Shri Ramesh Pisharady.",
  openGraph: {
    type: "website",
    title: "Contact the Office | Shri Ramesh Pisharady",
    description:
      "Find official office contact information and submit enquiries through the official representative portal of Shri Ramesh Pisharady.",
    url: "/contact",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Contact the Office | Shri Ramesh Pisharady",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact the Office | Shri Ramesh Pisharady",
    description:
      "Find official office contact information and submit enquiries through the official representative portal of Shri Ramesh Pisharady.",
    images: ["/images/og-preview.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={getContactSchema()} />
      <ContactClient />
    </>
  );
}
