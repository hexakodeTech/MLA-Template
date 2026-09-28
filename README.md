# Official Representative Portal — Shri Ramesh Pisharady (Prototype Concept)

**Client / Agency:** HexaKode  
**Target:** Official Representative Website for Shri Ramesh Pisharady (Palakkad Constituency, Kerala)  
**Portal Category:** Public Information & Constituency Service Portal  
**Languages:** English & Malayalam (Bilingual framework with pending translation indicators)  

---

## 1. Project Overview & Client Presentation

This website is a production-quality, responsive prototype concept built for presentation to the client by **HexaKode**. It delivers a clean, modern, and accessible public information platform designed to present official announcements, organize constituency services, track documented development initiatives, and provide direct citizen communication channels.

> **Notice on Content & Verification:**  
> In strict accordance with public representative standards, this prototype **does not invent** personal biographies, electoral histories, official endorsements, or unverified contact data. All biographical and contact fields are structured as placeholders awaiting official office authorization.

---

## 2. Technology Stack

* **Framework:** Next.js 16 (Turbopack, App Router)
* **Library:** React 19
* **Language:** TypeScript 5
* **Styling:** Tailwind CSS v4 with custom institutional theme tokens:
  * Primary: Deep Navy Blue (`#0f2042` / `bg-navy-950`, `bg-navy-900`)
  * Secondary: Muted Forest Green (`#1b4332` / `bg-forest-800`)
  * Neutral: Warm Alabaster (`#fdfcfb` / `bg-sand-50`)
  * Accent: Refined Gold (`#c59b27` / `text-gold-400`)
* **Icons:** Lucide React
* **Animations:** Framer Motion (with reduced-motion compatibility)
* **CMS Readiness:** Complete Sanity CMS schema definitions in `src/sanity/schemas/`
* **Fonts:** Inter & Noto Sans Malayalam (Google Fonts)

---

## 3. Implemented Pages & Features

1. **Home (`/`)**:
   * Institutional top notification banner with HexaKode credit and client presentation disclosure
   * Sticky accessible header with text-based identity (*Ramesh Pisharady*), primary navigation, language toggle (EN / മലയാളം), and mobile drawer
   * Hero section with headline (*"A Connected Constituency Starts with Information."*), primary/secondary CTAs, and portrait placeholder
   * Welcome section introducing portal mission
   * About the Representative structured preview
   * News & Announcements grid with publication dates and sample indicators
   * Constituency Information hub cards (Profile, Resources, Projects, Helplines)
   * Public Activities & Engagements section
   * Moments from the Constituency gallery preview with interactive Lightbox
   * Office Contact section with verified hours and accessible enquiry form
   * 4-Column structured footer with legal links and subtle **HexaKode** credit
2. **About Page (`/about`)**:
   * Approved profile photograph placeholder
   * Structured biography placeholder ("Official biography to be provided by the office")
   * Public role and key commitments
   * Office contact particulars
3. **News & Announcements (`/news`) & Dynamic Article View (`/news/[slug]`)**:
   * Search bar with real-time filtering
   * Category filters (Official Announcements, Public Meetings, Constituency News, Office Notices)
   * Featured release card
   * Dynamic article detail view with full narrative, source attribution, and related updates
4. **Constituency Information Hub (`/constituency`)**:
   * Palakkad geographic overview and cultural heritage
   * Regional taluks directory (Palakkad, Chittur, Alathur, Ottapalam, Mannarkkad, Pattambi)
   * Documented Development Projects tracker with filterable status (Ongoing, Completed, In Planning) and source attributions
   * Public Service Directory with phone numbers, department links, and emergency helplines
5. **Public Activities (`/activities`) & Dynamic Detail View (`/activities/[slug]`)**:
   * Chronological activity feed
   * Category filtering (Community Engagements, Public Inspections, Cultural & Educational, Official Delegations)
   * Event locations and summaries
6. **Photo Gallery (`/gallery`)**:
   * Responsive photo grid
   * Category filtering (Public Meetings, Constituency Visits, Cultural Events, Development Sites)
   * Fullscreen Lightbox viewer with keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`)
7. **Contact Page (`/contact`)**:
   * Secretariat address, verified phone, official email placeholders
   * Emergency direct-dial quick cards (112, 101, 108, 1912)
   * Accessible interactive enquiry form with field-level validation, anti-spam honeypot, and honest prototype submission modal
8. **Privacy Policy (`/privacy-policy`)**:
   * Draft governance statement prepared for legal counsel review
9. **Accessibility Statement (`/accessibility`)**:
   * WCAG 2.1 Level AA conformance targets, ARIA landmarks, keyboard operability, and Malayalam Unicode typography support
10. **Technical SEO**:
    * Dynamic XML sitemap at `/sitemap.xml`
    * Robots directives at `/robots.txt`

---

## 4. Getting Started

### Prerequisites

Ensure Node.js 18+ or Node.js 20+ is installed on your system.

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Palakkad

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Building for Production

```bash
# Run production build and type checking
npm run build

# Start production server
npm run start
```

---

## 5. Bilingual Support (English & Malayalam)

* The application includes a React context (`src/context/LanguageContext.tsx`) that dynamically switches the UI language between English and Malayalam.
* All core navigational links, section titles, filter options, and form labels are localized.
* Where official Malayalam copy is awaiting office review, clear notices indicate translation status rather than presenting unapproved machine translations as official copy.

---

## 6. Sanity CMS Integration

The schemas in `src/sanity/schemas/` are ready to be connected once project credentials are provided. Refer to `src/sanity/README.md` for connection instructions.

---

## 7. Credits

**Website Designed & Developed by HexaKode**  
Commissioned prototype for the Office of Shri Ramesh Pisharady.
