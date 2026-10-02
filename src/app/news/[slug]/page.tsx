import type { Metadata } from "next";
import { mockNews } from "@/data/mockData";
import NewsDetailClient from "./NewsDetailClient";

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
      title: "Announcement Not Found",
      description: "The requested news announcement could not be found.",
    };
  }

  return {
    title: article.title.en,
    description: article.summary.en,
  };
}

export default function NewsDetailPage() {
  return <NewsDetailClient />;
}
