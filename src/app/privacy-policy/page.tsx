import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Governance framework and privacy policies governing data handling, citizen communications, and enquiry privacy on the portal.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
