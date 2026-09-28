import {
  NewsItem,
  ActivityItem,
  GalleryItem,
  DevelopmentProject,
  PublicResource,
  RepresentativeProfile,
} from "@/types";

export const representativeProfile: RepresentativeProfile = {
  name: {
    en: "Shri Ramesh Pisharady",
    ml: "ശ്രീ രമേഷ് പിഷാരടി",
  },
  designationStatus: {
    en: "Public Representative (Office Designations to be confirmed)",
    ml: "ജനപ്രതിനിധി (ഔദ്യോഗിക പദവികൾ സ്ഥിരീകരിക്കപ്പെടേണ്ടതുണ്ട്)",
  },
  constituencyName: {
    en: "Palakkad Constituency, Kerala",
    ml: "പാലക്കാട് മണ്ഡലം, കേരളം",
  },
  officialBioNotice: {
    en: "Official biography, public role, and institutional responsibilities to be provided and confirmed by the office.",
    ml: "ഔദ്യോഗിക ജീവചരിത്രവും സംഘടനാ ഉത്തരവാദിത്തങ്ങളും ഓഫീസിന്റെ അനുമതിക്ക് ശേഷം പ്രസിദ്ധീകരിക്കുന്നതാണ്.",
  },
  officeHours: {
    en: "Monday to Friday: 09:30 AM – 05:00 PM (Public Enquiries: 10:00 AM – 01:00 PM) [Subject to confirmation]",
    ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ: 09:30 AM – 05:00 PM (പൊതുജന സന്ദർശനം: 10:00 AM – 01:00 PM) [സ്ഥിരീകരണത്തിന് വിധേയം]",
  },
  officeAddress: {
    en: "Constituency Office of Shri Ramesh Pisharady, Palakkad District, Kerala – PIN: 678001 [Location to be confirmed]",
    ml: "ശ്രീ രമേഷ് പിഷാരടിയുടെ മണ്ഡലം ഓഫീസ്, പാലക്കാട് ജില്ല, കേരളം - പിൻ: 678001 [വിലാസം സ്ഥിരീകരിക്കേണ്ടതുണ്ട്]",
  },
  officeEmail: "office.rameshpisharady@example.gov.in (Placeholder)",
  officePhone: "+91 491 2500000 (Placeholder)",
};

