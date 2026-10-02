import HomeClient from "./HomeClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeSchema } from "@/components/seo/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={getHomeSchema()} />
      <HomeClient />
    </>
  );
}
