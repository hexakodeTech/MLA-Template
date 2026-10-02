import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { NewsItem, ActivityItem } from "@/types";

/**
 * Verified multilingual metadata dictionary for static routes.
 * Sourced directly from approved project content and translations.
 */
export const STATIC_PAGES_METADATA: Record<
  string,
  {
    title: { en: string; ml: string };
    description: { en: string; ml: string };
    path: string;
  }
> = {
  home: {
    path: "/",
    title: {
      en: "Shri Ramesh Pisharady | Official Representative Portal",
      ml: "ശ്രീ രമേഷ് പിഷാരടി | ഔദ്യോഗിക പ്രതിനിധി പോർട്ടൽ",
    },
    description: {
      en: "Official representative portal of Shri Ramesh Pisharady. Explore public activities, constituency information, news, announcements, gallery and citizen services.",
      ml: "ശ്രീ രമേഷ് പിഷാരടിയുടെ ഓഫീസിൽ നിന്നുള്ള ഔദ്യോഗിക അറിയിപ്പുകളും മണ്ഡല വിവരങ്ങളും പൊതു പ്രവർത്തനങ്ങളും ലഭ്യമാക്കുക.",
    },
  },
  about: {
    path: "/about",
    title: {
      en: "About Shri Ramesh Pisharady | Official Representative Portal",
      ml: "പ്രതിനിധിയെക്കുറിച്ച് | ശ്രീ രമേഷ് പിഷാരടി",
    },
    description: {
      en: "Learn more about Shri Ramesh Pisharady, his public profile, role and work, and explore information available through the official representative portal.",
      ml: "പാലക്കാട് മണ്ഡലത്തിലെ ജനങ്ങൾക്ക് സേവനമെത്തിക്കുന്നതിനായുള്ള ഔദ്യോഗിക വിവര ശേഖരവും പൊതുപ്രവർത്തന രേഖകളും.",
    },
  },
  news: {
    path: "/news",
    title: {
      en: "News & Announcements | Shri Ramesh Pisharady",
      ml: "വാർത്തകളും അറിയിപ്പുകളും | ശ്രീ രമേഷ് പിഷാരടി",
    },
    description: {
      en: "Read the latest news, public notices and announcements from the official representative portal of Shri Ramesh Pisharady.",
      ml: "ശ്രീ രമേഷ് പിഷാരടിയുടെ ഓഫീസിൽ നിന്നുള്ള പുതിയ ഔദ്യോഗിക അറിയിപ്പുകളും പ്രസ്താവനകളും വാർത്തകളും വായിക്കുക.",
    },
  },
  activities: {
    path: "/activities",
    title: {
      en: "Public Activities & Engagements | Shri Ramesh Pisharady",
      ml: "പൊതു പ്രവർത്തനങ്ങൾ | ശ്രീ രമേഷ് പിഷാരടി",
    },
    description: {
      en: "Explore public activities, constituency engagements, meetings and community interactions featured on the official representative portal of Shri Ramesh Pisharady.",
      ml: "പാലക്കാട് മണ്ഡലത്തിലെ പൊതു ജനസമ്പർക്ക പരിപാടികളും അവലോകന യോഗങ്ങളും വികസന സന്ദർശനങ്ങളും.",
    },
  },
  constituency: {
    path: "/constituency",
    title: {
      en: "Palakkad Constituency | Shri Ramesh Pisharady",
      ml: "മണ്ഡലം വിവരങ്ങൾ | ശ്രീ രമേഷ് പിഷാരടി",
    },
    description: {
      en: "Explore information about the constituency, public resources, local information and constituency-related updates through the official representative portal.",
      ml: "പാലക്കാട് മണ്ഡലത്തിലെ വികസന പദ്ധതികൾ, പഞ്ചായത്ത് വിവരങ്ങൾ, പൊതു സേവന കേന്ദ്രങ്ങൾ എന്നിവ മനസ്സിലാക്കുക.",
    },
  },
  gallery: {
    path: "/gallery",
    title: {
      en: "Gallery | Shri Ramesh Pisharady",
      ml: "ചിത്രശാല | ശ്രീ രമേഷ് പിഷാരടി",
    },
    description: {
      en: "Browse photographs and visual highlights from public activities, constituency engagements and events featured on the official representative portal of Shri Ramesh Pisharady.",
      ml: "പൊതു പ്രവർത്തനങ്ങൾ, വികസന സന്ദർശനങ്ങൾ, പരിപാടികൾ എന്നിവയുടെ ഔദ്യോഗിക ചിത്ര ശേഖരം.",
    },
  },
  contact: {
    path: "/contact",
    title: {
      en: "Contact the Office | Shri Ramesh Pisharady",
      ml: "ബന്ധപ്പെടുക | ശ്രീ രമേഷ് പിഷാരടി",
    },
    description: {
      en: "Find official office contact information and submit enquiries through the official representative portal of Shri Ramesh Pisharady.",
      ml: "ശ്രീ രമേഷ് പിഷാരടിയുടെ ഓഫീസുമായി ബന്ധപ്പെടാനുള്ള വിലാസം, ഫോൺ നമ്പറുകൾ, ജനസമ്പർക്ക വിവരങ്ങൾ.",
    },
  },
  accessibility: {
    path: "/accessibility",
    title: {
      en: "Accessibility | Shri Ramesh Pisharady",
      ml: "പ്രവേശനക്ഷമത പ്രസ്താവന | ശ്രീ രമേഷ് പിഷാരടി",
    },
    description: {
      en: "Learn about the accessibility features and support available on the official representative portal of Shri Ramesh Pisharady.",
      ml: "എല്ലാ പൗരന്മാർക്കും വിവരങ്ങൾ തുല്യമായി ലഭ്യമാക്കാനുള്ള വെബ്സൈറ്റ് പ്രവേശനക്ഷമത സവിശേഷതകളും മാർഗ്ഗനിർദ്ദേശങ്ങളും.",
    },
  },
  privacyPolicy: {
    path: "/privacy-policy",
    title: {
      en: "Privacy Policy | Shri Ramesh Pisharady",
      ml: "സ്വകാര്യതാ നയം | ശ്രീ രമേഷ് പിഷാരടി",
    },
    description: {
      en: "Read the privacy policy explaining how information is handled when using the official representative portal of Shri Ramesh Pisharady.",
      ml: "ഔദ്യോഗിക പ്രതിനിധി പോർട്ടൽ ഉപയോഗിക്കുമ്പോൾ വിവരങ്ങൾ കൈകാര്യം ചെയ്യുന്നത് സംബന്ധിച്ച സ്വകാര്യതാ നയം.",
    },
  },
};