export const mockNews: NewsItem[] = [
  {
    id: "news-1",
    slug: "constituency-grievance-redressal-portal-initiative",
    title: {
      en: "Public Notice: Digital Portal Architecture Review for Citizen Services",
      ml: "പൊതു അറിയിപ്പ്: പൗരസേവനങ്ങൾക്കായുള്ള ഡിജിറ്റൽ പോർട്ടൽ അവലോകനം",
    },
    category: "Official Announcements",
    date: "2026-09-20",
    summary: {
      en: "A comprehensive digital framework is being evaluated to ensure swift tracking of constituency petitions, public service queries, and civic grievances.",
      ml: "മണ്ഡലത്തിലെ ജനങ്ങളുടെ പരാതികളും സേവന അപേക്ഷകളും വേഗത്തിൽ കൈകാര്യം ചെയ്യുന്നതിനുള്ള ഡിജിറ്റൽ സംവിധാനം ഒരുക്കുന്നു.",
    },
    content: {
      en: "The representative office has commenced technical evaluations for an integrated citizen grievance and information platform. This system aims to provide constituents with direct visibility into public works status, local administrative contacts, and streamlined grievance registration.\n\n*Notice: This is a structured prototype news entry designed to demonstrate content formatting for official releases.*",
      ml: "മണ്ഡലത്തിലെ ജനങ്ങളുടെ പരാതികൾ വേഗത്തിൽ പരിഹരിക്കുന്നതിനായി ആധുനിക സാങ്കേതിക വിദ്യകൾ ഉൾക്കൊള്ളിച്ചുള്ള പൗരസമ്പർക്ക പ്ലാറ്റ്ഫോമിന്റെ പ്രവർത്തനങ്ങൾ ആരംഭിച്ചു.\n\n*ശ്രദ്ധിക്കുക: ഔദ്യോഗിക വാർത്തകൾ നൽകുന്നതിനുള്ള മാതൃകാ വിവരമാണിത്.*",
    },
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      en: "Technical briefing session on public information infrastructure (Demo Placeholder)",
      ml: "പൊതുവിവര സംവിധാന അവലോകന യോഗം (മാതൃകാ ചിത്രം)",
    },
    sourceAttribution: "Office Administrative Cell",
    isFeatured: true,
    isSample: true,
  },
  {
    id: "news-2",
    slug: "palakkad-drinking-water-augmentation-review",
    title: {
      en: "Coordination Meeting Scheduled on Palakkad Drinking Water & Canal Schemes",
      ml: "പാലക്കാട് ശുദ്ധജല വിതരണ പദ്ധതികളെക്കുറിച്ച് അവലോകന യോഗം",
    },
    category: "Public Meetings",
    date: "2026-09-14",
    summary: {
      en: "Inter-departmental review meeting held with engineering officials to assess summer water readiness and canal maintenance across Palakkad taluks.",
      ml: "പാലക്കാട് താലൂക്കുകളിലെ കനാൽ നവീകരണവും ശുദ്ധജല ലഭ്യതയും ഉറപ്പുവരുത്താൻ ഉദ്യോഗസ്ഥരുമായി ഏകോപന യോഗം ചേർന്നു.",
    },
    content: {
      en: "A coordination meeting reviewed the progress of drinking water augmentation projects in drought-sensitive pocket areas of Palakkad. Officials from the Kerala Water Authority (KWA) and local self-government bodies presented updates on pipeline repairs and check-dam desiltation.\n\n*Sample entry for presentation testing.*",
      ml: "വേനൽക്കാല ശുദ്ധജല ദൗർലഭ്യം നേരിടുന്നതിന് മുന്നോടിയായി ജലവിഭവ വകുപ്പ് ഉദ്യോഗസ്ഥരുമായി ചേർന്ന് കർമ്മപദ്ധതി രൂപീകരിച്ചു.",
    },
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      en: "Canal and water reservoir infrastructure review (Demo Placeholder)",
      ml: "ജലസംഭരണികളും കനാൽ പദ്ധതികളും സംബന്ധിച്ച അവലോകനം",
    },
    sourceAttribution: "Public Works & Water Coordination Wing",
    isFeatured: false,
    isSample: true,
  },
  {
    id: "news-3",
    slug: "agriculture-support-and-paddy-cultivation-advisory",
    title: {
      en: "Advisory Issued for Paddy Cultivation and Storage Preparedness in Palakkad",
      ml: "പാലക്കാട്ടെ നെൽകൃഷിയും സംഭരണവും സംബന്ധിച്ച് കർഷകർക്കായി അറിയിപ്പ്",
    },
    category: "Constituency News",
    date: "2026-08-28",
    summary: {
      en: "Farmers across Palakkad rural clusters are encouraged to register through primary agricultural cooperative societies for seasonal procurement schedules.",
      ml: "നെല്ല് സംഭരണവുമായി ബന്ധപ്പെട്ട് കൃഷിഭവനുകൾ മുഖേന രജിസ്ട്രേഷൻ വേഗത്തിലാക്കാൻ കർഷകരോട് അഭ്യർത്ഥിച്ചു.",
    },
    content: {
      en: "As Palakkad represents Kerala's principal granary, timely coordination between procurement agencies, civil supplies, and Krishi Bhavans is prioritized to ensure fair and hassle-free weighing, storage, and price settlement.\n\n*Sample entry for presentation testing.*",
      ml: "കർഷകരുടെ അവകാശങ്ങൾ സംരക്ഷിക്കുന്നതിനും കൃത്യസമയത്ത് നെല്ല് സംഭരണം നടത്തുന്നതിനുമുള്ള സൗകര്യങ്ങൾ ഒരുക്കുന്നു.",
    },
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      en: "Paddy fields and agricultural landscape of Palakkad (Demo Placeholder)",
      ml: "പാലക്കാടൻ നെൽപ്പാടങ്ങളുടെ പശ്ചാത്തലം",
    },
    sourceAttribution: "Agricultural Liaison Desk",
    isFeatured: false,
    isSample: true,
  },
  {
    id: "news-4",
    slug: "constituency-office-public-visiting-hours-notice",
    title: {
      en: "Constituency Office Notice: Submission Guidelines for Public Petitions",
      ml: "ഓഫീസ് അറിയിപ്പ്: പൊതുജന നിവേദനങ്ങൾ സമർപ്പിക്കുന്നതിനുള്ള മാർഗ്ഗരേഖ",
    },
    category: "Office Notices",
    date: "2026-08-10",
    summary: {
      en: "Citizens submitting petitions are requested to attach relevant survey or identity reference numbers to expedite administrative follow-up.",
      ml: "നിവേദനങ്ങൾ സമർപ്പിക്കുമ്പോൾ ആവശ്യമായ രേഖകൾ സഹിതം ഓഫീസിൽ നേരിട്ടോ ഓൺലൈനായോ ലഭ്യമാക്കുക.",
    },
    content: {
      en: "To facilitate prompt tracking and acknowledgment, petitions pertaining to land revenue, utility connections, and civic infrastructure should include supporting documentation and contact details.\n\n*Sample notice for UI validation.*",
      ml: "പരാതികൾ വേഗത്തിൽ തീർപ്പാക്കാൻ ബന്ധപ്പെട്ട അനുബന്ധ രേഖകൾ നിർബന്ധമായും ഉൾപ്പെടുത്തേണ്ടതാണ്.",
    },
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      en: "Administrative Desk and Public Registry",
      ml: "പരാതി പരിഹാര രജിസ്ട്രി",
    },
    sourceAttribution: "Office Protocol Cell",
    isFeatured: false,
    isSample: true,
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: "act-1",
    slug: "district-hospital-palakkad-pediatric-wing-visit",
    title: {
      en: "Inspection of Healthcare Facilities & Patient Amenities at District Hospital",
      ml: "ജില്ലാ ആശുപത്രിയിലെ സൗകര്യങ്ങളും രോഗീസമ്പർക്കവും നേരിൽ കണ്ട് വിലയിരുത്തി",
    },
    category: "Public Inspections",
    date: "2026-09-18",
    location: {
      en: "District Hospital, Palakkad",
      ml: "ജില്ലാ ആശുപത്രി, പാലക്കാട്",
    },
    description: {
      en: "Review of medical equipment availability, pharmacy supplies, and waiting lounge hygiene alongside resident medical officers.",
      ml: "ആശുപത്രിയിലെ അടിസ്ഥാന സൗകര്യങ്ങളും മരുന്ന് ലഭ്യതയും ആരോഗ്യപ്രവർത്തകരുമായി ചർച്ച ചെയ്തു.",
    },
    fullDetails: {
      en: "During an official visit to the Palakkad District Hospital, Shri Ramesh Pisharady interacted with duty doctors, nursing staff, and patient attendants to review the functioning of outpatient counters, dialysis units, and emergency triage rooms.\n\n*This mock activity record illustrates the layout for official event reports.*",
      ml: "ആശുപത്രിയിലെ ഒ.പി കൗണ്ടറുകൾ, അത്യാഹിത വിഭാഗം, ഡയാലിസിസ് യൂണിറ്റുകൾ എന്നിവയുടെ പ്രവർത്തനം വിലയിരുത്തി.",
    },
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
    imageCaption: {
      en: "District hospital administrative walkthrough (Sample Record)",
      ml: "ആശുപത്രി ഭരണനിർവ്വഹണ സന്ദർശനം (മാതൃകാ ഫോട്ടോ)",
    },
    isSample: true,
  },
  {
    id: "act-2",
    slug: "grama-sabha-civic-consultation-alathur-chittur",
    title: {
      en: "Constituency Public Hearing on Rural Road Connectivity",
      ml: "ഗ്രാമീണ റോഡ് വികസനവുമായി ബന്ധപ്പെട്ട് ജനസമ്പർക്ക പരിപാടി",
    },
    category: "Community Engagements",
    date: "2026-09-05",
    location: {
      en: "Community Auditorium, Chittur, Palakkad",
      ml: "കമ്മ്യൂണിറ്റി ഓഡിറ്റോറിയം, ചിറ്റൂർ, പാലക്കാട്",
    },
    description: {
      en: "Open dialogue with resident welfare associations, panchayat members, and youth representatives on local transportation bottlenecks.",
      ml: "നാട്ടുകാരുടെയും റസിഡന്റ്സ് അസോസിയേഷനുകളുടെയും യാത്രാപ്രശ്നങ്ങൾ ചർച്ച ചെയ്തു.",
    },
    fullDetails: {
      en: "The community engagement session gathered feedback on delayed culvert reconstructions and street lighting on village links connecting agricultural belts to main highways.",
      ml: "ഗ്രാമപ്രദേശങ്ങളിലെ റോഡ് ശൃംഖലകളും അനുബന്ധ വികസനങ്ങളും വേഗത്തിലാക്കാൻ തീരുമാനിച്ചു.",
    },
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
    imageCaption: {
      en: "Community gathering and open discussion forum (Sample Record)",
      ml: "ജനപ്രതിനിധികളും നാട്ടുകാരും പങ്കെടുത്ത ചർച്ചാ വേദി",
    },
    isSample: true,
  },
  {
    id: "act-3",
    slug: "palakkad-heritage-and-cultural-academy-inauguration",
    title: {
      en: "Cultural Heritage Seminar & Folk Art Preservation Meet",
      ml: "പാലക്കാടൻ പൈതൃക സംരക്ഷണവും നാടൻകലാ സെമിനാറും",
    },
    category: "Cultural & Educational",
    date: "2026-08-22",
    location: {
      en: "Town Hall, Palakkad",
      ml: "ടൗൺ ഹാൾ, പാലക്കാട്",
    },
    description: {
      en: "Addressing artists, scholars, and youth on documenting traditional folk arts, Panchavadyam traditions, and Palakkad cultural heritage.",
      ml: "പാലക്കാടിന്റെ തനത് സാംസ്കാരിക പൈതൃകവും കലാരൂപങ്ങളും സംരക്ഷിക്കേണ്ടതിന്റെ പ്രാധാന്യം ഓർമ്മിപ്പിച്ചു.",
    },
    fullDetails: {
      en: "A vibrant seminar focusing on traditional art forms unique to the Palakkad gap cultural region. Emphasized supporting elder traditional artists with welfare access and institutional recognition.",
      ml: "പാരമ്പര്യ കലാകാരന്മാരെ ആദരിക്കുകയും പുതിയ തലമുറയിലേക്ക് കലകൾ പകർന്നു നൽകുകയും ചെയ്യുന്ന പരിപാടി.",
    },
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    imageCaption: {
      en: "Cultural celebration and seminar dais (Sample Record)",
      ml: "സാംസ്കാരിക സമ്മേളന വേദി",
    },
    isSample: true,
  },
  {
    id: "act-4",
    slug: "state-level-infrastructure-delegation-briefing",
    title: {
      en: "Inter-Agency Briefing on Kanjikode Industrial Corridor Freight Logistics",
      ml: "കഞ്ചിക്കോട് വ്യവസായ മേഖലയിലെ ഗതാഗത സൗകര്യങ്ങളെക്കുറിച്ച് ചർച്ച",
    },
    category: "Official Delegations",
    date: "2026-08-04",
    location: {
      en: "Civil Station Conference Hall, Palakkad",
      ml: "സിവിൽ സ്റ്റേഷൻ കോൺഫറൻസ് ഹാൾ, പാലക്കാട്",
    },
    description: {
      en: "Joint consultation with railway officials and district commerce representatives regarding goods terminal upgrades and feeder road expansion.",
      ml: "വ്യവസായ വികസനവും റെയിൽവേ ഗുഡ്സ് ഷെഡ് വികസനവും സംബന്ധിച്ച് ഉദ്യോഗസ്ഥരുമായി സംസാരിച്ചു.",
    },
    fullDetails: {
      en: "Discussions concentrated on reducing heavy-vehicle congestion on arterial routes by streamlining goods logistics around Kanjikode, boosting local employment while safeguarding resident safety.",
      ml: "പ്രാദേശിക തൊഴിലവസരങ്ങൾ വർദ്ധിപ്പിക്കുന്നതിനും ഗതാഗതക്കുരുക്ക് ഒഴിവാക്കുന്നതിനുമുള്ള നിർദ്ദേശങ്ങൾ സമർപ്പിച്ചു.",
    },
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    imageCaption: {
      en: "Delegation conference and inter-agency coordination meeting",
      ml: "അന്തർ-വകുപ്പ് ഏകോപന യോഗം",
    },
    isSample: true,
  },
];

