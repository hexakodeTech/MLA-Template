import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeSchema } from "@/components/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={getHomeSchema()} />
      <HomeClient />
    </>
  );
}
