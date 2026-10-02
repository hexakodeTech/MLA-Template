import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: {
    absolute: "About Shri Ramesh Pisharady | Official Representative Portal",
  },
  description:
    "Official profile, public role, institutional commitments, and verified background for Shri Ramesh Pisharady, representative of Palakkad Constituency.",
};

export default function AboutPage() {
  return <AboutClient />;
}
