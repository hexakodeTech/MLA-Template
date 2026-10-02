import type { Metadata } from "next";
import ActivitiesClient from "./ActivitiesClient";

export const metadata: Metadata = {
  title: "Public Activities & Engagements",
  description:
    "Chronological diary of official constituency inspections, public meetings, cultural events, and community delegations by Shri Ramesh Pisharady.",
};

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}
