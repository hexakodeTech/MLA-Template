# Sanity CMS Architecture & Integration Guide

**Project:** Official Representative Portal — Shri Ramesh Pisharady  
**Commissioned by:** HexaKode  

This directory contains the production-ready schema definitions for Sanity CMS to manage official content dynamically.

---

## 1. Schema Definitions Provided

* **`representative.ts`**: Official name, verified designation, high-resolution portrait with alt-text, approved biography blocks, and secretariat office details.
* **`newsArticle.ts`**: Official announcements, press releases, dates, category tags, lead summaries, localized body text, and source attributions.
* **`publicActivity.ts`**: Event diary, venue/location fields, photographs, descriptions, and category tags (Community Engagements, Public Inspections, etc.).
* **`constituencyProject.ts`**: Development projects tracking status (Completed, Ongoing, In Planning), sanction dates, sectors, and verified government order sources.
* **`galleryImage.ts`**: High-resolution gallery photographs with localized titles, captions, dates, and accessibility alt text.
* **`siteSettings.ts`**: Global configuration, text-based branding, office contact particulars, and verified social media channels.

---

## 2. Connecting Sanity to the Application

When authorized Sanity credentials are provided by the client:

1. Install Sanity dependencies:
   ```bash
   npm install next-sanity @sanity/image-url sanity
   ```

2. Create `.env.local` with your project credentials:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2026-03-01"
   SANITY_API_READ_TOKEN="your_readonly_token" # For draft preview if required
   ```

3. Initialize `sanity.config.ts` in the project root:
   ```typescript
   import { defineConfig } from "sanity";
   import { structureTool } from "sanity/structure";
   import { schemaTypes } from "@/sanity/schemas";

   export default defineConfig({
     name: "default",
     title: "Ramesh Pisharady Office Portal CMS",
     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
     plugins: [structureTool()],
     schema: {
       types: schemaTypes,
     },
   });
   ```

4. Configure Sanity Studio route at `src/app/studio/[[...tool]]/page.tsx`.

---

## 3. Security and Publishing Rules

* **Access Control**: Only authorized staff should be granted Editor or Administrator roles in Sanity.
* **Draft vs Published**: The Next.js production builds only query published documents (`!(_id in path("drafts.**"))`).
* **Credentials**: Never commit `SANITY_API_READ_TOKEN` or write tokens into git repositories.
