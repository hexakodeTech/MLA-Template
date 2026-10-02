/**
 * Centralized Site Configuration
 * Canonical domain, URLs, and entity identifiers for Shri Ramesh Pisharady official representative portal.
 */
export const siteConfig = {
  name: "Shri Ramesh Pisharady | Official Representative Portal",
  representativeName: "Shri Ramesh Pisharady",
  description:
    "Official representative portal of Shri Ramesh Pisharady, featuring public activities, constituency information, news, announcements, gallery and citizen services.",
  url: "https://rameshpisharady.hexakode.com",
  ogImage: "https://rameshpisharady.hexakode.com/images/og-preview.png",
  portraitImage: "https://rameshpisharady.hexakode.com/images/ramesh-pisharady-portrait.png",
  languages: {
    en: "en-IN",
    ml: "ml-IN",
  },
  supportedLanguages: ["en-IN", "ml-IN"],
  personId: "https://rameshpisharady.hexakode.com/#person",
  websiteId: "https://rameshpisharady.hexakode.com/#website",
} as const;
