import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy explaining how information is handled when using the official representative portal of Shri Ramesh Pisharady.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
