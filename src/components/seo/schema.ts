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
  alternateName: "ശ്രീ രമേഷ് പിഷാരടി",
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
  alternateName: "ശ്രീ രമേഷ് പിഷാരടി | ഔദ്യോഗിക പ്രതിനിധി പോർട്ടൽ",
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.supportedLanguages,
  publisher: {
    "@id": PERSON_ID,
  },
};

/**
 * Homepage JSON-LD (@graph: WebSite, Person, WebPage)
 * Note: Homepage has no parent hierarchy, so BreadcrumbList is intentionally omitted.
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
        alternateName: "ശ്രീ രമേഷ് പിഷാരടി | ഔദ്യോഗിക പ്രതിനിധി പോർട്ടൽ",
        description: siteConfig.description,
        inLanguage: siteConfig.supportedLanguages,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
      },
    ],
  };
}

/**
 * About Page JSON-LD (@graph: Person, WebSite, AboutPage, BreadcrumbList)
 * Hierarchy: Home -> About
 */
export function getAboutSchema() {
  const pageUrl = `${SITE_URL}/about`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      WEBSITE_SCHEMA,
      {
        "@type": "AboutPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "About Shri Ramesh Pisharady | Official Representative Portal",
        alternateName: "പ്രതിനിധിയെക്കുറിച്ച് | ശ്രീ രമേഷ് പിഷാരടി",
        description:
          "Learn more about Shri Ramesh Pisharady, his public profile, role and work, and explore information available through the official representative portal.",
        inLanguage: siteConfig.supportedLanguages,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

/**
 * News Listing JSON-LD (@graph: Person, WebSite, CollectionPage, ItemList, BreadcrumbList)
 * Hierarchy: Home -> News
 */
export function getNewsListingSchema(items: NewsItem[]) {
  const pageUrl = `${SITE_URL}/news`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      WEBSITE_SCHEMA,
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "News & Announcements | Shri Ramesh Pisharady",
        alternateName: "വാർത്തകളും അറിയിപ്പുകളും | ശ്രീ രമേഷ് പിഷാരടി",
        description:
          "Read the latest news, public notices and announcements from the official representative portal of Shri Ramesh Pisharady.",
        inLanguage: siteConfig.supportedLanguages,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/news/${item.slug}`,
            name: item.title.en,
            ...(item.title.ml ? { alternateName: item.title.ml } : {}),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: "News",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

/**
 * Individual News Article JSON-LD (@graph: Person, WebSite, WebPage, NewsArticle, BreadcrumbList)
 * Hierarchy: Home -> News -> Article Title
 * Strict entity graph:
 * WebSite (publisher -> Person)
 * WebPage (isPartOf -> WebSite, about -> Person, breadcrumb -> BreadcrumbList)
 * NewsArticle (mainEntityOfPage -> WebPage, isPartOf -> WebSite, author -> Person, publisher -> Person)
 * BreadcrumbList (Home -> News -> Article)
 * Note: dateModified is omitted because modification dates are not tracked in the dataset.
 */
export function getNewsArticleSchema(article: NewsItem, lang: "en" | "ml" = "en") {
  const articleUrl = `${SITE_URL}/news/${article.slug}`;
  const breadcrumbId = `${articleUrl}#breadcrumb`;
  const headline = lang === "ml" && article.title.ml ? article.title.ml : article.title.en;
  const description = lang === "ml" && article.summary.ml ? article.summary.ml : article.summary.en;
  const langCode = lang === "ml" ? siteConfig.languages.ml : siteConfig.languages.en;

  const rawImageUrl = article.imageUrl?.trim() || siteConfig.ogImage;
  const absoluteImageUrl = rawImageUrl.startsWith("http")
    ? rawImageUrl
    : `${SITE_URL}${rawImageUrl.startsWith("/") ? "" : "/"}${rawImageUrl}`;

  const imageObject = {
    "@type": "ImageObject",
    url: absoluteImageUrl,
    width: 1200,
    height: 630,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      WEBSITE_SCHEMA,
      {
        "@type": "WebPage",
        "@id": `${articleUrl}#webpage`,
        url: articleUrl,
        name: `${headline} | Shri Ramesh Pisharady`,
        ...(article.title.ml ? { alternateName: `${article.title.ml} | ശ്രീ രമേഷ് പിഷാരടി` } : {}),
        description: description,
        inLanguage: siteConfig.supportedLanguages,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        url: articleUrl,
        headline: headline,
        ...(article.title.ml ? { alternativeHeadline: article.title.ml } : {}),
        description: description,
        datePublished: article.date,
        image: imageObject,
        inLanguage: siteConfig.supportedLanguages,
        mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: "News",
            item: `${SITE_URL}/news`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: headline,
            item: articleUrl,
          },
        ],
      },
    ],
  };
}

/**
 * Activities Listing JSON-LD (@graph: Person, WebSite, CollectionPage, ItemList, BreadcrumbList)
 * Hierarchy: Home -> Activities
 */
