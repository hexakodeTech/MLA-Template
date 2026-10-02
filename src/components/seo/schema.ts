import { siteConfig } from "@/config/site";
import { NewsItem, ActivityItem, GalleryItem } from "@/types";

export const SITE_URL = siteConfig.url;
export const PERSON_ID = siteConfig.personId;
export const WEBSITE_ID = siteConfig.websiteId;

/**
 * Verified Person Schema for Shri Ramesh Pisharady.
 * Strictly adheres to verified factual data present in the project.
 * Speculative titles, social profiles, and claims are intentionally omitted.
 */
export const PERSON_SCHEMA = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteConfig.representativeName,
  url: siteConfig.url,
  image: siteConfig.portraitImage,
  description: "Official representative portal of Shri Ramesh Pisharady.",
};

/**
 * WebSite Schema representing the official public portal.
 * Connected to Person as publisher via @id.
 * SearchAction is intentionally omitted as no backend site-search query route exists.
 */
export const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.supportedLanguages,
  publisher: {
    "@id": PERSON_ID,
  },
};

/**
 * Homepage JSON-LD (@graph: WebSite, Person, WebPage)
 */
export function getHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      WEBSITE_SCHEMA,
      PERSON_SCHEMA,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.languages.en,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
      },
    ],
  };
}

/**
 * About Page JSON-LD (@graph: Person, AboutPage, BreadcrumbList)
 */
export function getAboutSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: "About Shri Ramesh Pisharady | Official Representative Portal",
        description:
          "Learn more about Shri Ramesh Pisharady, his public profile, role and work, and explore information available through the official representative portal.",
        inLanguage: siteConfig.languages.en,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: `${SITE_URL}/about`,
          },
        ],
      },
    ],
  };
}

/**
 * News Listing JSON-LD (@graph: CollectionPage, ItemList, BreadcrumbList)
 */
export function getNewsListingSchema(items: NewsItem[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/news#webpage`,
        url: `${SITE_URL}/news`,
        name: "News & Announcements | Shri Ramesh Pisharady",
        description:
          "Read the latest news, public notices and announcements from the official representative portal of Shri Ramesh Pisharady.",
        inLanguage: siteConfig.languages.en,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/news/${item.slug}`,
            name: item.title.en,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "News & Announcements",
            item: `${SITE_URL}/news`,
          },
        ],
      },
    ],
  };
}

/**
 * Individual News Article JSON-LD (@graph: WebPage, NewsArticle, BreadcrumbList)
 * Seamlessly connects NewsArticle -> mainEntityOfPage (WebPage) -> isPartOf (WebSite)
 * and publisher/author -> Person.
 */
export function getNewsArticleSchema(article: NewsItem) {
  const articleUrl = `${SITE_URL}/news/${article.slug}`;
  const imageUrl = article.imageUrl || siteConfig.ogImage;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${articleUrl}#webpage`,
        url: articleUrl,
        name: `${article.title.en} | Shri Ramesh Pisharady`,
        description: article.summary.en,
        inLanguage: siteConfig.languages.en,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        url: articleUrl,
        headline: article.title.en,
        description: article.summary.en,
        datePublished: article.date,
        image: imageUrl,
        inLanguage: siteConfig.languages.en,
        mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "News & Announcements",
            item: `${SITE_URL}/news`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title.en,
            item: articleUrl,
          },
        ],
      },
    ],
  };
}

/**
 * Activities Listing JSON-LD (@graph: CollectionPage, ItemList, BreadcrumbList)
 */
