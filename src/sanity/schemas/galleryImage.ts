import { RuleType } from "./types";

export const galleryImageSchema = {
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Image Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ml", title: "Malayalam", type: "string" },
      ],
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "image",
      title: "Photograph Asset",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: RuleType) => Rule.required(),
      fields: [
        {
          name: "altText",
          title: "Alt Text for Screen Readers",
          type: "object",
          fields: [
            { name: "en", title: "English", type: "string" },
            { name: "ml", title: "Malayalam", type: "string" },
          ],
          validation: (Rule: RuleType) => Rule.required(),
        },
      ],
    },
    {
      name: "category",
      title: "Album Category",
      type: "string",
      options: {
        list: [
          { title: "Public Meetings", value: "Public Meetings" },
          { title: "Constituency Visits", value: "Constituency Visits" },
          { title: "Cultural Events", value: "Cultural Events" },
          { title: "Development Sites", value: "Development Sites" },
        ],
      },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "date",
      title: "Date / Month",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ml", title: "Malayalam", type: "string" },
      ],
    },
    {
      name: "caption",
      title: "Detailed Caption",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "ml", title: "Malayalam", type: "text" },
      ],
    },
  ],
};
