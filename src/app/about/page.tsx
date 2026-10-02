import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: {
    absolute: "About Shri Ramesh Pisharady | Official Representative Portal",
  },
  description:
    "Learn more about Shri Ramesh Pisharady, his public profile, role and work, and explore information available through the official representative portal.",
};

export default function AboutPage() {
  return <AboutClient />;
}
