import { MetadataRoute } from "next";
import { mockNews, mockActivities } from "@/data/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rameshpisharady.hexakode.com";
  const currentDate = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: currentDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/constituency`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/activities`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/accessibility`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.3 },
  ];

  const newsRoutes: MetadataRoute.Sitemap = mockNews.map((item) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: item.date,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const activityRoutes: MetadataRoute.Sitemap = mockActivities.map((item) => ({
    url: `${baseUrl}/activities/${item.slug}`,
    lastModified: item.date,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...newsRoutes, ...activityRoutes];
}
