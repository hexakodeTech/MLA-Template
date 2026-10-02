import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photographs and visual highlights from public activities, constituency engagements and events featured on the official representative portal of Shri Ramesh Pisharady.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