export const mockGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: {
      en: "Palakkad Green Plains & Agricultural Panorama",
      ml: "പാലക്കാടൻ പാടശേഖരങ്ങളുടെ മനോഹര ദൃശ്യം",
    },
    category: "Constituency Visits",
    date: "2026-09",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Wide view of emerald paddy fields and palm trees under morning skies in Palakkad",
      ml: "പാലക്കാട്ടെ പച്ചപ്പ് നിറഞ്ഞ വയലുകളും തെങ്ങുകളും",
    },
    caption: {
      en: "Constituency rural terrain — Agricultural heartland of Kerala (Representative Photographic Asset)",
      ml: "പാലക്കാടിന്റെ ഗ്രാമീണ ഭംഗി (മാതൃകാ ഫോട്ടോ)",
    },
    location: { en: "Kollengode, Palakkad", ml: "കൊല്ലങ്കോട്, പാലക്കാട്" },
    isSample: true,
  },
  {
    id: "gal-2",
    title: {
      en: "Public Interaction & Citizen Grievance Hearing",
      ml: "ജനസമ്പർക്ക പരിപാടിയും നിവേദന സമർപ്പണവും",
    },
    category: "Public Meetings",
    date: "2026-09",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Public forum with attentive participants discussing community initiatives",
      ml: "പൊതുജനങ്ങളുമായി വികസന കാര്യങ്ങൾ ചർച്ച ചെയ്യുന്നു",
    },
    caption: {
      en: "Open interactive forum with local residents and civic leaders (Demonstration Prototype Photo)",
      ml: "പൊതുജനങ്ങളുമായുള്ള ആശയവിനിമയ വേദി (മാതൃകാ ഫോട്ടോ)",
    },
    location: { en: "Chittur Assembly Hall", ml: "ചിറ്റൂർ" },
    isSample: true,
  },
  {
    id: "gal-3",
    title: {
      en: "Historical Fort Grounds & Public Heritage Site Walk",
      ml: "പാലക്കാട് കോട്ടയും പരിസരവും സന്ദർശനം",
    },
    category: "Constituency Visits",
    date: "2026-08",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Granite walls of historic fort surrounded by green moat and public walking path",
      ml: "പാലക്കാട് ചരിത്ര കോട്ടയുടെ കാഴ്ചകൾ",
    },
    caption: {
      en: "Heritage tourism assessment and public park maintenance inspection",
      ml: "പൈതൃക സംരക്ഷണവും പാർക്ക് സൗകര്യങ്ങളും പരിശോധിക്കുന്നു",
    },
    location: { en: "Palakkad Fort, Palakkad", ml: "പാലക്കാട് കോട്ട" },
    isSample: true,
  },
  {
    id: "gal-4",
    title: {
      en: "Infrastructure Works & Canal Lining Assessment",
      ml: "കനാൽ നവീകരണ പ്രവർത്തനങ്ങളുടെ പരിശോധന",
    },
    category: "Development Sites",
    date: "2026-08",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Engineers and supervisors examining civil construction schematics on site",
      ml: "എൻജിനീയർമാരും ഉദ്യോഗസ്ഥരും നിർമ്മാണ സ്ഥലം സന്ദർശിക്കുന്നു",
    },
    caption: {
      en: "On-site progress evaluation of irrigation channel desilting project",
      ml: "ജലസേചന കനാൽ നവീകരണ പുരോഗതി വിലയിരുത്തൽ",
    },
    location: { en: "Malampuzha Canal Network", ml: "മലമ്പുഴ കനാൽ ശൃംഖല" },
    isSample: true,
  },
  {
    id: "gal-5",
    title: {
      en: "Cultural & Youth Gathering at Palakkad Town Square",
      ml: "പാലക്കാട് ടൗൺ സ്ക്വയറിലെ സാംസ്കാരിക സന്ധ്യ",
    },
    category: "Cultural Events",
    date: "2026-07",
    imageUrl: "https://images.unsplash.com/photo-1460518451282-474b15672083?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Auditorium stage with warm lighting during a cultural symposium",
      ml: "സാംസ്കാരിക പരിപാടിയുടെ മനോഹരമായ വേദി",
    },
    caption: {
      en: "Community gathering encouraging youth participation in cultural preservation",
      ml: "യുവജനങ്ങളുടെ പങ്കാളിത്തത്തോടെ സംഘടിപ്പിച്ച സാംസ്കാരിക കൂട്ടായ്മ",
    },
    location: { en: "Town Hall, Palakkad", ml: "ടൗൺ ഹാൾ, പാലക്കാട്" },
    isSample: true,
  },
  {
    id: "gal-6",
    title: {
      en: "Public Health Center Medical Ward Modernization Review",
      ml: "പ്രാഥമികാരോഗ്യ കേന്ദ്രത്തിലെ നവീകരണ പ്രവർത്തനങ്ങൾ",
    },
    category: "Development Sites",
    date: "2026-07",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    altText: {
      en: "Hospital corridor with clean, modern patient care rooms",
      ml: "ആശുപത്രിയിലെ ആധുനിക സജ്ജീകരണങ്ങൾ",
    },
    caption: {
      en: "Inspection of newly installed diagnostic lab amenities in community clinic",
      ml: "ലാബ് സൗകര്യങ്ങളും പരിശോധനാ മുറികളും വിലയിരുത്തി",
    },
    location: { en: "Community Health Centre, Palakkad", ml: "സി.എച്ച്.സി പാലക്കാട്" },
    isSample: true,
  },
];

