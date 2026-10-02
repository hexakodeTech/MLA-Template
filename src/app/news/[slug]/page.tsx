import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockNews } from "@/data/mockData";
import NewsDetailClient from "./NewsDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNewsArticleSchema } from "@/components/seo/schema";
import { siteConfig } from "@/config/site";

export async function generateStaticParams() {
  return mockNews.map((item) => ({
    slug: item.slug,
  }));
}

/**
 * Safely resolves an article image URL to an absolute production URL.
 * - Accepts both absolute and relative image URLs.
 * - Converts relative URLs to absolute production URLs using siteConfig.url.
 * - Preserves valid external image URLs.
 * - Falls back to /images/og-preview.png if missing or malformed.
 */
function getAbsoluteArticleImageUrl(imageUrl?: string | null): string {
  if (!imageUrl || typeof imageUrl !== "string") {
    return `${siteConfig.url}/images/og-preview.png`;
  }

  const trimmed = imageUrl.trim();
  if (!trimmed) {
    return `${siteConfig.url}/images/og-preview.png`;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${siteConfig.url}${normalizedPath}`;
}

/**
 * Deterministically retrieves a concise meta description from article data.
 * Priority:
 * 1. article.summary.en
 * 2. Formatted fallback from existing article content
 * 3. Verified safe default portal notice (no fabricated facts)
 */
function getArticleMetaDescription(article: (typeof mockNews)[number]): string {
  const summary = article.summary?.en?.trim();
  if (summary) {
    return summary;
  }

  const content = article.content?.en;
  if (content && typeof content === "string") {
    const cleaned = content
      .replace(/\r?\n|\r/g, " ")
      .replace(/[*_#`[\]]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (cleaned) {
      return cleaned.length > 160 ? `${cleaned.slice(0, 157)}...` : cleaned;
    }
  }

  return "Official news and announcements from the representative portal of Shri Ramesh Pisharady.";
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

  const pageTitle = `${article.title.en} | Shri Ramesh Pisharady`;
  const description = getArticleMetaDescription(article);
  const canonicalUrl = `${siteConfig.url}/news/${article.slug}`;
  const absoluteImageUrl = getAbsoluteArticleImageUrl(article.imageUrl);

  return {
    title: {
      absolute: pageTitle,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: "Shri Ramesh Pisharady",
      locale: "en_IN",
      publishedTime: article.date,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: article.title.en,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [absoluteImageUrl],
    },
  };
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
