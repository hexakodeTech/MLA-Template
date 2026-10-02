import { NewsItem, ActivityItem, GalleryItem } from "@/types";

export const SITE_URL = "https://rameshpisharady.hexakode.com";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Verified Person Schema for Shri Ramesh Pisharady.
 * Strict adherence: Only verified factual data present in the project is used.
 */
export const PERSON_SCHEMA = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Shri Ramesh Pisharady",
  url: SITE_URL,
  image: `${SITE_URL}/images/ramesh-pisharady-portrait.png`,
  description: "Official representative portal of Shri Ramesh Pisharady.",
};

/**
 * WebSite Schema representing the official public portal.
 */
export const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Shri Ramesh Pisharady | Official Representative Portal",
  url: SITE_URL,
  description:
    "Official representative portal of Shri Ramesh Pisharady, featuring public activities, constituency information, news, announcements, gallery and citizen services.",
  inLanguage: ["en", "ml"],
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
        url: SITE_URL,
        name: "Shri Ramesh Pisharady | Official Representative Portal",
        description:
          "Official representative portal of Shri Ramesh Pisharady, featuring public activities, constituency information, news, announcements, gallery and citizen services.",
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
 * News Listing JSON-LD (@graph: CollectionPage, BreadcrumbList)
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
        isPartOf: { "@id": WEBSITE_ID },
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
 * Individual News Article JSON-LD (@graph: NewsArticle, BreadcrumbList)
 */
export function getNewsArticleSchema(article: NewsItem) {
  const articleUrl = `${SITE_URL}/news/${article.slug}`;
  const imageUrl = article.imageUrl || `${SITE_URL}/images/og-preview.png`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        url: articleUrl,
        headline: article.title.en,
        description: article.summary.en,
        datePublished: article.date,
        image: imageUrl,
        isPartOf: { "@id": WEBSITE_ID },
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
 * Activities Listing JSON-LD (@graph: CollectionPage, BreadcrumbList)
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
        isPartOf: { "@id": WEBSITE_ID },
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
 * Individual Activity Detail JSON-LD (@graph: Event | Article, BreadcrumbList)
 * Uses Event only for genuine cultural/educational seminars or meets;
 * uses Article for inspections, consultations, and briefings.
 */
export function getActivityDetailSchema(activity: ActivityItem) {
  const activityUrl = `${SITE_URL}/activities/${activity.slug}`;
  const imageUrl = activity.imageUrl || `${SITE_URL}/images/og-preview.png`;
  const isSeminarOrEvent = activity.category === "Cultural & Educational";

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
        contentLocation: {
          "@type": "Place",
          name: activity.location.en,
        },
        isPartOf: { "@id": WEBSITE_ID },
      };

  return {
    "@context": "https://schema.org",
    "@graph": [
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
        isPartOf: { "@id": WEBSITE_ID },
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
