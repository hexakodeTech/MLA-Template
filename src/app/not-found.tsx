import type { Metadata } from "next";
import NotFoundClient from "./NotFoundClient";

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found | Shri Ramesh Pisharady",
  },
  description:
    "The page you are looking for may have moved, been removed, or is no longer available. Explore verified sections of the official representative portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
