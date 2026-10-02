import type { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "News & Announcements",
  description:
    "Read the latest news, public notices and announcements from the official representative portal of Shri Ramesh Pisharady.",
};

export default function NewsPage() {
  return <NewsClient />;
}
