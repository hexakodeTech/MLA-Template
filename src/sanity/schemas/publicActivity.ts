import { RuleType } from "./types";

export const publicActivitySchema = {
  name: "publicActivity",
  title: "Public Activities & Engagements",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Activity Title",
      type: "object",
      fields: [
        { name: "en", title: "English Title", type: "string" },
        { name: "ml", title: "Malayalam Title", type: "string" },
      ],
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "category",
      title: "Activity Category",
      type: "string",
      options: {
        list: [
          { title: "Community Engagements", value: "Community Engagements" },
          { title: "Public Inspections", value: "Public Inspections" },
          { title: "Cultural & Educational", value: "Cultural & Educational" },
          { title: "Official Delegations", value: "Official Delegations" },
        ],
      },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "date",
      title: "Event Date",
      type: "date",
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "location",
      title: "Location / Venue",
      type: "object",
      fields: [
        { name: "en", title: "English Location", type: "string" },
        { name: "ml", title: "Malayalam Location", type: "string" },
      ],
    },
    {
      name: "image",
      title: "Activity Photograph",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "altText", title: "Alt Text", type: "string" },
        { name: "caption", title: "Caption", type: "string" },
      ],
    },
    {
      name: "description",
      title: "Short Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 3 },
        { name: "ml", title: "Malayalam", type: "text", rows: 3 },
      ],
    },
    {
      name: "fullDetails",
      title: "Full Narrative",
      type: "object",
      fields: [
        { name: "en", title: "English Content", type: "array", of: [{ type: "block" }] },
        { name: "ml", title: "Malayalam Content", type: "array", of: [{ type: "block" }] },
      ],
    },
  ],
};
