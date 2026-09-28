import { RuleType } from "./types";

export const constituencyProjectSchema = {
  name: "constituencyProject",
  title: "Constituency Development Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ml", title: "Malayalam", type: "string" },
      ],
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "sector",
      title: "Sector / Department",
      type: "string",
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "Completed" },
          { title: "Ongoing", value: "Ongoing" },
          { title: "In Planning", value: "In Planning" },
          { title: "Approved", value: "Approved" },
        ],
      },
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "sanctionDate",
      title: "Sanction Date",
      type: "date",
    },
    {
      name: "location",
      title: "Location / Wards",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ml", title: "Malayalam", type: "string" },
      ],
    },
    {
      name: "description",
      title: "Scope & Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "ml", title: "Malayalam", type: "text" },
      ],
    },
    {
      name: "sourceAttribution",
      title: "Documented Source / Public Order",
      type: "string",
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: "budgetAllocation",
      title: "Budget Allocation Note",
      type: "string",
    },
  ],
};