export const mockProjects: DevelopmentProject[] = [
  {
    id: "proj-1",
    title: {
      en: "Drinking Water Augmentation & Pipeline Renewal Scheme",
      ml: "ശുദ്ധജല വിതരണ പൈപ്പ്‌ലൈൻ നവീകരണ പദ്ധതി",
    },
    sector: "Water Resources & Public Health",
    status: "Ongoing",
    sanctionDate: "2025-11-15",
    location: {
      en: "Palakkad Municipality & Peruvemba Wards",
      ml: "പാലക്കാട് മുനിസിപ്പാലിറ്റിയും പെരുവെമ്പ് വാർഡുകളും",
    },
    description: {
      en: "Replacing aging distribution pipelines and connecting automated flow-meters to reduce distribution loss and ensure consistent daily household pressure.",
      ml: "പഴയ പൈപ്പുകൾ മാറ്റി പുതിയ ലൈനുകൾ സ്ഥാപിക്കുകയും എല്ലാ വീടുകളിലും ശുദ്ധജലം എത്തിക്കുകയും ചെയ്യുന്നു.",
    },
    budgetAllocation: "Documented in State Budget Allocation Records",
    sourceAttribution: "Kerala Water Authority & Local Self Government Department",
    isVerified: true,
  },
  {
    id: "proj-2",
    title: {
      en: "Rural Road Resurfacing & Drainage Culvert Construction",
      ml: "ഗ്രാമീണ റോഡ് പുനരുദ്ധാരണവും കലുങ്ക് നിർമ്മാണവും",
    },
    sector: "Public Works & Transport",
    status: "Ongoing",
    sanctionDate: "2026-02-10",
    location: {
      en: "Pirayiri - Kodumba Feeder Road Link",
      ml: "പിരായിരി - കൊടുമ്പ് ലിങ്ക് റോഡ്",
    },
    description: {
      en: "Upgrading sub-base with stone-matrix macadam and reconstructing concrete storm drainage to prevent monsoon waterlogging.",
      ml: "മഴക്കാലത്ത് റോഡുകളിൽ വെള്ളക്കെട്ട് ഒഴിവാക്കാൻ ഡ്രെയിനേജ് സൗകര്യങ്ങളോടെയുള്ള റോഡ് നിർമ്മാണം.",
    },
    budgetAllocation: "Documented in Constituency PWD Asset Registry",
    sourceAttribution: "Public Works Department (Roads Division), Palakkad",
    isVerified: true,
  },
  {
    id: "proj-3",
    title: {
      en: "Primary Health Centre (PHC) Diagnostic Modernization",
      ml: "പ്രാഥമികാരോഗ്യ കേന്ദ്രം ഡയഗ്നോസ്റ്റിക് ലാബ് നവീകരണം",
    },
    sector: "Healthcare Infrastructure",
    status: "Completed",
    sanctionDate: "2025-06-20",
    location: {
      en: "Mundur Community Health Centre",
      ml: "മുണ്ടൂർ കമ്മ്യൂണിറ്റി ഹെൽത്ത് സെന്റർ",
    },
    description: {
      en: "Installation of automated hematology analyzers, digital biochemistry units, and patient electronic token display systems.",
      ml: "ആധുനിക രക്തപരിശോധനാ ഉപകരണങ്ങളും ഡിജിറ്റൽ ടോക്കൺ സംവിധാനങ്ങളും ഏർപ്പെടുത്തി.",
    },
    budgetAllocation: "National Health Mission & Local Self Govt Grant",
    sourceAttribution: "District Medical Office (Health), Palakkad",
    isVerified: true,
  },
  {
    id: "proj-4",
    title: {
      en: "Heritage Canal Greenway & Pedestrian Promenade Feasibility",
      ml: "പൈതൃക കനാൽ സംരക്ഷണവും കാൽനട നടപ്പാത പദ്ധതിയും",
    },
    sector: "Urban Heritage & Environment",
    status: "In Planning",
    sanctionDate: "2026-07-01",
    location: {
      en: "Palakkad Town Fort-Canal Corridor",
      ml: "പാലക്കാട് ഫോർട്ട്-കനാൽ പരിസരം",
    },
    description: {
      en: "Detailed project report (DPR) preparation for eco-friendly pedestrian greenway, stone revetment, and solar night lighting.",
      ml: "കനാലിന്റെ വശങ്ങൾ സംരക്ഷിച്ചുകൊണ്ട് പരിസ്ഥിതി സൗഹൃദ നടപ്പാതയും സൗരോർജ്ജ വിളക്കുകളും സ്ഥാപിക്കുന്നതിനുള്ള സാധ്യതാ പഠനം.",
    },
    budgetAllocation: "Planning & Preliminary DPR Stage",
    sourceAttribution: "Town Planning Department & District Tourism Promotion Council (DTPC)",
    isVerified: false,
  },
];

