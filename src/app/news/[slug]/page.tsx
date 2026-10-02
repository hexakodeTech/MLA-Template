import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockNews } from "@/data/mockData";
import NewsDetailClient from "./NewsDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNewsArticleSchema } from "@/components/seo/schema";
import { getNewsMetadata } from "@/components/seo/metadata";

export async function generateStaticParams() {
  return mockNews.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = mockNews.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: {
        absolute: "Article Not Found | Shri Ramesh Pisharady",
      },
      description: "The requested news announcement could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return getNewsMetadata(article, "en");
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = mockNews.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <JsonLd data={getNewsArticleSchema(article)} />
      <NewsDetailClient />
    </>
  );
}
