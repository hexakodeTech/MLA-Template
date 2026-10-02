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

  const ogImages = article.imageUrl
    ? [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title.en,
        },
      ]
    : [
        {
          url: "/images/og-preview.png",
          width: 1200,
          height: 630,
          alt: article.title.en,
        },
      ];

  return {
    title: article.title.en,
    description: article.summary.en,
    openGraph: {
      type: "article",
      title: `${article.title.en} | Shri Ramesh Pisharady`,
      description: article.summary.en,
      url: `/news/${article.slug}`,
      publishedTime: article.date,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title.en} | Shri Ramesh Pisharady`,
      description: article.summary.en,
      images: article.imageUrl ? [article.imageUrl] : ["/images/og-preview.png"],
    },
  };
}

export default function NewsDetailPage() {
  return <NewsDetailClient />;
}
