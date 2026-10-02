import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographic record documenting public meetings, official walkthroughs, infrastructure inspections, and the cultural landscape of Palakkad.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
