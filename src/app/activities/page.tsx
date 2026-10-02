import type { Metadata } from "next";
import ActivitiesClient from "./ActivitiesClient";

export const metadata: Metadata = {
  title: "Public Activities & Engagements",
  description:
    "Explore public activities, constituency engagements, meetings and community interactions featured on the official representative portal of Shri Ramesh Pisharady.",
};

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}
