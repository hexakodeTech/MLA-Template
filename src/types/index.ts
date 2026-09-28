export type Language = "en" | "ml";

export interface LocalizedString {
  en: string;
  ml: string;
}

export type NewsCategory =
  | "Official Announcements"
  | "Public Meetings"
  | "Constituency News"
  | "Office Notices";

export interface NewsItem {
  id: string;
  slug: string;
  title: LocalizedString;
  category: NewsCategory;
  date: string;
  summary: LocalizedString;
  content: LocalizedString;
  imageUrl?: string;
  imageCaption?: LocalizedString;
  sourceAttribution?: string;
  isFeatured?: boolean;
  isSample: boolean;
}

export type ActivityCategory =
  | "Community Engagements"
  | "Public Inspections"
  | "Cultural & Educational"
  | "Official Delegations";

export interface ActivityItem {
  id: string;
  slug: string;
  title: LocalizedString;
  category: ActivityCategory;
  date: string;
  location: LocalizedString;
  description: LocalizedString;
  fullDetails?: LocalizedString;
  imageUrl?: string;
  imageCaption?: LocalizedString;
  isSample: boolean;
}

export type GalleryCategory =
  | "All"
  | "Public Meetings"
  | "Constituency Visits"
  | "Cultural Events"
  | "Development Sites";

export interface GalleryItem {
  id: string;
  title: LocalizedString;
  category: GalleryCategory;
  date: string;
  imageUrl: string;
  altText: LocalizedString;
  caption?: LocalizedString;
  location?: LocalizedString;
  isSample: boolean;
}

export type ProjectStatus = "Completed" | "Ongoing" | "In Planning" | "Approved";

export interface DevelopmentProject {
  id: string;
  title: LocalizedString;
  sector: string;
  status: ProjectStatus;
  sanctionDate: string;
  location: LocalizedString;
  description: LocalizedString;
  sourceAttribution: string;
  budgetAllocation?: string;
  isVerified: boolean;
}

export interface PublicResource {
  id: string;
  department: LocalizedString;
  serviceName: LocalizedString;
  description: LocalizedString;
  phone: string;
  address?: LocalizedString;
  portalUrl?: string;
  category: "Emergency" | "Revenue" | "Utilities" | "Healthcare" | "Civic";
}

export interface RepresentativeProfile {
  name: LocalizedString;
  designationStatus: LocalizedString;
  constituencyName: LocalizedString;
  officialBioNotice: LocalizedString;
  officeHours: LocalizedString;
  officeAddress: LocalizedString;
  officeEmail: string;
  officePhone: string;
}
