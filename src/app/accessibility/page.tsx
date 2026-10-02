import type { Metadata } from "next";
import AccessibilityClient from "./AccessibilityClient";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Accessibility statement, conformance standards, keyboard shortcuts, and assistive tooling details for the official representative portal.",
};

export default function AccessibilityPage() {
  return <AccessibilityClient />;
}
