import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy explaining how information is handled when using the official representative portal of Shri Ramesh Pisharady.",
  openGraph: {
    type: "website",
    title: "Privacy Policy | Shri Ramesh Pisharady",
    description:
      "Read the privacy policy explaining how information is handled when using the official representative portal of Shri Ramesh Pisharady.",
    url: "/privacy-policy",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy | Shri Ramesh Pisharady",
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