/**
 * Safely resolves an image URL to an absolute production URL.
 */
export function getAbsoluteImageUrl(imageUrl?: string | null): string {
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
 * Generates SEO metadata for dynamic news article detail pages.
 * Supports both English and Malayalam metadata generation.
 */
export function getNewsMetadata(
  article: NewsItem,
  lang: "en" | "ml" = "en"
): Metadata {
  const isMl = lang === "ml" && !!article.title?.ml;
  const rawTitle = isMl ? article.title.ml : article.title.en;
  const pageTitle = isMl
    ? `${rawTitle} | ശ്രീ രമേഷ് പിഷാരടി`
    : `${rawTitle} | Shri Ramesh Pisharady`;

  const rawSummary = isMl
    ? article.summary?.ml || article.summary?.en
    : article.summary?.en || article.summary?.ml;
  const description =
    rawSummary?.trim() ||
    (isMl
      ? "ശ്രീ രമേഷ് പിഷാരടിയുടെ ഓഫീസിൽ നിന്നുള്ള ഔദ്യോഗിക വാർത്തകളും അറിയിപ്പുകളും."
      : "Official news and announcements from the representative portal of Shri Ramesh Pisharady.");

  const canonicalUrl = `${siteConfig.url}/news/${article.slug}`;
  const absoluteImageUrl = getAbsoluteImageUrl(article.imageUrl);

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
      siteName: isMl ? "ശ്രീ രമേഷ് പിഷാരടി" : "Shri Ramesh Pisharady",
      locale: isMl ? "ml_IN" : "en_IN",
      alternateLocale: isMl ? "en_IN" : "ml_IN",
      publishedTime: article.date,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: rawTitle,
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

/**
 * Generates SEO metadata for dynamic activity detail pages.
 * Supports both English and Malayalam metadata generation.
 */
export function getActivityMetadata(
  activity: ActivityItem,
  lang: "en" | "ml" = "en"
): Metadata {
  const isMl = lang === "ml" && !!activity.title?.ml;
  const rawTitle = isMl ? activity.title.ml : activity.title.en;
  const pageTitle = isMl
    ? `${rawTitle} | ശ്രീ രമേഷ് പിഷാരടി`
    : `${rawTitle} | Shri Ramesh Pisharady`;

  const rawDesc = isMl
    ? activity.description?.ml || activity.description?.en
    : activity.description?.en || activity.description?.ml;
  const description =
    rawDesc?.trim() ||
    (isMl
      ? "ശ്രീ രമേഷ് പിഷാരടിയുടെ പൊതു പ്രവർത്തനങ്ങളും ജനസമ്പർക്ക പരിപാടികളും."
      : "Public representative activity and community engagement record of Shri Ramesh Pisharady.");

  const canonicalUrl = `${siteConfig.url}/activities/${activity.slug}`;
  const absoluteImageUrl = getAbsoluteImageUrl(activity.imageUrl);

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
      siteName: isMl ? "ശ്രീ രമേഷ് പിഷാരടി" : "Shri Ramesh Pisharady",
      locale: isMl ? "ml_IN" : "en_IN",
      alternateLocale: isMl ? "en_IN" : "ml_IN",
      publishedTime: activity.date,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: rawTitle,
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
