import type { Metadata } from "next";
import ConstituencyClient from "./ConstituencyClient";

export const metadata: Metadata = {
  title: "Palakkad Constituency",
  description:
    "Regional profile, administrative taluks, documented development initiatives, and public service directories for Palakkad Constituency.",
};

export default function ConstituencyPage() {
  return <ConstituencyClient />;
}
