import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact the Office",
  description:
    "Find official office contact information and submit enquiries through the official representative portal of Shri Ramesh Pisharady.",
};

export default function ContactPage() {
  return <ContactClient />;
}
