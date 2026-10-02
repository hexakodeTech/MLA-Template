import type { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "News & Announcements",
  description:
    "Official announcements, press releases, public meeting notices, and constituency updates from the office of Shri Ramesh Pisharady.",
};

export default function NewsPage() {
  return <NewsClient />;
}
