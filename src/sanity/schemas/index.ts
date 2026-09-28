import { representativeSchema } from "./representative";
import { newsArticleSchema } from "./newsArticle";
import { publicActivitySchema } from "./publicActivity";
import { constituencyProjectSchema } from "./constituencyProject";
import { galleryImageSchema } from "./galleryImage";
import { siteSettingsSchema } from "./siteSettings";

export const schemaTypes = [
  representativeSchema,
  newsArticleSchema,
  publicActivitySchema,
  constituencyProjectSchema,
  galleryImageSchema,
  siteSettingsSchema,
];
