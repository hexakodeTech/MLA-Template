import { RuleType } from "./types";

export const newsArticleSchema = {
  name: "newsArticle",
  title: "News & Announcements",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Article Title",
      type: "object",
      fields: [
        { name: "en", title: "English Title", type: "string" },
        { name: "ml", title: "Malayalam Title", type: "string" },
      ],
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Official Announcements", value: "Official Announcements" },
          { title: "Public Meetings", value: "Public Meetings" },
          { title: "Constituency News", value: "Constituency News" },
          { title: "Office Notices", value: "Office Notices" },
        ],
      },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Publication Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "isFeatured",
      title: "Feature on Homepage",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "altText", title: "Alt Text", type: "string" },
        { name: "caption", title: "Caption", type: "string" },
      ],
    },
    {
      name: "summary",
      title: "Brief Summary / Lead Text",
      type: "object",
      fields: [
        { name: "en", title: "English Summary", type: "text", rows: 3 },
        { name: "ml", title: "Malayalam Summary", type: "text", rows: 3 },
      ],
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "body",
      title: "Full Content",
      type: "object",
      fields: [
        { name: "en", title: "English Content", type: "array", of: [{ type: "block" }] },
        { name: "ml", title: "Malayalam Content", type: "array", of: [{ type: "block" }] },
      ],
    },
    {
      name: "sourceAttribution",
      title: "Source or Department Cell",
      type: "string",
    },
  ],
};
