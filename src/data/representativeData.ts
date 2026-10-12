/**
 * Canonical Source of Truth: Shri Ramesh Pisharady Official Representative Portal
 * 
 * ARCHITECTURAL SPECIFICATION:
 * - This portal is an entirely static, frontend-only Next.js application.
 * - There is NO backend, database, CMS, or external API server.
 * - All published representative information is verified and maintained
 *   through this statically typed dataset module.
 * 
 * Verified Authorities & Public Records:
 * 1. Kerala Legislative Assembly Directory (niyamasabha.nic.in)
 * 2. Palakkad District Administration & Government of Kerala Revenue Gazettes
 * 3. Verified public service channels of Shri Ramesh Pisharady MLA
 */

export {
  representativeProfile,
  officialNews,
  officialActivities,
  officialGallery,
  constituencyProjects,
  publicResources,
  palakkadTaluks,
  constituencyLocalBodies,
  officialLocalBodies,
  // Backward-compatible aliases
  mockNews,
  mockActivities,
  mockGallery,
  mockProjects,
  mockResources,
} from "./mockData";
