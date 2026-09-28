import { RuleType } from "./types";

export const representativeSchema = {
  name: "representative",
  title: "Representative Profile",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ml", title: "Malayalam", type: "string" },
      ],
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "designation",
      title: "Official Designation & Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ml", title: "Malayalam", type: "string" },
      ],
    },
    {
      name: "constituencyName",
      title: "Constituency Area",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ml", title: "Malayalam", type: "string" },
      ],
    },
    {
      name: "officialPortrait",
      title: "Approved Official Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "altText",
          title: "Alternative Text for Screen Readers",
          type: "string",
          validation: (Rule: RuleType) => Rule.required(),
        },
        {
          name: "caption",
          title: "Image Caption",
          type: "string",
        },
      ],
    },
    {
      name: "biography",
      title: "Approved Biography",
      type: "object",
      fields: [
        { name: "en", title: "Biography (English)", type: "array", of: [{ type: "block" }] },
        { name: "ml", title: "Biography (Malayalam)", type: "array", of: [{ type: "block" }] },
      ],
    },
    {
      name: "officeAddress",
      title: "Constituency Office Address",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "ml", title: "Malayalam", type: "text" },
      ],
    },
    {
      name: "officePhone",
      title: "Office Contact Number",
      type: "string",
    },
    {
      name: "officeEmail",
      title: "Official Email Address",
      type: "string",
    },
    {
      name: "isVerified",
      title: "Approved by Representative Secretariat",
      type: "boolean",
      initialValue: false,
    },
  ],
};