export function getActivitiesListingSchema(items: ActivityItem[]) {
  const pageUrl = `${SITE_URL}/activities`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      WEBSITE_SCHEMA,
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Public Activities & Engagements | Shri Ramesh Pisharady",
        alternateName: "പൊതു പ്രവർത്തനങ്ങൾ | ശ്രീ രമേഷ് പിഷാരടി",
        description:
          "Explore public activities, constituency engagements, meetings and community interactions featured on the official representative portal of Shri Ramesh Pisharady.",
        inLanguage: siteConfig.supportedLanguages,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/activities/${item.slug}`,
            name: item.title.en,
            ...(item.title.ml ? { alternateName: item.title.ml } : {}),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: "Activities",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

/**
 * Individual Activity Detail JSON-LD (@graph: Person, WebSite, WebPage, Event | Article, BreadcrumbList)
 * Hierarchy: Home -> Activities -> Activity Title
 * Connects mainEntityOfPage -> WebPage, isPartOf -> WebSite, about -> Person, and breadcrumb -> BreadcrumbList.
 */
export function getActivityDetailSchema(activity: ActivityItem) {
  const activityUrl = `${SITE_URL}/activities/${activity.slug}`;
  const breadcrumbId = `${activityUrl}#breadcrumb`;
  const isSeminarOrEvent = activity.category === "Cultural & Educational";

  const rawImageUrl = activity.imageUrl?.trim() || siteConfig.ogImage;
  const absoluteImageUrl = rawImageUrl.startsWith("http")
    ? rawImageUrl
    : `${SITE_URL}${rawImageUrl.startsWith("/") ? "" : "/"}${rawImageUrl}`;

  const imageObject = {
    "@type": "ImageObject",
    url: absoluteImageUrl,
    width: 1200,
    height: 630,
  };

  const webpageEntity = {
    "@type": "WebPage",
    "@id": `${activityUrl}#webpage`,
    url: activityUrl,
    name: `${activity.title.en} | Shri Ramesh Pisharady`,
    ...(activity.title.ml ? { alternateName: `${activity.title.ml} | ശ്രീ രമേഷ് പിഷാരടി` } : {}),
    description: activity.description.en,
    inLanguage: siteConfig.supportedLanguages,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    breadcrumb: { "@id": breadcrumbId },
  };

  const mainEntity = isSeminarOrEvent
    ? {
        "@type": "Event",
        "@id": `${activityUrl}#event`,
        name: activity.title.en,
        ...(activity.title.ml ? { alternateName: activity.title.ml } : {}),
        description: activity.description.en,
        startDate: activity.date,
        location: {
          "@type": "Place",
          name: activity.location.en,
        },
        url: activityUrl,
        image: imageObject,
        inLanguage: siteConfig.supportedLanguages,
        about: { "@id": PERSON_ID },
        organizer: { "@id": PERSON_ID },
        mainEntityOfPage: { "@id": `${activityUrl}#webpage` },
        isPartOf: { "@id": WEBSITE_ID },
      }
    : {
        "@type": "Article",
        "@id": `${activityUrl}#article`,
        headline: activity.title.en,
        ...(activity.title.ml ? { alternativeHeadline: activity.title.ml } : {}),
        description: activity.description.en,
        datePublished: activity.date,
        url: activityUrl,
        image: imageObject,
        inLanguage: siteConfig.supportedLanguages,
        about: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
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
      PERSON_SCHEMA,
      WEBSITE_SCHEMA,
      webpageEntity,
      mainEntity,
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: "Activities",
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
 * Palakkad Constituency Page JSON-LD (@graph: Person, WebSite, WebPage, BreadcrumbList)
 * Hierarchy: Home -> Constituency
 */
export function getConstituencySchema() {
  const pageUrl = `${SITE_URL}/constituency`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      WEBSITE_SCHEMA,
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Palakkad Constituency | Shri Ramesh Pisharady",
        alternateName: "മണ്ഡലം വിവരങ്ങൾ | ശ്രീ രമേഷ് പിഷാരടി",
        description:
          "Explore information about the constituency, public resources, local information and constituency-related updates through the official representative portal.",
        inLanguage: siteConfig.supportedLanguages,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: "Constituency",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

/**
 * Gallery Page JSON-LD (@graph: Person, WebSite, CollectionPage, ImageGallery, BreadcrumbList)
 * Hierarchy: Home -> Gallery
 */
export function getGallerySchema(galleryItems: GalleryItem[]) {
  const pageUrl = `${SITE_URL}/gallery`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      WEBSITE_SCHEMA,
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Gallery | Shri Ramesh Pisharady",
        alternateName: "ചിത്രശാല | ശ്രീ രമേഷ് പിഷാരടി",
        description:
          "Browse photographs and visual highlights from public activities, constituency engagements and events featured on the official representative portal of Shri Ramesh Pisharady.",
        inLanguage: siteConfig.supportedLanguages,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: {
          "@type": "ImageGallery",
          name: "Public Activities & Engagements Gallery",
          alternateName: "പൊതു പ്രവർത്തനങ്ങളുടെ ചിത്രശാല",
          image: galleryItems.map((item) => item.imageUrl),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

/**
 * Contact Page JSON-LD (@graph: Person, WebSite, ContactPage, BreadcrumbList)
 * Hierarchy: Home -> Contact
 */
export function getContactSchema() {
  const pageUrl = `${SITE_URL}/contact`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      WEBSITE_SCHEMA,
      {
        "@type": "ContactPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Contact the Office | Shri Ramesh Pisharady",
        alternateName: "ബന്ധപ്പെടുക | ശ്രീ രമേഷ് പിഷാരടി",
        description:
          "Find official office contact information and submit enquiries through the official representative portal of Shri Ramesh Pisharady.",
        inLanguage: siteConfig.supportedLanguages,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: "Contact",
            item: pageUrl,
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
  alternateName,
  description,
  path,
  breadcrumbName,
}: {
  title: string;
  alternateName?: string;
  description: string;
  path: string;
  breadcrumbName: string;
}) {
  const pageUrl = `${SITE_URL}${path}`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      WEBSITE_SCHEMA,
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${title} | Shri Ramesh Pisharady`,
        ...(alternateName ? { alternateName } : {}),
        description,
        inLanguage: siteConfig.supportedLanguages,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
