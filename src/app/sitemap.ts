import { MetadataRoute } from "next";
import { mockNews, mockActivities } from "@/data/mockData";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Derive lastModified dates from actual content datasets to keep sitemap builds deterministic
  const latestNewsDate = mockNews.reduce(
    (latest, item) => (item.date > latest ? item.date : latest),
    "2026-09-20"
  );
  const latestActivityDate = mockActivities.reduce(
    (latest, item) => (item.date > latest ? item.date : latest),
    "2026-09-18"
  );
  const portalReleaseDate = "2026-09-20";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: latestNewsDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: portalReleaseDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: latestNewsDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/constituency`, lastModified: portalReleaseDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/activities`, lastModified: latestActivityDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: latestActivityDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: portalReleaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: portalReleaseDate, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/accessibility`, lastModified: portalReleaseDate, changeFrequency: "monthly", priority: 0.3 },
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
