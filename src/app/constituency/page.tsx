import type { Metadata } from "next";
import ConstituencyClient from "./ConstituencyClient";

export const metadata: Metadata = {
  title: "Palakkad Constituency",
  description:
    "Explore information about the constituency, public resources, local information and constituency-related updates through the official representative portal.",
  openGraph: {
    type: "website",
    title: "Palakkad Constituency | Shri Ramesh Pisharady",
    description:
      "Explore information about the constituency, public resources, local information and constituency-related updates through the official representative portal.",
    url: "/constituency",
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
  return <ConstituencyClient />;
}
