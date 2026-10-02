import type { Metadata } from "next";
import ConstituencyClient from "./ConstituencyClient";

export const metadata: Metadata = {
  title: "Palakkad Constituency",
  description:
    "Explore information about the constituency, public resources, local information and constituency-related updates through the official representative portal.",
};

export default function ConstituencyPage() {
  return <ConstituencyClient />;
}
