export const siteSettingsSchema = {
  name: "siteSettings",
  title: "Website Settings & Global Configuration",
  type: "document",
  fields: [
    {
      name: "siteTitle",
      title: "Site Title",
      type: "string",
    },
    {
      name: "temporaryBrandText",
      title: "Text-Based Identity",
      type: "string",
      initialValue: "Ramesh Pisharady",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ml", title: "Malayalam", type: "string" },
      ],
    },
    {
      name: "officeAddress",
      title: "Official Secretariat Address",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "ml", title: "Malayalam", type: "text" },
      ],
    },
    {
      name: "officialEmail",
      title: "Official Email Address",
      type: "string",
    },
    {
      name: "officialPhone",
      title: "Official Phone Number",
      type: "string",
    },
    {
      name: "verifiedSocialHandles",
      title: "Verified Social Accounts",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook Page URL", type: "url" },
        { name: "twitter", title: "X (Twitter) Profile URL", type: "url" },
        { name: "youtube", title: "YouTube Channel URL", type: "url" },
        { name: "instagram", title: "Instagram Profile URL", type: "url" },
      ],
      description: "Leave empty until accounts have been officially verified by the office.",
    },
    {
      name: "developerCredit",
      title: "Developer Credit",
      type: "string",
      initialValue: "Website Designed & Developed by HexaKode",
      readOnly: true,
    },
  ],
};