export const publicResources: PublicResource[] = [
  {
    id: "res-1",
    department: { en: "District Administration", ml: "ജില്ലാ ഭരണകൂടം" },
    serviceName: { en: "Palakkad District Collectorate", ml: "പാലക്കാട് കളക്ടറേറ്റ്" },
    description: {
      en: "Central administrative headquarters for district revenue, law & order, and disaster management coordination.",
      ml: "ജില്ലയിലെ റവന്യൂ, പൊതുഭരണ ആസ്ഥാനം.",
    },
    phone: "0491-2505309 / 0491-2505566",
    address: { en: "Civil Station, Palakkad - 678001", ml: "സിവിൽ സ്റ്റേഷൻ, പാലക്കാട് - 678001" },
    portalUrl: "https://palakkad.nic.in",
    category: "Revenue",
  },
  {
    id: "res-2",
    department: { en: "Emergency Services", ml: "അടിയന്തിര സേവനങ്ങൾ" },
    serviceName: { en: "Palakkad Police & Emergency Control", ml: "പോലീസ് കൺട്രോൾ റൂം" },
    description: {
      en: "24/7 District police assistance, citizen safety helpline, and emergency dispatch.",
      ml: "24 മണിക്കൂറും പ്രവർത്തിക്കുന്ന പോലീസ് അടിയന്തിര സേവനം.",
    },
    phone: "112 / 0491-2536700",
    address: { en: "District Police Office, Palakkad", ml: "ജില്ലാ പോലീസ് ഓഫീസ്, പാലക്കാട്" },
    portalUrl: "https://keralapolice.gov.in",
    category: "Emergency",
  },
  {
    id: "res-3",
    department: { en: "Health & Family Welfare", ml: "ആരോഗ്യ വകുപ്പ്" },
    serviceName: { en: "Palakkad District Hospital", ml: "പാലക്കാട് ജില്ലാ ആശുപത്രി" },
    description: {
      en: "Comprehensive secondary care hospital with 24/7 casualty, blood bank, trauma care, and pharmacy.",
      ml: "അത്യാഹിത വിഭാഗം, ബ്ലഡ് ബാങ്ക്, ഒ.പി സൗകര്യങ്ങൾ ഉൾപ്പെടെയുള്ള പ്രധാന ആശുപത്രി.",
    },
    phone: "0491-2533323",
    address: { en: "Near Fort Maidan, Palakkad - 678001", ml: "കോട്ടമൈതാനം, പാലക്കാട്" },
    category: "Healthcare",
  },
  {
    id: "res-4",
    department: { en: "Power & Energy Utilities", ml: "വൈദ്യുതി വകുപ്പ്" },
    serviceName: { en: "KSEB Palakkad Electrical Circle", ml: "കെ.എസ്.ഇ.ബി പാലക്കാട് സർക്കിൾ" },
    description: {
      en: "Electrical power supply maintenance, outage reporting, and consumer billing assistance.",
      ml: "വൈദ്യുതി തടസ്സങ്ങൾ പരിഹരിക്കലും പുതിയ കണക്ഷൻ വിവരങ്ങളും.",
    },
    phone: "1912 (24x7 Toll Free) / 0491-2505244",
    address: { en: "KSEB Circle Office, Palakkad", ml: "കെ.എസ്.ഇ.ബി സർക്കിൾ ഓഫീസ്" },
    portalUrl: "https://kseb.in",
    category: "Utilities",
  },
  {
    id: "res-5",
    department: { en: "Water & Sanitation", ml: "ജല അതോറിറ്റി" },
    serviceName: { en: "Kerala Water Authority (KWA) Palakkad", ml: "കേരള വാട്ടർ അതോറിറ്റി പാലക്കാട്" },
    description: {
      en: "Municipal and rural pipeline network maintenance, tanker requests during dry season, and billing queries.",
      ml: "പൈപ്പ്‌ലൈൻ അറ്റകുറ്റപ്പണികളും ശുദ്ധജല വിതരണ സേവനങ്ങളും.",
    },
    phone: "1916 (Toll Free) / 0491-2544256",
    address: { en: "KWA Division Office, Palakkad", ml: "വാട്ടർ അതോറിറ്റി ഡിവിഷൻ ഓഫീസ്" },
    category: "Utilities",
  },
  {
    id: "res-6",
    department: { en: "Emergency Services", ml: "അഗ്നിരക്ഷാ സേന" },
    serviceName: { en: "Fire & Rescue Services Station", ml: "ഫയർ & റെസ്ക്യൂ സർവീസ്" },
    description: {
      en: "Rapid response to fire incidents, flood rescues, road accident extractions, and natural disasters.",
      ml: "തീപിടുത്തം, പ്രളയം, അപകടങ്ങൾ എന്നിവയിലെ രക്ഷാപ്രവർത്തനം.",
    },
    phone: "101 / 0491-2534101",
    address: { en: "Near Victoria College, Palakkad", ml: "വിക്ടോറിയ കോളേജിന് സമീപം, പാലക്കാട്" },
    category: "Emergency",
  },
];