export function getActivitiesListingSchema(items: ActivityItem[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/activities#webpage`,
        url: `${SITE_URL}/activities`,
        name: "Public Activities & Engagements | Shri Ramesh Pisharady",
        description:
          "Explore public activities, constituency engagements, meetings and community interactions featured on the official representative portal of Shri Ramesh Pisharady.",
        inLanguage: siteConfig.languages.en,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/activities/${item.slug}`,
            name: item.title.en,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Public Activities & Engagements",
            item: `${SITE_URL}/activities`,
          },
        ],
      },
    ],
  };
}

/**
 * Individual Activity Detail JSON-LD (@graph: WebPage, Event | Article, BreadcrumbList)
 * Connects mainEntityOfPage -> WebPage, isPartOf -> WebSite, and about -> Person.
 */
export function getActivityDetailSchema(activity: ActivityItem) {
  const activityUrl = `${SITE_URL}/activities/${activity.slug}`;
  const imageUrl = activity.imageUrl || siteConfig.ogImage;
  const isSeminarOrEvent = activity.category === "Cultural & Educational";

  const webpageEntity = {
    "@type": "WebPage",
    "@id": `${activityUrl}#webpage`,
    url: activityUrl,
    name: `${activity.title.en} | Shri Ramesh Pisharady`,
    description: activity.description.en,
    inLanguage: siteConfig.languages.en,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
  };

  const mainEntity = isSeminarOrEvent
    ? {
        "@type": "Event",
        "@id": `${activityUrl}#event`,
        name: activity.title.en,
        description: activity.description.en,
        startDate: activity.date,
        location: {
          "@type": "Place",
          name: activity.location.en,
        },
        url: activityUrl,
        image: imageUrl,
        inLanguage: siteConfig.languages.en,
        about: { "@id": PERSON_ID },
        mainEntityOfPage: { "@id": `${activityUrl}#webpage` },
        isPartOf: { "@id": WEBSITE_ID },
      }
    : {
        "@type": "Article",
        "@id": `${activityUrl}#article`,
        headline: activity.title.en,
        description: activity.description.en,
        datePublished: activity.date,
        url: activityUrl,
        image: imageUrl,
        inLanguage: siteConfig.languages.en,
        about: { "@id": PERSON_ID },
        mainEntityOfPage: { "@id": `${activityUrl}#webpage` },
        contentLocation: {
          "@type": "Place",
          name: activity.location.en,
        },
        isPartOf: { "@id": WEBSITE_ID },
      };

  return {
    "@context": "https://schema.org",
    "@graph": [
      webpageEntity,
      mainEntity,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Public Activities & Engagements",
            item: `${SITE_URL}/activities`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: activity.title.en,
            item: activityUrl,
          },
        ],
      },
    ],
  };
}

/**
 * Palakkad Constituency Page JSON-LD (@graph: WebPage, BreadcrumbList)
 */
export function getConstituencySchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/constituency#webpage`,
        url: `${SITE_URL}/constituency`,
        name: "Palakkad Constituency | Shri Ramesh Pisharady",
        description:
          "Explore information about the constituency, public resources, local information and constituency-related updates through the official representative portal.",
        inLanguage: siteConfig.languages.en,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Palakkad Constituency",
            item: `${SITE_URL}/constituency`,
          },
        ],
      },
    ],
  };
}

/**
 * Gallery Page JSON-LD (@graph: CollectionPage, ImageGallery, BreadcrumbList)
 */
export function getGallerySchema(galleryItems: GalleryItem[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/gallery#webpage`,
        url: `${SITE_URL}/gallery`,
        name: "Gallery | Shri Ramesh Pisharady",
        description:
          "Browse photographs and visual highlights from public activities, constituency engagements and events featured on the official representative portal of Shri Ramesh Pisharady.",
        inLanguage: siteConfig.languages.en,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ImageGallery",
          name: "Public Activities & Engagements Gallery",
          image: galleryItems.map((item) => item.imageUrl),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Gallery",
            item: `${SITE_URL}/gallery`,
          },
        ],
      },
    ],
  };
}

/**
 * Contact Page JSON-LD (@graph: ContactPage, BreadcrumbList)
 */
export function getContactSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#webpage`,
        url: `${SITE_URL}/contact`,
        name: "Contact the Office | Shri Ramesh Pisharady",
        description:
          "Find official office contact information and submit enquiries through the official representative portal of Shri Ramesh Pisharady.",
        inLanguage: siteConfig.languages.en,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact the Office",
            item: `${SITE_URL}/contact`,
          },
        ],
      },
    ],
  };
}

/**
 * General WebPage JSON-LD helper (for Accessibility, Privacy Policy, etc.)
 */
export function getWebPageSchema({
  title,
  description,
  path,
  breadcrumbName,
}: {
  title: string;
  description: string;
  path: string;
  breadcrumbName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${path}#webpage`,
        url: `${SITE_URL}${path}`,
        name: `${title} | Shri Ramesh Pisharady`,
        description,
        inLanguage: siteConfig.languages.en,
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumbName,
            item: `${SITE_URL}${path}`,
          },
        ],
      },
    ],
  };
}
