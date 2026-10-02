import type { Metadata } from "next";
import AccessibilityClient from "./AccessibilityClient";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Learn about the accessibility features and support available on the official representative portal of Shri Ramesh Pisharady.",
};

export default function AccessibilityPage() {
  return <AccessibilityClient />;
}