export const palakkadTaluks = [
  {
    name: { en: "Palakkad", ml: "പാലക്കാട്" },
    headquarters: "Palakkad Town",
    features: "District administrative core, historic Palakkad Fort, major commercial centers, Victoria College.",
  },
  {
    name: { en: "Chittur", ml: "ചിറ്റൂർ" },
    headquarters: "Chittur-Thathamangalam",
    features: "Kollengode valley, agricultural plains, sugar mills, rich musical traditions and Thunchath Ezhuthachan memorial.",
  },
  {
    name: { en: "Alathur", ml: "ആലത്തൂർ" },
    headquarters: "Alathur",
    features: "Vast paddy fields, Gayathripuzha river basin, vibrant handloom clusters and rural traditions.",
  },
  {
    name: { en: "Ottapalam", ml: "ഒറ്റപ്പാലം" },
    headquarters: "Ottapalam",
    features: "Cultural center on Bharatapuzha banks, heritage cinema shooting locales, Kathakali and folk academies.",
  },
  {
    name: { en: "Mannarkkad", ml: "മണ്ണാർക്കാട്" },
    headquarters: "Mannarkkad",
    features: "Gateway to Silent Valley National Park, rainfed hill agriculture, rich bio-diversity and indigenous heritage.",
  },
  {
    name: { en: "Pattambi", ml: "പട്ടാമ്പി" },
    headquarters: "Pattambi",
    features: "Bharatapuzha riverfront, premier Agricultural Research Station, bustling trade market and transit junction.",
  },
];
