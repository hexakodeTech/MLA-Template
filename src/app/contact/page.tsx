import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact the Office",
  description:
    "Official contact directory, visiting schedules, secretariat address, and online enquiry submission channels for the office of Shri Ramesh Pisharady in Palakkad.",
};

export default function ContactPage() {
  return <ContactClient />;
}
